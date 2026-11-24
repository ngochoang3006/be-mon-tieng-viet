// Ứng dụng Học Tiếng Việt cho Bé Bảo Long (6 tuổi)
// Tích hợp lộ trình Từ mới, Tập đánh vần, Bảng chữ cái, Khủng Long, Xe Cộ và Khu Trò Chơi

let currentMode = 'vocab'; // 'vocab' | 'phonics' | 'alphabet' | 'dino' | 'vehicles' | 'game'
let currentLessonIdx = 0;
let currentWordModal = null;

// Game Hub State
let currentSubGame = 'puzzle'; // 'puzzle' | 'dino_memory' | 'quiz'

// Puzzle Game State
let gameCurrentIndex = 0;
let gameQuestions = [];
let gameSlots = [];
let gameScore = 0;

// Dino Memory Game State
let memoryCards = [];
let memoryFlippedCards = [];
let memoryMatchedCount = 0;
let memoryFlips = 0;
let memoryIsLocked = false;

// Vehicle Quiz State
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScore = 0;

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

  // Tùy chỉnh giọng đọc Người thật: Nữ (Cô giáo) hoặc Nam (Ba)
  const btnVoiceGender = document.getElementById('btnVoiceGender');
  if (btnVoiceGender) {
    btnVoiceGender.addEventListener('click', () => {
      if (window.soundMgr.gender === 'female') {
        window.soundMgr.setGender('male');
        btnVoiceGender.innerHTML = '<span>👨</span> <span>Giọng: Nam (Ba)</span>';
        showToast('Đã đổi sang Giọng Nam (Nam Minh) người thật ấm áp!');
        window.soundMgr.playClick();
        window.soundMgr.speakWord('bố');
      } else {
        window.soundMgr.setGender('female');
        btnVoiceGender.innerHTML = '<span>👩</span> <span>Giọng: Nữ (Cô)</span>';
        showToast('Đã đổi sang Giọng Nữ (Hoài My) người thật truyền cảm!');
        window.soundMgr.playClick();
        window.soundMgr.speakWord('mẹ');
      }
    });
  }

  const btnSpeed = document.getElementById('btnSpeed');
  if (btnSpeed) {
    btnSpeed.addEventListener('click', () => {
      if (window.soundMgr.speedRate > 0.9) {
        window.soundMgr.setSpeed('slow');
        btnSpeed.innerHTML = '<span>🐢</span> <span>Chậm</span>';
        showToast('Đã chuyển sang Tốc độ Đọc Chậm cho Bảo Long');
      } else {
        window.soundMgr.setSpeed('normal');
        btnSpeed.innerHTML = '<span>⚡</span> <span>Chuẩn</span>';
        showToast('Đã chuyển sang Tốc độ Chuẩn');
      }
    });
  }

  const btnMute = document.getElementById('btnMute');
  if (btnMute) {
    btnMute.addEventListener('click', () => {
      window.soundMgr.isMuted = !window.soundMgr.isMuted;
      btnMute.innerHTML = window.soundMgr.isMuted ? '<span>🔇</span> <span>Tắt</span>' : '<span>🔊</span> <span>Bật</span>';
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
      window.soundMgr.speakWord(currentWordModal.word);
    }
  });

  document.getElementById('modalBtnSpell').addEventListener('click', () => {
    if (currentWordModal) {
      window.soundMgr.playClick();
      if (currentWordModal.spellKey) {
        window.soundMgr.playAudioFile(currentWordModal.spellKey, null, currentWordModal.spellText);
      } else {
        window.soundMgr.spellWord(currentWordModal.word, currentWordModal.spellText);
      }
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
  } else if (mode === 'dino') {
    showToast('Đã chuyển sang: 🦖 Thế giới Khủng Long của Bảo Long!');
  } else if (mode === 'vehicles') {
    showToast('Đã chuyển sang: 🚗 Thế giới Xe Cộ & Shinkansen!');
  } else if (mode === 'game') {
    showToast('Đã chuyển sang: 🎮 Khu Trò Chơi (Game Hub)');
  }

  window.soundMgr.playClick();
  renderCurrentView();
}

function renderCurrentView() {
  const roadmapBox = document.getElementById('roadmapBox');
  const cardsContainer = document.getElementById('cardsContainer');
  const alphabetContainer = document.getElementById('alphabetContainer');
  const dinoContainer = document.getElementById('dinoContainer');
  const vehicleContainer = document.getElementById('vehicleContainer');
  const gameViewContainer = document.getElementById('gameViewContainer');

  // Ẩn tất cả trước
  cardsContainer.style.display = 'none';
  alphabetContainer.style.display = 'none';
  if (dinoContainer) dinoContainer.style.display = 'none';
  if (vehicleContainer) vehicleContainer.style.display = 'none';
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
  } else if (currentMode === 'dino') {
    if (dinoContainer) {
      dinoContainer.style.display = 'block';
      renderDinoView();
    }
  } else if (currentMode === 'vehicles') {
    if (vehicleContainer) {
      vehicleContainer.style.display = 'block';
      renderVehicleView();
    }
  } else if (currentMode === 'game') {
    gameViewContainer.style.display = 'block';
    switchSubGame(currentSubGame);
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
      <div style="font-size: 13px; font-weight: 800; color: #15803d; background: #dcfce7; border-radius: 10px; padding: 2px 8px; display: inline-block; margin: 2px 0 6px 0;">Phát âm: "${item.phonetic}"</div>
      <div class="alpha-icon">${item.icon}</div>
      <div class="alpha-word">${item.word}</div>
      <div class="alpha-ja">${item.ja}</div>
    `;
    card.addEventListener('click', () => {
      window.soundMgr.playClick();
      // Đọc đúng chuẩn ngữ âm của chữ cái bằng audio người thật: A -> "a", Đ -> "đờ", H -> "hờ", B -> "bờ"...
      window.soundMgr.speakAlphabet(item.lower, item.phonetic);
      showToast(`Chữ ${item.char} ${item.lower}: phát âm là "${item.phonetic}"`);
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
      window.soundMgr.speakTone(tone.key, tone.audioText);
    });
    tonesGrid.appendChild(tCard);
  });
}

function renderDinoView() {
  const container = document.getElementById('dinoCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const btnRoar = document.getElementById('btnDinoRoar');
  if (btnRoar) {
    btnRoar.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile('cheer_dino', null, 'Gầm to nào Bảo Long ơi! Roar!');
      fireConfetti();
    };
  }

  DINO_LESSONS.forEach(dino => {
    const card = document.createElement('div');
    card.className = 'word-card dino-card';
    card.innerHTML = `
      <div class="star-corner">🦖</div>
      <div class="word-icon-img">${dino.icon}</div>
      <div class="word-dino-title">${dino.dinoName}</div>
      <div class="word-text" style="color: #047857;">${dino.word}</div>
      <div class="word-action-tag" style="background:#dcfce7; color:#15803d;">Khám phá ngay</div>
      <div class="word-ja-sub">${dino.ja}</div>
      <div class="word-fact-tag">💡 ${dino.funFact}</div>
    `;

    card.addEventListener('click', () => {
      openModal(dino);
    });
    container.appendChild(card);
  });
}

function renderVehicleView() {
  const container = document.getElementById('vehicleCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  VEHICLE_LESSONS.forEach(veh => {
    const card = document.createElement('div');
    card.className = 'word-card veh-card';
    card.innerHTML = `
      <div class="star-corner">🚗</div>
      <div class="word-icon-img">${veh.icon}</div>
      <div class="word-dino-title" style="color: #0369a1;">${veh.vehName}</div>
      <div class="word-text" style="color: #0284c7;">${veh.word}</div>
      <div class="word-action-tag" style="background:#e0f2fe; color:#0369a1;">Chạm để nghe còi</div>
      <div class="word-ja-sub">${veh.ja}</div>
      <div class="word-fact-tag" style="background:#f0f9ff; border-left:3px solid #0284c7;">💡 ${veh.funFact}</div>
    `;

    card.addEventListener('click', () => {
      openModal(veh);
    });
    container.appendChild(card);
  });
}

// MODAL
function openModal(wordObj) {
  currentWordModal = wordObj;
  window.soundMgr.playClick();
  if (wordObj.audioKey) {
    window.soundMgr.playAudioFile(wordObj.audioKey, null, wordObj.word);
  } else {
    window.soundMgr.speakWord(wordObj.word);
  }

  document.getElementById('modalIcon').innerText = wordObj.icon;
  document.getElementById('modalWord').innerText = wordObj.word;

  // Breakdown items
  const breakdownBox = document.getElementById('modalBreakdownBox');
  breakdownBox.innerHTML = '';
  const parts = (wordObj.breakdown || wordObj.word).split(/[-+,]/);
  parts.forEach(part => {
    const trimmed = part.trim();
    if (trimmed) {
      const span = document.createElement('div');
      span.className = 'breakdown-item';
      span.innerText = trimmed;
      span.title = `Chạm để nghe âm "${trimmed}"`;
      span.style.cursor = 'pointer';
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        const clean = trimmed.toLowerCase();
        if (clean === 'c') {
          window.soundMgr.speakAlphabet('c', 'cờ');
          showToast('Chữ c: phát âm là "cờ"');
        } else if (clean === 'b') {
          window.soundMgr.speakAlphabet('b', 'bờ');
          showToast('Chữ b: phát âm là "bờ"');
        } else if (clean === 'd') {
          window.soundMgr.speakAlphabet('d', 'dờ');
          showToast('Chữ d: phát âm là "dờ"');
        } else if (clean === 'đ') {
          window.soundMgr.speakAlphabet('đ', 'đờ');
          showToast('Chữ đ: phát âm là "đờ"');
        } else if (clean === 't') {
          window.soundMgr.speakAlphabet('t', 'tờ');
          showToast('Chữ t: phát âm là "tờ"');
        } else if (clean === 's') {
          window.soundMgr.speakAlphabet('s', 'sờ');
          showToast('Chữ s: phát âm là "sờ"');
        } else {
          window.soundMgr.speakWord(clean);
        }
      });
      breakdownBox.appendChild(span);
    }
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

  const modalBox = document.querySelector('.modal-content');
  const w = modalBox ? Math.min(360, modalBox.clientWidth - 40) : 340;
  canvas.width = Math.max(280, w);
  canvas.height = 160;

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

  // Tự động phát âm từ gợi ý bằng audio người thật
  window.soundMgr.speakWord(q.target);

  // Nút nghe lại
  document.getElementById('btnHearHint').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.speakWord(q.target);
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
    // Bảo Long làm đúng!
    window.soundMgr.playCorrect();
    fireConfetti();
    gameScore += 10;
    document.getElementById('gameStarsCount').innerText = `⭐ ${gameScore} sao`;
    showToast(`🎉 Hoan hô Bảo Long! Đã ghép đúng chữ "${q.target}"!`);
    window.soundMgr.speakCheer('correct');

    setTimeout(() => {
      gameCurrentIndex++;
      loadGameQuestion();
    }, 1800);
  } else {
    // Chưa đúng, thử lại
    window.soundMgr.playWrong();
    showToast(`Bảo Long ơi chưa chính xác rồi, cùng thử lại nhé! ❤️`);
    window.soundMgr.speakCheer('wrong');

    setTimeout(() => {
      // Reset slots
      loadGameQuestion();
    }, 1200);
  }
}

function showGameVictory() {
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  fireConfetti();

  const puzzlePane = document.getElementById('subgamePuzzlePane');
  if (puzzlePane) {
    puzzlePane.innerHTML = `
      <div style="padding: 30px 16px; text-align: center;">
        <div style="font-size: 72px; margin-bottom: 14px;">🏆👑🦖🎉</div>
        <h2 style="font-size: 28px; color: #0284c7; font-weight: 900; margin-bottom: 8px;">XUẤT SẮC QUÁ BẢO LONG ƠI!</h2>
        <p style="font-size: 16px; color: #475569; margin-bottom: 20px;">Bảo Long đã hoàn thành trọn vẹn thử thách ghép chữ và đạt được <strong>${gameScore} Sao Vàng</strong>!</p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button class="challenge-btn" onclick="startMiniGame()">🔄 Ghép chữ ván mới</button>
          <button class="home-btn" onclick="switchSubGame('dino_memory')">🦖 Thử thách Lật Thẻ Khủng Long</button>
          <button class="home-btn" onclick="switchMode('vocab')">📖 Về học từ mới</button>
        </div>
      </div>
    `;
  }
}

// ========================================================
// SUBGAME SWITCHER & DINO MEMORY & VEHICLE QUIZ
// ========================================================
function switchSubGame(subgame) {
  currentSubGame = subgame;
  const puzPane = document.getElementById('subgamePuzzlePane');
  const memPane = document.getElementById('subgameMemoryPane');
  const quizPane = document.getElementById('subgameQuizPane');

  const tabPuz = document.getElementById('tabBtnPuzzle');
  const tabMem = document.getElementById('tabBtnMemory');
  const tabQuiz = document.getElementById('tabBtnQuiz');

  if (puzPane) puzPane.style.display = subgame === 'puzzle' ? 'block' : 'none';
  if (memPane) memPane.style.display = subgame === 'dino_memory' ? 'block' : 'none';
  if (quizPane) quizPane.style.display = subgame === 'quiz' ? 'block' : 'none';

  if (tabPuz) tabPuz.classList.toggle('active', subgame === 'puzzle');
  if (tabMem) tabMem.classList.toggle('active', subgame === 'dino_memory');
  if (tabQuiz) tabQuiz.classList.toggle('active', subgame === 'quiz');

  window.soundMgr.playClick();

  if (subgame === 'puzzle') {
    renderGameView();
  } else if (subgame === 'dino_memory') {
    initDinoMemoryGame();
  } else if (subgame === 'quiz') {
    initVehicleQuiz();
  }
}

// 🦖 GAME LẬT THẺ KHỦNG LONG (DINO MEMORY)
function initDinoMemoryGame() {
  const grid = document.getElementById('memoryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const btnRestart = document.getElementById('btnRestartMemory');
  if (btnRestart) {
    btnRestart.onclick = () => {
      window.soundMgr.playClick();
      initDinoMemoryGame();
    };
  }

  memoryFlips = 0;
  memoryMatchedCount = 0;
  memoryFlippedCards = [];
  memoryIsLocked = false;
  updateMemoryStats();

  // Tạo 6 cặp từ DINO_MEMORY_PAIRS (12 thẻ)
  const pairDeck = [];
  DINO_MEMORY_PAIRS.forEach((dino) => {
    pairDeck.push({ ...dino, instanceId: `${dino.id}_a` });
    pairDeck.push({ ...dino, instanceId: `${dino.id}_b` });
  });

  // Xáo trộn ngẫu nhiên
  pairDeck.sort(() => Math.random() - 0.5);
  memoryCards = pairDeck;

  pairDeck.forEach(cardData => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.dataset.id = cardData.id;
    cardEl.dataset.instanceId = cardData.instanceId;

    cardEl.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-face memory-card-back">
          <div class="card-back-icon">🦖</div>
          <div class="card-back-label">Bảo Long</div>
        </div>
        <div class="memory-card-face memory-card-front">
          <div class="card-dino-icon">${cardData.icon}</div>
          <div class="card-dino-name">${cardData.name}</div>
          <div class="card-dino-ja">${cardData.ja}</div>
        </div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      handleMemoryCardClick(cardData, cardEl);
    });

    grid.appendChild(cardEl);
  });
}

function updateMemoryStats() {
  const flipsEl = document.getElementById('memoryFlipsText');
  const pairsEl = document.getElementById('memoryPairsText');
  if (flipsEl) flipsEl.innerText = `👀 Lượt lật: ${memoryFlips}`;
  if (pairsEl) pairsEl.innerText = `⭐ Đã ghép: ${memoryMatchedCount} / 6 cặp`;
}

function handleMemoryCardClick(cardData, cardEl) {
  if (memoryIsLocked) return;
  if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) return;

  window.soundMgr.playClick();
  cardEl.classList.add('is-flipped');
  memoryFlippedCards.push({ data: cardData, el: cardEl });

  if (memoryFlippedCards.length === 2) {
    memoryFlips++;
    updateMemoryStats();
    memoryIsLocked = true;

    const [first, second] = memoryFlippedCards;
    if (first.data.id === second.data.id) {
      // ĐOÁN ĐÚNG CẶP
      setTimeout(() => {
        first.el.classList.add('is-matched');
        second.el.classList.add('is-matched');
        memoryMatchedCount++;
        updateMemoryStats();

        window.soundMgr.playCorrect();
        window.soundMgr.playAudioFile('cheer_flip_match');
        showToast(`🎉 Giỏi quá! Bảo Long đã tìm thấy cặp ${first.data.name}!`);

        // Đọc tên chú khủng long
        setTimeout(() => {
          if (first.data.audioKey) {
            window.soundMgr.playAudioFile(first.data.audioKey);
          }
        }, 1100);

        memoryFlippedCards = [];
        memoryIsLocked = false;

        // Hoàn thành cả 6 cặp!
        if (memoryMatchedCount === 6) {
          setTimeout(() => {
            fireConfetti();
            window.soundMgr.playVictory();
            window.soundMgr.playAudioFile('cheer_flip_win');
            showToast(`🏆 SIÊU ĐỈNH! Bảo Long đã chiến thắng Game Lật Thẻ Khủng Long!`);
          }, 800);
        }
      }, 500);
    } else {
      // KHÔNG KHỚP -> ÚP LẠI
      setTimeout(() => {
        first.el.classList.remove('is-flipped');
        second.el.classList.remove('is-flipped');
        memoryFlippedCards = [];
        memoryIsLocked = false;
      }, 950);
    }
  }
}

// 🚗 GAME ĐỐ VUI XE CỘ (VEHICLE QUIZ)
function initVehicleQuiz() {
  quizQuestions = [
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh1'), // Cứu hỏa
      question: 'Bảo Long ơi, đâu là chiếc Xe Cứu Hỏa chữa cháy?',
      ja: '🇯🇵 しょうぼうしゃ (Shoubousha) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh2'), VEHICLE_LESSONS.find(v => v.id === 'veh3'), VEHICLE_LESSONS.find(v => v.id === 'veh7')]
    },
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh7'), // Shinkansen
      question: 'Đâu là Tàu Hỏa / Shinkansen siêu tốc chạy bon bon?',
      ja: '🇯🇵 しんかんせん (Shinkansen) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh8'), VEHICLE_LESSONS.find(v => v.id === 'veh5'), VEHICLE_LESSONS.find(v => v.id === 'veh6')]
    },
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh2'), // Cảnh sát
      question: 'Bảo Long tìm giúp chú Xe Cảnh Sát tuần tra nào!',
      ja: '🇯🇵 パトカー (Patokaa) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh4'), VEHICLE_LESSONS.find(v => v.id === 'veh1'), VEHICLE_LESSONS.find(v => v.id === 'veh11')]
    },
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh8'), // Máy bay
      question: 'Phương tiện nào có cánh bay vút trên bầu trời xanh?',
      ja: '🇯🇵 ひこうき (Hikouki) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh10'), VEHICLE_LESSONS.find(v => v.id === 'veh9'), VEHICLE_LESSONS.find(v => v.id === 'veh12')]
    },
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh3'), // Cứu thương
      question: 'Xe nào đưa bệnh nhân đến bệnh viện cấp cứu kêu eng éc?',
      ja: '🇯🇵 きゅうきゅうしゃ (Kyuukyuusha) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh5'), VEHICLE_LESSONS.find(v => v.id === 'veh6'), VEHICLE_LESSONS.find(v => v.id === 'veh4')]
    },
    {
      target: VEHICLE_LESSONS.find(v => v.id === 'veh4'), // Máy xúc
      question: 'Xe nào có gầu xúc đất khỏe mạnh ở công trường?',
      ja: '🇯🇵 ショベルカー (Shoberukaa) はどれ？',
      distractors: [VEHICLE_LESSONS.find(v => v.id === 'veh11'), VEHICLE_LESSONS.find(v => v.id === 'veh12'), VEHICLE_LESSONS.find(v => v.id === 'veh10')]
    }
  ];

  quizCurrentIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

function loadQuizQuestion() {
  if (quizCurrentIndex >= quizQuestions.length) {
    showQuizVictory();
    return;
  }

  const q = quizQuestions[quizCurrentIndex];
  document.getElementById('quizProgressText').innerText = `Câu ${quizCurrentIndex + 1} / ${quizQuestions.length}`;
  document.getElementById('quizScoreText').innerText = `⭐ ${quizScore} điểm`;
  document.getElementById('quizQuestionTitle').innerText = q.question;
  document.getElementById('quizQuestionJa').innerText = q.ja;

  const optionsGrid = document.getElementById('quizOptionsGrid');
  optionsGrid.innerHTML = '';

  const allChoices = [q.target, ...q.distractors].sort(() => Math.random() - 0.5);

  allChoices.forEach(item => {
    if (!item) return;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <div class="quiz-opt-icon">${item.icon}</div>
      <div class="quiz-opt-name">${item.word}</div>
      <div class="quiz-opt-ja">${item.ja}</div>
    `;

    card.addEventListener('click', () => {
      handleQuizChoice(item, q.target, card);
    });

    optionsGrid.appendChild(card);
  });

  // Tự động phát âm câu hỏi xe
  if (q.target && q.target.audioKey) {
    window.soundMgr.playAudioFile(q.target.audioKey);
  }
}

function handleQuizChoice(chosen, target, cardEl) {
  if (chosen.id === target.id) {
    cardEl.classList.add('correct');
    window.soundMgr.playCorrect();
    fireConfetti();
    quizScore += 10;
    document.getElementById('quizScoreText').innerText = `⭐ ${quizScore} điểm`;
    showToast(`🎉 Chính xác! Đó là ${target.word}!`);

    setTimeout(() => {
      quizCurrentIndex++;
      loadQuizQuestion();
    }, 1500);
  } else {
    cardEl.classList.add('wrong');
    window.soundMgr.playWrong();
    showToast(`Bảo Long thử lại xem chiếc nào mới đúng nhé! ❤️`);
  }
}

function showQuizVictory() {
  fireConfetti();
  window.soundMgr.playVictory();
  const quizPane = document.getElementById('subgameQuizPane');
  if (quizPane) {
    quizPane.innerHTML = `
      <div style="padding: 30px 16px; text-align: center;">
        <div style="font-size: 72px; margin-bottom: 14px;">🚗🚅🏆🎉</div>
        <h2 style="font-size: 26px; color: #0284c7; font-weight: 900; margin-bottom: 8px;">BẢO LONG LÀ BÁC TÀI XUẤT SẮC!</h2>
        <p style="font-size: 15px; color: #475569; margin-bottom: 20px;">Bé đã hoàn thành xuất sắc thử thách Đố vui Xe Cộ với <strong>${quizScore} điểm</strong>!</p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button class="challenge-btn" onclick="initVehicleQuiz()">🔄 Chơi lại Đố Vui</button>
          <button class="home-btn" onclick="switchSubGame('dino_memory')">🦖 Thử thách Lật Thẻ Khủng Long</button>
        </div>
      </div>
    `;
  }
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
