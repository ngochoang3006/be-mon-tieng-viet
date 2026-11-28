# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN & JP + Rạp Phim Hoạt Hình Offline + Kho Video Ba Mẹ + Thế Giới Sống Động (`v20261128v11`)  
> **Cập nhật:** 28/11/2026 • **Git Branch:** `main`

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Canvas 2D + Local MP3 Audio + IndexedDB ghi âm & video cục bộ + WebAudio + Service Worker PWA). Tổng cộng **13 module JS ứng dụng + `sw.js`** (`14` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX)** và **`231` top-level functions** (cùng module đóng gói [`living_media.js`](living_media.js)):

| File | Kích thước | Nhiệm vụ chính | Ghi chú kỹ thuật |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Dữ liệu Tiếng Việt, `36` câu giải mã, `12` nhóm cặp tối thiểu, Khủng long, Xe cộ, `6` Truyện Đọc VN kèm ảnh bìa | Đồng bộ 100% với kho `2.253` cặp MP3 |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Âm thanh 3 tầng Nam/Nữ, LRU `blobCache` (800 mục), `prefetchKeys`, `normalizeKey` NFC, iOS unlock không dính mute, `DynamicsCompressorNode` | **`class SoundManager` (`46` methods)** |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay, Lịch 7 ngày, Leitner SRS, Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **`26` functions + `customVoiceStore`** |
| [`living_media.js`](living_media.js) | 1.320 dòng<br>(56.291 B) | **Rạp Phim Hoạt Hình 60fps (`storyTheater`), Kho Video (`customVideoStore` IndexedDB + YouTube NoCookie), Hiệu ứng hạt/nhãn (`livingFX`), Âm thanh WebAudio Khủng long/Rồng/Còi xe & Khủng Long đồng hành (`dinoBuddy`)** | API: `initLivingMedia`, `openStoryTheater`, `openVideoHub`, `renderParentVideoManager`, `livingFX`, `dinoBuddy` |
| [`app.js`](app.js) | 3.457 dòng<br>(137.158 B) | Điều hướng, Tiến độ `localStorage`, Canvas 4 ô ly, 7 Mini-game, nút Xem Phim VN Stories, Dino Roar & Xe Còi Bíp Bíp, tự ẩn Dino Buddy khi đua xe | **`82` functions** |
| [`math.js`](math.js) | 1.904 dòng<br>(80.728 B) | Toán Lớp 1 VN & JP, Đồng hồ 12 giờ **+ bật/tắt kim giây chạy thật `#btnToggleClockTick`**, 2D/3D SVG, Thước cm, Thứ | **`28` functions** |
| [`science_life.js`](science_life.js) | 591 dòng<br>(32.815 B) | Tự nhiên & Đời sống + cây Bìm Bìm `あさがお` **hiệu ứng Mưa/Nắng/Bướm & nút `🎬 Xem phim Cây Bìm Bìm`**, 5 Giác quan & Đố vui | **`9` functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: `12` ảnh minh họa, nút anh em chuẩn ARIA, Đèn giao thông có vạch dừng/qua đường/SVG xe & Phân loại rác | **`12` functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Đàn Pianica 8 phím, Pha màu tương tác, Vẽ tranh (Tẩy/Undo/Tải PNG/cảnh báo bảng trống) & Thể dục | **`10` functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Hiragana (+ Yoon/Sokuon), Katakana, 80 Kanji (kèm số nét), 10 Truyện Đọc 小1 kèm **nút `🎬 Xem phim hoạt hình`** | **`16` functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, `64` từ, Đố vui & Ghép từ sửa từng ô đỏ `.slot-wrong`) | **`10` functions** |
| [`dragons.js`](dragons.js) | 495 dòng<br>(23.210 B) | Vương Quốc Rồng (`8` loài rồng ảnh thật, gầm rung + hạt lửa/băng/nước/vàng, Đố vui & Lật thẻ) | **`7` functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI & Xưởng Xu | **`31` functions** |
| [`sw.js`](sw.js) | 73 dòng<br>(2.157 B) | Service Worker PWA (`baolong-v20261128v11`) phục vụ cache offline toàn app | Precache shell + media runtime cache |

---

## 2. Những Điểm Nâng Cấp Mới (28/11/2026)

1. **Rạp Phim Hoạt Hình Kể Chuyện 100% Offline (`#storyTheaterOverlay`):** Phát trọn vẹn `10` Truyện Đọc 小1, `6` Bài Đọc Hiểu HK2 và `5` Phim Hoạt Hình Kiến Thức (`Khủng Long`, `Rồng Thần`, `Xe & Shinkansen`, `Cây Bìm Bìm`, `An toàn Giao thông & Sống xanh`) trên Canvas 60fps kèm chuyển động Ken Burns, hạt lung linh, nhân vật MC mở miệng theo lời kể, phụ đề Karaoke và tốc độ `0.85× / 1× / 1.15×`.
2. **Kho Video An Toàn Cho Ba Mẹ (`#kidVideoOverlay` & `customVideoStore`):** Nút `🎬 Rạp Phim & Video` mở 3 tab; Ba Mẹ sau Cổng Phụ Huynh có thể nạp video MP4/WebM lưu offline hoàn toàn trong IndexedDB hoặc gắn link YouTube chuẩn hóa qua `youtube-nocookie.com`.
3. **Thế Giới Sống Động Toàn Diện:** Hiệu ứng hạt nổ & nhãn nổi theo chủ đề khi chạm thẻ, tiếng gầm Khủng long / Rồng / còi xe WebAudio, rung khung cảnh, kim giây đồng hồ chạy thật ở Toán, mưa/nắng/bướm động trên cây Bìm Bìm, và **Linh vật Khủng Long đồng hành (`#dinoBuddyDock`)** nhảy múa cổ vũ hoặc an ủi bé theo từng câu trả lời.

---

## 3. Kết Quả Kiểm Thử Sau Chỉnh Sửa Cuối (28/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=591, dyn_js=75, getElementById=558, missing=0
Local Images: 67 referenced, missing=0
CSS Classes: used=684, defined=716, missing=0
A11y & Button types: checked 15 files, issues=0
Audio MP3s: female=2253, male=2253, size_mb=78.25, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 229 lesson words + 12 hard cases verified
Audio Keys: checked=2253, missing=0, orphans=0
Node syntax check: skipped (node not installed)
Python JS structure check: 14 files checked

AUDIT PASSED: All DOM, CSS, A11y, Image, Audio, Puzzle & JS checks clean!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/?v=20261128v11`)
- **Desktop `1280×800` & Mobile `390×844`:** `0` lỗi console, `0` lỗi HTTP `>= 400`, `0` ảnh vỡ, `button button = 0`, `[role="button"] = 0`.
- Đã kiểm chứng toàn bộ luồng mới: **Dino Buddy** (`#dinoBuddyBtn`, `#btnBuddyToggle`, ẩn gọn trên `body.in-arcade-mode`), **Kho Video 3 tab**, **Rạp Phim Hoạt Hình 60fps** (JA Stories, VN Stories, 5 Mini-Movies, đổi cảnh/tốc độ/phụ đề trên Desktop & Mobile không tràn ngang), **WebAudio Roar/Còi xe**, **Kim giây đồng hồ Toán**, **Mưa/Nắng Asagao**, và **Thêm/Xóa YouTube qua Góc Phụ Huynh**.

### C. Lịch sử Git (`origin/main`)
```text
af80334 feat: fix 100-point review issues, add subject illustrations, PWA support, and upgrade audit
8333273 feat: expand Japanese Grade 1 stories to 10 complete interactive tales with dual-voice Edge Neural audio
d64b291 feat: fix male voices across EN/JA/VI, trim math pauses, and upgrade all 7 mini-games
ddd56e9 feat: 3-stage racing arcade with letter gates, Xu upgrades, balanced stars, and real dino/dragon photos
```
