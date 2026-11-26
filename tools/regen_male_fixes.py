#!/usr/bin/env python3
"""Targeted audio repair & optimization tool:
1. Replace high-pitched English Male (GuyNeural) with warm en-US-AndrewNeural across all en_* & cheer_en_win.
2. Fix 117 Japanese Male kana + 4 quiet kanji/number entries using ja-JP-KeitaNeural vowel-hold carrier.
3. Fix defective Vietnamese spell_* / tone_ngang / mixed-script MP3s with vi-VN-NamMinhNeural (+0% & calm retry).
4. Trim excessive >240ms trailing digital silence on math_* sequence MP3s so math equations read smoothly.
"""
import asyncio
import glob
import hashlib
import os
import re
import sys

try:
    import aiohttp
    import edge_tts
except ImportError:
    print("Please install edge-tts and aiohttp: pip install edge-tts aiohttp")
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def build_english_map():
    en_js = open("english.js", encoding="utf-8").read()
    amap = {}
    for m in re.finditer(r"upper:\s*'([A-Z])'.*?word:\s*'([^']+)'.*?audioKey:\s*'(en_alpha_[a-z])'", en_js):
        amap[m.group(3)] = f"{m.group(1)}, {m.group(2)}!"
    for ch in "abcdefghijklmnopqrstuvwxyz":
        amap[f"en_letter_{ch}"] = f"{ch.upper()}."
    for m in re.finditer(r"\ben:\s*'([^']+)'.*?audioKey:\s*'(en_w_[^']+)'", en_js):
        amap[m.group(2)] = m.group(1)
    for m in re.finditer(r"\bword:\s*'([^']+)'.*?audioKey:\s*'(en_w_[^']+)'", en_js):
        amap.setdefault(m.group(2), m.group(1).capitalize())
    amap["cheer_en_win"] = "Awesome job, Bảo Long! Great work!"
    return amap


def build_japanese_male_map():
    ja_js = open("japanese.js", encoding="utf-8").read()
    jmap = {}
    for m in re.finditer(r"hira:\s*'([^']+)'", ja_js):
        ch = m.group(1)
        jmap[f"ja_hira_{ch}"] = "おー" if ch == "を" else f"{ch}ー"
    for m in re.finditer(r"kata:\s*'([^']+)'", ja_js):
        ch = m.group(1)
        jmap[f"ja_kata_{ch}"] = "オー" if ch == "ヲ" else f"{ch}ー"
    jmap["ja_n_2"] = "にー"
    jmap["ja_n_5"] = "ごー"
    jmap["ja_kanji_02"] = "にー"
    jmap["ja_kanji_31"] = "てー"
    return jmap


# (key, male_text, female_text_or_None_to_keep)
VI_FIXES = [
    ("spell_ổi", "Ô - i - ôi - hỏi - ổi!", None),
    ("spell_cờ", "Cờ - ơ - cơ - huyền - cờ!", None),
    ("spell_ăn", "Á - nờ - ăn!", None),
    ("spell_tàu", "Tờ - au - tau - huyền - tàu!", None),
    ("spell_xôi", "Xờ - ôi - xôi!", "Xờ, ôi, xôi."),
    ("spell_mặt trời", "Mờ - ắt - măt - nặng - mặt - Trờ - ơi - trơi - huyền - trời - mặt trời!", None),
    ("spell_dragon_earth", "Rờ - ông - rông - huyền - rồng - Đờ - ất - đât - sắc - đất - rồng đất!", None),
    ("tone_ngang", "Thanh ngang, không dấu!", None),
    ("art_mix_1", "Đỏ trộn với Vàng ra Màu Cam!", "Đỏ trộn với Vàng ra Màu Cam!"),
    ("art_mix_4", "Đỏ trộn với Trắng ra Màu Hồng!", "Đỏ trộn với Trắng ra Màu Hồng!"),
    ("art_pe_3", "Tư thế ngồi học chuẩn. Lưng thẳng, ngực không tì cạnh bàn, mắt cách vở hai mươi lăm đến ba mươi xăng-ti-mét.",
                 "Tư thế ngồi học chuẩn. Lưng thẳng, ngực không tì cạnh bàn, mắt cách vở hai mươi lăm đến ba mươi xăng-ti-mét."),
    ("art_pe_6", "Giữ nhịp Phách và Trống. Vỗ tay đều theo nhịp 1, 2, 3, 4 giúp cảm nhận âm nhạc thật chuẩn xác.",
                 "Giữ nhịp Phách và Trống. Vỗ tay đều theo nhịp 1, 2, 3, 4 giúp cảm nhận âm nhạc thật chuẩn xác."),
    ("art_q6", "Trước khi tập chạy hay đá bóng ở giờ Thể dục, bé cần làm gì đầu tiên?",
               "Trước khi tập chạy hay đá bóng ở giờ Thể dục, bé cần làm gì đầu tiên?"),
    ("ethics_lesson_9", "Đi ngủ đúng giờ và giữ lời hứa. Đã hứa với ba mẹ, thầy cô hay bạn bè thì cố gắng làm đúng hẹn, không để người khác chờ lâu.",
                        "Đi ngủ đúng giờ và giữ lời hứa. Đã hứa với ba mẹ, thầy cô hay bạn bè thì cố gắng làm đúng hẹn, không để người khác chờ lâu."),
    ("ethics_lesson_11", "Tự chuẩn bị cặp sách và giữ gìn đồ dùng. Buổi tối tự kiểm tra sách vở, bút chì, hộp màu cho gọn vào cặp sách trước khi đi ngủ.",
                         "Tự chuẩn bị cặp sách và giữ gìn đồ dùng. Buổi tối tự kiểm tra sách vở, bút chì, hộp màu cho gọn vào cặp sách trước khi đi ngủ."),
    ("ethics_lesson_12", "Quý trọng thức ăn và tiết kiệm điện nước. Ăn hết cơm trong bát không bỏ thừa, luôn mời ba mẹ ăn cơm và khóa vòi nước sau khi dùng.",
                         "Quý trọng thức ăn và tiết kiệm điện nước. Ăn hết cơm trong bát không bỏ thừa, luôn mời ba mẹ ăn cơm và khóa vòi nước sau khi dùng."),
]


async def fetch_mp3(text: str, voice: str, rate: str = "+0%") -> bytes:
    last_err = None
    for attempt in range(5):
        connector = aiohttp.TCPConnector(resolver=aiohttp.ThreadedResolver())
        try:
            comm = edge_tts.Communicate(text, voice, rate=rate, connector=connector)
            buf = bytearray()
            async for msg in comm.stream():
                if msg["type"] == "audio":
                    buf.extend(msg["data"])
            data = bytes(buf)
            if len(data) < 500:
                raise RuntimeError(f"Audio too short ({len(data)}B)")
            return data
        except Exception as err:
            last_err = err
            await asyncio.sleep(0.55 * (attempt + 1))
    raise last_err


def atomic_write(path: str, data: bytes):
    tmp = f"{path}.tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, path)


def trim_trailing_silence_math():
    """Trim >240ms trailing MPEG-2 CBR silence on math_* audio sequences to eliminate pauses."""
    trimmed = 0
    saved_bytes = 0
    prefixes = ("math_v_", "math_op_", "math_cmp_", "math_eq_word", "math_and")
    for g in ("female", "male"):
        for p in sorted(glob.glob(f"audio/{g}/math_*.mp3")):
            name = os.path.basename(p)[:-4]
            if not name.startswith(prefixes):
                continue
            b = open(p, "rb").read()
            if b[:4].hex() != "fff364c4" or len(b) % 144 != 0:
                continue
            nf = len(b) // 144
            active = [
                i for i in range(nf)
                if sum(1 for x in b[i * 144 + 21:(i + 1) * 144] if x not in (0x00, 0x55, 0xAA, 0xFF)) > 12
            ]
            if not active:
                continue
            keep_frames = max(12, min(nf, active[-1] + 10))
            if keep_frames < nf - 3:
                new_b = b[:keep_frames * 144]
                if len(new_b) >= 800:
                    atomic_write(p, new_b)
                    trimmed += 1
                    saved_bytes += len(b) - len(new_b)
    print(f"Trimmed trailing silence on {trimmed} math_* files (saved {saved_bytes/1024:.1f} KB).")


async def run():
    en_map = build_english_map()
    ja_map = build_japanese_male_map()
    on_disk_en = {os.path.basename(p)[:-4] for p in glob.glob("audio/male/en_*.mp3")} | {"cheer_en_win"}
    missing_en = sorted(on_disk_en - set(en_map.keys()))
    assert not missing_en, f"Unmapped English keys: {missing_en}"

    jobs = []
    for k in sorted(on_disk_en):
        jobs.append((os.path.join("audio", "male", f"{k}.mp3"), en_map[k], "en-US-AndrewNeural", "+0%"))
    for k, txt in sorted(ja_map.items()):
        jobs.append((os.path.join("audio", "male", f"{k}.mp3"), txt, "ja-JP-KeitaNeural", "+0%"))

    print(f"Batch 1 (EN AndrewNeural + JA KeitaNeural male fixes): {len(jobs)} files")
    sem = asyncio.Semaphore(5)

    async def worker_fast(path, txt, voice, rate):
        async with sem:
            data = await fetch_mp3(txt, voice, rate)
            atomic_write(path, data)
            return path

    done = 0
    for coro in asyncio.as_completed([worker_fast(*j) for j in jobs]):
        await coro
        done += 1
        if done % 40 == 0 or done == len(jobs):
            print(f"  EN/JA progress: {done}/{len(jobs)}")

    print(f"Batch 2 (Vietnamese NamMinhNeural & clean prose fixes): {len(VI_FIXES)} keys")
    for k, m_txt, f_txt in VI_FIXES:
        m_path = os.path.join("audio", "male", f"{k}.mp3")
        f_path = os.path.join("audio", "female", f"{k}.mp3")
        mb = await fetch_mp3(m_txt, "vi-VN-NamMinhNeural", "+0%")
        if f_txt is not None:
            fb = await fetch_mp3(f_txt, "vi-VN-HoaiMyNeural", "-6%")
            assert hashlib.sha256(fb).hexdigest() != hashlib.sha256(mb).hexdigest(), f"Identical hash {k}"
            atomic_write(f_path, fb)
        else:
            if os.path.exists(f_path):
                fb = open(f_path, "rb").read()
                assert hashlib.sha256(fb).hexdigest() != hashlib.sha256(mb).hexdigest(), f"Identical hash {k}"
        atomic_write(m_path, mb)
        print(f"  Fixed VI: {k} (M={len(mb)}B)")
        await asyncio.sleep(0.25)

    trim_trailing_silence_math()
    print("ALL TARGETED AUDIO FIXES COMPLETED!")


if __name__ == "__main__":
    asyncio.run(run())
