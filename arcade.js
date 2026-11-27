// ========================================================
// KHU ĐUA TỐC ĐỘ 3 CHẶNG + CỔNG CHỮ ÔN BÀI + HÌNH ẢNH THẬT
// (Siêu Xe • Khủng Long Chạy • Rồng Bay)
// Điều khiển 4 nút: ⬆️⬇️⬅️➡️ (hoặc Phím mũi tên / WASD)
// ========================================================

const ARCADE_MODES = {
  car: {
    id: 'car',
    title: '🏎️ Đua Siêu Xe 3 Chặng',
    introKey: 'arcade_intro_car',
    desc: 'Giải đua 3 chặng (Ngày → Hoàng Hôn → Đêm Neon)! Lái xe đúng Cổng Chữ để tăng tốc Nitro và kiếm Xu!',
    finishDist: 14400,
    stages: [
      { name: 'Chặng 1: Ngày Nắng', icon: '☀️' },
      { name: 'Chặng 2: Hoàng Hôn', icon: '🌅' },
      { name: 'Chặng 3: Đêm Neon', icon: '🌙' }
    ],
    heroes: [
      { id: 'lambo', name: 'Lamborghini Vàng', brand: 'Lambo V12', color: '#facc15', accent: '#1e293b', stripe: '#0f172a', baseSpd: 3.72 },
      { id: 'ferrari', name: 'Ferrari Đỏ F1', brand: 'Ferrari SF', color: '#ef4444', accent: '#ffffff', stripe: '#fde047', baseSpd: 3.75 },
      { id: 'porsche', name: 'Porsche Xanh 911', brand: 'Porsche Turbo', color: '#0ea5e9', accent: '#f8fafc', stripe: '#facc15', baseSpd: 3.70 },
      { id: 'mclaren', name: 'McLaren Cam', brand: 'McLaren GT', color: '#f97316', accent: '#0f172a', stripe: '#ffffff', baseSpd: 3.68 }
    ]
  },
  dino: {
    id: 'dino',
    title: '🦖 Khủng Long Chạy 3 Chặng',
    introKey: 'arcade_intro_dino',
    desc: 'Dùng ảnh Khủng Long thật phi qua Rừng Xanh → Hẻm Núi → Núi Lửa! Chui đúng Cổng Chữ để ăn đùi gà tăng tốc!',
    finishDist: 13800,
    stages: [
      { name: 'Chặng 1: Rừng Xanh', icon: '🌿' },
      { name: 'Chặng 2: Hẻm Núi', icon: '🏜️' },
      { name: 'Chặng 3: Núi Lửa', icon: '🌋' }
    ],
    heroes: [
      { id: 'trex', name: 'T-Rex Vua Đỏ', icon: '🦖', imgSrc: 'images/dinos/dino_bao_chua.jpg', color: '#ef4444', belly: '#fca5a5', crest: '#b91c1c', baseSpd: 3.62 },
      { id: 'triceratops', name: 'Ba Sừng Xanh Lá', icon: '🦕', imgSrc: 'images/dinos/dino_ba_sung.jpg', color: '#10b981', belly: '#a7f3d0', crest: '#047857', baseSpd: 3.58 },
      { id: 'raptor', name: 'Raptor Tia Chớp', icon: '🦎', imgSrc: 'images/dinos/dino_chay_nhanh.jpg', color: '#f59e0b', belly: '#fef08a', crest: '#b45309', baseSpd: 3.66 },
      { id: 'stego', name: 'Stego Giáp Tím', icon: '🦴', imgSrc: 'images/dinos/dino_duoi_gai.jpg', color: '#8b5cf6', belly: '#ddd6fe', crest: '#5b21b6', baseSpd: 3.56 }
    ]
  },
  dragon: {
    id: 'dragon',
    title: '🐉 Rồng Bay 3 Chặng',
    introKey: 'arcade_intro_dragon',
    desc: 'Cưỡi Rồng Thần ảnh thật bay qua Biển Mây → Bão Sấm Sét → Cầu Vồng! Bay đúng Cổng Chữ để phóng siêu tốc!',
    finishDist: 14100,
    stages: [
      { name: 'Chặng 1: Biển Mây', icon: '☁️' },
      { name: 'Chặng 2: Bão Sấm', icon: '⛈️' },
      { name: 'Chặng 3: Cầu Vồng', icon: '🌈' }
    ],
    heroes: [
      { id: 'fire', name: 'Rồng Lửa Đỏ', icon: '🔥', imgSrc: 'images/dragons/dragon_fire.jpg', color: '#ef4444', wing: '#f97316', glow: '#fef08a', baseSpd: 3.64 },
      { id: 'gold', name: 'Rồng Vàng Hoàng Kim', icon: '✨', imgSrc: 'images/dragons/dragon_gold.jpg', color: '#eab308', wing: '#fde047', glow: '#ffffff', baseSpd: 3.68 },
      { id: 'ice', name: 'Rồng Băng Tuyết', icon: '❄️', imgSrc: 'images/dragons/dragon_ice.jpg', color: '#38bdf8', wing: '#bae6fd', glow: '#e0f2fe', baseSpd: 3.60 },
      { id: 'emerald', name: 'Rồng Rừng Xanh', icon: '🌿', imgSrc: 'images/dragons/dragon_forest.jpg', color: '#10b981', wing: '#6ee7b7', glow: '#d1fae5', baseSpd: 3.58 }
    ]
  }
};

// Pool 14 Cổng Chữ ôn tập (100% khóa audio có sẵn trong audio/female & male)
const ARCADE_GATE_POOL = [
  { target: 'ph', choices: ['ph', 'th', 'kh'], audioKey: 'alpha_ph' },
  { target: 'gh', choices: ['gh', 'g', 'gi'], audioKey: 'alpha_gh' },
  { target: 'ngh', choices: ['ngh', 'ng', 'nh'], audioKey: 'alpha_ngh' },
  { target: 's', choices: ['s', 'x', 'c'], audioKey: 'alpha_s' },
  { target: 'x', choices: ['x', 's', 't'], audioKey: 'alpha_x' },
  { target: 'tr', choices: ['tr', 'ch', 'th'], audioKey: 'alpha_tr' },
  { target: 'ch', choices: ['ch', 'tr', 'c'], audioKey: 'alpha_ch' },
  { target: 'l', choices: ['l', 'n', 'h'], audioKey: 'alpha_l' },
  { target: 'n', choices: ['n', 'l', 'm'], audioKey: 'alpha_n' },
  { target: 'k', choices: ['k', 'c', 'h'], audioKey: 'alpha_k' },
  { target: 'đ', choices: ['đ', 'd', 'b'], audioKey: 'alpha_đ' },
  { target: 'ă', choices: ['ă', 'â', 'a'], audioKey: 'alpha_ă' },
  { target: 'â', choices: ['â', 'ă', 'ơ'], audioKey: 'alpha_aa' },
  { target: 'ư', choices: ['ư', 'u', 'ơ'], audioKey: 'alpha_ư' }
];

const ARCADE_DECOR_SHOP = [
  { id: 'none', name: 'Mặc định', icon: '✨', cost: 0 },
  { id: 'crown', name: 'Vương miện', icon: '👑', cost: 25 },
  { id: 'flame', name: 'Đuôi lửa', icon: '🔥', cost: 40 },
  { id: 'rainbow', name: 'Cầu vồng', icon: '🌈', cost: 55 }
];

const ARCADE_IMG_CACHE = new Map();

let currentArcadeMode = 'car';
let arcadeSelectedHero = { car: 'lambo', dino: 'trex', dragon: 'fire' };
let arcadeRafId = null;
let arcadeLastTs = 0;
let arcadeEventsBound = false;
let arcadeAutoGas = false;
const arcadeKeys = { up: false, down: false, left: false, right: false };

let arcadeState = {
  phase: 'ready', // 'ready' | 'countdown' | 'running' | 'finishing' | 'finished'
  countdownTimer: 0,
  lastCountdownDigit: 4,
  finishSlowTimer: 0,
  playerDist: 0,
  playerX: 380,
  playerY: 320,
  playerSpeed: 0,
  boostTimer: 0,
  stunTimer: 0,
  shakeTimer: 0,
  starsPicked: 0,
  gatesCorrect: 0,
  gatesTotal: 0,
  currentStage: 1,
  activeGate: null,
  rivals: [],
  items: [],
  gates: [],
  particles: [],
  speedLines: [],
  bgOffset: 0,
  engineTickAcc: 0,
  rank: 1,
  tick: 0
};

function getArcadeGear() {
  if (typeof explorerState !== 'undefined' && explorerState.arcadeGear) {
    return explorerState.arcadeGear;
  }
  return { speedLv: 0, boostLv: 0, decor: 'none', unlockedDecors: ['none'] };
}

function getArcadeHeroImage(imgSrc) {
  if (!imgSrc) return null;
  let entry = ARCADE_IMG_CACHE.get(imgSrc);
  if (!entry) {
    const img = new Image();
    entry = { img, loaded: false };
    img.onload = () => {
      entry.loaded = true;
      if (typeof currentMode !== 'undefined' && currentMode === 'arcade' && arcadeState.phase === 'ready') {
        drawArcadeFrame();
      }
    };
    img.src = imgSrc;
    ARCADE_IMG_CACHE.set(imgSrc, entry);
  }
  return entry.loaded ? entry.img : null;
}

function preloadAllArcadeImages() {
  Object.values(ARCADE_MODES).forEach(m => {
    m.heroes.forEach(h => {
      if (h.imgSrc) getArcadeHeroImage(h.imgSrc);
    });
  });
}

function stopArcadeGameLoop(clearKeys = true) {
  if (arcadeRafId) {
    cancelAnimationFrame(arcadeRafId);
    arcadeRafId = null;
  }
  if (clearKeys) {
    arcadeKeys.up = arcadeKeys.down = arcadeKeys.left = arcadeKeys.right = false;
    document.querySelectorAll('.dpad-btn.active').forEach(b => b.classList.remove('active'));
  }
}

function toggleArcadePause(forcePause = null) {
  if (arcadeState.phase !== 'running' && arcadeState.phase !== 'countdown' && arcadeState.phase !== 'paused') return;
  const pauseBtn = document.getElementById('btnArcadePause');
  if (forcePause === true || arcadeState.phase !== 'paused') {
    if (arcadeState.phase === 'paused') return;
    arcadeState._resumePhase = arcadeState.phase;
    arcadeState.phase = 'paused';
    stopArcadeGameLoop(true);
    if (pauseBtn) pauseBtn.innerHTML = '<span>▶️</span> Tiếp tục';
    drawArcadeFrame();
  } else {
    arcadeState.phase = arcadeState._resumePhase || 'running';
    if (pauseBtn) pauseBtn.innerHTML = '<span>⏸️</span> Tạm dừng';
    arcadeLastTs = performance.now();
    arcadeRafId = requestAnimationFrame(arcadeTick);
  }
}

function renderArcadeHub() {
  preloadAllArcadeImages();
  bindArcadeEventsOnce();
  switchArcadeMode(currentArcadeMode, false);
}

function switchArcadeMode(mode, playIntro = true) {
  stopArcadeGameLoop();
  currentArcadeMode = ARCADE_MODES[mode] ? mode : 'car';

  const tabMap = { car: 'arcadeTabCar', dino: 'arcadeTabDino', dragon: 'arcadeTabDragon' };
  Object.entries(tabMap).forEach(([k, id]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', k === currentArcadeMode);
  });

  const cfg = ARCADE_MODES[currentArcadeMode];
  const tipEl = document.getElementById('arcadeModeInstruction');
  if (tipEl) tipEl.innerText = cfg.desc;

  renderArcadeHeroPicker();
  renderArcadeGarage();
  resetArcadeRace(false);

  if (playIntro && window.soundMgr) {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(cfg.introKey, null, cfg.desc);
  }
}

function renderArcadeHeroPicker() {
  const wrap = document.getElementById('arcadeHeroPicker');
  if (!wrap) return;
  const cfg = ARCADE_MODES[currentArcadeMode];
  const chosenId = arcadeSelectedHero[currentArcadeMode];

  wrap.innerHTML = '';
  cfg.heroes.forEach(hero => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `arcade-hero-chip ${hero.id === chosenId ? 'active' : ''}`;
    btn.style.setProperty('--hero-col', hero.color);
    const thumb = hero.imgSrc
      ? `<img src="${hero.imgSrc}" class="arcade-hero-thumb" alt="${hero.name}">`
      : `<span class="hero-dot" style="background:${hero.color};"></span><span>${currentArcadeMode === 'car' ? '🏎️' : hero.icon}</span>`;
    btn.innerHTML = `${thumb}<span>${hero.name}</span>`;
    btn.type = 'button';
    btn.onclick = () => {
      if (arcadeState.phase === 'running' || arcadeState.phase === 'countdown' || arcadeState.phase === 'paused') {
        window.showToast?.('🏁 Đua hết chặng này rồi đổi nhân vật nhé Bảo Long!');
        return;
      }
      arcadeSelectedHero[currentArcadeMode] = hero.id;
      window.soundMgr?.playPop();
      renderArcadeHeroPicker();
      resetArcadeRace(false);
    };
    wrap.appendChild(btn);
  });
}

function updateArcadeCoinsUI() {
  const coins = (typeof explorerState !== 'undefined' && explorerState.coins) || 0;
  const cEl = document.getElementById('arcadeStatusCoins');
  if (cEl) cEl.innerText = `🪙 Xu: ${coins}`;
}
window.updateArcadeCoinsUI = updateArcadeCoinsUI;

function renderArcadeGarage() {
  const bar = document.getElementById('arcadeGarageBar');
  if (!bar) return;
  const gear = getArcadeGear();
  const coins = (typeof explorerState !== 'undefined' && explorerState.coins) || 0;
  const spdCost = (gear.speedLv + 1) * 20;
  const bstCost = (gear.boostLv + 1) * 20;
  const unlocked = Array.isArray(gear.unlockedDecors) ? gear.unlockedDecors : ['none'];

  bar.innerHTML = `
    <span class="garage-label">🔧 Xưởng Xu (Học bài &amp; qua Cổng Chữ để kiếm Xu!):</span>
    <button type="button" class="tool-chip arcade-garage-btn" id="btnUpgradeSpeed">
      ⚡ Tốc độ Lv${gear.speedLv}/3 ${gear.speedLv >= 3 ? '(MAX)' : `(${spdCost}🪙)`}
    </button>
    <button type="button" class="tool-chip arcade-garage-btn" id="btnUpgradeBoost">
      🚀 Nitro Lv${gear.boostLv}/3 ${gear.boostLv >= 3 ? '(MAX)' : `(${bstCost}🪙)`}
    </button>
    <div class="garage-decor-group">
      ${ARCADE_DECOR_SHOP.filter(d => d.id !== 'none').map(d => {
        const has = unlocked.includes(d.id);
        const equipped = gear.decor === d.id;
        return `<button type="button" class="tool-chip arcade-decor-btn ${equipped ? 'active-filter' : ''}" data-decor="${d.id}">
          ${d.icon} ${d.name} ${equipped ? '✓' : (has ? '(Đeo)' : `(${d.cost}🪙)`)}
        </button>`;
      }).join('')}
    </div>
  `;

  document.getElementById('btnUpgradeSpeed')?.addEventListener('click', () => {
    if (gear.speedLv >= 3 || typeof explorerState === 'undefined') return;
    if (coins < spdCost) {
      window.soundMgr?.playWrong();
      window.showToast?.(`🪙 Cần ${spdCost} Xu! Bé học thêm từ mới hoặc chạy qua đúng Cổng Chữ nhé!`);
      return;
    }
    explorerState.coins -= spdCost;
    gear.speedLv += 1;
    explorerState.arcadeGear = gear;
    window.saveProgress?.();
    window.soundMgr?.playCorrect();
    window.showToast?.(`⚡ Nâng cấp Tốc độ Lv${gear.speedLv} thành công!`);
    renderArcadeGarage();
    updateArcadeHud();
  });

  document.getElementById('btnUpgradeBoost')?.addEventListener('click', () => {
    if (gear.boostLv >= 3 || typeof explorerState === 'undefined') return;
    if (coins < bstCost) {
      window.soundMgr?.playWrong();
      window.showToast?.(`🪙 Cần ${bstCost} Xu để nâng Nitro!`);
      return;
    }
    explorerState.coins -= bstCost;
    gear.boostLv += 1;
    explorerState.arcadeGear = gear;
    window.saveProgress?.();
    window.soundMgr?.playCorrect();
    window.showToast?.(`🚀 Nâng cấp Nitro Lv${gear.boostLv} thành công!`);
    renderArcadeGarage();
    updateArcadeHud();
  });

  bar.querySelectorAll('.arcade-decor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof explorerState === 'undefined') return;
      const item = ARCADE_DECOR_SHOP.find(x => x.id === btn.dataset.decor);
      if (!item) return;
      const list = Array.isArray(gear.unlockedDecors) ? gear.unlockedDecors : ['none'];
      if (list.includes(item.id)) {
        gear.decor = gear.decor === item.id ? 'none' : item.id;
        window.soundMgr?.playPop();
      } else {
        if ((explorerState.coins || 0) < item.cost) {
          window.soundMgr?.playWrong();
          window.showToast?.(`🪙 Cần ${item.cost} Xu để mở khóa ${item.icon} ${item.name}!`);
          return;
        }
        explorerState.coins -= item.cost;
        list.push(item.id);
        gear.unlockedDecors = list;
        gear.decor = item.id;
        window.soundMgr?.playCorrect();
        window.showToast?.(`${item.icon} Đã mở khóa & trang bị ${item.name}!`);
      }
      explorerState.arcadeGear = gear;
      window.saveProgress?.();
      renderArcadeGarage();
      updateArcadeHud();
      if (arcadeState.phase === 'ready') drawArcadeFrame();
    });
  });
}

function buildStageGates(mode, finishDist) {
  const carLanes = [205, 320, 440, 555];
  const sideLanes = [143, 247, 351];
  const lanePositions = mode === 'car' ? carLanes : sideLanes;

  // Ưu tiên cổng chữ mà bé từng sai trong wordStats
  const stats = (typeof explorerState !== 'undefined' && explorerState.wordStats) || {};
  const sortedPool = [...ARCADE_GATE_POOL].sort((a, b) => {
    const wa = stats[`gate_${a.target}`]?.wrong || 0;
    const wb = stats[`gate_${b.target}`]?.wrong || 0;
    if (wa !== wb) return wb - wa;
    return Math.random() - 0.5;
  });

  const fractions = [0.16, 0.30, 0.46, 0.60, 0.75, 0.88];
  const allChars = Array.from(new Set(ARCADE_GATE_POOL.map(x => x.target)));
  return fractions.map((frac, idx) => {
    const q = sortedPool[idx % sortedPool.length];
    const baseChoices = [...q.choices];
    if (mode === 'car' && baseChoices.length < 4) {
      const extra = allChars.find(c => !baseChoices.includes(c)) || 'a';
      baseChoices.push(extra);
    }
    const shuffled = baseChoices.sort(() => Math.random() - 0.5);
    return {
      id: `g_${idx}`,
      dist: Math.round(finishDist * frac),
      target: q.target,
      audioKey: q.audioKey,
      lanes: shuffled.map((ch, li) => ({ label: ch.toUpperCase(), raw: ch, lanePos: lanePositions[li] })),
      prompted: false,
      resolved: false
    };
  });
}

function buildInitialTrackItems(mode, finishDist, gates = []) {
  const list = [];
  const carLanes = [205, 320, 440, 555];
  const sideLanes = [143, 247, 351];

  for (let d = 240; d < finishDist - 240; d += 235) {
    // Chừa khoảng trống sạch ngay cạnh Cổng Chữ để bé lái lách chính xác
    if (gates.some(g => Math.abs(g.dist - d) < 280)) continue;
    const r = Math.random();
    const laneIdx = Math.floor(Math.random() * (mode === 'car' ? 4 : 3));
    const lanePos = mode === 'car' ? carLanes[laneIdx] : sideLanes[laneIdx];
    const kind = r < 0.46 ? 'star' : (r < 0.72 ? 'boost' : 'obstacle');
    list.push({
      kind,
      dist: d,
      lanePos,
      collected: false,
      icon: kind === 'star' ? '⭐' : (kind === 'boost' ? (mode === 'dino' ? '🍗' : '⚡') : (mode === 'car' ? '🚧' : (mode === 'dino' ? '🪨' : '🌩️')))
    });
  }
  return list;
}

function resetArcadeRace(autoStart = false, preserveKeys = false) {
  stopArcadeGameLoop(!preserveKeys);
  if (autoStart) window.soundMgr?.stopAll?.();
  const cfg = ARCADE_MODES[currentArcadeMode];
  const chosenId = arcadeSelectedHero[currentArcadeMode];
  const hero = cfg.heroes.find(h => h.id === chosenId) || cfg.heroes[0];
  const rivalsPool = cfg.heroes.filter(h => h.id !== hero.id).slice(0, 3);

  const isVerticalCar = currentArcadeMode === 'car';
  const carLanes = [205, 320, 440, 555];
  const sideLanes = [143, 247, 351];
  const gates = buildStageGates(currentArcadeMode, cfg.finishDist);

  const speedLines = Array.from({ length: 16 }, () => ({
    x: Math.random() * 760,
    y: Math.random() * 420,
    len: 26 + Math.random() * 34
  }));

  arcadeState = {
    phase: autoStart ? 'countdown' : 'ready',
    countdownTimer: autoStart ? 150 : 0, // ~2.5s đếm ngược 3-2-1
    lastCountdownDigit: 4,
    finishSlowTimer: 0,
    playerDist: 0,
    playerX: isVerticalCar ? carLanes[1] : 160,
    playerY: isVerticalCar ? 330 : sideLanes[1],
    playerSpeed: 0,
    boostTimer: 0,
    stunTimer: 0,
    shakeTimer: 0,
    starsPicked: 0,
    gatesCorrect: 0,
    gatesTotal: gates.length,
    currentStage: 1,
    activeGate: null,
    rivals: rivalsPool.map((r, idx) => ({
      hero: r,
      dist: isVerticalCar ? 35 + idx * 14 : 25 + idx * 12,
      x: isVerticalCar ? carLanes[idx === 1 ? 3 : idx] : 160,
      y: isVerticalCar ? 250 : sideLanes[idx % 3],
      speedBias: 0.94 + idx * 0.045,
      wobbleSeed: idx * 2.1
    })),
    items: buildInitialTrackItems(currentArcadeMode, cfg.finishDist, gates),
    gates,
    particles: [],
    speedLines,
    bgOffset: 0,
    engineTickAcc: 0,
    rank: 1,
    tick: 0
  };

  const resBanner = document.getElementById('arcadeResultBanner');
  if (resBanner) resBanner.style.display = 'none';
  const btnStart = document.getElementById('btnArcadeStart');
  if (btnStart) btnStart.innerHTML = autoStart ? '<span>🔄</span> Chơi lại ván mới' : '<span>🏁</span> BẮT ĐẦU ĐUA!';
  const btnPause = document.getElementById('btnArcadePause');
  if (btnPause) {
    btnPause.style.display = autoStart ? 'inline-flex' : 'none';
    btnPause.innerHTML = '<span>⏸️</span> Tạm dừng';
  }
  updateGatePromptBar(null);
  updateArcadeHud();
  drawArcadeFrame();

  if (autoStart) {
    arcadeLastTs = performance.now();
    arcadeRafId = requestAnimationFrame(arcadeTick);
  }
}

function updateGatePromptBar(gate) {
  const bar = document.getElementById('arcadeGatePromptBar');
  const txt = document.getElementById('arcadeGatePromptText');
  if (!bar || !txt) return;
  if (!gate) {
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  txt.innerText = `🔤 CỔNG CHỮ SẮP TỚI: Lái vào cổng "${gate.target.toUpperCase()}" để tăng tốc Nitro & +10 🪙 Xu!`;
}

function bindArcadeEventsOnce() {
  if (arcadeEventsBound) return;
  arcadeEventsBound = true;

  document.getElementById('btnArcadeStart')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    resetArcadeRace(true);
  });
  document.getElementById('btnArcadeReplay')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    resetArcadeRace(true);
  });
  document.getElementById('btnArcadeSoundTip')?.addEventListener('click', () => {
    const cfg = ARCADE_MODES[currentArcadeMode];
    window.soundMgr?.playClick();
    window.soundMgr?.playAudioFile(cfg.introKey, null, cfg.desc);
  });
  document.getElementById('btnArcadeReplayGate')?.addEventListener('click', () => {
    if (arcadeState.activeGate) {
      window.soundMgr?.playAudioFile(arcadeState.activeGate.audioKey, null, '');
    }
  });

  // Inject Pause & Auto-Gas controls cleanly into arcade actions panel
  const actPanel = document.querySelector('.arcade-action-btns');
  if (actPanel && !document.getElementById('btnArcadePause')) {
    const pBtn = document.createElement('button');
    pBtn.type = 'button';
    pBtn.id = 'btnArcadePause';
    pBtn.className = 'tool-chip';
    pBtn.style.display = 'none';
    pBtn.innerHTML = '<span>⏸️</span> Tạm dừng';
    pBtn.onclick = () => { window.soundMgr?.playClick(); toggleArcadePause(); };
    actPanel.appendChild(pBtn);

    const gBtn = document.createElement('button');
    gBtn.type = 'button';
    gBtn.id = 'btnArcadeAutoGas';
    gBtn.className = 'tool-chip';
    gBtn.innerHTML = '<span>🚀</span> Ga tự động: TẮT';
    gBtn.onclick = () => {
      arcadeAutoGas = !arcadeAutoGas;
      gBtn.classList.toggle('active-filter', arcadeAutoGas);
      gBtn.innerHTML = arcadeAutoGas ? '<span>🚀</span> Ga tự động: BẬT' : '<span>🚀</span> Ga tự động: TẮT';
      window.soundMgr?.playPop();
    };
    actPanel.appendChild(gBtn);
  }

  // Canvas click/tap to steer directly to lane/height (mobile ergonomics)
  const cvEl = document.getElementById('arcadeCanvas');
  if (cvEl) {
    cvEl.addEventListener('pointerdown', (e) => {
      if (typeof currentMode === 'undefined' || currentMode !== 'arcade') return;
      if (arcadeState.phase === 'ready') {
        resetArcadeRace(true, false);
        return;
      }
      if (arcadeState.phase !== 'running') return;
      const r = cvEl.getBoundingClientRect();
      const lx = ((e.clientX - r.left) / (r.width || 1)) * 760;
      const ly = ((e.clientY - r.top) / (r.height || 1)) * 420;
      if (currentArcadeMode === 'car') {
        arcadeState.playerX = Math.max(175, Math.min(585, lx));
      } else {
        const minY = currentArcadeMode === 'dragon' ? 76 : 128;
        const maxY = currentArcadeMode === 'dragon' ? 355 : 356;
        arcadeState.playerY = Math.max(minY, Math.min(maxY, ly));
      }
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && typeof currentMode !== 'undefined' && currentMode === 'arcade') {
      if (arcadeState.phase === 'running' || arcadeState.phase === 'countdown') toggleArcadePause(true);
      else arcadeKeys.up = arcadeKeys.down = arcadeKeys.left = arcadeKeys.right = false;
    }
  });
  window.addEventListener('blur', () => {
    if (typeof currentMode !== 'undefined' && currentMode === 'arcade') {
      arcadeKeys.up = arcadeKeys.down = arcadeKeys.left = arcadeKeys.right = false;
      if (arcadeState.phase === 'running' || arcadeState.phase === 'countdown') toggleArcadePause(true);
    }
  });

  const bindPad = (id, dir) => {
    const el = document.getElementById(id);
    if (!el) return;
    const press = (e) => {
      if (e) e.preventDefault();
      arcadeKeys[dir] = true;
      el.classList.add('active');
      if (arcadeState.phase === 'ready') resetArcadeRace(true, true);
    };
    const release = (e) => {
      if (e) e.preventDefault();
      arcadeKeys[dir] = false;
      el.classList.remove('active');
    };
    el.addEventListener('mousedown', press);
    el.addEventListener('mouseup', release);
    el.addEventListener('mouseleave', release);
    el.addEventListener('touchstart', press, { passive: false });
    el.addEventListener('touchend', release, { passive: false });
    el.addEventListener('touchcancel', release, { passive: false });
  };

  bindPad('btnPadUp', 'up');
  bindPad('btnPadDown', 'down');
  bindPad('btnPadLeft', 'left');
  bindPad('btnPadRight', 'right');

  window.addEventListener('keydown', (e) => {
    if (typeof currentMode === 'undefined' || currentMode !== 'arcade') return;
    const map = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
    const dir = map[e.code];
    if (!dir) return;
    e.preventDefault();
    arcadeKeys[dir] = true;
    if (arcadeState.phase === 'ready') resetArcadeRace(true, true);
  });
  window.addEventListener('keyup', (e) => {
    const map = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
    const dir = map[e.code];
    if (dir) arcadeKeys[dir] = false;
  });
}

function spawnArcadeParticles(x, y, color, count = 6, spread = 2.4) {
  if (arcadeState.particles.length > 48) return;
  for (let i = 0; i < count; i++) {
    arcadeState.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * spread,
      vy: (Math.random() - 0.5) * spread + (currentArcadeMode === 'car' ? 2.0 : 0),
      r: 2.5 + Math.random() * 3.5,
      color,
      life: 1.0
    });
  }
}

function playArcadeEnginePulse(speedRatio, isBoosting) {
  if (!window.soundMgr || window.soundMgr.isMuted) return;
  const freq = currentArcadeMode === 'car'
    ? (88 + speedRatio * 55 + (isBoosting ? 42 : 0))
    : (currentArcadeMode === 'dino' ? 115 + speedRatio * 25 : 195 + speedRatio * 40);
  window.soundMgr.playToneFreq(freq, currentArcadeMode === 'car' ? 'triangle' : 'sine', 0.055, 0, isBoosting ? 0.032 : 0.018);
}

function arcadeTick(ts) {
  const validPhase = arcadeState.phase === 'countdown' || arcadeState.phase === 'running' || arcadeState.phase === 'finishing';
  if (typeof currentMode === 'undefined' || currentMode !== 'arcade' || !validPhase) {
    arcadeRafId = null;
    return;
  }

  const rawDt = Math.min(2.2, Math.max(0.15, (ts - arcadeLastTs) / 16.67));
  arcadeLastTs = ts;
  arcadeState.tick += rawDt;

  if (arcadeState.phase === 'countdown') {
    arcadeState.countdownTimer -= rawDt;
    const digit = Math.max(0, Math.ceil(arcadeState.countdownTimer / 50));
    if (digit !== arcadeState.lastCountdownDigit && digit > 0) {
      arcadeState.lastCountdownDigit = digit;
      window.soundMgr?.playToneFreq(digit === 1 ? 660 : 440, 'triangle', 0.14, 0, 0.14);
    }
    if (arcadeState.countdownTimer <= 0) {
      arcadeState.phase = 'running';
      window.soundMgr?.playAudioFile('arcade_start', null, '');
      window.soundMgr?.playToneFreq(880, 'triangle', 0.2, 0, 0.18);
    }
    drawArcadeFrame();
    arcadeRafId = requestAnimationFrame(arcadeTick);
    return;
  }

  // Slow-motion kịch tính lúc vừa qua vạch đích!
  const dt = arcadeState.phase === 'finishing' ? rawDt * 0.28 : rawDt;

  const cfg = ARCADE_MODES[currentArcadeMode];
  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero[currentArcadeMode]) || cfg.heroes[0];
  const gear = getArcadeGear();
  const spdGearMult = 1 + (gear.speedLv || 0) * 0.07;
  const boostDurBonus = 1 + (gear.boostLv || 0) * 0.2;

  if (arcadeState.boostTimer > 0) arcadeState.boostTimer = Math.max(0, arcadeState.boostTimer - rawDt);
  if (arcadeState.stunTimer > 0) arcadeState.stunTimer = Math.max(0, arcadeState.stunTimer - rawDt);
  if (arcadeState.shakeTimer > 0) arcadeState.shakeTimer = Math.max(0, arcadeState.shakeTimer - rawDt);

  const boostMult = arcadeState.boostTimer > 0 ? 1.52 : 1.0;
  const stunMult = arcadeState.stunTimer > 0 ? 0.55 : 1.0;
  const effectiveBase = hero.baseSpd * spdGearMult;

  if (currentArcadeMode === 'car') {
    const steerSpd = 5.6 * rawDt;
    if (arcadeState.phase === 'running') {
      if (arcadeKeys.left) arcadeState.playerX -= steerSpd;
      if (arcadeKeys.right) arcadeState.playerX += steerSpd;
      arcadeState.playerX = Math.max(175, Math.min(585, arcadeState.playerX));
    }
    let targetSpd = effectiveBase;
    if (arcadeKeys.up || arcadeAutoGas) targetSpd = effectiveBase * 1.42;
    else if (arcadeKeys.down) targetSpd = effectiveBase * 0.62;
    targetSpd *= boostMult * stunMult;

    arcadeState.playerSpeed += (targetSpd - arcadeState.playerSpeed) * 0.12 * dt;
    arcadeState.playerDist += arcadeState.playerSpeed * dt;
    arcadeState.bgOffset = (arcadeState.bgOffset + arcadeState.playerSpeed * 2.8 * dt) % 160;
    arcadeState.playerY = 330 - ((arcadeKeys.up || arcadeAutoGas) ? 28 : (arcadeKeys.down ? -14 : 0));
  } else {
    const vertSpd = (currentArcadeMode === 'dragon' ? 4.9 : 4.5) * rawDt;
    if (arcadeState.phase === 'running') {
      if (arcadeKeys.up) arcadeState.playerY -= vertSpd;
      if (arcadeKeys.down) arcadeState.playerY += vertSpd;
      const minY = currentArcadeMode === 'dragon' ? 76 : 128;
      const maxY = currentArcadeMode === 'dragon' ? 355 : 356;
      arcadeState.playerY = Math.max(minY, Math.min(maxY, arcadeState.playerY));
    }
    let targetSpd = effectiveBase;
    if (arcadeKeys.right || arcadeAutoGas) targetSpd = effectiveBase * 1.42;
    else if (arcadeKeys.left) targetSpd = effectiveBase * 0.64;
    targetSpd *= boostMult * stunMult;

    arcadeState.playerSpeed += (targetSpd - arcadeState.playerSpeed) * 0.12 * dt;
    arcadeState.playerDist += arcadeState.playerSpeed * dt;
    arcadeState.bgOffset = (arcadeState.bgOffset + arcadeState.playerSpeed * 2.4 * dt) % 160;
    arcadeState.playerX = 180 + ((arcadeKeys.right || arcadeAutoGas) ? 42 : (arcadeKeys.left ? -36 : 0));
  }

  // Stage transitions (Chặng 1 -> Chặng 2 -> Chặng 3)
  const pct = arcadeState.playerDist / cfg.finishDist;
  const nextStage = pct >= 0.66 ? 3 : (pct >= 0.33 ? 2 : 1);
  if (nextStage !== arcadeState.currentStage) {
    arcadeState.currentStage = nextStage;
    const stObj = cfg.stages[nextStage - 1];
    window.soundMgr?.playPop();
    window.showToast?.(`${stObj.icon} ${stObj.name.toUpperCase()}!`);
  }

  // Rubber-banding AI đối thủ bám sát kịch tính
  arcadeState.rivals.forEach((rv) => {
    const gap = rv.dist - arcadeState.playerDist;
    let rubberMult = 1.0;
    if (gap > 240) rubberMult = 0.78;
    else if (gap > 110) rubberMult = 0.89;
    else if (gap < -220) rubberMult = 1.24;
    else if (gap < -90) rubberMult = 1.12;
    // Đoạn nước rút cuối (<90%): giữ kịch tính sát nút
    const wave = Math.sin(arcadeState.tick * 0.03 + rv.wobbleSeed) * 0.28;
    const spd = Math.max(2.0, rv.hero.baseSpd * rv.speedBias * rubberMult + wave);
    rv.dist += spd * dt;
    if (currentArcadeMode === 'car') {
      rv.x = Math.max(175, Math.min(585, rv.x + Math.sin(arcadeState.tick * 0.02 + rv.wobbleSeed) * 0.5 * dt));
    } else if (currentArcadeMode === 'dragon') {
      rv.y = Math.max(80, Math.min(350, rv.y + Math.sin(arcadeState.tick * 0.045 + rv.wobbleSeed) * 0.9 * dt));
    }
  });

  // Particles & Speed lines & Engine sound pulse
  const isBoosting = arcadeState.boostTimer > 0 || arcadeAutoGas || (currentArcadeMode === 'car' ? arcadeKeys.up : arcadeKeys.right);
  if (arcadeState.phase === 'running' && (isBoosting || Math.random() < 0.35)) {
    const px = currentArcadeMode === 'car' ? arcadeState.playerX : arcadeState.playerX - 32;
    const py = currentArcadeMode === 'car' ? arcadeState.playerY + 34 : arcadeState.playerY + 12;
    const col = arcadeState.boostTimer > 0 ? '#facc15' : (currentArcadeMode === 'dragon' ? '#bae6fd' : '#e2e8f0');
    spawnArcadeParticles(px, py, col, arcadeState.boostTimer > 0 ? 2 : 1, 2.2);
  }
  arcadeState.particles.forEach(p => {
    p.x += p.vx * rawDt;
    p.y += p.vy * rawDt;
    p.life -= 0.04 * rawDt;
  });
  arcadeState.particles = arcadeState.particles.filter(p => p.life > 0);

  const lineSpd = (arcadeState.boostTimer > 0 ? 18 : 9) * dt;
  arcadeState.speedLines.forEach(sl => {
    if (currentArcadeMode === 'car') {
      sl.y += lineSpd;
      if (sl.y > 420) { sl.y = -30; sl.x = Math.random() * 760; }
    } else {
      sl.x -= lineSpd;
      if (sl.x < -40) { sl.x = 790; sl.y = Math.random() * 420; }
    }
  });

  arcadeState.engineTickAcc += rawDt;
  if (arcadeState.phase === 'running' && arcadeState.engineTickAcc >= 9) {
    arcadeState.engineTickAcc = 0;
    playArcadeEnginePulse(arcadeState.playerSpeed / 5.5, isBoosting);
  }

  // Pickups & Cổng Chữ ôn bài
  if (arcadeState.phase === 'running') {
    arcadeState.items.forEach(it => {
      if (it.collected) return;
      const diffD = Math.abs(it.dist - arcadeState.playerDist);
      const diffLat = currentArcadeMode === 'car'
        ? Math.abs(it.lanePos - arcadeState.playerX)
        : Math.abs(it.lanePos - arcadeState.playerY);
      if (diffD < 32 && diffLat < 42) {
        it.collected = true;
        if (it.kind === 'star') {
          arcadeState.starsPicked++;
          spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#fde047', 6, 3.2);
          window.soundMgr?.playPop();
        } else if (it.kind === 'boost') {
          arcadeState.boostTimer = Math.round(95 * boostDurBonus);
          arcadeState.shakeTimer = 12;
          arcadeState.starsPicked++;
          spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#38bdf8', 9, 4.0);
          window.soundMgr?.playToneFreq(760, 'triangle', 0.16, 0, 0.2);
        } else {
          arcadeState.stunTimer = 30;
          arcadeState.shakeTimer = 18;
          spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#ef4444', 8, 3.5);
          window.soundMgr?.playToneFreq(170, 'sawtooth', 0.16, 0, 0.15);
        }
      }
    });

    // Kiểm tra Cổng Chữ tiếp theo
    let currentPromptGate = null;
    arcadeState.gates.forEach(g => {
      if (g.resolved) return;
      const aheadDist = g.dist - arcadeState.playerDist;
      if (aheadDist > 0 && aheadDist < 720) {
        currentPromptGate = g;
        if (!g.prompted) {
          g.prompted = true;
          updateGatePromptBar(g);
          window.soundMgr?.playAudioFile(g.audioKey, null, '');
        }
      }
      if (Math.abs(g.dist - arcadeState.playerDist) < 28) {
        g.resolved = true;
        updateGatePromptBar(null);
        const playerPos = currentArcadeMode === 'car' ? arcadeState.playerX : arcadeState.playerY;
        let closestLane = g.lanes[0];
        let bestDiff = Infinity;
        g.lanes.forEach(ln => {
          const d = Math.abs(ln.lanePos - playerPos);
          if (d < bestDiff) { bestDiff = d; closestLane = ln; }
        });
        const isCorrect = closestLane.raw === g.target;
        if (isCorrect) {
          arcadeState.gatesCorrect++;
          arcadeState.boostTimer = Math.round(115 * boostDurBonus);
          arcadeState.shakeTimer = 14;
          spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#22c55e', 14, 4.5);
          window.soundMgr?.playCorrect();
          window.awardCoins?.(10);
          window.recordAnswer?.(`gate_${g.target}`, true, { label: `Chữ ${g.target.toUpperCase()}`, mode: 'arcade', audioKey: g.audioKey });
          window.showToast?.(`🎉 Đúng cổng "${g.target.toUpperCase()}"! Nitro siêu tốc +10 🪙 Xu!`);
        } else {
          arcadeState.stunTimer = 38;
          arcadeState.shakeTimer = 14;
          spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#f97316', 10, 3.5);
          window.soundMgr?.playWrong();
          window.recordAnswer?.(`gate_${g.target}`, false, { label: `Chữ ${g.target.toUpperCase()}`, mode: 'arcade', audioKey: g.audioKey });
          window.showToast?.(`💡 Chữ cần tìm là "${g.target.toUpperCase()}" (đã lưu vào Ôn tập hôm nay)!`);
        }
      }
    });
    if (!currentPromptGate && arcadeState.activeGate) {
      updateGatePromptBar(null);
    }
    arcadeState.activeGate = currentPromptGate;
  }

  // Freeze rank once player crosses finish line (don't let rivals steal during slow-mo!)
  if (arcadeState.phase === 'running') {
    let ahead = 0;
    arcadeState.rivals.forEach(rv => { if (rv.dist > arcadeState.playerDist) ahead++; });
    arcadeState.rank = ahead + 1;
  }

  updateArcadeHud();
  drawArcadeFrame();

  if (arcadeState.phase === 'running' && arcadeState.playerDist >= cfg.finishDist) {
    arcadeState.phase = 'finishing';
    arcadeState.finishSlowTimer = 68;
    arcadeState.shakeTimer = 16;
    spawnArcadeParticles(arcadeState.playerX, arcadeState.playerY, '#facc15', 22, 5.5);
    window.soundMgr?.playVictory();
  } else if (arcadeState.phase === 'finishing') {
    arcadeState.finishSlowTimer -= rawDt;
    if (arcadeState.finishSlowTimer <= 0) {
      finishArcadeRace();
      return;
    }
  }

  arcadeRafId = requestAnimationFrame(arcadeTick);
}

function updateArcadeHud() {
  const cfg = ARCADE_MODES[currentArcadeMode];
  const pct = Math.min(100, Math.round((arcadeState.playerDist / cfg.finishDist) * 100));
  const st = cfg.stages[(arcadeState.currentStage || 1) - 1] || cfg.stages[0];
  const rEl = document.getElementById('arcadeStatusRank');
  const dEl = document.getElementById('arcadeStatusDist');
  const sEl = document.getElementById('arcadeStatusStars');
  const stEl = document.getElementById('arcadeStagePill');
  if (rEl) rEl.innerText = `🏆 Hạng ${arcadeState.rank} / 4`;
  if (dEl) dEl.innerText = `🏁 Đường đua: ${pct}%`;
  if (sEl) sEl.innerText = `⭐ Nhặt: ${arcadeState.starsPicked} • 🔤 ${arcadeState.gatesCorrect}/${arcadeState.gatesTotal}`;
  if (stEl) stEl.innerText = `${st.icon} ${st.name}`;
  updateArcadeCoinsUI();
}

function finishArcadeRace() {
  arcadeState.phase = 'finished';
  stopArcadeGameLoop();
  updateGatePromptBar(null);
  drawArcadeFrame();

  // Đua chỉ cho 1-3 ⭐ (theo trần ngày), phần lớn là 🪙 Xu để nâng cấp!
  const rank = arcadeState.rank;
  const starReward = rank === 1 ? 3 : (rank === 2 ? 2 : 1);
  const log = typeof ensureTodayLog === 'function' ? ensureTodayLog() : null;
  const cap = (typeof explorerState !== 'undefined' && explorerState.parentSettings?.dailyArcadeCap) || 25;
  const actualStars = log ? Math.min(starReward, Math.max(0, cap - (log.arcadeStars || 0))) : starReward;
  const rankCoins = rank === 1 ? 25 : (rank === 2 ? 18 : 12);
  const totalCoins = rankCoins + arcadeState.starsPicked + arcadeState.gatesCorrect * 8;

  const pauseBtn = document.getElementById('btnArcadePause');
  if (pauseBtn) pauseBtn.style.display = 'none';

  const resBanner = document.getElementById('arcadeResultBanner');
  const resTitle = document.getElementById('arcadeResultTitle');
  const resDesc = document.getElementById('arcadeResultDesc');

  const medals = {
    1: '🏆 VỀ NHẤT 3 CHẶNG SIÊU ĐỈNH!',
    2: '🥈 VỀ NHÌ XUẤT SẮC!',
    3: '🥉 VỀ BA CỐ GẮNG LẮM!',
    4: '🎉 HOÀN THÀNH 3 CHẶNG ĐƯỜNG ĐUA!'
  };
  if (resTitle) resTitle.innerText = medals[rank] || medals[4];
  if (resDesc) {
    const starTxt = actualStars > 0 ? `+${actualStars} ⭐` : '0 ⭐ (đạt trần đua hôm nay)';
    resDesc.innerText = `Hạng ${rank}/4 • Qua đúng ${arcadeState.gatesCorrect}/${arcadeState.gatesTotal} Cổng Chữ • Nhận ${starTxt} & +${totalCoins} 🪙 Xu!`;
  }
  if (resBanner) resBanner.style.display = 'flex';

  if (typeof fireConfetti === 'function') fireConfetti();
  const winKey = rank === 1 ? 'arcade_rank_1' : (rank === 2 ? 'arcade_rank_2' : 'arcade_rank_3');
  window.soundMgr?.playAudioFile(winKey, null, '');
  window.markDailyStep?.('play');
  if (typeof awardCoins === 'function') awardCoins(totalCoins);
  if (typeof awardStars === 'function') {
    awardStars(starReward, `${ARCADE_MODES[currentArcadeMode].title} Hạng ${rank} (+${totalCoins} 🪙 Xu)!`, true, 'arcade');
  }
  renderArcadeGarage();
}

function drawArcadeFrame() {
  const cv = document.getElementById('arcadeCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = 760, H = 420;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (cv.width !== W * dpr || cv.height !== H * dpr) {
    cv.width = W * dpr;
    cv.height = H * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  if (arcadeState.shakeTimer > 0) {
    const mag = Math.min(5, arcadeState.shakeTimer * 0.35);
    ctx.translate((Math.random() - 0.5) * mag * 2, (Math.random() - 0.5) * mag * 2);
  }

  if (currentArcadeMode === 'car') {
    drawCarRaceScene(ctx, W, H);
  } else if (currentArcadeMode === 'dino') {
    drawDinoRaceScene(ctx, W, H);
  } else {
    drawDragonRaceScene(ctx, W, H);
  }

  // Draw speed lines (cảm giác tốc độ)
  const isFast = arcadeState.boostTimer > 0 || (currentArcadeMode === 'car' ? arcadeKeys.up : arcadeKeys.right);
  if (arcadeState.phase === 'running' || arcadeState.phase === 'finishing') {
    ctx.save();
    ctx.strokeStyle = isFast ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.20)';
    ctx.lineWidth = isFast ? 3 : 1.5;
    arcadeState.speedLines.forEach(sl => {
      ctx.beginPath();
      if (currentArcadeMode === 'car') {
        ctx.moveTo(sl.x, sl.y);
        ctx.lineTo(sl.x, sl.y + sl.len);
      } else {
        ctx.moveTo(sl.x, sl.y);
        ctx.lineTo(sl.x + sl.len, sl.y);
      }
      ctx.stroke();
    });
    ctx.restore();
  }

  // Draw dust/spark particles
  arcadeState.particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();

  // Top progress ribbon + 3-stage markers
  const cfg = ARCADE_MODES[currentArcadeMode];
  const pct = Math.min(1, arcadeState.playerDist / cfg.finishDist);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
  ctx.fillRect(14, 10, W - 28, 14);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(14, 10, (W - 28) * pct, 14);
  [0.33, 0.66].forEach(m => {
    const mx = 14 + (W - 28) * m;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx - 1, 9, 2, 16);
  });
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('🏁', W - 28, 22);

  // Countdown overlay (3 - 2 - 1 - XUẤT PHÁT!)
  if (arcadeState.phase === 'countdown') {
    const digit = Math.max(1, Math.ceil(arcadeState.countdownTimer / 50));
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fde047';
    ctx.font = '900 92px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(digit), W / 2, H / 2 - 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px Nunito, sans-serif';
    ctx.fillText('CHUẨN BỊ XUẤT PHÁT!', W / 2, H / 2 + 56);
  } else if (arcadeState.phase === 'paused') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.52)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fde047';
    ctx.font = '900 42px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⏸️ ĐANG TẠM DỪNG', W / 2, H / 2 - 14);
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px Nunito, sans-serif';
    ctx.fillText('Bấm "▶️ Tiếp tục" để đua tiếp nhé!', W / 2, H / 2 + 34);
  } else if (arcadeState.phase === 'finishing') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.fillRect(0, H / 2 - 44, W, 88);
    ctx.fillStyle = '#fde047';
    ctx.font = '900 36px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`🏁 VỀ ĐÍCH • HẠNG ${arcadeState.rank}/4!`, W / 2, H / 2);
  }
}

function drawDecorOverlay(ctx, yOffset, decorId, tick) {
  if (!decorId || decorId === 'none') return;
  ctx.save();
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  if (decorId === 'crown') {
    ctx.fillText('👑', 0, yOffset - 22);
  } else if (decorId === 'flame') {
    ctx.fillText('🔥', -34 + Math.sin(tick * 0.5) * 3, 6);
  } else if (decorId === 'rainbow') {
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.65)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 36, Math.PI * 0.75, Math.PI * 1.45);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.beginPath();
    ctx.arc(0, 0, 40, Math.PI * 0.75, Math.PI * 1.45);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPhotoRacerSprite(ctx, x, y, hero, mode, tick, isBoosting, isPlayer) {
  const img = getArcadeHeroImage(hero.imgSrc);
  if (!img) {
    if (mode === 'dino') drawDinoVectorFallback(ctx, x, y, hero, tick, isBoosting, isPlayer);
    else drawDragonVectorFallback(ctx, x, y, hero, tick, isBoosting, isPlayer);
    return;
  }

  ctx.save();
  const bounce = mode === 'dino'
    ? Math.abs(Math.sin(tick * 0.38)) * -6
    : Math.sin(tick * 0.24) * 5;
  ctx.translate(x, y + bounce);

  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(0, 34 - bounce * 0.5, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Animated dragon wings behind photo medallion
  if (mode === 'dragon') {
    const flap = Math.sin(tick * 0.38) * 18;
    ctx.fillStyle = hero.wing || hero.color;
    ctx.beginPath();
    ctx.moveTo(-10, -4);
    ctx.lineTo(-38, -28 + flap);
    ctx.lineTo(-6, -18 + flap * 0.4);
    ctx.closePath();
    ctx.fill();
  }

  // Boost fire / wind aura
  if (isBoosting) {
    ctx.fillStyle = mode === 'dragon' ? '#f97316' : '#facc15';
    ctx.beginPath();
    ctx.moveTo(-26, -8); ctx.lineTo(-48, 0); ctx.lineTo(-26, 8);
    ctx.fill();
  }

  // Real photo cropped in vibrant circular medallion
  const R = 30;
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.clip();
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max((R * 2) / iw, (R * 2) / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();

  // Colored rim + Player highlight
  ctx.lineWidth = isPlayer ? 4 : 2.5;
  ctx.strokeStyle = isPlayer ? '#facc15' : hero.color;
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.stroke();

  if (isPlayer) {
    drawDecorOverlay(ctx, -R + 12, getArcadeGear().decor, tick);
  }

  // Label pill
  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  const lbl = isPlayer ? '⭐ BẢO LONG' : hero.name.split(' ')[0];
  if (isPlayer) {
    ctx.fillStyle = mode === 'dragon' ? '#991b1b' : '#15803d';
    ctx.fillRect(-34, -48, 68, 15);
    ctx.fillStyle = '#ffffff';
  } else {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    ctx.fillRect(-26, -46, 52, 14);
    ctx.fillStyle = '#f8fafc';
  }
  ctx.fillText(lbl, 0, -37);
  ctx.restore();
}

function drawGateBannerVertical(ctx, gate, playerY, playerDist, H) {
  const screenY = playerY - (gate.dist - playerDist) * 0.72;
  if (screenY < -60 || screenY > H + 60) return;

  ctx.save();
  // Overhead beam
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fillRect(140, screenY - 26, 480, 52);
  gate.lanes.forEach(ln => {
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(ln.lanePos - 36, screenY - 20, 72, 40, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#7c2d12';
    ctx.font = '900 22px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ln.label, ln.lanePos, screenY + 1);
  });
  ctx.restore();
}

function drawGateBannerHorizontal(ctx, gate, playerX, playerDist, W) {
  const sx = playerX + (gate.dist - playerDist) * 0.95;
  if (sx < -60 || sx > W + 60) return;

  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.48)';
  ctx.fillRect(sx - 24, 96, 48, 298);
  gate.lanes.forEach(ln => {
    const cy = ln.lanePos;
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(sx - 28, cy - 22, 56, 44, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#7c2d12';
    ctx.font = '900 22px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ln.label, sx, cy + 1);
  });
  ctx.restore();
}

function drawSupercarSprite(ctx, x, y, hero, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);

  // Night headlights in Stage 3
  if (arcadeState.currentStage === 3) {
    const beam = ctx.createLinearGradient(0, -34, 0, -145);
    beam.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
    beam.addColorStop(1, 'rgba(254, 240, 138, 0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(-14, -32); ctx.lineTo(-32, -140); ctx.lineTo(32, -140); ctx.lineTo(14, -32);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(0, 4, 24, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  [[-21, -18], [15, -18], [-22, 12], [16, 12]].forEach(([wx, wy]) => ctx.fillRect(wx, wy, 7, 15));

  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.moveTo(0, -38); ctx.lineTo(18, -16); ctx.lineTo(20, 26); ctx.lineTo(13, 35);
  ctx.lineTo(-13, 35); ctx.lineTo(-20, 26); ctx.lineTo(-18, -16);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = isPlayer ? 2.5 : 1.5;
  ctx.strokeStyle = isPlayer ? '#ffffff' : '#1e293b';
  ctx.stroke();

  ctx.fillStyle = hero.stripe;
  ctx.fillRect(-3.5, -33, 7, 65);
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(-11, -10); ctx.lineTo(11, -10); ctx.lineTo(13, 8); ctx.lineTo(-13, 8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = hero.accent;
  ctx.fillRect(-19, 28, 38, 6);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-14, -31, 6, 4);
  ctx.fillRect(8, -31, 6, 4);

  if (isBoosting) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-9, 35); ctx.lineTo(-5, 56); ctx.lineTo(-1, 35);
    ctx.moveTo(1, 35); ctx.lineTo(5, 56); ctx.lineTo(9, 35);
    ctx.fill();
  }
  if (isPlayer) {
    drawDecorOverlay(ctx, -28, getArcadeGear().decor, arcadeState.tick);
  }

  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.brand.split(' ')[0], 0, -45);
  ctx.restore();
}

function drawCarRaceScene(ctx, W, H) {
  const st = arcadeState.currentStage || 1;
  const shoulderCol = st === 1 ? '#22c55e' : (st === 2 ? '#c2410c' : '#0f172a');
  const roadCol = st === 1 ? '#334155' : (st === 2 ? '#475569' : '#1e293b');
  ctx.fillStyle = shoulderCol;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = roadCol;
  ctx.fillRect(140, 0, 480, H);

  for (let y = -80 + (arcadeState.bgOffset % 80); y < H; y += 40) {
    ctx.fillStyle = (Math.floor(y / 40) % 2 === 0) ? (st === 3 ? '#38bdf8' : '#ef4444') : '#ffffff';
    ctx.fillRect(126, y, 14, 40);
    ctx.fillRect(620, y, 14, 40);
  }

  ctx.fillStyle = st === 3 ? '#7dd3fc' : '#e2e8f0';
  [260, 380, 500].forEach(lx => {
    for (let y = -80 + (arcadeState.bgOffset % 80); y < H; y += 80) {
      ctx.fillRect(lx - 3, y, 6, 44);
    }
  });

  const cfg = ARCADE_MODES.car;
  const finishY = arcadeState.playerY - (cfg.finishDist - arcadeState.playerDist) * 0.72;
  if (finishY > -60 && finishY < H + 60) {
    for (let cx = 140; cx < 620; cx += 24) {
      for (let r = 0; r < 2; r++) {
        ctx.fillStyle = ((cx / 24 + r) % 2 === 0) ? '#0f172a' : '#ffffff';
        ctx.fillRect(cx, finishY + r * 14, 24, 14);
      }
    }
  }

  arcadeState.gates.forEach(g => {
    if (!g.resolved) drawGateBannerVertical(ctx, g, arcadeState.playerY, arcadeState.playerDist, H);
  });

  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const screenY = arcadeState.playerY - (it.dist - arcadeState.playerDist) * 0.72;
    if (screenY < -40 || screenY > H + 40) return;
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, it.lanePos, screenY);
  });

  arcadeState.rivals.forEach(rv => {
    const ry = arcadeState.playerY - (rv.dist - arcadeState.playerDist) * 0.72;
    if (ry > -70 && ry < H + 70) {
      drawSupercarSprite(ctx, rv.x, ry, rv.hero, false, false);
    }
  });

  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.car) || cfg.heroes[0];
  drawSupercarSprite(ctx, arcadeState.playerX, arcadeState.playerY, hero, arcadeState.boostTimer > 0 || arcadeKeys.up, true);
}

function drawDinoVectorFallback(ctx, x, y, hero, tick, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);
  const legSwing = Math.sin(tick * 0.45) * 7;
  ctx.fillStyle = hero.crest;
  ctx.fillRect(-10 + legSwing, 10, 8, 16);
  ctx.fillRect(2 - legSwing, 10, 8, 16);
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.name.split(' ')[0], 0, -28);
  ctx.restore();
}

function drawDragonVectorFallback(ctx, x, y, hero, tick, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.name.split(' ')[1] || hero.name, 0, -28);
  ctx.restore();
}

function drawDinoRaceScene(ctx, W, H) {
  const st = arcadeState.currentStage || 1;
  const sky = ctx.createLinearGradient(0, 0, 0, 92);
  if (st === 1) { sky.addColorStop(0, '#7dd3fc'); sky.addColorStop(1, '#bae6fd'); }
  else if (st === 2) { sky.addColorStop(0, '#ea580c'); sky.addColorStop(1, '#fdba74'); }
  else { sky.addColorStop(0, '#450a0a'); sky.addColorStop(1, '#991b1b'); }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, 92);

  for (let px = -arcadeState.bgOffset; px < W + 160; px += 160) {
    ctx.fillStyle = st === 1 ? '#22c55e' : (st === 2 ? '#9a3412' : '#1e293b');
    ctx.beginPath();
    ctx.moveTo(px, 92); ctx.lineTo(px + 55, 34); ctx.lineTo(px + 110, 92);
    ctx.fill();
    ctx.font = '28px sans-serif';
    ctx.fillText(st === 1 ? '🌴' : (st === 2 ? '🌵' : '🌋'), px + 115, 78);
  }

  ctx.fillStyle = st === 1 ? '#86efac' : (st === 2 ? '#fed7aa' : '#7f1d1d');
  ctx.fillRect(0, 92, W, H - 92);
  [96, 200, 304].forEach((ly, i) => {
    if (st === 1) ctx.fillStyle = i % 2 === 0 ? '#fde68a' : '#fef3c7';
    else if (st === 2) ctx.fillStyle = i % 2 === 0 ? '#fdba74' : '#ffedd5';
    else ctx.fillStyle = i % 2 === 0 ? '#475569' : '#334155';
    ctx.fillRect(0, ly, W, 94);
    ctx.strokeStyle = st === 3 ? '#f97316' : '#f59e0b';
    ctx.strokeRect(0, ly, W, 94);
  });

  const cfg = ARCADE_MODES.dino;
  const finishX = arcadeState.playerX + (cfg.finishDist - arcadeState.playerDist) * 0.95;
  if (finishX > -40 && finishX < W + 60) {
    for (let cy = 96; cy < H; cy += 22) {
      ctx.fillStyle = ((cy / 22) % 2 === 0) ? '#0f172a' : '#ffffff';
      ctx.fillRect(finishX, cy, 16, 22);
    }
  }

  arcadeState.gates.forEach(g => {
    if (!g.resolved) drawGateBannerHorizontal(ctx, g, arcadeState.playerX, arcadeState.playerDist, W);
  });

  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const sx = arcadeState.playerX + (it.dist - arcadeState.playerDist) * 0.95;
    if (sx < -40 || sx > W + 40) return;
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, sx, it.lanePos);
  });

  arcadeState.rivals.forEach(rv => {
    const rx = arcadeState.playerX + (rv.dist - arcadeState.playerDist) * 0.95;
    if (rx > -70 && rx < W + 70) {
      drawPhotoRacerSprite(ctx, rx, rv.y, rv.hero, 'dino', arcadeState.tick + rv.wobbleSeed * 5, false, false);
    }
  });

  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.dino) || cfg.heroes[0];
  drawPhotoRacerSprite(ctx, arcadeState.playerX, arcadeState.playerY, hero, 'dino', arcadeState.tick, arcadeState.boostTimer > 0 || arcadeAutoGas || arcadeKeys.right, true);
}

function drawDragonRaceScene(ctx, W, H) {
  const st = arcadeState.currentStage || 1;
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  if (st === 1) {
    grad.addColorStop(0, '#0284c7'); grad.addColorStop(0.55, '#38bdf8'); grad.addColorStop(1, '#e0f2fe');
  } else if (st === 2) {
    grad.addColorStop(0, '#1e1b4b'); grad.addColorStop(0.55, '#4338ca'); grad.addColorStop(1, '#64748b');
  } else {
    grad.addColorStop(0, '#0284c7'); grad.addColorStop(0.5, '#7dd3fc'); grad.addColorStop(1, '#fef08a');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  if (st === 3) {
    const rainbowCols = ['rgba(239,68,68,0.35)', 'rgba(249,115,22,0.35)', 'rgba(250,204,21,0.35)', 'rgba(34,197,94,0.35)', 'rgba(56,189,248,0.35)', 'rgba(139,92,246,0.35)'];
    rainbowCols.forEach((col, ri) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(W / 2, H + 60, 360 - ri * 11, Math.PI, Math.PI * 2);
      ctx.stroke();
    });
  }

  for (let cx = -arcadeState.bgOffset; cx < W + 160; cx += 160) {
    ctx.fillStyle = st === 2 ? 'rgba(30, 41, 59, 0.72)' : 'rgba(255, 255, 255, 0.76)';
    ctx.beginPath();
    ctx.arc(cx + 40, 82, 22, 0, Math.PI * 2);
    ctx.arc(cx + 66, 76, 26, 0, Math.PI * 2);
    ctx.arc(cx + 94, 82, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  const cfg = ARCADE_MODES.dragon;
  const finishX = arcadeState.playerX + (cfg.finishDist - arcadeState.playerDist) * 0.95;
  if (finishX > -40 && finishX < W + 80) {
    ctx.font = '64px sans-serif';
    ctx.fillText('🏰', finishX, 220);
    for (let cy = 30; cy < H; cy += 24) {
      ctx.fillStyle = ((cy / 24) % 2 === 0) ? '#facc15' : '#ef4444';
      ctx.fillRect(finishX - 10, cy, 8, 24);
    }
  }

  arcadeState.gates.forEach(g => {
    if (!g.resolved) drawGateBannerHorizontal(ctx, g, arcadeState.playerX, arcadeState.playerDist, W);
  });

  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const sx = arcadeState.playerX + (it.dist - arcadeState.playerDist) * 0.95;
    if (sx < -40 || sx > W + 40) return;
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, sx, it.lanePos);
  });

  arcadeState.rivals.forEach(rv => {
    const rx = arcadeState.playerX + (rv.dist - arcadeState.playerDist) * 0.95;
    if (rx > -70 && rx < W + 70) {
      drawPhotoRacerSprite(ctx, rx, rv.y, rv.hero, 'dragon', arcadeState.tick + rv.wobbleSeed * 4, false, false);
    }
  });

  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.dragon) || cfg.heroes[0];
  drawPhotoRacerSprite(ctx, arcadeState.playerX, arcadeState.playerY, hero, 'dragon', arcadeState.tick, arcadeState.boostTimer > 0 || arcadeAutoGas || arcadeKeys.right, true);
}
