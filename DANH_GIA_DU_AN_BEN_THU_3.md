# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `02bcb7d` + kiểm toán sửa toàn diện hình ảnh, câu chữ & logic `v20261128v15`)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 28/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, kho ảnh minh họa & PWA, hệ thống hoạt họa đa cảnh theo từng câu truyện, bộ trò chơi Rồng – Khủng Long mở rộng và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript + Canvas 2D + Service Worker PWA + IndexedDB**, không framework, không bundler, không backend). Tổng cộng có **15 module JS ứng dụng + `sw.js`** (`16` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX sống động)**, IIFE `storySceneRenderer` (`29` phông nền đa cảnh & hoạt họa từng câu), IIFE `dinoDragonGames` (`4` mini-game Rồng/Khủng Long mới) và IIFE `living_media.js`.

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, `VIET_STORIES_DATA` (6 truyện kèm ảnh bìa) | *(0 function — hằng dữ liệu)* |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Bộ điều phối âm thanh 3 tầng Nam/Nữ Edge Neural, mở khóa iOS an toàn, true LRU cache (800 mục), `prefetchKeys` giới hạn 4, `DynamicsCompressorNode`, ưu tiên ghi âm gia đình (IndexedDB) & chặn giọng máy Windows | **Class `SoundManager` (`46` methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay (`+20 🪙 Xu`/bước, `dailyLog` tỉa 90 ngày), Leitner SRS (`[0,1,1,3,7,14]`), Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **26 top-level functions** + `customVoiceStore` |
| [`story_scenes.js`](story_scenes.js) | 1.375 dòng<br>(62.827 B) | **Bộ dựng cảnh hoạt họa 60fps chính xác theo từng câu (`STORYBOARDS` cho 10 truyện Nhật, 6 truyện Việt, `traffic_hero`; `29` `BACKDROPS`, động vật giải phẫu riêng cho Cua/Ếch/Chim/Sư tử/Ngựa vằn/Kangaroo & `drawSmartImageFrame` không cắt ảnh dài)** | **IIFE Module `window.storySceneRenderer` (`drawSceneAnimated`, `getSceneExtras`)** |
| [`living_media.js`](living_media.js) | 1.347 dòng<br>(57.394 B) | **Rạp Phim Hoạt Hình 60fps Offline (`storyTheater` + Dino MC có mào vàng & bìa Giao thông `eth_6.svg` chuẩn), Kho Video Ba Mẹ (`customVideoStore` + YouTube NoCookie), `livingFX`, WebAudio SFX & `dinoBuddy`** | **IIFE Module (`initLivingMedia`, `openStoryTheater`, `openVideoHub`, `livingFX`, `dinoBuddy`, `customVideoStore`)** |
| [`dino_dragon_games.js`](dino_dragon_games.js) | 601 dòng<br>(25.365 B) | **4 Trò chơi Rồng & Khủng Long mới: Ấp Trứng Rồng Thần (`8` màu trứng theo hệ), Rồng Bắt Chữ, Cho Khủng Long Ăn Chữ (chỉ lọc món ăn/hoa quả hợp lý) & Ấp Trứng Khủng Long Bí Ẩn (`10` trứng)** | **IIFE Module `window.dinoDragonGames` (factory `createEggHatchController` & `createArenaFeedGame`)** |
| [`app.js`](app.js) | 3.475 dòng<br>(137.781 B) | Điều phối toàn app sau `loadProgress()`, Puzzle, Từ vựng, Đọc hiểu VN, Khủng long & Xe, HiDPI Canvas 4 ô ly, **9 Mini-game** trong Game Hub, drawer di động `#sideNav` & Focus Mode | **82+ top-level functions** |
| [`math.js`](math.js) | 1.920 dòng<br>(81.204 B) | Toán Lớp 1 VN & JP (`0–100`, Sakura, Bảng `1–100`, đồng hồ 12 giờ + kim giây `#btnToggleClockTick`, 2D/3D SVG, thước cm không lộ đáp án `? cm` khi đố, Thứ; nút `.math-ans-row` chuẩn A11y không lồng `role="button"`) | **28 top-level functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.328 B) | Đạo Đức Lớp 1: 12 ảnh bài học + **12 tình huống gắn đúng ảnh minh họa riêng** (kèm 4 SVG mới `sit_shinkansen`, `sit_spill_water`, `sit_help_friend`, `sit_stranger_gate` & `sc_topic_1`), Đèn giao thông & Phân loại rác | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Âm nhạc Pianica 8 phím, Pha màu tương tác `#artInteractiveMixerBox`, Bảng vẽ HiDPI (Tẩy, Undo, Tải PNG, cảnh báo bảng trống) & Thể dục | **10 top-level functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Tiếng Nhật 小1 (Hiragana + Yoon/Sokuon, Katakana, 80 Kanji kèm số nét, 10 truyện đọc 小1 kèm nút `🎬 Xem phim hoạt hình` đa cảnh từng câu) | **16 top-level functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, 26 ABC, 8 chủ đề `64` từ, Đố vui & Ghép từ sửa ô đỏ `.slot-wrong`) | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 502 dòng<br>(23.589 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật, gầm rung & hạt theo nguyên tố, Đố vui, Lật thẻ (giữ nguyên hiển thị Kỷ lục trong ván), **Ấp Trứng Rồng** & **Rồng Bắt Chữ** | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI bám đuổi, Xưởng Xu (`#dinoBuddyDock` tự ẩn gọn khi đua) | **31 top-level functions** |
| [`sw.js`](sw.js) | 79 dòng<br>(2.401 B) | Service Worker PWA (`baolong-v20261128v15`): precache toàn bộ shell kèm `story_scenes.js`, `dino_dragon_games.js` và 4 ảnh SVG Đạo đức mới | *(Service Worker lifecycle)* |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.506` MP3 = `78,25 MB`)

- Giữ nguyên chuẩn 100% **Microsoft Edge Neural Voices** (`2.253` MP3 Nữ + `2.253` MP3 Nam = `4.506` file = `78,25 MB`): **`small = 0`**, **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`missing = 0`**, **`orphans = 0`**.
- Tất cả 4 trò chơi Rồng & Khủng Long mới sử dụng `window.soundMgr.speakWordObj(...)` và WebAudio SFX.

---

## 3. Khắc Phục Độ Rõ Ảnh, Sự Hợp Lý Câu Chữ & Logic (`v20261128v15`)

1. **Khớp chính xác 100% cảnh hoạt họa với nội dung truyện ([`story_scenes.js`](story_scenes.js)):**
   - Sửa *Củ Cải Khổng Lồ* Cảnh 1 (chỉ còn mô đất + hạt rơi, bỏ củ cải to mọc sẵn) & nối dây kéo ở Cảnh 4–8; *Đám Mây Cá Voi* đồng bộ tọa độ học sinh cưỡi trên lưng mây & nền trời nắng thành phố biển Cảnh 6; *Guồng Quay Tơ* Cảnh 8 thay rương vàng bằng núi cuộn tơ óng mượt & Cảnh 6 thêm người vợ ốm nằm chăn đệm trong nhà tuyết; *Chú Chó Elf* Cảnh 8 thay chú chó sống bằng khung ảnh kỷ niệm (phù hợp mạch truyện); *Momotaro* bổ quả đào lộ em bé & thuyền vượt sóng; *So sánh xe* vẽ xe cần cẩu vươn tay + 4 chân trụ; *Động vật sơ sinh* & *Khỉ Cua* vẽ giải phẫu riêng (cua có 2 càng, kangaroo có túi bụng & con nhỏ, sư tử mẹ bờm cam, ngựa vằn sọc đứng, chim có mỏ & cánh); *Chuyện Mưa Và Cầu Vồng* Cảnh 2 vẽ 3 luống rau xanh thay cho củ cải trắng, Cảnh 3 & 4 hiện rõ cầu vồng, hoa và em bé cười vui.
2. **Ảnh minh họa rõ nét, không bị cắt xén & khớp chủ đề:**
   - Thêm 4 SVG `640×360` cho tình huống Đạo Đức (`sit_shinkansen`, `sit_spill_water`, `sit_help_friend`, `sit_stranger_gate`), gán `sc_topic_1.jpg` (cả nhà dọn đồ chơi) cho `sit6`, sửa khung `.ethics-card-illus` / `.ethics-sit-illus` về đúng tỷ lệ `16 / 9`.
   - Sửa bìa & cảnh 1–3 phim *An Toàn Giao Thông* trong [`living_media.js`](living_media.js) sang `eth_6.svg` (vạch qua đường & đèn đỏ) và cảnh 4–6 sang `eth_7.jpg` (bỏ rác vào thùng).
   - Áp dụng `object-fit: contain !important` cho ảnh rộng/dài (`veh_tau_hoa.jpg` `960×228`, `veh_truc_thang.jpg`) cả trong thẻ học và trong Canvas `drawSmartImageFrame(...)` để không cắt đầu tàu Shinkansen hay cánh quạt trực thăng.
3. **Sửa logic mini-game, Toán thước cm & trợ năng (`A11y`):**
   - [`math.js`](math.js): thêm tham số `isQuiz` cho `buildMathRulerSvgMarkup(item, isQuiz = false)` để ẩn số cm đáp án trên thanh vật thể (`? cm` viền tương phản `paint-order="stroke"`), giữ nguyên vạch chuẩn `0` màu đỏ còn vạch đích không tô đỏ lộ đáp án; chuyển câu hỏi Đồng hồ & Thước đo từ `<div role="button">` lồng nút sang `.math-ans-row` với `<button type="button">` chuẩn.
   - [`dino_dragon_games.js`](dino_dragon_games.js): mỗi quả trứng Rồng/Khủng long mang bảng màu riêng theo hệ; giai đoạn ủ ấm (`0/3`) không làm lộ gợi ý đáp án trước; *Cho Khủng Long Ăn Chữ* chỉ lấy danh sách 12 từ món ăn/trái cây hợp lý (`EDIBLE_DINO_WORDS`).
   - [`dragons.js`](dragons.js): giữ nguyên dòng `🏆 Kỷ lục` trên `#dragonMemPairsText` suốt ván chơi.

---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 28/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=623, dyn_js=75, getElementById=558, missing=0
Local Images: 71 referenced, missing=0
CSS Classes: used=734, defined=774, missing=0
A11y & Button types: checked 17 files, issues=0
Audio MP3s: female=2253, male=2253, size_mb=78.25, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 229 lesson words + 12 hard cases verified
Audio Keys: checked=2253, missing=0, orphans=0
Node syntax check: skipped (node not installed)
Python JS structure check: 16 files checked

AUDIT PASSED: All DOM, CSS, A11y, Image, Audio, Puzzle & JS checks clean!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/?v=20261128v15`, `1280×800` & `390×844`)
- `0` lỗi console/pageerror, `0` lỗi HTTP `404`/`>= 400` (`document.querySelectorAll('div[role="button"]').length === 0`).
- Xác nhận trực quan trên Canvas & SVG: *Củ Cải Khổng Lồ* Cảnh 1 & 3, *Mưa Và Cầu Vồng* Cảnh 2 & 4, *Khỉ Và Cua* Cảnh 1, *Shinkansen* không cắt mép (`object-fit: contain`), Video Hub Giao thông dùng `eth_6.svg`, ảnh Đạo Đức tải `200 OK`, Trứng #2 Rồng Nước dùng gradient xanh biển không lộ đáp án sớm, Lật thẻ Rồng giữ `🏆 Kỷ lục`, Khủng Long Ăn Chữ chỉ ra món ăn/hoa quả, **Thước đo cm Toán (`? cm` trong Quiz vs `3 cm`/`9 cm` ở thẻ Học, chỉ số `0` đỏ ở Quiz)** và Mobile `390×844` `body.width = 375,43px <= 390px`.

---

## 5. Việc Còn Lại & Điểm Mở

1. **Đồng bộ GitHub (`origin/main`):** Toàn bộ bản `v20261128v15` đã được kiểm thử sạch và đẩy lên `origin/main`.
2. **Kiểm tra trên thiết bị iOS thật & `node --check`:** `Node.js` chưa cài trên máy này (bước `node --check` trong `audit.py` được bỏ qua); khuyến nghị kiểm tra thêm phát âm thanh/video cục bộ trên Safari iPhone/iPad thực tế.
