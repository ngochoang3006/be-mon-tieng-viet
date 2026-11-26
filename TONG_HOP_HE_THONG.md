# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN (GDPT 2018) & JP (MEXT 小学1年生) + Đua Xe 4 Nút + Lộ Trình Hôm Nay, Leitner SRS & Góc Phụ Huynh  
> **Cập nhật:** 26/11/2026 • **Git Branch:** `main` (Nền `2d07f96` + bản cập nhật Group 1 & `DE_XUAT`)

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Local MP3 Audio + IndexedDB ghi âm cục bộ + WebAudio). Tổng cộng **12 file JS** gồm **1 class (`SoundManager` với 42 methods)** và **203 top-level functions** (**245 hàm/phương thức**):

| File | Kích thước | Nhiệm vụ chính | Các `class` / `function` |
| :--- | :---: | :--- | :--- |
| [`data.js`](data.js) | 2.489 dòng<br>(130.498 B) | Kho dữ liệu Tiếng Việt, `DECODABLE_PHONICS_SENTENCES` (36 câu), `MINIMAL_PAIR_DRILLS` (12 nhóm), Khủng long, Xe cộ, Chính tả, Truyện đọc, Sticker & Danh hiệu | *(Chỉ chứa hằng dữ liệu)* |
| [`speech.js`](speech.js) | 643 dòng<br>(21.095 B) | Quản lý âm thanh Nam/Nữ, 1 player tái sử dụng + unlock iOS, ưu tiên ghi âm Ba/Mẹ cục bộ, chặn mặc định giọng máy Windows (`allowSystemTTS = false`), `AbortError` guard & SFX WebAudio | **Class `SoundManager` (42 methods):** `constructor`, `bindUnlockOnFirstGesture`, `inferLangFromKey`, `notifyAutoplayBlocked`, `getCacheKey`, `prefetchCommon`, `prefetchKeys`, `resolveAudioUrl`, `loadPrefs`, `savePrefs`, `initWebSpeech`, `setAllowSystemTTS`, `updateWebVoice`, `setGender`, `setSpeed`, `setMuted`, `stopAll`, `_playOnSharedPlayer`, `playChoiceTour`, `playAudioSequence`, `playAudioFile`, `speakAlphabet`, `speakPart`, `speakWordObj`, `speakWord`, `spellWord`, `speakTone`, `speakPraise`, `speakTryAgain`, `playPraiseThen`, `speakCheer`, `speakTTS`, `getAudioContext`, `playToneFreq`, `playClick`, `playPop`, `playCorrect`, `playWrong`, `playVictory`, `playHammerHit`, `playMagicalRevive`, `playShinkansenWhistle` |
| [`learning_plus.js`](learning_plus.js) | 1.136 dòng<br>(46.755 B) | Lộ trình hôm nay, Lịch 7 ngày không phạt, Leitner SRS (`recordAnswer`), Ôn tập hôm nay, Câu giải mã Karaoke & Tự đọc (`MediaRecorder` + IndexedDB), Luyện tai thanh điệu, Phản hồi độ phủ nét & Góc Phụ Huynh mở rộng | **23 functions + `customVoiceStore`:** `getLocalDateKey`, `addDaysToDateKey`, `normalizePlusStateFields`, `ensureTodayLog`, `getWordMetaById`, `recordAnswer`, `markDailyStep`, `getDueReviewItems`, `renderDailyRoadmapHost`, `openDueReviewDeck`, `renderDueReviewCard`, `playDecodableKaraoke`, `renderPhonicsDecodableSection`, `renderMinimalPairDrill`, `drawHintByLevel`, `evaluateCanvasGuideMatch`, `getVnWritingHintLevel`, `setVnWritingHintLevel`, `getJaWritingHintLevel`, `setJaWritingHintLevel`, `applyParentFocusMode`, `startStudyActivityTimer`, `renderParentPlusSection` |
| [`app.js`](app.js) | 2.877 dòng<br>(111.689 B) | Điều hướng 14 tab sidebar, tiến độ `schemaVersion: 3`, giới hạn sao Đua xe ngày (`40 ⭐/ngày`), Tiếng Việt, Khủng long, Xe, Tập viết ô ly (3 mức gợi ý) & 7 Mini-game | **75 functions:** `migrateProgressData`, `loadProgress`, `saveProgress`, `awardStars`, `markWordLearned`, `getCurrentRank`, `updateProfileHUD`, `openStickerModal`, `syncTopControlsUI`, `initEventListeners`, `stopAutoPlay`, `toggleAutoPlayList`, `switchMode`, `renderCurrentView`, `renderRoadmapHeader`, `renderLessonCards`, `renderAlphabetView`, `initOrthographyQuiz`, `loadOrthoQuizQuestion`, `renderVnStoriesView`, `renderDinoView`, `renderVehicleView`, `openModal`, `navigateModal`, `refreshCurrentGridStarsOnly`, `closeModal`, `initCanvas`, `resizeCanvasToFit`, `getCanvasCoords`, `startDraw`, `draw`, `stopDraw`, `clearCanvas`, `drawPrimaryGridLines`, `drawLetterGuide`, `switchSubGame`, `splitVietnameseWordToPuzzle`, `buildDynamicPuzzlesForLesson`, `startMiniGame`, `loadGameQuestion`, `handleLetterChoose`, `checkPuzzleResult`, `showGameVictory`, `initListenCatchGame`, `loadListenCatchQuestion`, `showListenCatchVictory`, `initShinkansenGame`, `loadShinkansenRound`, `updateTrainAssembly`, `showShinkansenVictory`, `initDinoMemoryGame`, `updateMemoryStats`, `handleMemoryCardClick`, `initDinoQuiz`, `loadDinoQuizQuestion`, `checkDinoQuizAnswer`, `showDinoQuizVictory`, `initDinoDig`, `loadDinoDigStage`, `hitExcavationRock`, `showDinoDigVictory`, `initVehicleQuiz`, `loadQuizQuestion`, `handleQuizChoice`, `showQuizVictory`, `showToast`, `fireConfetti`, `closeMobileSidebar`, `updateSidebarToggleUI`, `initSidebarPrefs`, `handleSidebarToggle`, `refreshParentGateChallenge`, `renderParentStatsSummary`, `resetParentCornerUI`, `initParentCornerOnce` |
| [`math.js`](math.js) | 1.799 dòng<br>(76.524 B) | Toán Lớp 1 VN & JP cả năm học (có ghi nhận `recordAnswer` & bước ngày) | **27 functions** |
| [`science_life.js`](science_life.js) | 421 dòng<br>(23.991 B) | Tự nhiên & Xã hội (VN) + Seikatsuka `生活科` (JP) | **7 functions** |
| [`ethics.js`](ethics.js) | 826 dòng<br>(41.497 B) | Đạo Đức & GDCD Lớp 1 (nhãn động `12` bài & `8` món rác) | **12 functions** |
| [`arts_pe.js`](arts_pe.js) | 444 dòng<br>(19.508 B) | Âm nhạc Pianica, Mỹ thuật & Thể dục `音楽・図工・体育` | **9 functions** |
| [`japanese.js`](japanese.js) | 1.351 dòng<br>(71.411 B) | Tiếng Nhật 小1 Quốc ngữ, 80 Kanji & Tập viết Masume (3 mức gợi ý + kiểm tra nét) | **16 functions** |
| [`english.js`](english.js) | 685 dòng<br>(33.990 B) | Tiếng Anh Lớp 1 (ABC, 8 chủ đề `64` từ & Đánh vần) | **10 functions** |
| [`dragons.js`](dragons.js) | 471 dòng<br>(21.589 B) | Vương Quốc Rồng (8 loài rồng, Lật thẻ & Đố vui) | **7 functions** |
| [`arcade.js`](arcade.js) | 802 dòng<br>(28.100 B) | Khu Đua Tốc Độ 4 Nút (đủ 4/4 hero, có trần sao ngày `40 ⭐/ngày`) | **17 functions** |

---

## 2. Những Điểm Mới Đã Tích Hợp Từ `DE_XUAT_CAI_THIEN_HE_THONG.md`

1. **Lộ Trình Hôm Nay (10–15 phút) & Lịch 7 Ngày Không Phạt:** Thanh hướng dẫn 3 bước rõ ràng (`1. Học Tiếng Việt`, `2. Ôn tập hôm nay`, `3. Thử thách cuối buổi`), hoàn thành cả 3 tặng `+15 ⭐`, kèm 7 chấm ngày trong tuần (`T2–CN`) không phạt khi nghỉ.
2. **Hộp nhớ Leitner SRS (`schemaVersion: 3`) & Ôn Tập Hôm Nay:** `recordAnswer(id, isCorrect, meta)` theo dõi mức nhớ `0–4` với lịch ôn `1, 2, 4, 8, 16` ngày, giảm gợi ý dần (`level >= 2` ẩn nghĩa/hình chờ bé lật), thưởng `+3 ⭐` khi đạt mốc nhớ vững `>= 3`, và áp trần sao Đua xe `40 ⭐/ngày`.
3. **Cầu nối "Con Tự Đọc" (36 Câu Giải Mã + Karaoke + Ghi âm cục bộ):** Dưới mỗi bài trong `12` bài Đánh vần có `3` câu ngắn dùng 100% từ có sẵn MP3 thật; bé nghe Karaoke sáng từng chữ, chạm từng chữ nghe & tách vần, hoặc bật chế độ **"🎤 Con tự đọc"** (`MediaRecorder` lưu cục bộ IndexedDB, không gửi đi đâu).
4. **Luyện Tai 6 Thanh Điệu & Âm Khó Việt–Nhật:** Thẻ luyện nghe phân biệt `12` cặp tối thiểu thanh điệu & phụ âm đầu (`eo/èo/éo/ẹo`, `hoa/hóa/hỏa`, `s/x`, `tr/ch`, `l/n`, 6 thanh điệu) ngay trong tab Chữ cái & Chính tả.
5. **Tập viết 3 cấp độ gợi ý & Phản hồi độ phủ nét:** Cả bảng 4 ô ly Tiếng Việt và Masume Tiếng Nhật có 3 mức **`Nét mờ` → `Chấm đầu` → `Ô trống`** và nút `✨ Kiểm tra nét` tính độ khớp vùng mẫu (khích lệ không dùng AI chấm khắt khe).
6. **Góc Phụ Huynh Mở Rộng & Phòng Thu Giọng Ba/Mẹ Cục Bộ:** Báo cáo 7 ngày (`ngày học`, `phút`, `từ mức ≥3`, `Top 5 từ hay nhầm`), hẹn giờ nhắc nghỉ mắt (`15/20/30 phút`), bật **Chế độ Tập trung** (ẩn tab Đua xe & Khu trò chơi), công tắc **Chặn giọng máy Windows**, và **Phòng Thu Giọng Ba/Mẹ** (ưu tiên phát bản ghi gia đình trước MP3).

---

## 3. Chẩn Đoán & Xử Lý Giọng Đọc "Giả Giọng Windows"

1. **Nguyên nhân đã phát hiện & sửa xong 100%:**
   - Khi quét header nhị phân kho MP3 cũ, có **`353` key (`207` file Nữ + `216` file Nam = `423` file MP3)** mang header `fff384c4` (Google Translate TTS fallback `64 kbps`), nghe đều, máy và đơn giọng nữ ngay cả khi chọn Ba (Nam) — bao gồm Quy tắc Chính tả (`ort_*`), Quiz Chính tả (`oq_*`), Truyện đọc HK2 (`story_vn_*`), Nghệ thuật (`art_*`), Tự nhiên (`sc_*`), Đạo đức (`ethics_*`), Toán (`math_*`), Nghĩa Việt (`vi_*`) và một số từ/vần.
   - Ngoài ra, `speech.js` trước đây có thể rơi sang `window.speechSynthesis` (giọng Windows *Microsoft An/Hoa*) nếu gặp `AbortError` khi chuyển nhanh.
2. **Kết quả sau khi sửa & tái tạo:**
   - Trong [`speech.js`](speech.js): chặn `AbortError` không rơi sang `speakTTS`; mặc định `allowSystemTTS = false` (tắt giọng máy Windows, chỉ bật lại nếu phụ huynh chủ động chọn); ưu tiên giọng `Online (Natural)` khi fallback bật; hỗ trợ ưu tiên bản thu giọng Ba/Mẹ cục bộ.
   - Đã chạy xong [`tools/regen_natural_voices.py`](tools/regen_natural_voices.py) (đã vá `aiohttp.ThreadedResolver()` + ghi `.tmp` nguyên tử) cho đủ **`389/389` key** (`353` key `fff384c4` cũ + `36` câu giải mã `decod_*`) bằng 100% Microsoft Edge Neural Voices. Toàn bộ kho **`4.326` MP3 (`2.163` Nữ + `2.163` Nam = `67,77 MB`)** đạt **`identical_FM = 0`**, **`gtts_fff384c4 = 0`**, **`small = 0`**.

---

## 4. Kết Quả Test & Log Thực Tế (Sau Chỉnh Sửa Cuối)

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
- **Phiên 1 (7 mục tính năng mới + Mobile resize, Desktop `1440×900` → Mobile `390×844`):**
  - Tổng HTTP requests: `42` | HTTP `>= 400`: `0` | Console errors / `pageerror`: `0`.
  - Xác nhận: `#dailyHubHost` (`LỘ TRÌNH HÔM NAY`, `7` chấm ngày, `3` bước, thu/mở, Ôn tập Leitner `#dueReviewInlineStage`), Đánh dấu Từ mới + Phản hồi nét 4 ô ly (`Nét mờ`/`Chấm đầu`/`Ô trống` + `#btnCanvasCheck`), Luyện tai thanh điệu `#minimalPairHost` (và ghi nhận từ hay nhầm vào Báo cáo tuần), Masume Tiếng Nhật 3 mức gợi ý + `#btnJaCheck`, Góc Phụ Huynh (`Báo cáo tuần`, `Nhắc nghỉ mắt`, `Chặn giọng Windows` mặc định `true`, `Chế độ Tập trung` ẩn tab Đua xe/Trò chơi), Mobile `390×844` xếp dọc gọn `375.2 px <= 390 px` không tràn ngang.
- **Phiên 2 (Kiểm tra lại Step 3 sau khi sửa khớp `lessonId` trong `learning_plus.js`):**
  - Chuyển sang `Đánh vần & Đọc hiểu`: `#phonicsDecodableHost` hiển thị đủ `3` thẻ `.decodable-card` mỗi bài (`Bài 1`, `Bài 2`, `Bài 8`), chạm từ & `Nghe Karaoke từng tiếng` tải chuẩn MP3 (`word_tập.mp3`, `word_bé.mp3`, `word_đọc.mp3`, `word_sach.mp3` HTTP `200`/`206`), bật `🎤 Chế độ Con Tự Đọc` hiển thị đủ nút thu âm/đối chiếu/đánh dấu và cập nhật Lộ Trình Hôm Nay lên `2/3 bước`.
  - Tổng network buffer: `50` requests | HTTP `>= 400`: `0` | Console / page error: `0`.

### C. Lịch sử Git (`origin/main`)
```text
2d07f96 docs: update paths after moving repo to MonhoctiengViet
4c7d08e docs: add complete Markdown system summary TONG_HOP_HE_THONG.md
e776562 feat: add 4-way Racing Arcade tab (Lamborghini/Ferrari, Dino, Dragon)
ccbe820 feat: full-year Grade 1 VN & JP curriculum, 80 MEXT Kanji, Science/Arts subjects, and dual-voice audio
```
*(Bản cập nhật Group 1 + `DE_XUAT` + sửa giọng đọc đang nằm trên working tree cục bộ, chưa commit/push).*
