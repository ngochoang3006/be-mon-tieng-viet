# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN & JP + Hoạt họa Đa cảnh 60fps + 4 Trò chơi Rồng & Khủng Long Mới (`v20261128v13`)  
> **Cập nhật:** 28/11/2026 • **Git Branch:** `main`

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Canvas 2D + Local MP3 Audio + IndexedDB ghi âm & video cục bộ + WebAudio + Service Worker PWA). Tổng cộng **15 module JS ứng dụng + `sw.js`** (`16` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX)** cùng các module đóng gói `storySceneRenderer`, `living_media.js`, `dinoDragonGames`:

| File | Kích thước | Nhiệm vụ chính | Ghi chú kỹ thuật |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Dữ liệu Tiếng Việt, `36` câu giải mã, `12` nhóm cặp tối thiểu, Khủng long, Xe cộ, `6` Truyện Đọc VN kèm ảnh bìa | Đồng bộ 100% với kho `2.253` cặp MP3 |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Âm thanh 3 tầng Nam/Nữ, LRU `blobCache` (800 mục), `prefetchKeys`, `normalizeKey` NFC, iOS unlock không dính mute, `DynamicsCompressorNode` | **`class SoundManager` (`46` methods)** |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay, Lịch 7 ngày, Leitner SRS, Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **`26` functions + `customVoiceStore`** |
| [`story_scenes.js`](story_scenes.js) | 924 dòng<br>(48.409 B) | **Hệ thống dựng cảnh hoạt họa 60fps riêng biệt cho từng câu (`STORYBOARDS` cho 10 truyện Nhật, 6 truyện Việt, `traffic_hero`; `26` `BACKDROPS` & nhân vật động)** | API: `window.storySceneRenderer` (`drawSceneAnimated`, `getSceneExtras`) |
| [`living_media.js`](living_media.js) | 1.333 dòng<br>(56.895 B) | **Rạp Phim Hoạt Hình 60fps (`storyTheater` kết nối `storySceneRenderer`), Kho Video (`customVideoStore` IndexedDB + YouTube NoCookie), `livingFX`, WebAudio SFX & `dinoBuddy`** | API: `initLivingMedia`, `openStoryTheater`, `openVideoHub`, `renderParentVideoManager`, `livingFX`, `dinoBuddy` |
| [`dino_dragon_games.js`](dino_dragon_games.js) | 573 dòng<br>(23.082 B) | **4 Mini-Game Rồng & Khủng Long mới: Ấp Trứng Rồng Thần (8 trứng), Rồng Bắt Chữ, Khủng Long Ăn Chữ, Ấp Trứng Khủng Long Bí Ẩn (10 trứng)** | API: `window.dinoDragonGames` (`createEggHatchController`, `createArenaFeedGame`) |
| [`app.js`](app.js) | 3.475 dòng<br>(137.781 B) | Điều hướng, Tiến độ `localStorage`, Canvas 4 ô ly, **9 Mini-game** (kèm Khủng Long Ăn Chữ & Ấp Trứng), ngăn kéo di động, tự ẩn Dino Buddy khi đua | **`82+` functions** |
| [`math.js`](math.js) | 1.904 dòng<br>(80.728 B) | Toán Lớp 1 VN & JP, Đồng hồ 12 giờ + kim giây chạy thật `#btnToggleClockTick`, 2D/3D SVG, Thước cm, Thứ | **`28` functions** |
| [`science_life.js`](science_life.js) | 591 dòng<br>(32.815 B) | Tự nhiên & Đời sống + cây Bìm Bìm `あさがお` hiệu ứng Mưa/Nắng/Bướm & nút `🎬 Xem phim Cây Bìm Bìm`, 5 Giác quan & Đố vui | **`9` functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: `12` ảnh minh họa, nút anh em chuẩn ARIA, Đèn giao thông có vạch dừng/qua đường/SVG xe & Phân loại rác | **`12` functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Đàn Pianica 8 phím, Pha màu tương tác, Vẽ tranh (Tẩy/Undo/Tải PNG/cảnh báo bảng trống) & Thể dục | **`10` functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Hiragana (+ Yoon/Sokuon), Katakana, 80 Kanji (kèm số nét), 10 Truyện Đọc 小1 kèm nút `🎬 Xem phim hoạt hình` đa cảnh | **`16` functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, `64` từ, Đố vui & Ghép từ sửa từng ô đỏ `.slot-wrong`) | **`10` functions** |
| [`dragons.js`](dragons.js) | 502 dòng<br>(23.577 B) | Vương Quốc Rồng (`8` loài rồng ảnh thật, gầm rung + hạt nguyên tố, Đố vui, Lật thẻ, **Ấp Trứng Rồng** & **Rồng Bắt Chữ**) | **`7` functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI & Xưởng Xu | **`31` functions** |
| [`sw.js`](sw.js) | 75 dòng<br>(2.236 B) | Service Worker PWA (`baolong-v20261128v13`) precache đầy đủ shell gồm `story_scenes.js` & `dino_dragon_games.js` | Precache shell + media runtime cache |

---

## 2. Những Điểm Nâng Cấp Mới (28/11/2026)

1. **Hoạt Họa Đa Cảnh Theo Từng Câu (`story_scenes.js` + `living_media.js`):** Mỗi câu trong 10 truyện Nhật, 6 truyện Việt và An toàn Giao thông hiển thị một cảnh vẽ hoạt họa riêng (`26` bối cảnh, nhân vật, thú, đạo cụ & hiệu ứng thời tiết/xe chạy chuyển động ở 60fps), thay cho việc chỉ phóng to/kéo ngang 1 ảnh bìa.
2. **4 Trò Chơi Rồng & Khủng Long Mới (`dino_dragon_games.js`):**
   - Trong **Vương Quốc Rồng:** `🥚 Ấp Trứng Rồng` (8 loài, gõ vỏ SVG 3 nấc + giải đố nở rồng ảnh thật) & `🔥 Rồng Bắt Chữ` (bắn chữ theo giọng đọc & chuỗi combo).
   - Trong **Khu Trò Chơi (9 game) & Khủng Long:** `🍖 Khủng Long Ăn Chữ` & `🥚 Ấp Trứng Khủng Long` (10 loài tiền sử, đồng bộ sao/xu, Focus Mode và nút Đặt lại).
3. **Sửa Ngăn Kéo Menu Di Động (`390×844`):** Đặt `z-index: 450 !important` cho `.side-nav.mobile-open` phía trên nền tối `z-index: 310`, đóng riêng nút `✕` trên màn nhỏ, thêm `overflow-x: clip` trên `html, body`, sự kiện `resize` dọn trạng thái và chia lưới 2 cột cho `.game-hub-nav` trên di động.

---

## 3. Kết Quả Kiểm Thử Sau Chỉnh Sửa Cuối (28/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=623, dyn_js=75, getElementById=558, missing=0
Local Images: 67 referenced, missing=0
CSS Classes: used=733, defined=773, missing=0
A11y & Button types: checked 17 files, issues=0
Audio MP3s: female=2253, male=2253, size_mb=78.25, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 229 lesson words + 12 hard cases verified
Audio Keys: checked=2253, missing=0, orphans=0
Node syntax check: skipped (node not installed)
Python JS structure check: 16 files checked

AUDIT PASSED: All DOM, CSS, A11y, Image, Audio, Puzzle & JS checks clean!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/`)
- **Desktop `1280×800` & Mobile `390×844` (`?v=20261128v12` & `?v=20261128v13`):** `0` lỗi console, `0` lỗi HTTP `>= 400`, `0` ảnh vỡ, `button button = 0`, `[role="button"] = 0`.
- Xác minh cảnh chuyển động khác nhau ở từng câu truyện (*Củ Cải Khổng Lồ* Cảnh 1/3/8, *Mưa Và Cầu Vồng* Cảnh 1/2/4), luồng chơi thực tế cả 4 game Rồng/Khủng Long mới, Focus Mode ẩn đúng nút chơi, và ngăn kéo menu `☰ Môn học` trên `390×844` mở/đóng không che khuất & `body.width = 375,43px <= 390px`.

### C. Lịch sử Git (`origin/main`)
```text
a702305 feat: add 60fps offline Story Theater, parent video library, living FX, and dino companion
af80334 feat: fix 100-point review issues, add subject illustrations, PWA support, and upgrade audit
8333273 feat: expand Japanese Grade 1 stories to 10 complete interactive tales with dual-voice Edge Neural audio
d64b291 feat: fix male voices across EN/JA/VI, trim math pauses, and upgrade all 7 mini-games
ddd56e9 feat: 3-stage racing arcade with letter gates, Xu upgrades, balanced stars, and real dino/dragon photos
```
