# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN (GDPT 2018) & JP (MEXT 小学1年生) + Tranh Minh Họa Đủ Môn + PWA Offline (`v20261127v10`)  
> **Cập nhật:** 27/11/2026 • **Git Branch:** `main` (Sau đợt tổng sửa lỗi & nâng cấp 100 quan điểm)

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Local MP3 Audio + IndexedDB ghi âm cục bộ + WebAudio + Service Worker PWA). Tổng cộng **12 module JS ứng dụng + `sw.js`** gồm **1 class (`SoundManager` với `46` methods)** và **`230` top-level functions** (**`276` hàm/phương thức**):

| File | Kích thước | Nhiệm vụ chính | Ghi chú kỹ thuật |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.466 dòng<br>(132.191 B) | Dữ liệu Tiếng Việt (`G → Gỗ`, đủ 10 từ Bài 7, `NG/UY/SX/CH-TR`), `36` câu `DECODABLE_PHONICS_SENTENCES`, `12` nhóm `MINIMAL_PAIR_DRILLS`, Khủng long, Xe cộ, `6` Truyện Đọc VN kèm ảnh bìa | Hằng dữ liệu tĩnh đã đồng bộ 100% với kho MP3 |
| [`speech.js`](speech.js) | 774 dòng<br>(25.947 B) | Âm thanh 3 tầng Nam/Nữ, LRU `blobCache` (800 mục), `prefetchKeys` (max 4), `normalizeKey` NFC, iOS unlock không dính mute, `DynamicsCompressorNode`, `stopAll()` hủy sạch hẹn giờ | **`class SoundManager` (`46` methods)** |
| [`learning_plus.js`](learning_plus.js) | 1.276 dòng<br>(53.562 B) | Lộ trình hôm nay (`+20 🪙 Xu`/bước), Lịch 7 ngày & `dailyLog` tỉa 90 ngày, Leitner SRS (`[0,1,1,3,7,14]`), Ôn tập phát chuỗi phẩy, Karaoke & ghi âm gia đình khóa theo từng recorder | **`26` functions + `customVoiceStore`** (`initLearningPlus`) |
| [`app.js`](app.js) | 3.412 dòng<br>(134.971 B) | Khởi tạo sau `loadProgress()`, bẫy focus Modal ARIA, Reset/Import an toàn, Canvas HiDPI 4 ô ly giữ nét khi resize nhẹ, Puzzle sửa trùng âm (`chuồn chuồn`), Chế độ Tập trung | **`82` functions** |
| [`math.js`](math.js) | 1.861 dòng<br>(78.827 B) | Toán Lớp 1 VN & JP (`0–100`, Bảng `1–100`, Đồng hồ 12 giờ ẩn tô đỏ đáp án khi đố, 2D/3D SVG sạch ID, Thước cm, Thứ) | **`27` functions** |
| [`science_life.js`](science_life.js) | 579 dòng<br>(31.960 B) | Tự nhiên & Xã hội + Seikatsuka `生活科`: **6 ảnh chủ đề** + **cây Bìm Bìm `あさがお` 5 ảnh SVG tương tác lưu `localStorage`** + 5 Giác quan | **`9` functions** |
| [`ethics.js`](ethics.js) | 899 dòng<br>(45.282 B) | Đạo Đức Lớp 1: **12 tranh minh họa thẻ & tình huống**, nút anh em đúng chuẩn ARIA, Đèn giao thông có vạch dừng/qua đường/SVG xe, Phân loại rác không lộ đáp án | **`12` functions** |
| [`arts_pe.js`](arts_pe.js) | 648 dòng<br>(28.676 B) | Âm nhạc Pianica 8 phím, **Pha màu tương tác**, Vẽ tranh (Tẩy/Undo/Tải PNG/cảnh báo bảng trống `#artCanvasStatusMsg`), & Thể dục | **`10` functions** |
| [`japanese.js`](japanese.js) | 2.994 dòng<br>(153.018 B) | Hiragana (+ Yoon/Sokuon), Katakana, 80 MEXT Kanji (kèm **huy hiệu số nét**), **10 Truyện Đọc 小1 kèm 10 ảnh bìa** + audio Edge Neural đã kiểm âm & sửa Truyện 4/8/10 | **`16` functions** |
| [`english.js`](english.js) | 696 dòng<br>(34.831 B) | Tiếng Anh Lớp 1 (`Jenny & Andrew`, `64` từ, Đố vui & Ghép từ sửa từng ô đỏ `.slot-wrong`) | **`10` functions** |
| [`dragons.js`](dragons.js) | 491 dòng<br>(22.895 B) | Vương Quốc Rồng (`8` loài rồng ảnh thật, sửa Rồng Đá `drquiz_6`, ẩn tên Nhật ở Đố vui Rồng, Lật thẻ & Kỷ lục) | **`7` functions** |
| [`arcade.js`](arcade.js) | 1.504 dòng<br>(58.543 B) | Giải Đua 3 Chặng (~60–90s), khóa trạng thái `ready` suốt đếm ngược `3-2-1`, nút `#btnArcadePause`, Cổng Chữ MP3 thật, AI bám đuổi, Xưởng Xu & ảnh thật | **`31` functions** |
| [`sw.js`](sw.js) | 72 dòng<br>(2.120 B) | Service Worker (`baolong-v20261127v10`) phục vụ PWA & cache offline MP3/ảnh đã dùng | Precache shell + media runtime cache |

---

## 2. Các Điểm Nâng Cấp Mới Nhất (Đợt 27/11/2026)

1. **Minh họa trực quan cho toàn bộ môn học (`71` file trong `images/`):** Đạo đức (`12` ảnh bài học & tình huống), Tự nhiên & Đời sống (`6` ảnh bìa chủ đề + `5` giai đoạn SVG cây Bìm Bìm `あさがお` tưới nước/phơi nắng lưu `localStorage`), Truyện Đọc Việt (`6` ảnh bìa) & Nhật (`10` ảnh bìa), cùng `2` icon PWA.
2. **Sửa lỗi toàn diện theo 100 quan điểm (`P0–P3`):** Khắc phục khởi tạo phụ thuộc `loadProgress`, lỗi iOS AudioContext/mute unlock, rò rỉ hẹn giờ `playPraiseThen`, XSS ở thẻ SRS & mục ôn tập, nút `<div role="button">` lồng nút loa, trùng từ Puzzle `chuồn chuồn`, rò rỉ đáp án ở Đồng hồ/Đố Rồng/Phân loại rác, và hoàn thiện nút Tạm dừng/khóa đếm ngược ở Arcade.
3. **Truy cập (Accessibility), Tương phản WCAG AA, PWA Offline & Audit:** Bổ sung `<h1>` chuẩn, ARIA Modal focus trap, `:focus-visible`, `@media (prefers-reduced-motion: reduce)`, tăng độ tương phản chữ/nhãn phụ, thêm `manifest.webmanifest`, `sw.js`, `.nojekyll`, `404.html`, `LICENSE`, `CREDITS.md`, và nâng cấp `tools/audit.py` kiểm tra thật `2.253` cặp audio + CSS + `type="button"` + cân bằng cú pháp JS.
4. **Hậu kiểm trình duyệt (`v=20261127v10`):** Xử lý dứt điểm chuỗi `Jenny & Andrew` trong `english.js`, trạng thái nhắc bảng vẽ trống trong `arts_pe.js`, chia lưới `2×2` cho 4 tab Đạo đức trên Mobile `390×844` và tương phản nút active trên ngăn kéo Mobile.

---

## 3. Kho Âm Thanh Edge Neural (`4.506` MP3 = `78,25 MB`)

- **Thành phần chuẩn 100% Microsoft Edge Neural Voices:** `2.253` cặp Nữ (`vi-VN-HoaiMyNeural`, `ja-JP-NanamiNeural`, `en-US-JennyNeural`) + Nam (`vi-VN-NamMinhNeural`, `ja-JP-KeitaNeural`, `en-US-AndrewNeural`).
- Đã tái tạo đủ `47` cặp mới/sửa lỗi bằng [`tools/fix_all_audio.py`](tools/fix_all_audio.py) (cùng `drquiz_6` & `word_tàu hỏa`), và dọn sạch `146` cặp MP3 thừa lỗi thời (`small = 0`, `identical_FM = 0`, `gtts_fff384c4 = 0`, **`missing = 0`, `orphans = 0`**).

---

## 4. Kết Quả Test & Log Thực Tế (Sau Chỉnh Sửa Cuối 27/11/2026)

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

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/`)
- **Đợt 1 (Desktop `1280×800` & Mobile `390×844`):** `50` HTTP requests (`0` lỗi `>= 400`), `0` console errors, `0` ảnh vỡ qua tất cả các môn học, Chế độ Tập trung, Ô chữ, Toán, Rồng, Nhật, Arcade, Đạo đức, Tự nhiên; xác nhận layout Mobile không tràn ngang (`html`/`body = 375,2 px <= 390 px`).
- **Đợt 2 (`?v=20261127v10` sau vá 4 điểm):** `50` HTTP requests (`0` lỗi `>= 400`), `0` console errors; xác minh chuỗi `Jenny & Andrew`, `#artCanvasStatusMsg.is-warn` + `#toastNotice.show`, `.ethics-subnav` lưới `2×2` sạch trên `390×844` (`169,6 × 63,1 px`), và ngăn kéo `☰ Môn học` hiển thị nút active `🌱 Đạo Đức Lớp 1` rõ nét, không chớp trắng.

### C. Lịch sử Git (`origin/main`)
```text
8333273 feat: expand Japanese Grade 1 stories to 10 complete interactive tales with dual-voice Edge Neural audio
d64b291 feat: fix male voices across EN/JA/VI, trim math pauses, and upgrade all 7 mini-games
ddd56e9 feat: 3-stage racing arcade with letter gates, Xu upgrades, balanced stars, and real dino/dragon photos
6c59a7e feat: apply review fixes, Leitner SRS roadmap, decodable reading, and 100% Edge Neural voices
```
