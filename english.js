// ========================================================
// BỘ MÔN TIẾNG ANH CHO BÉ BẢO LONG (6 TUỔI)
// Gồm 4 phần:
// 1. 26 Chữ cái ABC & Phonics (A - Z)
// 2. 4 Chủ đề Từ vựng & Giao tiếp hàng ngày (32 từ/câu)
// 3. Game Nghe Tiếng Anh Chọn Hình (10 câu)
// 4. Game Ghép Chữ Tiếng Anh Vui (10 từ)
// Đồng bộ giọng đọc Anh-Mỹ Nữ (Jenny) / Nam (Guy) & Kho Sao Bảo Long!
// ========================================================

const EN_ALPHABET_DATA = [
  { upper: 'A', lower: 'a', word: 'Apple', emoji: '🍎', vi: 'Quả táo', ja: 'りんご', audioKey: 'en_alpha_a' },
  { upper: 'B', lower: 'b', word: 'Ball', emoji: '⚽', vi: 'Quả bóng', ja: 'ボール', audioKey: 'en_alpha_b' },
  { upper: 'C', lower: 'c', word: 'Cat', emoji: '🐱', vi: 'Con mèo', ja: 'ねこ', audioKey: 'en_alpha_c' },
  { upper: 'D', lower: 'd', word: 'Dinosaur', emoji: '🦖', vi: 'Khủng long', ja: 'きょうりゅう', audioKey: 'en_alpha_d' },
  { upper: 'E', lower: 'e', word: 'Elephant', emoji: '🐘', vi: 'Con voi', ja: 'ぞう', audioKey: 'en_alpha_e' },
  { upper: 'F', lower: 'f', word: 'Fish', emoji: '🐟', vi: 'Con cá', ja: 'さかな', audioKey: 'en_alpha_f' },
  { upper: 'G', lower: 'g', word: 'Grapes', emoji: '🍇', vi: 'Quả nho', ja: 'ぶどう', audioKey: 'en_alpha_g' },
  { upper: 'H', lower: 'h', word: 'Hat', emoji: '🧢', vi: 'Chiếc mũ', ja: 'ぼうし', audioKey: 'en_alpha_h' },
  { upper: 'I', lower: 'i', word: 'Ice cream', emoji: '🍦', vi: 'Que kem', ja: 'アイスクリーム', audioKey: 'en_alpha_i' },
  { upper: 'J', lower: 'j', word: 'Juice', emoji: '🧃', vi: 'Nước ép', ja: 'ジュース', audioKey: 'en_alpha_j' },
  { upper: 'K', lower: 'k', word: 'Kite', emoji: '🪁', vi: 'Cái diều', ja: 'たこ', audioKey: 'en_alpha_k' },
  { upper: 'L', lower: 'l', word: 'Lion', emoji: '🦁', vi: 'Sư tử', ja: 'ライオン', audioKey: 'en_alpha_l' },
  { upper: 'M', lower: 'm', word: 'Monkey', emoji: '🐒', vi: 'Con khỉ', ja: 'さる', audioKey: 'en_alpha_m' },
  { upper: 'N', lower: 'n', word: 'Nose', emoji: '👃', vi: 'Cái mũi', ja: 'はな', audioKey: 'en_alpha_n' },
  { upper: 'O', lower: 'o', word: 'Orange', emoji: '🍊', vi: 'Quả cam', ja: 'オレンジ', audioKey: 'en_alpha_o' },
  { upper: 'P', lower: 'p', word: 'Pencil', emoji: '✏️', vi: 'Bút chì', ja: 'えんぴつ', audioKey: 'en_alpha_p' },
  { upper: 'Q', lower: 'q', word: 'Queen', emoji: '👑', vi: 'Nữ hoàng / Vương miện', ja: 'じょおう', audioKey: 'en_alpha_q' },
  { upper: 'R', lower: 'r', word: 'Rabbit', emoji: '🐇', vi: 'Con thỏ', ja: 'うさぎ', audioKey: 'en_alpha_r' },
  { upper: 'S', lower: 's', word: 'Sun', emoji: '☀️', vi: 'Mặt trời', ja: 'たいよう', audioKey: 'en_alpha_s' },
  { upper: 'T', lower: 't', word: 'Train', emoji: '🚅', vi: 'Tàu hỏa / Shinkansen', ja: 'でんしゃ', audioKey: 'en_alpha_t' },
  { upper: 'U', lower: 'u', word: 'Umbrella', emoji: '☂️', vi: 'Cái ô dù', ja: 'かさ', audioKey: 'en_alpha_u' },
  { upper: 'V', lower: 'v', word: 'Volcano', emoji: '🌋', vi: 'Núi lửa', ja: 'かざん', audioKey: 'en_alpha_v' },
  { upper: 'W', lower: 'w', word: 'Watermelon', emoji: '🍉', vi: 'Dưa hấu', ja: 'スイカ', audioKey: 'en_alpha_w' },
  { upper: 'X', lower: 'x', word: 'Xylophone', emoji: '🎹', vi: 'Đàn phím gỗ', ja: 'もっきん', audioKey: 'en_alpha_x' },
  { upper: 'Y', lower: 'y', word: 'Yo-yo', emoji: '🪀', vi: 'Con quay Yoyo', ja: 'ヨーヨー', audioKey: 'en_alpha_y' },
  { upper: 'Z', lower: 'z', word: 'Zebra', emoji: '🦓', vi: 'Ngựa vằn', ja: 'しまうま', audioKey: 'en_alpha_z' }
];

const EN_VOCAB_TOPICS = [
  {
    id: 'animals',
    title: '🦖 Dinosaurs & Animals',
    label: 'Khủng Long & Động Vật',
    words: [
      { id: 'en_v1', en: 'Dinosaur', vi: 'Khủng long', ja: 'きょうりゅう', emoji: '🦖', audioKey: 'en_w_dinosaur' },
      { id: 'en_v2', en: 'T-Rex', vi: 'Khủng long Bạo chúa', ja: 'ティラノサウルス', emoji: '🦴', audioKey: 'en_w_trex' },
      { id: 'en_v3', en: 'Dog', vi: 'Con chó', ja: 'いぬ', emoji: '🐶', audioKey: 'en_w_dog' },
      { id: 'en_v4', en: 'Cat', vi: 'Con mèo', ja: 'ねこ', emoji: '🐱', audioKey: 'en_w_cat' },
      { id: 'en_v5', en: 'Bird', vi: 'Con chim', ja: 'とり', emoji: '🐦', audioKey: 'en_w_bird' },
      { id: 'en_v6', en: 'Fish', vi: 'Con cá', ja: 'さかな', emoji: '🐟', audioKey: 'en_w_fish' },
      { id: 'en_v7', en: 'Elephant', vi: 'Con voi', ja: 'ぞう', emoji: '🐘', audioKey: 'en_w_elephant' },
      { id: 'en_v8', en: 'Lion', vi: 'Sư tử', ja: 'ライオン', emoji: '🦁', audioKey: 'en_w_lion' }
    ]
  },
  {
    id: 'vehicles',
    title: '🚗 Vehicles World',
    label: 'Thế Giới Xe Cộ',
    words: [
      { id: 'en_v9', en: 'Car', vi: 'Xe ô tô con', ja: 'くるま', emoji: '🚗', audioKey: 'en_w_car' },
      { id: 'en_v10', en: 'Train', vi: 'Tàu hỏa / Shinkansen', ja: 'しんかんせん', emoji: '🚅', audioKey: 'en_w_train' },
      { id: 'en_v11', en: 'Airplane', vi: 'Máy bay', ja: 'ひこうき', emoji: '✈️', audioKey: 'en_w_airplane' },
      { id: 'en_v12', en: 'Fire truck', vi: 'Xe cứu hỏa', ja: 'しょうぼうしゃ', emoji: '🚒', audioKey: 'en_w_firetruck' },
      { id: 'en_v13', en: 'Police car', vi: 'Xe cảnh sát', ja: 'パトカー', emoji: '🚓', audioKey: 'en_w_policecar' },
      { id: 'en_v14', en: 'Ambulance', vi: 'Xe cứu thương', ja: 'きゅうきゅうしゃ', emoji: '🚑', audioKey: 'en_w_ambulance' },
      { id: 'en_v15', en: 'Bus', vi: 'Xe buýt', ja: 'バス', emoji: '🚌', audioKey: 'en_w_bus' },
      { id: 'en_v16', en: 'Bicycle', vi: 'Xe đạp', ja: 'じてんしゃ', emoji: '🚲', audioKey: 'en_w_bicycle' }
    ]
  },
  {
    id: 'colors_food',
    title: '🎨 Colors & Food',
    label: 'Màu Sắc & Đồ Ăn',
    words: [
      { id: 'en_v17', en: 'Red', vi: 'Màu đỏ', ja: 'あか', emoji: '🔴', audioKey: 'en_w_red' },
      { id: 'en_v18', en: 'Blue', vi: 'Màu xanh dương', ja: 'あお', emoji: '🔵', audioKey: 'en_w_blue' },
      { id: 'en_v19', en: 'Green', vi: 'Màu xanh lá', ja: 'みどり', emoji: '🟢', audioKey: 'en_w_green' },
      { id: 'en_v20', en: 'Yellow', vi: 'Màu vàng', ja: 'きいろ', emoji: '🟡', audioKey: 'en_w_yellow' },
      { id: 'en_v21', en: 'Apple', vi: 'Quả táo', ja: 'りんご', emoji: '🍎', audioKey: 'en_w_apple' },
      { id: 'en_v22', en: 'Banana', vi: 'Quả chuối', ja: 'バナナ', emoji: '🍌', audioKey: 'en_w_banana' },
      { id: 'en_v23', en: 'Milk', vi: 'Sữa tươi', ja: 'ぎゅうにゅう', emoji: '🥛', audioKey: 'en_w_milk' },
      { id: 'en_v24', en: 'Rice', vi: 'Cơm trắng', ja: 'ごはん', emoji: '🍚', audioKey: 'en_w_rice' }
    ]
  },
  {
    id: 'en_greetings',
    title: '👋 Daily English',
    label: 'Giao Tiếp Hàng Ngày',
    words: [
      { id: 'en_v25', en: 'Hello!', vi: 'Xin chào!', ja: 'こんにちは', emoji: '👋', audioKey: 'en_w_hello' },
      { id: 'en_v26', en: 'Thank you!', vi: 'Cảm ơn!', ja: 'ありがとう', emoji: '🙏', audioKey: 'en_w_thankyou' },
      { id: 'en_v27', en: 'Sorry!', vi: 'Xin lỗi!', ja: 'ごめんなさい', emoji: '🥺', audioKey: 'en_w_sorry' },
      { id: 'en_v28', en: 'Good morning!', vi: 'Chào buổi sáng!', ja: 'おはよう', emoji: '☀️', audioKey: 'en_w_goodmorning' },
      { id: 'en_v29', en: 'Good night!', vi: 'Chúc ngủ ngon!', ja: 'おやすみ', emoji: '🌙', audioKey: 'en_w_goodnight' },
      { id: 'en_v30', en: 'I love Dad!', vi: 'Con yêu Ba!', ja: 'パパだいすき', emoji: '👨', audioKey: 'en_w_ilovedad' },
      { id: 'en_v31', en: 'I love Mom!', vi: 'Con yêu Mẹ!', ja: 'ママだいすき', emoji: '👩', audioKey: 'en_w_ilovemom' },
      { id: 'en_v32', en: 'Good job!', vi: 'Làm tốt lắm!', ja: 'よくできました', emoji: '👍', audioKey: 'en_w_goodjob' }
    ]
  },
  {
    id: 'en_school',
    title: '🏫 School & Classroom',
    label: 'Trường Lớp & Đồ Dùng',
    words: [
      { id: 'en_v33', en: 'School', vi: 'Trường học', ja: 'がっこう', emoji: '🏫', audioKey: 'en_w_school' },
      { id: 'en_v34', en: 'Teacher', vi: 'Cô giáo / Thầy giáo', ja: 'せんせい', emoji: '👩‍🏫', audioKey: 'en_w_teacher' },
      { id: 'en_v35', en: 'Friend', vi: 'Bạn bè', ja: 'ともだち', emoji: '🧑‍🤝‍🧑', audioKey: 'en_w_friend' },
      { id: 'en_v36', en: 'Book', vi: 'Quyển sách', ja: 'ほん', emoji: '📚', audioKey: 'en_w_book' },
      { id: 'en_v37', en: 'Pen', vi: 'Cây bút', ja: 'ペン', emoji: '🖊️', audioKey: 'en_w_pen' },
      { id: 'en_v38', en: 'Bag', vi: 'Cặp sách', ja: 'かばん', emoji: '🎒', audioKey: 'en_w_bag' },
      { id: 'en_v39', en: 'Desk', vi: 'Cái bàn học', ja: 'つくえ', emoji: '🪑', audioKey: 'en_w_desk' },
      { id: 'en_v40', en: 'Ruler', vi: 'Thước kẻ', ja: 'じょうぎ', emoji: '📏', audioKey: 'en_w_ruler' }
    ]
  },
  {
    id: 'en_family_body',
    title: '👨‍👩‍👦 Family & Body',
    label: 'Gia Đình & Cơ Thể',
    words: [
      { id: 'en_v41', en: 'Family', vi: 'Gia đình', ja: 'かぞく', emoji: '👨‍👩‍👦', audioKey: 'en_w_family' },
      { id: 'en_v42', en: 'Grandpa', vi: 'Ông nội / Ông ngoại', ja: 'おじいさん', emoji: '👴', audioKey: 'en_w_grandpa' },
      { id: 'en_v43', en: 'Grandma', vi: 'Bà nội / Bà ngoại', ja: 'おばあさん', emoji: '👵', audioKey: 'en_w_grandma' },
      { id: 'en_v44', en: 'Eyes', vi: 'Đôi mắt', ja: 'め', emoji: '👀', audioKey: 'en_w_eyes' },
      { id: 'en_v45', en: 'Ears', vi: 'Đôi tai', ja: 'みみ', emoji: '👂', audioKey: 'en_w_ears' },
      { id: 'en_v46', en: 'Mouth', vi: 'Cái miệng', ja: 'くち', emoji: '👄', audioKey: 'en_w_mouth' },
      { id: 'en_v47', en: 'Hand', vi: 'Bàn tay', ja: 'て', emoji: '🖐️', audioKey: 'en_w_hand' },
      { id: 'en_v48', en: 'Foot', vi: 'Bàn chân', ja: 'あし', emoji: '🦶', audioKey: 'en_w_foot' }
    ]
  },
  {
    id: 'en_nature_seasons',
    title: '🌸 Nature & Weather',
    label: 'Thiên Nhiên & Thời Tiết',
    words: [
      { id: 'en_v49', en: 'Sun', vi: 'Mặt trời', ja: 'たいよう', emoji: '☀️', audioKey: 'en_w_sun' },
      { id: 'en_v50', en: 'Moon', vi: 'Mặt trăng', ja: 'つき', emoji: '🌙', audioKey: 'en_w_moon' },
      { id: 'en_v51', en: 'Star', vi: 'Ngôi sao', ja: 'ほし', emoji: '⭐', audioKey: 'en_w_star' },
      { id: 'en_v52', en: 'Cloud', vi: 'Đám mây', ja: 'くも', emoji: '☁️', audioKey: 'en_w_cloud' },
      { id: 'en_v53', en: 'Rain', vi: 'Cơn mưa', ja: 'あめ', emoji: '🌧️', audioKey: 'en_w_rain' },
      { id: 'en_v54', en: 'Rainbow', vi: 'Cầu vồng', ja: 'にじ', emoji: '🌈', audioKey: 'en_w_rainbow' },
      { id: 'en_v55', en: 'Tree', vi: 'Cái cây', ja: 'き', emoji: '🌳', audioKey: 'en_w_tree' },
      { id: 'en_v56', en: 'Flower', vi: 'Bông hoa', ja: 'はな', emoji: '🌸', audioKey: 'en_w_flower' }
    ]
  },
  {
    id: 'en_numbers_shapes',
    title: '🔢 Numbers & Toys',
    label: 'Số Đếm & Đồ Chơi',
    words: [
      { id: 'en_v57', en: 'One', vi: 'Số một', ja: 'いち', emoji: '1️⃣', audioKey: 'en_w_one' },
      { id: 'en_v58', en: 'Two', vi: 'Số hai', ja: 'に', emoji: '2️⃣', audioKey: 'en_w_two' },
      { id: 'en_v59', en: 'Three', vi: 'Số ba', ja: 'さん', emoji: '3️⃣', audioKey: 'en_w_three' },
      { id: 'en_v60', en: 'Five', vi: 'Số năm', ja: 'ご', emoji: '5️⃣', audioKey: 'en_w_five' },
      { id: 'en_v61', en: 'Ten', vi: 'Số mười', ja: 'じゅう', emoji: '🔟', audioKey: 'en_w_ten' },
      { id: 'en_v62', en: 'Ball', vi: 'Quả bóng', ja: 'ボール', emoji: '⚽', audioKey: 'en_w_ball' },
      { id: 'en_v63', en: 'Kite', vi: 'Cái diều', ja: 'たこ', emoji: '🪁', audioKey: 'en_w_kite' },
      { id: 'en_v64', en: 'Robot', vi: 'Người máy', ja: 'ロボット', emoji: '🤖', audioKey: 'en_w_robot' }
    ]
  }
];

const EN_SPELLING_DATA = [
  { word: 'CAT', vi: 'Con mèo', ja: 'ねこ', emoji: '🐱', audioKey: 'en_w_cat', distractors: ['B', 'R'] },
  { word: 'DOG', vi: 'Con chó', ja: 'いぬ', emoji: '🐶', audioKey: 'en_w_dog', distractors: ['P', 'A'] },
  { word: 'CAR', vi: 'Xe ô tô', ja: 'くるま', emoji: '🚗', audioKey: 'en_w_car', distractors: ['T', 'B'] },
  { word: 'BUS', vi: 'Xe buýt', ja: 'バス', emoji: '🚌', audioKey: 'en_w_bus', distractors: ['M', 'A'] },
  { word: 'RED', vi: 'Màu đỏ', ja: 'あか', emoji: '🔴', audioKey: 'en_w_red', distractors: ['B', 'O'] },
  { word: 'SUN', vi: 'Mặt trời', ja: 'たいよう', emoji: '☀️', audioKey: 'en_w_sun', distractors: ['T', 'M'] },
  { word: 'EGG', vi: 'Quả trứng', ja: 'たまご', emoji: '🥚', audioKey: 'en_w_egg', distractors: ['A', 'K'] },
  { word: 'MILK', vi: 'Sữa tươi', ja: 'ぎゅうにゅう', emoji: '🥛', audioKey: 'en_w_milk', distractors: ['S', 'A'] },
  { word: 'STAR', vi: 'Ngôi sao', ja: 'ほし', emoji: '⭐', audioKey: 'en_w_star', distractors: ['C', 'N'] },
  { word: 'LION', vi: 'Sư tử', ja: 'ライオン', emoji: '🦁', audioKey: 'en_w_lion', distractors: ['M', 'E'] },
  { word: 'BOOK', vi: 'Quyển sách', ja: 'ほん', emoji: '📚', audioKey: 'en_w_book', distractors: ['C', 'A'] },
  { word: 'BAG', vi: 'Cặp sách', ja: 'かばん', emoji: '🎒', audioKey: 'en_w_bag', distractors: ['D', 'E'] },
  { word: 'PEN', vi: 'Cây bút', ja: 'ペン', emoji: '🖊️', audioKey: 'en_w_pen', distractors: ['B', 'O'] },
  { word: 'BALL', vi: 'Quả bóng', ja: 'ボール', emoji: '⚽', audioKey: 'en_w_ball', distractors: ['T', 'K'] },
  { word: 'TREE', vi: 'Cái cây', ja: 'き', emoji: '🌳', audioKey: 'en_w_tree', distractors: ['B', 'A'] },
  { word: 'MOON', vi: 'Mặt trăng', ja: 'つき', emoji: '🌙', audioKey: 'en_w_moon', distractors: ['S', 'T'] }
];

// State Tiếng Anh
let currentEnTab = 'abc'; // 'abc' | 'vocab' | 'quiz' | 'spelling'
let currentEnTopicIdx = 0;
let enSessionScore = 0;
let enAutoTimer = null;
let enAutoRunning = false;
let enEpoch = 0;
let enSpellLocked = false;

// Quiz State
let enQuizQuestions = [];
let enQuizIndex = 0;
let enQuizScore = 0;
let enQuizStreak = 0;

// Spelling State
let enSpellQuestions = [];
let enSpellIndex = 0;
let enSpellScore = 0;
let enSpellSlots = [];

function addEnScore(pts) {
  enSessionScore += pts;
  const el = document.getElementById('enSessionStars');
  if (el) el.innerText = `⭐ English Stars: ${enSessionScore}`;
}

function stopEnAutoPlay() {
  enAutoRunning = false;
  if (enAutoTimer) {
    clearTimeout(enAutoTimer);
    enAutoTimer = null;
  }
  document.querySelectorAll('#englishContainer .is-speaking-active').forEach(e => e.classList.remove('is-speaking-active'));
  const b1 = document.getElementById('btnAutoPlayEnAbc');
  if (b1) {
    b1.classList.remove('playing');
    b1.innerHTML = '<span>🎧</span> Nghe A → Z';
  }
  const b2 = document.getElementById('btnAutoPlayEnVocab');
  if (b2) {
    b2.classList.remove('playing');
    b2.innerHTML = '<span>🎧</span> Nghe cả chủ đề';
  }
}

function renderEnglishHub() {
  const el = document.getElementById('enSessionStars');
  if (el) el.innerText = `⭐ English Stars: ${enSessionScore}`;
  switchEnglishSubTab(currentEnTab);
}

function switchEnglishSubTab(subtab) {
  stopEnAutoPlay();
  window.soundMgr.stopAll();
  enEpoch++;
  currentEnTab = subtab;

  const tabs = {
    abc: ['enPaneAbc', 'enTabAbc'],
    vocab: ['enPaneVocab', 'enTabVocab'],
    quiz: ['enPaneQuiz', 'enTabQuiz'],
    spelling: ['enPaneSpelling', 'enTabSpelling']
  };

  Object.entries(tabs).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });

  if (subtab === 'abc') renderEnAbcTab();
  else if (subtab === 'vocab') renderEnVocabTab();
  else if (subtab === 'quiz') initEnQuizGame();
  else if (subtab === 'spelling') initEnSpellingGame();
}

// ========================================================
// TAB 1: 26 CHỮ CÁI TIẾNG ANH (A - Z)
// ========================================================
function renderEnAbcTab() {
  const grid = document.getElementById('enAbcGrid');
  if (!grid) return;
  grid.innerHTML = '';

  EN_ALPHABET_DATA.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(`en_alpha_${item.lower}`);
    const card = document.createElement('div');
    card.className = `alpha-card en-abc-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="alpha-letter" style="color: #2563eb;">${item.upper} ${item.lower}</div>
      <div style="font-size: 28px; margin: 4px 0;">${item.emoji}</div>
      <div style="font-size: 15px; font-weight: 900; color: #1e40af;">${item.word}</div>
      <div style="font-size: 11px; color: #475569; font-weight: 700;">${item.vi}</div>
      <div class="alpha-ja">${item.ja}</div>
    `;
    card.addEventListener('click', () => {
      stopEnAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(item.audioKey, null, `${item.upper}, ${item.word}`);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(`en_alpha_${item.lower}`);
        if (isNew) {
          addEnScore(2);
          card.classList.add('is-learned');
        }
      }
      if (typeof showToast === 'function') showToast(`🇬🇧 ${item.upper} is for ${item.word} (${item.vi}) ${item.emoji}`);
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayEnAbc');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (enAutoRunning || btnAuto.classList.contains('playing')) {
        stopEnAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopEnAutoPlay();
      enAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const cards = document.querySelectorAll('#enAbcGrid .en-abc-card');

      function nextAbc() {
        if (!enAutoRunning) return;
        if (idx >= EN_ALPHABET_DATA.length) {
          stopEnAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 Good job! Đã nghe xong bảng chữ cái A–Z!');
          return;
        }
        document.querySelectorAll('#enAbcGrid .en-abc-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = EN_ALPHABET_DATA[idx];
        window.soundMgr.playAudioFile(cur.audioKey, () => {
          if (!enAutoRunning) return;
          idx++;
          enAutoTimer = setTimeout(nextAbc, 450);
        }, `${cur.upper}, ${cur.word}`);
      }
      nextAbc();
    };
  }
}

// ========================================================
// TAB 2: 4 CHỦ ĐỀ TỪ VỰNG & GIAO TIẾP TIẾNG ANH
// ========================================================
function renderEnVocabTab() {
  const track = document.getElementById('enTopicsTrack');
  if (!track) return;
  track.innerHTML = '';

  EN_VOCAB_TOPICS.forEach((topic, idx) => {
    const btn = document.createElement('button');
    btn.className = `lesson-tab ${idx === currentEnTopicIdx ? 'active' : ''}`;
    btn.innerText = `${topic.title}`;
    btn.onclick = () => {
      stopEnAutoPlay();
      currentEnTopicIdx = idx;
      window.soundMgr.playClick();
      renderEnVocabTab();
    };
    track.appendChild(btn);
  });

  const activeTopic = EN_VOCAB_TOPICS[currentEnTopicIdx];
  document.getElementById('enTopicTitleText').innerText = `${activeTopic.title} — ${activeTopic.label}`;

  const grid = document.getElementById('enVocabGrid');
  grid.innerHTML = '';
  activeTopic.words.forEach(w => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(w.id);
    const card = document.createElement('div');
    card.className = `word-card en-vocab-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '☆'}</div>
      <div class="word-icon-img">${w.emoji}</div>
      <div class="word-text" style="color: #1d4ed8; font-size: 22px;">${w.en}</div>
      <div class="word-action-tag" style="background:#dbeafe; color:#1e40af;">${w.vi}</div>
      <div class="word-ja-sub">🇯🇵 ${w.ja}</div>
    `;
    card.addEventListener('click', () => {
      stopEnAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(w.audioKey, null, w.en);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(w.id);
        if (isNew) {
          addEnScore(2);
          card.classList.add('is-learned');
          const starCorner = card.querySelector('.star-corner');
          if (starCorner) starCorner.innerText = '⭐';
          if (typeof showToast === 'function') showToast(`⭐ +2 Sao! "${w.en}" nghĩa là "${w.vi}"!`);
        } else if (typeof showToast === 'function') {
          showToast(`🇬🇧 ${w.en} = ${w.vi} (🇯🇵 ${w.ja})`);
        }
      }
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayEnVocab');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (enAutoRunning || btnAuto.classList.contains('playing')) {
        stopEnAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopEnAutoPlay();
      enAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const words = activeTopic.words;
      const cards = document.querySelectorAll('#enVocabGrid .en-vocab-card');

      function nextWord() {
        if (!enAutoRunning) return;
        if (idx >= words.length) {
          stopEnAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 Tuyệt vời! Bảo Long đã nghe xong chủ đề!');
          return;
        }
        document.querySelectorAll('#enVocabGrid .en-vocab-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        window.soundMgr.playAudioFile(words[idx].audioKey, () => {
          if (!enAutoRunning) return;
          idx++;
          enAutoTimer = setTimeout(nextWord, 550);
        }, words[idx].en);
      }
      nextWord();
    };
  }
}

// ========================================================
// TAB 3: NGHE TIẾNG ANH CHỌN HÌNH (10 CÂU)
// ========================================================
function initEnQuizGame() {
  const pool = EN_VOCAB_TOPICS.flatMap(t => t.words);
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

  enQuizQuestions = shuffled.map(target => {
    const others = pool.filter(w => w.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      target,
      choices: [target, ...others].sort(() => Math.random() - 0.5)
    };
  });

  enQuizIndex = 0;
  enQuizScore = 0;
  enQuizStreak = 0;
  document.getElementById('enQuizPlayStage').style.display = 'block';
  document.getElementById('enQuizVictoryStage').style.display = 'none';
  loadEnQuizQuestion();
}

function loadEnQuizQuestion() {
  enEpoch++;
  const myNav = window.appNavEpoch || 0;
  const myEn = enEpoch;
  if (enQuizIndex >= enQuizQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_en_win', null, 'Awesome job Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Siêu sao Nghe Tiếng Anh!');

    document.getElementById('enQuizPlayStage').style.display = 'none';
    document.getElementById('enQuizVictoryStage').style.display = 'block';
    document.getElementById('enQuizVictoryScore').innerText =
      `Bảo Long đạt ${enQuizScore} điểm nghe tiếng Anh chuẩn bản xứ (+15 ⭐)!`;
    return;
  }

  const q = enQuizQuestions[enQuizIndex];
  document.getElementById('enQuizProgressText').innerText = `Câu ${enQuizIndex + 1} / ${enQuizQuestions.length}`;
  document.getElementById('enQuizStreakBadge').innerText = `🔥 Streak x${enQuizStreak}`;
  document.getElementById('enQuizScoreText').innerText = `⭐ ${enQuizScore} điểm`;
  document.getElementById('enQuizHintText').innerText = `💡 Nghe kỹ từ tiếng Anh và chọn hình đúng nhé!`;

  const grid = document.getElementById('enQuizOptionsGrid');
  grid.innerHTML = '';
  let enQuizLocked = false;
  const qBoxEl = document.querySelector('#enPaneQuiz .quiz-question-box');
  const enTourSteps = [{ key: q.target.audioKey, fallbackText: q.target.en, el: qBoxEl, pauseAfterMs: 220 }];

  q.choices.forEach(item => {
    const viKey = `vi_${item.id}`;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe nghĩa tiếng Việt">🔊</button>
      <div class="quiz-opt-icon">${item.emoji}</div>
      <div class="quiz-opt-name">${item.vi}</div>
      <div class="quiz-opt-ja">🇯🇵 ${item.ja}</div>
    `;
    const spkBtn = card.querySelector('.quiz-opt-speak-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(viKey, null, item.vi);
      });
    }
    enTourSteps.push({ key: viKey, fallbackText: item.vi, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (enQuizLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (item.id === q.target.id) {
        enQuizLocked = true;
        card.classList.add('correct');
        enQuizStreak++;
        const pts = enQuizStreak >= 3 ? 15 : 10;
        enQuizScore += pts;
        addEnScore(pts);
        document.getElementById('enQuizStreakBadge').innerText = `🔥 Streak x${enQuizStreak}`;
        document.getElementById('enQuizScoreText').innerText = `⭐ ${enQuizScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        if (typeof showToast === 'function') showToast(`🎉 Great! "${q.target.en}" = ${q.target.vi}!`);
        window.soundMgr.playPraiseThen(enQuizStreak >= 3,
          () => (window.appNavEpoch || 0) === myNav && enEpoch === myEn,
          () => {
            enQuizIndex++;
            loadEnQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        enQuizStreak = 0;
        document.getElementById('enQuizStreakBadge').innerText = `🔥 Streak x0`;
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        if (typeof showToast === 'function') showToast(`👂 Bấm "Nghe Từ & 4 Đáp Án" hoặc loa 🔊 trên từng thẻ nhé!`);
      }
    });
    grid.appendChild(card);
  });

  const playEnTour = () => window.soundMgr.playChoiceTour(enTourSteps);
  document.getElementById('btnHearEnQuiz').onclick = () => {
    window.soundMgr.playClick();
    playEnTour();
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && enEpoch === myEn) {
      playEnTour();
    }
  }, 60);
}

// ========================================================
// TAB 4: GHÉP CHỮ TIẾNG ANH VUI (10 TỪ)
// ========================================================
function initEnSpellingGame() {
  enSpellQuestions = [...EN_SPELLING_DATA].sort(() => Math.random() - 0.5).slice(0, 10);
  enSpellIndex = 0;
  enSpellScore = 0;
  document.getElementById('enSpellPlayStage').style.display = 'block';
  document.getElementById('enSpellVictoryStage').style.display = 'none';
  loadEnSpellRound();
}

function loadEnSpellRound() {
  enEpoch++;
  enSpellLocked = false;
  const myNav = window.appNavEpoch || 0;
  const myEn = enEpoch;
  if (enSpellIndex >= enSpellQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_en_win', null, 'Awesome job Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Hoàn thành Ghép Chữ Tiếng Anh!');

    document.getElementById('enSpellPlayStage').style.display = 'none';
    document.getElementById('enSpellVictoryStage').style.display = 'block';
    document.getElementById('enSpellVictoryScore').innerText =
      `Bảo Long đã ghép đúng cả 10 từ tiếng Anh đạt ${enSpellScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = enSpellQuestions[enSpellIndex];
  document.getElementById('enSpellProgressText').innerText = `Word ${enSpellIndex + 1} / ${enSpellQuestions.length}`;
  document.getElementById('enSpellScoreText').innerText = `⭐ ${enSpellScore} điểm`;
  document.getElementById('enSpellIcon').innerText = q.emoji;
  document.getElementById('enSpellMeaning').innerText = `Ghép từ tiếng Anh: ${q.vi}`;
  document.getElementById('enSpellJa').innerText = `🇯🇵 ${q.ja}`;

  document.getElementById('btnHearEnSpell').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(q.audioKey, null, q.word);
  };
  document.getElementById('btnResetEnSpell').onclick = () => {
    window.soundMgr.playClick();
    loadEnSpellRound();
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && enEpoch === myEn) {
      window.soundMgr.playAudioFile(q.audioKey, null, q.word);
    }
  }, 250);

  const letters = q.word.split('');
  enSpellSlots = new Array(letters.length).fill(null);

  const slotsBox = document.getElementById('enSpellSlots');
  slotsBox.innerHTML = '';
  letters.forEach((_, idx) => {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.id = `en-slot-${idx}`;
    slot.addEventListener('click', () => {
      if (enSpellLocked) return;
      if (enSpellSlots[idx]) {
        const removed = enSpellSlots[idx];
        const b = document.getElementById(removed.btnId);
        if (b) b.classList.remove('used');
        enSpellSlots[idx] = null;
        slot.innerText = '';
        slot.classList.remove('filled');
        window.soundMgr.playPop();
      }
    });
    slotsBox.appendChild(slot);
  });

  const bank = [...letters, ...q.distractors].sort(() => Math.random() - 0.5);
  const bankBox = document.getElementById('enSpellLettersRow');
  bankBox.innerHTML = '';
  bank.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'letter-option-btn';
    btn.innerText = ch;
    btn.id = `en-opt-${idx}`;
    btn.addEventListener('click', () => {
      if (enSpellLocked || btn.classList.contains('used')) return;
      window.soundMgr.playAudioFile(`en_letter_${ch.toLowerCase()}`, null, ch);
      const emptyIdx = enSpellSlots.findIndex(s => s === null);
      if (emptyIdx === -1) return;
      btn.classList.add('used');
      enSpellSlots[emptyIdx] = { ch, btnId: btn.id };
      const sEl = document.getElementById(`en-slot-${emptyIdx}`);
      sEl.innerText = ch;
      sEl.classList.add('filled');

      if (enSpellSlots.every(s => s !== null)) {
        enSpellLocked = true;
        const built = enSpellSlots.map(s => s.ch).join('');
        if (built === q.word) {
          enSpellScore += 10;
          addEnScore(10);
          document.getElementById('enSpellScoreText').innerText = `⭐ ${enSpellScore} điểm`;
          window.soundMgr.playCorrect();
          if (typeof fireConfetti === 'function') fireConfetti();
          if (typeof showToast === 'function') showToast(`🌟 Excellent! "${q.word}" = ${q.vi}!`);
          let spellDone = false;
          const goNextSpell = () => {
            if (spellDone) return;
            spellDone = true;
            if ((window.appNavEpoch || 0) !== myNav || enEpoch !== myEn) return;
            enSpellIndex++;
            loadEnSpellRound();
          };
          setTimeout(() => {
            if ((window.appNavEpoch || 0) === myNav && enEpoch === myEn) {
              window.soundMgr.playAudioFile(q.audioKey, () => setTimeout(goNextSpell, 220), q.word);
            }
          }, 180);
          setTimeout(goNextSpell, window.soundMgr.isMuted ? 450 : 1850);
        } else {
          window.soundMgr.playWrong();
          if (typeof showToast === 'function') showToast(`Chạm vào ô sai để sửa hoặc thử lại nhé Bảo Long! ❤️`);
          setTimeout(() => {
            if ((window.appNavEpoch || 0) !== myNav || enEpoch !== myEn) return;
            loadEnSpellRound();
          }, 1100);
        }
      }
    });
    bankBox.appendChild(btn);
  });
}
