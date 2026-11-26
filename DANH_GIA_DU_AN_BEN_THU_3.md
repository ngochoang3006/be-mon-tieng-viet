# 📋 Hồ Sơ Đánh Giá Dự Án Dành Cho Bên Thứ 3

> **Tên ứng dụng:** Bảo Long Thám Hiểm Tiếng Việt – Hệ Thống Học Tập & Vui Chơi Lớp 1 Song Ngữ Việt – Nhật  
> **Repository Git:** https://github.com/ngochoang3006/be-mon-tieng-viet.git  
> **Nhánh hiện tại:** `main` (nền `ddd56e9` + bản sửa Giọng Nam & Nâng cấp 7 Mini-Game ngày 26/11/2026)  
> **Ngày lập hồ sơ & chạy kiểm thử:** 26/11/2026

Tài liệu này tổng hợp kiến trúc hàm, nội dung học tập, chẩn đoán giọng đọc, các cải tiến đã triển khai từ `DE_XUAT_CAI_THIEN_HE_THONG.md` và log kiểm thử thực tế sau chỉnh sửa cuối.

---

## 1. Tóm Tắt Các `class` & `function` Trong Dự Án

Ứng dụng chạy hoàn toàn phía client (**HTML5 + CSS3 + Vanilla JavaScript**, không framework, không bundler, không backend). Tổng cộng có **12 file JS** gồm **1 class (`SoundManager` với 43 methods)** và **222 top-level functions** (**265 hàm/phương thức** ở cấp top-level).

| File | Kích thước | Vai trò chính | Tổng `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.489 dòng<br>(130.498 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, Chính tả, Truyện đọc HK2, Sticker & Danh hiệu | *(0 function — 23 hằng dữ liệu)* |
| [`speech.js`](speech.js) | 651 dòng<br>(21.492 B) | Bộ điều phối âm thanh 3 tầng: `normalizeKey` cho mọi chuỗi phát âm, bỏ tải trùng 2 lần, thông báo theo giọng Nam/Nữ, 1 `HTMLAudioElement` iOS, ưu tiên bản thu gia đình (IndexedDB), chặn giọng Windows & WebAudio SFX | **Class `SoundManager` (43 methods)** *(chi tiết xem [`TONG_HOP_HE_THONG.md`](TONG_HOP_HE_THONG.md))* |
| [`learning_plus.js`](learning_plus.js) | 1.151 dòng<br>(47.697 B) | Lộ trình hôm nay (10–15 phút, `+20 🪙 Xu`/bước), Lịch 7 ngày không phạt, Leitner SRS (`recordAnswer` + `+5 🪙 Xu`), Ôn tập hôm nay, Câu giải mã Karaoke + Tự đọc (`MediaRecorder` + IndexedDB), Luyện tai thanh điệu, Phản hồi độ phủ nét, trần sao Đua xe `25 ⭐/ngày` & Góc Phụ Huynh | **23 top-level functions** + `customVoiceStore` |
| [`app.js`](app.js) | 3.207 dòng<br>(125.549 B) | Điều hướng 14 tab sidebar, gamification (`schemaVersion: 3`, `coins`/`awardCoins`, `arcadeGear`, trần Đua `25 ⭐/ngày`), Tiếng Việt, Khủng long, Xe cộ, Canvas 4 ô ly & **7 Mini-game nâng cấp** (gợi ý, Blitz 45s, ga Shinkansen, 3 độ khó Memory + Soi 2s + kỷ lục, sự thật Quiz, Khảo cổ 2 công cụ Búa/Cọ + vết nứt SVG) | **81 top-level functions** |
| [`math.js`](math.js) | 1.799 dòng<br>(76.524 B) | Toán Lớp 1 VN & JP (0–100, Sakura, Bảng 100, Tách/Gộp, Hình 2D/3D, Thước cm, Đồng hồ, Thứ) | **27 top-level functions** |
| [`science_life.js`](science_life.js) | 421 dòng<br>(23.991 B) | Tự nhiên & Xã hội (VN) + Seikatsuka `生活科` (6 chủ đề, trồng Asagao, 5 Giác quan, Đố vui) | **7 top-level functions** |
| [`ethics.js`](ethics.js) | 826 dòng<br>(41.497 B) | Đạo Đức Lớp 1: 12 bài học, tình huống, Nên/Không nên, Đèn giao thông & Phân loại rác (8 món) | **12 top-level functions** |
| [`arts_pe.js`](arts_pe.js) | 444 dòng<br>(19.508 B) | Âm nhạc Pianica 8 phím, Pha màu, Vẽ tranh & Thể dục (`音楽・図工・体育`) | **9 top-level functions** |
| [`japanese.js`](japanese.js) | 1.351 dòng<br>(71.411 B) | Tiếng Nhật 小1 (46+25 Hiragana, 46 Katakana, 80 MEXT Kanji, 8 chủ đề từ vựng, 4 truyện, Masume 3 mức gợi ý & kiểm tra nét) | **16 top-level functions** |
| [`english.js`](english.js) | 685 dòng<br>(33.990 B) | Tiếng Anh Lớp 1: 26 ABC, 8 chủ đề (`64` từ), Nghe chọn hình & Ghép chữ | **10 top-level functions** |
| [`dragons.js`](dragons.js) | 471 dòng<br>(21.589 B) | Vương Quốc Rồng: 8 loài rồng ảnh thật, Đố vui & Lật thẻ | **7 top-level functions** |
| [`arcade.js`](arcade.js) | 1.378 dòng<br>(52.863 B) | Giải Đua 3 Chặng (~60–90s) Xe / Khủng Long / Rồng: đếm ngược `3-2-1`, 6 Cổng Chữ MP3 thật, AI bám đuổi, Xưởng Xu nâng cấp Speed/Nitro Lv0–3 & Trang trí, ảnh thật JPG Khủng long & Rồng, thưởng `1–3 ⭐` + `🪙 Xu` | **30 top-level functions** |

---

## 2. Chẩn Đoán & Cập Nhật Hệ Thống Giọng Đọc (`4.326` MP3 = `66,51 MB`)

### A. Chẩn đoán & Xử lý dứt điểm giọng đọc "giống Windows / giả giả"
1. **Nguyên nhân phát hiện trước đó:**
   - Khi quét header nhị phân kho MP3 cũ, có **`353` key (`207` file Nữ + `216` file Nam = `423` file MP3)** mang header `fff384c4` (Google Translate TTS fallback `64 kbps`), nghe khô và đơn giọng nữ cả khi chọn Ba (Nam).
   - Khi ngắt phát nhanh (`AbortError`) hoặc lỗi tải MP3, `speech.js` trước đây còn rơi vào `window.speechSynthesis` (giọng desktop mặc định của Windows).
2. **Đã sửa & tái tạo triệt để 100%:**
   - [`speech.js`](speech.js): Mặc định **`allowSystemTTS = false`** (chặn hẳn giọng máy Windows tự phát), chặn `AbortError` rơi vào `speakTTS()`, ưu tiên giọng `Online / Natural / Google` nếu phụ huynh bật lại fallback, và ưu tiên phát **bản thu giọng Ba/Mẹ cục bộ (IndexedDB)**.
   - [`tools/regen_natural_voices.py`](tools/regen_natural_voices.py) (cũng đã vá `aiohttp.ThreadedResolver()` tránh lỗi `aiodns` trên Python 3.14 Windows và ghi tạm nguyên tử `.tmp`): Đã chạy hoàn tất **`389/389` key** (`353` key `fff384c4` cũ + `36` câu giải mã `decod_1_1..decod_12_3`) bằng 100% Microsoft Edge Neural (`vi-VN-HoaiMyNeural`, `vi-VN-NamMinhNeural`, `ja-JP-NanamiNeural`, `ja-JP-KeitaNeural`).
   - Kết quả kiểm tra toàn bộ **`2.163` MP3 Nữ + `2.163` MP3 Nam = `4.326` file (`66,51 MB`)**: **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`small = 0`**.

---

## 3. Các Cải Tiến Đã Triển Khai Từ `DE_XUAT_CAI_THIEN_HE_THONG.md`

- **Nhóm 1 (Đã hoàn tất trước đó):** Đồng bộ nhãn động Ethics/English, sửa resize sidebar Desktop → Mobile, mở khóa 4/4 hero Arcade, 1 player iOS + silent unlock, `completedGames` & Góc Phụ Huynh Export/Import/Reset 2 bước, xóa 50 cặp MP3 rác.
- **Nhóm nâng cấp từ `DE_XUAT_CAI_THIEN_HE_THONG.md` (vừa hoàn tất):**
  1. **Lộ Trình Hôm Nay (10–15 phút) & Lịch 7 Ngày Không Phạt** (`#dailyHubHost`).
  2. **Leitner SRS (`schemaVersion: 3`, `wordStats`, `dailyLog`) & Ôn Tập Hôm Nay:** Hàm `recordAnswer(id, isCorrect, meta)` theo dõi mức nhớ `0–4`, hẹn ngày ôn `[1, 2, 4, 8, 16]`, giảm gợi ý dần (`level >= 2`), thưởng `+3 ⭐` khi nhớ vững (`level >= 3`), trần sao Đua xe `25 ⭐/ngày`.
  3. **Cầu nối "Con Tự Đọc" (`#phonicsDecodableHost`):** `36` câu ngắn trên `12` bài đánh vần dùng 100% từ có sẵn MP3 thật; chế độ **Karaoke sáng từng tiếng** và chế độ **"🎤 Con tự đọc"** (`MediaRecorder` cục bộ IndexedDB, không tải ra ngoài).
  4. **Luyện Tai 6 Thanh & Âm Khó Việt–Nhật (`#minimalPairHost`):** `12` nhóm cặp tối thiểu thanh điệu & phụ âm đầu (`eo/èo/éo/ẹo`, `hoa/hóa/hỏa`, `s/x`, `tr/ch`, `l/n`, 6 thanh).
  5. **Tập viết 3 cấp độ & Phản hồi độ phủ nét:** `Nét mờ → Chấm đầu → Ô trống` và nút `✨ Kiểm tra nét` trên cả 4 ô ly Tiếng Việt và Masume Tiếng Nhật.
  6. **Góc Phụ Huynh Mở Rộng (`#parentPlusHost`):** Báo cáo tuần (`ngày học`, `phút`, `từ mức ≥3`, `Top 5 từ hay nhầm`), nhắc nghỉ mắt (`0/15/20/30 phút`), `Chế độ Tập trung` ẩn tab Đua xe/Trò chơi, `Chặn giọng Windows`, và **Phòng thu giọng Ba/Mẹ cục bộ**.

- **Nâng cấp Khu Đua 3 Chặng, Cổng Chữ, Xưởng Xu & Ảnh thật (`arcade.js`, `learning_plus.js`, `app.js`, `index.html`, `style.css`):**
  1. **Giải đua 3 chặng (`60–90s`) & Đếm ngược `3-2-1`:** Xe (`Ngày Nắng → Hoàng Hôn → Đêm Đèn Pha`), Khủng Long (`Rừng Xanh → Hẻm Núi → Núi Lửa`), Rồng (`Biển Mây → Bão Sấm → Cầu Vồng`), kèm hiệu ứng slow-motion kịch tính lúc về đích.
  2. **6 Cổng Chữ ôn bài trên đường đua:** Dùng lại `14` file `alpha_*.mp3` thật (`ARCADE_GATE_POOL`), ưu tiên chữ bé hay sai trong `wordStats`, kèm thanh nhắc chữ + nút `🔊 Nghe lại chữ` (`#btnArcadeReplayGate`); vào đúng cổng tăng tốc Nitro + `+10 🪙 Xu` + `recordAnswer(true)`, vào sai chậm nhẹ + lưu vào *Ôn tập hôm nay*.
  3. **Đối thủ bám đuổi & Cảm giác tốc độ:** AI tự điều chỉnh tốc độ bám sát (`0.78×–1.24×`), kết hợp vạch gió, rung nhẹ khi Nitro/va chạm, hạt tia lửa/bụi (`<= 48`) và xung động cơ WebAudio (tôn trọng công tắc tắt tiếng).
  4. **Kinh tế `🪙 Xu`, Xưởng Xu (`#arcadeGarageBar`) & Cân bằng sao (`1–3 ⭐`):** Học từ mới (`+3 Xu`), trả lời đúng ngoài Arcade (`+5 Xu`), hoàn thành bước Lộ trình (`+20 Xu`), qua Cổng Chữ (`+10 Xu`) và về đích (`+12..25+ Xu`) dùng để nâng cấp Tốc độ/Nitro `Lv0–3` và trang trí (`👑 Vương miện`, `🔥 Đuôi lửa`, `🌈 Cầu vồng`). Đua chỉ thưởng **`1–3 ⭐`** (`25 ⭐/ngày`) để việc học & nhớ từ giữ vai trò nguồn sao chính.
  5. **Hình thật Khủng long & Rồng (`images/dinos/*`, `images/dragons/*`):** Toàn bộ `8` nhân vật Khủng long & Rồng hiển thị ảnh chụp thật cả ở `#arcadeHeroPicker` lẫn khung tròn chuyển động có cánh/vương miện/hào quang trên Canvas (`drawPhotoRacerSprite()`).

- **Sửa Giọng Nam & Nâng cấp 7 Mini-Game thực tế (`tools/regen_male_fixes.py`, `speech.js`, `app.js`, `index.html`, `style.css`):**
  1. **Sửa kho giọng Nam bằng quét PCM thực tế:** Đổi toàn bộ `118` key Tiếng Anh Nam từ `GuyNeural` (bị cao `157–235 Hz`) sang `en-US-AndrewNeural` (`~118,8 Hz` trung bình); tái tạo `117` kana Tiếng Nhật + `4` key `ja_n_2`/`ja_n_5`/`ja_kanji_02`/`ja_kanji_31` bằng `ja-JP-KeitaNeural` với dấu kéo/chuẩn `を→おー` xóa sạch `104` file câm/bé tiếng; sửa các file đánh vần & vần lệch độ dài (`spell_ổi`, `spell_cờ`, `spell_ăn`, `spell_xôi`, `spell_tàu`, `spell_mặt trời`, `spell_dragon_earth`, `tone_ngang`); cắt gọn `1.000,5 KB` khoảng lặng đuôi thừa trên `216` file ghép phép tính `math_*`.
  2. **Sửa `speech.js` & nhãn UI:** Thêm `normalizeKey()`, bỏ double-fetch ở `resolveAudioUrl()`, cập nhật nhãn động theo giọng `Nam (Ba)` / `Nữ (Cô)` và bổ sung `type="button"` trong `index.html`.
  3. **Nâng cấp 7 Mini-Game Khu Trò Chơi (`#gameViewContainer`):** Thanh thưởng `🪙 Xu` nối với Xưởng Đua; **Ghép Chữ** (Combo + Gợi ý từng chữ), **Nghe Âm** (+ chế độ Phản xạ nhanh 45s), **Shinkansen** (Đèn tín hiệu ga + giải thích lỗi ghép + câu thực tế), **Lật Thẻ Khủng Long** (3 độ khó 4/6/8 cặp, nút Soi 2s, Combo, Kỷ lục `localStorage`), **Đố Vui Khủng Long & Xe** (hiện `funFact` thực tế & lưu `recordAnswer`), **Khai Quật Hóa Thạch** (2 công cụ `⛏️ Búa Đá` & `🖌️ Cọ Quét Cát`, vết nứt SVG, mảnh đá văng và hồ sơ thực tế).
---

## 4. Log Kiểm Thử Sau Bản Cập Nhật Cuối (Ngày 26/11/2026)

### A. Kiểm tra tĩnh tự động ([`tools/audit.py`](tools/audit.py))
```text
DOM IDs: html=557, dyn_js=39, getElementById=499, missing=0
Local Images: 30 referenced, missing=0
Audio MP3s: female=2163, male=2163, size_mb=66.51, small=0, identical_FM=0, gtts_fff384c4=0
Puzzle checks: 200 lesson words + 12 hard cases verified
Audio Keys: checked=2122, missing=0, orphans=41
Node syntax check: skipped (node not installed)

ALL STATIC AUDIT CHECKS PASSED!
```

### B. Kiểm thử trình duyệt Live (`http://127.0.0.1:8080/`)
- **Phiên 1 (7 khu vực tính năng mới, `1440×900` → `390×844`):** `42` HTTP requests, `0` lỗi `>= 400`, `0` console/page errors; đã xác minh Daily Hub + lịch 7 ngày, Ôn tập Leitner `#dueReviewInlineStage`, kiểm tra nét 3 mức trên 4 ô ly & Masume, Luyện tai thanh điệu `#minimalPairHost`, Góc Phụ Huynh mở rộng (Báo cáo tuần, Chế độ Tập trung ẩn/hiện tab Arcade, `parentNoSysTtsChk = true`), và Mobile `390×844` (`375.2 px <= 390 px`, không tràn ngang).
- **Phiên 2 (Kiểm tra lại Step 3 sau bản vá `lessonId` trong `learning_plus.js`, `1440×900`):** `50` network buffer requests, `0` lỗi `>= 400`, `0` console/page errors; xác minh `#phonicsDecodableHost` hiển thị `3` câu/bài (`Bài 1`, `Bài 2`, `Bài 8`), Karaoke tải chuẩn MP3 (`word_tập.mp3`, `word_bé.mp3`, `word_đọc.mp3`, `word_sach.mp3` HTTP `200`/`206`), chế độ `🎤 Con tự đọc` và tiến độ Lộ trình `2/3 bước`.
- **Phiên 3 (Kiểm thử Live Khu Đua 3 Chặng & Xưởng Xu, Desktop `1280×800` → Mobile `390×844`):** `0` lỗi console HUD, `0` HTTP `>= 400`, `8/8` ảnh thật Khủng long & Rồng tải HTTP `200`; học `9` thẻ từ tăng `⭐ 49 → 67` và tích `🪙 Xu: 27`; nâng cấp `Tốc độ Lv0/3 → Lv1/3` (`20 🪙`, còn `7 🪙`); đua Rồng `Rồng Lửa Đỏ` qua đếm ngược `3-2-1`, qua Cổng Chữ `"S"` nhận Nitro + `+10 🪙 Xu`, sang `Chặng 2: Bão Sấm` kích hoạt Cổng Chữ `"Ă"` (`alpha_*.mp3` HTTP `200`/`206`) & nút `#btnArcadeReplayGate`, sang `Chặng 3: Cầu Vồng` (`67%`); kiểm tra Mobile `390×844` bề rộng `375.2 px <= 390 px` không tràn ngang.
- **Phiên 4 (Kiểm thử Live Giọng Nam & 7 Mini-Game nâng cấp, `1280×800` → Mobile `390×844`):** `0` lỗi console, `0` page errors, `0` HTTP `>= 400`, `0` ảnh lỗi; bật `👨 Nam (Ba)` (`word_bố.mp3`, `ort_ck.mp3`, `ja_hira_ん.mp3`, `ja_hira_ほ.mp3`, `en_alpha_a.mp3`, `en_w_goodmorning.mp3` HTTP `200`/`206`), `#btnHearVnStory` đổi đúng thành `Nghe ba đọc bài văn`; test đủ 7 mini-game (`#btnPuzzleHint`, `#btnListenBlitz` đếm ngược `45s → 43s`, `#trainSignalLight` đổi `🟢`, `#btnMemEasy` 8 thẻ + `#btnMemPeek` -> `👀 Đã dùng`, `#dinoQuizFactBox`, `#quizFactBox`, Khai quật 5 lần Búa/Cọ lộ ảnh thật T-Rex + `+5 🪙 Xu`), `#gameSessionCoins` tăng `+23 🪙`; Mobile `390×844` giữ `375.2 px <= 390 px` không tràn ngang.

---

## 5. Việc Còn Lại & Điểm Mở

1. **Đồng bộ GitHub (`origin/main`):** Các mốc trước (`6c59a7e`, `ddd56e9`) đã lên `origin/main`; bản sửa Giọng Nam & Nâng cấp 7 Mini-game đã kiểm thử xong và chuẩn bị commit/push trong phiên này.
2. **Kiểm tra trên thiết bị iOS thật (iPad/iPhone Safari):** Kiểm thử `MediaRecorder` và audio player trong Safari thực tế.
3. **Các câu hỏi định hướng từ `DE_XUAT` Mục 14:** Chưa tự ý thêm `LICENSES.md`/PWA/tách ES module để chờ bạn chốt mục tiêu cuối năm lớp 1, thời lượng học mỗi ngày và chế độ công khai/riêng tư của repo.
