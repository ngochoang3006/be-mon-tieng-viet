#!/usr/bin/env python3
"""Comprehensive Edge TTS audio generator, repair & orphan cleanup tool.

- Uses aiohttp.ThreadedResolver (prevents aiodns DNS failure on Windows Python 3.14)
- Self-regulating concurrent Wave engine (F/M independent jobs)
- Repairs/generates missing VI syllables, words, spellings, minimal-pair tones, decodable sentence, math_blank
- Regenerates corrected Japanese Grade-1 story lines & full narrations + Yoon/Sokuon kana
- Verifies >500B & SHA-256(F) != SHA-256(M)
- Safely deletes dead unreferenced spell_* and syl_* orphan pairs
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

VI_PAIRS = {
    # Missing from data.js fixes
    "syl_ênh": "ênh.",
    "syl_ón": "ón.",
    "syl_ổi": "ổi.",
    "syl_ừa": "ừa.",
    "syl_mùa": "mùa.",
    "syl_nở": "nở.",
    "syl_yêu": "yêu.",
    "syl_ýt": "ýt.",
    "word_che": "che.",
    "word_chổi": "chổi.",
    "word_cò": "cò.",
    "word_dừa": "dừa.",
    "word_kênh": "kênh.",
    "word_làng": "làng.",
    "word_ná": "ná.",
    "word_nón": "nón.",
    "spell_che": "Chờ - e - che!",
    "spell_chổi": "Chờ - ôi - chôi - hỏi - chổi!",
    "spell_cò": "Cờ - o - co - huyền - cò!",
    "spell_dừa": "Dờ - ưa - dưa - huyền - dừa!",
    "spell_kênh": "Ca - ênh - kênh!",
    "spell_làng": "Lờ - ang - lang - huyền - làng!",
    "spell_nón": "Nờ - on - non - sắc - nón!",
    # Minimal pair drills without spoiler tone names
    "mp_tone_ba": "ba.",
    "mp_tone_ba_sac": "bá.",
    "mp_tone_ba_huyen": "bà.",
    "mp_tone_ba_hoi": "bả.",
    "mp_tone_ba_nga": "bã.",
    "mp_tone_ba_nang": "bạ.",
    # Updated decodable sentence (Bài 10)
    "decod_10_3": "Mùa xuân, hoa huệ nở.",
    # Math sequence/compare missing-number spoken placeholder
    "math_blank": "bằng mấy?",
}

JA_STORY_4_LINES = [
    "ぼくと 犬の エルフは、いつも いっしょに おおきく なりました。",
    "ぼくが せが のびるに つれて、エルフは だんだん 年を とって いきました。",
    "ある ころから、エルフは 階段を のぼるのも つらく なりました。ぼくは エルフを だきかかえて 部屋へ はこびました。",
    "おふとんの 横に ねむる エルフの おなかを やさしく なでながら、ぼくは まいばん ささやきました。",
    "「エルフ、ぼくは ずうっと ずっと、おまえが 大すきだよ。」エルフは うれしそうに しっぽを ひとふり しました。",
    "ある あさ、目を さますと、エルフは しずかに 眠るように 旅立って いました。家族みんなが 泣きました。",
    "となりの 家の 子が 新しい 子犬を くれようと しましたが、ぼくは 「いまは いいよ」と ことわりました。",
    "だって ぼくは、まいばん エルフに 「ずうっと 大すきだよ」と 伝えつづけて きたから、心は あったかかったのです。",
]

JA_STORY_8_LINES = [
    "どうぶつの 赤ちゃんは、生まれた ばかりの ころ、どんな ようすを しているのでしょうか。",
    "ライオンの 赤ちゃんは、とても 小さく 生まれます。まだ 目も 見えず、耳も よく きこえません。",
    "お乳を のんで すくすく そだち、いっかげつくらいで ようやく 歩けるように なります。",
    "しまうまの 赤ちゃんは、生まれた ばかりでも、とても 大きく 立派な しまもようが あります。",
    "てきに おそわれても すぐ にげられるように、生まれて いちじかんも たたずに 立ちあがって 歩きます。",
    "カンガルーの 赤ちゃんは、なんと 親指ほどしか ない ほど 小さく 生まれます。",
    "赤ちゃんは じぶんで おかあさんの ふくろの 中へ はいり、その中で お乳を のんで 育ちます。",
    "おなじ 赤ちゃんでも、生きる ばしょに 合わせて 生まれたときの すがたが ちがうのですね。",
]

JA_STORY_10_LINES = [
    "ある日、かにが ひろった おむすびを、ずるい さるが 「かきの たね」と とりかえました。",
    "かには たねを うえて、「はやく めを だせ かきの たね」と まいにち 大切に 世話を しました。",
    "やがて りっぱな かきの 木に あまい 実が たくさん なりましたが、かには 木に のぼれません。",
    "さるが 木に のぼって、自分だけ あまい 実を 食べ、かたくて 青い 実を かにに ぶつけました。",
    "けがをした かにの ために、うす、くり、はちが 仲間に なって たちあがりました。",
    "みんなは さるの 家へ 入り、それぞれの ばしょに かくれて さるが 帰るのを まちました。",
    "帰ってきた さるは、くりに おどろき、はちに 追われ、やねから おりた うすに おさえられました。",
    "さるは 心から ごめんなさいと あやまり、みんなは 仲良く かきの 実を 分け合って 食べました。",
]

JA_PAIRS = {
    "ja_story_4_l2": JA_STORY_4_LINES[1],
    "ja_story_4": " ".join(JA_STORY_4_LINES),
    "ja_story_8_l2": JA_STORY_8_LINES[1],
    "ja_story_8": " ".join(JA_STORY_8_LINES),
    "ja_story_10_l5": JA_STORY_10_LINES[4],
    "ja_story_10": " ".join(JA_STORY_10_LINES),
    "ja_hira_きゃ": "きゃー",
    "ja_hira_きゅ": "きゅー",
    "ja_hira_きょ": "きょー",
    "ja_hira_しゃ": "しゃー",
    "ja_hira_しゅ": "しゅー",
    "ja_hira_しょ": "しょー",
    "ja_hira_ちゃ": "ちゃー",
    "ja_hira_ちゅ": "ちゅー",
    "ja_hira_ちょ": "ちょー",
    "ja_hira_sokuon": "きって、らっぱ！",
}

DEAD_ORPHANS = [
    # 15 unused alphabet/digraph spell_*
    "spell_bi", "spell_cây", "spell_cú", "spell_cờ", "spell_khỉ", "spell_me",
    "spell_nơ", "spell_phở", "spell_pin", "spell_quạt", "spell_rùa", "spell_sư tử",
    "spell_thỏ", "spell_trứng", "spell_y tá",
    # 28 obsolete / unreferenced syl_*
    "syl_ba", "syl_buýt", "syl_búa", "syl_bạo", "syl_chân", "syl_chúa", "syl_chạy",
    "syl_cảnh", "syl_cổ", "syl_dấu", "syl_gai", "syl_giáp", "syl_khủng", "syl_long",
    "syl_sát", "syl_sừng", "syl_thăng", "syl_thạch", "syl_thủy", "syl_trực",
    "syl_tàu", "syl_tải", "syl_xe", "syl_xúc", "syl_yt", "syl_êu", "syl_đuôi", "syl_đạp",
]


async def synth_one(text: str, voice: str, rate: str) -> bytes:
    connector = aiohttp.TCPConnector(resolver=aiohttp.ThreadedResolver())
    comm = edge_tts.Communicate(text, voice, rate=rate, connector=connector)
    buf = bytearray()
    async for msg in comm.stream():
        if msg["type"] == "audio":
            buf.extend(msg["data"])
    data = bytes(buf)
    if len(data) < 500:
        raise RuntimeError(f"Short/empty audio ({len(data)}B)")
    return data


def atomic_write(path: str, data: bytes):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = f"{path}.tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, path)


def trim_trailing_silence(data: bytes) -> bytes:
    if len(data) < 800 or data[:4].hex() != "fff364c4" or len(data) % 144 != 0:
        return data
    nf = len(data) // 144
    active = [
        i for i in range(nf)
        if sum(1 for x in data[i * 144 + 21:(i + 1) * 144] if x not in (0x00, 0x55, 0xAA, 0xFF)) > 12
    ]
    if not active:
        return data
    keep_frames = max(12, min(nf, active[-1] + 10))
    if keep_frames < nf - 3 and keep_frames * 144 >= 800:
        return data[:keep_frames * 144]
    return data


async def run():
    jobs = []
    for k, txt in VI_PAIRS.items():
        jobs.append((os.path.join("audio", "female", f"{k}.mp3"), txt, "vi-VN-HoaiMyNeural", "-6%", k == "math_blank"))
        jobs.append((os.path.join("audio", "male", f"{k}.mp3"), txt, "vi-VN-NamMinhNeural", "+0%", k == "math_blank"))
    for k, txt in JA_PAIRS.items():
        jobs.append((os.path.join("audio", "female", f"{k}.mp3"), txt, "ja-JP-NanamiNeural", "+0%", False))
        jobs.append((os.path.join("audio", "male", f"{k}.mp3"), txt, "ja-JP-KeitaNeural", "+0%", False))

    print(f"Starting Wave Engine for {len(jobs)} MP3 files ({len(VI_PAIRS)} VI + {len(JA_PAIRS)} JA pairs)...")
    pending = list(jobs)
    sem = asyncio.Semaphore(4)
    wave = 1

    while pending and wave <= 8:
        print(f"Wave {wave}: {len(pending)} remaining")
        failed = []
        ok_count = 0

        async def worker(job):
            nonlocal ok_count
            path, txt, voice, rate, do_trim = job
            async with sem:
                try:
                    data = await synth_one(txt, voice, rate)
                    if do_trim:
                        data = trim_trailing_silence(data)
                    atomic_write(path, data)
                    ok_count += 1
                except Exception as err:
                    failed.append((job, err))

        await asyncio.gather(*(worker(j) for j in pending))
        print(f"  Wave {wave} done: ok={ok_count}, failed={len(failed)}")
        if failed:
            sample_err = str(failed[0][1])
            print(f"  Sample error: {sample_err[:120]}")
            pending = [j for j, _ in failed]
            await asyncio.sleep(5.0 if ok_count == 0 else 1.5)
            wave += 1
        else:
            pending = []
            break

    if pending:
        print(f"ERROR: {len(pending)} jobs failed after max waves: {[j[0] for j in pending[:10]]}")
        return 1

    # Verify F/M asymmetry & size for all touched keys
    all_keys = list(VI_PAIRS.keys()) + list(JA_PAIRS.keys())
    for k in all_keys:
        fp = os.path.join("audio", "female", f"{k}.mp3")
        mp = os.path.join("audio", "male", f"{k}.mp3")
        fb, mb = open(fp, "rb").read(), open(mp, "rb").read()
        assert len(fb) >= 500 and len(mb) >= 500, f"Size check failed: {k}"
        assert hashlib.sha256(fb).hexdigest() != hashlib.sha256(mb).hexdigest(), f"Identical F/M hash: {k}"
    print(f"Verified {len(all_keys)} F/M pairs (>500B & unique hashes).")

    # Cleanup verified dead orphan pairs
    js_corpus = "\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob("*.js")))
    removed = 0
    for k in DEAD_ORPHANS:
        # Extra safety: never delete if key string appears anywhere in JS
        if f"'{k}'" in js_corpus or f'"{k}"' in js_corpus:
            print(f"SKIP delete referenced key: {k}")
            continue
        for g in ("female", "male"):
            p = os.path.join("audio", g, f"{k}.mp3")
            if os.path.exists(p):
                os.remove(p)
                removed += 1
    print(f"Removed {removed} dead orphan MP3 files ({removed // 2} pairs).")
    print("ALL AUDIO GENERATION & CLEANUP COMPLETE!")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(run()))
