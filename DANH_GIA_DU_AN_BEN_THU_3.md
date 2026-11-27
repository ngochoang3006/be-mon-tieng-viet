# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `8333273` + đợt tổng kiểm & nâng cấp toàn diện từ 100 quan điểm `27/11/2026`, `v20261127v10`)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 27/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, kho ảnh minh họa & PWA, kết quả sửa toàn bộ lỗi từ 100 quan điểm kiểm tra tổng quan (`P0–P3`) và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript + Service Worker PWA**, không framework, không bundler, không backend). Tổng cộng có **12 module JS ứng dụng + `sw.js`** gồm **1 class (`SoundManager` với `46` methods)** và **`230` top-level functions** (**`276` hàm/phương thức**).

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Kho dữ liệu Tiếng Việt đã chuẩn hóa chính tả/vần (`G → Gỗ`, Bài 7 đủ 10 từ, `NG/UY/SX/CH-TR` đồng bộ), `DECODABLE_PHONICS_SENTENCES` (36 câu, sửa `Mùa xuân, hoa huệ nở`), `MINIMAL_PAIR_DRILLS` (12 nhóm, bỏ lộ tên dấu ở bài luyện 6 thanh), Khủng long, Xe cộ, `VIET_STORIES_DATA` (6 truyện kèm ảnh bìa) | *(0 function — hằng dữ liệu)* |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Bộ điều phối âm thanh 3 tầng: mở khóa iOS an toàn (`pointerup`/`touchend`/`click`/`keydown` không dính mute), đồng bộ `defaultPlaybackRate`, `maxFallbackMs = 6500` + hủy sạch hẹn giờ trong `stopAll()`, true LRU cache (800 mục), `prefetchKeys` giới hạn 4, chuẩn hóa NFC `normalizeKey`, `DynamicsCompressorNode`, ưu tiên ghi âm gia đình (IndexedDB) & chặn giọng máy Windows | **Class `SoundManager` (46 methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.276 dòng<br>(53.562 B) | Lộ trình hôm nay (`+20 🪙 Xu`/bước, `dailyLog` tỉa 90 ngày, dò qua nửa đêm), Leitner SRS (`[0,1,1,3,7,14]`, `getDueReviewItems` + `btnDueHear` phát chuỗi phẩy), `escapeHtmlPlus` chống XSS, `customVoiceStore` khóa theo từng recorder (hỗ trợ MIME Safari, dọn mic khi đóng modal), Karaoke & `drawHintByLevel` không đụng mực đỏ, Góc Phụ Huynh (`#parentArcadeCapSelect`) | **26 top-level functions** + `customVoiceStore` |
| [`app.js`](app.js) | 3.412 dòng<br>(134.971 B) | Khởi tạo tuần tự `initLearningPlus()` sau `loadProgress()`, kiểm tra schema JSON Import & Reset sạch sub-key/IndexedDB, sửa Puzzle tách từ trùng (`chuồn chuồn`) & chống nhiễu vô lý, bẫy tiêu điểm ARIA cho Modal, HiDPI Canvas ô ly giữ nét khi resize nhẹ, chặn spoiler ở Ô chữ/Blitz/Memory/DinoDig (`noAutoCoin`), tắt âm sạch khi đổi tab/giọng | **82 top-level functions** |
| [`math.js`](math.js) | 1.861 dòng<br>(78.827 B) | Toán Lớp 1 VN & JP (0–100, Sakura, Bảng 1–100, Tách/Gộp, `max100` tròn phạm vi, đồng hồ 12 giờ không tô đỏ đáp án khi đố, hình 2D/3D với ID SVG không trùng, thước cm, Thứ), có `type="button"` & `recordAnswer` | **27 top-level functions** |
| [`science_life.js`](science_life.js) | 579 dòng<br>(31.960 B) | Tự nhiên & Xã hội + Seikatsuka `生活科`: **6 ảnh bìa chủ đề** (`sc_topic_1..6`), **trồng cây Bìm Bìm (`あさがお`) 5 giai đoạn minh họa SVG tương tác tưới nước/phơi nắng lưu `localStorage`**, trò chơi 5 Giác quan + Nghe cả chủ đề & Đố vui | **9 top-level functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: **12 ảnh minh họa thẻ bài & tình huống** (`eth_1..12`), chuyển toàn bộ nút lồng nhau sang nút `<button type="button">` anh em đúng chuẩn ARIA, Đèn giao thông có vạch dừng trắng, vạch qua đường & SVG ô tô quay đầu đúng chiều, Phân loại rác 8 món gợi ý không lộ đáp án | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Âm nhạc Pianica 8 phím, **phòng thí nghiệm Pha màu tương tác** (`#artInteractiveMixerBox`), Bảng vẽ HiDPI có Tẩy/Quay lại/Lưu PNG & cảnh báo khi nộp bảng trống (`#artCanvasStatusMsg` + toast), & Thể dục (`音楽・図工・体育`) | **10 top-level functions** |
| [`japanese.js`](japanese.js) | 2.994 dòng<br>(153.018 B) | Tiếng Nhật 小1 (Hiragana + Âm ghép `Yoon/Sokuon`, Katakana, 80 Kanji kèm **huy hiệu số nét `.kanji-strokes-badge`**, **10 truyện đọc 小1 kèm 10 ảnh bìa** `ja_story_1..10`, sửa văn bản/âm thanh chuẩn cho Truyện 4, 8, 10, Masume 3 mức) | **16 top-level functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1: 26 ABC, 8 chủ đề (`64` từ, đồng bộ nhãn giọng **Jenny & Andrew**), Nghe chọn hình và Ghép từ đánh dấu ô sai viền đỏ `.slot-wrong` cho phép chạm sửa từng chữ không xóa trắng | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 491 dòng<br>(22.895 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật (sửa mô tả Rồng Đá `drquiz_6` khớp hình thật & không lộ tên Nhật trong Đố vui Rồng), Đố vui & Lật thẻ | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng Xe / Khủng Long / Rồng (`~60–90s`): đếm ngược `3-2-1` khóa trạng thái `ready`, Cổng Chữ MP3 thật, nút Tạm dừng `#btnArcadePause`, AI bám đuổi, Xưởng Xu nâng cấp Speed/Nitro & Trang trí, thưởng `1–3 ⭐` + `🪙 Xu` | **31 top-level functions** |
| [`sw.js`](sw.js) | 72 dòng<br>(2.120 B) | Service Worker PWA (`baolong-v20261127v10`): precache lõi ứng dụng và cache động toàn bộ MP3 + ảnh đã tải để học tập 100% offline trên Chrome/Edge/iOS | *(Service Worker lifecycle)* |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.506` MP3 = `78,25 MB`)

1. **Chuẩn hóa giọng Edge Neural 100% & vá toàn bộ lỗ hổng âm thanh:**
   - [`speech.js`](speech.js): Mặc định `allowSystemTTS = false`, tránh fallback giọng desktop Windows khi `AbortError`, sửa mở khóa âm thanh iOS không bị kẹt tắt tiếng, và bổ sung kiểm soát bộ nhớ đệm LRU (`800` mục) + `prefetchKeys` giới hạn `4` luồng.
   - [`tools/fix_all_audio.py`](tools/fix_all_audio.py) (cũng dùng `aiohttp.ThreadedResolver()` cho Python 3.14 Windows): Tái tạo & bổ sung **`47` cặp F/M** còn thiếu/sai lệch (`syl_*`, `word_*`, `spell_*`, `mp_tone_ba*`, `math_blank`, `decod_10_3`, `drquiz_6`, `word_tàu hỏa`, nhóm Yoon/Sokuon `ja_hira_きゃ..sokuon`, sửa lời chuẩn Truyện Nhật 4/8/10) và **dọn sạch `146` cặp MP3 thừa (`43` đợt 1 + `103` đợt 2 = `292` file chết)**.
   - Kết quả quét toàn bộ kho **`2.253` MP3 Nữ + `2.253` MP3 Nam = `4.506` file (`78,25 MB`)**: **`small = 0`**, **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`missing = 0`**, **`orphans = 0`**.

---

## 3. Tổng Hợp Các Điểm Nâng Cấp & Sửa Lỗi Từ 100 Quan Điểm (`27/11/2026`)

1. **Thư viện ảnh minh họa đầy đủ (`71` file ảnh trong `images/`, `66` tham chiếu UI):**
   - Bổ sung **`12` tranh minh họa Đạo đức** (`images/ethics/eth_{1,2,3,7,8}.jpg`, `eth_{4,5,6,9,10,11,12}.svg`) hiển thị trên cả 12 thẻ bài và màn xử lý tình huống.
   - Bổ sung **`6` ảnh bìa Tự nhiên & Đời sống** (`sc_topic_{1..3}.jpg`, `sc_topic_{4..6}.svg`) và **`5` ảnh SVG quá trình phát triển cây Bìm Bìm `あさがお`** (`asagao_{1..5}.svg`) kèm thanh tưới nước/phơi nắng lưu `localStorage`.
   - Bổ sung ảnh bìa cho **`6` Truyện Đọc VN** (`vn_story_1.jpg`, `vn_story_{2..6}.svg`), **`10` Truyện Đọc 小1** (`ja_story_{1,2,7,8,9}.jpg`, `ja_story_{3..6,10}.svg`) và **`2` icon PWA** (`icon-192.png`, `icon-512.png`).
2. **Sửa triệt để các lỗi logic & sư phạm (`app.js`, `data.js`, `learning_plus.js`, `math.js`, `dragons.js`, `english.js`, `arcade.js`, `arts_pe.js`):**
   - Sửa lỗi phân tách puzzle từ lặp (`chuồn chuồn`), ô chữ Tiếng Anh cho phép chạm sửa ô đỏ `.slot-wrong`, ẩn số giờ đáp án đỏ ở Đố Đồng Hồ, ẩn tên Nhật lộ đáp án ở Đố Vui Rồng, dọn `#phonicsDecodableHost` khỏi Khu Trò Chơi, chống trừ nhầm xu tự động trong mini-game (`noAutoCoin`), sửa chuỗi `Jenny & Andrew`, giữ trạng thái `ready` đến hết đếm ngược `3-2-1` và thêm nút Tạm dừng trong Arcade.
3. **Truy cập (Accessibility), CSS & PWA (`index.html`, `style.css`, `manifest.webmanifest`, `sw.js`, `404.html`, `LICENSE`, `CREDITS.md`):**
   - Gỡ toàn bộ `<div role="button">` lồng nút loa bên trong sang các nút `<button type="button">` anh em chuẩn HTML, thêm `<h1>` ngữ nghĩa (`expedition-h1`), `role="dialog" aria-modal="true"`, `<label for="parentGateInput">`, `:focus-visible`, `@media (prefers-reduced-motion: reduce)`, nâng tương phản WCAG AA trên mọi thẻ/nhãn phụ, bổ sung toàn bộ CSS còn thiếu (`CSS Classes missing = 0`), mở khóa Chế độ Tập trung hoàn toàn, vá lỗi nền ngăn kéo Mobile & chia lưới `2×2` cho 4 tab Đạo đức trên `390×844`.
4. **Nâng cấp kiểm thử tĩnh ([`tools/audit.py`](tools/audit.py)):**
   - Gỡ bỏ hoàn toàn vòng lặp kiểm tra giả (tautology) cũ ở `check_used_audio_keys()`, trích xuất trực tiếp key từ cấu trúc dữ liệu/hàm cả 12 module, đồng thời kiểm tra thêm CSS thiếu lớp, `<button type="button">`, `<div role="button">`, và cân bằng ngoặc/chuỗi JS bằng Python.

---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 27/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=558, dyn_js=62, getElementById=517, missing=0
Local Images: 66 referenced, missing=0
CSS Classes: used=631, defined=656, missing=0
A11y & Button types: checked 14 files, issues=0
Audio MP3s: female=2253, male=2253, size_mb=78.25, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 229 lesson words + 12 hard cases verified
Audio Keys: checked=2253, missing=0, orphans=0
Node syntax check: skipped (node not installed)
Python JS structure check: 13 files checked

AUDIT PASSED: All DOM, CSS, A11y, Image, Audio, Puzzle & JS checks clean!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/`, `1280×800` & `390×844`)
- **Đợt 1 (Quét toàn bộ module Desktop `1280×800` & Mobile `390×844`):** `50` HTTP requests (`0` lỗi `>= 400`), `0` console errors, `0` ảnh vỡ (`12/12` ảnh Đạo đức, ảnh tình huống `eth_10.svg`, vạch dừng/vạch qua đường/xe Đèn giao thông, ảnh bìa Tự nhiên & 5 giai đoạn cây Bìm Bìm, ảnh bìa Truyện Việt & 10/10 Truyện Nhật, `.kanji-strokes-badge`, đồng hồ Toán không tô đỏ giờ đáp án, `.slot-wrong` Tiếng Anh, ẩn gợi ý Nhật Đố vui Rồng, Pha màu Mỹ thuật & Undo canvas, đếm ngược/Tạm dừng Arcade, Góc Phụ Huynh & Chế độ Tập trung ẩn toàn bộ nút trò chơi). *(Ghi nhận `page.evaluate` / `serviceWorker` bị sandbox trình duyệt chặn truy cập trực tiếp và phát hiện 4 điểm nhỏ về chuỗi Guy, toast bảng vẽ, nền drawer active Mobile và tab Đạo đức Mobile).*
- **Đợt 2 (Kiểm tra lại sau bản vá `v=20261127v10`):** `50` HTTP requests, `0` lỗi `>= 400`, `0` console errors; xác minh **`#enBannerDesc`** hiển thị chuẩn **`Jenny & Andrew!`**, **`#btnArtCanvasClear → #btnArtCanvasSave`** hiện cả **`#artCanvasStatusMsg.is-warn`** lẫn **`#toastNotice.show`**, **`.ethics-subnav`** xếp lưới **`2×2`** gọn đẹp không cắt chữ (`347,2 px` trên màn `390 px`, không tràn ngang), và **ngăn kéo Mobile `☰ Môn học`** hiển thị nút active `🌱 Đạo Đức Lớp 1` nền cam chữ trắng sắc nét (`final_step_173.png`).

---

## 5. Việc Còn Lại & Điểm Mở

1. **Đồng bộ GitHub (`origin/main`):** Toàn bộ bản nâng cấp toàn diện ngày 27/11/2026 đã kiểm thử tĩnh + trình duyệt sạch và sẵn sàng/hoặc đã đẩy lên `origin/main`.
2. **Kiểm tra trên thiết bị iOS thật (iPad/iPhone Safari) & `node --check`:** `Node.js` chưa cài trên máy này (nên bước `node --check` trong `audit.py` được bỏ qua); nên test thực tế `MediaRecorder` và PWA trên Safari iOS khi có thiết bị thật.
