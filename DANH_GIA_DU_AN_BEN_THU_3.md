# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `af80334` + nâng cấp Rạp Phim Hoạt Hình, Kho Video Ba Mẹ & Hiệu ứng Sống động `v20261128v11`)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 28/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, kho ảnh minh họa & PWA, tính năng phát video / hoạt hình 60fps tương tác và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript + Canvas 2D + Service Worker PWA + IndexedDB**, không framework, không bundler, không backend). Tổng cộng có **13 module JS ứng dụng + `sw.js`** (`14` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX sống động)** và **`231` top-level functions** (**`277`+ hàm/phương thức**, cùng IIFE `living_media.js`).

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, `VIET_STORIES_DATA` (6 truyện kèm ảnh bìa) | *(0 function — hằng dữ liệu)* |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Bộ điều phối âm thanh 3 tầng Nam/Nữ Edge Neural, mở khóa iOS an toàn, true LRU cache (800 mục), `prefetchKeys` giới hạn 4, `DynamicsCompressorNode`, ưu tiên ghi âm gia đình (IndexedDB) & chặn giọng máy Windows | **Class `SoundManager` (`46` methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay (`+20 🪙 Xu`/bước, `dailyLog` tỉa 90 ngày), Leitner SRS (`[0,1,1,3,7,14]`), Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **26 top-level functions** + `customVoiceStore` |
| [`living_media.js`](living_media.js) | 1.320 dòng<br>(56.291 B) | **Rạp Phim Hoạt Hình 60fps Offline (`storyTheater` + Canvas Ken Burns + phụ đề Karaoke + `5` phim mini tích hợp), Kho Video Ba Mẹ (`customVideoStore` IndexedDB MP4/WebM + YouTube NoCookie an toàn), Hiệu ứng hạt (`livingFX`), Âm thanh WebAudio Khủng long/Rồng/Còi xe & Bạn Khủng Long đồng hành (`dinoBuddy`)** | **IIFE Module (`initLivingMedia`, `openStoryTheater`, `openVideoHub`, `livingFX`, `dinoBuddy`, `customVideoStore`)** |
| [`app.js`](app.js) | 3.457 dòng<br>(137.158 B) | Điều phối toàn app sau `loadProgress()`, Puzzle, Từ vựng, Đọc hiểu VN (nút `🎬 Xem phim kể chuyện`), Khủng long & Xe (gầm rung + còi xe BÍP BÍP), HiDPI Canvas 4 ô ly, 7 Mini-game & Focus Mode | **82 top-level functions** |
| [`math.js`](math.js) | 1.904 dòng<br>(80.728 B) | Toán Lớp 1 VN & JP (`0–100`, Sakura, Bảng `1–100`, đồng hồ 12 giờ + **chế độ bật kim giây chạy thật** `#btnToggleClockTick`, 2D/3D SVG, thước cm, Thứ) | **28 top-level functions** |
| [`science_life.js`](science_life.js) | 591 dòng<br>(32.815 B) | Tự nhiên & Xã hội + Seikatsuka `生活科`: 6 ảnh bìa chủ đề, cây Bìm Bìm `あさがお` 5 giai đoạn **kèm hiệu ứng mưa rơi `.asagao-fx-rain`, nắng ấm `.asagao-fx-sun`, bướm bay `.asagao-fx-butterfly` & nút `🎬 Xem phim Cây Bìm Bìm`** | **9 top-level functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: 12 ảnh minh họa thẻ & tình huống, nút ARIA anh em, Đèn giao thông có vạch dừng/qua đường & xe SVG hướng xuôi, Phân loại rác 8 món | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Âm nhạc Pianica 8 phím, Pha màu tương tác `#artInteractiveMixerBox`, Bảng vẽ HiDPI (Tẩy, Undo, Tải PNG, cảnh báo bảng trống) & Thể dục | **10 top-level functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Tiếng Nhật 小1 (Hiragana + Yoon/Sokuon, Katakana, 80 Kanji kèm số nét, 10 truyện đọc 小1 kèm **nút `🎬 Xem phim hoạt hình`** mở Rạp chiếu phim 60fps & phụ đề JA/Romaji/Việt) | **16 top-level functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, 26 ABC, 8 chủ đề `64` từ, Đố vui & Ghép từ sửa ô đỏ `.slot-wrong`) | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 495 dòng<br>(23.210 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật, hiệu ứng gầm rung & hạt lửa/băng/nước/vàng khi chạm, Đố vui & Lật thẻ | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI bám đuổi, Xưởng Xu (`#dinoBuddyDock` tự ẩn gọn khi đua) | **31 top-level functions** |
| [`sw.js`](sw.js) | 73 dòng<br>(2.157 B) | Service Worker PWA (`baolong-v20261128v11`): precache toàn bộ shell gồm `living_media.js` và cache động MP3/ảnh offline | *(Service Worker lifecycle)* |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.506` MP3 = `78,25 MB`)

- Giữ nguyên chuẩn 100% **Microsoft Edge Neural Voices** (`2.253` MP3 Nữ + `2.253` MP3 Nam = `4.506` file = `78,25 MB`): **`small = 0`**, **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`missing = 0`**, **`orphans = 0`**.
- Kết hợp thêm bộ tổng hợp âm thanh sống động **WebAudio SFX** ngay trong [`living_media.js`](living_media.js) (`playDinoRoar`, `playDragonRoar`, `playCarHorn`) tôn trọng công tắc tắt tiếng `soundMgr.isMuted` và bộ nén động `masterComp`.

---

## 3. Tính Năng Mới: Phát Video, Rạp Phim Hoạt Hình & Trải Nghiệm Sống Động (`28/11/2026`)

1. **Rạp Chiếu Phim Hoạt Hình Kể Chuyện 100% Offline (`#storyTheaterOverlay`):**
   - Tích hợp trên cả **`10` Truyện Đọc 小1**, **`6` Bài Đọc Hiểu HK2** và **`5` Phim Mini Hoạt Hình** (`Thế giới Khủng Long`, `Vương quốc 8 Rồng Thần`, `Đoàn xe & Shinkansen`, `Hành trình Cây Bìm Bìm`, `An toàn Giao thông & Sống xanh`).
   - Dựng Canvas `840×440` với hiệu ứng Ken Burns pan/zoom mượt mà, hạt ánh sáng lung linh, Khủng Long MC nhún nhảy mở miệng theo giọng đọc, điều khiển `Phát/Tạm dừng`, `Cảnh trước/sau`, thanh chấm tiến độ, chọn tốc độ `0.85× / 1× / 1.15×`, `Bật/Tắt phụ đề`, chế độ phóng to, hỗ trợ cả tiếng Việt khớp theo `currentTime / duration` MP3 thật.
2. **Kho Video Ba Mẹ (`#kidVideoOverlay` + `#parentVideoManagerHost`):**
   - Nút `🎬 Rạp Phim & Video` nổi bật ngay trên đầu trang mở 3 tab: **Phim Hoạt Hình Offline (5)**, **Phim Truyện Việt–Nhật (16)** và **Video Của Ba Mẹ**.
   - Ba mẹ (sau cổng xác nhận toán học) có thể chọn file `.mp4/.webm/.mov` từ máy lưu cục bộ vào IndexedDB (`baolong_video_db_v1`) phát hoàn toàn **offline**, hoặc dán link YouTube được kiểm tra ID chuẩn 11 ký tự phát qua `youtube-nocookie.com` (chặn gợi ý ngoài luồng và báo rõ khi ngoại tuyến).
3. **Thế Giới Sống Động Toàn Diện (`livingFX`, Weather, Clock, Dino Buddy):**
   - Bổ sung hạt nổ theo chủ đề & nhãn thưởng bay lên (`+2 ⭐`, `ROAAAR! 🌋`, `BÍP BÍP! 🚗💨`) khi chạm thẻ Khủng long, Rồng (8 nguyên tố riêng), Xe cộ, Toán, Đạo đức, Tự nhiên; rung nhẹ `#dinoContainer`/`#dragonContainer` khi gầm.
   - Cây Bìm Bìm `あさがお` hiển thị giọt mưa rơi, tia nắng xoay và bướm bay; Đồng hồ Toán có nút `⏱️ Bật kim giây chạy thật`; Linh vật **Khủng Long đồng hành (`#dinoBuddyDock`)** nhảy cổ vũ khi đúng, an ủi khi nhầm, thu gọn được và tự động ẩn khi đua xe `arcade`.

---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 28/11/2026)

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

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/?v=20261128v11`, `1280×800` & `390×844`)
- `50+` HTTP requests (`0` lỗi `>= 400`), `0` console errors, `0` ảnh vỡ, `button button = 0`, `[role="button"] = 0`.
- Xác minh trọn bộ 7 hạng mục: **Dino Buddy** (`#dinoBuddyBubble.show`, thu gọn/mở rộng, tự ẩn trên `body.in-arcade-mode`), **Kho Video 3 tab** (5 phim offline + 16 phim truyện + Video Ba Mẹ), **Rạp Phim Hoạt Hình 60fps** (Desktop `660×345,7px` & Mobile `298,4px` trong khung `347,2px`, chuyển cảnh, tốc độ `1× → 1.15×`, phụ đề JA/Romaji/Việt & Truyện VN), **Hiệu ứng gầm Khủng Long/Rồng & Còi xe**, **Kim giây Đồng hồ `#mathClockSecHand`**, **Mưa/Nắng trên cây Bìm Bìm**, **Thêm/Xóa link YouTube an toàn qua Cổng Phụ Huynh**.

---

## 5. Việc Còn Lại & Điểm Mở

1. **Đồng bộ GitHub (`origin/main`):** Toàn bộ bản nâng cấp `v20261128v11` đã kiểm thử tĩnh + trình duyệt sạch và sẵn sàng đẩy lên `origin/main`.
2. **Kiểm tra trên thiết bị iOS thật & `node --check`:** `Node.js` chưa cài trên máy này (nên bước `node --check` trong `audit.py` được bỏ qua); khuyến nghị thử phát `<video>` MP4 IndexedDB và PWA trên iPhone/iPad Safari thực tế.
