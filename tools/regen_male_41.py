#!/usr/bin/env python3
"""Regenerate the 41 male Vietnamese MP3 files that currently match female hashes."""
import asyncio
import hashlib
import os
import sys

try:
    import aiohttp
    import edge_tts
except ImportError:
    print("Please install edge-tts first: pip install edge-tts")
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

TEXT_MAP = {
    "art_opt_la": "Nốt La",
    "art_opt_sol": "Nốt Son",
    "art_opt_white": "Màu Trắng",
    "art_pe_5": "Đạp xe đội mũ bảo hiểm. Luôn cài quai mũ bảo hiểm vừa vặn khi ngồi sau xe máy hoặc đạp xe.",
    "art_pe_6": "Giữ nhịp Phách và Trống. Vỗ tay đều theo nhịp 1, 2, 3, 4 giúp cảm nhận âm nhạc thật chuẩn xác.",
    "art_q1": "Khi trộn màu Đỏ và màu Vàng với nhau, Bảo Long sẽ pha được màu gì?",
    "art_q5": "Khi ngồi vẽ tranh hoặc viết bài ở bàn học, tư thế nào bảo vệ mắt và cột sống của bé?",
    "cheer_vn_win": "Hoan hô Bảo Long siêu giỏi!",
    "ethics_lesson_9": "Đi ngủ đúng giờ và giữ lời hứa. Đã hứa với ba mẹ, thầy cô hay bạn bè thì cố gắng làm đúng hẹn, không để người khác chờ lâu.",
    "ethics_lesson_10": "Phòng tránh nguy hiểm và tự bảo vệ bản thân. Không chạm tay ướt vào ổ điện, không tự nghịch dao kéo nước nóng, không đi theo người lạ mặt.",
    "ethics_lesson_11": "Tự chuẩn bị cặp sách và giữ gìn đồ dùng. Buổi tối tự kiểm tra sách vở, bút chì, hộp màu cho gọn vào cặp sách trước khi đi ngủ.",
    "ethics_sit10_good": "Tự xếp sách vở, hộp bút gọn vào cặp sách rồi đi ngủ sớm lúc 9 giờ",
    "ethics_sit_12": "Trong sân trường Bảo Long nhặt được một cục tẩy hình khủng long rất đẹp mà bạn nào làm rơi. Con làm gì?",
    "math_bond_10_5": "10 gồm 5 và 5",
    "math_bond_7_4": "7 gồm 4 và 3",
    "math_v_93": "chín mươi ba",
    "oq_q_oq5": "Từ con gà, chọn chữ nào đúng?",
    "sc_asagao_3": "3. Ra lá thật và leo giàn. Thân cây vươn dài, quấn nhẹ lên giàn tre hướng về phía Mặt Trời.",
    "sc_asagao_5": "5. Nở rộ hoa rực rỡ. Hoan hô! Hoa Bìm Bìm nở rộ đón bình minh rực rỡ trên ban công lớp 1!",
    "sc_card_16": "Bảo vệ thiên nhiên hoang dã. Không hái hoa bẻ cành nơi công cộng và yêu thương các loài vật nhỏ bé.",
    "sc_card_24": "Tiết kiệm nước và trồng cây. Khóa vòi nước sau khi dùng, tắt đèn khi ra khỏi phòng giúp Trái Đất luôn xanh tươi!",
    "spell_bảng đen": "Bờ, ang, bang, hỏi, bảng, đờ, en, đen, bảng đen",
    "spell_cây tre": "Cờ, ây, cây, trờ, e, tre, cây tre",
    "spell_sâu": "sờ, âu, sâu",
    "spell_thầy giáo": "Thờ, ây, thây, huyền, thầy, giờ, ao, giao, sắc, giáo, thầy giáo",
    "spell_thật thà": "Thờ, ât, thât, nặng, thật, thờ, a, tha, huyền, thà, thật thà",
    "spell_yêu thương": "I dài, êu, yêu, thờ, ương, thương, yêu thương",
    "story_vn_2": "Bàn tay mẹ nấu cơm ngon, Bàn tay mẹ vỗ giấc tròn bé thơ. Bảo Long ghi nhớ từng giờ, Chăm ngoan học giỏi chẳng mờ công ơn.",
    "story_vn_3": "Sáng sớm trên cành na xanh, Chú chim sâu nhỏ nhảy quanh tìm mồi. Bắt sâu bảo vệ lá chồi, Cây vui nở quả ngọt bùi tặng ta.",
    "story_vn_3_o1": "Bắt sâu bảo vệ lá xanh",
    "story_vn_5": "Đoàn tàu trắng mũi thon dài, Lướt êm qua núi nối hai miền gần. Hành khách trật tự chuyên cần, Chuyến tàu an toàn muôn phần vui tươi.",
    "vi_en_v56": "Bông hoa",
    "vi_h_こ": "Chữ KO, em bé",
    "vi_ja_kanji_15": "Mặt Trăng, Tháng",
    "vi_ja_kanji_40": "Sức mạnh",
    "vi_ja_kanji_56": "Sớm, Nhanh",
    "vi_ja_kanji_68": "Tên gọi",
    "vi_ja_kanji_80": "Sợi chỉ, Sợi tơ",
    "word_con ong": "con ong",
    "word_cây tre": "cây tre",
    "word_khoai": "khoai",
}


async def synth_bytes(text: str, voice: str) -> bytes:
    conn = aiohttp.TCPConnector(resolver=aiohttp.ThreadedResolver())
    comm = edge_tts.Communicate(text, voice, rate="-6%", connector=conn)
    buf = bytearray()
    async for msg in comm.stream():
        if msg["type"] == "audio":
            buf.extend(msg["data"])
    data = bytes(buf)
    if len(data) < 500:
        raise RuntimeError(f"Audio too short ({len(data)}B)")
    return data


async def run():
    for key, text in TEXT_MAP.items():
        m_path = os.path.join("audio", "male", f"{key}.mp3")
        f_path = os.path.join("audio", "female", f"{key}.mp3")
        mb = await synth_bytes(text, "vi-VN-NamMinhNeural")
        fb = await synth_bytes(text, "vi-VN-HoaiMyNeural")
        assert hashlib.sha256(fb).hexdigest() != hashlib.sha256(mb).hexdigest(), f"Still identical after regen: {key}"
        for p, d in ((m_path, mb), (f_path, fb)):
            with open(p + ".tmp", "wb") as tf:
                tf.write(d)
            os.replace(p + ".tmp", p)
        print(f"OK {key}")


if __name__ == "__main__":
    asyncio.run(run())
