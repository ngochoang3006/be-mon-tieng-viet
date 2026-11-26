#!/usr/bin/env python3
"""Regenerate all 353 legacy Google-TTS (fff384c4) keys + 36 decodable sentence keys
using 100% Microsoft Edge Neural voices (zero Windows/Google robotic fallback).
Uses aiohttp.ThreadedResolver (avoids Windows Python 3.14 aiodns failure) and
streams to memory + atomic replace so existing MP3 files are never truncated on error.

Run on a machine with internet access:
    python tools/regen_natural_voices.py
"""
import asyncio
import hashlib
import os
import sys

try:
    import aiohttp
    import edge_tts
except ImportError:
    print("Please install edge-tts and aiohttp first: pip install edge-tts")
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

TEXT_MAP = {
  "art_mix_1": "Đỏ trộn với Vàng ra Màu Cam 🍊",
  "art_mix_4": "Đỏ trộn với Trắng ra Màu Hồng 🌸",
  "art_opt_dive_deep": "Lén bơi chỗ nước sâu",
  "art_opt_do": "Nốt Đô",
  "art_opt_eat_full": "Ăn thật no rồi chạy",
  "art_opt_green": "Màu Xanh Lá",
  "art_opt_guitar": "Guitar",
  "art_opt_la": "Nốt La",
  "art_opt_leave_it": "Bỏ đó chạy đi chơi",
  "art_opt_no_float": "Bỏ áo phao ra",
  "art_opt_orange": "Màu Cam",
  "art_opt_pianica": "Kenban Hamonika",
  "art_opt_run_pool": "Chạy nhảy quanh thành hồ",
  "art_opt_si": "Nốt Si",
  "art_opt_sleep": "Ngồi im không cử động",
  "art_opt_sol": "Nốt Son",
  "art_opt_sprint": "Chạy nước rút ngay",
  "art_opt_straight": "Ngồi thẳng lưng",
  "art_opt_warmup": "Khởi động xoay khớp",
  "art_opt_white": "Màu Trắng",
  "art_pe_1": "Thể dục buổi sáng. Vươn vai hít thở sâu, xoay cổ tay cổ chân để người dẻo dai cả ngày.",
  "art_pe_2": "Chạy bước nhỏ & Bật nhảy. Nhảy qua vạch vôi bằng hai chân, tiếp đất nhẹ nhàng bằng mũi bàn chân.",
  "art_pe_3": "Tư thế ngồi học chuẩn. Lưng thẳng, ngực không tì cạnh bàn, mắt cách vở 25–30 xăng-ti-mét.",
  "art_pe_4": "An toàn bơi lội mùa hè. Chỉ xuống hồ bơi khi có ba mẹ đi cùng, khởi động kỹ và mặc áo phao!",
  "art_pe_5": "Đạp xe đội mũ bảo hiểm. Luôn cài quai mũ bảo hiểm vừa vặn khi ngồi sau xe máy hoặc đạp xe.",
  "art_pe_6": "Giữ nhịp Phách & Trống. Vỗ tay đều theo nhịp 1-2-3-4 giúp cảm nhận âm nhạc thật chuẩn xác.",
  "art_q1": "Khi trộn màu Đỏ và màu Vàng với nhau, Bảo Long sẽ pha được màu gì?",
  "art_q3": "Nhạc cụ kèn phím Pianica thường được học sinh lớp 1 Nhật Bản thổi tên tiếng Nhật là gì?",
  "art_q5": "Khi ngồi vẽ tranh hoặc viết bài ở bàn học, tư thế nào bảo vệ mắt và cột sống của bé?",
  "art_q6": "Trước khi tập chạy hay đá bóng ở giờ Thể dục (体育), bé cần làm gì đầu tiên?",
  "art_q7": "Khi đi bơi mùa hè, quy tắc an toàn số một dành cho Bảo Long là gì?",
  "art_q8": "Khi nặn đất sét (Nendo) hoặc cắt dán thủ công (Origami) xong, bé nên làm gì?",
  "cheer_vn_win": "Hoan hô Bảo Long siêu giỏi!",
  "ethics_eco7": "Lá cây rụng khô",
  "ethics_lesson_10": "Phòng tránh nguy hiểm & Tự bảo vệ bản thân. Không chạm tay ướt vào ổ điện, không tự nghịch dao kéo nước nóng, không đi theo người lạ mặt.",
  "ethics_lesson_11": "Tự chuẩn bị cặp sách & Giữ gìn đồ dùng (ランドセル). Buổi tối tự kiểm tra sách vở, bút chì, hộp màu cho gọn vào cặp sách trước khi đi ngủ.",
  "ethics_lesson_12": "Quý trọng thức ăn & Tiết kiệm điện nước. Ăn hết cơm trong bát không bỏ thừa, luôn nói Itadakimasu / Con mời ba mẹ và khóa vòi nước sau khi dùng.",
  "ethics_lesson_9": "Đi ngủ đúng giờ & Giữ lời hứa (HĐTN Lớp 1). Đã hứa với ba mẹ, thầy cô hay bạn bè thì cố gắng làm đúng hẹn, không để người khác chờ lâu.",
  "ethics_sit10_good": "Tự xếp sách vở, hộp bút gọn vào cặp sách rồi đi ngủ sớm lúc 9 giờ",
  "ethics_sit12_bad": "Giấu nhanh vào túi quần mang về nhà làm của riêng mình",
  "ethics_sit9_bad": "Nhận kẹo rồi đi theo xem có đồ chơi gì vui không",
  "ethics_sit_10": "Tối nay ăn cơm và học bài xong rồi, ngày mai đi học lớp 1 thì tối nay Bảo Long nên làm gì?",
  "ethics_sit_11": "Vừa rửa tay xong còn ướt sũng nước, Bảo Long muốn bật quạt điện trong phòng. Con làm sao cho an toàn?",
  "ethics_sit_12": "Trong sân trường Bảo Long nhặt được một cục tẩy hình khủng long rất đẹp mà bạn nào làm rơi. Con làm gì?",
  "ethics_sit_9": "Ở cổng trường có người lạ mặt đưa kẹo ngon rủ Bảo Long đi theo ra chỗ khác chơi, con làm gì?",
  "ethics_tf_11": "Tự gấp quần áo và soạn sách vở vào cặp trước khi ngủ",
  "ethics_tf_12": "Chạy giỡn xô đẩy bạn trên cầu thang trường học",
  "ethics_tf_14": "Cầm kéo sắt hoặc que chọc vào lỗ ổ cắm điện",
  "ethics_tf_16": "Chọc phá kéo đuôi con chó hoặc con mèo lạ ngoài đường",
  "ja_st1_o1": "Chú chuột nhắt",
  "ja_st1_o2": "Khủng long T-Rex",
  "ja_st1_o3": "Chú voi con",
  "ja_st1_o4": "Sư tử dũng mãnh",
  "ja_st2_o1": "Con cá voi",
  "ja_story_1_q": "Trong truyện Củ cải khổng lồ, ai là bạn nhỏ cuối cùng tới kéo giúp và nhổ bật được củ cải?",
  "math_bond_10_10": "10 gồm 10 và 0",
  "math_bond_10_5": "10 gồm 5 và 5",
  "math_bond_10_6": "10 gồm 6 và 4",
  "math_bond_10_7": "10 gồm 7 và 3",
  "math_bond_10_8": "10 gồm 8 và 2",
  "math_bond_10_9": "10 gồm 9 và 1",
  "math_bond_7_3": "7 gồm 3 và 4",
  "math_bond_7_4": "7 gồm 4 và 3",
  "math_bond_8_0": "8 gồm 0 và 8",
  "math_bond_8_2": "8 gồm 2 và 6",
  "math_bond_8_3": "8 gồm 3 và 5",
  "math_bond_8_6": "8 gồm 6 và 2",
  "math_bond_8_7": "8 gồm 7 và 1",
  "math_bond_9_1": "9 gồm 1 và 8",
  "math_bond_9_2": "9 gồm 2 và 7",
  "math_bond_9_4": "9 gồm 4 và 5",
  "math_bond_9_5": "9 gồm 5 và 4",
  "math_clock_half_10": "10 giờ rưỡi",
  "math_clock_half_11": "11 giờ rưỡi",
  "math_cm_11": "Mô hình Shinkansen dài 11 xăng-ti-mét",
  "math_cm_7": "Chiếc bút chì dài 7 xăng-ti-mét",
  "math_cm_9": "Chú khủng long đồ chơi dài 9 xăng-ti-mét",
  "math_cm_opt_10": "10 xăng-ti-mét",
  "math_cm_opt_2": "2 xăng-ti-mét",
  "math_cm_opt_6": "6 xăng-ti-mét",
  "math_cm_opt_8": "8 xăng-ti-mét",
  "math_cm_opt_9": "9 xăng-ti-mét",
  "math_q_day_weekend": "Cuối tuần Bảo Long được nghỉ học là thứ mấy?",
  "math_q_ruler_len": "Đo xem đồ vật trên thước dài mấy xăng-ti-mét?",
  "math_q_solid_box": "Vật nào có dạng khối hộp chữ nhật?",
  "math_q_solid_cube": "Vật nào có dạng khối lập phương?",
  "math_q_solid_cylinder": "Vật nào có dạng khối trụ?",
  "math_solid_cube": "Khối lập phương",
  "math_solid_cylinder": "Khối trụ",
  "math_v_21": "hai mươi mốt",
  "math_v_29": "hai mươi chín",
  "math_v_30": "ba mươi",
  "math_v_34": "ba mươi tư",
  "math_v_35": "ba mươi lăm",
  "math_v_36": "ba mươi sáu",
  "math_v_42": "bốn mươi hai",
  "math_v_43": "bốn mươi ba",
  "math_v_45": "bốn mươi lăm",
  "math_v_55": "năm mươi lăm",
  "math_v_69": "sáu mươi chín",
  "math_v_71": "bảy mươi mốt",
  "math_v_76": "bảy mươi sáu",
  "math_v_87": "tám mươi bảy",
  "math_v_93": "chín mươi ba",
  "math_v_94": "chín mươi tư",
  "math_v_95": "chín mươi lăm",
  "math_v_96": "chín mươi sáu",
  "math_v_97": "chín mươi bảy",
  "math_v_98": "chín mươi tám",
  "oq_letter_c": "chữ c",
  "oq_letter_ch": "chữ ch",
  "oq_letter_g": "chữ g",
  "oq_letter_gh": "chữ gh",
  "oq_letter_l": "chữ l",
  "oq_letter_n": "chữ n",
  "oq_letter_ngh": "chữ ngh",
  "oq_letter_s": "chữ s",
  "oq_letter_tr": "chữ tr",
  "oq_q_oq1": "Từ con kiến, chọn chữ nào đúng?",
  "oq_q_oq10": "Từ con chó, chọn chữ nào đúng?",
  "oq_q_oq11": "Từ chiếc lá, chọn chữ nào đúng?",
  "oq_q_oq12": "Từ cây nến, chọn chữ nào đúng?",
  "oq_q_oq2": "Từ cái ghế, chọn chữ nào đúng?",
  "oq_q_oq5": "Từ con gà, chọn chữ nào đúng?",
  "oq_q_oq8": "Từ xe ô tô, chọn chữ nào đúng?",
  "ort_chtr": "Phân biệt CH & TR cong lưỡi. CH hay chỉ đồ dùng gia đình, họ hàng (chén, chổi, chú, chị, chó). TR hay chỉ thiên nhiên, hành động (tre, trăng, trời, trường)!",
  "ort_ck": "Chữ K chỉ đi với i, e, ê. Đứng trước I, E, Ê dùng chữ K (kiến, kéo, kênh). Các âm còn lại dùng C (cá, cờ, cú)!",
  "ort_ggh": "Chữ GH chỉ đi với i, e, ê. G ghép (GH) luôn đứng trước E, Ê, I (ghế, ghe, ghi). Còn lại dùng G đơn (gà, gỗ, gấu)!",
  "ort_ln": "Phân biệt L uốn lưỡi & N âm mũi. Phát âm chuẩn từng chữ: L chạm nhẹ vòm trên (lá, lúa, lớp, lịch). N nhẹ mũi (nến, nấm, nai, nước)!",
  "ort_ngngh": "Chữ NGH chỉ đi với i, e, ê. NGH gồm 3 chữ cái đi với E, Ê, I (nghe, nghé, nghỉ). NG đi với âm còn lại (ngựa, ngủ)!",
  "ort_sx": "Phân biệt S cong lưỡi & X nhẹ. S thường chỉ cây cối, con vật (sâu, sóc, sáo, sắn, sữa). X thường chỉ màu sắc, hành động (xanh, xe, xôi, xòe)!",
  "sc_asagao_2": "2. Nảy hai lá mầm. Sau vài ngày tắm nắng, hai chiếc lá non hình trái tim vươn lên!",
  "sc_asagao_3": "3. Ra lá thật & Leo giàn. Thân cây vươn dài, quấn nhẹ lên giàn tre hướng về phía Mặt Trời.",
  "sc_asagao_4": "4. Kết nụ hoa chúm chím. Những nụ hoa xoắn xinh màu tím chuẩn bị bung cánh vào sáng sớm!",
  "sc_asagao_5": "5. Nở rộ hoa rực rỡ. Hoan hô! Hoa Bìm Bìm nở rộ đón bình minh rực rỡ trên ban công lớp 1!",
  "sc_card_15": "Chăm sóc vật nuôi hiền lành. Cho chó mèo ăn sạch, không kéo đuôi hay trêu chọc lúc chúng đang ăn hoặc ngủ.",
  "sc_card_16": "Bảo vệ thiên nhiên hoang dã. Không hái hoa bẻ cành nơi công cộng và yêu thương các loài vật nhỏ bé.",
  "sc_card_17": "5 Giác quan kỳ diệu. Mắt nhìn, Tai nghe, Mũi ngửi, Lưỡi nếm vị và Da cảm nhận nóng lạnh mềm cứng.",
  "sc_card_18": "Đánh răng sáng và tối. Đánh răng đúng cách sau khi ăn và trước khi đi ngủ để răng trắng không bị sâu.",
  "sc_card_19": "Rửa tay 6 bước với xà phòng. Rửa tay thật sạch trước khi ăn, sau khi đi vệ sinh và sau khi chơi ngoài sân.",
  "sc_card_20": "Quy tắc vùng riêng tư. Không cho người lạ chạm vào vùng đồ bơi, biết hét to và kể ngay với ba mẹ.",
  "sc_card_22": "Mặt Trăng & Vì Sao. Ban đêm Mặt Trăng tròn hoặc khuyết tỏa sáng dịu dàng cùng hàng ngàn ngôi sao.",
  "sc_card_23": "4 Mùa Xuân Hạ Thu Đông. Xuân hoa đào nở, Hạ nắng biển xanh, Thu lá phong đỏ, Đông tuyết trắng và áo ấm.",
  "sc_card_24": "Tiết kiệm nước & Trồng cây. Khóa vòi nước sau khi dùng, tắt đèn khi ra khỏi phòng giúp Trái Đất luôn xanh tươi!",
  "sc_card_5": "Khám phá trường học. Trường có phòng học lớp 1, thư viện đọc sách, phòng y tế và sân chơi rộng.",
  "sc_opt_before_eat": "Trước bữa ăn",
  "sc_opt_break_tree": "Bẻ cành cây xanh",
  "sc_opt_flower": "Bông hoa",
  "sc_opt_leave_tap": "Mở nước chảy suốt đêm",
  "sc_opt_stay_in": "Ở trong nhà trú mưa",
  "sc_opt_swim_pond": "Bơi ngoài ao hồ",
  "sc_q3": "Khi thấy ổ cắm điện bị hở hoặc dây điện đứt, Bảo Long phải làm gì?",
  "sc_sense_1": "Đôi Mắt. Nhìn thấy màu sắc, chữ cái, khủng long và ánh sáng!",
  "sc_sense_2": "Đôi Tai. Nghe tiếng ba mẹ gọi, tiếng nhạc hay và tiếng Shinkansen!",
  "sc_sense_3": "Chiếc Mũi. Ngửi hương hoa thơm ngát và mùi cơm ngon mẹ nấu!",
  "spell_bướm": "bờ - ươm - bươm - sắc - bướm",
  "spell_bưởi": "bờ - ươi - bươi - hỏi - bưởi",
  "spell_bạn bè": "Bờ - an - ban - nặng - bạn, bờ - e - be - huyền - bè -> bạn bè",
  "spell_bảng đen": "Bờ - ang - bang - hỏi - bảng, đờ - en - đen -> bảng đen",
  "spell_chuồn chuồn": "Chờ - uôn - chuôn - huyền - chuồn -> chuồn chuồn",
  "spell_chăm chỉ": "Chờ - ăm - chăm, chờ - i - chi - hỏi - chỉ -> chăm chỉ",
  "spell_con kiến": "Cờ - on - con, ca - iên - kiên - sắc - kiến -> con kiến",
  "spell_con ong": "Cờ - on - con, o - ngờ - ong -> con ong",
  "spell_cánh đồng": "Cờ - anh - canh - sắc - cánh, đờ - ông - đông - huyền - đồng -> cánh đồng",
  "spell_cây tre": "Cờ - ây - cây, trờ - e - tre -> cây tre",
  "spell_cảm ơn": "Cờ - am - cam - hỏi - cảm, ơ - nờ - ơn -> cảm ơn",
  "spell_cầu vồng": "Cờ - âu - câu - huyền - cầu, vờ - ông - vông - huyền - vồng -> cầu vồng",
  "spell_cục tẩy": "Cờ - uc - cuc - nặng - cục, tờ - ây - tây - hỏi - tẩy -> cục tẩy",
  "spell_ghe": "gờ ghép - e - ghe",
  "spell_gọn gàng": "Gờ - on - gon - nặng - gọn, gờ - ang - gang - huyền - gàng -> gọn gàng",
  "spell_gỗ": "gờ - ô - gô - ngã - gỗ",
  "spell_hoa sen": "Hờ - oa - hoa, sờ - en - sen -> hoa sen",
  "spell_khuya": "khờ - uya - khuya",
  "spell_kiến": "ca - iên - kiên - sắc - kiến",
  "spell_lúa": "lờ - ua - lua - sắc - lúa",
  "spell_lễ phép": "Lờ - ê - lê - ngã - lễ, phờ - ep - phep - sắc - phép -> lễ phép",
  "spell_lớp học": "Lờ - ơp - lơp - sắc - lớp, hờ - oc - hoc - nặng - học -> lớp học",
  "spell_quê hương": "Quờ - ê - quê, hờ - ương - hương -> quê hương",
  "spell_quýt": "quờ - yt - quyt - sắc - quýt",
  "spell_rừng xanh": "Rờ - ưng - rưng - huyền - rừng, xờ - anh - xanh -> rừng xanh",
  "spell_sâu": "sờ - âu - sâu",
  "spell_thuyền": "thờ - uyên - thuyên - huyền - thuyền",
  "spell_thước kẻ": "Thờ - ươc - thươc - sắc - thước, ca - e - ke - hỏi - kẻ -> thước kẻ",
  "spell_thầy giáo": "Thờ - ây - thây - huyền - thầy, giờ - ao - giao - sắc - giáo -> thầy giáo",
  "spell_thật thà": "Thờ - ât - thât - nặng - thật, thờ - a - tha - huyền - thà -> thật thà",
  "spell_tre": "trờ - e - tre",
  "spell_trâu": "trờ - âu - trâu",
  "spell_tuyết": "tờ - uyêt - tuyêt - sắc - tuyết",
  "spell_vầng": "vờ - âng - vâng - huyền - vầng",
  "spell_yêu thương": "I dài - êu - yêu, thờ - ương - thương -> yêu thương",
  "spell_yến": "i dài - ê - nờ - yên - sắc - yến",
  "story_vn_1": "Ông mặt trời thức dậy, Tỏa nắng ấm sân trường. Bảo Long đeo cặp sách, Vui bước tới lớp thương!",
  "story_vn_1_o1": "Đeo cặp sách",
  "story_vn_1_o2": "Đội mũ đi ngủ",
  "story_vn_2": "Bàn tay mẹ nấu cơm ngon, Bàn tay mẹ vỗ giấc tròn bé thơ. Bảo Long ghi nhớ từng giờ, Chăm ngoan học giỏi chẳng mờ công ơn.",
  "story_vn_2_o1": "Nấu cơm ngon và vỗ về bé",
  "story_vn_3": "Sáng sớm trên cành na xanh, Chú chim sâu nhỏ nhảy quanh tìm mồi. Bắt sâu bảo vệ lá chồi, Cây vui nở quả ngọt bùi tặng ta.",
  "story_vn_3_o1": "Bắt sâu bảo vệ lá xanh",
  "story_vn_3_o2": "Bẻ hết cành hoa rụng xuống",
  "story_vn_3_o3": "Ngủ quên suốt cả ngày",
  "story_vn_3_q": "Chú chim sâu nhỏ làm việc gì có ích cho cây cối?",
  "story_vn_4": "Hạt mưa rơi lộp bộp, Tưới mát cả vườn rau. Mưa tạnh nắng bừng mau, Cầu vồng cong bảy sắc!",
  "story_vn_4_o2": "Bông tuyết rơi mùa đông",
  "story_vn_4_q": "Sau khi cơn mưa tạnh và nắng lên, trên trời xuất hiện gì?",
  "story_vn_5": "Đoàn tàu trắng mũi thon dài, Lướt êm qua núi nối hai miền gần. Hành khách trật tự chuyên cần, Chuyến tàu an toàn muôn phần vui tươi.",
  "story_vn_5_o2": "Chạy nhảy la hét ầm ĩ",
  "story_vn_5_q": "Khi đi trên tàu điện Shinkansen, hành khách giữ gìn điều gì?",
  "story_vn_6": "Trong đầm gì đẹp bằng sen, Lá xanh bông trắng lại chen nhị vàng. Hương thơm dịu mát xóm làng, Quê hương Việt Nam dịu dàng trong tim.",
  "story_vn_6_o2": "Quả dứa gai nhọn",
  "story_vn_6_o3": "Cục pin đồ chơi",
  "story_vn_6_q": "Bài thơ khen loài hoa nào đẹp nhất trong đầm nước Việt Nam?",
  "syl_bướm": "bướm",
  "syl_chăm": "chăm",
  "syl_chưng": "chưng",
  "syl_cánh": "cánh",
  "syl_cảm": "cảm",
  "syl_cặp": "cặp",
  "syl_cục": "cục",
  "syl_giáo": "giáo",
  "syl_gọn": "gọn",
  "syl_hà": "hà",
  "syl_kẻ": "kẻ",
  "syl_lễ": "lễ",
  "syl_nam": "nam",
  "syl_nội": "nội",
  "syl_oăn": "oăn",
  "syl_phép": "phép",
  "syl_rừng": "rừng",
  "syl_sen": "sen",
  "syl_sách": "sách",
  "syl_thước": "thước",
  "syl_thầy": "thầy",
  "syl_tẩy": "tẩy",
  "syl_uya": "uya",
  "syl_uyết": "uyết",
  "syl_uyền": "uyền",
  "syl_uân": "uân",
  "syl_uât": "uât",
  "syl_uôn": "uôn",
  "syl_việt": "việt",
  "syl_vồng": "vồng",
  "syl_xin": "xin",
  "syl_yên": "yên",
  "syl_yêu": "yêu",
  "syl_òe": "òe",
  "syl_ýt": "ýt",
  "syl_ơn": "ơn",
  "syl_ươm": "ươm",
  "syl_ướm": "ướm",
  "vi_en_v37": "Cây bút",
  "vi_en_v38": "Cặp sách",
  "vi_en_v49": "Mặt trời",
  "vi_en_v56": "Bông hoa",
  "vi_en_v57": "Số một",
  "vi_en_v58": "Số hai",
  "vi_h_あ": "Chữ A, Kẹo",
  "vi_h_う": "Chữ U, Con bò",
  "vi_h_お": "Chữ O, Cơm nắm",
  "vi_h_き": "Chữ KI, Cái cây",
  "vi_h_く": "Chữ KU, Ô tô",
  "vi_h_け": "Chữ KE, Tẩy",
  "vi_h_こ": "Chữ KO, Em bé",
  "vi_h_し": "Chữ SHI, Shinkansen",
  "vi_h_す": "Chữ SU, Dưa hấu",
  "vi_h_せ": "Chữ SE, Thế giới",
  "vi_h_そ": "Chữ SO, Bầu trời",
  "vi_h_た": "Chữ TA, Quả trứng",
  "vi_h_と": "Chữ TO, Con chim",
  "vi_h_な": "Chữ NA, Mùa hè",
  "vi_h_ぬ": "Chữ NU, Thú bông",
  "vi_h_の": "Chữ NO, Quyển vở",
  "vi_h_は": "Chữ HA, Bông hoa",
  "vi_h_ひ": "Chữ HI, Máy bay",
  "vi_h_へ": "Chữ HE, Trực thăng",
  "vi_ja_kanji_13": "Đồng Yên / Tròn",
  "vi_ja_kanji_15": "Mặt Trăng / Tháng",
  "vi_ja_kanji_16": "Ngọn lửa",
  "vi_ja_kanji_18": "Cây gỗ",
  "vi_ja_kanji_21": "Bên trên",
  "vi_ja_kanji_22": "Bên dưới",
  "vi_ja_kanji_24": "Bên phải",
  "vi_ja_kanji_25": "Ở giữa / Bên trong",
  "vi_ja_kanji_26": "To lớn",
  "vi_ja_kanji_33": "Con người",
  "vi_ja_kanji_36": "Em bé / Trẻ con",
  "vi_ja_kanji_38": "Côn trùng / Bọ",
  "vi_ja_kanji_40": "Sức mạnh",
  "vi_ja_kanji_44": "Khu rừng rậm",
  "vi_ja_kanji_46": "Bãi cỏ xanh",
  "vi_ja_kanji_48": "Cây tre",
  "vi_ja_kanji_49": "Hòn đá",
  "vi_ja_kanji_52": "Bầu trời cao",
  "vi_ja_kanji_56": "Sớm / Nhanh",
  "vi_ja_kanji_57": "Ngôi làng",
  "vi_ja_kanji_58": "Khu phố / Thị trấn",
  "vi_ja_kanji_59": "Xe ô tô",
  "vi_ja_kanji_60": "Viên ngọc / Bóng tròn",
  "vi_ja_kanji_63": "Trước / Thầy cô",
  "vi_ja_kanji_66": "Câu văn",
  "vi_ja_kanji_67": "Quyển sách / Gốc",
  "vi_ja_kanji_68": "Tên gọi",
  "vi_ja_kanji_69": "Năm (Thời gian)",
  "vi_ja_kanji_73": "Đứng lên",
  "vi_ja_kanji_74": "Nhìn / Ngắm xem",
  "vi_ja_kanji_78": "Màu trắng",
  "vi_ja_kanji_79": "Vị vua / Chúa tể",
  "vi_ja_kanji_80": "Sợi chỉ / Sợi tơ",
  "vi_ja_v25": "Ba (Bố)",
  "vi_ja_v28": "Bà nội / ngoại",
  "vi_ja_v30": "Thầy / Cô giáo",
  "vi_ja_v32": "Anh trai",
  "vi_ja_v34": "Cặp sách lớp 1 Nhật",
  "vi_ja_v35": "Bút chì",
  "vi_ja_v36": "Sách giáo khoa",
  "vi_ja_v39": "Chủ Nhật",
  "vi_ja_v45": "Ngọn núi",
  "vi_ja_v47": "Ông Mặt Trời",
  "vi_ja_v48": "Chị Hằng / Mặt Trăng",
  "vi_ja_v50": "Mùa Hạ (Hè)",
  "vi_ja_v55": "Cố gắng lên nhé!",
  "vi_k_ウ": "Chữ cứng U, Thỏ",
  "vi_k_ロ": "Chữ cứng RO, Robot",
  "vi_k_ワ": "Chữ cứng WA, Cá sấu",
  "vi_k_ヲ": "Chữ cứng WO, Trợ từ",
  "word_bươm bướm": "bươm bướm",
  "word_bướm": "bướm",
  "word_chăm chỉ": "chăm chỉ",
  "word_con ong": "con ong",
  "word_cây tre": "cây tre",
  "word_ghe": "ghe",
  "word_gỗ": "gỗ",
  "word_hoa sen": "hoa sen",
  "word_khoai": "khoai",
  "word_luật": "luật",
  "word_lược": "lược",
  "word_lễ phép": "lễ phép",
  "word_lớp học": "lớp học",
  "word_quê hương": "quê hương",
  "word_quýt": "quýt",
  "word_sáo": "sáo",
  "word_sâu": "sâu",
  "word_thầy giáo": "thầy giáo",
  "word_thật thà": "thật thà",
  "word_tiệc": "tiệc",
  "word_tre": "tre",
  "word_trâu": "trâu",
  "word_trăng": "trăng",
  "word_trống đồng": "trống đồng",
  "word_tuyết": "tuyết",
  "word_xào": "xào",
  "word_xòe": "xòe",
  "word_yêu thương": "yêu thương",
  "word_áo dài": "áo dài",
  "decod_1_1": "Bé tập đọc sách.",
  "decod_1_2": "Dép đỏ, cặp, hộp.",
  "decod_1_3": "Bếp hồng, súp, kẹo.",
  "decod_2_1": "Bé viết tập vở.",
  "decod_2_2": "Táo, mận, quýt đỏ.",
  "decod_2_3": "Mặt trời, đất Việt.",
  "decod_3_1": "Bé học đọc sách.",
  "decod_3_2": "Sóc đọc sách, ngựa chạy.",
  "decod_3_3": "Cúc vàng, gạch đỏ.",
  "decod_4_1": "Mẹ ăn cơm, kem.",
  "decod_4_2": "Bạn bè chăm chỉ.",
  "decod_4_3": "Chim hót, vườn cam.",
  "decod_5_1": "Voi bơi suối núi.",
  "decod_5_2": "Máy bay bay, chim sáo.",
  "decod_5_3": "Bưởi, chuối, dâu, xoài.",
  "decod_6_1": "Trăng vàng, mây hồng.",
  "decod_6_2": "Trống đồng, sông xanh.",
  "decod_6_3": "Chuông, bóng, cánh đồng.",
  "decod_7_1": "Kiến chăm, yến bay.",
  "decod_7_2": "Thiệp hồng, tiệc tết.",
  "decod_7_3": "Biển xanh, thuyền, diều.",
  "decod_8_1": "Bố mẹ yêu thương.",
  "decod_8_2": "Chuồn chuồn, bươm bướm.",
  "decod_8_3": "Miệng cười, uống sữa.",
  "decod_9_1": "Hoa sen, hoa hồng.",
  "decod_9_2": "Tóc xoăn, áo dài.",
  "decod_9_3": "Khoai vàng, hoa huệ.",
  "decod_10_1": "Xuân hồng, hoa huệ.",
  "decod_10_2": "Trăng khuya, tuyết xanh.",
  "decod_10_3": "Bé lễ phép, thật thà.",
  "decod_11_1": "Xe cứu hỏa đỏ.",
  "decod_11_2": "Tre xanh, sáo hót.",
  "decod_11_3": "Nai con, mèo ngủ.",
  "decod_12_1": "Cô giáo, bảng đen.",
  "decod_12_2": "Ghế gỗ, thước kẻ.",
  "decod_12_3": "Nghé, ngựa chạy nhanh."
}


def voices_for_key(key: str):
    if key.startswith("en_") or key.startswith("cheer_en"):
        return ("en-US-JennyNeural", "en-US-AndrewNeural")
    if (key.startswith("ja_") or key.startswith("cheer_ja")) and not key.startswith(("ja_st", "ja_story_")):
        return ("ja-JP-NanamiNeural", "ja-JP-KeitaNeural")
    return ("vi-VN-HoaiMyNeural", "vi-VN-NamMinhNeural")


def needs_regen(f_path: str, m_path: str) -> bool:
    if not os.path.exists(f_path) or not os.path.exists(m_path):
        return True
    if os.path.getsize(f_path) < 500 or os.path.getsize(m_path) < 500:
        return True
    with open(f_path, "rb") as ff, open(m_path, "rb") as mf:
        fb, mb = ff.read(), mf.read()
    if fb[:4].hex() == "fff384c4" or mb[:4].hex() == "fff384c4":
        return True
    if hashlib.sha256(fb).hexdigest() == hashlib.sha256(mb).hexdigest():
        return True
    return False


async def fetch_mp3_bytes(text: str, voice: str) -> bytes:
    last_err = None
    for attempt in range(3):
        connector = aiohttp.TCPConnector(resolver=aiohttp.ThreadedResolver())
        try:
            comm = edge_tts.Communicate(text, voice, rate="-6%", connector=connector)
            buf = bytearray()
            async for msg in comm.stream():
                if msg["type"] == "audio":
                    buf.extend(msg["data"])
            data = bytes(buf)
            if len(data) < 500:
                raise RuntimeError(f"Audio too short ({len(data)} bytes)")
            return data
        except Exception as err:
            last_err = err
            await asyncio.sleep(0.8 * (attempt + 1))
    raise last_err


def atomic_write(path: str, data: bytes):
    tmp = f"{path}.tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, path)


async def synth_one(sem: asyncio.Semaphore, key: str, text: str):
    f_voice, m_voice = voices_for_key(key)
    f_path = os.path.join("audio", "female", f"{key}.mp3")
    m_path = os.path.join("audio", "male", f"{key}.mp3")
    if not needs_regen(f_path, m_path):
        return False
    async with sem:
        fb = await fetch_mp3_bytes(text, f_voice)
        mb = await fetch_mp3_bytes(text, m_voice)
    assert fb[:4].hex() != "fff384c4", f"Unexpected fallback header on female {key}"
    assert mb[:4].hex() != "fff384c4", f"Unexpected fallback header on male {key}"
    assert hashlib.sha256(fb).hexdigest() != hashlib.sha256(mb).hexdigest(), f"Identical F/M hash: {key}"
    atomic_write(f_path, fb)
    atomic_write(m_path, mb)
    return True


async def run():
    todo = [(k, t) for k, t in TEXT_MAP.items() if needs_regen(os.path.join("audio", "female", f"{k}.mp3"), os.path.join("audio", "male", f"{k}.mp3"))]
    print(f"Keys checked={len(TEXT_MAP)}, needing neural generation={len(todo)}")
    if not todo:
        print("All pairs already natural Neural MP3s!")
        return
    sem = asyncio.Semaphore(5)
    tasks = [synth_one(sem, k, t) for k, t in todo]
    done = 0
    for coro in asyncio.as_completed(tasks):
        await coro
        done += 1
        if done % 20 == 0 or done == len(todo):
            print(f"Regenerated {done}/{len(todo)} natural neural audio pairs...")
    print("DONE! All natural Edge Neural Female/Male MP3s are verified on disk.")


if __name__ == "__main__":
    asyncio.run(run())
