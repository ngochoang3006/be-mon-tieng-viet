# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN & JP + Hoạt họa Đa cảnh chính xác + 4 Mini-game Rồng/Khủng long (`v20261128v15`)  
> **Cập nhật:** 28/11/2026 • **Git Branch:** `main`

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Canvas 2D + Local MP3 Audio + IndexedDB ghi âm & video cục bộ + WebAudio + Service Worker PWA). Tổng cộng **15 module JS ứng dụng + `sw.js`** (`16` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX)** cùng các module đóng gói `storySceneRenderer`, `living_media.js`, `dinoDragonGames`:

| File | Kích thước | Nhiệm vụ chính | Ghi chú kỹ thuật |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Dữ liệu Tiếng Việt, `36` câu giải mã, `12` nhóm cặp tối thiểu, Khủng long, Xe cộ, `6` Truyện Đọc VN kèm ảnh bìa | Đồng bộ 100% với kho `2.253` cặp MP3 |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Âm thanh 3 tầng Nam/Nữ, LRU `blobCache` (800 mục), `prefetchKeys`, `normalizeKey` NFC, iOS unlock không dính mute, `DynamicsCompressorNode` | **`class SoundManager` (`46` methods)** |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay, Lịch 7 ngày, Leitner SRS, Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **`26` functions + `customVoiceStore`** |
| [`story_scenes.js`](story_scenes.js) | 1.375 dòng<br>(62.827 B) | **Hệ thống dựng cảnh hoạt họa 60fps riêng cho từng câu (`STORYBOARDS` cho 10 truyện Nhật, 6 truyện Việt, `traffic_hero`; `29` `BACKDROPS`, vẽ riêng Cua/Kangaroo/Ngựa vằn/Sư tử/Chim & `drawSmartImageFrame` chống cắt ảnh)** | API: `window.storySceneRenderer` (`drawSceneAnimated`, `getSceneExtras`) |
| [`living_media.js`](living_media.js) | 1.347 dòng<br>(57.394 B) | **Rạp Phim Hoạt Hình 60fps (`storyTheater` + Dino MC có mào & bìa Giao thông `eth_6.svg`), Kho Video (`customVideoStore` + YouTube NoCookie), `livingFX`, WebAudio SFX & `dinoBuddy`** | API: `initLivingMedia`, `openStoryTheater`, `openVideoHub`, `renderParentVideoManager`, `livingFX`, `dinoBuddy` |
| [`dino_dragon_games.js`](dino_dragon_games.js) | 601 dòng<br>(25.365 B) | **4 Mini-Game Rồng & Khủng Long mới: Ấp Trứng Rồng (`8` màu trứng theo hệ), Rồng Bắt Chữ, Khủng Long Ăn Chữ (`EDIBLE_DINO_WORDS`), Ấp Trứng Khủng Long (`10` loài)** | API: `window.dinoDragonGames` (`createEggHatchController`, `createArenaFeedGame`) |
| [`app.js`](app.js) | 3.475 dòng<br>(137.781 B) | Điều hướng, Tiến độ `localStorage`, Canvas 4 ô ly, **9 Mini-game** (kèm Khủng Long Ăn Chữ & Ấp Trứng), ngăn kéo di động, tự ẩn Dino Buddy khi đua | **`82+` functions** |
| [`math.js`](math.js) | 1.920 dòng<br>(81.204 B) | Toán Lớp 1 VN & JP, Đồng hồ 12 giờ + kim giây chạy thật `#btnToggleClockTick`, 2D/3D SVG, Thước cm (`? cm` trong Quiz), Thứ; nút `.math-ans-row` chuẩn ARIA | **`28` functions** |
| [`science_life.js`](science_life.js) | 591 dòng<br>(32.815 B) | Tự nhiên & Đời sống + cây Bìm Bìm `あさがお` hiệu ứng Mưa/Nắng/Bướm & nút `🎬 Xem phim Cây Bìm Bìm`, 5 Giác quan & Đố vui | **`9` functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.328 B) | Đạo Đức Lớp 1: `12` bài học + `12` tình huống đúng chủ đề (kèm 4 SVG `sit_*.svg` mới & `sc_topic_1.jpg`), Đèn giao thông & Phân loại rác | **`12` functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Đàn Pianica 8 phím, Pha màu tương tác, Vẽ tranh (Tẩy/Undo/Tải PNG/cảnh báo bảng trống) & Thể dục | **`10` functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Hiragana (+ Yoon/Sokuon), Katakana, 80 Kanji (kèm số nét), 10 Truyện Đọc 小1 kèm nút `🎬 Xem phim hoạt hình` đa cảnh | **`16` functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, `64` từ, Đố vui & Ghép từ sửa từng ô đỏ `.slot-wrong`) | **`10` functions** |
| [`dragons.js`](dragons.js) | 502 dòng<br>(23.589 B) | Vương Quốc Rồng (`8` loài rồng ảnh thật, gầm rung + hạt nguyên tố, Đố vui, Lật thẻ giữ nguyên Kỷ lục, **Ấp Trứng Rồng** & **Rồng Bắt Chữ**) | **`7` functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI & Xưởng Xu | **`31` functions** |
| [`sw.js`](sw.js) | 79 dòng<br>(2.401 B) | Service Worker PWA (`baolong-v20261128v15`) precache shell gồm `story_scenes.js`, `dino_dragon_games.js` và 4 ảnh Đạo đức mới | Precache shell + media runtime cache |

---

## 2. Những Điểm Nâng Cấp Mới (`v20261128v15`)

1. **Hoạt Họa Đa Cảnh Khớp 100% Câu Chữ (`story_scenes.js`):** Sửa toàn bộ các cảnh chưa khớp nội dung (gieo hạt không có củ cải mọc sẵn, luống rau dưới mưa không nhầm thành củ cải, núi cuộn tơ thay rương vàng, ảnh kỷ niệm thay chó sống cuối truyện *Elf*, cua có 2 càng thật thay tai gấu, bé cưỡi khớp nhịp đám mây cá voi, bổ đào thấy em bé, cần cẩu vươn tay + 4 chân trụ).
2. **Độ Rõ Ảnh & Đồng Bộ Chủ Đề:** Thêm 4 ảnh SVG tình huống Đạo Đức (`sit_*.svg`), gắn đúng bìa giao thông `eth_6.svg` cho `traffic_hero`, mở khung `16/9` đầy đủ và áp dụng `object-fit: contain` cho ảnh ngang dài/dọc (`veh_tau_hoa.jpg`, `veh_truc_thang.jpg`).
3. **Sửa Logic Thước cm, Mini-Game & A11y:** Thước đo Quiz trong `math.js` hiển thị `? cm` (thay vì in đáp án lên thanh vật thể) với viền chữ tương phản cao và không tô đỏ vạch đích; Trứng Rồng/Khủng long mang màu theo loài & không lộ gợi ý sớm ở bước 0; *Khủng Long Ăn Chữ* chỉ dùng từ đồ ăn/trái cây hợp lý; Lật thẻ Rồng giữ nguyên Kỷ lục; câu đố Đồng hồ/Thước cm loại bỏ `div[role="button"]` lồng nút.

---

## 3. Kết Quả Kiểm Thử Sau Chỉnh Sửa Cuối (28/11/2026)

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

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/?v=20261128v15`)
- **Desktop `1280×800` & Mobile `390×844`:** `0` lỗi console, `0` lỗi HTTP `404`/`>= 400`, `document.querySelectorAll('div[role="button"]').length === 0`.
- Đã kiểm chứng trực quan thước đo `cm` Toán (`? cm` không lộ đáp án khi đố, hiển thị đúng `cm` ở tab Học), từng cảnh truyện, màu trứng theo hệ, Lật thẻ Rồng giữ `Kỷ lục`, Khủng Long Ăn Chữ 100% từ món ăn, ảnh `veh_tau_hoa.jpg` & `veh_truc_thang.jpg` không cắt mép và giao diện di động `390×844` không tràn ngang (`body.width = 375,43px`).

### C. Lịch sử Git (`origin/main`)
```text
02bcb7d feat: add multi-scene story animations, 4 dragon/dino mini-games, and fix mobile drawer
a702305 feat: add 60fps offline Story Theater, parent video library, living FX, and dino companion
af80334 feat: fix 100-point review issues, add subject illustrations, PWA support, and upgrade audit
8333273 feat: expand Japanese Grade 1 stories to 10 complete interactive tales with dual-voice Edge Neural audio
d64b291 feat: fix male voices across EN/JA/VI, trim math pauses, and upgrade all 7 mini-games
```
