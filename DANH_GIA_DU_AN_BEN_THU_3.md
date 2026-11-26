# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `2d07f96` + bản cập nhật Group 1 & `DE_XUAT` ngày 26/11/2026, chưa commit)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 26/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, chẩn đoán giọng đọc, các cải tiến đã triển khai từ `DE_XUAT_CAI_THIEN_HE_THONG.md` và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript**, không framework, không bundler, không backend). Tổng cộng có **12 file JS** gồm **1 class (`SoundManager` với 42 methods)** và **203 top-level functions** (**245 hàm/phương thức** ở cấp top-level).

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.489 dòng<br>(130.498 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, Chính tả, Truyện đọc HK2, Sticker & Danh hiệu | *(0 function — 23 hằng dữ liệu)* |
| [`speech.js`](speech.js) | 643 dòng<br>(21.095 B) | Bộ điều phối âm thanh 3 tầng: 1 `HTMLAudioElement` tái sử dụng + unlock iOS, ưu tiên bản thu gia đình (IndexedDB), chặn mặc định giọng máy Windows (`allowSystemTTS = false`), `AbortError` guard & WebAudio SFX | **Class `SoundManager` (42 methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.136 dòng<br>(46.755 B) | Lộ trình hôm nay (10–15 phút), Lịch 7 ngày không phạt, Leitner SRS (`recordAnswer`), Ôn tập hôm nay, Câu giải mã Karaoke + Tự đọc (`MediaRecorder` + IndexedDB), Luyện tai thanh điệu, Phản hồi độ phủ nét & Góc Phụ Huynh mở rộng | **23 top-level functions** + `customVoiceStore` |
| [`app.js`](app.js) | 2.877 dòng<br>(111.689 B) | Điều hướng 14 tab sidebar, gamification (`schemaVersion: 3`, trần sao Đua xe ngày), bài học Tiếng Việt, Khủng long, Xe cộ, Canvas 4 ô ly (3 mức gợi ý) & 7 Mini-game | **75 top-level functions** |
| [`math.js`](math.js) | 1.799 dòng<br>(76.524 B) | Toán Lớp 1 VN & JP (0–100, Sakura, Bảng 100, Tách/Gộp, Hình 2D/3D, Thước cm, Đồng hồ, Thứ) | **27 top-level functions** |
| [`science_life.js`](science_life.js) | 421 dòng<br>(23.991 B) | Tự nhiên & Xã hội (VN) + Seikatsuka `生活科` (6 chủ đề, trồng Asagao, 5 Giác quan, Đố vui) | **7 top-level functions** |
| [`ethics.js`](ethics.js) | 826 dòng<br>(41.497 B) | Đạo Đức Lớp 1: 12 bài học, tình huống, Nên/Không nên, Đèn giao thông & Phân loại rác (8 món) | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 444 dòng<br>(19.508 B) | Âm nhạc Pianica 8 phím, Pha màu, Vẽ tranh & Thể dục (`音楽・図工・体育`) | **9 top-level functions** |
| [`japanese.js`](japanese.js) | 1.351 dòng<br>(71.411 B) | Tiếng Nhật 小1 (46+25 Hiragana, 46 Katakana, 80 MEXT Kanji, 8 chủ đề từ vựng, 4 truyện, Masume 3 mức gợi ý & kiểm tra nét) | **16 top-level functions** |
| [`english.js`](english.js) | 685 dòng<br>(33.990 B) | Tiếng Anh Lớp 1: 26 ABC, 8 chủ đề (`64` từ), Nghe chọn hình & Ghép chữ | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 471 dòng<br>(21.589 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật, Đố vui & Lật thẻ | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 802 dòng<br>(28.100 B) | Đua Siêu Xe, Khủng Long & Rồng Bay 4 nút (chọn đủ 4/4 hero, có trần 40 ⭐/ngày) | **17 top-level functions** |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.326` MP3 = `67,77 MB`)

### A. Chẩn đoán & Xử lý dứt điểm giọng đọc "giống Windows / giả giả"
1. **Nguyên nhân phát hiện trước đó:**
   - Khi quét header nhị phân kho MP3 cũ, có **`353` key (`207` file Nữ + `216` file Nam = `423` file MP3)** mang header `fff384c4` (Google Translate TTS fallback `64 kbps`), nghe khô và đơn giọng nữ cả khi chọn Ba (Nam).
   - Khi ngắt phát nhanh (`AbortError`) hoặc lỗi tải MP3, `speech.js` trước đây còn rơi vào `window.speechSynthesis` (giọng desktop mặc định của Windows).
2. **Đã sửa & tái tạo triệt để 100%:**
   - [`speech.js`](speech.js): Mặc định **`allowSystemTTS = false`** (chặn hẳn giọng máy Windows tự phát), chặn `AbortError` rơi vào `speakTTS()`, ưu tiên giọng `Online / Natural / Google` nếu phụ huynh bật lại fallback, và ưu tiên phát **bản thu giọng Ba/Mẹ cục bộ (IndexedDB)**.
   - [`tools/regen_natural_voices.py`](tools/regen_natural_voices.py) (cũng đã vá `aiohttp.ThreadedResolver()` tránh lỗi `aiodns` trên Python 3.14 Windows và ghi tạm nguyên tử `.tmp`): Đã chạy hoàn tất **`389/389` key** (`353` key `fff384c4` cũ + `36` câu giải mã `decod_1_1..decod_12_3`) bằng 100% Microsoft Edge Neural (`vi-VN-HoaiMyNeural`, `vi-VN-NamMinhNeural`, `ja-JP-NanamiNeural`, `ja-JP-KeitaNeural`).
   - Kết quả kiểm tra toàn bộ **`2.163` MP3 Nữ + `2.163` MP3 Nam = `4.326` file (`67,77 MB`)**: **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`small = 0`**.

---

## 3. Các Cải Tiến Đã Triển Khai Từ `DE_XUAT_CAI_THIEN_HE_THONG.md`

- **Nhóm 1 (Đã hoàn tất trước đó):** Đồng bộ nhãn động Ethics/English, sửa resize sidebar Desktop → Mobile, mở khóa 4/4 hero Arcade, 1 player iOS + silent unlock, `completedGames` & Góc Phụ Huynh Export/Import/Reset 2 bước, xóa 50 cặp MP3 rác.
- **Nhóm nâng cấp từ `DE_XUAT_CAI_THIEN_HE_THONG.md` (vừa hoàn tất):**
  1. **Lộ Trình Hôm Nay (10–15 phút) & Lịch 7 Ngày Không Phạt** (`#dailyHubHost`).
  2. **Leitner SRS (`schemaVersion: 3`, `wordStats`, `dailyLog`) & Ôn Tập Hôm Nay:** Hàm `recordAnswer(id, isCorrect, meta)` theo dõi mức nhớ `0–4`, hẹn ngày ôn `[1, 2, 4, 8, 16]`, giảm gợi ý dần (`level >= 2`), thưởng `+3 ⭐` khi nhớ vững (`level >= 3`), trần sao Đua xe `40 ⭐/ngày`.
  3. **Cầu nối "Con Tự Đọc" (`#phonicsDecodableHost`):** `36` câu ngắn trên `12` bài đánh vần dùng 100% từ có sẵn MP3 thật; chế độ **Karaoke sáng từng tiếng** và chế độ **"🎤 Con tự đọc"** (`MediaRecorder` cục bộ IndexedDB, không tải ra ngoài).
  4. **Luyện Tai 6 Thanh & Âm Khó Việt–Nhật (`#minimalPairHost`):** `12` nhóm cặp tối thiểu thanh điệu & phụ âm đầu (`eo/èo/éo/ẹo`, `hoa/hóa/hỏa`, `s/x`, `tr/ch`, `l/n`, 6 thanh).
  5. **Tập viết 3 cấp độ & Phản hồi độ phủ nét:** `Nét mờ → Chấm đầu → Ô trống` và nút `✨ Kiểm tra nét` trên cả 4 ô ly Tiếng Việt và Masume Tiếng Nhật.
  6. **Góc Phụ Huynh Mở Rộng (`#parentPlusHost`):** Báo cáo tuần (`ngày học`, `phút`, `từ mức ≥3`, `Top 5 từ hay nhầm`), nhắc nghỉ mắt (`0/15/20/30 phút`), `Chế độ Tập trung` ẩn tab Đua xe/Trò chơi, `Chặn giọng Windows`, và **Phòng thu giọng Ba/Mẹ cục bộ**.

---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 26/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=524, dyn_js=37, getElementById=468, missing=0
Local Images: 30 referenced, missing=0
Audio MP3s: female=2163, male=2163, size_mb=67.77, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 200 lesson words + 12 hard cases verified
Audio Keys: checked=2122, missing=0, orphans=41
Node syntax check: skipped (node not installed)

ALL STATIC AUDIT CHECKS PASSED!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/`)
- **Phiên 1 (7 khu vực tính năng mới, `1440×900` → `390×844`):** `42` HTTP requests, `0` lỗi `>= 400`, `0` console/page errors; đã xác minh Daily Hub + lịch 7 ngày, Ôn tập Leitner `#dueReviewInlineStage`, kiểm tra nét 3 mức trên 4 ô ly & Masume, Luyện tai thanh điệu `#minimalPairHost`, Góc Phụ Huynh mở rộng (Báo cáo tuần, Chế độ Tập trung ẩn/hiện tab Arcade, `parentNoSysTtsChk = true`), và Mobile `390×844` (`375.2 px <= 390 px`, không tràn ngang).
- **Phiên 2 (Kiểm tra lại Step 3 sau bản vá `lessonId` trong `learning_plus.js`, `1440×900`):** `50` network buffer requests, `0` lỗi `>= 400`, `0` console/page errors; xác minh `#phonicsDecodableHost` hiển thị `3` câu/bài (`Bài 1`, `Bài 2`, `Bài 8`), Karaoke tải chuẩn MP3 (`word_tập.mp3`, `word_bé.mp3`, `word_đọc.mp3`, `word_sach.mp3` HTTP `200`/`206`), chế độ `🎤 Con tự đọc` và tiến độ Lộ trình `2/3 bước`.

---

## 5. Việc Còn Lại & Điểm Mở

1. **Commit & Push lên GitHub (`origin/main`):** Toàn bộ sửa đổi mã nguồn + `389` cặp MP3 Neural mới tạo đang ở working tree cục bộ (chưa `git commit` / `git push`).
2. **Kiểm tra trên thiết bị iOS thật (iPad/iPhone Safari):** Kiểm thử `MediaRecorder` và audio player trong Safari thực tế.
3. **Các câu hỏi định hướng từ `DE_XUAT` Mục 14:** Chưa tự ý thêm `LICENSES.md`/PWA/tách ES module để chờ bạn chốt mục tiêu cuối năm lớp 1, thời lượng học mỗi ngày và chế độ công khai/riêng tư của repo.
