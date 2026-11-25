// ========================================================
// BỘ MÔN TIẾNG NHẬT SONG NGỮ CHO BẢO LONG (NIHONGO 6 TUỔI)
// Gồm 4 phần:
// 1. 46 Chữ cái Hiragana cơ bản (あ -> ん)
// 2. 4 Chủ đề Giao tiếp & Từ vựng Nhật - Việt (34 từ/câu)
// 3. Bảng Tập Viết Hiragana Trên Ô Vuông Nhật Bản (Masume)
// 4. Trò Chơi Đố Vui Tiếng Nhật (10 câu)
// Đồng bộ giọng đọc Nhật bản xứ Nữ (Nanami) / Nam (Keita)
// ========================================================

const JA_HIRAGANA_DATA = [
  { hira: 'あ', romaji: 'a', word: 'あめ (Kẹo)', emoji: '🍬' },
  { hira: 'い', romaji: 'i', word: 'いぬ (Con chó)', emoji: '🐶' },
  { hira: 'う', romaji: 'u', word: 'うし (Con bò)', emoji: '🐮' },
  { hira: 'え', romaji: 'e', word: 'えんぴつ (Bút chì)', emoji: '✏️' },
  { hira: 'お', romaji: 'o', word: 'おにぎり (Cơm nắm)', emoji: '🍙' },

  { hira: 'か', romaji: 'ka', word: 'かめ (Con rùa)', emoji: '🐢' },
  { hira: 'き', romaji: 'ki', word: 'き (Cái cây)', emoji: '🌳' },
  { hira: 'く', romaji: 'ku', word: 'くるま (Ô tô)', emoji: '🚗' },
  { hira: 'け', romaji: 'ke', word: 'けしごむ (Tẩy)', emoji: '🧽' },
  { hira: 'こ', romaji: 'ko', word: 'こども (Em bé)', emoji: '👶' },

  { hira: 'さ', romaji: 'sa', word: 'さかな (Con cá)', emoji: '🐟' },
  { hira: 'し', romaji: 'shi', word: 'しんかんせん (Shinkansen)', emoji: '🚅' },
  { hira: 'す', romaji: 'su', word: 'すいか (Dưa hấu)', emoji: '🍉' },
  { hira: 'せ', romaji: 'se', word: 'せかい (Thế giới)', emoji: '🌍' },
  { hira: 'そ', romaji: 'so', word: 'そら (Bầu trời)', emoji: '🌤️' },

  { hira: 'た', romaji: 'ta', word: 'たまご (Quả trứng)', emoji: '🥚' },
  { hira: 'ち', romaji: 'chi', word: 'ちきゅう (Trái đất)', emoji: '🌏' },
  { hira: 'つ', romaji: 'tsu', word: 'つき (Mặt trăng)', emoji: '🌙' },
  { hira: 'て', romaji: 'te', word: 'て (Bàn tay)', emoji: '🖐️' },
  { hira: 'と', romaji: 'to', word: 'とり (Con chim)', emoji: '🐦' },

  { hira: 'な', romaji: 'na', word: 'なつ (Mùa hè)', emoji: '☀️' },
  { hira: 'に', romaji: 'ni', word: 'にわとり (Con gà)', emoji: '🐔' },
  { hira: 'ぬ', romaji: 'nu', word: 'ぬいぐるみ (Thú bông)', emoji: '🧸' },
  { hira: 'ね', romaji: 'ne', word: 'ねこ (Con mèo)', emoji: '🐱' },
  { hira: 'の', romaji: 'no', word: 'ノート (Quyển vở)', emoji: '📓' },

  { hira: 'は', romaji: 'ha', word: 'はな (Bông hoa)', emoji: '🌸' },
  { hira: 'ひ', romaji: 'hi', word: 'ひこうき (Máy bay)', emoji: '✈️' },
  { hira: 'ふ', romaji: 'fu', word: 'ふね (Tàu thủy)', emoji: '🚢' },
  { hira: 'へ', romaji: 'he', word: 'ヘリコプター (Trực thăng)', emoji: '🚁' },
  { hira: 'ほ', romaji: 'ho', word: 'ほし (Ngôi sao)', emoji: '⭐' },

  { hira: 'ま', romaji: 'ma', word: 'まと (Mục tiêu)', emoji: '🎯' },
  { hira: 'み', romaji: 'mi', word: 'みず (Nước uống)', emoji: '💧' },
  { hira: 'む', romaji: 'mu', word: 'むし (Côn trùng)', emoji: '🐞' },
  { hira: 'め', romaji: 'me', word: 'め (Đôi mắt)', emoji: '👀' },
  { hira: 'も', romaji: 'mo', word: 'もも (Quả đào)', emoji: '🍑' },

  { hira: 'や', romaji: 'ya', word: 'やま (Ngọn núi)', emoji: '⛰️' },
  { hira: 'ゆ', romaji: 'yu', word: 'ゆき (Tuyết rơi)', emoji: '❄️' },
  { hira: 'よ', romaji: 'yo', word: 'よる (Ban đêm)', emoji: '🌃' },

  { hira: 'ら', romaji: 'ra', word: 'ライオン (Sư tử)', emoji: '🦁' },
  { hira: 'り', romaji: 'ri', word: 'りんご (Quả táo)', emoji: '🍎' },
  { hira: 'る', romaji: 'ru', word: 'るす (Vắng nhà)', emoji: '🏠' },
  { hira: 'れ', romaji: 're', word: 'レモン (Quả chanh)', emoji: '🍋' },
  { hira: 'ろ', romaji: 'ro', word: 'ロボット (Người máy)', emoji: '🤖' },

  { hira: 'わ', romaji: 'wa', word: 'わに (Cá sấu)', emoji: '🐊' },
  { hira: 'を', romaji: 'wo', word: 'を (Trợ từ Wo)', emoji: '📝' },
  { hira: 'ん', romaji: 'n', word: 'ほん (Quyển sách)', emoji: '📚' }
];

const JA_VOCAB_TOPICS = [
  {
    id: 'greetings',
    title: '👋 Chào Hỏi & Lễ Phép',
    words: [
      { id: 'ja_v1', ja: 'おはよう', romaji: 'Ohayou', vi: 'Chào buổi sáng', emoji: '☀️', audioKey: 'ja_w_ohayou' },
      { id: 'ja_v2', ja: 'こんにちは', romaji: 'Konnichiwa', vi: 'Xin chào (buổi trưa)', emoji: '👋', audioKey: 'ja_w_konnichiwa' },
      { id: 'ja_v3', ja: 'ありがとう', romaji: 'Arigatou', vi: 'Cảm ơn', emoji: '🙏', audioKey: 'ja_w_arigatou' },
      { id: 'ja_v4', ja: 'ごめんなさい', romaji: 'Gomennasai', vi: 'Xin lỗi', emoji: '🙇', audioKey: 'ja_w_gomennasai' },
      { id: 'ja_v5', ja: 'いただきます', romaji: 'Itadakimasu', vi: 'Con xin phép ăn cơm ạ', emoji: '🥢', audioKey: 'ja_w_itadakimasu' },
      { id: 'ja_v6', ja: 'ごちそうさま', romaji: 'Gochisousama', vi: 'Cảm ơn vì bữa ăn ngon', emoji: '🍱', audioKey: 'ja_w_gochisousama' },
      { id: 'ja_v7', ja: 'いってきます', romaji: 'Ittekimasu', vi: 'Con đi học đây ạ', emoji: '🎒', audioKey: 'ja_w_ittekimasu' },
      { id: 'ja_v8', ja: 'ただいま', romaji: 'Tadaima', vi: 'Con đã về rồi ạ', emoji: '🏠', audioKey: 'ja_w_tadaima' }
    ]
  },
  {
    id: 'dino_veh',
    title: '🦖 Khủng Long & Xe',
    words: [
      { id: 'ja_v9', ja: 'きょうりゅう', romaji: 'Kyouryuu', vi: 'Khủng long', emoji: '🦖', audioKey: 'ja_w_kyouryuu' },
      { id: 'ja_v10', ja: 'ティラノサウルス', romaji: 'Tiranosaurusu', vi: 'Khủng long Bạo chúa', emoji: '🦴', audioKey: 'ja_w_trex' },
      { id: 'ja_v11', ja: 'しんかんせん', romaji: 'Shinkansen', vi: 'Tàu siêu tốc Shinkansen', emoji: '🚅', audioKey: 'ja_w_shinkansen' },
      { id: 'ja_v12', ja: 'パトカー', romaji: 'Patokaa', vi: 'Xe cảnh sát', emoji: '🚓', audioKey: 'ja_w_patokaa' },
      { id: 'ja_v13', ja: 'しょうぼうしゃ', romaji: 'Shoubousha', vi: 'Xe cứu hỏa', emoji: '🚒', audioKey: 'ja_w_shoubousha' },
      { id: 'ja_v14', ja: 'きゅうきゅうしゃ', romaji: 'Kyuukyuusha', vi: 'Xe cứu thương', emoji: '🚑', audioKey: 'ja_w_kyuukyuusha' },
      { id: 'ja_v15', ja: 'ひこうき', romaji: 'Hikouki', vi: 'Máy bay', emoji: '✈️', audioKey: 'ja_w_hikouki' },
      { id: 'ja_v16', ja: 'じてんしゃ', romaji: 'Jitensha', vi: 'Xe đạp', emoji: '🚲', audioKey: 'ja_w_jitensha' }
    ]
  },
  {
    id: 'food_color',
    title: '🍓 Quả & Màu Sắc',
    words: [
      { id: 'ja_v17', ja: 'りんご', romaji: 'Ringo', vi: 'Quả táo', emoji: '🍎', audioKey: 'ja_w_ringo' },
      { id: 'ja_v18', ja: 'すいか', romaji: 'Suika', vi: 'Dưa hấu', emoji: '🍉', audioKey: 'ja_w_suika' },
      { id: 'ja_v19', ja: 'いちご', romaji: 'Ichigo', vi: 'Quả dâu tây', emoji: '🍓', audioKey: 'ja_w_ichigo' },
      { id: 'ja_v20', ja: 'ぎゅうにゅう', romaji: 'Gyuunyuu', vi: 'Sữa tươi', emoji: '🥛', audioKey: 'ja_w_gyuunyuu' },
      { id: 'ja_v21', ja: 'あか', romaji: 'Aka', vi: 'Màu đỏ', emoji: '🔴', audioKey: 'ja_w_aka' },
      { id: 'ja_v22', ja: 'あお', romaji: 'Ao', vi: 'Màu xanh dương', emoji: '🔵', audioKey: 'ja_w_ao' },
      { id: 'ja_v23', ja: 'きいろ', romaji: 'Kiiro', vi: 'Màu vàng', emoji: '🟡', audioKey: 'ja_w_kiiro' },
      { id: 'ja_v24', ja: 'みどり', romaji: 'Midori', vi: 'Màu xanh lá', emoji: '🟢', audioKey: 'ja_w_midori' }
    ]
  },
  {
    id: 'numbers',
    title: '🔢 Số Đếm 1 – 10',
    words: [
      { id: 'ja_n1', ja: 'いち', romaji: 'Ichi', vi: 'Số 1 (Một)', emoji: '1️⃣', audioKey: 'ja_n_1' },
      { id: 'ja_n2', ja: 'に', romaji: 'Ni', vi: 'Số 2 (Hai)', emoji: '2️⃣', audioKey: 'ja_n_2' },
      { id: 'ja_n3', ja: 'さん', romaji: 'San', vi: 'Số 3 (Ba)', emoji: '3️⃣', audioKey: 'ja_n_3' },
      { id: 'ja_n4', ja: 'よん', romaji: 'Yon', vi: 'Số 4 (Bốn)', emoji: '4️⃣', audioKey: 'ja_n_4' },
      { id: 'ja_n5', ja: 'ご', romaji: 'Go', vi: 'Số 5 (Năm)', emoji: '5️⃣', audioKey: 'ja_n_5' },
      { id: 'ja_n6', ja: 'ろく', romaji: 'Roku', vi: 'Số 6 (Sáu)', emoji: '6️⃣', audioKey: 'ja_n_6' },
      { id: 'ja_n7', ja: 'なな', romaji: 'Nana', vi: 'Số 7 (Bảy)', emoji: '7️⃣', audioKey: 'ja_n_7' },
      { id: 'ja_n8', ja: 'はち', romaji: 'Hachi', vi: 'Số 8 (Tám)', emoji: '8️⃣', audioKey: 'ja_n_8' },
      { id: 'ja_n9', ja: 'きゅう', romaji: 'Kyuu', vi: 'Số 9 (Chín)', emoji: '9️⃣', audioKey: 'ja_n_9' },
      { id: 'ja_n10', ja: 'じゅう', romaji: 'Juu', vi: 'Số 10 (Mười)', emoji: '🔟', audioKey: 'ja_n_10' }
    ]
  }
];

// State Tiếng Nhật
let currentJaTab = 'hiragana'; // 'hiragana' | 'vocab' | 'writing' | 'quiz'
let currentJaTopicIdx = 0;
let jaSessionScore = 0;
let jaAutoTimer = null;
let jaAutoRunning = false;
let jaEpoch = 0;

// Writing State
let jaWriteChar = 'あ';
let jaCanvas, jaCtx;
let jaDrawing = false;
let jaBrushColor = '#e11d48';
let jaWriteInited = false;

// Quiz State
let jaQuizQuestions = [];
let jaQuizIndex = 0;
let jaQuizScore = 0;
let jaQuizStreak = 0;

function addJaScore(pts) {
  jaSessionScore += pts;
  const el = document.getElementById('jaSessionStars');
  if (el) el.innerText = `⭐ Điểm Tiếng Nhật: ${jaSessionScore}`;
}

function stopJaAutoPlay() {
  jaAutoRunning = false;
  if (jaAutoTimer) {
    clearTimeout(jaAutoTimer);
    jaAutoTimer = null;
  }
  document.querySelectorAll('#japaneseContainer .is-speaking-active').forEach(e => e.classList.remove('is-speaking-active'));
  const b1 = document.getElementById('btnAutoPlayJaHira');
  if (b1) {
    b1.classList.remove('playing');
    b1.innerHTML = '<span>🎧</span> Nghe あ → ん';
  }
  const b2 = document.getElementById('btnAutoPlayJaVocab');
  if (b2) {
    b2.classList.remove('playing');
    b2.innerHTML = '<span>🎧</span> Nghe cả chủ đề';
  }
}

function renderJapaneseHub() {
  const el = document.getElementById('jaSessionStars');
  if (el) el.innerText = `⭐ Điểm Tiếng Nhật: ${jaSessionScore}`;
  switchJapaneseSubTab(currentJaTab);
}

function switchJapaneseSubTab(subtab) {
  stopJaAutoPlay();
  window.soundMgr.stopAll();
  jaEpoch++;
  currentJaTab = subtab;

  const tabs = {
    hiragana: ['jaPaneHira', 'jaTabHira'],
    vocab: ['jaPaneVocab', 'jaTabVocab'],
    writing: ['jaPaneWriting', 'jaTabWriting'],
    quiz: ['jaPaneQuiz', 'jaTabQuiz']
  };

  Object.entries(tabs).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });

  if (subtab === 'hiragana') renderJaHiraganaTab();
  else if (subtab === 'vocab') renderJaVocabTab();
  else if (subtab === 'writing') renderJaWritingTab();
  else if (subtab === 'quiz') initJaQuizGame();
}

// ========================================================
// TAB 1: 46 CHỮ HIRAGANA (あ -> ん)
// ========================================================
function renderJaHiraganaTab() {
  const grid = document.getElementById('jaHiraGrid');
  if (!grid) return;
  grid.innerHTML = '';

  JA_HIRAGANA_DATA.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(`ja_h_${item.hira}`);
    const card = document.createElement('div');
    card.className = `alpha-card ja-hira-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="alpha-letter" style="color: #be123c; font-size: 36px;">${item.hira}</div>
      <div class="alpha-phonetic-pill" style="background:#ffe4e6; color:#9f1239;">${item.romaji}</div>
      <div style="font-size: 20px; margin: 2px 0;">${item.emoji}</div>
      <div class="alpha-ja" style="font-weight:700; color:#334155;">${item.word}</div>
    `;
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`ja_hira_${item.hira}`, null, item.hira);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(`ja_h_${item.hira}`);
        if (isNew) {
          addJaScore(2);
          card.classList.add('is-learned');
        }
      }
      if (typeof showToast === 'function') showToast(`🇯🇵 Chữ "${item.hira}" (${item.romaji}) — ví dụ: ${item.word}`);
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaHira');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const cards = document.querySelectorAll('#jaHiraGrid .ja-hira-card');

      function nextHira() {
        if (!jaAutoRunning) return;
        if (idx >= JA_HIRAGANA_DATA.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 すごい! Bảo Long đã nghe xong 46 chữ Hiragana!');
          return;
        }
        document.querySelectorAll('#jaHiraGrid .ja-hira-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = JA_HIRAGANA_DATA[idx];
        window.soundMgr.playAudioFile(`ja_hira_${cur.hira}`, () => {
          if (!jaAutoRunning) return;
          idx++;
          jaAutoTimer = setTimeout(nextHira, 400);
        }, cur.hira);
      }
      nextHira();
    };
  }
}

// ========================================================
// TAB 2: TỪ VỰNG & GIAO TIẾP NHẬT - VIỆT
// ========================================================
function renderJaVocabTab() {
  const track = document.getElementById('jaTopicsTrack');
  if (!track) return;
  track.innerHTML = '';

  JA_VOCAB_TOPICS.forEach((topic, idx) => {
    const btn = document.createElement('button');
    btn.className = `lesson-tab ${idx === currentJaTopicIdx ? 'active' : ''}`;
    btn.innerText = topic.title;
    btn.onclick = () => {
      stopJaAutoPlay();
      currentJaTopicIdx = idx;
      window.soundMgr.playClick();
      renderJaVocabTab();
    };
    track.appendChild(btn);
  });

  const activeTopic = JA_VOCAB_TOPICS[currentJaTopicIdx];
  document.getElementById('jaTopicTitleText').innerText = activeTopic.title;

  const grid = document.getElementById('jaVocabGrid');
  grid.innerHTML = '';
  activeTopic.words.forEach(w => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(w.id);
    const card = document.createElement('div');
    card.className = `word-card ja-vocab-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '☆'}</div>
      <div class="word-icon-img">${w.emoji}</div>
      <div class="word-text" style="color: #be123c; font-size: 20px;">${w.ja}</div>
      <div style="font-size: 12px; font-weight: 800; color: #6366f1;">(${w.romaji})</div>
      <div class="word-action-tag" style="background:#ffe4e6; color:#9f1239;">${w.vi}</div>
    `;
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(w.audioKey, null, w.ja);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(w.id);
        if (isNew) {
          addJaScore(2);
          card.classList.add('is-learned');
          const sc = card.querySelector('.star-corner');
          if (sc) sc.innerText = '⭐';
          if (typeof showToast === 'function') showToast(`⭐ +2 Sao! "${w.ja}" = "${w.vi}"!`);
        } else if (typeof showToast === 'function') {
          showToast(`🇯🇵 ${w.ja} (${w.romaji}) = ${w.vi}`);
        }
      }
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaVocab');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const words = activeTopic.words;
      const cards = document.querySelectorAll('#jaVocabGrid .ja-vocab-card');

      function nextJaWord() {
        if (!jaAutoRunning) return;
        if (idx >= words.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 よくできました! Đã nghe xong chủ đề!');
          return;
        }
        document.querySelectorAll('#jaVocabGrid .ja-vocab-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        window.soundMgr.playAudioFile(words[idx].audioKey, () => {
          if (!jaAutoRunning) return;
          idx++;
          jaAutoTimer = setTimeout(nextJaWord, 550);
        }, words[idx].ja);
      }
      nextJaWord();
    };
  }
}

// ========================================================
// TAB 3: TẬP VIẾT HIRAGANA Ô VUÔNG NHẬT BẢN (MASUME)
// ========================================================
function renderJaWritingTab() {
  const picker = document.getElementById('jaWritePicker');
  if (picker) {
    picker.innerHTML = '';
    JA_HIRAGANA_DATA.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `ja-pick-char-btn ${item.hira === jaWriteChar ? 'active' : ''}`;
      btn.innerText = item.hira;
      btn.title = `${item.hira} (${item.romaji})`;
      btn.onclick = () => {
        jaWriteChar = item.hira;
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(`ja_hira_${item.hira}`, null, item.hira);
        picker.querySelectorAll('.ja-pick-char-btn.active').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('jaWriteCurrentTitle').innerText = `Tập viết chữ: ${item.hira} (${item.romaji}) — ${item.word}`;
        const hearBtn = document.getElementById('btnHearJaWrite');
        if (hearBtn) {
          hearBtn.onclick = () => {
            window.soundMgr.playClick();
            window.soundMgr.playAudioFile(`ja_hira_${item.hira}`, null, item.hira);
          };
        }
        requestAnimationFrame(() => drawJaMasumeGuide());
      };
      picker.appendChild(btn);
    });
  }

  const curInfo = JA_HIRAGANA_DATA.find(x => x.hira === jaWriteChar) || JA_HIRAGANA_DATA[0];
  document.getElementById('jaWriteCurrentTitle').innerText = `Tập viết chữ: ${curInfo.hira} (${curInfo.romaji}) — ${curInfo.word}`;
  document.getElementById('btnHearJaWrite').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(`ja_hira_${curInfo.hira}`, null, curInfo.hira);
  };

  if (!jaWriteInited) {
    initJaCanvasEvents();
    jaWriteInited = true;
  }

  requestAnimationFrame(() => {
    drawJaMasumeGuide();
  });
}

function initJaCanvasEvents() {
  jaCanvas = document.getElementById('jaWritingCanvas');
  if (!jaCanvas) return;
  jaCtx = jaCanvas.getContext('2d');
  jaCanvas.width = 260;
  jaCanvas.height = 260;

  function coords(e) {
    const r = jaCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (jaCanvas.width / r.width),
      y: (e.clientY - r.top) * (jaCanvas.height / r.height)
    };
  }

  jaCanvas.addEventListener('mousedown', (e) => {
    jaDrawing = true;
    const c = coords(e);
    jaCtx.beginPath();
    jaCtx.moveTo(c.x, c.y);
  });
  jaCanvas.addEventListener('mousemove', (e) => {
    if (!jaDrawing) return;
    const c = coords(e);
    jaCtx.lineWidth = 12;
    jaCtx.lineCap = 'round';
    jaCtx.lineJoin = 'round';
    jaCtx.strokeStyle = jaBrushColor;
    jaCtx.lineTo(c.x, c.y);
    jaCtx.stroke();
  });
  jaCanvas.addEventListener('mouseup', () => { jaDrawing = false; jaCtx.closePath(); });
  jaCanvas.addEventListener('mouseleave', () => { jaDrawing = false; jaCtx.closePath(); });

  jaCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousedown', { clientX: t.clientX, clientY: t.clientY }));
  });
  jaCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY }));
  });
  jaCanvas.addEventListener('touchend', () => {
    jaCanvas.dispatchEvent(new MouseEvent('mouseup', {}));
  });

  document.getElementById('btnJaClear')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    drawJaMasumeGuide();
  });

  document.getElementById('btnJaFinish')?.addEventListener('click', () => {
    window.soundMgr.playCorrect();
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playAudioFile('cheer_ja_good', null, 'Yoku dekimashita!');
    if (typeof awardStars === 'function') awardStars(2, `Viết đẹp chữ Nhật "${jaWriteChar}"!`);
    addJaScore(2);
  });

  document.querySelectorAll('.ja-color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.ja-color-dot').forEach(d => d.classList.remove('active-dot'));
      dot.classList.add('active-dot');
      jaBrushColor = dot.dataset.color;
      window.soundMgr.playClick();
    });
  });
}

function drawJaMasumeGuide() {
  if (!jaCtx || !jaCanvas) return;
  const w = jaCanvas.width;
  const h = jaCanvas.height;
  jaCtx.clearRect(0, 0, w, h);

  // Ô vuông chữ thập nét đứt chuẩn tiểu học Nhật Bản (マス目)
  jaCtx.save();
  jaCtx.strokeStyle = '#fda4af';
  jaCtx.lineWidth = 2;
  jaCtx.setLineDash([6, 6]);
  jaCtx.beginPath();
  jaCtx.moveTo(w / 2, 0);
  jaCtx.lineTo(w / 2, h);
  jaCtx.moveTo(0, h / 2);
  jaCtx.lineTo(w, h / 2);
  jaCtx.stroke();

  // Chữ mẫu mờ to rõ giữa ô vuông
  jaCtx.setLineDash([]);
  jaCtx.font = 'bold 170px "Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif';
  jaCtx.fillStyle = '#e2e8f0';
  jaCtx.textAlign = 'center';
  jaCtx.textBaseline = 'middle';
  jaCtx.fillText(jaWriteChar, w / 2, h / 2 + 8);
  jaCtx.restore();
}

// ========================================================
// TAB 4: ĐỐ VUI TIẾNG NHẬT (10 CÂU)
// ========================================================
function initJaQuizGame() {
  const pool = JA_VOCAB_TOPICS.flatMap(t => t.words);
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

  jaQuizQuestions = picked.map(target => {
    const others = pool.filter(w => w.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      target,
      choices: [target, ...others].sort(() => Math.random() - 0.5)
    };
  });

  jaQuizIndex = 0;
  jaQuizScore = 0;
  jaQuizStreak = 0;
  document.getElementById('jaQuizPlayStage').style.display = 'block';
  document.getElementById('jaQuizVictoryStage').style.display = 'none';
  loadJaQuizQuestion();
}

function loadJaQuizQuestion() {
  jaEpoch++;
  const myNav = window.appNavEpoch || 0;
  const myJa = jaEpoch;
  if (jaQuizIndex >= jaQuizQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_ja_win', null, 'Sugoi! Bao Long');
    if (typeof awardStars === 'function') awardStars(15, 'Siêu sao Tiếng Nhật Song Ngữ!');

    document.getElementById('jaQuizPlayStage').style.display = 'none';
    document.getElementById('jaQuizVictoryStage').style.display = 'block';
    document.getElementById('jaQuizVictoryScore').innerText =
      `Bảo Long đạt ${jaQuizScore} điểm Đố Vui Tiếng Nhật (+15 ⭐ vào Kho Báu)!`;
    return;
  }

  const q = jaQuizQuestions[jaQuizIndex];
  document.getElementById('jaQuizProgressText').innerText = `Câu ${jaQuizIndex + 1} / ${jaQuizQuestions.length}`;
  document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x${jaQuizStreak}`;
  document.getElementById('jaQuizScoreText').innerText = `⭐ ${jaQuizScore} điểm`;
  document.getElementById('jaQuizPromptWord').innerText = `${q.target.ja} (${q.target.romaji})`;

  const grid = document.getElementById('jaQuizOptionsGrid');
  grid.innerHTML = '';
  let jaQuizLocked = false;
  const qBoxEl = document.querySelector('#jaPaneQuiz .quiz-question-box');
  const jaTourSteps = [{ key: q.target.audioKey, fallbackText: q.target.ja, el: qBoxEl, pauseAfterMs: 220 }];

  q.choices.forEach(item => {
    const viKey = `vi_${item.id}`;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe nghĩa tiếng Việt">🔊</button>
      <div class="quiz-opt-icon">${item.emoji}</div>
      <div class="quiz-opt-name">${item.vi}</div>
    `;
    const spkBtn = card.querySelector('.quiz-opt-speak-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(viKey, null, item.vi);
      });
    }
    jaTourSteps.push({ key: viKey, fallbackText: item.vi, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (jaQuizLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (item.id === q.target.id) {
        jaQuizLocked = true;
        card.classList.add('correct');
        jaQuizStreak++;
        const pts = jaQuizStreak >= 3 ? 15 : 10;
        jaQuizScore += pts;
        addJaScore(pts);
        document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x${jaQuizStreak}`;
        document.getElementById('jaQuizScoreText').innerText = `⭐ ${jaQuizScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        if (typeof showToast === 'function') showToast(`🌸 すごい! "${q.target.ja}" = ${q.target.vi}!`);
        window.soundMgr.playPraiseThen(jaQuizStreak >= 3,
          () => (window.appNavEpoch || 0) === myNav && jaEpoch === myJa,
          () => {
            jaQuizIndex++;
            loadJaQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        jaQuizStreak = 0;
        document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x0`;
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        if (typeof showToast === 'function') showToast(`👂 Bấm "Nghe Tiếng Nhật & 4 Đáp Án" hoặc loa 🔊 trên từng thẻ nhé!`);
      }
    });
    grid.appendChild(card);
  });

  const playJaTour = () => window.soundMgr.playChoiceTour(jaTourSteps);
  document.getElementById('btnHearJaQuiz').onclick = () => {
    window.soundMgr.playClick();
    playJaTour();
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && jaEpoch === myJa) {
      playJaTour();
    }
  }, 60);
}
