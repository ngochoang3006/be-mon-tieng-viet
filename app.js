// Ứng dụng Học Tiếng Việt cho Bé Bảo Long (6 tuổi - sống tại Nhật Bản)
// Hệ thống hoàn chỉnh: Kho Sao & Sticker, Nghe cả bài, Ghép chữ thông minh, Nghe Âm Bắt Chữ, Tàu Shinkansen,
// Công viên Khủng Long & Xe Cộ ảnh chụp thật + Tập viết 4 ô ly chuẩn lớp 1.

let currentMode = 'vocab'; // 'alphabet' | 'vocab' | 'phonics' | 'dino' | 'vehicles' | 'game'
let currentLessonIdx = 0;
let currentWordModal = null;
let modalPlaylist = [];
let modalPlaylistIdx = 0;

// Explorer Progress State (lưu tự động vào localStorage)
const PROGRESS_KEY = 'baolong_progress_v2';
const PROGRESS_SCHEMA_VERSION = 3;
let explorerState = {
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  stars: 0,
  learnedIds: [],
  equippedStickerId: 'stk_trex',
  completedGames: 0,
  wordStats: {},
  dailyLog: {},
  coins: 0,
  arcadeGear: { speedLv: 0, boostLv: 0, decor: 'none', unlockedDecors: ['none'] },
  parentSettings: { eyeBreakMinutes: 20, focusHideGames: false, dailyArcadeCap: 25, hideDinoBuddy: false },
  parentVideos: []
};

// Auto-play audio tour state
let autoPlayTimer = null;
let autoPlayRunning = false;
let autoPlayActiveBtn = null;
window.appNavEpoch = 0;

// Game Hub State
let currentSubGame = 'puzzle';

// Game 1: Puzzle State
let gameCurrentIndex = 0;
let gameQuestions = [];
let gameSlots = []; // array of { char, btnId } or null
let gameScore = 0;
let lastPuzzleSource = 'default'; // 'default' | 'lesson'
let activeLessonContext = null;
let puzzleLocked = false;
let puzzleEpoch = 0;

// Game 2: Listen & Catch State
let listenMode = 'tricky'; // 'tricky' | 'words'
let listenQuestions = [];
let listenIndex = 0;
let listenScore = 0;
let listenStreak = 0;
let listenBestStreak = 0;
let listenEpoch = 0;

// Game 3: Shinkansen Train State
let shinkansenQuestions = [];
let shinkansenIndex = 0;
let shinkansenScore = 0;
let selectedTrainHead = '';
let selectedTrainTail = '';
let shinkansenLocked = false;
let shinkansenEpoch = 0;

// Game 4: Dino Memory State
let memoryCards = [];
let memoryFlippedCards = [];
let memoryMatchedCount = 0;
let memoryFlips = 0;
let memoryIsLocked = false;
let memoryEpoch = 0;

// Game 5: Dino Quiz State
let dinoQuizQuestions = [];
let dinoQuizCurrentIndex = 0;
let dinoQuizScore = 0;
let dinoQuizEpoch = 0;

// Game 6: Dino Dig State
let dinoDigCurrentIndex = 0;
let dinoDigHits = 0;
let dinoDigBadges = 0;
let dinoDigEpoch = 0;
let orthoQuizEpoch = 0;
let listenAnsweredCount = 0;
let lastFocusedBeforeModal = null;
let storageQuotaWarned = false;
let lastCanvasCssWidth = 0;

// Game 7: Vehicle Quiz State
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScore = 0;
let vehQuizEpoch = 0;

// Canvas Drawing State
let canvas, ctx;
let isDrawing = false;
let drawColor = '#0284c7';
let writingAwardedThisOpen = false;

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initEventListeners();
  syncTopControlsUI();
  updateProfileHUD();
  window.initLearningPlus?.();
  window.initLivingMedia?.();
  renderCurrentView();
  initCanvas();
});

// ========================================================
// KHO SAO, TIẾN ĐỘ & STICKER (PERSISTENT GAMIFICATION)
// ========================================================
function migrateProgressData(parsed) {
  const validStickerIds = typeof STICKERS_DATA !== 'undefined' ? new Set(STICKERS_DATA.map(s => s.id)) : null;
  const learned = Array.isArray(parsed?.learnedIds)
    ? Array.from(new Set(parsed.learnedIds.filter(id => typeof id === 'string' && id.trim().length > 0)))
    : [];
  const rawSticker = typeof parsed?.equippedStickerId === 'string' ? parsed.equippedStickerId : 'stk_trex';
  const plusFields = typeof normalizePlusStateFields === 'function'
    ? normalizePlusStateFields(parsed)
    : { wordStats: {}, dailyLog: {}, coins: 0, arcadeGear: { speedLv: 0, boostLv: 0, decor: 'none', unlockedDecors: ['none'] }, parentSettings: { eyeBreakMinutes: 20, focusHideGames: false, dailyArcadeCap: 25 } };
  return {
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    stars: typeof parsed?.stars === 'number' && Number.isFinite(parsed.stars) && parsed.stars >= 0 ? Math.floor(parsed.stars) : 0,
    learnedIds: learned,
    equippedStickerId: (!validStickerIds || validStickerIds.has(rawSticker)) ? rawSticker : 'stk_trex',
    completedGames: typeof parsed?.completedGames === 'number' && Number.isFinite(parsed.completedGames) && parsed.completedGames >= 0 ? Math.floor(parsed.completedGames) : 0,
    ...plusFields
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      explorerState = migrateProgressData(JSON.parse(raw));
    }
  } catch (e) {
    console.error('Lỗi đọc dữ liệu tiến độ:', e);
    try {
      const corrupt = localStorage.getItem(PROGRESS_KEY);
      if (corrupt) localStorage.setItem(`${PROGRESS_KEY}_corrupt_backup`, corrupt);
    } catch (e2) {}
    setTimeout(() => {
      if (typeof showToast === 'function') {
        showToast('⚠️ Dữ liệu lưu cũ gặp lỗi định dạng — hệ thống đã tạo bản dự phòng an toàn.');
      }
    }, 600);
  }
}

function saveProgress() {
  try {
    explorerState.schemaVersion = PROGRESS_SCHEMA_VERSION;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(explorerState));
  } catch (e) {
    if (!storageQuotaWarned && typeof showToast === 'function') {
      storageQuotaWarned = true;
      showToast('⚠️ Bộ nhớ trình duyệt đang bị giới hạn — hãy Export sao lưu trong Góc Phụ Huynh nhé.');
    }
  }
}

function awardStars(amount, reasonText = '', countAsGame = amount >= 10, sourceCategory = 'learn') {
  const prevRank = getCurrentRank(explorerState.stars);
  let actual = amount;
  const log = typeof ensureTodayLog === 'function' ? ensureTodayLog() : null;
  if (sourceCategory === 'arcade' && log) {
    const cap = explorerState.parentSettings?.dailyArcadeCap || 25;
    const remain = Math.max(0, cap - (log.arcadeStars || 0));
    actual = Math.min(amount, remain);
    log.arcadeStars = (log.arcadeStars || 0) + actual;
  }
  explorerState.stars += actual;
  if (log) log.starsEarned = (log.starsEarned || 0) + actual;
  if (countAsGame) {
    explorerState.completedGames = (explorerState.completedGames || 0) + 1;
  }
  saveProgress();
  updateProfileHUD();
  if (typeof renderDailyRoadmapHost === 'function') renderDailyRoadmapHost();
  const nextRank = getCurrentRank(explorerState.stars);

  if (actual > 0) {
    const starChip = document.getElementById('navTotalStars');
    if (starChip && window.livingFX) {
      const r = starChip.getBoundingClientRect();
      window.livingFX.burst(r.left + r.width / 2, r.top + r.height / 2, 'star', 10);
      window.livingFX.floatLabel(r.left + r.width / 2, r.bottom + 8, `+${actual} ⭐`, '#d97706');
    }
  }
  if (nextRank.title !== prevRank.title) {
    fireConfetti();
    showToast(`🎊 THĂNG HẠNG! Bảo Long đạt danh hiệu mới: ${nextRank.badge} ${nextRank.title}!`);
  } else if (sourceCategory === 'arcade' && actual === 0) {
    showToast(`🏎️ Bảo Long đã nhận đủ Sao Đua Xe hôm nay — sang học Tiếng Việt / Toán để kiếm thêm Sao nhé!`);
  } else if (reasonText) {
    showToast(`⭐ +${actual} Sao: ${reasonText}`);
  }
}

let gameSessionCoinsEarned = 0;
function updateGameCoinsHUD() {
  const totalEl = document.getElementById('gameTotalCoinsPill');
  const sesEl = document.getElementById('gameSessionCoins');
  if (totalEl) totalEl.innerText = `🪙 Tổng Xu: ${explorerState.coins || 0}`;
  if (sesEl) sesEl.innerText = `✨ Phiên chơi: +${gameSessionCoinsEarned} 🪙`;
}

function awardCoins(amount, fromMiniGame = false) {
  const n = Math.floor(Number(amount) || 0);
  if (n <= 0) return;
  explorerState.coins = Math.max(0, (explorerState.coins || 0) + n);
  if (fromMiniGame) gameSessionCoinsEarned += n;
  saveProgress();
  window.updateArcadeCoinsUI?.();
  updateGameCoinsHUD();
}
window.awardCoins = awardCoins;

function markWordLearned(wordId) {
  if (!wordId) return false;
  if (!explorerState.learnedIds.includes(wordId)) {
    explorerState.learnedIds.push(wordId);
    const log = typeof ensureTodayLog === 'function' ? ensureTodayLog() : null;
    if (log) {
      log.newWords = (log.newWords || 0) + 1;
      if (log.newWords >= 2 && typeof markDailyStep === 'function') markDailyStep('learn');
    }
    awardStars(2, '', false, 'learn');
    awardCoins(3, false);
    return true;
  }
  return false;
}

function getCurrentRank(stars) {
  let rank = EXPLORER_RANKS[0];
  for (const r of EXPLORER_RANKS) {
    if (stars >= r.minStars) rank = r;
  }
  return rank;
}

function updateProfileHUD() {
  const sticker = STICKERS_DATA.find(s => s.id === explorerState.equippedStickerId) || STICKERS_DATA[0];
  const rank = getCurrentRank(explorerState.stars);

  const avEl = document.getElementById('profileAvatarEmoji');
  const navStars = document.getElementById('navTotalStars');
  const rankBadge = document.getElementById('rankBadge');
  const rankTitle = document.getElementById('rankTitle');
  const learnedCount = document.getElementById('learnedWordsCount');

  if (avEl) avEl.innerText = sticker.emoji;
  if (navStars) navStars.innerText = `⭐ ${explorerState.stars}`;
  if (rankBadge) rankBadge.innerText = rank.badge;
  if (rankTitle) rankTitle.innerText = rank.title;
  if (learnedCount) learnedCount.innerText = explorerState.learnedIds.length;
}

function openStickerModal() {
  if (!document.getElementById('stickerModalOverlay')?.classList.contains('active')) {
    lastFocusedBeforeModal = document.activeElement;
  }
  window.soundMgr.playClick();
  const rank = getCurrentRank(explorerState.stars);
  const nextRank = EXPLORER_RANKS.find(r => r.minStars > explorerState.stars);

  document.getElementById('stickerRankBadge').innerText = rank.badge;
  document.getElementById('stickerRankTitle').innerText = rank.title;
  document.getElementById('stickerTotalStars').innerText = explorerState.stars;
  document.getElementById('stickerTotalWords').innerText = explorerState.learnedIds.length;
  const gamesEl = document.getElementById('stickerTotalGames');
  if (gamesEl) gamesEl.innerText = explorerState.completedGames || 0;

  const barEl = document.getElementById('stickerNextRankBar');
  const txtEl = document.getElementById('stickerNextRankText');
  if (nextRank) {
    const span = nextRank.minStars - rank.minStars;
    const cur = explorerState.stars - rank.minStars;
    const pct = Math.min(100, Math.max(8, Math.round((cur / span) * 100)));
    barEl.style.width = `${pct}%`;
    txtEl.innerText = `Cần thêm ${nextRank.minStars - explorerState.stars}⭐ để lên ${nextRank.badge} ${nextRank.title}`;
  } else {
    barEl.style.width = '100%';
    txtEl.innerText = '👑 Đã đạt cấp bậc Huyền Thoại cao nhất!';
  }

  const grid = document.getElementById('stickersGrid');
  grid.innerHTML = '';
  STICKERS_DATA.forEach(stk => {
    const unlocked = explorerState.stars >= stk.unlockStars;
    const isEquipped = explorerState.equippedStickerId === stk.id;

    const card = document.createElement('div');
    card.className = `sticker-card ${unlocked ? (isEquipped ? 'equipped' : '') : 'locked'}`;
    card.innerHTML = `
      <div class="sticker-emoji">${unlocked ? stk.emoji : '🔒'}</div>
      <div class="sticker-name">${stk.name}</div>
      <div class="sticker-status">
        ${isEquipped ? '✅ Đang đeo Avatar' : (unlocked ? '👆 Chạm để đeo' : `Cần ${stk.unlockStars} ⭐`)}
      </div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => {
        explorerState.equippedStickerId = stk.id;
        saveProgress();
        updateProfileHUD();
        window.soundMgr.playAudioFile('cheer_sticker', null, 'Chúc mừng Bảo Long!');
        openStickerModal(); // refresh grid
        showToast(`${stk.emoji} Đã đổi Avatar thành "${stk.name}"!`);
      });
    } else {
      card.addEventListener('click', () => {
        window.soundMgr.playClick();
        showToast(`🔒 Cần ${stk.unlockStars}⭐ để mở khóa ${stk.name} (${stk.desc})`);
      });
    }
    grid.appendChild(card);
  });

  resetParentCornerUI();
  initParentCornerOnce();
  document.getElementById('stickerModalOverlay').classList.add('active');
  setTimeout(() => document.getElementById('stickerModalCloseBtn')?.focus(), 40);
}

// ========================================================
// EVENT LISTENERS & TOP CONTROLS
// ========================================================
function syncTopControlsUI() {
  const btnGender = document.getElementById('btnVoiceGender');
  const btnSpeed = document.getElementById('btnSpeed');
  const btnMute = document.getElementById('btnMute');

  if (btnGender) {
    btnGender.innerHTML = window.soundMgr.gender === 'male'
      ? '<span>👨</span> <span>Nam (Ba)</span>'
      : '<span>👩</span> <span>Nữ (Cô)</span>';
  }
  const btnStoryHear = document.getElementById('btnHearVnStory');
  if (btnStoryHear) {
    btnStoryHear.innerHTML = `<span>🔊</span> Nghe ${window.soundMgr.gender === 'male' ? 'ba' : 'cô'} đọc bài văn`;
  }
  if (btnSpeed) {
    btnSpeed.innerHTML = window.soundMgr.speedRate < 0.95
      ? '<span>🐢</span> <span>Chậm</span>'
      : '<span>⚡</span> <span>Chuẩn</span>';
  }
  if (btnMute) {
    btnMute.innerHTML = window.soundMgr.isMuted
      ? '<span>🔇</span> <span class="hide-xs">Tắt</span>'
      : '<span>🔊</span> <span class="hide-xs">Bật</span>';
  }
}

function initEventListeners() {
  document.getElementById('btnHome')?.addEventListener('click', () => switchMode('vocab'));
  document.getElementById('btnOpenProfile')?.addEventListener('click', openStickerModal);
  document.getElementById('btnOpenStickersBanner')?.addEventListener('click', openStickerModal);
  document.getElementById('stickerModalCloseBtn')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    closeStickerModalHelper();
  });
  document.getElementById('stickerModalOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'stickerModalOverlay') {
      closeStickerModalHelper();
    }
  });

  document.getElementById('btnToggleSidebar')?.addEventListener('click', handleSidebarToggle);
  document.getElementById('btnCollapseSidebar')?.addEventListener('click', () => {
    if (window.innerWidth < 1040) {
      window.soundMgr.playClick();
      closeMobileSidebar();
    } else {
      handleSidebarToggle();
    }
  });
  document.getElementById('sideNavBackdrop')?.addEventListener('click', closeMobileSidebar);
  initSidebarPrefs();

  document.querySelectorAll('.mode-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      closeMobileSidebar();
      switchMode(btn.dataset.mode);
    });
  });

  document.getElementById('btnVoiceGender')?.addEventListener('click', () => {
    stopAutoPlay();
    window.soundMgr.stopAll();
    if (window.soundMgr.gender === 'female') {
      window.soundMgr.setGender('male');
      showToast('Đã đổi sang Giọng Nam (Ba Nam Minh) ấm áp!');
      window.soundMgr.playClick();
      window.soundMgr.speakWord('bố');
    } else {
      window.soundMgr.setGender('female');
      showToast('Đã đổi sang Giọng Nữ (Cô Hoài My) truyền cảm!');
      window.soundMgr.playClick();
      window.soundMgr.speakWord('mẹ');
    }
    syncTopControlsUI();
  });

  document.getElementById('btnSpeed')?.addEventListener('click', () => {
    if (window.soundMgr.speedRate > 0.9) {
      window.soundMgr.setSpeed('slow');
      showToast('🐢 Tốc độ Đọc Chậm để Bảo Long dễ nghe vần');
    } else {
      window.soundMgr.setSpeed('normal');
      showToast('⚡ Tốc độ Chuẩn tự nhiên');
    }
    window.soundMgr.playClick();
    syncTopControlsUI();
  });

  document.getElementById('btnMute')?.addEventListener('click', () => {
    stopAutoPlay();
    window.soundMgr.setMuted(!window.soundMgr.isMuted);
    syncTopControlsUI();
    showToast(window.soundMgr.isMuted ? '🔇 Đã tắt âm thanh' : '🔊 Đã bật âm thanh');
  });

  document.getElementById('btnResetLesson')?.addEventListener('click', () => {
    stopAutoPlay();
    currentLessonIdx = 0;
    window.soundMgr.playClick();
    renderCurrentView();
    showToast('Đã quay về Bài 1!');
  });

  document.getElementById('bigChallengeBtn')?.addEventListener('click', () => {
    startMiniGame('lesson');
  });

  // Modal close & nav
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalPrevBtn')?.addEventListener('click', () => navigateModal(-1));
  document.getElementById('modalNextBtn')?.addEventListener('click', () => navigateModal(1));

  const trapFocusInOverlay = (overlayEl, e) => {
    const focusables = Array.from(overlayEl.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', (e) => {
    const modalOv = document.getElementById('modalOverlay');
    const stkOv = document.getElementById('stickerModalOverlay');
    const thOv = document.getElementById('storyTheaterOverlay');
    const vidOv = document.getElementById('kidVideoOverlay');
    const modalOpen = modalOv?.classList.contains('active');
    const stkOpen = stkOv?.classList.contains('active');
    const thOpen = thOv?.classList.contains('active');
    const vidOpen = vidOv?.classList.contains('active');
    if (e.key === 'Escape') {
      closeMobileSidebar();
      if (modalOpen) closeModal();
      if (stkOpen) closeStickerModalHelper();
    } else if (e.key === 'Tab') {
      if (thOpen && thOv) trapFocusInOverlay(thOv, e);
      else if (vidOpen && vidOv) trapFocusInOverlay(vidOv, e);
      else if (modalOpen && modalOv) trapFocusInOverlay(modalOv, e);
      else if (stkOpen && stkOv) trapFocusInOverlay(stkOv, e);
    } else if (modalOpen) {
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    }
  });

  // Modal Audio Buttons - FIXED: supports Dino/Vehicle audioKey + Vocab/Phonics!
  document.getElementById('modalBtnSpeakWord')?.addEventListener('click', () => {
    if (currentWordModal) {
      window.soundMgr.playClick();
      window.soundMgr.speakWordObj(currentWordModal);
    }
  });

  document.getElementById('modalBtnSpell')?.addEventListener('click', () => {
    if (currentWordModal) {
      window.soundMgr.playClick();
      if (currentWordModal.spellKey) {
        window.soundMgr.playAudioFile(currentWordModal.spellKey, null, currentWordModal.spellText);
      } else {
        window.soundMgr.spellWord(currentWordModal.word, currentWordModal.spellText);
      }
    }
  });

  document.getElementById('modalBtnToggleDrawing')?.addEventListener('click', () => {
    const box = document.getElementById('canvasDrawingBox');
    box.classList.toggle('active');
    if (box.classList.contains('active')) {
      requestAnimationFrame(() => {
        resizeCanvasToFit();
        clearCanvas();
        drawLetterGuide(currentWordModal ? currentWordModal.word : '');
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  });

  let lastBreakpointBucket = window.innerWidth < 768 ? 'mobile' : (window.innerWidth < 1040 ? 'tablet' : 'desktop');
  window.addEventListener('resize', () => {
    const nextBucket = window.innerWidth < 768 ? 'mobile' : (window.innerWidth < 1040 ? 'tablet' : 'desktop');
    if (nextBucket !== lastBreakpointBucket) {
      lastBreakpointBucket = nextBucket;
      closeMobileSidebar();
      updateSidebarToggleUI();
    }
    const box = document.getElementById('canvasDrawingBox');
    if (box && box.classList.contains('active')) {
      const targetW = box.clientWidth > 100 ? Math.max(260, Math.min(400, box.clientWidth - 20)) : 340;
      if (Math.abs(targetW - lastCanvasCssWidth) >= 20) {
        resizeCanvasToFit(true);
      }
    }
  });
}

// ========================================================
// CHẾ ĐỘ NGHE TỰ ĐỘNG CẢ BÀI (AUTO-PLAY AUDIO TOUR)
// ========================================================
let listenBlitzTimer = null;
let listenBlitzSec = 45;
let puzzleStreak = 0;
let memoryStreak = 0;
let memoryTargetPairs = 6;
let memoryPeekUsed = false;
let dinoDigTool = 'hammer';

function clearListenBlitzTimer() {
  if (listenBlitzTimer) {
    clearInterval(listenBlitzTimer);
    listenBlitzTimer = null;
  }
}

function stopAutoPlay() {
  clearListenBlitzTimer();
  autoPlayRunning = false;
  if (typeof stopMathAutoPlay === 'function') stopMathAutoPlay();
  if (typeof stopEthicsAutoPlay === 'function') stopEthicsAutoPlay();
  if (typeof stopEnAutoPlay === 'function') stopEnAutoPlay();
  if (typeof stopJaAutoPlay === 'function') stopJaAutoPlay();
  if (typeof stopDragonAutoPlay === 'function') stopDragonAutoPlay();
  if (typeof window.stopScienceAutoPlay === 'function') window.stopScienceAutoPlay();
  if (typeof window.stopArtsSongPlayback === 'function') window.stopArtsSongPlayback();
  if (typeof window.stopKaraokePlayback === 'function') window.stopKaraokePlayback();
  if (typeof window.stopMinimalPairPlayback === 'function') window.stopMinimalPairPlayback();
  window.customVoiceStore?.stopRecording?.();
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
  document.querySelectorAll('.is-speaking-active').forEach(el => el.classList.remove('is-speaking-active'));
  if (autoPlayActiveBtn) {
    autoPlayActiveBtn.classList.remove('playing');
    if (autoPlayActiveBtn.dataset.origLabel) {
      autoPlayActiveBtn.innerHTML = autoPlayActiveBtn.dataset.origLabel;
    }
    autoPlayActiveBtn = null;
  }
}

function toggleAutoPlayList(btnEl, items, cardSelector, playFn) {
  if (autoPlayRunning && autoPlayActiveBtn === btnEl) {
    stopAutoPlay();
    window.soundMgr.stopAll();
    showToast('⏹️ Đã dừng chế độ tự động đọc');
    return;
  }

  stopAutoPlay();
  if (!items || items.length === 0) return;

  autoPlayRunning = true;
  autoPlayActiveBtn = btnEl;
  if (!btnEl.dataset.origLabel) btnEl.dataset.origLabel = btnEl.innerHTML;
  btnEl.classList.add('playing');
  btnEl.innerHTML = '<span>⏹️</span> Dừng đọc';

  const cards = document.querySelectorAll(cardSelector);
  let idx = 0;

  function playNext() {
    if (!autoPlayRunning || idx >= items.length) {
      if (idx >= items.length && autoPlayRunning) {
        showToast('🎉 Đã nghe xong cả bài! Bảo Long giỏi quá!');
      }
      stopAutoPlay();
      return;
    }

    document.querySelectorAll('.is-speaking-active').forEach(el => el.classList.remove('is-speaking-active'));
    const card = cards[idx];
    if (card) {
      card.classList.add('is-speaking-active');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    playFn(items[idx], () => {
      if (!autoPlayRunning) return;
      idx++;
      autoPlayTimer = setTimeout(playNext, 550);
    }, card);
  }

  playNext();
}

// ========================================================
// CHUYỂN CHẾ ĐỘ & RENDER CÁC MÀN HÌNH HỌC TẬP
// ========================================================
let phonicsShowStories = false;
let currentVnStoryIdx = 0;

function switchMode(mode) {
  if (explorerState.parentSettings?.focusHideGames && (mode === 'game' || mode === 'arcade')) {
    showToast('📚 Đang bật Chế độ Tập Trung — vào Góc Phụ Huynh để mở lại Trò chơi & Đua xe nhé!');
    return;
  }
  stopAutoPlay();
  window.soundMgr.stopAll();
  if (typeof stopArcadeGameLoop === 'function') stopArcadeGameLoop();
  window.appNavEpoch++;
  closeMobileSidebar();
  currentMode = mode;
  currentLessonIdx = 0;
  phonicsShowStories = false;

  document.body.classList.toggle('in-arcade-mode', mode === 'arcade');
  document.querySelectorAll('.mode-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const msgs = {
    vocab: '📖 Chế độ: Học từ mới (12 bài học cả năm Lớp 1)',
    phonics: '🔤 Chế độ: Đánh vần (12 bài vần) & 6 Bài Đọc Hiểu HK2',
    alphabet: '🔠 Bảng chữ cái, 11 Phụ âm ghép, 6 Thanh điệu & Chính tả',
    dino: '🦖 Công viên Khủng Long (Ảnh chụp thực tế!)',
    dragons: '🐉 Chế độ: Vương Quốc Rồng Thần Của Bảo Long!',
    vehicles: '🚗 Ga Xe Cộ & Shinkansen (Ảnh chụp thực tế!)',
    math: '🧮 Chế độ: Toán Lớp 1 (0–100, Sakura, 3D, cm, Giờ rưỡi & Lịch)',
    science_life: '🌿 Chế độ: Tự nhiên & Đời sống / Seikatsuka (Trồng Asagao)',
    ethics: '🌱 Chế độ: Đạo Đức Lớp 1 (12 Bài học & Tình huống)',
    arts_pe: '🎨 Chế độ: Âm nhạc (Đàn Pianica), Mỹ thuật & Thể dục',
    english: '🇬🇧 Chế độ: Tiếng Anh Lớp 1 (ABC & 8 Chủ đề)',
    japanese: '🇯🇵 Chế độ: Tiếng Nhật 小1 (Hiragana, Katakana, 80 Kanji & Truyện)',
    game: '🎮 Khu Trò Chơi (9 game cho Bảo Long!)',
    arcade: '🏎️ Khu Đua Tốc Độ: Xe Lamborghini, Khủng Long & Rồng Bay!'
  };
  if (msgs[mode]) showToast(msgs[mode]);

  window.soundMgr.playClick();
  renderCurrentView();
}

function renderCurrentView() {
  stopAutoPlay();
  const roadmapBox = document.getElementById('roadmapBox');
  const cardsContainer = document.getElementById('cardsContainer');
  const vnStoriesContainer = document.getElementById('vnStoriesContainer');
  const btnToggleStories = document.getElementById('btnToggleVnStories');
  const alphabetContainer = document.getElementById('alphabetContainer');
  const dinoContainer = document.getElementById('dinoContainer');
  const dragonContainer = document.getElementById('dragonContainer');
  const vehicleContainer = document.getElementById('vehicleContainer');
  const mathContainer = document.getElementById('mathContainer');
  const scienceContainer = document.getElementById('scienceContainer');
  const ethicsContainer = document.getElementById('ethicsContainer');
  const artsContainer = document.getElementById('artsContainer');
  const englishContainer = document.getElementById('englishContainer');
  const japaneseContainer = document.getElementById('japaneseContainer');
  const arcadeContainer = document.getElementById('arcadeContainer');
  const gameViewContainer = document.getElementById('gameViewContainer');

  cardsContainer.style.display = 'none';
  const phDecHost = document.getElementById('phonicsDecodableHost');
  if (phDecHost) phDecHost.style.display = 'none';
  if (vnStoriesContainer) vnStoriesContainer.style.display = 'none';
  if (btnToggleStories) btnToggleStories.style.display = 'none';
  alphabetContainer.style.display = 'none';
  if (dinoContainer) dinoContainer.style.display = 'none';
  if (dragonContainer) dragonContainer.style.display = 'none';
  if (vehicleContainer) vehicleContainer.style.display = 'none';
  if (mathContainer) mathContainer.style.display = 'none';
  if (scienceContainer) scienceContainer.style.display = 'none';
  if (ethicsContainer) ethicsContainer.style.display = 'none';
  if (artsContainer) artsContainer.style.display = 'none';
  if (englishContainer) englishContainer.style.display = 'none';
  if (japaneseContainer) japaneseContainer.style.display = 'none';
  if (arcadeContainer) arcadeContainer.style.display = 'none';
  gameViewContainer.style.display = 'none';
  roadmapBox.style.display = 'none';

  if (currentMode === 'vocab') {
    roadmapBox.style.display = 'block';
    cardsContainer.style.display = 'grid';
    renderRoadmapHeader(VOCAB_LESSONS, 'LỘ TRÌNH TỪ MỚI (12 BÀI)', 'Thử thách ghép chữ');
    renderLessonCards(VOCAB_LESSONS[currentLessonIdx].words, 'vocab');
  } else if (currentMode === 'phonics') {
    roadmapBox.style.display = 'block';
    if (btnToggleStories) {
      btnToggleStories.style.display = 'inline-flex';
      btnToggleStories.classList.toggle('active-filter', phonicsShowStories);
      btnToggleStories.innerHTML = phonicsShowStories ? '<span>🔤</span> Về 12 Bài Đánh Vần' : '<span>📖</span> 6 Bài Đọc Hiểu HK2';
      btnToggleStories.onclick = () => {
        phonicsShowStories = !phonicsShowStories;
        window.soundMgr.playClick();
        renderCurrentView();
      };
    }
    renderRoadmapHeader(PHONICS_LESSONS, 'TẬP ĐÁNH VẦN & ĐỌC HIỂU', 'Thử thách ghép vần');
    if (phonicsShowStories && vnStoriesContainer) {
      vnStoriesContainer.style.display = 'block';
      renderVnStoriesView();
    } else {
      cardsContainer.style.display = 'grid';
      renderLessonCards(PHONICS_LESSONS[currentLessonIdx].words, 'phonics');
      if (typeof renderPhonicsDecodableSection === 'function') {
        renderPhonicsDecodableSection(PHONICS_LESSONS[currentLessonIdx].id);
      }
    }
  } else if (currentMode === 'alphabet') {
    alphabetContainer.style.display = 'block';
    renderAlphabetView();
  } else if (currentMode === 'dino') {
    if (dinoContainer) {
      dinoContainer.style.display = 'block';
      renderDinoView();
    }
  } else if (currentMode === 'dragons') {
    if (dragonContainer) {
      dragonContainer.style.display = 'block';
      if (typeof renderDragonHub === 'function') renderDragonHub();
    }
  } else if (currentMode === 'vehicles') {
    if (vehicleContainer) {
      vehicleContainer.style.display = 'block';
      renderVehicleView();
    }
  } else if (currentMode === 'math') {
    if (mathContainer) {
      mathContainer.style.display = 'block';
      if (typeof renderMathHub === 'function') renderMathHub();
    }
  } else if (currentMode === 'science_life') {
    if (scienceContainer) {
      scienceContainer.style.display = 'block';
      if (typeof renderScienceLifeHub === 'function') renderScienceLifeHub();
    }
  } else if (currentMode === 'ethics') {
    if (ethicsContainer) {
      ethicsContainer.style.display = 'block';
      if (typeof renderEthicsHub === 'function') renderEthicsHub();
    }
  } else if (currentMode === 'arts_pe') {
    if (artsContainer) {
      artsContainer.style.display = 'block';
      if (typeof renderArtsPeHub === 'function') renderArtsPeHub();
    }
  } else if (currentMode === 'english') {
    if (englishContainer) {
      englishContainer.style.display = 'block';
      if (typeof renderEnglishHub === 'function') renderEnglishHub();
    }
  } else if (currentMode === 'japanese') {
    if (japaneseContainer) {
      japaneseContainer.style.display = 'block';
      if (typeof renderJapaneseHub === 'function') renderJapaneseHub();
    }
  } else if (currentMode === 'arcade') {
    if (arcadeContainer) {
      arcadeContainer.style.display = 'block';
      if (typeof renderArcadeHub === 'function') renderArcadeHub();
    }
  } else if (currentMode === 'game') {
    gameViewContainer.style.display = 'block';
    switchSubGame(currentSubGame);
  }
}

function renderRoadmapHeader(lessonsList, tagLabel, challengeLabel) {
  const currentLesson = lessonsList[currentLessonIdx];
  activeLessonContext = { mode: currentMode, lesson: currentLesson };

  document.getElementById('roadmapTag').innerText = tagLabel;
  document.getElementById('roadmapTitle').innerText = currentLesson.title;
  document.getElementById('bigChallengeBtnText').innerText =
    `${challengeLabel} Bài ${currentLesson.id} (${currentLesson.words.length} câu)`;

  // Progress bar của bài học hiện tại
  const learnedInLesson = currentLesson.words.filter(w => explorerState.learnedIds.includes(w.id)).length;
  const totalInLesson = currentLesson.words.length;
  const pct = Math.round((learnedInLesson / totalInLesson) * 100);
  document.getElementById('lessonProgressBar').style.width = `${pct}%`;
  document.getElementById('lessonProgressText').innerText =
    `${learnedInLesson} / ${totalInLesson} từ đã khám phá${pct === 100 ? ' 🎉' : ''}`;

  // Nút nghe cả bài
  const btnAuto = document.getElementById('btnAutoPlayLesson');
  if (btnAuto) {
    btnAuto.onclick = () => {
      toggleAutoPlayList(
        btnAuto,
        currentLesson.words,
        '#cardsContainer .word-card',
        (w, done, card) => {
          const isNew = markWordLearned(w.id);
          if (isNew && card) {
            card.classList.add('is-learned');
            const starEl = card.querySelector('.star-corner');
            if (starEl) starEl.innerText = '⭐';
            const tagEl = card.querySelector('.word-action-tag');
            if (tagEl) tagEl.innerText = 'Đã thuộc ✓';
            const learnedInLesson = currentLesson.words.filter(x => explorerState.learnedIds.includes(x.id)).length;
            const totalInLesson = currentLesson.words.length;
            const pct = Math.round((learnedInLesson / totalInLesson) * 100);
            const bar = document.getElementById('lessonProgressBar');
            const txt = document.getElementById('lessonProgressText');
            if (bar) bar.style.width = `${pct}%`;
            if (txt) txt.innerText = `${learnedInLesson} / ${totalInLesson} từ đã khám phá${pct === 100 ? ' 🎉' : ''}`;
          }
          window.soundMgr.speakWord(w.word, done);
        }
      );
    };
  }

  const tabsTrack = document.getElementById('lessonTabsTrack');
  tabsTrack.innerHTML = '';

  lessonsList.forEach((les, idx) => {
    const doneCount = les.words.filter(w => explorerState.learnedIds.includes(w.id)).length;
    const isComplete = doneCount === les.words.length;
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `lesson-tab ${idx === currentLessonIdx ? 'active' : ''}`;
    tab.innerHTML = `<span>Bài ${les.id}</span> <span style="font-size:11px; opacity:0.88">${isComplete ? '✅' : `${doneCount}/${les.words.length}`}</span>`;
    tab.addEventListener('click', () => {
      currentLessonIdx = idx;
      phonicsShowStories = false;
      window.soundMgr.playClick();
      renderCurrentView();
    });
    tabsTrack.appendChild(tab);
  });
}

function renderLessonCards(wordsList, modeType) {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';

  wordsList.forEach((w, index) => {
    const learned = explorerState.learnedIds.includes(w.id);
    const card = document.createElement('div');
    card.className = `word-card ${learned ? 'is-learned' : ''}`;
    card.dataset.wordId = w.id;
    const tagHtml = modeType === 'phonics'
      ? `<div class="word-rhyme-tag">${w.rhyme}</div>`
      : `<div class="word-action-tag">${learned ? 'Đã thuộc ✓' : 'Chạm để học'}</div>`;

    card.innerHTML = `
      <div class="star-corner" title="${learned ? 'Đã khám phá' : 'Chưa học'}">${learned ? '⭐' : '☆'}</div>
      <div class="word-icon-img">${w.icon}</div>
      <div class="word-text">${w.word}</div>
      ${tagHtml}
      <div class="word-ja-sub">${w.ja}</div>
    `;

    card.addEventListener('click', () => {
      openModal(w, wordsList, index);
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
      <div class="alpha-phonetic-pill">"${item.phonetic}"</div>
      <div class="alpha-icon">${item.icon}</div>
      <button type="button" class="alpha-example-btn" title="Chạm để nghe từ ví dụ: ${item.example}">
        <div class="alpha-word">🔊 ${item.word}</div>
        <div class="alpha-ja">${item.ja}</div>
      </button>
    `;

    card.addEventListener('click', () => {
      window.soundMgr.playClick();
      window.soundMgr.speakAlphabet(item.lower, item.phonetic);
      if (item.lower === 's') {
        showToast('Chữ S: "sờ" (uốn cong lưỡi như trong "quyển sách") 📚');
      } else if (item.lower === 'x') {
        showToast('Chữ X: "xờ" (thẳng lưỡi nhẹ như trong "xe ô tô") 🚗');
      } else if (item.lower === 'â') {
        showToast('Chữ Â: "ớ" (như trong "cái cây") 🌳');
      } else if (item.lower === 'k') {
        showToast('Chữ K: phát âm là "ca" (đi với i, e, ê: kéo, kem) ✂️');
      } else {
        showToast(`Chữ ${item.char} ${item.lower}: phát âm là "${item.phonetic}"`);
      }
    });

    const exBtn = card.querySelector('.alpha-example-btn');
    exBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.speakWord(item.word);
      showToast(`📖 Ví dụ chữ ${item.char}: "${item.example}"`);
    });

    alphaGrid.appendChild(card);
  });

  // Nút nghe lần lượt 29 chữ cái
  const btnAutoAlpha = document.getElementById('btnAutoPlayAlphabet');
  if (btnAutoAlpha) {
    btnAutoAlpha.onclick = () => {
      toggleAutoPlayList(
        btnAutoAlpha,
        ALPHABET_DATA,
        '#alphabetGrid .alpha-card',
        (item, done) => window.soundMgr.speakAlphabet(item.lower, item.phonetic, done)
      );
    };
  }

  // Render 11 Phụ Âm Ghép (DIGRAPH_DATA)
  const digraphGrid = document.getElementById('digraphGrid');
  if (digraphGrid) {
    digraphGrid.innerHTML = '';
    DIGRAPH_DATA.forEach(dg => {
      const card = document.createElement('div');
      card.className = 'digraph-card';
      card.innerHTML = `
        <div class="alpha-letter" style="color: #6d28d9; font-size: 28px;">${dg.char} <span style="font-size:20px; opacity:0.8">(${dg.lower})</span></div>
        <div class="alpha-phonetic-pill" style="background:#ede9fe; color:#5b21b6;">Đọc: "${dg.phonetic}"</div>
        <div style="font-size: 26px; margin: 4px 0;">${dg.icon}</div>
        <button type="button" class="alpha-example-btn" style="background:#f5f3ff; border-color:#ddd6fe;">
          <div class="alpha-word" style="color:#6d28d9;">🔊 ${dg.word}</div>
          <div class="alpha-ja">${dg.ja}</div>
        </button>
        <div class="digraph-rule-tip">💡 ${dg.rule}</div>
      `;

      card.addEventListener('click', () => {
        window.soundMgr.playClick();
        window.soundMgr.speakAlphabet(dg.lower, dg.phonetic);
        showToast(`Phụ âm ghép ${dg.char}: đọc là "${dg.phonetic}" (${dg.rule})`);
      });

      const exBtn = card.querySelector('.alpha-example-btn');
      exBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.speakWord(dg.word);
        showToast(`📖 Ví dụ ${dg.char}: "${dg.word}"`);
      });

      digraphGrid.appendChild(card);
    });
  }

  // 6 Thanh điệu
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

  // Render 6 Quy tắc Chính tả Vàng (ORTHOGRAPHY_RULES_DATA)
  const rulesGrid = document.getElementById('orthographyRulesGrid');
  if (rulesGrid && typeof ORTHOGRAPHY_RULES_DATA !== 'undefined') {
    rulesGrid.innerHTML = '';
    ORTHOGRAPHY_RULES_DATA.forEach(r => {
      const card = document.createElement('div');
      card.className = 'ortho-rule-card';
      card.innerHTML = `
        <div class="ortho-pair-badge">${r.pair}</div>
        <div class="ortho-title">${r.title}</div>
        <div class="ortho-rule-text">${r.rule}</div>
        <div class="ortho-example">${r.example}</div>
      `;
      card.onclick = () => {
        window.soundMgr.playPop();
        window.soundMgr.playAudioFile(r.audioKey, null, `${r.title}. ${r.rule}`);
        showToast(`✍️ Bí kíp ${r.pair}: ${r.title}`);
      };
      rulesGrid.appendChild(card);
    });
  }

  const btnStartOrtho = document.getElementById('btnStartOrthoQuiz');
  const orthoStage = document.getElementById('orthoQuizStage');
  const btnCloseOrtho = document.getElementById('btnCloseOrthoQuiz');
  if (btnStartOrtho && orthoStage) {
    btnStartOrtho.onclick = () => {
      window.soundMgr.playClick();
      orthoStage.style.display = 'block';
      initOrthographyQuiz();
      orthoStage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  }
  if (btnCloseOrtho && orthoStage) {
    btnCloseOrtho.onclick = () => {
      orthoQuizEpoch++;
      window.soundMgr.stopAll();
      orthoStage.style.display = 'none';
    };
  }
  if (typeof renderMinimalPairDrill === 'function') {
    renderMinimalPairDrill();
  }
}

let orthoQuizList = [];
let orthoQuizIdx = 0;
let orthoQuizScore = 0;

function initOrthographyQuiz() {
  if (typeof ORTHOGRAPHY_QUIZ_DATA === 'undefined') return;
  orthoQuizEpoch++;
  orthoQuizList = [...ORTHOGRAPHY_QUIZ_DATA].sort(() => Math.random() - 0.5);
  orthoQuizIdx = 0;
  orthoQuizScore = 0;
  loadOrthoQuizQuestion();
}

function loadOrthoQuizQuestion() {
  const optsGrid = document.getElementById('orthoQuizOptionsGrid');
  if (!optsGrid) return;
  orthoQuizEpoch++;
  const myOrthoEp = orthoQuizEpoch;
  if (orthoQuizIdx >= orthoQuizList.length) {
    fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.speakPraise(true);
    awardStars(15, 'Bậc Thầy Chính Tả Lớp 1!');
    showToast(`🏆 Bảo Long hoàn thành 12 câu Chính tả đạt ${orthoQuizScore} điểm (+15 ⭐)!`);
    orthoQuizIdx = 0;
    orthoQuizScore = 0;
    document.getElementById('orthoQuizStage').style.display = 'none';
    return;
  }

  const q = orthoQuizList[orthoQuizIdx];
  const myNav = window.appNavEpoch || 0;
  document.getElementById('orthoQuizProgress').innerText = `Câu ${orthoQuizIdx + 1} / ${orthoQuizList.length}`;
  document.getElementById('orthoQuizScore').innerText = `⭐ ${orthoQuizScore} điểm`;
  document.getElementById('orthoQuizPrompt').innerText = `Từ "${q.fullWord}" (${q.blankWord}) — Chọn chữ nào đúng?`;

  optsGrid.innerHTML = '';
  let locked = false;
  const qBox = document.querySelector('#orthoQuizStage .quiz-question-box');
  const tour = [{ key: `oq_q_${q.id}`, fallbackText: `Từ ${q.fullWord}, chọn chữ nào đúng?`, el: qBox, pauseAfterMs: 180 }];

  [...q.options].sort(() => Math.random() - 0.5).forEach(opt => {
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe chữ cái">🔊</button>
      <div style="font-size: 36px; font-weight: 900; color: #be123c;">${opt.toUpperCase()}</div>
      <div class="quiz-opt-name">chữ "${opt}"</div>
    `;
    const optKey = `oq_letter_${opt}`;
    const spk = card.querySelector('.quiz-opt-speak-btn');
    if (spk) spk.onclick = (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(optKey, null, `chữ ${opt}`);
    };
    tour.push({ key: optKey, fallbackText: `chữ ${opt}`, el: card, pauseAfterMs: 110 });
    card.onclick = () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (opt === q.target) {
        locked = true;
        card.classList.add('correct');
        orthoQuizScore += 10;
        document.getElementById('orthoQuizScore').innerText = `⭐ ${orthoQuizScore} điểm`;
        window.recordAnswer?.(`oq_${q.id}`, true, { label: q.fullWord, mode: 'alphabet', audioKey: `oq_q_${q.id}` });
        window.soundMgr.playCorrect();
        fireConfetti();
        showToast(`✅ Chuẩn luôn "${q.fullWord}"! ${q.ruleNote}`);
        window.soundMgr.playPraiseThen(false,
          () => (window.appNavEpoch || 0) === myNav && orthoQuizEpoch === myOrthoEp && currentMode === 'alphabet',
          () => {
            orthoQuizIdx++;
            loadOrthoQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        window.recordAnswer?.(`oq_${q.id}`, false, { label: q.fullWord, mode: 'alphabet', audioKey: `oq_q_${q.id}` });
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        showToast(`💡 Gợi ý: ${q.ruleNote}`);
      }
    };
    optsGrid.appendChild(card);
  });

  const btnHear = document.getElementById('btnHearOrthoQuiz');
  if (btnHear) {
    btnHear.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playChoiceTour(tour);
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && currentMode === 'alphabet') {
      window.soundMgr.playChoiceTour(tour);
    }
  }, 60);
}

function renderVnStoriesView() {
  const container = document.getElementById('vnStoriesContainer');
  if (!container || typeof VIET_STORIES_DATA === 'undefined') return;
  const st = VIET_STORIES_DATA[currentVnStoryIdx] || VIET_STORIES_DATA[0];
  const myNav = window.appNavEpoch || 0;

  container.innerHTML = `
    <div class="alpha-section-card" style="border-color: #fda4af; border-bottom-color: #e11d48;">
      <div class="lesson-tabs-track" id="vnStoriesTrack" style="margin-bottom: 14px;"></div>
      <div class="story-header-row">
        <h3 style="margin:0; font-size:20px; font-weight:900; color:#be123c;">${st.icon} ${st.title}</h3>
        <div class="story-header-actions">
          <button type="button" class="btn-theater-launch" id="btnWatchVnStoryMovie">
            <span>🎬</span> Xem phim kể chuyện
          </button>
          <button type="button" class="challenge-btn" id="btnHearVnStory" style="padding:8px 18px; font-size:14px;">
            <span>🔊</span> Nghe ${window.soundMgr?.gender === 'male' ? 'ba' : 'cô'} đọc bài văn
          </button>
        </div>
      </div>
      ${st.image ? `<div class="story-cover-frame"><img src="${st.image}" alt="${st.title}" loading="lazy"></div>` : ''}
      <div class="story-vn-lines">
        ${st.lines.map(l => `<p class="story-vn-line">${l}</p>`).join('')}
      </div>
      <div class="story-comp-box">
        <div class="quiz-question-box" style="margin-bottom:12px;">
          <div class="quiz-question-title" style="font-size:17px;">🎯 ${st.question}</div>
          <button type="button" class="btn-hear-hint" id="btnHearVnStoryQ" style="margin:8px auto 0 auto;"><span>🔊</span> Nghe câu hỏi &amp; đáp án</button>
        </div>
        <div class="quiz-options-grid" id="vnStoryOptionsGrid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));"></div>
      </div>
    </div>
  `;

  const track = document.getElementById('vnStoriesTrack');
  VIET_STORIES_DATA.forEach((item, idx) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `lesson-tab ${idx === currentVnStoryIdx ? 'active' : ''}`;
    pill.innerText = `${item.icon} Bài ${idx + 1}`;
    pill.onclick = () => {
      currentVnStoryIdx = idx;
      window.soundMgr.playClick();
      renderVnStoriesView();
    };
    track.appendChild(pill);
  });

  document.getElementById('btnWatchVnStoryMovie')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    window.openStoryTheater?.({ kind: 'vn', itemId: st.id });
    markWordLearned(st.id);
  });

  document.getElementById('btnHearVnStory').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(st.audioKey, null, st.lines.join(' '));
    markWordLearned(st.id);
  };

  const optsGrid = document.getElementById('vnStoryOptionsGrid');
  const qBox = container.querySelector('.quiz-question-box');
  const tour = [{ key: st.qAudioKey, fallbackText: st.question, el: qBox, pauseAfterMs: 180 }];
  let locked = false;

  [...st.options].sort(() => Math.random() - 0.5).forEach(opt => {
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe đáp án">🔊</button>
      <div class="quiz-opt-name" style="font-size:16px;">${opt.text}</div>
    `;
    const spk = card.querySelector('.quiz-opt-speak-btn');
    if (spk) spk.onclick = (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(opt.audioKey, null, opt.text);
    };
    tour.push({ key: opt.audioKey, fallbackText: opt.text, el: card, pauseAfterMs: 110 });
    card.onclick = () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (opt.isGood) {
        locked = true;
        card.classList.add('correct');
        window.soundMgr.playCorrect();
        fireConfetti();
        const vnQuizKey = `vn_story_done_${st.id}`;
        const alreadyDone = !!explorerState.wordStats?.[vnQuizKey];
        window.recordAnswer?.(vnQuizKey, true, { label: st.title, mode: 'phonics', audioKey: st.qAudioKey, noAutoCoin: true });
        if (!alreadyDone) {
          awardStars(5, 'Đọc hiểu Tiếng Việt HK2 siêu giỏi!');
        } else {
          showToast('🌟 Đọc hiểu chính xác! Bảo Long nhớ bài rất kỹ!');
        }
        markWordLearned(st.id);
        window.soundMgr.speakPraise(true);
      } else {
        card.classList.add('wrong');
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
      }
    };
    optsGrid.appendChild(card);
  });

  document.getElementById('btnHearVnStoryQ').onclick = () => {
    window.soundMgr.playClick();
    if ((window.appNavEpoch || 0) === myNav) {
      window.soundMgr.playChoiceTour(tour);
    }
  };
}

function renderDinoView() {
  const container = document.getElementById('dinoCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const btnRoar = document.getElementById('btnDinoRoar');
  if (btnRoar) {
    btnRoar.onclick = () => {
      window.soundMgr.playDinoRoar?.();
      window.soundMgr.playAudioFile('cheer_dino', null, 'Gầm to nào Bảo Long ơi! Roar!');
      window.livingFX?.pulseRumble(document.getElementById('dinoContainer'));
      const r = btnRoar.getBoundingClientRect();
      window.livingFX?.burst(r.left + r.width / 2, r.top + r.height / 2, 'dino', 22);
      window.livingFX?.floatLabel(r.left + r.width / 2, r.top, 'ROAAAR! 🌋', '#15803d');
      fireConfetti();
    };
  }

  const btnAutoDinos = document.getElementById('btnAutoPlayDinos');
  if (btnAutoDinos) {
    btnAutoDinos.onclick = () => {
      toggleAutoPlayList(
        btnAutoDinos,
        DINO_LESSONS,
        '#dinoCardsContainer .dino-card',
        (d, done) => window.soundMgr.speakWordObj(d, done)
      );
    };
  }

  DINO_LESSONS.forEach((dino, idx) => {
    const learned = explorerState.learnedIds.includes(dino.id);
    const card = document.createElement('div');
    card.className = `word-card dino-card ${learned ? 'is-learned' : ''}`;
    card.dataset.wordId = dino.id;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '🦖'}</div>
      <div class="word-icon-img">${dino.icon}</div>
      <div class="word-dino-title">${dino.dinoName}</div>
      <div class="word-text" style="color: #047857;">${dino.word}</div>
      <div class="word-action-tag" style="background:#dcfce7; color:#15803d;">${learned ? 'Đã thuộc ✓' : 'Khám phá ngay'}</div>
      <div class="word-ja-sub">${dino.ja}</div>
      <div class="word-fact-tag">💡 ${dino.funFact}</div>
    `;

    card.addEventListener('click', () => {
      openModal(dino, DINO_LESSONS, idx);
    });
    container.appendChild(card);
  });
}

function renderVehicleView() {
  const container = document.getElementById('vehicleCardsContainer');
  if (!container) return;
  container.innerHTML = '';

  const btnHonk = document.getElementById('btnVehicleHonk');
  if (btnHonk) {
    btnHonk.onclick = () => {
      window.soundMgr.playCarHorn?.();
      const r = btnHonk.getBoundingClientRect();
      window.livingFX?.burst(r.left + r.width / 2, r.top + r.height / 2, 'vehicle', 18);
      window.livingFX?.floatLabel(r.left + r.width / 2, r.top, 'BÍP BÍP! 🚗💨', '#0284c7');
    };
  }

  const btnAutoVeh = document.getElementById('btnAutoPlayVehicles');
  if (btnAutoVeh) {
    btnAutoVeh.onclick = () => {
      toggleAutoPlayList(
        btnAutoVeh,
        VEHICLE_LESSONS,
        '#vehicleCardsContainer .veh-card',
        (v, done) => window.soundMgr.speakWordObj(v, done)
      );
    };
  }

  VEHICLE_LESSONS.forEach((veh, idx) => {
    const learned = explorerState.learnedIds.includes(veh.id);
    const card = document.createElement('div');
    card.className = `word-card veh-card ${learned ? 'is-learned' : ''}`;
    card.dataset.wordId = veh.id;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '🚗'}</div>
      <div class="word-icon-img">${veh.icon}</div>
      <div class="word-dino-title" style="color: #0369a1;">${veh.vehName}</div>
      <div class="word-text" style="color: #0284c7;">${veh.word}</div>
      <div class="word-action-tag" style="background:#e0f2fe; color:#0369a1;">${learned ? 'Đã thuộc ✓' : 'Chạm để học'}</div>
      <div class="word-ja-sub">${veh.ja}</div>
      <div class="word-fact-tag" style="background:#f0f9ff; border-left:3px solid #0284c7;">💡 ${veh.funFact}</div>
    `;

    card.addEventListener('click', () => {
      openModal(veh, VEHICLE_LESSONS, idx);
    });
    container.appendChild(card);
  });
}

// ========================================================
// MODAL FLASHCARD LIÊN HOÀN (◀ / ▶) & TẬP VIẾT 4 Ô LY
// ========================================================
function openModal(wordObj, list = null, index = 0) {
  if (!document.getElementById('modalOverlay')?.classList.contains('active')) {
    lastFocusedBeforeModal = document.activeElement;
  }
  stopAutoPlay();
  if (list && Array.isArray(list)) {
    modalPlaylist = list;
    modalPlaylistIdx = index;
  } else if (modalPlaylist.length === 0) {
    modalPlaylist = [wordObj];
    modalPlaylistIdx = 0;
  }

  currentWordModal = wordObj;
  writingAwardedThisOpen = false;

  const isNewlyLearned = markWordLearned(wordObj.id);
  window.soundMgr.playClick();
  window.soundMgr.speakWordObj(wordObj);

  if (isNewlyLearned) {
    // Update the newly learned card badge & progress bar in place with 0ms DOM lag!
    refreshCurrentGridStarsOnly(wordObj.id);
    showToast(`⭐ +2 Sao! Bảo Long đã khám phá từ "${wordObj.word}"!`);
  }

  // Nav header inside Modal
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const stepInfo = document.getElementById('modalStepInfo');
  if (prevBtn) prevBtn.disabled = modalPlaylistIdx <= 0;
  if (nextBtn) nextBtn.disabled = modalPlaylistIdx >= modalPlaylist.length - 1;
  if (stepInfo) stepInfo.innerText = `${modalPlaylistIdx + 1} / ${modalPlaylist.length}`;

  document.getElementById('modalIcon').innerHTML = wordObj.icon;
  document.getElementById('modalWord').innerText = wordObj.word;

  const learnedBadge = document.getElementById('modalLearnedBadge');
  if (learnedBadge) {
    learnedBadge.innerText = isNewlyLearned ? '🎉 Mới khám phá! (+2 ⭐)' : '⭐ Đã có trong Kho Báu';
  }

  // Breakdown clickable parts -> dùng soundMgr.speakPart(trimmed) chuẩn 100%, không 404!
  const breakdownBox = document.getElementById('modalBreakdownBox');
  breakdownBox.innerHTML = '';
  const parts = (wordObj.breakdown || wordObj.word).split(/[-+,]/);
  parts.forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;
    const span = document.createElement('div');
    span.className = 'breakdown-item';
    span.innerText = trimmed;
    span.title = `Chạm để nghe âm "${trimmed}"`;
    span.style.cursor = 'pointer';
    span.addEventListener('click', (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.speakPart(trimmed);
      const clean = trimmed.toLowerCase();
      if (clean === 's') showToast('Chữ s: "sờ" (uốn cong lưỡi như "quyển sách") 📚');
      else if (clean === 'x') showToast('Chữ x: "xờ" (thẳng lưỡi nhẹ như "xe ô tô") 🚗');
      else if (clean === 'k') showToast('Chữ k: phát âm là "ca"');
      else if (clean === 'c') showToast('Chữ c: phát âm là "cờ"');
      else if (clean === 'â') showToast('Chữ â: phát âm là "ớ"');
    });
    breakdownBox.appendChild(span);
  });

  document.getElementById('modalJaText').innerText = wordObj.ja ? `🇯🇵 ${wordObj.ja}` : '';
  document.getElementById('modalExample').innerText = `Ví dụ: "${wordObj.example}"`;

  document.getElementById('canvasDrawingBox').classList.remove('active');
  document.getElementById('modalOverlay').classList.add('active');
  setTimeout(() => document.getElementById('modalCloseBtn')?.focus(), 40);
}

function navigateModal(delta) {
  const newIdx = modalPlaylistIdx + delta;
  if (newIdx < 0 || newIdx >= modalPlaylist.length) return;
  openModal(modalPlaylist[newIdx], modalPlaylist, newIdx);
}

function refreshCurrentGridStarsOnly(newlyLearnedId = null) {
  if (newlyLearnedId) {
    const safeId = (typeof CSS !== 'undefined' && CSS.escape) ? CSS.escape(newlyLearnedId) : newlyLearnedId;
    document.querySelectorAll(`[data-word-id="${safeId}"]`).forEach(card => {
      card.classList.add('is-learned');
      const starEl = card.querySelector('.star-corner');
      if (starEl) starEl.innerText = '⭐';
      const tagEl = card.querySelector('.word-action-tag');
      if (tagEl) tagEl.innerText = 'Đã thuộc ✓';
    });
    if ((currentMode === 'vocab' || currentMode === 'phonics') && activeLessonContext?.lesson) {
      const words = activeLessonContext.lesson.words;
      const done = words.filter(w => explorerState.learnedIds.includes(w.id)).length;
      const pct = Math.round((done / words.length) * 100);
      const bar = document.getElementById('lessonProgressBar');
      const txt = document.getElementById('lessonProgressText');
      if (bar) bar.style.width = `${pct}%`;
      if (txt) txt.innerText = `${done} / ${words.length} từ đã khám phá${pct === 100 ? ' 🎉' : ''}`;
      const activeTab = document.querySelector('#lessonTabsTrack .lesson-tab.active span:last-child');
      if (activeTab) activeTab.innerText = pct === 100 ? '✅' : `${done}/${words.length}`;
    }
    return;
  }
  if (currentMode === 'vocab' && VOCAB_LESSONS[currentLessonIdx]) {
    renderRoadmapHeader(VOCAB_LESSONS, 'LỘ TRÌNH TỪ MỚI', 'Thử thách ghép chữ');
    renderLessonCards(VOCAB_LESSONS[currentLessonIdx].words, 'vocab');
  } else if (currentMode === 'phonics' && PHONICS_LESSONS[currentLessonIdx]) {
    renderRoadmapHeader(PHONICS_LESSONS, 'TẬP ĐÁNH VẦN', 'Thử thách ghép vần');
    renderLessonCards(PHONICS_LESSONS[currentLessonIdx].words, 'phonics');
  } else if (currentMode === 'dino') {
    renderDinoView();
  } else if (currentMode === 'dragons') {
    if (typeof renderDragonCardsView === 'function') renderDragonCardsView();
  } else if (currentMode === 'vehicles') {
    renderVehicleView();
  }
}

function closeModal() {
  window.customVoiceStore?.stopRecording?.();
  document.getElementById('modalOverlay')?.classList.remove('active');
  window.soundMgr.stopAll();
  window.soundMgr.playClick();
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    try { lastFocusedBeforeModal.focus(); } catch (e) {}
  }
  lastFocusedBeforeModal = null;
}

function closeStickerModalHelper() {
  window.customVoiceStore?.stopRecording?.();
  document.getElementById('stickerModalOverlay')?.classList.remove('active');
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    try { lastFocusedBeforeModal.focus(); } catch (e) {}
  }
  lastFocusedBeforeModal = null;
}

// ========================================================
// CANVAS TẬP VIẾT 4 Ô LY CHUẨN TIỂU HỌC & CHẤM SAO
// ========================================================
function initCanvas() {
  canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvasToFit();

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  canvas.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches[0]) return;
    e.preventDefault();
    const touch = e.touches[0];
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY }));
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    if (!e.touches || !e.touches[0]) return;
    e.preventDefault();
    const touch = e.touches[0];
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: touch.clientX, clientY: touch.clientY }));
  }, { passive: false });
  canvas.addEventListener('touchend', () => {
    canvas.dispatchEvent(new MouseEvent('mouseup', {}));
  });
  canvas.addEventListener('touchcancel', () => {
    stopDraw();
  });

  document.getElementById('btnCanvasClear')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    clearCanvas();
    if (currentWordModal) drawLetterGuide(currentWordModal.word);
  });

  document.getElementById('btnCanvasFinish')?.addEventListener('click', () => {
    window.soundMgr.playCorrect();
    fireConfetti();
    window.soundMgr.playAudioFile('cheer_write', null, 'Bảo Long viết chữ đẹp quá!');
    if (!writingAwardedThisOpen) {
      writingAwardedThisOpen = true;
      awardStars(2, 'Tập viết chữ đẹp!');
    } else {
      showToast('✍️ Chữ Bảo Long viết thật nắn nót! Tuyệt vời!');
    }
  });

  document.querySelectorAll('.color-picker-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.color-picker-dot').forEach(d => d.classList.remove('active-dot'));
      dot.classList.add('active-dot');
      drawColor = dot.dataset.color;
      window.soundMgr.playClick();
    });
  });

  document.querySelectorAll('#vnHintLevelGroup .vn-hint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#vnHintLevelGroup .vn-hint-btn').forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      window.soundMgr?.playClick();
      if (typeof setVnWritingHintLevel === 'function') setVnWritingHintLevel(btn.dataset.level);
      clearCanvas();
      if (currentWordModal) drawLetterGuide(currentWordModal.word);
    });
  });

  document.getElementById('btnCanvasCheck')?.addEventListener('click', () => {
    if (!canvas || !currentWordModal || typeof evaluateCanvasGuideMatch !== 'function') return;
    window.soundMgr?.playClick();
    const res = evaluateCanvasGuideMatch(canvas, (gCtx, w) => {
      const cssW = lastCanvasCssWidth || 340;
      const cssH = 165;
      const dpr = Math.max(1, w / cssW);
      gCtx.save();
      gCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let fontSize = 86;
      gCtx.font = `bold ${fontSize}px Nunito, sans-serif`;
      while (gCtx.measureText(currentWordModal.word).width > cssW - 28 && fontSize > 26) {
        fontSize -= 4;
        gCtx.font = `bold ${fontSize}px Nunito, sans-serif`;
      }
      gCtx.fillStyle = '#000';
      gCtx.textAlign = 'center';
      gCtx.textBaseline = 'middle';
      gCtx.fillText(currentWordModal.word, cssW / 2, cssH / 2 + 2);
      gCtx.restore();
    });
    showToast(res.hintText);
    if (res.matchedPct >= 45) window.soundMgr?.playPop();
  });
}

function resizeCanvasToFit(preserveInk = false) {
  if (!canvas || !ctx) return;
  const box = document.getElementById('canvasDrawingBox');
  const cssW = box && box.clientWidth > 100 ? Math.max(260, Math.min(400, box.clientWidth - 20)) : 340;
  const cssH = 165;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let snapshot = null;
  if (preserveInk && canvas.width > 0 && canvas.height > 0) {
    snapshot = document.createElement('canvas');
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    snapshot.getContext('2d').drawImage(canvas, 0, 0);
  }
  lastCanvasCssWidth = cssW;
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (snapshot) {
    ctx.drawImage(snapshot, 0, 0, cssW, cssH);
  }
}

function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const cssW = lastCanvasCssWidth || rect.width || 340;
  const cssH = 165;
  return {
    x: (e.clientX - rect.left) * (cssW / (rect.width || cssW)),
    y: (e.clientY - rect.top) * (cssH / (rect.height || cssH))
  };
}

function startDraw(e) {
  isDrawing = true;
  const coords = getCanvasCoords(e);
  ctx.save();
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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
  if (!ctx || !canvas) return;
  const w = lastCanvasCssWidth || 340;
  const h = 165;
  ctx.clearRect(0, 0, w, h);
  drawPrimaryGridLines();
}

function drawPrimaryGridLines() {
  if (!ctx || !canvas) return;
  const w = lastCanvasCssWidth || 340;
  const h = 165;
  ctx.save();
  // Đường kẻ 4 ô ly chuẩn tiểu học nhẹ nhàng
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  const rows = 4;
  for (let i = 1; i < rows; i++) {
    const y = (h / rows) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let x = 40; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  // Đường cơ sở đậm hơn nhẹ
  ctx.setLineDash([]);
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.75);
  ctx.lineTo(w, h * 0.75);
  ctx.stroke();
  ctx.restore();
}

function drawLetterGuide(word) {
  if (!ctx || !canvas || !word) return;
  const cssW = lastCanvasCssWidth || 340;
  const cssH = 165;
  let fontSize = 86;
  ctx.save();
  ctx.font = `bold ${fontSize}px Nunito, sans-serif`;
  while (ctx.measureText(word).width > cssW - 28 && fontSize > 26) {
    fontSize -= 4;
    ctx.font = `bold ${fontSize}px Nunito, sans-serif`;
  }
  const fontSpec = ctx.font;
  ctx.restore();
  const lvl = typeof getVnWritingHintLevel === 'function' ? getVnWritingHintLevel() : 'guide';
  if (typeof drawHintByLevel === 'function') {
    drawHintByLevel(ctx, cssW, cssH, word, lvl, fontSpec, 2);
  } else {
    ctx.save();
    ctx.font = fontSpec;
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, cssW / 2, cssH / 2 + 2);
    ctx.restore();
  }
}

// ========================================================
// KHU TRÒ CHƠI (GAME HUB - 7 TRÒ CHƠI TƯƠNG TÁC & THỰC TẾ)
// ========================================================
function switchSubGame(subgame) {
  stopAutoPlay();
  clearListenBlitzTimer();
  window.soundMgr.stopAll();
  if (typeof stopArcadeGameLoop === 'function') stopArcadeGameLoop();
  window.appNavEpoch++;
  currentSubGame = subgame;
  updateGameCoinsHUD();

  const paneMap = {
    puzzle: ['subgamePuzzlePane', 'tabBtnPuzzle'],
    listen_catch: ['subgameListenCatchPane', 'tabBtnListenCatch'],
    shinkansen: ['subgameShinkansenPane', 'tabBtnShinkansen'],
    dino_memory: ['subgameMemoryPane', 'tabBtnMemory'],
    dino_quiz: ['subgameDinoQuizPane', 'tabBtnDinoQuiz'],
    dino_dig: ['subgameDinoDigPane', 'tabBtnDinoDig'],
    dino_feed: ['subgameDinoFeedPane', 'tabBtnDinoFeed'],
    dino_hatch: ['subgameDinoHatchPane', 'tabBtnDinoHatch'],
    quiz: ['subgameQuizPane', 'tabBtnQuiz']
  };

  Object.entries(paneMap).forEach(([key, [paneId, tabId]]) => {
    const pEl = document.getElementById(paneId);
    const tEl = document.getElementById(tabId);
    if (pEl) pEl.style.display = key === subgame ? 'block' : 'none';
    if (tEl) tEl.classList.toggle('active', key === subgame);
  });

  window.soundMgr.playClick();

  if (subgame === 'puzzle') {
    if (gameQuestions.length === 0) startMiniGame(lastPuzzleSource);
    else loadGameQuestion();
  } else if (subgame === 'listen_catch') {
    initListenCatchGame();
  } else if (subgame === 'shinkansen') {
    initShinkansenGame();
  } else if (subgame === 'dino_memory') {
    initDinoMemoryGame();
  } else if (subgame === 'dino_quiz') {
    initDinoQuiz();
  } else if (subgame === 'dino_dig') {
    initDinoDig();
  } else if (subgame === 'dino_feed') {
    window.dinoDragonGames?.initDinoFeed?.();
  } else if (subgame === 'dino_hatch') {
    window.dinoDragonGames?.initDinoHatch?.();
  } else if (subgame === 'quiz') {
    initVehicleQuiz();
  }
}

// ========================================================
// GAME 1: GHÉP CHỮ VUI (ĐỘNG + GỢI Ý TỪNG CHỮ + COMBO XU)
// ========================================================
function splitVietnameseWordToPuzzle(word) {
  const lower = (word || '').normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!lower) return [];
  if (lower.includes(' ')) {
    return lower.split(' ');
  }
  const digraphs = ['ngh', 'ng', 'gh', 'gi', 'ch', 'kh', 'nh', 'ph', 'qu', 'th', 'tr'];
  for (const dg of digraphs) {
    if (lower.startsWith(dg) && lower.length > dg.length) {
      return [dg, lower.slice(dg.length)];
    }
  }
  const singleCons = new Set(['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x']);
  if (singleCons.has(lower[0]) && lower.length > 1) {
    return [lower[0], lower.slice(1)];
  }
  for (const coda of ['ng', 'nh', 'ch', 'm', 'n', 'p', 't', 'c']) {
    if (lower.endsWith(coda) && lower.length > coda.length) {
      return [lower.slice(0, lower.length - coda.length), coda];
    }
  }
  if (lower.length >= 2) {
    return [lower.slice(0, lower.length - 1), lower.slice(-1)];
  }
  return [lower];
}

function buildDynamicPuzzlesForLesson(lesson) {
  if (!lesson || !lesson.words) return [...SPELL_BUILDER_DATA];

  const poolHeads = ['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 's', 't', 'v', 'x', 'ch', 'nh', 'tr'];
  const allLessonPieces = lesson.words.flatMap(x => splitVietnameseWordToPuzzle(x.word));
  const allTails = lesson.words.map(x => splitVietnameseWordToPuzzle(x.word)[1]).filter(Boolean);

  return lesson.words.map(w => {
    const puzzle = splitVietnameseWordToPuzzle(w.word);
    const options = [...puzzle];
    const usedSet = new Set(puzzle);
    const targetExtraCount = Math.min(3, Math.max(2, 5 - puzzle.length));
    let added = 0;
    let guard = 0;
    while (added < targetExtraCount && guard < 40) {
      guard++;
      let cand = '';
      if (puzzle.length === 2 && Math.random() < 0.5 && allTails.length > 1) {
        cand = allTails[Math.floor(Math.random() * allTails.length)];
      } else if (w.word.includes(' ') && allLessonPieces.length > 2) {
        cand = allLessonPieces[Math.floor(Math.random() * allLessonPieces.length)] || '';
      } else {
        cand = poolHeads[Math.floor(Math.random() * poolHeads.length)];
      }
      if (cand && !usedSet.has(cand)) {
        usedSet.add(cand);
        options.push(cand);
        added++;
      }
    }
    return {
      id: w.id,
      target: w.word,
      meaning: `${w.example} (${w.ja})`,
      ja: w.ja,
      icon: w.icon,
      puzzle,
      options
    };
  });
}

function startMiniGame(source = 'default') {
  if (explorerState.parentSettings?.focusHideGames) {
    showToast('📚 Đang bật Chế độ Tập Trung — vào Góc Phụ Huynh để mở lại Trò chơi nhé!');
    return;
  }
  stopAutoPlay();
  clearListenBlitzTimer();
  window.soundMgr.stopAll();
  if (typeof stopArcadeGameLoop === 'function') stopArcadeGameLoop();
  window.appNavEpoch++;
  lastPuzzleSource = source;
  currentMode = 'game';
  currentSubGame = 'puzzle';
  updateGameCoinsHUD();

  document.querySelectorAll('.mode-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === 'game');
  });

  document.getElementById('roadmapBox').style.display = 'none';
  document.getElementById('cardsContainer').style.display = 'none';
  document.getElementById('alphabetContainer').style.display = 'none';
  document.getElementById('dinoContainer').style.display = 'none';
  if (document.getElementById('dragonContainer')) document.getElementById('dragonContainer').style.display = 'none';
  document.getElementById('vehicleContainer').style.display = 'none';
  if (document.getElementById('mathContainer')) document.getElementById('mathContainer').style.display = 'none';
  if (document.getElementById('ethicsContainer')) document.getElementById('ethicsContainer').style.display = 'none';
  if (document.getElementById('englishContainer')) document.getElementById('englishContainer').style.display = 'none';
  if (document.getElementById('japaneseContainer')) document.getElementById('japaneseContainer').style.display = 'none';
  if (document.getElementById('scienceContainer')) document.getElementById('scienceContainer').style.display = 'none';
  if (document.getElementById('artsContainer')) document.getElementById('artsContainer').style.display = 'none';
  if (document.getElementById('vnStoriesContainer')) document.getElementById('vnStoriesContainer').style.display = 'none';
  if (document.getElementById('arcadeContainer')) document.getElementById('arcadeContainer').style.display = 'none';
  if (document.getElementById('phonicsDecodableHost')) document.getElementById('phonicsDecodableHost').style.display = 'none';
  document.getElementById('gameViewContainer').style.display = 'block';

  document.querySelectorAll('#gameViewContainer .game-view').forEach(p => { p.style.display = 'none'; });
  document.querySelectorAll('#gameViewContainer .game-tab-btn').forEach(t => { t.classList.remove('active'); });
  document.getElementById('subgamePuzzlePane').style.display = 'block';
  document.getElementById('tabBtnPuzzle').classList.add('active');

  if (source === 'lesson' && activeLessonContext && activeLessonContext.lesson) {
    gameQuestions = buildDynamicPuzzlesForLesson(activeLessonContext.lesson);
  } else {
    lastPuzzleSource = 'default';
    gameQuestions = [...SPELL_BUILDER_DATA];
  }

  gameQuestions.sort(() => Math.random() - 0.5);
  gameCurrentIndex = 0;
  gameScore = 0;
  puzzleStreak = 0;

  document.getElementById('puzzlePlayStage').style.display = 'block';
  document.getElementById('puzzleVictoryStage').style.display = 'none';

  loadGameQuestion();
}

function loadGameQuestion() {
  puzzleEpoch++;
  puzzleLocked = false;
  if (gameCurrentIndex >= gameQuestions.length) {
    showGameVictory();
    return;
  }

  document.getElementById('puzzlePlayStage').style.display = 'block';
  document.getElementById('puzzleVictoryStage').style.display = 'none';

  const q = gameQuestions[gameCurrentIndex];
  document.getElementById('gameProgressText').innerText = `Câu ${gameCurrentIndex + 1} / ${gameQuestions.length}`;
  const stEl = document.getElementById('puzzleStreakBadge');
  if (stEl) stEl.innerText = `🔥 Chuỗi x${puzzleStreak}`;
  document.getElementById('gameStarsCount').innerText = `⭐ ${gameScore} sao`;

  const modePill = document.getElementById('puzzleModePill');
  if (modePill) {
    modePill.innerText = lastPuzzleSource === 'lesson' && activeLessonContext
      ? `📖 Bài ${activeLessonContext.lesson.id}`
      : '📚 Tổng hợp 12 từ';
  }

  document.getElementById('gameTargetIcon').innerHTML = q.icon;
  document.getElementById('gameTargetHint').innerText = `Ghép chữ: "${q.target}"`;
  document.getElementById('gameTargetJa').innerText = q.ja ? `🇯🇵 ${q.ja}` : `🇯🇵 ${q.meaning}`;

  const slotsContainer = document.getElementById('puzzleSlots');
  slotsContainer.innerHTML = '';
  gameSlots = new Array(q.puzzle.length).fill(null);

  q.puzzle.forEach((_, idx) => {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.id = `slot-${idx}`;
    slot.innerText = '';
    slot.addEventListener('click', () => {
      if (puzzleLocked) return;
      if (gameSlots[idx]) {
        const removed = gameSlots[idx];
        const origBtn = document.getElementById(removed.btnId);
        if (origBtn) origBtn.classList.remove('used');
        gameSlots[idx] = null;
        slot.innerText = '';
        slot.classList.remove('filled');
        window.soundMgr.playPop();
      }
    });
    slotsContainer.appendChild(slot);
  });

  const optionsContainer = document.getElementById('optionsLettersRow');
  optionsContainer.innerHTML = '';
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  shuffledOptions.forEach((char, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'letter-option-btn';
    btn.style.width = char.length > 2 ? 'auto' : '56px';
    btn.style.padding = char.length > 2 ? '0 14px' : '0';
    btn.innerText = char;
    btn.id = `opt-btn-${idx}`;
    btn.addEventListener('click', () => {
      window.soundMgr.speakPart(char);
      handleLetterChoose(char, btn);
    });
    optionsContainer.appendChild(btn);
  });

  window.soundMgr.speakWord(q.target);

  document.getElementById('btnHearHint').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.speakWord(q.target);
  };
  const btnHintPiece = document.getElementById('btnPuzzleHint');
  if (btnHintPiece) {
    btnHintPiece.onclick = () => {
      if (puzzleLocked) return;
      const nextEmpty = gameSlots.findIndex(s => s === null);
      if (nextEmpty === -1) return;
      const neededChar = q.puzzle[nextEmpty];
      const matchBtn = Array.from(optionsContainer.querySelectorAll('.letter-option-btn'))
        .find(b => !b.classList.contains('used') && b.innerText === neededChar);
      if (matchBtn) {
        window.soundMgr.speakPart(neededChar);
        showToast(`💡 Gợi ý ô ${nextEmpty + 1}: "${neededChar}"`);
        handleLetterChoose(neededChar, matchBtn);
      }
    };
  }
  document.getElementById('btnResetPuzzle').onclick = () => {
    window.soundMgr.playClick();
    loadGameQuestion();
  };
  document.getElementById('btnTogglePuzzleSource').onclick = () => {
    const nextSrc = (lastPuzzleSource === 'default' && activeLessonContext) ? 'lesson' : 'default';
    startMiniGame(nextSrc);
  };
}

function handleLetterChoose(char, btnElement) {
  if (puzzleLocked || btnElement.classList.contains('used')) return;
  const emptyIdx = gameSlots.findIndex(s => s === null);
  if (emptyIdx === -1) return;

  btnElement.classList.add('used');
  gameSlots[emptyIdx] = { char, btnId: btnElement.id };

  const slotElement = document.getElementById(`slot-${emptyIdx}`);
  slotElement.innerText = char;
  slotElement.classList.add('filled');

  if (gameSlots.every(s => s !== null)) {
    checkPuzzleResult();
  }
}

function checkPuzzleResult() {
  puzzleLocked = true;
  const myNav = window.appNavEpoch;
  const myPuz = puzzleEpoch;
  const q = gameQuestions[gameCurrentIndex];
  const currentWord = gameSlots.map(s => s.char).join(q.target.includes(' ') ? ' ' : '');

  if (currentWord.toLowerCase() === q.target.toLowerCase()) {
    puzzleStreak++;
    const bonusCoins = puzzleStreak >= 3 ? 3 : 2;
    window.soundMgr.playCorrect();
    fireConfetti();
    gameScore += puzzleStreak >= 3 ? 15 : 10;
    awardCoins(bonusCoins, true);
    window.recordAnswer?.(q.id || `puz_${q.target}`, true, { label: q.target, mode: 'game', audioKey: `word_${q.target.toLowerCase()}`, noAutoCoin: true });
    document.getElementById('gameStarsCount').innerText = `⭐ ${gameScore} sao`;
    const stEl = document.getElementById('puzzleStreakBadge');
    if (stEl) stEl.innerText = `🔥 Chuỗi x${puzzleStreak}`;
    showToast(`🎉 Chuẩn xác "${q.target}"! +${bonusCoins} 🪙 Xu!`);
    window.soundMgr.playPraiseThen(puzzleStreak >= 3,
      () => window.appNavEpoch === myNav && puzzleEpoch === myPuz,
      () => {
        gameCurrentIndex++;
        loadGameQuestion();
      }
    );
  } else {
    puzzleStreak = 0;
    const stEl = document.getElementById('puzzleStreakBadge');
    if (stEl) stEl.innerText = `🔥 Chuỗi x0`;
    window.recordAnswer?.(q.id || `puz_${q.target}`, false, { label: q.target, mode: 'game', audioKey: `word_${q.target.toLowerCase()}`, noAutoCoin: true });
    window.soundMgr.playWrong();
    showToast(`Chưa khớp "${q.target}" rồi (ra "${currentWord}"), thử xếp lại nhé! ❤️`);
    window.soundMgr.speakTryAgain();
    setTimeout(() => {
      if (window.appNavEpoch !== myNav || puzzleEpoch !== myPuz) return;
      loadGameQuestion();
    }, 850);
  }
}

function showGameVictory() {
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  fireConfetti();
  window.markDailyStep?.('play');
  awardCoins(10, true);
  awardStars(15, 'Hoàn thành Ghép Chữ Vui (+10 🪙 Xu)!');

  document.getElementById('puzzlePlayStage').style.display = 'none';
  document.getElementById('puzzleVictoryStage').style.display = 'block';
  document.getElementById('puzzleVictoryScore').innerText =
    `Bảo Long đạt ${gameScore} điểm (+15 ⭐ & +10 🪙 Xu thưởng)!`;
}

// ========================================================
// GAME 2: 👂 NGHE ÂM BẮT CHỮ (+ CHẾ ĐỘ PHẢN XẠ NHANH 45S)
// ========================================================
function initListenCatchGame(mode = listenMode) {
  clearListenBlitzTimer();
  listenMode = mode;
  document.getElementById('btnListenTricky')?.classList.toggle('active-filter', mode === 'tricky');
  document.getElementById('btnListenWords')?.classList.toggle('active-filter', mode === 'words');
  document.getElementById('btnListenBlitz')?.classList.toggle('active-filter', mode === 'blitz');

  document.getElementById('btnListenTricky').onclick = () => {
    window.soundMgr.playClick();
    initListenCatchGame('tricky');
  };
  document.getElementById('btnListenWords').onclick = () => {
    window.soundMgr.playClick();
    initListenCatchGame('words');
  };
  const blitzBtn = document.getElementById('btnListenBlitz');
  if (blitzBtn) {
    blitzBtn.onclick = () => {
      window.soundMgr.playClick();
      initListenCatchGame('blitz');
    };
  }

  let pool;
  if (mode === 'blitz') {
    pool = [...LISTEN_CATCH_POOLS.tricky, ...LISTEN_CATCH_POOLS.words].sort(() => Math.random() - 0.5);
    listenQuestions = pool;
  } else {
    pool = [...LISTEN_CATCH_POOLS[mode]].sort(() => Math.random() - 0.5);
    listenQuestions = pool.slice(0, Math.min(10, pool.length));
  }

  listenIndex = 0;
  listenScore = 0;
  listenStreak = 0;
  listenBestStreak = 0;
  listenAnsweredCount = 0;

  const tBadge = document.getElementById('listenTimerBadge');
  if (mode === 'blitz') {
    listenBlitzSec = 45;
    if (tBadge) {
      tBadge.style.display = 'inline-flex';
      tBadge.innerText = `⏱️ 45s`;
    }
    const myNav = window.appNavEpoch;
    listenBlitzTimer = setInterval(() => {
      if (window.appNavEpoch !== myNav || currentMode !== 'game' || currentSubGame !== 'listen_catch' || listenMode !== 'blitz') {
        clearListenBlitzTimer();
        return;
      }
      listenBlitzSec--;
      if (tBadge) tBadge.innerText = `⏱️ ${Math.max(0, listenBlitzSec)}s`;
      if (listenBlitzSec <= 0) {
        listenEpoch++;
        clearListenBlitzTimer();
        showListenCatchVictory();
      }
    }, 1000);
  } else if (tBadge) {
    tBadge.style.display = 'none';
  }

  document.getElementById('listenCatchPlayStage').style.display = 'block';
  document.getElementById('listenCatchVictoryStage').style.display = 'none';
  loadListenCatchQuestion();
}

function loadListenCatchQuestion() {
  listenEpoch++;
  const myNav = window.appNavEpoch;
  const myEpoch = listenEpoch;
  if (listenMode === 'blitz' && listenIndex >= listenQuestions.length) {
    listenQuestions = [...LISTEN_CATCH_POOLS.tricky, ...LISTEN_CATCH_POOLS.words].sort(() => Math.random() - 0.5);
    listenIndex = 0;
  }
  if (listenIndex >= listenQuestions.length) {
    showListenCatchVictory();
    return;
  }

  const q = listenQuestions[listenIndex];
  document.getElementById('listenProgressText').innerText = listenMode === 'blitz'
    ? `⚡ Câu ${listenIndex + 1}`
    : `Câu ${listenIndex + 1} / ${listenQuestions.length}`;
  document.getElementById('listenStreakBadge').innerText = `🔥 Chuỗi x${listenStreak}`;
  document.getElementById('listenScoreText').innerText = `⭐ ${listenScore} sao`;
  document.getElementById('listenPromptSub').innerText = `💡 Gợi ý: ${q.hint}`;

  const btnHear = document.getElementById('btnHearListenCatch');
  btnHear.onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(q.audioKey, null, q.prompt);
  };

  setTimeout(() => {
    if (window.appNavEpoch === myNav && listenEpoch === myEpoch) {
      window.soundMgr.playAudioFile(q.audioKey, null, q.prompt);
    }
  }, 60);

  const grid = document.getElementById('listenOptionsGrid');
  grid.innerHTML = '';
  const choices = [...q.choices].sort(() => Math.random() - 0.5);
  let listenLocked = false;

  choices.forEach(ch => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `listen-choice-card ${ch.length > 2 ? 'long-word' : ''}`;
    card.innerText = ch;
    card.addEventListener('click', () => {
      if (listenLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      if (ch === q.target) {
        listenLocked = true;
        card.classList.add('correct');
        listenStreak++;
        if (listenStreak > listenBestStreak) listenBestStreak = listenStreak;
        const pts = listenStreak >= 3 ? 15 : 10;
        const coinBonus = listenMode === 'blitz' ? 3 : 2;
        listenScore += pts;
        listenAnsweredCount++;
        awardCoins(coinBonus, true);
        window.recordAnswer?.(`lc_${q.target}`, true, { label: q.target, mode: 'game', audioKey: q.audioKey, noAutoCoin: true });
        document.getElementById('listenStreakBadge').innerText = `🔥 Chuỗi x${listenStreak}`;
        document.getElementById('listenScoreText').innerText = `⭐ ${listenScore} sao`;

        window.soundMgr.playCorrect();
        fireConfetti();
        showToast(listenStreak >= 3
          ? `🔥 COMBO x${listenStreak}! Siêu đỉnh +${coinBonus} 🪙 Xu!`
          : `🎉 Chuẩn xác "${q.target}"! +${coinBonus} 🪙 Xu!`);

        if (listenMode === 'blitz') {
          setTimeout(() => {
            if (window.appNavEpoch === myNav && listenEpoch === myEpoch) {
              listenIndex++;
              loadListenCatchQuestion();
            }
          }, 480);
        } else {
          window.soundMgr.playPraiseThen(listenStreak >= 3,
            () => window.appNavEpoch === myNav && listenEpoch === myEpoch,
            () => {
              listenIndex++;
              loadListenCatchQuestion();
            }
          );
        }
      } else {
        listenAnsweredCount++;
        card.classList.add('wrong');
        window.recordAnswer?.(`lc_${q.target}`, false, { label: q.target, mode: 'game', audioKey: q.audioKey, noAutoCoin: true });
        listenStreak = 0;
        document.getElementById('listenStreakBadge').innerText = `🔥 Chuỗi x0`;
        window.soundMgr.playWrong();
        showToast(`👂 Nghe kỹ lại gợi ý: ${q.hint}`);
        setTimeout(() => {
          if (window.appNavEpoch === myNav && listenEpoch === myEpoch) {
            window.soundMgr.playAudioFile(q.audioKey);
          }
        }, 280);
      }
    });
    grid.appendChild(card);
  });
}

function showListenCatchVictory() {
  clearListenBlitzTimer();
  window.soundMgr.stopAll();
  document.getElementById('listenCatchPlayStage').style.display = 'none';
  document.getElementById('listenCatchVictoryStage').style.display = 'block';

  if (listenMode === 'blitz' && listenAnsweredCount === 0) {
    window.soundMgr.playPop();
    document.getElementById('listenVictoryScore').innerText =
      '⏱️ Hết 45 giây rồi! Bảo Long bấm Chơi lại để nghe và chọn nhanh thật nhiều chữ nhé!';
    return;
  }

  fireConfetti();
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  window.markDailyStep?.('play');
  awardCoins(10, true);
  awardStars(15, 'Siêu thính giác Nghe Âm Bắt Chữ (+10 🪙 Xu)!');
  document.getElementById('listenVictoryScore').innerText =
    `Bảo Long ghi được ${listenScore} điểm (Chuỗi dài nhất: x${listenBestStreak})! (+15 ⭐ & +10 🪙 Xu)`;
}

// ========================================================
// GAME 3: 🚅 TÀU SHINKANSEN ĐÁNH VẦN (ĐÈN GA + CÂU THỰC TẾ)
// ========================================================
function initShinkansenGame() {
  shinkansenQuestions = [...SHINKANSEN_WORDS_DATA].sort(() => Math.random() - 0.5).slice(0, 10);
  shinkansenIndex = 0;
  shinkansenScore = 0;

  document.getElementById('shinkansenPlayStage').style.display = 'block';
  document.getElementById('shinkansenVictoryStage').style.display = 'none';
  loadShinkansenRound();
}

function loadShinkansenRound() {
  shinkansenEpoch++;
  const myNav = window.appNavEpoch;
  const myEpoch = shinkansenEpoch;
  if (shinkansenIndex >= shinkansenQuestions.length) {
    showShinkansenVictory();
    return;
  }

  const q = shinkansenQuestions[shinkansenIndex];
  selectedTrainHead = '';
  selectedTrainTail = '';
  shinkansenLocked = false;

  const trainEl = document.getElementById('trainTrainUnit');
  trainEl.classList.remove('zooming');
  const sigEl = document.getElementById('trainSignalLight');
  if (sigEl) {
    sigEl.innerText = '🔴 Đợi nối toa tàu';
    sigEl.style.background = '#fef2f2';
    sigEl.style.color = '#b91c1c';
    sigEl.style.borderColor = '#fca5a5';
  }
  const bannerEl = document.getElementById('trainFunBanner');
  if (bannerEl) bannerEl.innerText = `🚉 Ga số ${shinkansenIndex + 1} • Lắp đầu tàu + toa vần thành "${q.meaning}"!`;

  document.getElementById('shinkansenProgressText').innerText = `Chuyến tàu ${shinkansenIndex + 1} / ${shinkansenQuestions.length}`;
  document.getElementById('shinkansenScoreText').innerText = `⭐ ${shinkansenScore} sao`;
  document.getElementById('shinkansenTargetIcon').innerText = q.icon;
  document.getElementById('shinkansenTargetHint').innerText = `Lắp tàu chở chữ: "${q.meaning}"`;
  document.getElementById('shinkansenTargetJa').innerText = `🇯🇵 ${q.ja}`;

  document.getElementById('trainNoseSlot').innerText = '?';
  document.getElementById('trainBodySlot').innerText = '?';
  document.getElementById('trainPreviewWord').innerText = '= ...';

  document.getElementById('btnHearShinkansen').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.speakWord(q.word);
  };
  setTimeout(() => {
    if (window.appNavEpoch === myNav && shinkansenEpoch === myEpoch) window.soundMgr.speakWord(q.word);
  }, 60);

  const headGrid = document.getElementById('shinkansenHeadChoices');
  headGrid.innerHTML = '';
  [...q.headOptions].sort(() => Math.random() - 0.5).forEach(h => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'train-part-btn';
    btn.innerText = h;
    btn.addEventListener('click', () => {
      if (shinkansenLocked) return;
      headGrid.querySelectorAll('.train-part-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTrainHead = h;
      window.soundMgr.speakPart(h);
      updateTrainAssembly(q);
    });
    headGrid.appendChild(btn);
  });

  const tailGrid = document.getElementById('shinkansenTailChoices');
  tailGrid.innerHTML = '';
  [...q.tailOptions].sort(() => Math.random() - 0.5).forEach(t => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'train-part-btn';
    btn.innerText = t;
    btn.addEventListener('click', () => {
      if (shinkansenLocked) return;
      tailGrid.querySelectorAll('.train-part-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTrainTail = t;
      window.soundMgr.speakPart(t);
      updateTrainAssembly(q);
    });
    tailGrid.appendChild(btn);
  });
}

function updateTrainAssembly(q) {
  document.getElementById('trainNoseSlot').innerText = selectedTrainHead || '?';
  document.getElementById('trainBodySlot').innerText = selectedTrainTail || '?';
  const combined = (selectedTrainHead || '') + (selectedTrainTail || '');
  document.getElementById('trainPreviewWord').innerText = combined ? `= ${combined}` : '= ...';

  if (selectedTrainHead && selectedTrainTail) {
    const myNav = window.appNavEpoch;
    const myEpoch = shinkansenEpoch;
    shinkansenLocked = true;
    const sigEl = document.getElementById('trainSignalLight');
    const bannerEl = document.getElementById('trainFunBanner');
    if (combined === q.word) {
      shinkansenScore += 10;
      awardCoins(2, true);
      window.recordAnswer?.(`shin_${q.word}`, true, { label: q.word, mode: 'game', audioKey: `word_${q.word.toLowerCase()}`, noAutoCoin: true });
      document.getElementById('shinkansenScoreText').innerText = `⭐ ${shinkansenScore} sao`;
      if (sigEl) {
        sigEl.innerText = '🟢 ĐÈN XANH • TÀU CHẠY!';
        sigEl.style.background = '#dcfce7';
        sigEl.style.color = '#15803d';
        sigEl.style.borderColor = '#4ade80';
      }
      if (bannerEl) bannerEl.innerText = `💨 TU TUU! Chuyến tàu "${q.word}" (${q.meaning}) đang tăng tốc 320 km/h!`;
      window.soundMgr.playShinkansenWhistle();
      fireConfetti();
      document.getElementById('trainTrainUnit').classList.add('zooming');
      showToast(`🚅 TU TUU! Ghép chuẩn tàu "${q.word}"! +2 🪙 Xu!`);

      let shinAdvanced = false;
      const goNextShin = () => {
        if (shinAdvanced) return;
        shinAdvanced = true;
        if (window.appNavEpoch !== myNav || shinkansenEpoch !== myEpoch) return;
        shinkansenIndex++;
        loadShinkansenRound();
      };
      setTimeout(() => {
        if (window.appNavEpoch === myNav && shinkansenEpoch === myEpoch) {
          window.soundMgr.speakWord(q.word, () => setTimeout(goNextShin, 220));
        }
      }, 220);
      setTimeout(goNextShin, window.soundMgr.isMuted ? 500 : 1850);
    } else {
      window.recordAnswer?.(`shin_${q.word}`, false, { label: q.word, mode: 'game', audioKey: `word_${q.word.toLowerCase()}`, noAutoCoin: true });
      window.soundMgr.playWrong();
      window.soundMgr.speakTryAgain();
      if (bannerEl) bannerEl.innerText = `⚠️ "${selectedTrainHead} + ${selectedTrainTail}" ghép thành "${combined}", chưa đúng "${q.word}" rồi!`;
      showToast(`Chưa khớp "${q.word}" rồi (bé đang ghép "${combined}"), chọn lại nhé! ❤️`);
      setTimeout(() => {
        if (window.appNavEpoch !== myNav || shinkansenEpoch !== myEpoch) return;
        shinkansenLocked = false;
        selectedTrainHead = '';
        selectedTrainTail = '';
        document.querySelectorAll('#shinkansenHeadChoices .train-part-btn, #shinkansenTailChoices .train-part-btn')
          .forEach(b => b.classList.remove('selected'));
        document.getElementById('trainNoseSlot').innerText = '?';
        document.getElementById('trainBodySlot').innerText = '?';
        document.getElementById('trainPreviewWord').innerText = '= ...';
      }, 750);
    }
  }
}

function showShinkansenVictory() {
  fireConfetti();
  window.soundMgr.playShinkansenWhistle();
  window.soundMgr.speakCheer('win');
  window.markDailyStep?.('play');
  awardCoins(12, true);
  awardStars(20, 'Trưởng tàu Shinkansen siêu tốc (+12 🪙 Xu)!');

  document.getElementById('shinkansenPlayStage').style.display = 'none';
  document.getElementById('shinkansenVictoryStage').style.display = 'block';
  document.getElementById('shinkansenVictoryScore').innerText =
    `Bảo Long đã lắp 10 chuyến tàu đạt ${shinkansenScore} điểm (+20 ⭐ & +12 🪙 Xu)!`;
}

// ========================================================
// GAME 4: LẬT THẺ KHỦNG LONG (3 ĐỘ KHÓ + SOI 2S + KỶ LỤC + XU)
// ========================================================
function getMemoryBestKey(pairsCount) {
  return `baolong_mem_best_${pairsCount}`;
}

function initDinoMemoryGame(pairCount = memoryTargetPairs) {
  memoryEpoch++;
  const myMemEp = memoryEpoch;
  const myNav = window.appNavEpoch;
  memoryTargetPairs = Math.min(8, Math.max(4, pairCount || 6));
  memoryPeekUsed = false;
  memoryStreak = 0;

  const grid = document.getElementById('memoryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  document.getElementById('btnMemEasy')?.classList.toggle('active-filter', memoryTargetPairs === 4);
  document.getElementById('btnMemNormal')?.classList.toggle('active-filter', memoryTargetPairs === 6);
  document.getElementById('btnMemHard')?.classList.toggle('active-filter', memoryTargetPairs === 8);

  if (document.getElementById('btnMemEasy')) document.getElementById('btnMemEasy').onclick = () => { window.soundMgr.playClick(); initDinoMemoryGame(4); };
  if (document.getElementById('btnMemNormal')) document.getElementById('btnMemNormal').onclick = () => { window.soundMgr.playClick(); initDinoMemoryGame(6); };
  if (document.getElementById('btnMemHard')) document.getElementById('btnMemHard').onclick = () => { window.soundMgr.playClick(); initDinoMemoryGame(8); };

  const peekBtn = document.getElementById('btnMemPeek');
  if (peekBtn) {
    peekBtn.disabled = false;
    peekBtn.innerText = '👀 Soi 2s (1)';
    peekBtn.onclick = () => {
      if (memoryPeekUsed || memoryIsLocked) return;
      memoryPeekUsed = true;
      peekBtn.disabled = true;
      peekBtn.innerText = '👀 Đã dùng';
      memoryIsLocked = true;
      window.soundMgr.playPop();
      const cards = grid.querySelectorAll('.memory-card:not(.is-matched)');
      cards.forEach(c => c.classList.add('is-flipped'));
      showToast('👀 Nhìn nhanh để ghi nhớ trong 2 giây nhé!');
      setTimeout(() => {
        if (memoryEpoch !== myMemEp || window.appNavEpoch !== myNav) return;
        cards.forEach(c => {
          if (!memoryFlippedCards.some(fc => fc.el === c)) c.classList.remove('is-flipped');
        });
        memoryIsLocked = false;
      }, 2000);
    };
  }

  document.getElementById('memoryPlayStage').style.display = 'block';
  document.getElementById('memoryVictoryStage').style.display = 'none';
  document.getElementById('btnRestartMemory').onclick = () => {
    window.soundMgr.playClick();
    initDinoMemoryGame(memoryTargetPairs);
  };

  memoryFlips = 0;
  memoryMatchedCount = 0;
  memoryFlippedCards = [];
  memoryIsLocked = false;
  updateMemoryStats();

  const chosen = [...DINO_MEMORY_POOL].sort(() => Math.random() - 0.5).slice(0, memoryTargetPairs);
  const pairDeck = [];
  chosen.forEach(dino => {
    pairDeck.push({ ...dino, instanceId: `${dino.id}_a` });
    pairDeck.push({ ...dino, instanceId: `${dino.id}_b` });
  });

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

    cardEl.addEventListener('click', () => handleMemoryCardClick(cardData, cardEl));
    grid.appendChild(cardEl);
  });
}

function updateMemoryStats() {
  const flipsEl = document.getElementById('memoryFlipsText');
  const pairsEl = document.getElementById('memoryPairsText');
  const streakEl = document.getElementById('memoryStreakText');
  const bestEl = document.getElementById('memoryBestText');
  if (flipsEl) flipsEl.innerText = `👀 Lượt lật: ${memoryFlips}`;
  if (pairsEl) pairsEl.innerText = `⭐ Đã ghép: ${memoryMatchedCount} / ${memoryTargetPairs} cặp`;
  if (streakEl) streakEl.innerText = `🔥 Chuỗi x${memoryStreak}`;
  if (bestEl) {
    let bestNum = null;
    try {
      const parsedBest = parseInt(localStorage.getItem(getMemoryBestKey(memoryTargetPairs)) || '', 10);
      if (Number.isFinite(parsedBest) && parsedBest > 0) bestNum = parsedBest;
    } catch (e) {}
    bestEl.innerText = bestNum ? `🏆 Kỷ lục: ${bestNum} lượt` : '🏆 Kỷ lục: --';
  }
}

function handleMemoryCardClick(cardData, cardEl) {
  if (memoryIsLocked) return;
  if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) return;

  const myMemEp = memoryEpoch;
  const myNav = window.appNavEpoch;
  window.soundMgr.playClick();
  cardEl.classList.add('is-flipped');
  memoryFlippedCards.push({ data: cardData, el: cardEl });

  if (memoryFlippedCards.length === 2) {
    memoryFlips++;
    updateMemoryStats();
    memoryIsLocked = true;

    const [first, second] = memoryFlippedCards;
    if (first.data.id === second.data.id) {
      setTimeout(() => {
        if (memoryEpoch !== myMemEp || window.appNavEpoch !== myNav) return;
        first.el.classList.add('is-matched');
        second.el.classList.add('is-matched');
        memoryMatchedCount++;
        memoryStreak++;
        const pairCoins = memoryStreak >= 2 ? 3 : 2;
        awardCoins(pairCoins, true);
        window.recordAnswer?.(first.data.id, true, { label: first.data.name, mode: 'game', audioKey: first.data.audioKey, noAutoCoin: true });
        updateMemoryStats();

        window.soundMgr.playCorrect();
        showToast(`🎉 Trúng cặp ${first.data.name}! +${pairCoins} 🪙 Xu!`);
        if (first.data.audioKey) {
          window.soundMgr.playAudioFile(first.data.audioKey);
        }

        memoryFlippedCards = [];
        memoryIsLocked = false;

        if (memoryMatchedCount === memoryTargetPairs) {
          try {
            const k = getMemoryBestKey(memoryTargetPairs);
            const parsedPrev = parseInt(localStorage.getItem(k) || '', 10);
            const prev = Number.isFinite(parsedPrev) && parsedPrev > 0 ? parsedPrev : 999;
            if (memoryFlips < prev) localStorage.setItem(k, String(memoryFlips));
          } catch (e) {}
          updateMemoryStats();
          setTimeout(() => {
            if (memoryEpoch !== myMemEp || window.appNavEpoch !== myNav || currentMode !== 'game' || currentSubGame !== 'dino_memory') return;
            fireConfetti();
            window.soundMgr.playVictory();
            window.soundMgr.playAudioFile('cheer_flip_win');
            window.markDailyStep?.('play');
            awardCoins(10, true);
            awardStars(15, 'Chiến thắng Lật Thẻ Khủng Long (+10 🪙 Xu)!');
            document.getElementById('memoryPlayStage').style.display = 'none';
            document.getElementById('memoryVictoryStage').style.display = 'block';
            document.getElementById('memoryVictoryFlips').innerText =
              `Bảo Long đã mở khóa ${memoryTargetPairs} cặp khủng long trong ${memoryFlips} lượt lật (+15 ⭐ & +10 🪙 Xu)!`;
          }, 550);
        }
      }, 240);
    } else {
      memoryStreak = 0;
      updateMemoryStats();
      setTimeout(() => {
        if (memoryEpoch !== myMemEp || window.appNavEpoch !== myNav) return;
        first.el.classList.remove('is-flipped');
        second.el.classList.remove('is-flipped');
        memoryFlippedCards = [];
        memoryIsLocked = false;
      }, 650);
    }
  }
}

// ========================================================
// GAME 5: ĐỐ VUI KHỦNG LONG (KÈM KIẾN THỨC THỰC TẾ + XU + SRS)
// ========================================================
function initDinoQuiz() {
  dinoQuizQuestions = [...DINO_QUIZ_DATA].sort(() => Math.random() - 0.5);
  dinoQuizCurrentIndex = 0;
  dinoQuizScore = 0;

  document.getElementById('dinoQuizPlayStage').style.display = 'block';
  document.getElementById('dinoQuizVictoryStage').style.display = 'none';
  document.getElementById('dinoQuizScoreText').innerText = `⭐ 0 sao`;
  loadDinoQuizQuestion();
}

function loadDinoQuizQuestion() {
  dinoQuizEpoch++;
  const myNav = window.appNavEpoch;
  const myEpoch = dinoQuizEpoch;
  const total = dinoQuizQuestions.length;
  if (dinoQuizCurrentIndex >= total) {
    showDinoQuizVictory();
    return;
  }

  const q = dinoQuizQuestions[dinoQuizCurrentIndex];
  const riddleKey = q.id || q.audioKey;
  document.getElementById('dinoQuizProgressText').innerText = `Câu ${dinoQuizCurrentIndex + 1} / ${total}`;
  document.getElementById('dinoQuizQuestionTitle').innerText = q.question;
  document.getElementById('dinoQuizQuestionHint').innerText = '🔍 Nghe kỹ mô tả rồi chạm đúng chú Khủng Long nhé!';
  const factEl = document.getElementById('dinoQuizFactBox');
  if (factEl) { factEl.style.display = 'none'; factEl.innerText = ''; }

  const container = document.getElementById('dinoQuizOptionsGrid');
  container.innerHTML = '';
  const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
  let dinoQuizLocked = false;
  const qBoxEl = document.querySelector('#dinoQuizPlayStage .quiz-question-box');
  const dinoTourSteps = [{ key: riddleKey, fallbackText: q.question, el: qBoxEl, pauseAfterMs: 200 }];

  shuffledOpts.forEach(optId => {
    const item = DINO_LESSONS.find(d => d.id === optId);
    if (!item) return;

    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe tên khủng long">🔊</button>
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
    dinoTourSteps.push({ key: item.audioKey, fallbackText: item.dinoName, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (dinoQuizLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (optId === q.correctId) dinoQuizLocked = true;
      checkDinoQuizAnswer(optId, card, q, item, myNav, myEpoch);
    });
    container.appendChild(card);
  });

  const playDinoTour = () => window.soundMgr.playChoiceTour(dinoTourSteps);
  document.getElementById('btnHearDinoQuizHint').onclick = () => {
    window.soundMgr.playClick();
    playDinoTour();
  };
  setTimeout(() => {
    if (window.appNavEpoch === myNav && dinoQuizEpoch === myEpoch) {
      playDinoTour();
    }
  }, 60);
}

function checkDinoQuizAnswer(chosenId, cardEl, q, item, myNav, myEpoch) {
  if (cardEl.classList.contains('correct') || cardEl.classList.contains('wrong')) return;
  const factEl = document.getElementById('dinoQuizFactBox');

  if (chosenId === q.correctId) {
    cardEl.classList.add('correct');
    window.soundMgr.playCorrect();
    fireConfetti();
    dinoQuizScore += 10;
    awardCoins(2, true);
    window.recordAnswer?.(item.id, true, { label: item.word, mode: 'game', audioKey: item.audioKey, noAutoCoin: true });
    document.getElementById('dinoQuizScoreText').innerText = `⭐ ${dinoQuizScore} sao`;
    if (factEl) {
      factEl.style.display = 'block';
      factEl.innerHTML = `💡 <strong>Sự thật kỷ Jura:</strong> ${item.funFact} <em>(+2 🪙 Xu!)</em>`;
    }
    showToast(`🎉 Chuẩn xác ${item.dinoName}! +2 🪙 Xu!`);

    window.soundMgr.playPraiseThen(false,
      () => window.appNavEpoch === myNav && dinoQuizEpoch === myEpoch,
      () => {
        dinoQuizCurrentIndex++;
        loadDinoQuizQuestion();
      }
    );
  } else {
    cardEl.classList.add('wrong');
    window.recordAnswer?.(q.correctId, false, { label: q.hint || item.word, mode: 'game', audioKey: q.audioKey, noAutoCoin: true });
    window.soundMgr.playWrong();
    window.soundMgr.speakTryAgain();
    if (factEl) {
      factEl.style.display = 'block';
      factEl.innerHTML = `🔍 Đây là <strong>${item.dinoName}</strong> — ${item.funFact}`;
    }
    showToast(`Đây là ${item.dinoName} rồi, thử chọn chú khác nhé! ❤️`);
  }
}

function showDinoQuizVictory() {
  fireConfetti();
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  window.markDailyStep?.('play');
  awardCoins(10, true);
  awardStars(15, 'Chuyên gia Đố Vui Khủng Long (+10 🪙 Xu)!');

  document.getElementById('dinoQuizPlayStage').style.display = 'none';
  document.getElementById('dinoQuizVictoryStage').style.display = 'block';
  document.getElementById('dinoQuizVictoryScore').innerText =
    `Bé đã hoàn thành cả 10 câu hỏi kỷ Jura đạt ${dinoQuizScore} điểm (+15 ⭐ & +10 🪙 Xu)!`;
}

// ========================================================
// GAME 6: KHAI QUẬT HÓA THẠCH THỰC TẾ (BÚA ĐÁ + CỌ QUÉT + VẾT NỨT SVG)
// ========================================================
const DIG_CRACK_PATHS = [
  'M 130 20 L 122 88 L 145 130 L 118 190 L 138 240',
  'M 30 95 L 92 115 L 145 130 L 210 105 L 240 120',
  'M 55 215 L 105 162 L 145 130 L 195 178 L 235 220',
  'M 75 45 L 115 95 L 145 130 L 178 72 L 210 40'
];

function setDinoDigTool(tool) {
  dinoDigTool = tool === 'brush' ? 'brush' : 'hammer';
  document.getElementById('btnDigHammer')?.classList.toggle('active-filter', dinoDigTool === 'hammer');
  document.getElementById('btnDigBrush')?.classList.toggle('active-filter', dinoDigTool === 'brush');
  const iconEl = document.getElementById('digToolAnimIcon');
  if (iconEl) iconEl.innerText = dinoDigTool === 'brush' ? '🖌️' : '⛏️';
}

function spawnDigParticles(x, y, isBrush) {
  const layer = document.getElementById('dinoDigSparksLayer');
  if (!layer) return;
  const colors = isBrush ? ['#fde68a', '#fcd34d', '#f59e0b'] : ['#78350f', '#b45309', '#d6d3d1', '#f59e0b'];
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('span');
    dot.className = 'dig-chip-particle';
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
    const dist = 24 + Math.random() * 34;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.background = colors[i % colors.length];
    dot.style.setProperty('--dx', `${Math.round(Math.cos(angle) * dist)}px`);
    dot.style.setProperty('--dy', `${Math.round(Math.sin(angle) * dist - 14)}px`);
    layer.appendChild(dot);
    setTimeout(() => dot.remove(), 520);
  }
}

function initDinoDig() {
  dinoDigEpoch++;
  dinoDigCurrentIndex = 0;
  dinoDigBadges = 0;

  document.getElementById('dinoDigPlayStage').style.display = 'block';
  document.getElementById('dinoDigVictoryStage').style.display = 'none';
  document.getElementById('dinoDigStarsText').innerText = `🏆 0 huy hiệu`;
  loadDinoDigStage();
}

function loadDinoDigStage() {
  dinoDigEpoch++;
  const total = DINO_DIG_DATA.length;
  if (dinoDigCurrentIndex >= total) {
    showDinoDigVictory();
    return;
  }

  const stage = DINO_DIG_DATA[dinoDigCurrentIndex];
  dinoDigHits = 0;
  setDinoDigTool('hammer');

  if (document.getElementById('btnDigHammer')) {
    document.getElementById('btnDigHammer').onclick = () => { window.soundMgr.playClick(); setDinoDigTool('hammer'); };
  }
  if (document.getElementById('btnDigBrush')) {
    document.getElementById('btnDigBrush').onclick = () => { window.soundMgr.playClick(); setDinoDigTool('brush'); };
  }

  document.getElementById('dinoDigProgressText').innerText = `Hóa thạch ${dinoDigCurrentIndex + 1} / ${total}`;
  document.getElementById('dinoDigTargetTitle').innerText = `Khai quật: ${stage.name}`;
  document.getElementById('dinoDigProgressBar').style.width = '0%';
  document.getElementById('dinoDigProgressLabel').innerText = 'Tiến độ đào: 0%';
  document.getElementById('digPromptText').innerText = `Dùng ⛏️ Búa đập đá (0/${stage.hitsRequired})`;

  document.getElementById('dinoDigFossilUnderlay').innerHTML = stage.fossilSilhouette;
  const crackSvg = document.getElementById('dinoDigCrackSvg');
  if (crackSvg) crackSvg.innerHTML = '';

  const overlay = document.getElementById('dinoDigRockOverlay');
  overlay.style.opacity = '1';
  overlay.style.display = 'flex';
  overlay.classList.remove('dust-phase');
  document.getElementById('dinoDigRevivedDino').style.display = 'none';

  document.getElementById('dinoDigRockArea').onclick = (e) => hitExcavationRock(stage, e);

  document.getElementById('btnNextFossil').onclick = (e) => {
    e.stopPropagation();
    window.soundMgr.playClick();
    dinoDigCurrentIndex++;
    loadDinoDigStage();
  };
}

function hitExcavationRock(stage, ev) {
  if (dinoDigHits >= stage.hitsRequired) return;

  const isDustStep = dinoDigHits === stage.hitsRequired - 1;
  if (!isDustStep && dinoDigTool === 'brush') {
    window.soundMgr.playPop();
    showToast('🪨 Lớp đá còn cứng! Hãy dùng ⛏️ Búa đập nứt đá trước nhé!');
    return;
  }

  dinoDigHits++;
  if (isDustStep && dinoDigTool === 'hammer') {
    // Tự chuyển nhẹ sang Cọ nếu bé quên đổi nút nhưng vừa chạm bước phủi cát
    setDinoDigTool('brush');
  }

  if (isDustStep) {
    window.soundMgr.playPop();
  } else {
    window.soundMgr.playHammerHit();
  }

  const rockArea = document.getElementById('dinoDigRockArea');
  if (ev && rockArea) {
    const rect = rockArea.getBoundingClientRect();
    spawnDigParticles(ev.clientX - rect.left, ev.clientY - rect.top, isDustStep);
  }
  rockArea.classList.remove('wobble');
  void rockArea.offsetWidth;
  rockArea.classList.add('wobble');

  const crackSvg = document.getElementById('dinoDigCrackSvg');
  if (crackSvg && dinoDigHits <= DIG_CRACK_PATHS.length) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', DIG_CRACK_PATHS[dinoDigHits - 1]);
    path.setAttribute('stroke', '#451a03');
    path.setAttribute('stroke-width', String(3 + dinoDigHits));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    crackSvg.appendChild(path);
  }

  const pct = Math.min(100, Math.round((dinoDigHits / stage.hitsRequired) * 100));
  document.getElementById('dinoDigProgressBar').style.width = `${pct}%`;
  document.getElementById('dinoDigProgressLabel').innerText = `Tiến độ đào: ${pct}%`;

  const overlay = document.getElementById('dinoDigRockOverlay');
  if (dinoDigHits === stage.hitsRequired - 1) {
    overlay.classList.add('dust-phase');
    setDinoDigTool('brush');
    document.getElementById('digPromptText').innerText = 'Đá đã vỡ! Chạm bằng 🖌️ Cọ để phủi sạch cát!';
  } else {
    document.getElementById('digPromptText').innerText = `Đập nứt đá! (${dinoDigHits}/${stage.hitsRequired})`;
  }
  overlay.style.opacity = `${Math.max(0.28, (stage.hitsRequired - dinoDigHits) / stage.hitsRequired)}`;

  if (dinoDigHits >= stage.hitsRequired) {
    const myNav = window.appNavEpoch;
    const myDigEp = dinoDigEpoch;
    setTimeout(() => {
      if (window.appNavEpoch !== myNav || dinoDigEpoch !== myDigEp || currentMode !== 'game' || currentSubGame !== 'dino_dig') return;
      overlay.style.display = 'none';
      const dinoInfo = typeof DINO_LESSONS !== 'undefined'
        ? DINO_LESSONS.find(d => d.audioKey === stage.audioKey)
        : null;
      document.getElementById('dinoDigRevivedIcon').innerHTML = stage.revivedIcon;
      document.getElementById('dinoDigRevivedTitle').innerText = stage.name;
      document.getElementById('dinoDigRevivedJa').innerText = `🇯🇵 ${stage.ja}`;
      const factEl = document.getElementById('dinoDigRevivedFact');
      if (factEl) {
        factEl.innerText = dinoInfo ? `🦴 ${dinoInfo.funFact}` : stage.celebrationText;
      }
      document.getElementById('dinoDigRevivedDino').style.display = 'flex';

      awardCoins(5, true);
      window.recordAnswer?.(`dig_${stage.audioKey}`, true, { label: stage.name, mode: 'game', audioKey: stage.audioKey, noAutoCoin: true });
      window.soundMgr.playMagicalRevive();
      fireConfetti();
      setTimeout(() => {
        if (window.appNavEpoch !== myNav || dinoDigEpoch !== myDigEp) return;
        if (stage.audioKey) window.soundMgr.playAudioFile(stage.audioKey, null, stage.name);
      }, 450);

      dinoDigBadges++;
      document.getElementById('dinoDigStarsText').innerText = `🏆 ${dinoDigBadges} huy hiệu`;
      showToast(`🎉 Khai quật thành công ${stage.name}! +5 🪙 Xu!`);
    }, 220);
  }
}

function showDinoDigVictory() {
  fireConfetti();
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  window.markDailyStep?.('play');
  awardCoins(15, true);
  awardStars(20, 'Nhà Khảo Cổ Vĩ Đại Bảo Long (+15 🪙 Xu)!');

  document.getElementById('dinoDigPlayStage').style.display = 'none';
  document.getElementById('dinoDigVictoryStage').style.display = 'block';
  const descEl = document.getElementById('dinoDigVictoryDesc');
  if (descEl) {
    descEl.innerText = 'Bé đã hoàn thành ca khảo cổ (+20 ⭐ & +15 🪙 Xu vào Xưởng Đua)!';
  }
}

// ========================================================
// GAME 7: ĐỐ VUI XE CỘ (KÈM SỰ THẬT THÚ VỊ + XU + SRS)
// ========================================================
function initVehicleQuiz() {
  const pool = [...VEHICLE_QUIZ_DATA].sort(() => Math.random() - 0.5).slice(0, 8);
  quizQuestions = pool.map(item => ({
    target: VEHICLE_LESSONS.find(v => v.id === item.targetId),
    question: item.question,
    ja: item.ja,
    distractors: item.distractors.map(did => VEHICLE_LESSONS.find(v => v.id === did)).filter(Boolean)
  }));

  quizCurrentIndex = 0;
  quizScore = 0;

  document.getElementById('quizPlayStage').style.display = 'block';
  document.getElementById('quizVictoryStage').style.display = 'none';
  loadQuizQuestion();
}

function loadQuizQuestion() {
  vehQuizEpoch++;
  const myNav = window.appNavEpoch;
  const myEpoch = vehQuizEpoch;
  if (quizCurrentIndex >= quizQuestions.length) {
    showQuizVictory();
    return;
  }

  const q = quizQuestions[quizCurrentIndex];
  const riddleKey = q.target ? `vquiz_${q.target.id}` : '';
  document.getElementById('quizProgressText').innerText = `Câu ${quizCurrentIndex + 1} / ${quizQuestions.length}`;
  document.getElementById('quizScoreText').innerText = `⭐ ${quizScore} sao`;
  document.getElementById('quizQuestionTitle').innerText = q.question;
  document.getElementById('quizQuestionJa').innerText = q.ja;
  const factEl = document.getElementById('quizFactBox');
  if (factEl) { factEl.style.display = 'none'; factEl.innerText = ''; }

  const optionsGrid = document.getElementById('quizOptionsGrid');
  optionsGrid.innerHTML = '';
  let vehLocked = false;
  const qBoxEl = document.querySelector('#quizPlayStage .quiz-question-box');
  const vehTourSteps = [{ key: riddleKey, fallbackText: q.question, el: qBoxEl, pauseAfterMs: 200 }];

  const allChoices = [q.target, ...q.distractors].sort(() => Math.random() - 0.5);
  allChoices.forEach(item => {
    if (!item) return;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe tên xe">🔊</button>
      <div class="quiz-opt-icon">${item.icon}</div>
      <div class="quiz-opt-name">${item.word}</div>
      <div class="quiz-opt-ja">${item.ja}</div>
    `;
    const spkBtn = card.querySelector('.quiz-opt-speak-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.speakWordObj(item);
      });
    }
    vehTourSteps.push({ key: item.audioKey, fallbackText: item.word, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (vehLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (item.id === q.target.id) vehLocked = true;
      handleQuizChoice(item, q.target, card, myNav, myEpoch);
    });
    optionsGrid.appendChild(card);
  });

  const playVehTour = () => window.soundMgr.playChoiceTour(vehTourSteps);
  document.getElementById('btnHearQuizQuestion').onclick = () => {
    window.soundMgr.playClick();
    playVehTour();
  };
  setTimeout(() => {
    if (window.appNavEpoch === myNav && vehQuizEpoch === myEpoch) {
      playVehTour();
    }
  }, 60);
}

function handleQuizChoice(chosen, target, cardEl, myNav, myEpoch) {
  if (cardEl.classList.contains('correct') || cardEl.classList.contains('wrong')) return;
  const factEl = document.getElementById('quizFactBox');

  if (chosen.id === target.id) {
    cardEl.classList.add('correct');
    window.soundMgr.playCorrect();
    fireConfetti();
    quizScore += 10;
    awardCoins(2, true);
    window.recordAnswer?.(target.id, true, { label: target.word, mode: 'game', audioKey: target.audioKey, noAutoCoin: true });
    document.getElementById('quizScoreText').innerText = `⭐ ${quizScore} sao`;
    if (factEl) {
      factEl.style.display = 'block';
      factEl.innerHTML = `🚗 <strong>Khám phá xe:</strong> ${target.funFact} <em>(+2 🪙 Xu!)</em>`;
    }
    showToast(`🎉 Chuẩn xác ${target.word}! +2 🪙 Xu!`);

    window.soundMgr.playPraiseThen(false,
      () => window.appNavEpoch === myNav && vehQuizEpoch === myEpoch,
      () => {
        quizCurrentIndex++;
        loadQuizQuestion();
      }
    );
  } else {
    cardEl.classList.add('wrong');
    window.recordAnswer?.(target.id, false, { label: target.word, mode: 'game', audioKey: target.audioKey, noAutoCoin: true });
    window.soundMgr.playWrong();
    window.soundMgr.speakTryAgain();
    if (factEl) {
      factEl.style.display = 'block';
      factEl.innerHTML = `🔍 Đây là <strong>${chosen.word}</strong> — ${chosen.funFact}`;
    }
    showToast(`Chiếc này là ${chosen.word}, thử tìm chiếc khác nhé! ❤️`);
  }
}

function showQuizVictory() {
  fireConfetti();
  window.soundMgr.playVictory();
  window.soundMgr.speakCheer('win');
  window.markDailyStep?.('play');
  awardCoins(10, true);
  awardStars(15, 'Bác tài xuất sắc Đố Vui Xe Cộ (+10 🪙 Xu)!');

  document.getElementById('quizPlayStage').style.display = 'none';
  document.getElementById('quizVictoryStage').style.display = 'block';
  document.getElementById('quizVictoryScore').innerText =
    `Bé đã hoàn thành 8 câu hỏi Xe Cộ với ${quizScore} điểm (+15 ⭐ & +10 🪙 Xu)!`;
}

// ========================================================
// TOAST & CONFETTI
// ========================================================
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

let confettiPieces = [];
let confettiRafId = null;

function fireConfetti() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const confCanvas = document.getElementById('confettiCanvas');
  if (!confCanvas) return;
  const confCtx = confCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const targetW = Math.round(window.innerWidth * dpr);
  const targetH = Math.round(window.innerHeight * dpr);
  if (confCanvas.width !== targetW || confCanvas.height !== targetH) {
    confCanvas.style.width = `${window.innerWidth}px`;
    confCanvas.style.height = `${window.innerHeight}px`;
    confCanvas.width = targetW;
    confCanvas.height = targetH;
  }
  confCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  for (let i = 0; i < 55; i++) {
    confettiPieces.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 2,
      w: Math.random() * 11 + 5,
      h: Math.random() * 7 + 4,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }
  if (confettiPieces.length > 110) {
    confettiPieces = confettiPieces.slice(-110);
  }

  if (confettiRafId !== null) return;

  function updateConfetti() {
    confCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.42;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;
      if (p.opacity <= 0) {
        confettiPieces.splice(i, 1);
        continue;
      }
      confCtx.save();
      confCtx.translate(p.x, p.y);
      confCtx.rotate((p.rotation * Math.PI) / 180);
      confCtx.fillStyle = p.color;
      confCtx.globalAlpha = Math.max(0, p.opacity);
      confCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confCtx.restore();
    }
    if (confettiPieces.length > 0) {
      confettiRafId = requestAnimationFrame(updateConfetti);
    } else {
      confCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confettiRafId = null;
    }
  }
  confettiRafId = requestAnimationFrame(updateConfetti);
}

// ========================================================
// SIDEBAR MENU BÊN TRÁI (DESKTOP THU/MỞ + MOBILE DRAWER)
// ========================================================
const SIDEBAR_PREF_KEY = 'baolong_sidebar_collapsed_v1';

function closeMobileSidebar() {
  document.getElementById('sideNav')?.classList.remove('mobile-open');
  document.getElementById('sideNavBackdrop')?.classList.remove('active');
}

function updateSidebarToggleUI() {
  const collapsed = document.body.classList.contains('sidebar-collapsed');
  const colBtn = document.getElementById('btnCollapseSidebar');
  if (colBtn) {
    if (window.innerWidth < 1040) {
      colBtn.innerText = '✕';
      colBtn.title = 'Đóng menu';
    } else {
      colBtn.innerText = collapsed ? '▶' : '◀';
      colBtn.title = collapsed ? 'Mở rộng hiển thị đầy đủ tên môn học' : 'Thu gọn chỉ giữ biểu tượng';
    }
  }
}

function initSidebarPrefs() {
  try {
    if (localStorage.getItem(SIDEBAR_PREF_KEY) === '1' && window.innerWidth >= 1040) {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}
  updateSidebarToggleUI();
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1040) closeMobileSidebar();
    updateSidebarToggleUI();
  });
}

function handleSidebarToggle() {
  window.soundMgr.playClick();
  const sideNav = document.getElementById('sideNav');
  const backdrop = document.getElementById('sideNavBackdrop');
  if (!sideNav) return;

  if (window.innerWidth < 1040) {
    const willOpen = !sideNav.classList.contains('mobile-open');
    sideNav.classList.toggle('mobile-open', willOpen);
    if (backdrop) backdrop.classList.toggle('active', willOpen);
    updateSidebarToggleUI();
  } else {
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    try {
      localStorage.setItem(SIDEBAR_PREF_KEY, collapsed ? '1' : '0');
    } catch (e) {}
    updateSidebarToggleUI();
  }
}

// ========================================================
// GÓC PHỤ HUYNH (EXPORT / IMPORT / RESET AN TOÀN)
// ========================================================
let parentCornerInited = false;
let parentGateAnswer = 56;
let parentCornerUnlocked = false;

function refreshParentGateChallenge() {
  const a = 4 + Math.floor(Math.random() * 6);
  const b = 3 + Math.floor(Math.random() * 7);
  parentGateAnswer = a * b;
  const qEl = document.getElementById('parentGateQuestion');
  const inp = document.getElementById('parentGateInput');
  if (qEl) qEl.innerText = `${a} × ${b} = ?`;
  if (inp) inp.value = '';
}

function renderParentStatsSummary() {
  const el = document.getElementById('parentStatsSummary');
  if (!el) return;
  const rank = getCurrentRank(explorerState.stars);
  el.innerText = `⭐ ${explorerState.stars} sao • 📚 ${explorerState.learnedIds.length} mục đã khám phá • 🎮 ${explorerState.completedGames || 0} ván hoàn thành • ${rank.badge} ${rank.title}`;
  if (typeof renderParentPlusSection === 'function') renderParentPlusSection();
}

function resetParentCornerUI() {
  parentCornerUnlocked = false;
  const panel = document.getElementById('parentCornerPanel');
  const gate = document.getElementById('parentGateBox');
  const actions = document.getElementById('parentActionsBox');
  const confirmRow = document.getElementById('parentResetConfirmRow');
  if (panel) panel.style.display = 'none';
  if (gate) gate.style.display = 'block';
  if (actions) actions.style.display = 'none';
  if (confirmRow) confirmRow.style.display = 'none';
  refreshParentGateChallenge();
}

function initParentCornerOnce() {
  if (parentCornerInited) return;
  parentCornerInited = true;

  const btnToggle = document.getElementById('btnToggleParentCorner');
  const panel = document.getElementById('parentCornerPanel');
  const btnUnlock = document.getElementById('btnParentUnlock');
  const gateInp = document.getElementById('parentGateInput');
  const btnExport = document.getElementById('btnParentExport');
  const btnImport = document.getElementById('btnParentImport');
  const fileInp = document.getElementById('parentImportFile');
  const btnReset = document.getElementById('btnParentReset');
  const confirmRow = document.getElementById('parentResetConfirmRow');
  const btnResetOk = document.getElementById('btnParentResetConfirm');
  const btnResetCancel = document.getElementById('btnParentResetCancel');

  if (btnToggle && panel) {
    btnToggle.onclick = () => {
      window.soundMgr.playClick();
      const willOpen = panel.style.display === 'none';
      panel.style.display = willOpen ? 'block' : 'none';
      if (willOpen && !parentCornerUnlocked) {
        refreshParentGateChallenge();
        setTimeout(() => gateInp?.focus(), 50);
      }
    };
  }

  const tryUnlock = () => {
    const val = Number((gateInp?.value || '').trim());
    if (val === parentGateAnswer) {
      parentCornerUnlocked = true;
      window.soundMgr.playPop();
      document.getElementById('parentGateBox').style.display = 'none';
      document.getElementById('parentActionsBox').style.display = 'block';
      renderParentStatsSummary();
    } else {
      window.soundMgr.playWrong();
      showToast('🔒 Đáp án chưa đúng, phụ huynh thử lại nhé!');
      refreshParentGateChallenge();
    }
  };
  if (btnUnlock) btnUnlock.onclick = tryUnlock;
  if (gateInp) {
    gateInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  if (btnExport) {
    btnExport.onclick = () => {
      const payload = {
        exportedAt: new Date().toISOString(),
        progress: explorerState,
        audioPrefs: {
          gender: window.soundMgr.gender,
          speedRate: window.soundMgr.speedRate,
          isMuted: window.soundMgr.isMuted
        }
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `baolong-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('💾 Đã tải xuống file sao lưu tiến độ!');
    };
  }

  if (btnImport && fileInp) {
    btnImport.onclick = () => fileInp.click();
    fileInp.onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(String(reader.result || ''));
          if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Dữ liệu gốc không phải Object hợp lệ');
          }
          const candidate = (data.progress && typeof data.progress === 'object' && !Array.isArray(data.progress))
            ? data.progress
            : data;
          const hasExpectedKey = 'stars' in candidate || 'learnedIds' in candidate || 'wordStats' in candidate || 'dailyLog' in candidate || 'schemaVersion' in candidate;
          if (!hasExpectedKey) {
            throw new Error('File không chứa trường tiến độ của Bảo Long');
          }
          explorerState = migrateProgressData(candidate);
          saveProgress();
          if (data.audioPrefs && typeof data.audioPrefs === 'object') {
            if (data.audioPrefs.gender === 'male' || data.audioPrefs.gender === 'female') {
              window.soundMgr.setGender(data.audioPrefs.gender);
            }
            if (data.audioPrefs.speedRate === 0.8 || data.audioPrefs.speedRate === 1.0) {
              window.soundMgr.setSpeed(data.audioPrefs.speedRate === 0.8 ? 'slow' : 'normal');
            }
            if (typeof data.audioPrefs.isMuted === 'boolean') {
              window.soundMgr.setMuted(data.audioPrefs.isMuted);
            }
            syncTopControlsUI();
          }
          updateProfileHUD();
          window.applyParentFocusMode?.();
          window.renderDailyRoadmapHost?.();
          renderCurrentView();
          openStickerModal();
          showToast('📂 Đã khôi phục tiến độ thành công!');
        } catch (err) {
          showToast('❌ File JSON không hợp lệ, chưa thể khôi phục.');
        } finally {
          fileInp.value = '';
        }
      };
      reader.readAsText(file);
    };
  }

  if (btnReset && confirmRow) {
    btnReset.onclick = () => {
      confirmRow.style.display = confirmRow.style.display === 'none' ? 'flex' : 'none';
    };
  }
  if (btnResetCancel && confirmRow) {
    btnResetCancel.onclick = () => { confirmRow.style.display = 'none'; };
  }
  if (btnResetOk) {
    btnResetOk.onclick = async () => {
      explorerState = migrateProgressData({});
      gameSessionCoinsEarned = 0;
      try {
        ['baolong_mem_best_4', 'baolong_mem_best_6', 'baolong_mem_best_8',
         'baolong_dragon_mem_best', 'baolong_science_asagao_v1', 'baolong_audio_prefs_v1',
         `${PROGRESS_KEY}_corrupt_backup`].forEach(k => localStorage.removeItem(k));
      } catch (e) {}
      await window.customVoiceStore?.clearAll?.();
      await window.customVideoStore?.clearAll?.();
      window.dinoDragonGames?.clearHatchedStorage?.();
      try { localStorage.removeItem('baolong_buddy_collapsed'); } catch (e) {}
      window.dinoBuddy?.syncVisibility?.();
      window.resetLearningPlusSessionFlags?.();
      window.soundMgr.gender = 'female';
      window.soundMgr.speedRate = 1.0;
      window.soundMgr.isMuted = false;
      window.soundMgr.allowSystemTTS = false;
      window.soundMgr.savePrefs();
      syncTopControlsUI();
      saveProgress();
      updateProfileHUD();
      updateGameCoinsHUD();
      window.applyParentFocusMode?.();
      window.renderDailyRoadmapHost?.();
      renderCurrentView();
      openStickerModal();
      showToast('🗑️ Đã đặt lại toàn bộ dữ liệu và bản thu về ban đầu!');
    };
  }
}
