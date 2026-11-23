// Ứng dụng Học Tiếng Việt cho Bé Mon (6 tuổi)
// Tích hợp lộ trình Từ mới, Tập đánh vần, Bảng chữ cái và Game ghép chữ

let currentMode = 'vocab'; // 'vocab' | 'phonics' | 'alphabet' | 'game'
let currentLessonIdx = 0;
let currentWordModal = null;

// Game State
let gameCurrentIndex = 0;
let gameQuestions = [];
let gameSlots = [];
let gameScore = 0;

// Canvas Drawing State
let canvas, ctx;
let isDrawing = false;
let drawColor = '#0284c7';

document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderCurrentView();
  initCanvas();
});

function initEventListeners() {
  // Chuyển Tab chế độ
  document.querySelectorAll('.mode-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = btn.dataset.mode;
      switchMode(mode);
    });
  });

  // Tùy chỉnh giọng đọc & tốc độ
  const btnAccent = document.getElementById('btnAccent');
  if (btnAccent) {
    btnAccent.addEventListener('click', () => {
      if (window.soundMgr.accent === 'hn') {
        window.soundMgr.setAccent('sg');
        btnAccent.innerHTML = '🗣️ Chuẩn Sài Gòn';
        showToast('Đã đổi sang giọng Chuẩn Sài Gòn');
      } else {
        window.soundMgr.setAccent('hn');
        btnAccent.innerHTML = '🗣️ Chuẩn Hà Nội';
        showToast('Đã đổi sang giọng Chuẩn Hà Nội');
      }
    });
  }

  const btnSpeed = document.getElementById('btnSpeed');
  if (btnSpeed) {
    btnSpeed.addEventListener('click', () => {
      if (window.soundMgr.speed > 0.8) {
        window.soundMgr.setSpeed('slow');
        btnSpeed.innerHTML = '🐢 Tốc độ: Chậm';
        showToast('Đã chuyển sang Tốc độ Đọc Chậm cho Bé');
      } else {
        window.soundMgr.setSpeed('normal');
        btnSpeed.innerHTML = '⚡ Tốc độ: Chuẩn';
        showToast('Đã chuyển sang Tốc độ Chuẩn');
      }
    });
  }

  const btnMute = document.getElementById('btnMute');
  if (btnMute) {
    btnMute.addEventListener('click', () => {
      window.soundMgr.isMuted = !window.soundMgr.isMuted;
      btnMute.innerHTML = window.soundMgr.isMuted ? '🔇 Tắt âm' : '🔊 Âm thanh';
      showToast(window.soundMgr.isMuted ? 'Đã tắt âm thanh' : 'Đã bật âm thanh');
    });
  }

  // Nút Thử thách ghép hình cam
  const bigChallengeBtn = document.getElementById('bigChallengeBtn');
  if (bigChallengeBtn) {
    bigChallengeBtn.addEventListener('click', () => {
      startMiniGame();
    });
  }

  // Modal đóng
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
      closeModal();
    }
  });
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);

  // Modal Audio Buttons
  document.getElementById('modalBtnSpeakWord').addEventListener('click', () => {
    if (currentWordModal) {
      window.soundMgr.playClick();
      window.soundMgr.speak(currentWordModal.word);
    }
  });

  document.getElementById('modalBtnSpell').addEventListener('click', () => {
    if (currentWordModal) {
      window.soundMgr.playClick();
      window.soundMgr.spellWord(currentWordModal.spellText || currentWordModal.breakdown, currentWordModal.word);
    }
  });

  document.getElementById('modalBtnToggleDrawing').addEventListener('click', () => {
    const box = document.getElementById('canvasDrawingBox');
    box.classList.toggle('active');
    if (box.classList.contains('active')) {
      clearCanvas();
      drawLetterGuide(currentWordModal.word);
    }
  });
}

function switchMode(mode) {
  currentMode = mode;
  currentLessonIdx = 0;

  document.querySelectorAll('.mode-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  if (mode === 'vocab') {
    showToast('Đã chuyển sang: 📖 Học từ mới');
  } else if (mode === 'phonics') {
    showToast('Đã chuyển sang: 🔤 Tập ĐÁNH VẦN');
  } else if (mode === 'alphabet') {
    showToast('Đã chuyển sang: 🔠 Bảng chữ cái ABC');
  } else if (mode === 'game') {
    showToast('Đã chuyển sang: 🧩 Thử thách ghép chữ');
  }

  window.soundMgr.playClick();
  renderCurrentView();
}

function renderCurrentView() {
  const roadmapBox = document.getElementById('roadmapBox');
  const cardsContainer = document.getElementById('cardsContainer');
  const alphabetContainer = document.getElementById('alphabetContainer');
  const gameViewContainer = document.getElementById('gameViewContainer');

  // Ẩn tất cả trước
  cardsContainer.style.display = 'none';
  alphabetContainer.style.display = 'none';
  gameViewContainer.style.display = 'none';
  roadmapBox.style.display = 'none';

  if (currentMode === 'vocab') {
    roadmapBox.style.display = 'block';
    cardsContainer.style.display = 'grid';
    renderRoadmapHeader(VOCAB_LESSONS, 'LỘ TRÌNH HỌC TẬP', '⭐ Thử thách ghép hình');
    renderVocabCards();
  } else if (currentMode === 'phonics') {
    roadmapBox.style.display = 'block';
    cardsContainer.style.display = 'grid';
    renderRoadmapHeader(PHONICS_LESSONS, 'TẬP ĐÁNH VẦN', '⭐ Thử thách ghép vần');
    renderPhonicsCards();
  } else if (currentMode === 'alphabet') {
    alphabetContainer.style.display = 'block';
    renderAlphabetView();
  } else if (currentMode === 'game') {
    gameViewContainer.style.display = 'block';
    renderGameView();
  }
}

function renderRoadmapHeader(lessonsList, tagLabel, challengeLabel) {
  const currentLesson = lessonsList[currentLessonIdx];
  document.getElementById('roadmapTag').innerText = tagLabel;
  document.getElementById('roadmapTitle').innerText = currentLesson.title;
  document.getElementById('bigChallengeBtnText').innerText = `${challengeLabel} (10 câu)`;

  const tabsTrack = document.getElementById('lessonTabsTrack');
  tabsTrack.innerHTML = '';

  lessonsList.forEach((les, idx) => {
    const tab = document.createElement('button');
    tab.className = `lesson-tab ${idx === currentLessonIdx ? 'active' : ''}`;
    tab.innerHTML = `<span>Bài ${les.id}</span> <span style="font-size:12px; opacity:0.8">(${les.words.length} từ)</span>`;
    tab.addEventListener('click', () => {
      currentLessonIdx = idx;
      window.soundMgr.playClick();
      renderCurrentView();
    });
    tabsTrack.appendChild(tab);
  });
}

function renderVocabCards() {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';
  const currentLesson = VOCAB_LESSONS[currentLessonIdx];

  currentLesson.words.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <div class="star-corner">★</div>
      <div class="word-icon-img">${w.icon}</div>
      <div class="word-text">${w.word}</div>
      <div class="word-action-tag">Chơi ngay</div>
      <div class="word-ja-sub">${w.ja}</div>
    `;

    card.addEventListener('click', () => {
      openModal(w);
    });
    cardsContainer.appendChild(card);
  });
}

function renderPhonicsCards() {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';
  const currentLesson = PHONICS_LESSONS[currentLessonIdx];

  currentLesson.words.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <div class="star-corner">★</div>
      <div class="word-icon-img">${w.icon}</div>
      <div class="word-text">${w.word}</div>
      <div class="word-rhyme-tag">${w.rhyme}</div>
      <div class="word-ja-sub">${w.ja}</div>
    `;

    card.addEventListener('click', () => {
      openModal(w);
    });
    cardsContainer.appendChild(card);
  });
}

function renderAlphabetView() {
  const alphaGrid = document.getElementById('alphabetGrid');
  alphaGrid.innerHTML = '';

  ALPHABET_DATA.forEach(item => {
    const card = document.createElement('div');
    card.className = 'alpha-card';
    card.innerHTML = `
      <div class="alpha-letter">${item.char} ${item.lower}</div>
      <div class="alpha-icon">${item.icon}</div>
      <div class="alpha-word">${item.word}</div>
      <div class="alpha-ja">${item.ja}</div>
    `;
    card.addEventListener('click', () => {
      window.soundMgr.playClick();
      window.soundMgr.speak(`${item.char}. ${item.spell}`);
      showToast(`Chữ cái ${item.char}: ${item.word}`);
    });
    alphaGrid.appendChild(card);
  });

  // Dấu thanh
  const tonesGrid = document.getElementById('tonesGrid');
  tonesGrid.innerHTML = '';
  TONES_DATA.forEach(tone => {
    const tCard = document.createElement('div');
    tCard.className = 'tone-card';
    tCard.innerHTML = `
      <div class="tone-badge">${tone.sign}</div>
      <div class="tone-info">
        <h4>${tone.name}</h4>
        <p>${tone.desc}</p>
        <div class="tone-eg">Ví dụ: ${tone.example}</div>
      </div>
    `;
    tCard.addEventListener('click', () => {
      window.soundMgr.playClick();
      window.soundMgr.speak(tone.audioText);
    });
    tonesGrid.appendChild(tCard);
  });
}

// MODAL
function openModal(wordObj) {
  currentWordModal = wordObj;
  window.soundMgr.playClick();
  window.soundMgr.speak(wordObj.word);

  document.getElementById('modalIcon').innerText = wordObj.icon;
  document.getElementById('modalWord').innerText = wordObj.word;

  // Breakdown items
  const breakdownBox = document.getElementById('modalBreakdownBox');
  breakdownBox.innerHTML = '';
  const parts = wordObj.breakdown.split('-');
  parts.forEach(part => {
    const span = document.createElement('div');
    span.className = 'breakdown-item';
    span.innerText = part.trim();
    breakdownBox.appendChild(span);
  });

  document.getElementById('modalJaText').innerText = wordObj.ja ? `🇯🇵 ${wordObj.ja}` : '';
  document.getElementById('modalExample').innerText = `Ví dụ: "${wordObj.example}"`;

  // Ẩn bảng vẽ nếu đang mở
  document.getElementById('canvasDrawingBox').classList.remove('active');

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  window.soundMgr.playClick();
}

// CANVAS DRAWING (TẬP VIẾT CHỮ)
function initCanvas() {
  canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  canvas.width = 380;
  canvas.height = 180;

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  // Touch support for iPad / smartphone
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  canvas.addEventListener('touchend', (e) => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });

  document.getElementById('btnCanvasClear').addEventListener('click', () => {
    clearCanvas();
    if (currentWordModal) drawLetterGuide(currentWordModal.word);
  });

  document.querySelectorAll('.color-picker-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      drawColor = dot.dataset.color;
      showToast('Đã đổi màu cọ vẽ!');
    });
  });
}

function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDraw(e) {
  isDrawing = true;
  const coords = getCanvasCoords(e);
  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
}

function draw(e) {
  if (!isDrawing) return;
  const coords = getCanvasCoords(e);
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = drawColor;
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
}

function stopDraw() {
  isDrawing = false;
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLetterGuide(word) {
  ctx.save();
  ctx.font = 'bold 90px Nunito, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(word, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

// MINI GAME: THỬ THÁCH GHÉP CHỮ (10 CÂU)
function startMiniGame() {
  currentMode = 'game';
  switchMode('game');
  gameQuestions = [...SPELL_BUILDER_DATA];
  // Xáo trộn câu hỏi
  gameQuestions.sort(() => Math.random() - 0.5);
  gameCurrentIndex = 0;
  gameScore = 0;
  loadGameQuestion();
}

function renderGameView() {
  if (gameQuestions.length === 0) {
    gameQuestions = [...SPELL_BUILDER_DATA];
  }
  loadGameQuestion();
}

function loadGameQuestion() {
  if (gameCurrentIndex >= gameQuestions.length) {
    showGameVictory();
    return;
  }

  const q = gameQuestions[gameCurrentIndex];
  document.getElementById('gameProgressText').innerText = `Câu ${gameCurrentIndex + 1} / ${gameQuestions.length}`;
  document.getElementById('gameStarsCount').innerText = `⭐ ${gameScore} sao`;

  document.getElementById('gameTargetIcon').innerText = q.icon;
  document.getElementById('gameTargetHint').innerText = `Ghép chữ: "${q.target}" (${q.meaning})`;
  document.getElementById('gameTargetJa').innerText = `🇯🇵 Nghĩa tiếng Nhật: ${q.meaning}`;

  // Tạo Slots
  const slotsContainer = document.getElementById('puzzleSlots');
  slotsContainer.innerHTML = '';
  gameSlots = new Array(q.puzzle.length).fill('');

  q.puzzle.forEach((_, idx) => {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.id = `slot-${idx}`;
    slot.innerText = '';
    slotsContainer.appendChild(slot);
  });

  // Tạo lựa chọn các chữ cái
  const optionsContainer = document.getElementById('optionsLettersRow');
  optionsContainer.innerHTML = '';

  // Xáo trộn chữ cái gợi ý
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  shuffledOptions.forEach((char, idx) => {
    const btn = document.createElement('button');
    btn.className = 'letter-option-btn';
    btn.innerText = char;
    btn.id = `opt-btn-${idx}`;
    btn.addEventListener('click', () => {
      handleLetterChoose(char, btn);
    });
    optionsContainer.appendChild(btn);
  });

  // Tự động phát âm từ gợi ý
  window.soundMgr.speak(q.target);

  // Nút nghe lại
  document.getElementById('btnHearHint').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.speak(q.target);
  };

  // Nút xóa làm lại
  document.getElementById('btnResetPuzzle').onclick = () => {
    window.soundMgr.playClick();
    loadGameQuestion();
  };
}

function handleLetterChoose(char, btnElement) {
  // Tìm ô slot trống đầu tiên
  const emptyIdx = gameSlots.findIndex(s => s === '');
  if (emptyIdx === -1) return;

  window.soundMgr.playClick();
  btnElement.classList.add('used');
  gameSlots[emptyIdx] = char;

  const slotElement = document.getElementById(`slot-${emptyIdx}`);
  slotElement.innerText = char;
  slotElement.classList.add('filled');

  // Nếu đã điền hết các ô slot thì kiểm tra
  if (gameSlots.every(s => s !== '')) {
    checkPuzzleResult();
  }
}

function checkPuzzleResult() {
  const q = gameQuestions[gameCurrentIndex];
  const currentWord = gameSlots.join('');

  if (currentWord === q.target) {
    // Bé Mon làm đúng!
    window.soundMgr.playCorrect();
    fireConfetti();
    gameScore += 10;
    document.getElementById('gameStarsCount').innerText = `⭐ ${gameScore} sao`;
    showToast(`🎉 Hoan hô bé Mon! Đã ghép đúng chữ "${q.target}"!`);
    window.soundMgr.speak(`Bé Mon giỏi quá! ${q.target}!`);

    setTimeout(() => {
      gameCurrentIndex++;
      loadGameQuestion();
    }, 1800);
  } else {
    // Chưa đúng, thử lại
    window.soundMgr.playWrong();
    showToast(`Bé Mon ơi chưa chính xác rồi, cùng thử lại nhé! ❤️`);

    setTimeout(() => {
      // Reset slots
      loadGameQuestion();
    }, 1200);
  }
}

function showGameVictory() {
  window.soundMgr.playVictory();
  fireConfetti();

  const gameViewContainer = document.getElementById('gameViewContainer');
  gameViewContainer.innerHTML = `
    <div style="padding: 40px 20px; text-align: center;">
      <div style="font-size: 80px; margin-bottom: 16px;">🏆👑🎉</div>
      <h2 style="font-size: 32px; color: #0284c7; font-weight: 900; margin-bottom: 10px;">XUẤT SẮC QUÁ BÉ MON ƠI!</h2>
      <p style="font-size: 18px; color: #475569; margin-bottom: 20px;">Bé Mon đã hoàn thành trọn vẹn thử thách và đạt được <strong>${gameScore} Sao Vàng</strong>!</p>
      <div style="display: flex; justify-content: center; gap: 14px;">
        <button class="challenge-btn" onclick="startMiniGame()">🔄 Chơi lại lần nữa</button>
        <button class="home-btn" onclick="switchMode('vocab')">📖 Về học từ mới</button>
      </div>
    </div>
  `;
}

// TOAST
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  toast.innerText = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// CONFETTI EFFECT
function fireConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 100;
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationId;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // Trọng lực
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (alive) {
      animationId = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }

  updateConfetti();
}
