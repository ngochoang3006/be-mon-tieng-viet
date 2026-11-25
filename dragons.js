// ========================================================
// CHUYÊN MỤC: THẾ GIỚI RỒNG THẦN CHO BẢO LONG (DRAGON WORLD)
// 8 loài Rồng rõ nét, dễ phân biệt + Đố Vui Rồng + Lật Thẻ Rồng Thần
// Kết nối trọn vẹn Kho Sao, Nghe toàn bộ, Đánh vần & Tập viết 4 ô ly!
// ========================================================

const DRAGON_PHOTOS = {
  fire: '<img src="images/dragons/dragon_fire.jpg" class="real-photo" alt="Rồng Lửa Đỏ Có Cánh">',
  water: '<img src="images/dragons/dragon_water.jpg" class="real-photo" alt="Rồng Biển Xanh">',
  ice: '<img src="images/dragons/dragon_ice.jpg" class="real-photo" alt="Rồng Băng Tuyết">',
  forest: '<img src="images/dragons/dragon_forest.jpg" class="real-photo" alt="Rồng Rừng Xanh">',
  gold: '<img src="images/dragons/dragon_gold.jpg" class="real-photo" alt="Rồng Vàng Phương Đông">',
  stone: '<img src="images/dragons/dragon_stone.jpg" class="real-photo" alt="Rồng Đá Cầu Cổ">',
  earth: '<img src="images/dragons/dragon_earth.jpg" class="real-photo" alt="Rồng Komodo Hoang Dã">',
  baby: '<img src="images/dragons/dragon_baby.jpg" class="real-photo" alt="Rồng Úc Con Đáng Yêu">'
};

const DRAGON_LESSONS = [
  {
    id: 'dragon1',
    word: 'rồng lửa',
    dinoName: 'Rồng Lửa (Red Winged Dragon)',
    audioKey: 'dragon_fire',
    spellKey: 'spell_dragon_fire',
    breakdown: 'r - ông - huyền, l - ưa - hỏi',
    spellText: 'Rờ - ông - rông - huyền - rồng, lờ - ưa - lưa - hỏi - lửa -> rồng lửa',
    icon: DRAGON_PHOTOS.fire,
    ja: 'ファイヤードラゴン (Rồng Lửa)',
    funFact: 'Thân màu đỏ rực rỡ như ngọn lửa, dang rộng đôi cánh lớn đầy oai phong!',
    example: 'Rồng lửa dang cánh đỏ bay trên nền trời xanh'
  },
  {
    id: 'dragon2',
    word: 'rồng nước',
    dinoName: 'Rồng Biển Xanh (Blue Sea Dragon)',
    audioKey: 'dragon_water',
    spellKey: 'spell_dragon_water',
    breakdown: 'r - ông - huyền, n - ươc - sắc',
    spellText: 'Rờ - ông - rông - huyền - rồng, nờ - ươc - nươc - sắc - nước -> rồng nước',
    icon: DRAGON_PHOTOS.water,
    ja: 'アオミノウミウシ / 海の竜 (Rồng Biển)',
    funFact: 'Sinh vật rồng biển có thật ngoài đại dương, thân xanh bạc óng ánh tuyệt đẹp!',
    example: 'Rồng nước bơi lượn tung tăng giữa đại dương xanh thẳm'
  },
  {
    id: 'dragon3',
    word: 'rồng băng',
    dinoName: 'Rồng Băng Tuyết (Ice Dragon)',
    audioKey: 'dragon_ice',
    spellKey: 'spell_dragon_ice',
    breakdown: 'r - ông - huyền, b - ăng',
    spellText: 'Rờ - ông - rông - huyền - rồng, bờ - ăng - băng -> rồng băng',
    icon: DRAGON_PHOTOS.ice,
    ja: 'アイスドラゴン / 氷の龍 (Rồng Băng)',
    funFact: 'Điêu khắc từ khối băng trong suốt lấp lánh tại lễ hội tuyết Nhật Bản!',
    example: 'Rồng băng tỏa hơi lạnh mát rượi giữa mùa hè'
  },
  {
    id: 'dragon4',
    word: 'rồng xanh',
    dinoName: 'Rồng Rừng Xanh (Emerald Dragon)',
    audioKey: 'dragon_forest',
    spellKey: 'spell_dragon_forest',
    breakdown: 'r - ông - huyền, x - anh',
    spellText: 'Rờ - ông - rông - huyền - rồng, xờ - anh - xanh -> rồng xanh',
    icon: DRAGON_PHOTOS.forest,
    ja: 'フォレストドラゴン (Rồng Rừng)',
    funFact: 'Thân màu xanh ngọc lục bảo giữa khu rừng cây thông xanh, tay nâng viên ngọc sáng!',
    example: 'Rồng xanh bảo vệ khu rừng cổ thụ tươi tốt'
  },
  {
    id: 'dragon5',
    word: 'rồng vàng',
    dinoName: 'Rồng Vàng Phương Đông (Golden Dragon)',
    audioKey: 'dragon_gold',
    spellKey: 'spell_dragon_gold',
    breakdown: 'r - ông - huyền, v - ang - huyền',
    spellText: 'Rờ - ông - rông - huyền - rồng, vờ - ang - vang - huyền - vàng -> rồng vàng',
    icon: DRAGON_PHOTOS.gold,
    ja: 'おうごんのりゅう / 金の龍 (Rồng Vàng)',
    funFact: 'Toàn thân uốn lượn óng ánh sắc vàng rực rỡ — biểu tượng may mắn Việt Nam!',
    example: 'Rồng vàng mang lại niềm vui và may mắn cho Bảo Long'
  },
  {
    id: 'dragon6',
    word: 'rồng đá',
    dinoName: 'Rồng Đá Cầu Cổ (Stone Dragon)',
    audioKey: 'dragon_stone',
    spellKey: 'spell_dragon_stone',
    breakdown: 'r - ông - huyền, đ - a - sắc',
    spellText: 'Rờ - ông - rông - huyền - rồng, đờ - a - đa - sắc - đá -> rồng đá',
    icon: DRAGON_PHOTOS.stone,
    ja: 'ストーンドラゴン (Rồng Đá)',
    funFact: 'Đôi cánh lớn, móng vuốt sắc và đuôi mũi tên đứng uy nghiêm trên bệ đá cổ!',
    example: 'Chú rồng đá canh giữ cây cầu cổ tuyệt đẹp'
  },
  {
    id: 'dragon7',
    word: 'rồng đất',
    dinoName: 'Rồng Komodo Hoang Dã (Komodo Dragon)',
    audioKey: 'dragon_earth',
    spellKey: 'spell_dragon_earth',
    breakdown: 'r - ông - huyền, đ - ât - sắc',
    spellText: 'Rờ - ông - rông - huyền - rồng, đờ - ât - đât - sắc - đất -> rồng đất',
    icon: DRAGON_PHOTOS.earth,
    ja: 'コモドオオトカゲ (Rồng Komodo)',
    funFact: 'Loài rồng khổng lồ có thật sống trên mặt đất, da vảy dày cứng như áo giáp!',
    example: 'Rồng đất Komodo bước đi oai vệ trên nền đất nâu'
  },
  {
    id: 'dragon8',
    word: 'rồng con',
    dinoName: 'Rồng Râu Con (Baby Bearded Dragon)',
    audioKey: 'dragon_baby',
    spellKey: 'spell_dragon_baby',
    breakdown: 'r - ông - huyền, c - on',
    spellText: 'Rờ - ông - rông - huyền - rồng, cờ - on - con -> rồng con',
    icon: DRAGON_PHOTOS.baby,
    ja: 'フトアゴヒゲトカゲ (Rồng Bé)',
    funFact: 'Chú rồng râu nhỏ nhắn đáng yêu sưởi nắng trên cát vàng với hàng gai nhỏ xíu bên cổ!',
    example: 'Chú rồng con hiền lành phơi nắng trên cát vàng'
  }
];

const DRAGON_QUIZ_DATA = [
  { question: 'Bảo Long ơi, loài rồng nào có thân đỏ rực và đôi cánh lớn dang rộng giữa trời xanh?', correctId: 'dragon1', options: ['dragon1', 'dragon2', 'dragon3', 'dragon4'] },
  { question: 'Loài rồng biển nào có thật ngoài đại dương, toàn thân xanh bạc óng ánh?', correctId: 'dragon2', options: ['dragon2', 'dragon1', 'dragon5', 'dragon7'] },
  { question: 'Chú rồng nào được tạc bằng khối băng tuyết trong suốt lấp lánh tại Nhật Bản?', correctId: 'dragon3', options: ['dragon3', 'dragon6', 'dragon4', 'dragon1'] },
  { question: 'Loài rồng nào có thân màu xanh ngọc bích nâng viên ngọc sáng giữa rừng cây xanh?', correctId: 'dragon4', options: ['dragon4', 'dragon2', 'dragon7', 'dragon8'] },
  { question: 'Tượng rồng nào toàn thân óng ánh màu vàng rực rỡ — biểu tượng may mắn phương Đông?', correctId: 'dragon5', options: ['dragon5', 'dragon1', 'dragon6', 'dragon3'] },
  { question: 'Chú rồng nào đứng trên bệ đá cổ với đôi cánh rộng và chiếc đuôi hình mũi tên?', correctId: 'dragon6', options: ['dragon6', 'dragon3', 'dragon5', 'dragon2'] },
  { question: 'Đâu là Rồng Komodo khổng lồ có thật bước đi oai vệ trên mặt đất với da vảy cứng?', correctId: 'dragon7', options: ['dragon7', 'dragon4', 'dragon1', 'dragon5'] },
  { question: 'Bảo Long hãy tìm chú Rồng Con nhỏ xíu đáng yêu đang sưởi nắng trên cát vàng nhé!', correctId: 'dragon8', options: ['dragon8', 'dragon3', 'dragon2', 'dragon6'] }
];

// State Thế Giới Rồng
let currentDragonSubMode = 'explore'; // 'explore' | 'quiz' | 'memory'
let dragonAutoTimer = null;
let dragonAutoRunning = false;
let dragonEpoch = 0;

// Quiz Rồng state
let dragonQuizIdx = 0;
let dragonQuizScore = 0;
let dragonQuizList = [];

// Memory Rồng state
let dragonMemFlips = 0;
let dragonMemMatched = 0;
let dragonMemFlipped = [];
let dragonMemLocked = false;

function stopDragonAutoPlay() {
  dragonAutoRunning = false;
  if (dragonAutoTimer) {
    clearTimeout(dragonAutoTimer);
    dragonAutoTimer = null;
  }
  const btn = document.getElementById('btnAutoPlayDragons');
  if (btn) {
    btn.classList.remove('playing');
    btn.innerHTML = '<span>🎧</span> Nghe cả 8 loài Rồng';
  }
  document.querySelectorAll('#dragonCardsContainer .dragon-card.is-speaking-active').forEach(c => c.classList.remove('is-speaking-active'));
}

function renderDragonHub() {
  const btnRoar = document.getElementById('btnDragonRoar');
  if (btnRoar) {
    btnRoar.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile('cheer_dragon_roar', null, 'Rồng thiêng gầm vang chào Bảo Long!');
      if (typeof fireConfetti === 'function') fireConfetti();
    };
  }
  switchDragonSubMode(currentDragonSubMode);
}

function switchDragonSubMode(sub) {
  stopDragonAutoPlay();
  window.soundMgr.stopAll();
  dragonEpoch++;
  currentDragonSubMode = sub;

  const panes = {
    explore: ['dragonCardsContainer', 'btnDragonModeExplore'],
    quiz: ['dragonQuizPane', 'btnDragonModeQuiz'],
    memory: ['dragonMemoryPane', 'btnDragonModeMemory']
  };
  Object.entries(panes).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === sub ? (k === 'explore' ? 'grid' : 'block') : 'none';
    if (b) b.classList.toggle('active', k === sub);
  });

  if (sub === 'explore') renderDragonCardsView();
  else if (sub === 'quiz') initDragonQuiz();
  else if (sub === 'memory') initDragonMemoryGame();
}

function renderDragonCardsView() {
  const container = document.getElementById('dragonCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const btnAuto = document.getElementById('btnAutoPlayDragons');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (currentDragonSubMode !== 'explore') {
        switchDragonSubMode('explore');
      }
      if (dragonAutoRunning || btnAuto.classList.contains('playing')) {
        stopDragonAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopDragonAutoPlay();
      dragonAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng nghe';

      let idx = 0;
      const cards = document.querySelectorAll('#dragonCardsContainer .dragon-card');
      function nextDragon() {
        if (!dragonAutoRunning) return;
        if (idx >= DRAGON_LESSONS.length) {
          stopDragonAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 Bảo Long đã nghe xong 8 loài Rồng Thần!');
          return;
        }
        document.querySelectorAll('#dragonCardsContainer .dragon-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = DRAGON_LESSONS[idx];
        window.soundMgr.speakWordObj(cur, () => {
          if (!dragonAutoRunning) return;
          idx++;
          dragonAutoTimer = setTimeout(nextDragon, 550);
        });
      }
      nextDragon();
    };
  }

  DRAGON_LESSONS.forEach((dg, idx) => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(dg.id);
    const card = document.createElement('div');
    card.className = `word-card dragon-card ${learned ? 'is-learned' : ''}`;
    card.dataset.wordId = dg.id;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '🐉'}</div>
      <div class="word-icon-img">${dg.icon}</div>
      <div class="word-dino-title">${dg.dinoName}</div>
      <div class="word-text" style="color: #b91c1c;">${dg.word}</div>
      <div class="word-action-tag" style="background:#fee2e2; color:#991b1b;">${learned ? 'Đã thuộc ✓' : 'Khám phá ngay'}</div>
      <div class="word-ja-sub">${dg.ja}</div>
      <div class="word-fact-tag">🔥 ${dg.funFact}</div>
    `;
    card.addEventListener('click', () => {
      if (typeof openModal === 'function') openModal(dg, DRAGON_LESSONS, idx);
    });
    container.appendChild(card);
  });
}

// ========================================================
// ĐỐ VUI LOÀI RỒNG (8 CÂU HỎI)
// ========================================================
function initDragonQuiz() {
  dragonQuizList = [...DRAGON_QUIZ_DATA].sort(() => Math.random() - 0.5);
  dragonQuizIdx = 0;
  dragonQuizScore = 0;
  document.getElementById('dragonQuizPlayStage').style.display = 'block';
  document.getElementById('dragonQuizVictoryStage').style.display = 'none';
  loadDragonQuizQuestion();
}

function loadDragonQuizQuestion() {
  dragonEpoch++;
  const myNav = window.appNavEpoch || 0;
  const myEp = dragonEpoch;
  if (dragonQuizIdx >= dragonQuizList.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_dragon_win', null, 'Chúc mừng Bảo Long chiến thắng!');
    if (typeof awardStars === 'function') awardStars(15, 'Chiến binh Vương Quốc Rồng!');

    document.getElementById('dragonQuizPlayStage').style.display = 'none';
    document.getElementById('dragonQuizVictoryStage').style.display = 'block';
    document.getElementById('dragonQuizVictoryScore').innerText =
      `Bảo Long đạt ${dragonQuizScore} điểm Đố Vui Loài Rồng (+15 ⭐ vào Kho Báu)!`;
    return;
  }

  const q = dragonQuizList[dragonQuizIdx];
  const targetObj = DRAGON_LESSONS.find(d => d.id === q.correctId);
  const origIdx = DRAGON_LESSONS.length ? (DRAGON_QUIZ_DATA.findIndex(x => x.question === q.question) + 1) : 0;
  const riddleKey = origIdx > 0 ? `drquiz_${origIdx}` : (targetObj ? targetObj.audioKey : '');
  document.getElementById('dragonQuizProgressText').innerText = `Câu ${dragonQuizIdx + 1} / ${dragonQuizList.length}`;
  document.getElementById('dragonQuizScoreText').innerText = `⭐ ${dragonQuizScore} điểm`;
  document.getElementById('dragonQuizQuestionTitle').innerText = q.question;
  const jaOnly = targetObj ? targetObj.ja.replace(/\s*\([^)]*\)/g, '').trim() : '';
  document.getElementById('dragonQuizHintJa').innerText = jaOnly ? `🇯🇵 ${jaOnly}` : '';

  const grid = document.getElementById('dragonQuizOptionsGrid');
  grid.innerHTML = '';
  let locked = false;
  const qBoxEl = document.querySelector('#dragonQuizPlayStage .quiz-question-box');
  const drTourSteps = [{ key: riddleKey, fallbackText: q.question, el: qBoxEl, pauseAfterMs: 220 }];

  [...q.options].sort(() => Math.random() - 0.5).forEach(optId => {
    const item = DRAGON_LESSONS.find(d => d.id === optId);
    if (!item) return;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe tên Rồng">🔊</button>
      <div class="quiz-opt-icon">${item.icon}</div>
      <div class="quiz-opt-name">${item.dinoName}</div>
      <div class="quiz-opt-ja">🇯🇵 ${item.ja}</div>
    `;
    const spkBtn = card.querySelector('.quiz-opt-speak-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(item.audioKey, null, item.dinoName);
      });
    }
    drTourSteps.push({ key: item.audioKey, fallbackText: item.dinoName, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (item.id === q.correctId) {
        locked = true;
        card.classList.add('correct');
        dragonQuizScore += 10;
        document.getElementById('dragonQuizScoreText').innerText = `⭐ ${dragonQuizScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        if (typeof showToast === 'function') showToast(`🔥 Tuyệt đỉnh! Chính là ${item.dinoName}!`);
        window.soundMgr.playPraiseThen(false,
          () => (window.appNavEpoch || 0) === myNav && dragonEpoch === myEp,
          () => {
            dragonQuizIdx++;
            loadDragonQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        if (typeof showToast === 'function') showToast('🐉 Chú Rồng này chưa đúng rồi, chọn lại nhé Bảo Long!');
      }
    });
    grid.appendChild(card);
  });

  const playDrTour = () => window.soundMgr.playChoiceTour(drTourSteps);
  document.getElementById('btnHearDragonQuiz').onclick = () => {
    window.soundMgr.playClick();
    playDrTour();
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && dragonEpoch === myEp) {
      playDrTour();
    }
  }, 60);
}

// ========================================================
// LẬT THẺ RỒNG THẦN (6 CẶP = 12 THẺ NGẪU NHIÊN TỪ 8 LOÀI RỒNG)
// ========================================================
function initDragonMemoryGame() {
  const grid = document.getElementById('dragonMemoryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  dragonEpoch++;
  const myNav = window.appNavEpoch || 0;
  const myEp = dragonEpoch;

  document.getElementById('dragonMemoryPlayStage').style.display = 'block';
  document.getElementById('dragonMemoryVictoryStage').style.display = 'none';

  dragonMemFlips = 0;
  dragonMemMatched = 0;
  dragonMemFlipped = [];
  dragonMemLocked = false;
  document.getElementById('dragonMemFlipsText').innerText = '👀 Lượt lật: 0';
  document.getElementById('dragonMemPairsText').innerText = '⭐ Đã ghép: 0 / 6 cặp';

  const picked = [...DRAGON_LESSONS].sort(() => Math.random() - 0.5).slice(0, 6);
  const deck = [];
  picked.forEach(dg => {
    deck.push({ ...dg, inst: `${dg.id}_a` });
    deck.push({ ...dg, inst: `${dg.id}_b` });
  });
  deck.sort(() => Math.random() - 0.5);

  deck.forEach(cardData => {
    const el = document.createElement('div');
    el.className = 'memory-card dragon-memory-card';
    el.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-face memory-card-back dragon-card-back">
          <div class="card-back-icon">🐉</div>
          <div class="card-back-label">Bảo Long</div>
        </div>
        <div class="memory-card-face memory-card-front">
          <div class="card-dino-icon">${cardData.icon}</div>
          <div class="card-dino-name" style="color:#b91c1c;">${cardData.word}</div>
          <div class="card-dino-ja">${cardData.ja}</div>
        </div>
      </div>
    `;
    el.addEventListener('click', () => {
      if (dragonMemLocked || el.classList.contains('is-flipped') || el.classList.contains('is-matched')) return;
      window.soundMgr.playClick();
      el.classList.add('is-flipped');
      dragonMemFlipped.push({ data: cardData, el });

      if (dragonMemFlipped.length === 2) {
        dragonMemFlips++;
        document.getElementById('dragonMemFlipsText').innerText = `👀 Lượt lật: ${dragonMemFlips}`;
        dragonMemLocked = true;
        const [a, b] = dragonMemFlipped;
        if (a.data.id === b.data.id) {
          setTimeout(() => {
            if ((window.appNavEpoch || 0) !== myNav || dragonEpoch !== myEp) return;
            a.el.classList.add('is-matched');
            b.el.classList.add('is-matched');
            dragonMemMatched++;
            document.getElementById('dragonMemPairsText').innerText = `⭐ Đã ghép: ${dragonMemMatched} / 6 cặp`;
            window.soundMgr.playCorrect();
            if (typeof showToast === 'function') showToast(`🔥 Tuyệt! Đã tìm thấy cặp ${a.data.word}!`);
            window.soundMgr.playAudioFile(a.data.audioKey);
            dragonMemFlipped = [];
            dragonMemLocked = false;
            if (dragonMemMatched === 6) {
              setTimeout(() => {
                if ((window.appNavEpoch || 0) !== myNav || dragonEpoch !== myEp) return;
                if (typeof fireConfetti === 'function') fireConfetti();
                window.soundMgr.playVictory();
                window.soundMgr.playAudioFile('cheer_dragon_win', null, 'Hoan hô Bảo Long!');
                if (typeof awardStars === 'function') awardStars(15, 'Chiến thắng Lật Thẻ Rồng Thần!');
                document.getElementById('dragonMemoryPlayStage').style.display = 'none';
                document.getElementById('dragonMemoryVictoryStage').style.display = 'block';
                document.getElementById('dragonMemoryVictoryFlips').innerText =
                  `Bảo Long đã mở khóa 6 loài Rồng chỉ trong ${dragonMemFlips} lượt lật (+15 ⭐)!`;
              }, 550);
            }
          }, 240);
        } else {
          setTimeout(() => {
            if ((window.appNavEpoch || 0) !== myNav || dragonEpoch !== myEp) return;
            a.el.classList.remove('is-flipped');
            b.el.classList.remove('is-flipped');
            dragonMemFlipped = [];
            dragonMemLocked = false;
          }, 650);
        }
      }
    });
    grid.appendChild(el);
  });
}
