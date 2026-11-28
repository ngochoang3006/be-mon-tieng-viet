# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `a702305` + nâng cấp Hoạt họa Đa cảnh 60fps & 4 Trò chơi Rồng/Khủng Long mới `v20261128v13`)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 28/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, kho ảnh minh họa & PWA, hệ thống hoạt họa đa cảnh theo từng câu truyện, bộ trò chơi Rồng – Khủng Long mở rộng và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript + Canvas 2D + Service Worker PWA + IndexedDB**, không framework, không bundler, không backend). Tổng cộng có **15 module JS ứng dụng + `sw.js`** (`16` file `.js` ở gốc) gồm **1 class (`SoundManager` với `46` methods + `3` WebAudio SFX sống động)**, IIFE `storySceneRenderer` (`26` phông nền đa cảnh & hoạt họa từng câu), IIFE `dinoDragonGames` (`4` mini-game Rồng/Khủng Long mới) và IIFE `living_media.js`.

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, `VIET_STORIES_DATA` (6 truyện kèm ảnh bìa) | *(0 function — hằng dữ liệu)* |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Bộ điều phối âm thanh 3 tầng Nam/Nữ Edge Neural, mở khóa iOS an toàn, true LRU cache (800 mục), `prefetchKeys` giới hạn 4, `DynamicsCompressorNode`, ưu tiên ghi âm gia đình (IndexedDB) & chặn giọng máy Windows | **Class `SoundManager` (`46` methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.289 dòng<br>(54.137 B) | Lộ trình hôm nay (`+20 🪙 Xu`/bước, `dailyLog` tỉa 90 ngày), Leitner SRS (`[0,1,1,3,7,14]`), Karaoke & `customVoiceStore`, Góc Phụ Huynh (`#parentVideoManagerHost`, `#parentHideBuddyChk`) | **26 top-level functions** + `customVoiceStore` |
| [`story_scenes.js`](story_scenes.js) | 924 dòng<br>(48.409 B) | **Bộ dựng cảnh hoạt họa 60fps theo từng câu (`STORYBOARDS` cho 10 truyện Nhật, 6 truyện Việt, `traffic_hero` & khung ảnh động cho các phim mini; `26` phông nền `BACKDROPS`, nhân vật & vật thể động)** | **IIFE Module `window.storySceneRenderer` (`drawSceneAnimated`, `getSceneExtras`)** |
| [`living_media.js`](living_media.js) | 1.333 dòng<br>(56.895 B) | **Rạp Phim Hoạt Hình 60fps Offline (`storyTheater` kết nối `storySceneRenderer` + phụ đề Karaoke + `5` phim mini), Kho Video Ba Mẹ (`customVideoStore` IndexedDB MP4/WebM + YouTube NoCookie), `livingFX`, WebAudio SFX & `dinoBuddy`** | **IIFE Module (`initLivingMedia`, `openStoryTheater`, `openVideoHub`, `livingFX`, `dinoBuddy`, `customVideoStore`)** |
| [`dino_dragon_games.js`](dino_dragon_games.js) | 573 dòng<br>(23.082 B) | **4 Trò chơi Rồng & Khủng Long mới: Ấp Trứng Rồng Thần (8 trứng), Rồng Bắt Chữ, Cho Khủng Long Ăn Chữ & Ấp Trứng Khủng Long Bí Ẩn (10 trứng, gõ nứt vỏ SVG, giải đố nhận ảnh thật + Xu/Sao)** | **IIFE Module `window.dinoDragonGames` (factory `createEggHatchController` & `createArenaFeedGame`)** |
| [`app.js`](app.js) | 3.475 dòng<br>(137.781 B) | Điều phối toàn app sau `loadProgress()`, Puzzle, Từ vựng, Đọc hiểu VN, Khủng long & Xe, HiDPI Canvas 4 ô ly, **9 Mini-game** trong Game Hub, drawer di động `#sideNav` & Focus Mode | **82+ top-level functions** |
| [`math.js`](math.js) | 1.904 dòng<br>(80.728 B) | Toán Lớp 1 VN & JP (`0–100`, Sakura, Bảng `1–100`, đồng hồ 12 giờ + kim giây chạy thật `#btnToggleClockTick`, 2D/3D SVG, thước cm, Thứ) | **28 top-level functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: 12 ảnh minh họa thẻ & tình huống, nút ARIA anh em, Đèn giao thông có vạch dừng/qua đường & xe SVG hướng xuôi, Phân loại rác 8 món | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Âm nhạc Pianica 8 phím, Pha màu tương tác `#artInteractiveMixerBox`, Bảng vẽ HiDPI (Tẩy, Undo, Tải PNG, cảnh báo bảng trống) & Thể dục | **10 top-level functions** |
| [`japanese.js`](japanese.js) | 3.003 dòng<br>(153.379 B) | Tiếng Nhật 小1 (Hiragana + Yoon/Sokuon, Katakana, 80 Kanji kèm số nét, 10 truyện đọc 小1 kèm nút `🎬 Xem phim hoạt hình` đa cảnh từng câu) | **16 top-level functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, 26 ABC, 8 chủ đề `64` từ, Đố vui & Ghép từ sửa ô đỏ `.slot-wrong`) | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 502 dòng<br>(23.577 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật, gầm rung & hạt theo nguyên tố, Đố vui Rồng, Lật thẻ Rồng, **Ấp Trứng Rồng** & **Rồng Bắt Chữ** (tôn trọng Focus Mode) | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa `ready` suốt `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI bám đuổi, Xưởng Xu (`#dinoBuddyDock` tự ẩn gọn khi đua) | **31 top-level functions** |
| [`sw.js`](sw.js) | 75 dòng<br>(2.236 B) | Service Worker PWA (`baolong-v20261128v13`): precache toàn bộ shell gồm `story_scenes.js`, `dino_dragon_games.js` và `living_media.js` | *(Service Worker lifecycle)* |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.506` MP3 = `78,25 MB`)

- Giữ nguyên chuẩn 100% **Microsoft Edge Neural Voices** (`2.253` MP3 Nữ + `2.253` MP3 Nam = `4.506` file = `78,25 MB`): **`small = 0`**, **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`missing = 0`**, **`orphans = 0`**.
- Toàn bộ 4 trò chơi mới dùng `window.soundMgr.speakWordObj(...)` & WebAudio SFX (`playDragonRoar`, `playDinoRoar`, `playPop`, `playVictory`) tôn trọng chế độ tắt tiếng và không tạo audio key giả.

---

## 3. Tính Năng Mới: Hoạt Họa Đa Cảnh & Trò Chơi Rồng – Khủng Long (`28/11/2026`)

1. **Hoạt Họa Đa Cảnh Theo Từng Câu (`story_scenes.js` + `living_media.js`):**
   - Khắc phục hiện tượng chỉ zoom 1 ảnh bìa tĩnh: mỗi câu trong **10 Truyện Đọc 小1**, **6 Bài Đọc Hiểu HK2** và **An toàn Giao thông** nay dựng một **cảnh hoạt họa riêng biệt** trên Canvas 60fps (26 phông nền sáng/tối/mưa/tuyết/biển/hang kho báu/sân trường/cầu vồng, nhân vật & muông thú chuyển động, bong bóng thoại, xe cộ & đèn tín hiệu).
2. **4 Trò Chơi Mới Cho Vương Quốc Rồng & Công Viên Khủng Long (`dino_dragon_games.js`):**
   - **Vương Quốc Rồng:** thêm tab `🥚 Ấp Trứng Rồng` (`#btnDragonModeHatch` — 8 trứng nguyên tố, chạm 3 lần làm nứt vỏ SVG + giải đố để nở ảnh thật & lưu album `baolong_hatched_dragons_v1`) và `🔥 Rồng Bắt Chữ` (`#btnDragonModeBattle` — nghe phép thuật & bắn mục tiêu 6 lượt kèm chuỗi lửa).
   - **Công Viên Khủng Long & Game Hub (mở rộng lên 9 trò chơi):** thêm `🍖 Khủng Long Ăn Chữ` (`#tabBtnDinoFeed`) và `🥚 Ấp Trứng Khủng Long` (`#tabBtnDinoHatch` — 10 trứng tiền sử lưu vào `baolong_hatched_dinos_v1`).
   - Hỗ trợ đầy đủ Focus Mode (`body.focus-hide-games`) và Xóa dữ liệu ở Cổng Phụ Huynh (`clearHatchedStorage()`).
3. **Khắc Phục Lỗi Ngăn Kéo Menu Di Động (`style.css` + `app.js`):**
   - Sửa lỗi `#sideNavBackdrop.active` (`z-index: 310`) che mất `#sideNav.mobile-open` bằng quy tắc `z-index: 450 !important`, tách `✕` đóng menu di động, thêm `overflow-x: clip` cho `html, body` và chuyển thanh tab 9 trò chơi thành lưới 2 cột gọn trên màn hình hẹp.

---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 28/11/2026)

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

### B. Kiểm thử trình duyệt Live (`1280×800` & `390×844` với `?v=20261128v12` và bản vá di động `?v=20261128v13`)
- `0` lỗi console / pageerror, `0` HTTP 404 trên 50+ request, `button button = 0`, `[role="button"] = 0`.
- **Desktop (`1280×800`):** Xác minh Rạp Phim hiển thị cảnh khác nhau theo từng câu ở *Củ Cải Khổng Lồ* (Cảnh 1 gieo hạt vs Cảnh 3 củ cải khổng lồ vs Cảnh 8 cả nhà kéo củ cải dưới trời hoàng hôn) & *Chuyện Mưa Và Cầu Vồng* (Cảnh 1 trời mưa mây xám vs Cảnh 2 vườn củ cải dưới mưa vs Cảnh 4 trời nắng cầu vồng bươm bướm); xác minh chơi trọn vẹn cả 4 game mới (Ấp Trứng Rồng 1/8 + thưởng sao, Rồng Bắt Chữ chuỗi x1 -> 2/6, Khủng Long Ăn Chữ 2/6, Ấp Trứng Khủng Long 1/10 + Xu & Sao) và Focus Mode.
- **Mobile (`390×844` ở `?v=20261128v13`):** Xác minh bấm `☰ Môn học` mở `#sideNav.mobile-open` không bị nền tối che khuất (`button[data-mode="dragons"]` & `button[data-mode="game"]` bấm trực tiếp thành công, không dùng `force`), nút `✕` đóng menu gọn gàng, Rồng Ấp Trứng/Bắt Chữ & Game Hub 9 trò chơi đạt `body.width = 375,43px <= 390px` (không tràn ngang).

---

## 5. Việc Còn Lại & Điểm Mở

1. **Đồng bộ GitHub (`origin/main`):** Bản `v20261128v13` đã kiểm thử tĩnh + trình duyệt hoàn tất và đẩy lên `origin/main`.
2. **Kiểm tra trên thiết bị iOS thật & `node --check`:** `Node.js` chưa cài trên máy này (bước `node --check` trong `audit.py` được bỏ qua); khuyến nghị kiểm tra thêm phát âm thanh/video cục bộ trên Safari iPhone/iPad thực tế.
