// ========================================================
// MODULE TOÁN LỚP 1 DÀNH CHO BÉ BẢO LONG (6 TUỔI)
// Gồm 5 phần chuẩn SGK Lớp 1:
// 1. Số đếm 0 - 100 & đếm hình trực quan (Khủng long / Xe)
// 2. Cộng & Trừ phạm vi 10 / 20 (Có thanh đếm trực quan)
// 3. So sánh Lớn hơn (>), Bé hơn (<), Bằng nhau (=)
// 4. Tìm số còn thiếu & Dãy số tàu Shinkansen
// 5. Hình học Lớp 1 & Thực hành xem Đồng hồ giờ đúng (1 - 12h)
// ========================================================

const MATH_NUMBERS_DATA = [
  { num: 0, word: 'không', ja: 'ゼロ / れい (Zero)', emoji: '🥚', desc: 'Không có quả trứng nào!' },
  { num: 1, word: 'một', ja: 'いち (Ichi)', emoji: '🦖', desc: '1 chú khủng long T-Rex dũng mãnh' },
  { num: 2, word: 'hai', ja: 'に (Ni)', emoji: '🚗', desc: '2 chiếc xe ô tô chạy bon bon' },
  { num: 3, word: 'ba', ja: 'さん (San)', emoji: '🦕', desc: '3 chú khủng long cổ dài' },
  { num: 4, word: 'bốn', ja: 'よん / し (Yon)', emoji: '🚒', desc: '4 chiếc xe cứu hỏa đỏ rực' },
  { num: 5, word: 'năm', ja: 'ご (Go)', emoji: '⭐', desc: '5 ngôi sao vàng trên một bàn tay' },
  { num: 6, word: 'sáu', ja: 'ろく (Roku)', emoji: '🍎', desc: '6 quả táo đỏ thơm ngon' },
  { num: 7, word: 'bảy', ja: 'なな / しち (Nana)', emoji: '🚅', desc: '7 toa tàu Shinkansen siêu tốc' },
  { num: 8, word: 'tám', ja: 'はち (Hachi)', emoji: '🍓', desc: '8 quả dâu tây chín mọng' },
  { num: 9, word: 'chín', ja: 'きゅう (Kyuu)', emoji: '🚁', desc: '9 chiếc trực thăng bay cao' },
  { num: 10, word: 'mười', ja: 'じゅう (Juu)', emoji: '🦖', desc: '1 chục = 10 ngón tay hai bàn tay!' },
  { num: 11, word: 'mười một', ja: 'じゅういち (Juu-ichi)', emoji: '⚽', desc: '1 chục và 1 đơn vị = 11' },
  { num: 12, word: 'mười hai', ja: 'じゅうに (Juu-ni)', emoji: '🍌', desc: '1 chục và 2 đơn vị = 12' },
  { num: 13, word: 'mười ba', ja: 'じゅうさん (Juu-san)', emoji: '🚔', desc: '1 chục và 3 đơn vị = 13' },
  { num: 14, word: 'mười bốn', ja: 'じゅうよん (Juu-yon)', emoji: '🍉', desc: '1 chục và 4 đơn vị = 14' },
  { num: 15, word: 'mười lăm', ja: 'じゅうご (Juu-go)', emoji: '🦕', desc: 'Chú ý đọc là "mười lăm" (không đọc năm)!' },
  { num: 16, word: 'mười sáu', ja: 'じゅうろく (Juu-roku)', emoji: '🌟', desc: '1 chục và 6 đơn vị = 16' },
  { num: 17, word: 'mười bảy', ja: 'じゅうなな (Juu-nana)', emoji: '🚀', desc: '1 chục và 7 đơn vị = 17' },
  { num: 18, word: 'mười tám', ja: 'じゅうはち (Juu-hachi)', emoji: '🍬', desc: '1 chục và 8 đơn vị = 18' },
  { num: 19, word: 'mười chín', ja: 'じゅうきゅう (Juu-kyuu)', emoji: '🎈', desc: '1 chục và 9 đơn vị = 19' },
  { num: 20, word: 'hai mươi', ja: 'にじゅう (Ni-juu)', emoji: '🏆', desc: '2 chục = 20 đơn vị!' }
];

const MATH_TENS_DATA = [
  { num: 30, word: 'ba mươi', ja: 'さんじゅう (30)' },
  { num: 40, word: 'bốn mươi', ja: 'よんじゅう (40)' },
  { num: 50, word: 'năm mươi', ja: 'ごじゅう (50)' },
  { num: 60, word: 'sáu mươi', ja: 'ろくじゅう (60)' },
  { num: 70, word: 'bảy mươi', ja: 'ななじゅう (70)' },
  { num: 80, word: 'tám mươi', ja: 'はちじゅう (80)' },
  { num: 90, word: 'chín mươi', ja: 'きゅうじゅう (90)' },
  { num: 100, word: 'một trăm', ja: 'ひゃく (100)' }
];

const MATH_SHAPES_DATA = [
  {
    id: 'tron',
    name: 'Hình tròn',
    audioKey: 'math_shape_tron',
    ja: 'まる / えん (Maru)',
    traits: 'Đường bao cong khép kín, lăn tròn được khắp nơi!',
    examples: 'Mặt trời ☀️, Bánh xe 🛞, Mặt đồng hồ 🕒',
    svg: `<svg viewBox="0 0 100 100" class="math-shape-svg"><circle cx="50" cy="50" r="38" fill="#f43f5e" stroke="#be123c" stroke-width="5"/></svg>`
  },
  {
    id: 'vuong',
    name: 'Hình vuông',
    audioKey: 'math_shape_vuong',
    ja: 'しかく / せいほうけい',
    traits: 'Có 4 cạnh dài BẰNG NHAU và 4 góc vuông vắn!',
    examples: 'Ô cửa sổ 🪟, Khối Rubik 🧊, Viên gạch vuông',
    svg: `<svg viewBox="0 0 100 100" class="math-shape-svg"><rect x="16" y="16" width="68" height="68" rx="4" fill="#3b82f6" stroke="#1d4ed8" stroke-width="5"/></svg>`
  },
  {
    id: 'tam_giac',
    name: 'Hình tam giác',
    audioKey: 'math_shape_tam_giac',
    ja: 'さんかく (Sankaku)',
    traits: 'Có đúng 3 cạnh thẳng và 3 góc nhọn!',
    examples: 'Mái nhà 🏠, Miếng bánh pizza 🍕, Cờ tam giác 🚩',
    svg: `<svg viewBox="0 0 100 100" class="math-shape-svg"><polygon points="50,14 88,82 12,82" fill="#f59e0b" stroke="#b45309" stroke-width="5" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'chu_nhat',
    name: 'Hình chữ nhật',
    audioKey: 'math_shape_chu_nhat',
    ja: 'ちょうほうけい (Hình chữ nhật)',
    traits: 'Có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau!',
    examples: 'Quyển sách 📖, Cánh cửa 🚪, Chiếc điện thoại 📱',
    svg: `<svg viewBox="0 0 100 100" class="math-shape-svg"><rect x="10" y="26" width="80" height="48" rx="4" fill="#10b981" stroke="#047857" stroke-width="5"/></svg>`
  }
];

const MATH_CLOCK_SCHEDULE = {
  1: '1 giờ trưa: Bảo Long nghỉ trưa ngoan nhé 😴',
  2: '2 giờ chiều: Thời gian chơi xếp hình vui vẻ 🧩',
  3: '3 giờ chiều: Ăn bữa xế uống sữa tươi 🥛',
  4: '4 giờ chiều: Đạp xe ngoài công viên 🚲',
  5: '5 giờ chiều: Về nhà phụ ba mẹ dọn đồ chơi 🧹',
  6: '6 giờ tối: Cả nhà cùng ăn cơm ngon 🍚',
  7: '7 giờ: Buổi sáng đánh răng ăn sáng / Buổi tối học bài 📖',
  8: '8 giờ: Học tiếng Việt & Toán cùng ba nhé! 🧮',
  9: '9 giờ tối: Đánh răng đi ngủ đúng giờ để mau lớn 🌙',
  10: '10 giờ: Giấc ngủ ngon mơ về khủng long 🦖',
  11: '11 giờ: Trưa sắp ăn cơm hoặc đêm ngủ say ☀️',
  12: '12 giờ trưa: Giờ ăn cơm trưa ngon lành 🍱'
};

// State Toán Lớp 1
let currentMathTab = 'numbers'; // 'numbers' | 'calc' | 'compare' | 'sequence' | 'geometry'
let mathSessionScore = 0;

// Tab 1: Số đếm
let mathSpotlightNum = 5;
let mathNumbersAutoTimer = null;

// Tab 2: Cộng & Trừ
let mathCalcMode = 'max10'; // 'max10' | 'max20' | 'onlyPlus' | 'onlyMinus'
let mathCalcShowVisual = true;
let mathCalcQuestions = [];
let mathCalcIndex = 0;
let mathCalcScore = 0;
let mathCalcStreak = 0;

// Tab 3: So sánh
let mathCmpMode = 'simple'; // 'simple' | 'expr'
let mathCmpQuestions = [];
let mathCmpIndex = 0;
let mathCmpScore = 0;

// Tab 4: Dãy số Shinkansen
let mathSeqQuestions = [];
let mathSeqIndex = 0;
let mathSeqScore = 0;

// Tab 5: Hình học & Đồng hồ
let mathCurrentHour = 3;
let mathGeoQuizQuestions = [];
let mathGeoQuizIndex = 0;
let mathGeoQuizScore = 0;
let mathGeoMode = 'learn'; // 'learn' | 'quiz'

function addMathSessionScore(pts) {
  mathSessionScore += pts;
  const el = document.getElementById('mathSessionStars');
  if (el) el.innerText = `⭐ Điểm Toán hôm nay: ${mathSessionScore}`;
}

function renderMathHub() {
  const scoreEl = document.getElementById('mathSessionStars');
  if (scoreEl) scoreEl.innerText = `⭐ Điểm Toán hôm nay: ${mathSessionScore}`;

  switchMathSubTab(currentMathTab);
}

function switchMathSubTab(subtab) {
  stopMathAutoPlay();
  currentMathTab = subtab;

  const tabs = {
    numbers: ['mathPaneNumbers', 'mathTabNumbers'],
    calc: ['mathPaneCalc', 'mathTabCalc'],
    compare: ['mathPaneCompare', 'mathTabCompare'],
    sequence: ['mathPaneSequence', 'mathTabSequence'],
    geometry: ['mathPaneGeometry', 'mathTabGeometry']
  };

  Object.entries(tabs).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });

  if (subtab === 'numbers') renderMathNumbersTab();
  else if (subtab === 'calc') initMathCalcGame();
  else if (subtab === 'compare') initMathCompareGame();
  else if (subtab === 'sequence') initMathSequenceGame();
  else if (subtab === 'geometry') renderMathGeometryTab();
}

function stopMathAutoPlay() {
  if (mathNumbersAutoTimer) {
    clearTimeout(mathNumbersAutoTimer);
    mathNumbersAutoTimer = null;
  }
  const btn = document.getElementById('btnAutoPlayMathNumbers');
  if (btn) {
    btn.classList.remove('playing');
    btn.innerHTML = '<span>🎧</span> Nghe đếm 0 → 20';
  }
  document.querySelectorAll('.math-num-card.is-speaking-active').forEach(c => c.classList.remove('is-speaking-active'));
}

// ========================================================
// PHẦN 1: BẢNG SỐ ĐẾM 0 - 100 & ĐẾM HÌNH TRỰC QUAN
// ========================================================
function renderMathNumbersTab() {
  const grid = document.getElementById('mathNumbersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  MATH_NUMBERS_DATA.forEach(item => {
    const dotsCount = Math.min(item.num, 10);
    const dotsHtml = item.num === 0
      ? '<span style="font-size:11px; color:#94a3b8;">(trống)</span>'
      : `<div class="math-dots-mini">${'<span class="math-dot"></span>'.repeat(dotsCount)}${item.num > 10 ? `<span class="math-dot-plus">+${item.num - 10}</span>` : ''}</div>`;

    const card = document.createElement('button');
    card.className = `math-num-card ${item.num === mathSpotlightNum ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="math-num-digit">${item.num}</div>
      <div class="math-num-word">${item.word}</div>
      ${dotsHtml}
    `;
    card.addEventListener('click', () => {
      stopMathAutoPlay();
      mathSpotlightNum = item.num;
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`math_num_${item.num}`, null, `Số ${item.word}`);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(`math_n_${item.num}`);
        if (isNew && typeof showToast === 'function') {
          showToast(`⭐ +2 Sao! Bảo Long đã học Số ${item.num} (${item.word})!`);
        }
      }
      renderMathNumbersTab();
    });
    grid.appendChild(card);
  });

  // Render spotlight
  updateMathNumberSpotlight();

  // Render tens 30..100
  const tensGrid = document.getElementById('mathTensGrid');
  if (tensGrid) {
    tensGrid.innerHTML = '';
    MATH_TENS_DATA.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'math-ten-pill';
      btn.innerHTML = `<strong>${t.num}</strong> <span>${t.word}</span>`;
      btn.addEventListener('click', () => {
        stopMathAutoPlay();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(`math_num_${t.num}`, null, `Số ${t.word}`);
        if (typeof showToast === 'function') showToast(`🔢 Số ${t.num}: đọc là "${t.word}" • 🇯🇵 ${t.ja}`);
      });
      tensGrid.appendChild(btn);
    });
  }

  // Auto-play 0 -> 20 button
  const btnAuto = document.getElementById('btnAutoPlayMathNumbers');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (mathNumbersAutoTimer) {
        stopMathAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đếm';
      let idx = 0;
      const cards = document.querySelectorAll('#mathNumbersGrid .math-num-card');

      function nextNum() {
        if (idx >= MATH_NUMBERS_DATA.length) {
          stopMathAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 Tuyệt vời! Bảo Long đã đếm từ 0 đến 20!');
          return;
        }
        document.querySelectorAll('#mathNumbersGrid .math-num-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = MATH_NUMBERS_DATA[idx];
        mathSpotlightNum = cur.num;
        updateMathNumberSpotlight();

        window.soundMgr.playAudioFile(`math_num_${cur.num}`, () => {
          idx++;
          mathNumbersAutoTimer = setTimeout(nextNum, 450);
        }, `Số ${cur.word}`);
      }
      nextNum();
    };
  }
}

function updateMathNumberSpotlight() {
  const item = MATH_NUMBERS_DATA.find(x => x.num === mathSpotlightNum) || MATH_NUMBERS_DATA[0];
  document.getElementById('mathSpotDigit').innerText = item.num;
  document.getElementById('mathSpotWord').innerText = item.word;
  document.getElementById('mathSpotJa').innerText = `🇯🇵 ${item.ja}`;
  document.getElementById('mathSpotDesc').innerText = item.desc;

  const itemsContainer = document.getElementById('mathSpotCountIcons');
  itemsContainer.innerHTML = '';

  if (item.num === 0) {
    itemsContainer.innerHTML = '<span style="color:#64748b; font-weight:800;">🐣 Số 0 nghĩa là không có đồ vật nào!</span>';
  } else {
    for (let i = 1; i <= item.num; i++) {
      const tok = document.createElement('button');
      tok.className = 'count-tap-token';
      tok.innerHTML = `<span class="tok-emoji">${item.emoji}</span><span class="tok-badge">${i}</span>`;
      tok.title = `Chạm để đếm số ${i}`;
      tok.addEventListener('click', () => {
        tok.classList.add('counted');
        window.soundMgr.playPop();
        window.soundMgr.playAudioFile(`math_v_${i}`, null, `${i}`);
      });
      itemsContainer.appendChild(tok);
    }
  }

  document.getElementById('btnHearSpotNum').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(`math_num_${item.num}`, null, `Số ${item.word}`);
  };
}

// ========================================================
// PHẦN 2: CỘNG & TRỪ PHẠM VI 10 / 20 CÓ HÌNH TRỰC QUAN
// ========================================================
function initMathCalcGame(mode = mathCalcMode) {
  mathCalcMode = mode;

  document.querySelectorAll('.math-calc-filter').forEach(btn => {
    btn.classList.toggle('active-filter', btn.dataset.mode === mode);
    btn.onclick = () => {
      window.soundMgr.playClick();
      initMathCalcGame(btn.dataset.mode);
    };
  });

  const btnVisual = document.getElementById('btnToggleCalcVisual');
  if (btnVisual) {
    btnVisual.innerText = mathCalcShowVisual ? '👁️ Hình đếm: BẬT' : '🙈 Hình đếm: TẮT';
    btnVisual.onclick = () => {
      mathCalcShowVisual = !mathCalcShowVisual;
      btnVisual.innerText = mathCalcShowVisual ? '👁️ Hình đếm: BẬT' : '🙈 Hình đếm: TẮT';
      renderCalcVisualBox(mathCalcQuestions[mathCalcIndex]);
    };
  }

  // Generate 10 clean, age-appropriate math questions
  mathCalcQuestions = [];
  const usedPairs = new Set();
  let guard = 0;
  while (mathCalcQuestions.length < 10 && guard < 200) {
    guard++;
    const isPlus = mode === 'onlyPlus' ? true : (mode === 'onlyMinus' ? false : Math.random() < 0.55);
    const maxLim = mode === 'max20' ? 20 : 10;

    let a, b, ans, op;
    if (isPlus) {
      op = '+';
      if (maxLim === 20) {
        ans = 6 + Math.floor(Math.random() * 15); // 6..20
        a = 1 + Math.floor(Math.random() * (ans - 1));
      } else {
        ans = 2 + Math.floor(Math.random() * 9); // 2..10
        a = 1 + Math.floor(Math.random() * (ans - 1));
      }
      b = ans - a;
    } else {
      op = '-';
      a = maxLim === 20 ? (6 + Math.floor(Math.random() * 15)) : (2 + Math.floor(Math.random() * 9));
      b = 1 + Math.floor(Math.random() * a); // allow 0 result sometimes
      ans = a - b;
    }

    const sig = `${a}${op}${b}`;
    if (usedPairs.has(sig)) continue;
    usedPairs.add(sig);

    // 3 plausible close distractors in [0..maxLim]
    const choices = new Set([ans]);
    while (choices.size < 4) {
      const delta = [-3, -2, -1, 1, 2, 3, 4][Math.floor(Math.random() * 7)];
      const cand = ans + delta;
      if (cand >= 0 && cand <= maxLim) choices.add(cand);
    }

    mathCalcQuestions.push({
      a, b, op, ans,
      choices: Array.from(choices).sort(() => Math.random() - 0.5),
      emoji: ['🦖', '🦕', '🚗', '🚅', '🍎', '⭐'][Math.floor(Math.random() * 6)]
    });
  }

  mathCalcIndex = 0;
  mathCalcScore = 0;
  mathCalcStreak = 0;

  document.getElementById('mathCalcPlayStage').style.display = 'block';
  document.getElementById('mathCalcVictoryStage').style.display = 'none';
  loadMathCalcQuestion();
}

function speakCalcEquation(q, withResult = false) {
  const opKey = q.op === '+' ? 'math_op_plus' : 'math_op_minus';
  const keys = withResult
    ? [`math_v_${q.a}`, opKey, `math_v_${q.b}`, 'math_eq_word', `math_v_${q.ans}`]
    : [`math_v_${q.a}`, opKey, `math_v_${q.b}`, 'math_q_eq'];
  const fb = withResult
    ? `${q.a} ${q.op === '+' ? 'cộng' : 'trừ'} ${q.b} bằng ${q.ans}`
    : `${q.a} ${q.op === '+' ? 'cộng' : 'trừ'} ${q.b} bằng mấy`;
  window.soundMgr.playAudioSequence(keys, null, fb);
}

function renderCalcVisualBox(q) {
  const box = document.getElementById('mathCalcVisualBox');
  if (!box || !q) return;
  if (!mathCalcShowVisual) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'flex';
  box.innerHTML = '';

  if (q.op === '+') {
    const grpA = document.createElement('div');
    grpA.className = 'calc-visual-group';
    for (let i = 1; i <= q.a; i++) {
      const sp = document.createElement('span');
      sp.className = 'calc-vis-item';
      sp.innerText = q.emoji;
      sp.onclick = () => {
        sp.classList.add('tapped');
        window.soundMgr.playPop();
        window.soundMgr.playAudioFile(`math_v_${i}`, null, `${i}`);
      };
      grpA.appendChild(sp);
    }

    const opEl = document.createElement('div');
    opEl.className = 'calc-vis-op';
    opEl.innerText = '➕';

    const grpB = document.createElement('div');
    grpB.className = 'calc-vis-group calc-group-b';
    for (let j = 1; j <= q.b; j++) {
      const sp = document.createElement('span');
      sp.className = 'calc-vis-item';
      sp.innerText = q.emoji === '🦖' ? '🦕' : q.emoji;
      const totalCount = q.a + j;
      sp.onclick = () => {
        sp.classList.add('tapped');
        window.soundMgr.playPop();
        window.soundMgr.playAudioFile(`math_v_${totalCount}`, null, `${totalCount}`);
      };
      grpB.appendChild(sp);
    }

    box.appendChild(grpA);
    box.appendChild(opEl);
    box.appendChild(grpB);
  } else {
    // Subtraction: show `a` total items, last `b` crossed out!
    const grp = document.createElement('div');
    grp.className = 'calc-visual-group';
    for (let i = 1; i <= q.a; i++) {
      const isCrossed = i > q.ans;
      const sp = document.createElement('span');
      sp.className = `calc-vis-item ${isCrossed ? 'crossed' : ''}`;
      sp.innerHTML = isCrossed ? `${q.emoji}<span class="cross-mark">❌</span>` : q.emoji;
      if (!isCrossed) {
        sp.onclick = () => {
          sp.classList.add('tapped');
          window.soundMgr.playPop();
          window.soundMgr.playAudioFile(`math_v_${i}`, null, `${i}`);
        };
      }
      grp.appendChild(sp);
    }
    box.appendChild(grp);
  }
}

function loadMathCalcQuestion() {
  if (mathCalcIndex >= mathCalcQuestions.length) {
    showMathCalcVictory();
    return;
  }

  const q = mathCalcQuestions[mathCalcIndex];
  document.getElementById('mathCalcProgressText').innerText = `Câu ${mathCalcIndex + 1} / ${mathCalcQuestions.length}`;
  document.getElementById('mathCalcStreakBadge').innerText = `🔥 Chuỗi x${mathCalcStreak}`;
  document.getElementById('mathCalcScoreText').innerText = `⭐ ${mathCalcScore} điểm`;

  document.getElementById('mathEqA').innerText = q.a;
  document.getElementById('mathEqOp').innerText = q.op;
  document.getElementById('mathEqB').innerText = q.b;
  const ansSlot = document.getElementById('mathEqAns');
  ansSlot.innerText = '?';
  ansSlot.classList.remove('solved');

  renderCalcVisualBox(q);

  document.getElementById('btnHearCalc').onclick = () => {
    window.soundMgr.playClick();
    speakCalcEquation(q, false);
  };
  setTimeout(() => speakCalcEquation(q, false), 250);

  const optsGrid = document.getElementById('mathCalcOptionsGrid');
  optsGrid.innerHTML = '';
  q.choices.forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'math-ans-btn';
    btn.innerText = num;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
      if (num === q.ans) {
        btn.classList.add('correct');
        ansSlot.innerText = q.ans;
        ansSlot.classList.add('solved');
        mathCalcStreak++;
        const pts = mathCalcStreak >= 3 ? 15 : 10;
        mathCalcScore += pts;
        addMathSessionScore(pts);

        document.getElementById('mathCalcStreakBadge').innerText = `🔥 Chuỗi x${mathCalcStreak}`;
        document.getElementById('mathCalcScoreText').innerText = `⭐ ${mathCalcScore} điểm`;

        window.soundMgr.playCorrect();
        fireConfetti();
        setTimeout(() => speakCalcEquation(q, true), 350);
        if (typeof showToast === 'function') {
          showToast(`🎉 Chuẩn luôn! ${q.a} ${q.op} ${q.b} = ${q.ans}!`);
        }

        setTimeout(() => {
          mathCalcIndex++;
          loadMathCalcQuestion();
        }, 2100);
      } else {
        btn.classList.add('wrong');
        mathCalcStreak = 0;
        document.getElementById('mathCalcStreakBadge').innerText = `🔥 Chuỗi x0`;
        window.soundMgr.playWrong();
        if (typeof showToast === 'function') showToast('🧮 Bảo Long thử đếm lại các hình gợi ý bên trên xem nhé! ❤️');
      }
    });
    optsGrid.appendChild(btn);
  });
}

function showMathCalcVictory() {
  fireConfetti();
  window.soundMgr.playVictory();
  window.soundMgr.playAudioFile('cheer_math_win', null, 'Hoan hô Bảo Long tính toán siêu đỉnh quá!');
  if (typeof awardStars === 'function') awardStars(15, 'Hoàn thành 10 phép tính Toán Lớp 1!');

  document.getElementById('mathCalcPlayStage').style.display = 'none';
  document.getElementById('mathCalcVictoryStage').style.display = 'block';
  document.getElementById('mathCalcVictoryScore').innerText =
    `Bảo Long đạt ${mathCalcScore} điểm Cộng Trừ và nhận thêm +15 ⭐ vào Kho Báu!`;
}

// ========================================================
// PHẦN 3: SO SÁNH LỚN HƠN (>), BÉ HƠN (<), BẰNG NHAU (=)
// ========================================================
function initMathCompareGame(mode = mathCmpMode) {
  mathCmpMode = mode;
  document.getElementById('btnCmpSimple')?.classList.toggle('active-filter', mode === 'simple');
  document.getElementById('btnCmpExpr')?.classList.toggle('active-filter', mode === 'expr');

  document.getElementById('btnCmpSimple').onclick = () => {
    window.soundMgr.playClick();
    initMathCompareGame('simple');
  };
  document.getElementById('btnCmpExpr').onclick = () => {
    window.soundMgr.playClick();
    initMathCompareGame('expr');
  };

  mathCmpQuestions = [];
  for (let i = 0; i < 8; i++) {
    const forceEq = i === 2 || i === 6;
    if (mode === 'simple') {
      const a = 1 + Math.floor(Math.random() * 19);
      let b = forceEq ? a : 1 + Math.floor(Math.random() * 19);
      const ans = a > b ? '>' : (a < b ? '<' : '=');
      mathCmpQuestions.push({ leftLabel: String(a), rightLabel: String(b), leftVal: a, rightVal: b, ans });
    } else {
      const a1 = 1 + Math.floor(Math.random() * 7);
      const a2 = 1 + Math.floor(Math.random() * 5);
      const leftVal = a1 + a2;
      const rightVal = forceEq ? leftVal : Math.max(1, leftVal + [-3, -2, -1, 1, 2, 3][Math.floor(Math.random() * 6)]);
      const ans = leftVal > rightVal ? '>' : (leftVal < rightVal ? '<' : '=');
      mathCmpQuestions.push({ leftLabel: `${a1} + ${a2}`, rightLabel: String(rightVal), leftVal, rightVal, ans });
    }
  }

  mathCmpIndex = 0;
  mathCmpScore = 0;
  document.getElementById('mathCmpPlayStage').style.display = 'block';
  document.getElementById('mathCmpVictoryStage').style.display = 'none';
  loadMathCompareQuestion();
}

function loadMathCompareQuestion() {
  if (mathCmpIndex >= mathCmpQuestions.length) {
    fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_math_win', null, 'Hoan hô Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Chuyên gia So Sánh Dấu > < =!');

    document.getElementById('mathCmpPlayStage').style.display = 'none';
    document.getElementById('mathCmpVictoryStage').style.display = 'block';
    document.getElementById('mathCmpVictoryScore').innerText =
      `Bé đã chọn chuẩn xác cả 8 phép so sánh với ${mathCmpScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = mathCmpQuestions[mathCmpIndex];
  document.getElementById('mathCmpProgressText').innerText = `Câu ${mathCmpIndex + 1} / ${mathCmpQuestions.length}`;
  document.getElementById('mathCmpScoreText').innerText = `⭐ ${mathCmpScore} điểm`;

  document.getElementById('cmpLeftNumber').innerText = q.leftLabel;
  document.getElementById('cmpRightNumber').innerText = q.rightLabel;
  document.getElementById('cmpLeftDots').innerHTML = '🍎'.repeat(Math.min(q.leftVal, 10)) + (q.leftVal > 10 ? ` (+${q.leftVal - 10})` : '');
  document.getElementById('cmpRightDots').innerHTML = '🍎'.repeat(Math.min(q.rightVal, 10)) + (q.rightVal > 10 ? ` (+${q.rightVal - 10})` : '');

  const signBox = document.getElementById('cmpCenterSign');
  signBox.innerText = '?';
  signBox.classList.remove('solved');

  document.querySelectorAll('.cmp-choice-btn').forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    btn.onclick = () => {
      if (signBox.classList.contains('solved')) return;
      const chosen = btn.dataset.sign;
      if (chosen === q.ans) {
        btn.classList.add('correct');
        signBox.innerText = q.ans;
        signBox.classList.add('solved');
        mathCmpScore += 10;
        addMathSessionScore(10);
        document.getElementById('mathCmpScoreText').innerText = `⭐ ${mathCmpScore} điểm`;
        window.soundMgr.playCorrect();
        fireConfetti();

        const cmpAudioKey = q.ans === '>' ? 'math_cmp_gt' : (q.ans === '<' ? 'math_cmp_lt' : 'math_cmp_eq');
        window.soundMgr.playAudioSequence([`math_v_${q.leftVal}`, cmpAudioKey, `math_v_${q.rightVal}`], null, `${q.leftVal} ${q.ans} ${q.rightVal}`);

        if (typeof showToast === 'function') {
          showToast(`🐊 Chính xác! ${q.leftLabel} ${q.ans} ${q.rightLabel}!`);
        }

        setTimeout(() => {
          mathCmpIndex++;
          loadMathCompareQuestion();
        }, 1700);
      } else {
        btn.classList.add('wrong');
        window.soundMgr.playWrong();
        if (typeof showToast === 'function') showToast('🐊 Mẹo: Cá sấu há miệng to quay về phía SỐ LỚN HƠN nhé!');
      }
    };
  });
}

// ========================================================
// PHẦN 4: TÌM SỐ CÒN THIẾU & DÃY SỐ TÀU SHINKANSEN
// ========================================================
function initMathSequenceGame() {
  mathSeqQuestions = [];
  for (let i = 0; i < 8; i++) {
    if (i % 2 === 0) {
      // Train sequence: step +1, -1, or +2
      const type = Math.floor(Math.random() * 3);
      let arr, hiddenIdx;
      if (type === 0) {
        const start = 1 + Math.floor(Math.random() * 14);
        arr = [start, start + 1, start + 2, start + 3];
      } else if (type === 1) {
        const start = 5 + Math.floor(Math.random() * 10);
        arr = [start, start - 1, start - 2, start - 3];
      } else {
        const start = [2, 4, 6, 8, 10][Math.floor(Math.random() * 5)];
        arr = [start, start + 2, start + 4, start + 6];
      }
      hiddenIdx = 1 + Math.floor(Math.random() * 2); // hide car 2 or 3
      const ans = arr[hiddenIdx];
      const choices = new Set([ans]);
      while (choices.size < 4) {
        const c = Math.max(0, Math.min(20, ans + [-2, -1, 1, 2, 3][Math.floor(Math.random() * 5)]));
        choices.add(c);
      }
      mathSeqQuestions.push({
        kind: 'sequence',
        cars: arr,
        hiddenIdx,
        ans,
        choices: Array.from(choices).sort((x, y) => x - y),
        hint: type === 1 ? 'Đếm lùi từng 1 số' : (type === 2 ? 'Nhảy cóc thêm 2 số' : 'Đếm tiến thêm 1 số')
      });
    } else {
      // Missing operand: a + ? = c
      const c = 5 + Math.floor(Math.random() * 6); // 5..10
      const a = 1 + Math.floor(Math.random() * (c - 1));
      const ans = c - a;
      const choices = new Set([ans]);
      while (choices.size < 4) {
        const cand = Math.max(0, Math.min(10, ans + [-2, -1, 1, 2, 3][Math.floor(Math.random() * 5)]));
        choices.add(cand);
      }
      mathSeqQuestions.push({
        kind: 'equation',
        a, c, ans,
        choices: Array.from(choices).sort((x, y) => x - y),
        hint: `Từ ${a} đếm thêm mấy để được ${c}?`
      });
    }
  }

  mathSeqIndex = 0;
  mathSeqScore = 0;
  document.getElementById('mathSeqPlayStage').style.display = 'block';
  document.getElementById('mathSeqVictoryStage').style.display = 'none';
  loadMathSequenceQuestion();
}

function loadMathSequenceQuestion() {
  if (mathSeqIndex >= mathSeqQuestions.length) {
    fireConfetti();
    window.soundMgr.playShinkansenWhistle();
    window.soundMgr.playAudioFile('cheer_math_win', null, 'Hoan hô Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Bậc thầy Dãy Số Shinkansen!');

    document.getElementById('mathSeqPlayStage').style.display = 'none';
    document.getElementById('mathSeqVictoryStage').style.display = 'block';
    document.getElementById('mathSeqVictoryScore').innerText =
      `Bé đã hoàn thành cả 8 toa tàu số bí ẩn với ${mathSeqScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = mathSeqQuestions[mathSeqIndex];
  document.getElementById('mathSeqProgressText').innerText = `Chuyến ${mathSeqIndex + 1} / ${mathSeqQuestions.length}`;
  document.getElementById('mathSeqScoreText').innerText = `⭐ ${mathSeqScore} điểm`;
  document.getElementById('mathSeqHint').innerText = `💡 Gợi ý: ${q.hint}`;

  const trackEl = document.getElementById('mathSeqTrainCars');
  trackEl.classList.remove('zooming');
  trackEl.innerHTML = '';

  let targetSlotEl = null;
  if (q.kind === 'sequence') {
    document.getElementById('mathSeqPrompt').innerText = '🚅 Điền số còn thiếu lên toa tàu Shinkansen!';
    q.cars.forEach((val, idx) => {
      const car = document.createElement('div');
      car.className = idx === 0 ? 'math-train-car head' : 'math-train-car';
      if (idx === q.hiddenIdx) {
        car.classList.add('missing');
        car.innerText = '?';
        targetSlotEl = car;
      } else {
        car.innerText = val;
      }
      trackEl.appendChild(car);
    });
  } else {
    document.getElementById('mathSeqPrompt').innerText = '🚅 Tìm số bí ẩn để phép tính đúng!';
    [String(q.a), '+', '?', '=', String(q.c)].forEach((tok, idx) => {
      const box = document.createElement('div');
      box.className = tok === '?' ? 'math-train-car missing' : (idx % 2 === 1 ? 'math-seq-op' : 'math-train-car');
      box.innerText = tok;
      if (tok === '?') targetSlotEl = box;
      trackEl.appendChild(box);
    });
  }

  window.soundMgr.playAudioFile('math_q_missing', null, 'Tìm số còn thiếu nhé');

  const grid = document.getElementById('mathSeqOptionsGrid');
  grid.innerHTML = '';
  q.choices.forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'math-ans-btn';
    btn.innerText = num;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
      if (num === q.ans) {
        btn.classList.add('correct');
        if (targetSlotEl) {
          targetSlotEl.innerText = num;
          targetSlotEl.classList.remove('missing');
          targetSlotEl.classList.add('solved');
        }
        mathSeqScore += 10;
        addMathSessionScore(10);
        document.getElementById('mathSeqScoreText').innerText = `⭐ ${mathSeqScore} điểm`;
        window.soundMgr.playShinkansenWhistle();
        fireConfetti();
        trackEl.classList.add('zooming');
        setTimeout(() => window.soundMgr.playAudioFile(`math_num_${num}`, null, `Số ${num}`), 450);

        if (typeof showToast === 'function') showToast(`🚅 TU TUU! Số chính xác là ${num}!`);
        setTimeout(() => {
          mathSeqIndex++;
          loadMathSequenceQuestion();
        }, 1700);
      } else {
        btn.classList.add('wrong');
        window.soundMgr.playWrong();
        if (typeof showToast === 'function') showToast(`💡 Gợi ý: ${q.hint}`);
      }
    });
    grid.appendChild(btn);
  });
}

// ========================================================
// PHẦN 5: HÌNH HỌC LỚP 1 & ĐỒNG HỒ GIỜ ĐÚNG (1-12H)
// ========================================================
function renderMathGeometryTab() {
  // 1. Render 4 shapes cards
  const shapesGrid = document.getElementById('mathShapesGrid');
  if (shapesGrid) {
    shapesGrid.innerHTML = '';
    MATH_SHAPES_DATA.forEach(sh => {
      const card = document.createElement('div');
      card.className = 'math-shape-card';
      card.innerHTML = `
        <div class="shape-svg-wrap">${sh.svg}</div>
        <div class="shape-title">${sh.name}</div>
        <div class="shape-ja">🇯🇵 ${sh.ja}</div>
        <div class="shape-traits">${sh.traits}</div>
        <div class="shape-examples">💡 ${sh.examples}</div>
      `;
      card.addEventListener('click', () => {
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(sh.audioKey, null, sh.name);
        if (typeof showToast === 'function') showToast(`📐 ${sh.name}: ${sh.traits}`);
      });
      shapesGrid.appendChild(card);
    });
  }

  // 2. Render interactive clock selector 1..12h
  renderClockFace('mathClockSvg', mathCurrentHour);
  updateClockInfoText();

  const hourBtnsWrap = document.getElementById('mathClockHourBtns');
  if (hourBtnsWrap) {
    hourBtnsWrap.innerHTML = '';
    for (let h = 1; h <= 12; h++) {
      const btn = document.createElement('button');
      btn.className = `clock-hour-btn ${h === mathCurrentHour ? 'active' : ''}`;
      btn.innerText = `${h}g`;
      btn.addEventListener('click', () => {
        mathCurrentHour = h;
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(`math_clock_${h}`, null, `${h} giờ đúng`);
        renderMathGeometryTab();
      });
      hourBtnsWrap.appendChild(btn);
    }
  }

  const btnHearClock = document.getElementById('btnHearClock');
  if (btnHearClock) {
    btnHearClock.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`math_clock_${mathCurrentHour}`, null, `${mathCurrentHour} giờ đúng`);
    };
  }

  // Switch between Learn Clock & Quiz (Shapes + Clock)
  const btnLearn = document.getElementById('btnGeoLearnMode');
  const btnQuiz = document.getElementById('btnGeoQuizMode');
  if (btnLearn && btnQuiz) {
    btnLearn.classList.toggle('active-filter', mathGeoMode === 'learn');
    btnQuiz.classList.toggle('active-filter', mathGeoMode === 'quiz');
    btnLearn.onclick = () => {
      mathGeoMode = 'learn';
      window.soundMgr.playClick();
      renderMathGeometryTab();
    };
    btnQuiz.onclick = () => {
      mathGeoMode = 'quiz';
      window.soundMgr.playClick();
      initGeoClockQuiz();
    };
  }

  document.getElementById('mathGeoLearnStage').style.display = mathGeoMode === 'learn' ? 'block' : 'none';
  document.getElementById('mathGeoQuizStage').style.display = mathGeoMode === 'quiz' ? 'block' : 'none';
}

function updateClockInfoText() {
  const titleEl = document.getElementById('mathClockReadout');
  const tipEl = document.getElementById('mathClockScheduleTip');
  if (titleEl) titleEl.innerText = `🕒 Đồng hồ chỉ: ${mathCurrentHour} giờ đúng`;
  if (tipEl) tipEl.innerText = MATH_CLOCK_SCHEDULE[mathCurrentHour] || '';
}

function renderClockFace(svgId, hour) {
  const svg = document.getElementById(svgId);
  if (!svg) return;

  const angleDeg = (hour % 12) * 30;
  let numbersHtml = '';
  for (let i = 1; i <= 12; i++) {
    const rad = ((i * 30) - 90) * (Math.PI / 180);
    const nx = 100 + Math.cos(rad) * 72;
    const ny = 100 + Math.sin(rad) * 72;
    const isTarget = i === hour;
    numbersHtml += `<text x="${nx.toFixed(1)}" y="${(ny + 5).toFixed(1)}" text-anchor="middle" font-size="${isTarget ? '17' : '14'}" font-weight="900" fill="${isTarget ? '#e11d48' : '#1e293b'}">${i}</text>`;
  }

  svg.innerHTML = `
    <circle cx="100" cy="100" r="92" fill="#ffffff" stroke="#0284c7" stroke-width="6"/>
    <circle cx="100" cy="100" r="84" fill="#f8fafc" stroke="#bae6fd" stroke-width="2"/>
    ${numbersHtml}
    <!-- Kim dài (Phút) chỉ thẳng số 12 -->
    <line x1="100" y1="100" x2="100" y2="34" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
    <!-- Kim ngắn (Giờ) màu đỏ xoay đúng theo giờ -->
    <line x1="100" y1="100" x2="100" y2="54" stroke="#e11d48" stroke-width="8" stroke-linecap="round" transform="rotate(${angleDeg} 100 100)"/>
    <circle cx="100" cy="100" r="7" fill="#0f172a"/>
    <circle cx="100" cy="100" r="3" fill="#facc15"/>
  `;
}

function initGeoClockQuiz() {
  document.getElementById('mathGeoLearnStage').style.display = 'none';
  document.getElementById('mathGeoQuizStage').style.display = 'block';
  document.getElementById('mathGeoQuizActive').style.display = 'block';
  document.getElementById('mathGeoQuizVictory').style.display = 'none';

  // Mix 4 Shape questions + 4 Clock questions = 8 rounds
  mathGeoQuizQuestions = [];
  const shapePrompts = [
    { kind: 'shape', q: 'Bảo Long ơi, đâu là Hình Tròn (như bánh xe, mặt trời)?', targetId: 'tron', audioKey: 'math_shape_tron' },
    { kind: 'shape', q: 'Đâu là Hình Vuông có 4 cạnh dài bằng nhau?', targetId: 'vuong', audioKey: 'math_shape_vuong' },
    { kind: 'shape', q: 'Hình nào là Hình Tam Giác có 3 cạnh nhọn?', targetId: 'tam_giac', audioKey: 'math_shape_tam_giac' },
    { kind: 'shape', q: 'Đâu là Hình Chữ Nhật giống quyển sách hay cánh cửa?', targetId: 'chu_nhat', audioKey: 'math_shape_chu_nhat' }
  ];
  shapePrompts.forEach(sp => {
    mathGeoQuizQuestions.push({
      kind: 'shape',
      question: sp.q,
      audioKey: sp.audioKey,
      target: sp.targetId,
      options: [...MATH_SHAPES_DATA].sort(() => Math.random() - 0.5)
    });
  });

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => Math.random() - 0.5).slice(0, 4);
  hours.forEach(h => {
    const opts = new Set([h]);
    while (opts.size < 4) {
      opts.add(1 + Math.floor(Math.random() * 12));
    }
    mathGeoQuizQuestions.push({
      kind: 'clock',
      question: 'Bảo Long nhìn kim đỏ xem đồng hồ chỉ mấy giờ nào?',
      audioKey: 'math_q_clock',
      targetHour: h,
      options: Array.from(opts).sort((a, b) => a - b)
    });
  });

  mathGeoQuizQuestions.sort(() => Math.random() - 0.5);
  mathGeoQuizIndex = 0;
  mathGeoQuizScore = 0;
  loadGeoClockQuestion();
}

function loadGeoClockQuestion() {
  if (mathGeoQuizIndex >= mathGeoQuizQuestions.length) {
    fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_math_win', null, 'Hoan hô Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Siêu sao Hình Học & Xem Đồng Hồ!');

    document.getElementById('mathGeoQuizActive').style.display = 'none';
    document.getElementById('mathGeoQuizVictory').style.display = 'block';
    document.getElementById('mathGeoVictoryScore').innerText =
      `Bé đã trả lời đúng cả 8 câu Hình & Giờ đạt ${mathGeoQuizScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = mathGeoQuizQuestions[mathGeoQuizIndex];
  document.getElementById('mathGeoProgressText').innerText = `Câu ${mathGeoQuizIndex + 1} / ${mathGeoQuizQuestions.length}`;
  document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
  document.getElementById('mathGeoQuizTitle').innerText = q.question;

  const clockWrap = document.getElementById('mathGeoQuizClockWrap');
  const optsGrid = document.getElementById('mathGeoQuizOptionsGrid');
  optsGrid.innerHTML = '';

  window.soundMgr.playAudioFile(q.audioKey, null, q.question);

  if (q.kind === 'clock') {
    clockWrap.style.display = 'flex';
    renderClockFace('mathQuizClockSvg', q.targetHour);
    q.options.forEach(h => {
      const btn = document.createElement('button');
      btn.className = 'math-ans-btn';
      btn.style.fontSize = '24px';
      btn.innerText = `${h} giờ`;
      btn.onclick = () => {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        if (h === q.targetHour) {
          btn.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          window.soundMgr.playAudioFile(`math_clock_${h}`, null, `${h} giờ đúng`);
          if (typeof showToast === 'function') showToast(`🕒 Chính xác! Đồng hồ chỉ ${h} giờ đúng!`);
          setTimeout(() => {
            mathGeoQuizIndex++;
            loadGeoClockQuestion();
          }, 1500);
        } else {
          btn.classList.add('wrong');
          window.soundMgr.playWrong();
          if (typeof showToast === 'function') showToast('🕒 Mẹo: Xem kim NGẮN màu ĐỎ đang chỉ vào số nào nhé!');
        }
      };
      optsGrid.appendChild(btn);
    });
  } else {
    clockWrap.style.display = 'none';
    q.options.forEach(sh => {
      const card = document.createElement('div');
      card.className = 'quiz-option-card';
      card.innerHTML = `
        <div style="width:76px; height:76px; margin-bottom:6px;">${sh.svg}</div>
        <div class="quiz-opt-name">${sh.name}</div>
      `;
      card.onclick = () => {
        if (card.classList.contains('correct') || card.classList.contains('wrong')) return;
        if (sh.id === q.target) {
          card.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          window.soundMgr.playAudioFile(sh.audioKey, null, sh.name);
          if (typeof showToast === 'function') showToast(`📐 Tuyệt vời! Chính là ${sh.name}!`);
          setTimeout(() => {
            mathGeoQuizIndex++;
            loadGeoClockQuestion();
          }, 1500);
        } else {
          card.classList.add('wrong');
          window.soundMgr.playWrong();
          if (typeof showToast === 'function') showToast(`📐 Thử nhìn lại hình khác nhé Bảo Long!`);
        }
      };
      optsGrid.appendChild(card);
    });
  }
}
