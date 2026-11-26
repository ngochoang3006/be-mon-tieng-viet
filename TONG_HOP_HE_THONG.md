# 🦖 Tổng Hợp Hệ Thống Học Tập & Vui Chơi Lớp 1 Việt – Nhật Cho Bảo Long

> **Phiên bản:** Full-Year Grade 1 VN (GDPT 2018) & JP (MEXT 小学1年生) + Khu Đua Xe 4 Nút  
> **Cập nhật:** 26/11/2026 • **Git Branch:** `main` (Commits: `ccbe820`, `e776562`)

---

## 1. Kiến Trúc & Các `class` / `function` Chính

Ứng dụng chạy hoàn toàn client-side (HTML5 + CSS3 + Vanilla JS + Local MP3 Audio + WebAudio + Web Speech fallback). Các file mã nguồn nằm tại thư mục gốc dự án:

| File | Nhiệm vụ chính | Các `class` / `function` |
| :--- | :--- | :--- |
| [`data.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/data.js) | Kho dữ liệu Tiếng Việt, Khủng long, Xe cộ, Chính tả, Truyện đọc, Sticker & Danh hiệu | *(Chỉ chứa hằng dữ liệu: `ALPHABET_DATA`, `DIGRAPH_DATA`, `TONES_DATA`, `VOCAB_LESSONS`, `PHONICS_LESSONS`, `DINO_LESSONS`, `VEHICLE_LESSONS`, `ORTHOGRAPHY_RULES_DATA`, `ORTHOGRAPHY_QUIZ_DATA`, `VIET_STORIES_DATA`, `SHINKANSEN_WORDS_DATA`, `LISTEN_CATCH_POOLS`, `SPELL_BUILDER_DATA`, `STICKERS_DATA`, `EXPLORER_RANKS`)* |
| [`speech.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/speech.js) | Quản lý âm thanh Nam/Nữ, tốc độ, tour đọc đáp án & SFX WebAudio | **Class `SoundManager` (37 methods):** `constructor`, `getCacheKey`, `prefetchCommon`, `prefetchKeys`, `resolveAudioUrl`, `loadPrefs`, `savePrefs`, `initWebSpeech`, `updateWebVoice`, `setGender`, `setSpeed`, `setMuted`, `stopAll`, `playChoiceTour`, `playAudioSequence`, `playAudioFile`, `speakAlphabet`, `speakPart`, `speakWordObj`, `speakWord`, `spellWord`, `speakTone`, `speakPraise`, `speakTryAgain`, `playPraiseThen`, `speakCheer`, `speakTTS`, `getAudioContext`, `playToneFreq`, `playClick`, `playPop`, `playCorrect`, `playWrong`, `playVictory`, `playHammerHit`, `playMagicalRevive`, `playShinkansenWhistle` |
| [`app.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/app.js) | Điều hướng 14 tab sidebar, tiến độ sao/sticker, Tiếng Việt, Khủng long, Xe, Tập viết ô ly & 7 Mini-game | **69 functions:**<br>- *Hệ thống & UI:* `loadProgress`, `saveProgress`, `awardStars`, `markWordLearned`, `getCurrentRank`, `updateProfileHUD`, `openStickerModal`, `syncTopControlsUI`, `initEventListeners`, `stopAutoPlay`, `toggleAutoPlayList`, `switchMode`, `renderCurrentView`, `closeMobileSidebar`, `updateSidebarToggleUI`, `initSidebarPrefs`, `handleSidebarToggle`, `showToast`, `fireConfetti`<br>- *Bài học VN/Khủng long/Xe:* `renderRoadmapHeader`, `renderLessonCards`, `renderAlphabetView`, `initOrthographyQuiz`, `loadOrthoQuizQuestion`, `renderVnStoriesView`, `renderDinoView`, `renderVehicleView`, `openModal`, `navigateModal`, `refreshCurrentGridStarsOnly`, `closeModal`<br>- *Bảng tập viết 4 ô ly:* `initCanvas`, `resizeCanvasToFit`, `getCanvasCoords`, `startDraw`, `draw`, `stopDraw`, `clearCanvas`, `drawPrimaryGridLines`, `drawLetterGuide`<br>- *7 Mini-game Khu Trò Chơi:* `switchSubGame`, `splitVietnameseWordToPuzzle`, `buildDynamicPuzzlesForLesson`, `startMiniGame`, `loadGameQuestion`, `handleLetterChoose`, `checkPuzzleResult`, `showGameVictory`, `initListenCatchGame`, `loadListenCatchQuestion`, `showListenCatchVictory`, `initShinkansenGame`, `loadShinkansenRound`, `updateTrainAssembly`, `showShinkansenVictory`, `initDinoMemoryGame`, `updateMemoryStats`, `handleMemoryCardClick`, `initDinoQuiz`, `loadDinoQuizQuestion`, `checkDinoQuizAnswer`, `showDinoQuizVictory`, `initDinoDig`, `loadDinoDigStage`, `hitExcavationRock`, `showDinoDigVictory`, `initVehicleQuiz`, `loadQuizQuestion`, `handleQuizChoice`, `showQuizVictory` |
| [`math.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/math.js) | Toán Lớp 1 VN & JP cả năm học | **27 functions:** `mathNumberToViText`, `addMathSessionScore`, `renderMathHub`, `switchMathSubTab`, `stopMathAutoPlay`, `renderMathNumbersTab`, `updateMathNumberSpotlight`, `initMathCalcGame`, `speakCalcEquation`, `renderCalcVisualBox`, `loadMathCalcQuestion`, `showMathCalcVictory`, `initMathCompareGame`, `loadMathCompareQuestion`, `initMathSequenceGame`, `loadMathSequenceQuestion`, `renderMathGeometryTab`, `updateClockInfoText`, `renderClockFace`, `initGeoClockQuiz`, `loadGeoClockQuestion`, `renderMathHundredBoard`, `renderMathBondsWidget`, `renderMathSolids`, `buildMathRulerSvgMarkup`, `renderMathRuler`, `renderMathDays` |
| [`science_life.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/science_life.js) | Tự nhiên & Xã hội (VN) + Seikatsuka `生活科` (JP) | **7 functions:** `addScienceScore`, `renderScienceLifeHub`, `switchScienceSubTab`, `renderScienceTopicsTab`, `renderScienceLabTab`, `initScienceQuizGame`, `loadScienceQuizQuestion` |
| [`ethics.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/ethics.js) | Đạo Đức & GDCD Lớp 1 | **12 functions:** `addEthicsScore`, `renderEthicsHub`, `stopEthicsAutoPlay`, `switchEthicsSubTab`, `renderEthicsLessonsTab`, `initEthicsSituationsGame`, `loadEthicsSituationQuestion`, `initEthicsTfGame`, `loadEthicsTfQuestion`, `renderTrafficEcoTab`, `initEcoSortingGame`, `loadNextEcoItem` |
| [`arts_pe.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/arts_pe.js) | Âm nhạc Pianica, Mỹ thuật & Thể dục `音楽・図工・体育` | **9 functions:** `addArtsScore`, `renderArtsPeHub`, `switchArtsSubTab`, `renderArtsMusicTab`, `renderArtsPaintTab`, `initArtCanvasOnce`, `renderArtsPeTab`, `initArtsQuizGame`, `loadArtsQuizQuestion` |
| [`japanese.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/japanese.js) | Tiếng Nhật 小1 Quốc ngữ, 80 Kanji & Tập viết Masume | **16 functions:** `addJaScore`, `stopJaAutoPlay`, `renderJapaneseHub`, `switchJapaneseSubTab`, `renderJaHiraganaTab`, `openJaWriteChar`, `renderJaKatakanaTab`, `renderJaKanjiTab`, `renderJaStoriesTab`, `renderJaVocabTab`, `renderJaWritingTab`, `initJaCanvasEvents`, `drawJaMasumeGuide`, `buildJaQuizPool`, `initJaQuizGame`, `loadJaQuizQuestion` |
| [`english.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/english.js) | Tiếng Anh Lớp 1 (ABC, 8 chủ đề & Đánh vần) | **10 functions:** `addEnScore`, `stopEnAutoPlay`, `renderEnglishHub`, `switchEnglishSubTab`, `renderEnAbcTab`, `renderEnVocabTab`, `initEnQuizGame`, `loadEnQuizQuestion`, `initEnSpellingGame`, `loadEnSpellRound` |
| [`dragons.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/dragons.js) | Vương Quốc Rồng (8 loài rồng, Lật thẻ & Đố vui) | **7 functions:** `stopDragonAutoPlay`, `renderDragonHub`, `switchDragonSubMode`, `renderDragonCardsView`, `initDragonQuiz`, `loadDragonQuizQuestion`, `initDragonMemoryGame` |
| [`arcade.js`](file:///C:/Users/Admin/Documents/AIcode/MonhoctiengViet/arcade.js) | Khu Đua Tốc Độ 4 Nút (Xe đua, Khủng long & Rồng bay) | **17 functions:** `stopArcadeGameLoop`, `renderArcadeHub`, `switchArcadeMode`, `renderArcadeHeroPicker`, `resetArcadeRace`, `buildInitialTrackItems`, `bindArcadeEventsOnce`, `arcadeTick`, `updateArcadeHud`, `finishArcadeRace`, `drawArcadeFrame`, `drawSupercarSprite`, `drawCarRaceScene`, `drawDinoSprite`, `drawDinoRaceScene`, `drawDragonSprite`, `drawDragonRaceScene` |

---

## 2. Toàn Bộ Nội Dung Học & Vui Chơi (14 Tab Sidebar)

Thanh điều hướng trái được tổ chức thành **3 nhóm cân đối** (hỗ trợ thu gọn thành Icon Rail trên Desktop/Tablet và ngăn kéo trượt trên Mobile):

### Nhóm 1: 🇻🇳 Lớp 1 Việt Nam (7 mục)
1. **🔠 Chữ cái & Chính tả:**
   - `29` chữ cái (`A–Y`), `11` phụ âm ghép (`ch, gh, gi, kh, ng, ngh, nh, ph, qu, th, tr`), `6` thanh điệu.
   - `6` Quy Tắc Chính Tả Vàng (*c/k, g/gh, ng/ngh, s/x, ch/tr, l/n*) + Đố vui Chính Tả `12` câu có đọc từng đáp án.
2. **📖 Học từ mới (12 Bài):** `12` bài (`102` từ) từ dễ đến khó cho cả HK1 & HK2; chạm thẻ mở modal tách vần từng mảnh + bảng tập viết 4 ô ly.
3. **🔤 Đánh vần & Đọc hiểu:** `12` bài tập đánh vần (`98` từ) theo các nhóm vần (`-p`, `-t`, `-c`, `-n/-m`, `-ng/-nh`, `iê/yê`, `uô/ươ`, `oa/oă/oe`, `uê/uy/uyê`, `s/x`, quy tắc chính tả) + `6` Bài Đọc Hiểu HK2 kèm câu hỏi.
4. **🧮 Toán Lớp 1:**
   - Đếm số `0–20`, số tròn chục `30–100`, **Bảng số `0–100`** (có đếm nhảy `+1, +2, +5, +10`) và **Cấu tạo số Tách & Gộp (`いくつといくつ` từ `5–10`)**.
   - Phép Cộng/Trừ: Phạm vi `10`, Phạm vi `20`, **Mẹo Sakura qua 10 (`さくらんぼ計算`)**, **Phạm vi `100` không nhớ HK2** (thanh chục/đơn vị).
   - So sánh `> < =` (`0–20`, `0–100`, biểu thức), Dãy số tàu Shinkansen (có dãy đến `100`).
   - Hình học & Đo lường: `4` hình phẳng 2D (`tròn, vuông, tam giác, chữ nhật`), `4` khối 3D (`lập phương, hộp chữ nhật, cầu, trụ`), thước đo độ dài `cm` (`1–12 cm`), đồng hồ giờ đúng (`:00`) & giờ rưỡi (`:30` / `何時半`), `7` Thứ trong tuần (VN–JP) & Đố vui tổng hợp `10` câu.
5. **🌿 Tự nhiên & Đời sống (`生活科`):**
   - `6` chủ đề (`24` thẻ): Gia đình, Trường học (`学校探検`), Cộng đồng & Nghề nghiệp, Thực vật & Động vật, Cơ thể & 5 Giác quan + Tự bảo vệ, Trái Đất & 4 Mùa.
   - Mô phỏng **5 bước trồng hoa Bìm Bìm Nhật (`あさがお`)**, khám phá **5 Giác quan** & Đố vui Khoa học `12` câu.
6. **🌱 Đạo Đức Lớp 1:** `12` bài học thói quen đẹp, `12` tình huống ứng xử, `16` câu Nên / Không nên, Đèn giao thông & `10` thẻ thực hành phân loại rác 3 thùng.
7. **🎨 Nhạc, Họa & Thể dục (`音楽・図工・体育`):**
   - **Đàn Pianica 8 phím** (`Đô..Đố` / `ド〜ド↑`) tổng hợp âm WebAudio + `4` giai điệu mẫu chạy nốt sáng theo đàn.
   - Phòng thí nghiệm **4 phép pha màu** + Bảng vẽ tự do có **5 màu mực** & **5 dấu dán Sticker** (`🦖🐉🌸🚅⭐`).
   - `6` thẻ Thể dục & An toàn vận động (`体育`) + Đố vui Nghệ thuật `8` câu.

### Nhóm 2: 🇯🇵 Song Ngữ Nhật – Anh (2 mục)
8. **🇯🇵 Tiếng Nhật 小1 (`小学1年生 国語`):**
   - `46` chữ Hiragana + `25` âm đục/âm tròn (`が..ぱ`).
   - `46` chữ cứng Katakana (`ア..ン`).
   - **Đúng `80` chữ Kanji Lớp 1 chuẩn MEXT Nhật Bản** (`一..六` chia 4 bài × 20 chữ), có nút `✍️ Viết` nhảy thẳng sang bảng Masume.
   - `8` chủ đề từ vựng (`66` từ), `4` truyện Quốc ngữ kinh điển lớp 1 (*おおきなかぶ*, *くじらぐも*, *たぬきの糸車*, *ずうっとずっと大すきだよ*) kèm giọng kể Nhật & câu hỏi.
   - Tập viết ô vuông Masume (Hiragana / Katakana / 80 Kanji) & Đố vui tiếng Nhật có lọc theo phần.
9. **🇬🇧 Tiếng Anh:** Bảng `26` chữ cái `A–Z`, `8` chủ đề (`64` từ vựng), Nghe chọn hình và `16` từ ghép chữ.

### Nhóm 3: 🌍 Khám Phá & Chơi (5 mục)
10. **🦖 Khủng Long:** `10` loài ảnh thực tế + tên Việt/Nhật + đánh vần.
11. **🐉 Thế Giới Rồng:** `8` loài rồng + Lật thẻ rồng + Đố vui.
12. **🚗 Xe Cộ:** `12` phương tiện ảnh thực tế.
13. **🎮 Khu Trò Chơi:** `7` game học tập (*Ghép Chữ Vui*, *Nghe Âm Bắt Chữ*, *Lắp Tàu Shinkansen `24` từ*, *Lật Thẻ Khủng Long*, *Đố Vui Khủng Long*, *Khai Quật Hóa Thạch*, *Đố Vui Xe Cộ*).
14. **🏎️ Đua Xe & Rồng (Tab Mới):**
    - `3` chế độ đua cùng 3 đối thủ AI: **Đua Siêu Xe** (*Lamborghini Vàng, Ferrari Đỏ F1, Porsche Xanh 911, McLaren Cam*), **Khủng Long Chạy Đua** (*T-Rex, Ba Sừng, Raptor, Stego*), và **Rồng Bay Vượt Mây** (*Rồng Lửa, Rồng Vàng, Rồng Băng, Rồng Xanh*).
    - Điều hướng đơn giản bằng **4 nút lớn trên màn hình (`⬆️ Lên`, `⬇️ Xuống`, `⬅️ Trái`, `➡️ Phải`)** hoặc phím mũi tên / `WASD`.

---

## 3. Hệ Thống Giọng Đọc & Âm Thanh

### Giọng TTS tạo kho MP3 song ngữ (`audio/female/` & `audio/male/`)
| Ngôn ngữ | Giọng Nữ (`audio/female/`) | Giọng Nam (`audio/male/`) | Tốc độ gốc | Ghi chú kỹ thuật |
| :--- | :--- | :--- | :---: | :--- |
| **Tiếng Việt (`vi`)** | `vi-VN-HoaiMyNeural` (Cô) | `vi-VN-NamMinhNeural` (Ba) | `-6%` | Dùng Edge-TTS là chính; có fallback Google Translate TTS HTTP trên một phần file tiếng Việt khi Edge-TTS nghẽn kết nối. Riêng 14 file Arcade cuối tạo 100% bằng Edge-TTS (`gtts_fb=0`). |
| **Tiếng Anh (`en`)** | `en-US-JennyNeural` | `en-US-GuyNeural` | `-6%` | 100% file F/M phân biệt độc lập (`sha256` khác nhau). |
| **Tiếng Nhật (`ja`)** | `ja-JP-NanamiNeural` | `ja-JP-KeitaNeural` | `-6%` | Đã tái tạo và sửa toàn bộ 81 file `ja_*` nam bị trùng bản nữ trước đây sang giọng nam `KeitaNeural`. |

### Phân bổ kho audio hiện tại (`2.177` MP3 Nữ + `2.177` MP3 Nam)
- `syl_` (vần ghép): `302` | `vi_` (nghĩa Việt câu hỏi EN/JA): `302` | `ja_` (Nhật): `288` | `math_`: `268` | `spell_`: `254` | `word_`: `209` | `en_`: `118` | `sc_` (Tự nhiên): `92` | `ethics_`: `86` | `art_`: `49` | `alpha_`: `41` | `cheer_`: `34` | `story_`: `30` | `oq_` (quiz chính tả): `24` | `veh_`: `12` | `vquiz_`: `12` | `dino_`: `10` | `dquiz`: `10` | `dragon_`: `8` | `drquiz_`: `8` | `arcade_`: `7` | `ort_`: `6` | `tone_`: `6` | `quiz_`: `1`.

### Tính năng hỗ trợ bé 6 tuổi chưa đọc thạo trên giao diện
- Chuyển đổi trực tiếp **Nữ (Cô)** / **Nam (Ba)**, tốc độ **`1.0` (Chuẩn)** / **`0.8` (Chậm)**, và **Bật/Tắt âm thanh** ngay trên thanh top bar.
- Tự động đọc lần lượt câu hỏi và highlight từng thẻ đáp án qua `playChoiceTour` + nút loa góc `🔊` (`.quiz-opt-speak-btn`) trên mọi quiz.
- Tổng hợp WebAudio thời gian thực cho **đàn Pianica 8 nốt**, tiếng đập búa khai quật, còi tàu Shinkansen, đúng/sai và chiến thắng.

---

## 4. Kết Quả Test & Log Thực Tế

### A. Kiểm tra tĩnh tự động (`verify_complete.py` — chạy sau bản sửa cuối)
```text
Kanji Count: 80 (MEXT 80 exact match: True)
Local Images Verified: 30
Audio Female: 2177 | Male: 2177 | Checked Keys: 1999
DOM IDs Matched: 415/415

ALL STATIC VERIFICATIONS PASSED 100%!
```

### B. Kiểm thử trình duyệt Live (`http://localhost:8080/`)
- **Toàn bộ 13 môn học (Desktop `1440×900`, Tablet `900×768`, Mobile `390×844`):**
  - Console errors: `0` | HTTP `>= 400`: `0` (trên `50` requests).
  - Kiểm tra hiển thị & tương tác: Sidebar 3 nhóm, thu gọn Desktop (`232px ↔ 74px`), Tablet icon-rail & drawer (`74px ↔ 262px`), Mobile off-canvas drawer (`270px`), Orthography quiz, 12 bài từ mới, 12 bài đánh vần + 6 bài đọc HK2, Toán (Bảng 100 số, Cấu tạo số 8, Sakura, Phạm vi 100, Hình 3D, Thước cm, Đồng hồ `:30`, Lịch thứ), Tự nhiên & Đời sống (trồng Asagao 5 bước, 5 giác quan, quiz), Nhạc/Họa/Thể dục (Pianica 8 phím, pha màu, canvas), Tiếng Nhật (Hiragana+Dakuon, Katakana, 80 Kanji + nhảy sang Masume, 4 truyện 小1, quiz), Tiếng Anh (8 chủ đề), Đạo Đức (12 bài).
  - Bố cục không tràn ngang trên cả 3 kích thước (`Desktop: 1425.14px <= 1440px`, `Tablet: 885.14px <= 900px`, `Mobile: 375.43px <= 390px`).
  - Ảnh minh chứng Mobile/Tablet từ host: [final_step_39.png](file:///C:/Users/Admin/.gemini/antigravity/brain/7566b60c-3ef4-434e-8772-2fe7d549ba66/browser_evidence/538981e1-02ea-4c40-b33e-44dd05828772/final_step_39.png).
- **Tab Đua Xe & Rồng (`Desktop 1440×900` & `Mobile 390×844`):**
  - Console errors: `0` | HTTP `>= 400`: `0` (45 requests lần đầu; 50 requests lần kiểm tra lại sau khi tinh chỉnh overlay Mobile).
  - *Siêu Xe (`car`):* Chọn Ferrari Đỏ F1, tiến độ `0% → 78% → 82% → 85%` (`Hạng 1/4`, `Nhặt: 2`).
  - *Khủng Long (`dino`):* Tiến độ `0% → 60% → 63%` (`Hạng 1/4`, `Nhặt: 2`).
  - *Rồng Bay (`dragon`):* Tiến độ `0% → 76% → 77% → 80%` (`Hạng 1/4`, `Nhặt: 3 → 4`).
  - *Mobile (`390×844`) hoàn tất 100% đường đua:* Hộp kết quả `#arcadeResultBanner` (`y: 208.05..400.05`) hiển thị trọn vẹn tiêu đề (`y: 263.41..286.27`), mô tả (`y: 298.75..329.95`) và nút `#btnArcadeReplay` (`y: 344.43..383.57`) không cắt chữ; bấm chơi lại khởi chạy ván mới `9% → 10%` — ảnh chụp thực tế [final_step_22.png](file:///C:/Users/Admin/.gemini/antigravity/brain/7566b60c-3ef4-434e-8772-2fe7d549ba66/browser_evidence/cabd2e81-2e0b-49d1-b87d-22dc5a3e78f6/final_step_22.png).

### C. Lịch sử Git (`origin/main`)
```text
[main ccbe820] feat: full-year Grade 1 VN & JP curriculum, 80 MEXT Kanji, Science/Arts subjects, and dual-voice audio
 2347 files changed, 3858 insertions(+), 202 deletions(-)
To https://github.com/ngochoang3006/be-mon-tieng-viet.git
   978f545..ccbe820  main -> main

[main e776562] feat: add 4-way Racing Arcade tab (Lamborghini/Ferrari, Dino, Dragon)
 18 files changed, 1079 insertions(+), 5 deletions(-)
To https://github.com/ngochoang3006/be-mon-tieng-viet.git
   ccbe820..e776562  main -> main
```
