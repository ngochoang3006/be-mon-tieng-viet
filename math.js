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
let mathClockTickOn = false;
let mathClockTickTimer = null;
let mathClockSec = 0;
// 4 Khối hình 3D Lớp 1 (GDPT 2018 & MEXT 1年生)
const MATH_SOLIDS_DATA = [
  {
    id: 'cube',
    name: 'Khối lập phương',
    ja: 'りっぽうたい (Rippoutai)',
    audioKey: 'math_solid_cube',
    quizQKey: 'math_q_solid_cube',
    desc: '6 mặt đều là hình vuông bằng nhau — giống khối Rubik & cục xúc xắc!',
    svg: `<svg viewBox="0 0 120 120" class="shape-svg"><polygon points="30,38 72,22 102,38 60,54" fill="#a78bfa" stroke="#5b21b6" stroke-width="3"/><polygon points="30,38 60,54 60,100 30,84" fill="#8b5cf6" stroke="#5b21b6" stroke-width="3"/><polygon points="60,54 102,38 102,84 60,100" fill="#7c3aed" stroke="#5b21b6" stroke-width="3"/></svg>`
  },
  {
    id: 'box',
    name: 'Khối hộp chữ nhật',
    ja: 'ちょくほうたい (Chokuhoutai)',
    audioKey: 'math_solid_box',
    quizQKey: 'math_q_solid_box',
    desc: 'Dài hơn khối lập phương — giống hộp sữa tươi & hộp bút của Bảo Long!',
    svg: `<svg viewBox="0 0 120 120" class="shape-svg"><polygon points="18,48 82,28 106,42 42,62" fill="#7dd3fc" stroke="#0369a1" stroke-width="3"/><polygon points="18,48 42,62 42,96 18,82" fill="#38bdf8" stroke="#0369a1" stroke-width="3"/><polygon points="42,62 106,42 106,76 42,96" fill="#0284c7" stroke="#0369a1" stroke-width="3"/></svg>`
  },
  {
    id: 'sphere',
    name: 'Khối cầu',
    ja: 'きゅう (Kyuu)',
    audioKey: 'math_solid_sphere',
    quizQKey: 'math_q_solid_sphere',
    desc: 'Tròn xoay và lăn đi được mọi hướng — giống quả bóng đá & Trái Đất!',
    svg: `<svg viewBox="0 0 120 120" class="shape-svg"><defs><radialGradient id="sphG_tpl" cx="38%" cy="32%" r="65%"><stop offset="0%" stop-color="#fef08a"/><stop offset="55%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></radialGradient></defs><circle cx="60" cy="60" r="40" fill="url(#sphG_tpl)" stroke="#92400e" stroke-width="3"/><ellipse cx="60" cy="60" rx="40" ry="13" fill="none" stroke="#fff7ed" stroke-width="2" stroke-dasharray="5 4"/></svg>`
  },
  {
    id: 'cylinder',
    name: 'Khối trụ',
    ja: 'えんちゅう (Enchuu)',
    audioKey: 'math_solid_cylinder',
    quizQKey: 'math_q_solid_cylinder',
    desc: 'Hai mặt đáy hình tròn, đặt nằm ngang lăn được — giống lon sữa & cái trống!',
    svg: `<svg viewBox="0 0 120 120" class="shape-svg"><path d="M32,34 L32,86 A28,12 0 0,0 88,86 L88,34 Z" fill="#34d399" stroke="#047857" stroke-width="3"/><ellipse cx="60" cy="34" rx="28" ry="12" fill="#a7f3d0" stroke="#047857" stroke-width="3"/></svg>`
  }
];

const MATH_RULER_ITEMS = [
  { id: 'eraser', label: '🧼 Cục tẩy', name: 'Cục tẩy', cm: 3, color: '#f472b6', icon: '🧼' },
  { id: 'crayon', label: '🖍️ Bút sáp màu', name: 'Cây bút sáp', cm: 5, color: '#fb923c', icon: '🖍️' },
  { id: 'pencil', label: '✏️ Bút chì gỗ', name: 'Chiếc bút chì', cm: 7, color: '#facc15', icon: '✏️' },
  { id: 'dino_toy', label: '🦕 Khủng long nhỏ', name: 'Chú khủng long đồ chơi', cm: 9, color: '#22c55e', icon: '🦕' },
  { id: 'train', label: '🚅 Tàu Shinkansen', name: 'Mô hình Shinkansen', cm: 11, color: '#38bdf8', icon: '🚅' }
];

const MATH_WEEKDAYS_DATA = [
  { id: 2, short: 'T2', name: 'Thứ Hai', ja: '月曜日 (Getsuyoubi)', desc: 'Chào cờ đầu tuần vui vẻ ở trường!', isWeekend: false },
  { id: 3, short: 'T3', name: 'Thứ Ba', ja: '火曜日 (Kayoubi)', desc: 'Học đọc Tiếng Việt & làm Toán!', isWeekend: false },
  { id: 4, short: 'T4', name: 'Thứ Tư', ja: '水曜日 (Suiyoubi)', desc: 'Giữa tuần năng động cùng bạn bè!', isWeekend: false },
  { id: 5, short: 'T5', name: 'Thứ Năm', ja: '木曜日 (Mokuyoubi)', desc: 'Tập vẽ Mỹ thuật & hát Nhạc!', isWeekend: false },
  { id: 6, short: 'T6', name: 'Thứ Sáu', ja: '金曜日 (Kinyoubi)', desc: 'Ngày học cuối tuần — nhận phiếu bé ngoan!', isWeekend: false },
  { id: 7, short: 'T7', name: 'Thứ Bảy', ja: '土曜日 (Doyoubi)', desc: 'Cuối tuần đi công viên cùng ba mẹ!', isWeekend: true },
  { id: 8, short: 'CN', name: 'Chủ Nhật', ja: '日曜日 (Nichiyoubi)', desc: 'Ngày nghỉ sum họp gia đình yêu thương!', isWeekend: true }
];

function mathNumberToViText(n) {
  if (n <= 20 && typeof MATH_NUMBERS_DATA !== 'undefined') {
    const found = MATH_NUMBERS_DATA.find(x => x.num === n);
    if (found) return found.word;
  }
  if (n === 100) return 'một trăm';
  const tensNames = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
  const units = ['', 'một', 'hai', 'ba', 'bốn', 'lăm', 'sáu', 'bảy', 'tám', 'chín'];
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (u === 0) return tensNames[t];
  if (u === 1 && t > 1) return `${tensNames[t]} mốt`;
  if (u === 4 && t > 1) return `${tensNames[t]} tư`;
  return `${tensNames[t]} ${units[u]}`;
}

let mathSessionScore = 0;
let mathEpoch = 0;

// Tab 1: Số đếm & Cấu tạo số
let mathSpotlightNum = 5;
let mathNumbersAutoTimer = null;
let mathNumbersAutoRunning = false;
let mathHundredSkipStep = 1;
let mathBondTarget = 8;
let mathBondSelectedA = 5;

// Tab 2: Cộng & Trừ
let mathCalcMode = 'max10'; // 'max10' | 'max20' | 'sakura' | 'max100' | 'onlyPlus' | 'onlyMinus'
let mathCalcShowVisual = true;
let mathCalcQuestions = [];
let mathCalcIndex = 0;
let mathCalcScore = 0;
let mathCalcStreak = 0;

// Tab 3: So sánh
let mathCmpMode = 'simple'; // 'simple' | 'max100' | 'expr'
let mathCmpQuestions = [];
let mathCmpIndex = 0;
let mathCmpScore = 0;

// Tab 4: Dãy số Shinkansen
let mathSeqQuestions = [];
let mathSeqIndex = 0;
let mathSeqScore = 0;

// Tab 5: Hình học, Đo cm, Đồng hồ & Thứ trong tuần
let mathCurrentHour = 3;
let mathCurrentMinute = 0; // 0 | 30
let mathRulerSelectedIdx = 0;
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
  window.soundMgr?.stopAll?.();
  mathEpoch++;
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

  if (subtab === 'numbers') {
    renderMathNumbersTab();
    renderMathHundredBoard();
    renderMathBondsWidget();
  }
  else if (subtab === 'calc') initMathCalcGame();
  else if (subtab === 'compare') initMathCompareGame();
  else if (subtab === 'sequence') initMathSequenceGame();
  else if (subtab === 'geometry') {
    renderMathGeometryTab();
    renderMathSolids();
    renderMathRuler();
    renderMathDays();
  }
}

function stopMathClockTick() {
  mathClockTickOn = false;
  if (mathClockTickTimer) {
    clearInterval(mathClockTickTimer);
    mathClockTickTimer = null;
  }
  const btn = document.getElementById('btnToggleClockTick');
  if (btn) {
    btn.classList.remove('active-filter');
    btn.innerText = '⏱️ Bật kim giây chạy thật';
  }
}

function stopMathAutoPlay() {
  stopMathClockTick();
  mathNumbersAutoRunning = false;
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
    card.type = 'button';
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
      grid.querySelectorAll('.math-num-card.selected').forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      updateMathNumberSpotlight();
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
      btn.type = 'button';
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
      if (mathNumbersAutoRunning || btnAuto.classList.contains('playing')) {
        stopMathAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopMathAutoPlay();
      mathNumbersAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đếm';
      let idx = 0;
      const cards = document.querySelectorAll('#mathNumbersGrid .math-num-card');

      function nextNum() {
        if (!mathNumbersAutoRunning) return;
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
          if (!mathNumbersAutoRunning) return;
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
      tok.type = 'button';
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
  mathEpoch++;
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

  // Generate 10 clean, age-appropriate math questions (Sakura qua 10 & phạm vi 100 HK2)
  mathCalcQuestions = [];
  const usedPairs = new Set();
  const sakuraAdd = [[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[8,3],[8,4],[8,5],[8,6],[7,4],[7,5],[7,6],[6,5]];
  const sakuraSub = [[11,2],[11,3],[11,4],[12,3],[12,5],[13,4],[13,6],[14,5],[14,7],[15,7],[16,8]];
  let guard = 0;
  while (mathCalcQuestions.length < 10 && guard < 260) {
    guard++;
    let a, b, ans, op, sakura = null;
    const maxLim = mode === 'max100' ? 99 : (mode === 'max20' || mode === 'sakura' ? 20 : 10);

    if (mode === 'sakura') {
      op = Math.random() < 0.55 ? '+' : '-';
      if (op === '+') {
        const pair = sakuraAdd[Math.floor(Math.random() * sakuraAdd.length)];
        a = pair[0]; b = pair[1]; ans = a + b;
        const need = 10 - a;
        sakura = { type: 'add', need, rest: b - need };
      } else {
        const pair = sakuraSub[Math.floor(Math.random() * sakuraSub.length)];
        a = pair[0]; b = pair[1]; ans = a - b;
        sakura = { type: 'sub', tensLeft: 10 - b, units: a - 10 };
      }
    } else if (mode === 'max100') {
      op = Math.random() < 0.5 ? '+' : '-';
      if (op === '+') {
        const t1 = 1 + Math.floor(Math.random() * 7);
        const u1 = Math.floor(Math.random() * 9);
        const t2 = 1 + Math.floor(Math.random() * (8 - t1));
        const u2 = Math.floor(Math.random() * (10 - u1));
        a = t1 * 10 + u1;
        b = t2 * 10 + u2;
        ans = a + b;
      } else {
        const t1 = 2 + Math.floor(Math.random() * 8);
        const u1 = Math.floor(Math.random() * 10);
        const t2 = 1 + Math.floor(Math.random() * (t1 - 1));
        const u2 = Math.floor(Math.random() * (u1 + 1));
        a = t1 * 10 + u1;
        b = t2 * 10 + u2;
        ans = a - b;
      }
    } else {
      const isPlus = mode === 'onlyPlus' ? true : (mode === 'onlyMinus' ? false : Math.random() < 0.55);
      if (isPlus) {
        op = '+';
        if (maxLim === 20) {
          ans = 6 + Math.floor(Math.random() * 15);
          a = 1 + Math.floor(Math.random() * (ans - 1));
        } else {
          ans = 2 + Math.floor(Math.random() * 9);
          a = 1 + Math.floor(Math.random() * (ans - 1));
        }
        b = ans - a;
      } else {
        op = '-';
        a = maxLim === 20 ? (6 + Math.floor(Math.random() * 15)) : (2 + Math.floor(Math.random() * 9));
        b = 1 + Math.floor(Math.random() * a);
        ans = a - b;
      }
    }

    const sig = `${a}${op}${b}`;
    if (usedPairs.has(sig)) continue;
    usedPairs.add(sig);

    const choices = new Set([ans]);
    while (choices.size < 4) {
      const deltas = mode === 'max100' ? [-10, -2, -1, 1, 2, 10, 11] : [-3, -2, -1, 1, 2, 3, 4];
      const delta = deltas[Math.floor(Math.random() * deltas.length)];
      const cand = ans + delta;
      if (cand >= 0 && cand <= maxLim) choices.add(cand);
    }

    mathCalcQuestions.push({
      a, b, op, ans, sakura,
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

function speakCalcEquation(q, withResult = false, onEndCallback = null) {
  const opKey = q.op === '+' ? 'math_op_plus' : 'math_op_minus';
  const keys = withResult
    ? [`math_v_${q.a}`, opKey, `math_v_${q.b}`, 'math_eq_word', `math_v_${q.ans}`]
    : [`math_v_${q.a}`, opKey, `math_v_${q.b}`, 'math_q_eq'];
  const fb = withResult
    ? `${q.a} ${q.op === '+' ? 'cộng' : 'trừ'} ${q.b} bằng ${q.ans}`
    : `${q.a} ${q.op === '+' ? 'cộng' : 'trừ'} ${q.b} bằng mấy`;
  window.soundMgr.playAudioSequence(keys, onEndCallback, fb);
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

  if (q.sakura) {
    if (q.sakura.type === 'add') {
      box.innerHTML = `
        <div class="sakura-math-card">
          <div class="sakura-step-badge">🌸 Mẹo Sakura Nhật Bản (Gộp tròn 10)</div>
          <div class="sakura-flow">
            <div class="sakura-split-col">
              <span class="sakura-pill main">${q.b}</span>
              <span class="sakura-branches">↙ &nbsp; ↘</span>
              <div class="sakura-sub-row">
                <span class="sakura-pill hot">${q.sakura.need}</span>
                <span class="sakura-pill">${q.sakura.rest}</span>
              </div>
            </div>
            <div class="sakura-explain">
              <div><strong>Bước 1:</strong> ${q.a} + <span class="sakura-hi">${q.sakura.need}</span> = <strong>10</strong></div>
              <div><strong>Bước 2:</strong> 10 + <strong>${q.sakura.rest}</strong> = <span class="sakura-qmark">?</span></div>
            </div>
          </div>
        </div>`;
    } else {
      box.innerHTML = `
        <div class="sakura-math-card">
          <div class="sakura-step-badge">🌸 Mẹo Sakura Nhật Bản (Trừ từ 10)</div>
          <div class="sakura-flow">
            <div class="sakura-split-col">
              <span class="sakura-pill main">${q.a}</span>
              <span class="sakura-branches">↙ &nbsp; ↘</span>
              <div class="sakura-sub-row">
                <span class="sakura-pill hot">10</span>
                <span class="sakura-pill">${q.sakura.units}</span>
              </div>
            </div>
            <div class="sakura-explain">
              <div><strong>Bước 1:</strong> <span class="sakura-hi">10</span> − ${q.b} = <strong>${q.sakura.tensLeft}</strong></div>
              <div><strong>Bước 2:</strong> ${q.sakura.tensLeft} + <strong>${q.sakura.units}</strong> = <span class="sakura-qmark">?</span></div>
            </div>
          </div>
        </div>`;
    }
    return;
  }

  if (q.a > 20 || q.b > 20) {
    const mkBlocks = (n) => {
      const t = Math.floor(n / 10);
      const u = n % 10;
      let html = '';
      for (let i = 0; i < t; i++) html += '<span class="base10-ten">10</span>';
      for (let j = 0; j < u; j++) html += '<span class="base10-one">1</span>';
      return html;
    };
    box.innerHTML = `
      <div class="base10-row">
        <div class="base10-group">${mkBlocks(q.a)}</div>
        <div class="calc-vis-op">${q.op === '+' ? '➕' : '➖'}</div>
        <div class="base10-group">${mkBlocks(q.b)}</div>
      </div>`;
    return;
  }

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

  const myNav = window.appNavEpoch || 0;
  const myMathEpoch = mathEpoch;
  document.getElementById('btnHearCalc').onclick = () => {
    window.soundMgr.playClick();
    speakCalcEquation(q, false);
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch) speakCalcEquation(q, false);
  }, 60);

  const optsGrid = document.getElementById('mathCalcOptionsGrid');
  optsGrid.innerHTML = '';
  let calcLocked = false;
  q.choices.forEach(num => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'math-ans-btn';
    btn.innerText = num;
    btn.addEventListener('click', () => {
      if (calcLocked || btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (num === q.ans) {
        calcLocked = true;
        btn.classList.add('correct');
        ansSlot.innerText = q.ans;
        ansSlot.classList.add('solved');
        mathCalcStreak++;
        const pts = mathCalcStreak >= 3 ? 15 : 10;
        mathCalcScore += pts;
        addMathSessionScore(pts);
        const opWordKey = q.op === '+' ? 'math_op_plus' : 'math_op_minus';
        window.recordAnswer?.(`math_${q.a}_${q.op}_${q.b}`, true, {
          label: `${q.a} ${q.op} ${q.b} = ${q.ans}`,
          mode: 'math',
          audioKey: `math_v_${q.a},${opWordKey},math_v_${q.b},math_q_eq`
        });

        document.getElementById('mathCalcStreakBadge').innerText = `🔥 Chuỗi x${mathCalcStreak}`;
        document.getElementById('mathCalcScoreText').innerText = `⭐ ${mathCalcScore} điểm`;

        window.soundMgr.playCorrect();
        fireConfetti();
        if (typeof showToast === 'function') {
          showToast(`🎉 Chuẩn luôn! ${q.a} ${q.op} ${q.b} = ${q.ans}!`);
        }

        let calcAdvanced = false;
        const goNextCalc = () => {
          if (calcAdvanced) return;
          calcAdvanced = true;
          if ((window.appNavEpoch || 0) !== myNav || mathEpoch !== myMathEpoch) return;
          mathCalcIndex++;
          loadMathCalcQuestion();
        };
        speakCalcEquation(q, true, () => setTimeout(goNextCalc, 220));
        setTimeout(goNextCalc, window.soundMgr.isMuted ? 450 : 4200);
      } else {
        btn.classList.add('wrong');
        const opWordKey = q.op === '+' ? 'math_op_plus' : 'math_op_minus';
        window.recordAnswer?.(`math_${q.a}_${q.op}_${q.b}`, false, {
          label: `${q.a} ${q.op} ${q.b} = ${q.ans}`,
          mode: 'math',
          audioKey: `math_v_${q.a},${opWordKey},math_v_${q.b},math_q_eq`
        });
        mathCalcStreak = 0;
        document.getElementById('mathCalcStreakBadge').innerText = `🔥 Chuỗi x0`;
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
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
  window.markDailyStep?.('play');
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
  mathEpoch++;
  mathCmpMode = mode;
  document.getElementById('btnCmpSimple')?.classList.toggle('active-filter', mode === 'simple');
  document.getElementById('btnCmp100')?.classList.toggle('active-filter', mode === 'max100');
  document.getElementById('btnCmpExpr')?.classList.toggle('active-filter', mode === 'expr');

  document.getElementById('btnCmpSimple').onclick = () => {
    window.soundMgr.playClick();
    initMathCompareGame('simple');
  };
  const btn100 = document.getElementById('btnCmp100');
  if (btn100) {
    btn100.onclick = () => {
      window.soundMgr.playClick();
      initMathCompareGame('max100');
    };
  }
  document.getElementById('btnCmpExpr').onclick = () => {
    window.soundMgr.playClick();
    initMathCompareGame('expr');
  };

  mathCmpQuestions = [];
  for (let i = 0; i < 8; i++) {
    const forceEq = i === 2 || i === 6;
    if (mode === 'simple' || mode === 'max100') {
      const cap = mode === 'max100' ? 99 : 19;
      const base = mode === 'max100' ? 10 : 1;
      let a = base + Math.floor(Math.random() * (cap - base + 1));
      let b = forceEq ? a : base + Math.floor(Math.random() * (cap - base + 1));
      if (mode === 'max100' && i === 3) {
        const d1 = 2 + Math.floor(Math.random() * 6);
        const d2 = d1 + 1;
        a = d1 * 10 + d2;
        b = d2 * 10 + d1;
      }
      const ans = a > b ? '>' : (a < b ? '<' : '=');
      mathCmpQuestions.push({ leftLabel: String(a), rightLabel: String(b), leftVal: a, rightVal: b, ans, useBlocks: mode === 'max100' });
    } else {
      const a1 = 1 + Math.floor(Math.random() * 7);
      const a2 = 1 + Math.floor(Math.random() * 5);
      const leftVal = a1 + a2;
      const rightVal = forceEq ? leftVal : Math.max(1, leftVal + [-3, -2, -1, 1, 2, 3][Math.floor(Math.random() * 6)]);
      const ans = leftVal > rightVal ? '>' : (leftVal < rightVal ? '<' : '=');
      mathCmpQuestions.push({ leftLabel: `${a1} + ${a2}`, rightLabel: String(rightVal), leftExpr: [a1, a2], leftVal, rightVal, ans });
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
    window.markDailyStep?.('play');
    if (typeof awardStars === 'function') awardStars(15, 'Chuyên gia So Sánh Dấu > < =!');

    document.getElementById('mathCmpPlayStage').style.display = 'none';
    document.getElementById('mathCmpVictoryStage').style.display = 'block';
    document.getElementById('mathCmpVictoryScore').innerText =
      `Bé đã chọn chuẩn xác cả 8 phép so sánh với ${mathCmpScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = mathCmpQuestions[mathCmpIndex];
  const myNav = window.appNavEpoch || 0;
  const myMathEpoch = mathEpoch;
  document.getElementById('mathCmpProgressText').innerText = `Câu ${mathCmpIndex + 1} / ${mathCmpQuestions.length}`;
  document.getElementById('mathCmpScoreText').innerText = `⭐ ${mathCmpScore} điểm`;

  document.getElementById('cmpLeftNumber').innerText = q.leftLabel;
  document.getElementById('cmpRightNumber').innerText = q.rightLabel;
  const renderDots = (n) => {
    if (q.useBlocks || n > 20) {
      const t = Math.floor(n / 10);
      const u = n % 10;
      return `${'<span class="base10-ten mini">10</span>'.repeat(t)}${'<span class="base10-one mini">1</span>'.repeat(u)}`;
    }
    return '🍎'.repeat(Math.min(n, 10)) + (n > 10 ? ` (+${n - 10})` : '');
  };
  document.getElementById('cmpLeftDots').innerHTML = renderDots(q.leftVal);
  document.getElementById('cmpRightDots').innerHTML = renderDots(q.rightVal);

  const signBox = document.getElementById('cmpCenterSign');
  signBox.innerText = '?';
  signBox.classList.remove('solved');

  const playCmpQuestion = () => {
    if (q.leftExpr) {
      const [x1, x2] = q.leftExpr;
      window.soundMgr.playAudioSequence(
        [`math_v_${x1}`, 'math_op_plus', `math_v_${x2}`, 'math_and', `math_v_${q.rightVal}`, 'math_q_cmp'],
        null,
        `${q.leftLabel} và ${q.rightLabel}`
      );
    } else {
      window.soundMgr.playAudioSequence(
        [`math_v_${q.leftVal}`, 'math_and', `math_v_${q.rightVal}`, 'math_q_cmp'],
        null,
        `${q.leftLabel} và ${q.rightLabel}, chọn dấu lớn hơn, bé hơn, hay bằng nhau!`
      );
    }
  };
  const btnHearCmp = document.getElementById('btnHearMathCmp');
  if (btnHearCmp) {
    btnHearCmp.onclick = () => {
      window.soundMgr.playClick();
      playCmpQuestion();
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch) playCmpQuestion();
  }, 60);

  document.querySelectorAll('.cmp-choice-btn').forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    btn.onclick = () => {
      if (signBox.classList.contains('solved') || btn.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      const chosen = btn.dataset.sign;
      const cmpAudioSeq = q.leftExpr
        ? `math_v_${q.leftExpr[0]},math_op_plus,math_v_${q.leftExpr[1]},math_and,math_v_${q.rightVal},math_q_cmp`
        : `math_v_${q.leftVal},math_and,math_v_${q.rightVal},math_q_cmp`;
      if (chosen === q.ans) {
        btn.classList.add('correct');
        signBox.innerText = q.ans;
        signBox.classList.add('solved');
        mathCmpScore += 10;
        addMathSessionScore(10);
        window.recordAnswer?.(`cmp_${q.leftLabel}_${q.rightLabel}`, true, {
          label: `${q.leftLabel} ? ${q.rightLabel}`,
          mode: 'math',
          audioKey: cmpAudioSeq
        });
        document.getElementById('mathCmpScoreText').innerText = `⭐ ${mathCmpScore} điểm`;
        window.soundMgr.playCorrect();
        fireConfetti();

        if (typeof showToast === 'function') {
          showToast(`🐊 Chính xác! ${q.leftLabel} ${q.ans} ${q.rightLabel}!`);
        }

        let cmpDone = false;
        const goNextCmp = () => {
          if (cmpDone) return;
          cmpDone = true;
          if ((window.appNavEpoch || 0) !== myNav || mathEpoch !== myMathEpoch) return;
          mathCmpIndex++;
          loadMathCompareQuestion();
        };

        const cmpAudioKey = q.ans === '>' ? 'math_cmp_gt' : (q.ans === '<' ? 'math_cmp_lt' : 'math_cmp_eq');
        window.soundMgr.playAudioSequence([`math_v_${q.leftVal}`, cmpAudioKey, `math_v_${q.rightVal}`], () => {
          setTimeout(goNextCmp, 180);
        }, `${q.leftVal} ${q.ans} ${q.rightVal}`);
        setTimeout(goNextCmp, window.soundMgr.isMuted ? 450 : 3800);
      } else {
        btn.classList.add('wrong');
        window.recordAnswer?.(`cmp_${q.leftLabel}_${q.rightLabel}`, false, {
          label: `${q.leftLabel} ? ${q.rightLabel}`,
          mode: 'math',
          audioKey: cmpAudioSeq
        });
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        if (typeof showToast === 'function') showToast('🐊 Mẹo: Cá sấu há miệng to quay về phía SỐ LỚN HƠN nhé!');
      }
    };
  });
}

// ========================================================
// PHẦN 4: TÌM SỐ CÒN THIẾU & DÃY SỐ TÀU SHINKANSEN
// ========================================================
function initMathSequenceGame() {
  mathEpoch++;
  mathSeqQuestions = [];
  for (let i = 0; i < 8; i++) {
    if (i === 4 || i === 6) {
      // HK2 sequences up to 100 (+10 tens or +1 between 30..90)
      const isTens = i === 4;
      let arr;
      if (isTens) {
        const start = [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)];
        arr = [start, start + 10, start + 20, start + 30];
      } else {
        const start = [34, 45, 62, 73, 81][Math.floor(Math.random() * 5)];
        arr = [start, start + 1, start + 2, start + 3];
      }
      const hiddenIdx = 1 + Math.floor(Math.random() * 2);
      const ans = arr[hiddenIdx];
      const choices = new Set([ans]);
      while (choices.size < 4) {
        const step = isTens ? [-20, -10, 10, 20] : [-2, -1, 1, 2, 3];
        const c = Math.max(0, Math.min(100, ans + step[Math.floor(Math.random() * step.length)]));
        choices.add(c);
      }
      mathSeqQuestions.push({
        kind: 'sequence',
        cars: arr,
        hiddenIdx,
        ans,
        choices: Array.from(choices).sort((x, y) => x - y),
        hint: isTens ? 'Cộng thêm 10 mỗi toa (số tròn chục)' : 'Đếm tiến thêm 1 số (phạm vi 100)'
      });
    } else if (i % 2 === 0) {
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
      hiddenIdx = 1 + Math.floor(Math.random() * 2);
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
      const c = 5 + Math.floor(Math.random() * 6);
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
    window.markDailyStep?.('play');
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

  const myNav = window.appNavEpoch || 0;
  const myMathEpoch = mathEpoch;
  const seqAudioKeys = q.kind === 'sequence'
    ? q.cars.map((val, idx) => (idx === q.hiddenIdx ? 'math_blank' : `math_v_${val}`))
    : [`math_v_${q.a}`, 'math_op_plus', 'math_blank', 'math_eq_word', `math_v_${q.c}`];
  const seqAudioJoined = seqAudioKeys.join(',');
  const playSeqPrompt = () => window.soundMgr.playAudioSequence(seqAudioKeys, null, q.hint);
  const btnHearSeq = document.getElementById('btnHearMathSeq');
  if (btnHearSeq) {
    btnHearSeq.onclick = () => {
      window.soundMgr.playClick();
      playSeqPrompt();
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch) playSeqPrompt();
  }, 60);

  const grid = document.getElementById('mathSeqOptionsGrid');
  grid.innerHTML = '';
  let seqLocked = false;
  q.choices.forEach(num => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'math-ans-btn';
    btn.innerText = num;
    btn.addEventListener('click', () => {
      if (seqLocked || btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (num === q.ans) {
        seqLocked = true;
        btn.classList.add('correct');
        if (targetSlotEl) {
          targetSlotEl.innerText = num;
          targetSlotEl.classList.remove('missing');
          targetSlotEl.classList.add('solved');
        }
        mathSeqScore += 10;
        addMathSessionScore(10);
        window.recordAnswer?.(`seq_${mathSeqIndex}_${q.ans}`, true, {
          label: q.kind === 'sequence' ? `Dãy số thiếu ${q.ans}` : `${q.a} + ? = ${q.c}`,
          mode: 'math',
          audioKey: seqAudioJoined
        });
        document.getElementById('mathSeqScoreText').innerText = `⭐ ${mathSeqScore} điểm`;
        window.soundMgr.playShinkansenWhistle();
        fireConfetti();
        trackEl.classList.add('zooming');

        if (typeof showToast === 'function') showToast(`🚅 TU TUU! Số chính xác là ${num}!`);
        window.soundMgr.playPraiseThen(false,
          () => (window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch,
          () => {
            mathSeqIndex++;
            loadMathSequenceQuestion();
          },
          3600
        );
      } else {
        btn.classList.add('wrong');
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
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

  // 2. Render interactive clock selector 1..12h (Giờ đúng :00 & Giờ rưỡi :30)
  const playCurrentClockAudio = () => {
    if (mathCurrentMinute === 30) {
      window.soundMgr.playAudioFile(`math_clock_half_${mathCurrentHour}`, null, `${mathCurrentHour} giờ rưỡi`);
    } else {
      window.soundMgr.playAudioFile(`math_clock_${mathCurrentHour}`, null, `${mathCurrentHour} giờ đúng`);
    }
  };

  renderClockFace('mathClockSvg', mathCurrentHour, mathCurrentMinute);
  updateClockInfoText();

  const btnClockExact = document.getElementById('btnClockExact');
  const btnClockHalf = document.getElementById('btnClockHalf');
  if (btnClockExact && btnClockHalf) {
    btnClockExact.classList.toggle('active-filter', mathCurrentMinute === 0);
    btnClockHalf.classList.toggle('active-filter', mathCurrentMinute === 30);
    btnClockExact.onclick = () => {
      mathCurrentMinute = 0;
      window.soundMgr.playClick();
      btnClockExact.classList.add('active-filter');
      btnClockHalf.classList.remove('active-filter');
      renderClockFace('mathClockSvg', mathCurrentHour, mathCurrentMinute);
      updateClockInfoText();
      playCurrentClockAudio();
    };
    btnClockHalf.onclick = () => {
      mathCurrentMinute = 30;
      window.soundMgr.playClick();
      btnClockHalf.classList.add('active-filter');
      btnClockExact.classList.remove('active-filter');
      renderClockFace('mathClockSvg', mathCurrentHour, mathCurrentMinute);
      updateClockInfoText();
      playCurrentClockAudio();
    };
  }

  const hourBtnsWrap = document.getElementById('mathClockHourBtns');
  if (hourBtnsWrap) {
    hourBtnsWrap.innerHTML = '';
    for (let h = 1; h <= 12; h++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `clock-hour-btn ${h === mathCurrentHour ? 'active' : ''}`;
      btn.innerText = `${h}g`;
      btn.addEventListener('click', () => {
        mathCurrentHour = h;
        window.soundMgr.playClick();
        playCurrentClockAudio();
        hourBtnsWrap.querySelectorAll('.clock-hour-btn.active').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderClockFace('mathClockSvg', mathCurrentHour, mathCurrentMinute);
        updateClockInfoText();
      });
      hourBtnsWrap.appendChild(btn);
    }
  }

  const btnHearClock = document.getElementById('btnHearClock');
  if (btnHearClock) {
    btnHearClock.onclick = () => {
      window.soundMgr.playClick();
      playCurrentClockAudio();
    };
  }

  const btnClockTick = document.getElementById('btnToggleClockTick');
  if (btnClockTick) {
    btnClockTick.classList.toggle('active-filter', mathClockTickOn);
    btnClockTick.innerText = mathClockTickOn ? '⏸️ Tắt kim giây' : '⏱️ Bật kim giây chạy thật';
    btnClockTick.onclick = () => {
      mathClockTickOn = !mathClockTickOn;
      window.soundMgr.playPop();
      if (mathClockTickTimer) { clearInterval(mathClockTickTimer); mathClockTickTimer = null; }
      if (mathClockTickOn) {
        mathClockTickTimer = setInterval(() => {
          if (currentMathTab !== 'geometry' || mathGeoMode !== 'learn') {
            stopMathClockTick();
            return;
          }
          mathClockSec = (mathClockSec + 1) % 60;
          const hand = document.getElementById('mathClockSecHand');
          if (hand) hand.setAttribute('transform', `rotate(${mathClockSec * 6} 100 100)`);
        }, 1000);
      }
      renderClockFace('mathClockSvg', mathCurrentHour, mathCurrentMinute);
      btnClockTick.classList.toggle('active-filter', mathClockTickOn);
      btnClockTick.innerText = mathClockTickOn ? '⏸️ Tắt kim giây' : '⏱️ Bật kim giây chạy thật';
    };
  }

  // Switch between Learn Clock & Quiz (Shapes + Solids + cm + Clock + Days)
  const btnLearn = document.getElementById('btnGeoLearnMode');
  const btnQuiz = document.getElementById('btnGeoQuizMode');
  if (btnLearn && btnQuiz) {
    btnLearn.classList.toggle('active-filter', mathGeoMode === 'learn');
    btnQuiz.classList.toggle('active-filter', mathGeoMode === 'quiz');
    btnLearn.onclick = () => {
      mathEpoch++;
      window.soundMgr.stopAll();
      mathGeoMode = 'learn';
      window.soundMgr.playClick();
      renderMathGeometryTab();
      renderMathSolids();
      renderMathRuler();
      renderMathDays();
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
  if (titleEl) {
    titleEl.innerText = mathCurrentMinute === 30
      ? `🕡 Đồng hồ chỉ: ${mathCurrentHour} giờ rưỡi (${mathCurrentHour}:30 • ${mathCurrentHour}時半)`
      : `🕒 Đồng hồ chỉ: ${mathCurrentHour} giờ đúng (${mathCurrentHour}:00 • ${mathCurrentHour}時)`;
  }
  if (tipEl) tipEl.innerText = MATH_CLOCK_SCHEDULE[mathCurrentHour] || '';
}

function renderClockFace(svgId, hour, minute = 0, highlightHour = true) {
  const svg = document.getElementById(svgId);
  if (!svg) return;

  const angleDeg = (hour % 12) * 30 + (minute === 30 ? 15 : 0);
  const minuteAngleDeg = minute === 30 ? 180 : 0;
  let numbersHtml = '';
  for (let i = 1; i <= 12; i++) {
    const rad = ((i * 30) - 90) * (Math.PI / 180);
    const nx = 100 + Math.cos(rad) * 72;
    const ny = 100 + Math.sin(rad) * 72;
    const isTarget = highlightHour && i === hour;
    const isHalf = highlightHour && minute === 30 && i === 6;
    numbersHtml += `<text x="${nx.toFixed(1)}" y="${(ny + 5).toFixed(1)}" text-anchor="middle" font-size="${isTarget ? '17' : '14'}" font-weight="900" fill="${isTarget ? '#e11d48' : (isHalf ? '#0284c7' : '#1e293b')}">${i}</text>`;
  }

  svg.innerHTML = `
    <circle cx="100" cy="100" r="92" fill="#ffffff" stroke="#0284c7" stroke-width="6"/>
    <circle cx="100" cy="100" r="84" fill="#f8fafc" stroke="#bae6fd" stroke-width="2"/>
    ${numbersHtml}
    <line x1="100" y1="100" x2="100" y2="34" stroke="#0284c7" stroke-width="5" stroke-linecap="round" transform="rotate(${minuteAngleDeg} 100 100)"/>
    <line x1="100" y1="100" x2="100" y2="54" stroke="#e11d48" stroke-width="8" stroke-linecap="round" transform="rotate(${angleDeg} 100 100)"/>
    ${highlightHour ? `<line id="mathClockSecHand" x1="100" y1="108" x2="100" y2="28" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" transform="rotate(${mathClockSec * 6} 100 100)" opacity="${mathClockTickOn ? '1' : '0.4'}"/>` : ''}
    <circle cx="100" cy="100" r="7" fill="#0f172a"/>
    <circle cx="100" cy="100" r="3" fill="#facc15"/>
  `;
}

function initGeoClockQuiz() {
  mathEpoch++;
  window.soundMgr.stopAll();
  document.getElementById('mathGeoLearnStage').style.display = 'none';
  document.getElementById('mathGeoQuizStage').style.display = 'block';
  document.getElementById('mathGeoQuizActive').style.display = 'block';
  document.getElementById('mathGeoQuizVictory').style.display = 'none';

  mathGeoQuizQuestions = [];
  // 2 câu Hình phẳng 2D
  const flatPrompts = [
    { q: 'Bảo Long ơi, đâu là Hình Tròn (như bánh xe, mặt trời)?', targetId: 'tron', audioKey: 'math_q_shape_tron' },
    { q: 'Đâu là Hình Vuông có 4 cạnh dài bằng nhau?', targetId: 'vuong', audioKey: 'math_q_shape_vuong' },
    { q: 'Hình nào là Hình Tam Giác có 3 cạnh nhọn?', targetId: 'tam_giac', audioKey: 'math_q_shape_tam_giac' },
    { q: 'Đâu là Hình Chữ Nhật giống quyển sách hay cánh cửa?', targetId: 'chu_nhat', audioKey: 'math_q_shape_chu_nhat' }
  ].sort(() => Math.random() - 0.5).slice(0, 2);
  flatPrompts.forEach(sp => {
    mathGeoQuizQuestions.push({
      kind: 'shape',
      question: sp.q,
      audioKey: sp.audioKey,
      target: sp.targetId,
      options: [...MATH_SHAPES_DATA].sort(() => Math.random() - 0.5)
    });
  });

  // 2 câu Khối 3D Lớp 1
  const solidPrompts = [...MATH_SOLIDS_DATA].sort(() => Math.random() - 0.5).slice(0, 2);
  solidPrompts.forEach(sl => {
    mathGeoQuizQuestions.push({
      kind: 'shape',
      question: `Khối nào là ${sl.name}? (${sl.desc.split('—')[1]?.trim() || sl.desc})`,
      audioKey: sl.quizQKey,
      target: sl.id,
      options: [...MATH_SOLIDS_DATA].sort(() => Math.random() - 0.5)
    });
  });

  // 2 câu Đo cm bằng thước
  const rulerPicks = [...MATH_RULER_ITEMS].sort(() => Math.random() - 0.5).slice(0, 2);
  rulerPicks.forEach(item => {
    const opts = new Set([item.cm]);
    while (opts.size < 4) {
      opts.add(Math.max(1, Math.min(12, item.cm + [-2, -1, 1, 2, 3][Math.floor(Math.random() * 5)])));
    }
    mathGeoQuizQuestions.push({
      kind: 'ruler',
      question: `Nhìn thước đo xem ${item.name} dài bao nhiêu xăng-ti-mét (cm)?`,
      audioKey: 'math_q_ruler_len',
      rulerItem: item,
      targetCm: item.cm,
      options: Array.from(opts).sort((a, b) => a - b)
    });
  });

  // 3 câu Đồng hồ (mix Giờ đúng :00 & Giờ rưỡi :30)
  const clockHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => Math.random() - 0.5).slice(0, 3);
  clockHours.forEach((h, idx) => {
    const isHalf = idx === 1 || idx === 2;
    const opts = new Set([h]);
    while (opts.size < 4) opts.add(1 + Math.floor(Math.random() * 12));
    mathGeoQuizQuestions.push({
      kind: 'clock',
      question: isHalf
        ? 'Kim dài chỉ số 6! Đồng hồ chỉ mấy giờ rưỡi (:30)?'
        : 'Bảo Long nhìn kim đỏ xem đồng hồ chỉ mấy giờ đúng?',
      audioKey: isHalf ? 'math_q_clock_half' : 'math_q_clock',
      targetHour: h,
      targetMinute: isHalf ? 30 : 0,
      options: Array.from(opts).sort((a, b) => a - b)
    });
  });

  // 1 câu Xem Lịch & Thứ
  const dayQs = [
    {
      q: 'Bảo Long được nghỉ học cùng ba mẹ đi chơi vào cuối tuần nào?',
      audioKey: 'math_q_day_weekend',
      target: 8,
      optIds: [2, 4, 6, 8]
    },
    {
      q: 'Ngày học đầu tuần bé đi chào cờ là thứ mấy?',
      audioKey: 'math_q_day_monday',
      target: 2,
      optIds: [2, 3, 5, 7]
    }
  ];
  const dPick = dayQs[Math.floor(Math.random() * dayQs.length)];
  mathGeoQuizQuestions.push({
    kind: 'day',
    question: dPick.q,
    audioKey: dPick.audioKey,
    target: dPick.target,
    options: dPick.optIds.map(id => MATH_WEEKDAYS_DATA.find(d => d.id === id)).sort(() => Math.random() - 0.5)
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
    window.markDailyStep?.('play');
    if (typeof awardStars === 'function') awardStars(15, 'Siêu sao Hình Học, Đo cm & Xem Giờ!');

    document.getElementById('mathGeoQuizActive').style.display = 'none';
    document.getElementById('mathGeoQuizVictory').style.display = 'block';
    document.getElementById('mathGeoVictoryScore').innerText =
      `Bé đã trả lời đúng cả 10 câu Hình, Khối 3D, cm, Giờ & Lịch đạt ${mathGeoQuizScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = mathGeoQuizQuestions[mathGeoQuizIndex];
  document.getElementById('mathGeoProgressText').innerText = `Câu ${mathGeoQuizIndex + 1} / ${mathGeoQuizQuestions.length}`;
  document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
  document.getElementById('mathGeoQuizTitle').innerText = q.question;

  const myNav = window.appNavEpoch || 0;
  const myMathEpoch = mathEpoch;
  const clockWrap = document.getElementById('mathGeoQuizClockWrap');
  const visWrap = document.getElementById('mathGeoQuizVisualWrap');
  const optsGrid = document.getElementById('mathGeoQuizOptionsGrid');
  optsGrid.innerHTML = '';
  if (visWrap) { visWrap.style.display = 'none'; visWrap.innerHTML = ''; }
  let geoLocked = false;
  const qBoxEl = document.querySelector('#mathGeoQuizActive .quiz-question-box');
  const geoTourSteps = [{ key: q.audioKey, fallbackText: q.question, el: qBoxEl, pauseAfterMs: 160 }];

  if (q.kind === 'clock') {
    clockWrap.style.display = 'flex';
    renderClockFace('mathQuizClockSvg', q.targetHour, q.targetMinute || 0, false);
    q.options.forEach(h => {
      const isHalf = q.targetMinute === 30;
      const aKey = isHalf ? `math_clock_half_${h}` : `math_clock_${h}`;
      const labelTxt = isHalf ? `${h}:30 (${h} giờ rưỡi)` : `${h} giờ`;
      const btn = document.createElement('div');
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.className = 'math-ans-btn';
      btn.style.fontSize = isHalf ? '18px' : '24px';
      btn.innerHTML = `<span>${labelTxt}</span><button type="button" class="quiz-opt-speak-btn" aria-label="Nghe giờ">🔊</button>`;
      const spk = btn.querySelector('.quiz-opt-speak-btn');
      if (spk) spk.onclick = (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(aKey, null, labelTxt);
      };
      geoTourSteps.push({ key: aKey, fallbackText: labelTxt, el: btn, pauseAfterMs: 100 });
      btn.onclick = () => {
        if (geoLocked || btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        window.soundMgr.stopAll();
        if (h === q.targetHour) {
          geoLocked = true;
          btn.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          if (typeof showToast === 'function') showToast(`🕒 Chính xác! Đồng hồ chỉ ${labelTxt}!`);
          window.soundMgr.playPraiseThen(false,
            () => (window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch,
            () => {
              mathGeoQuizIndex++;
              loadGeoClockQuestion();
            }
          );
        } else {
          btn.classList.add('wrong');
          window.soundMgr.playWrong();
          window.soundMgr.speakTryAgain();
          if (typeof showToast === 'function') showToast('🕒 Mẹo: Xem kim NGẮN màu ĐỎ đang chỉ qua số nào nhé!');
        }
      };
      optsGrid.appendChild(btn);
    });
  } else if (q.kind === 'ruler') {
    clockWrap.style.display = 'none';
    if (visWrap) {
      visWrap.style.display = 'flex';
      visWrap.innerHTML = `<svg viewBox="0 0 560 150" class="math-ruler-svg" style="max-width:460px;">${buildMathRulerSvgMarkup(q.rulerItem)}</svg>`;
    }
    q.options.forEach(cmVal => {
      const btn = document.createElement('div');
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.className = 'math-ans-btn';
      btn.style.fontSize = '22px';
      btn.innerHTML = `<span>${cmVal} cm</span><button type="button" class="quiz-opt-speak-btn" aria-label="Nghe độ dài">🔊</button>`;
      const aKey = `math_cm_opt_${cmVal}`;
      const spk = btn.querySelector('.quiz-opt-speak-btn');
      if (spk) spk.onclick = (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(aKey, null, `${cmVal} xăng-ti-mét`);
      };
      geoTourSteps.push({ key: aKey, fallbackText: `${cmVal} xăng-ti-mét`, el: btn, pauseAfterMs: 100 });
      btn.onclick = () => {
        if (geoLocked || btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        window.soundMgr.stopAll();
        if (cmVal === q.targetCm) {
          geoLocked = true;
          btn.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          if (typeof showToast === 'function') showToast(`📏 Tuyệt vời! Chính xác là ${cmVal} cm!`);
          window.soundMgr.playPraiseThen(false,
            () => (window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch,
            () => {
              mathGeoQuizIndex++;
              loadGeoClockQuestion();
            }
          );
        } else {
          btn.classList.add('wrong');
          window.soundMgr.playWrong();
          window.soundMgr.speakTryAgain();
          if (typeof showToast === 'function') showToast('📏 Mẹo: Đuôi bắt đầu ở số 0, nhìn mũi nhọn chạm vạch số mấy nhé!');
        }
      };
      optsGrid.appendChild(btn);
    });
  } else if (q.kind === 'day') {
    clockWrap.style.display = 'none';
    q.options.forEach(dayObj => {
      const card = document.createElement('div');
      card.className = 'quiz-option-card';
      card.innerHTML = `
        <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe thứ">🔊</button>
        <div style="font-size:32px; font-weight:900; color:#ea580c; margin-bottom:4px;">${dayObj.short}</div>
        <div class="quiz-opt-name">${dayObj.name}</div>
        <div style="font-size:12px; color:#64748b; font-weight:700;">${dayObj.ja}</div>
      `;
      const aKey = `math_day_${dayObj.id}`;
      const spk = card.querySelector('.quiz-opt-speak-btn');
      if (spk) spk.onclick = (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(aKey, null, dayObj.name);
      };
      geoTourSteps.push({ key: aKey, fallbackText: dayObj.name, el: card, pauseAfterMs: 110 });
      card.onclick = () => {
        if (geoLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
        window.soundMgr.stopAll();
        if (dayObj.id === q.target) {
          geoLocked = true;
          card.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          if (typeof showToast === 'function') showToast(`📅 Chuẩn xác! Là ${dayObj.name}!`);
          window.soundMgr.playPraiseThen(false,
            () => (window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch,
            () => {
              mathGeoQuizIndex++;
              loadGeoClockQuestion();
            }
          );
        } else {
          card.classList.add('wrong');
          window.soundMgr.playWrong();
          window.soundMgr.speakTryAgain();
        }
      };
      optsGrid.appendChild(card);
    });
  } else {
    clockWrap.style.display = 'none';
    q.options.forEach(sh => {
      const card = document.createElement('div');
      card.className = 'quiz-option-card';
      card.innerHTML = `
        <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe tên hình">🔊</button>
        <div style="width:76px; height:76px; margin-bottom:6px;">${sh.svg.replace(/sphG_tpl/g, 'sphG_quiz')}</div>
        <div class="quiz-opt-name">${sh.name}</div>
      `;
      const spk = card.querySelector('.quiz-opt-speak-btn');
      if (spk) spk.onclick = (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(sh.audioKey, null, sh.name);
      };
      geoTourSteps.push({ key: sh.audioKey, fallbackText: sh.name, el: card, pauseAfterMs: 110 });
      card.onclick = () => {
        if (geoLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
        window.soundMgr.stopAll();
        if (sh.id === q.target) {
          geoLocked = true;
          card.classList.add('correct');
          mathGeoQuizScore += 10;
          addMathSessionScore(10);
          document.getElementById('mathGeoScoreText').innerText = `⭐ ${mathGeoQuizScore} điểm`;
          window.soundMgr.playCorrect();
          fireConfetti();
          if (typeof showToast === 'function') showToast(`📐 Tuyệt vời! Chính là ${sh.name}!`);
          window.soundMgr.playPraiseThen(false,
            () => (window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch,
            () => {
              mathGeoQuizIndex++;
              loadGeoClockQuestion();
            }
          );
        } else {
          card.classList.add('wrong');
          window.soundMgr.playWrong();
          window.soundMgr.speakTryAgain();
          if (typeof showToast === 'function') showToast(`📐 Thử nhìn lại hình khác nhé Bảo Long!`);
        }
      };
      optsGrid.appendChild(card);
    });
  }

  const playGeoTour = () => window.soundMgr.playChoiceTour(geoTourSteps);
  const btnHearGeo = document.getElementById('btnHearMathGeoQuiz');
  if (btnHearGeo) {
    btnHearGeo.onclick = () => {
      window.soundMgr.playClick();
      playGeoTour();
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && mathEpoch === myMathEpoch) playGeoTour();
  }, 60);
}

// ========================================================
// BẢNG SỐ 0-100, CẤU TẠO SỐ (いくつといくつ), KHỐI 3D, THƯỚC CM & LỊCH
// ========================================================
function renderMathHundredBoard() {
  const btnToggle = document.getElementById('btnToggleHundredBoard');
  const box = document.getElementById('mathHundredBoardBox');
  const grid = document.getElementById('mathHundredGrid');
  if (!grid || !box) return;

  if (btnToggle) {
    const isOpen = box.style.display !== 'none';
    btnToggle.innerHTML = isOpen ? '<span>🔼</span> Ẩn bảng 1–100' : '<span>🔢</span> Bảng 1–100 (HK2)';
    btnToggle.onclick = () => {
      window.soundMgr.playClick();
      const willOpen = box.style.display === 'none';
      box.style.display = willOpen ? 'block' : 'none';
      btnToggle.innerHTML = willOpen ? '<span>🔼</span> Ẩn bảng 1–100' : '<span>🔢</span> Bảng 1–100 (HK2)';
    };
  }

  document.querySelectorAll('.math-skip-btn').forEach(btn => {
    const step = Number(btn.dataset.step || 1);
    btn.classList.toggle('active-filter', step === mathHundredSkipStep);
    btn.onclick = () => {
      window.soundMgr.playClick();
      mathHundredSkipStep = step;
      renderMathHundredBoard();
    };
  });

  grid.innerHTML = '';
  for (let n = 1; n <= 100; n++) {
    const cell = document.createElement('button');
    cell.type = 'button';
    const isHi = mathHundredSkipStep > 1 && n % mathHundredSkipStep === 0;
    cell.className = `math-hundred-cell ${isHi ? 'skip-hi' : ''}`;
    cell.innerText = String(n);
    cell.onclick = () => {
      grid.querySelectorAll('.math-hundred-cell.selected').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      window.soundMgr.playPop();
      window.soundMgr.playAudioFile(`math_v_${n}`, null, mathNumberToViText(n));
      if (typeof showToast === 'function') {
        showToast(`🔢 Số ${n}: ${mathNumberToViText(n)}`);
      }
    };
    grid.appendChild(cell);
  }
}

function renderMathBondsWidget() {
  const diag = document.getElementById('mathBondDiagram');
  const grid = document.getElementById('mathBondPairsGrid');
  if (!diag || !grid) return;

  document.querySelectorAll('.math-bond-target-btn').forEach(btn => {
    const t = Number(btn.dataset.target);
    btn.classList.toggle('active-filter', t === mathBondTarget);
    btn.onclick = () => {
      window.soundMgr.playClick();
      mathBondTarget = t;
      mathBondSelectedA = Math.min(mathBondSelectedA, t);
      renderMathBondsWidget();
    };
  });

  const a = mathBondSelectedA;
  const b = mathBondTarget - a;
  diag.innerHTML = `
    <div class="bond-sakura-card">
      <div class="bond-top-node">${mathBondTarget}</div>
      <div class="bond-branches">↙ &nbsp;&nbsp;&nbsp; ↘</div>
      <div class="bond-bottom-row">
        <div class="bond-part-node a">${a}<span>${'⭐'.repeat(a)}</span></div>
        <div class="bond-part-node b">${b}<span>${'🌸'.repeat(b)}</span></div>
      </div>
      <div class="bond-sentence"><strong>${mathBondTarget}</strong> gồm <strong>${a}</strong> và <strong>${b}</strong> • ${a} + ${b} = ${mathBondTarget}</div>
    </div>`;

  grid.innerHTML = '';
  for (let i = 0; i <= mathBondTarget; i++) {
    const j = mathBondTarget - i;
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `math-bond-pair-btn ${i === mathBondSelectedA ? 'active' : ''}`;
    pill.innerHTML = `<span>${i}</span> + <span>${j}</span>`;
    pill.onclick = () => {
      mathBondSelectedA = i;
      window.soundMgr.playPop();
      window.soundMgr.playAudioFile(`math_bond_${mathBondTarget}_${i}`, null, `${mathBondTarget} gồm ${i} và ${j}`);
      renderMathBondsWidget();
    };
    grid.appendChild(pill);
  }
}

function renderMathSolids() {
  const grid = document.getElementById('mathSolidsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  MATH_SOLIDS_DATA.forEach(sl => {
    const card = document.createElement('div');
    card.className = 'math-shape-card';
    card.innerHTML = `
      <div class="shape-svg-wrap">${sl.svg.replace(/sphG_tpl/g, 'sphG_learn')}</div>
      <div class="shape-title">${sl.name}</div>
      <div class="shape-ja">🇯🇵 ${sl.ja}</div>
      <div class="shape-traits">${sl.desc}</div>
    `;
    card.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(sl.audioKey, null, sl.name);
      if (typeof showToast === 'function') showToast(`🧊 ${sl.name}: ${sl.desc}`);
    };
    grid.appendChild(card);
  });
}

function buildMathRulerSvgMarkup(item) {
  const cmWidth = 40;
  const startX = 40;
  let ticks = '';
  for (let c = 0; c <= 12; c++) {
    const x = startX + c * cmWidth;
    ticks += `<line x1="${x}" y1="78" x2="${x}" y2="${c % 5 === 0 ? 104 : 96}" stroke="#0f172a" stroke-width="${c === item.cm ? 3 : 2}"/>`;
    ticks += `<text x="${x}" y="124" text-anchor="middle" font-size="14" font-weight="900" fill="${c === item.cm || c === 0 ? '#e11d48' : '#334155'}" font-family="Nunito,sans-serif">${c}</text>`;
  }
  const barW = item.cm * cmWidth;
  return `
    <rect x="20" y="78" width="520" height="58" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
    ${ticks}
    <text x="536" y="124" font-size="12" font-weight="900" fill="#92400e">cm</text>
    <rect x="${startX}" y="28" width="${barW}" height="32" rx="10" fill="${item.color}" stroke="#0f172a" stroke-width="2.5"/>
    <text x="${startX + barW / 2}" y="49" text-anchor="middle" font-size="15" font-weight="900" fill="#ffffff" font-family="Nunito,sans-serif">${item.icon} ${item.cm} cm</text>
    <line x1="${startX + barW}" y1="60" x2="${startX + barW}" y2="78" stroke="#e11d48" stroke-width="3" stroke-dasharray="4 3"/>
  `;
}

function renderMathRuler() {
  const btns = document.getElementById('mathRulerItemBtns');
  const svg = document.getElementById('mathRulerSvg');
  const readout = document.getElementById('mathRulerReadout');
  const btnHear = document.getElementById('btnHearRuler');
  if (!btns || !svg) return;

  const item = MATH_RULER_ITEMS[mathRulerSelectedIdx] || MATH_RULER_ITEMS[0];
  btns.innerHTML = '';
  MATH_RULER_ITEMS.forEach((it, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `tool-chip ${idx === mathRulerSelectedIdx ? 'active-filter' : ''}`;
    b.innerText = it.label;
    b.onclick = () => {
      mathRulerSelectedIdx = idx;
      window.soundMgr.playPop();
      renderMathRuler();
      window.soundMgr.playAudioFile(`math_cm_${it.cm}`, null, `${it.name} dài ${it.cm} xăng-ti-mét`);
    };
    btns.appendChild(b);
  });

  svg.innerHTML = buildMathRulerSvgMarkup(item);
  if (readout) {
    readout.innerText = `📏 ${item.name} dài ${item.cm} xăng-ti-mét (${item.cm} cm)`;
  }
  if (btnHear) {
    btnHear.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`math_cm_${item.cm}`, null, `${item.name} dài ${item.cm} xăng-ti-mét`);
    };
  }
}

function renderMathDays() {
  const grid = document.getElementById('mathDaysGrid');
  const tipBox = document.getElementById('mathDayTipBox');
  if (!grid) return;

  grid.innerHTML = '';
  MATH_WEEKDAYS_DATA.forEach(d => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `math-day-card ${d.isWeekend ? 'weekend' : ''}`;
    btn.innerHTML = `
      <div class="day-short">${d.short}</div>
      <div class="day-name">${d.name}</div>
      <div class="day-ja">${d.ja}</div>
    `;
    btn.onclick = () => {
      grid.querySelectorAll('.math-day-card.active').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      window.soundMgr.playPop();
      window.soundMgr.playAudioFile(`math_day_${d.id}`, null, d.name);
      if (tipBox) tipBox.innerText = `📅 ${d.name} (${d.ja}): ${d.desc}`;
    };
    grid.appendChild(btn);
  });
}
