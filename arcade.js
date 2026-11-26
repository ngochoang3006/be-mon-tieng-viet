// ========================================================
// KHU ĐUA TỐC ĐỘ 4 CHIỀU CHO BẢO LONG (XE ĐUA • KHỦNG LONG • RỒNG BAY)
// Điều hướng cực đơn giản bằng 4 nút: ⬆️ Lên, ⬇️ Xuống, ⬅️ Trái, ➡️ Phải (hoặc phím mũi tên / WASD)
// ========================================================

const ARCADE_MODES = {
  car: {
    id: 'car',
    title: '🏎️ Đua Siêu Xe Tốc Độ',
    introKey: 'arcade_intro_car',
    desc: 'Chọn Lamborghini, Ferrari hoặc Porsche, dùng 4 nút mũi tên vượt qua các đối thủ về đích!',
    finishDist: 1800,
    heroes: [
      { id: 'lambo', name: 'Lamborghini Vàng', brand: 'Lambo V12', color: '#facc15', accent: '#1e293b', stripe: '#0f172a', baseSpd: 4.5 },
      { id: 'ferrari', name: 'Ferrari Đỏ F1', brand: 'Ferrari SF', color: '#ef4444', accent: '#ffffff', stripe: '#fde047', baseSpd: 4.55 },
      { id: 'porsche', name: 'Porsche Xanh 911', brand: 'Porsche Turbo', color: '#0ea5e9', accent: '#f8fafc', stripe: '#facc15', baseSpd: 4.45 },
      { id: 'mclaren', name: 'McLaren Cam', brand: 'McLaren GT', color: '#f97316', accent: '#0f172a', stripe: '#ffffff', baseSpd: 4.4 }
    ]
  },
  dino: {
    id: 'dino',
    title: '🦖 Khủng Long Chạy Đua',
    introKey: 'arcade_intro_dino',
    desc: 'Điều khiển chú Khủng Long chạy lắt léo qua đá cuội, ăn đùi gà tăng tốc để vượt 3 bạn Khủng Long!',
    finishDist: 1700,
    heroes: [
      { id: 'trex', name: 'T-Rex Vua Đỏ', icon: '🦖', color: '#ef4444', belly: '#fca5a5', crest: '#b91c1c', baseSpd: 4.35 },
      { id: 'triceratops', name: 'Ba Sừng Xanh Lá', icon: '🦕', color: '#10b981', belly: '#a7f3d0', crest: '#047857', baseSpd: 4.3 },
      { id: 'raptor', name: 'Raptor Tia Chớp', icon: '🦎', color: '#f59e0b', belly: '#fef08a', crest: '#b45309', baseSpd: 4.4 },
      { id: 'stego', name: 'Stego Giáp Tím', icon: '🦴', color: '#8b5cf6', belly: '#ddd6fe', crest: '#5b21b6', baseSpd: 4.25 }
    ]
  },
  dragon: {
    id: 'dragon',
    title: '🐉 Rồng Bay Vượt Mây',
    introKey: 'arcade_intro_dragon',
    desc: 'Lái chú Rồng Thần vỗ cánh bay cao thấp né mây sét, nhặt sao vàng và đua cùng 3 Rồng bạn!',
    finishDist: 1750,
    heroes: [
      { id: 'fire', name: 'Rồng Lửa Đỏ', icon: '🔥', color: '#ef4444', wing: '#f97316', glow: '#fef08a', baseSpd: 4.4 },
      { id: 'gold', name: 'Rồng Vàng Hoàng Kim', icon: '✨', color: '#eab308', wing: '#fde047', glow: '#ffffff', baseSpd: 4.45 },
      { id: 'ice', name: 'Rồng Băng Tuyết', icon: '❄️', color: '#38bdf8', wing: '#bae6fd', glow: '#e0f2fe', baseSpd: 4.35 },
      { id: 'emerald', name: 'Rồng Rừng Xanh', icon: '🌿', color: '#10b981', wing: '#6ee7b7', glow: '#d1fae5', baseSpd: 4.3 }
    ]
  }
};

let currentArcadeMode = 'car';
let arcadeSelectedHero = { car: 'lambo', dino: 'trex', dragon: 'fire' };
let arcadeRafId = null;
let arcadeLastTs = 0;
let arcadeEventsBound = false;
const arcadeKeys = { up: false, down: false, left: false, right: false };

let arcadeState = {
  phase: 'ready', // 'ready' | 'running' | 'finished'
  playerDist: 0,
  playerX: 380,
  playerY: 320,
  playerSpeed: 0,
  boostTimer: 0,
  stunTimer: 0,
  starsPicked: 0,
  rivals: [],
  items: [], // { kind: 'star' | 'boost' | 'obstacle', x, y, dist, lane, icon }
  bgOffset: 0,
  rank: 1,
  finishTime: 0,
  tick: 0
};

function stopArcadeGameLoop() {
  if (arcadeRafId) {
    cancelAnimationFrame(arcadeRafId);
    arcadeRafId = null;
  }
  arcadeKeys.up = arcadeKeys.down = arcadeKeys.left = arcadeKeys.right = false;
  document.querySelectorAll('.dpad-btn.active').forEach(b => b.classList.remove('active'));
}

function renderArcadeHub() {
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
  cfg.heroes.slice(0, 3).forEach(hero => {
    const btn = document.createElement('button');
    btn.className = `arcade-hero-chip ${hero.id === chosenId ? 'active' : ''}`;
    btn.style.setProperty('--hero-col', hero.color);
    const badge = currentArcadeMode === 'car' ? '🏎️' : hero.icon;
    btn.innerHTML = `<span class="hero-dot" style="background:${hero.color};"></span><span>${badge} ${hero.name}</span>`;
    btn.onclick = () => {
      arcadeSelectedHero[currentArcadeMode] = hero.id;
      window.soundMgr?.playPop();
      renderArcadeHeroPicker();
      if (arcadeState.phase !== 'running') resetArcadeRace(false);
    };
    wrap.appendChild(btn);
  });
}

function resetArcadeRace(autoStart = false) {
  stopArcadeGameLoop();
  const cfg = ARCADE_MODES[currentArcadeMode];
  const chosenId = arcadeSelectedHero[currentArcadeMode];
  const hero = cfg.heroes.find(h => h.id === chosenId) || cfg.heroes[0];
  const rivalsPool = cfg.heroes.filter(h => h.id !== hero.id).slice(0, 3);

  const isVerticalCar = currentArcadeMode === 'car';
  const carLanes = [205, 320, 440, 555];
  const sideLanes = [115, 220, 325];

  arcadeState = {
    phase: autoStart ? 'running' : 'ready',
    playerDist: 0,
    playerX: isVerticalCar ? carLanes[1] : 160,
    playerY: isVerticalCar ? 330 : sideLanes[1],
    playerSpeed: autoStart ? hero.baseSpd : 0,
    boostTimer: 0,
    stunTimer: 0,
    starsPicked: 0,
    rank: 1,
    bgOffset: 0,
    tick: 0,
    rivals: rivalsPool.map((r, idx) => ({
      hero: r,
      dist: isVerticalCar ? 40 + idx * 12 : 20 + idx * 10,
      x: isVerticalCar ? carLanes[idx === 1 ? 3 : idx] : 150,
      y: isVerticalCar ? 250 : sideLanes[idx % 3],
      targetLane: idx,
      speedBias: 0.9 + idx * 0.055,
      wobbleSeed: idx * 2.1
    })),
    items: buildInitialTrackItems(currentArcadeMode, cfg.finishDist)
  };

  const resBanner = document.getElementById('arcadeResultBanner');
  if (resBanner) resBanner.style.display = 'none';
  const btnStart = document.getElementById('btnArcadeStart');
  if (btnStart) btnStart.innerHTML = autoStart ? '<span>🔄</span> Chơi lại ván mới' : '<span>🏁</span> BẮT ĐẦU ĐUA!';

  updateArcadeHud();
  drawArcadeFrame();

  if (autoStart) {
    window.soundMgr?.playAudioFile('arcade_start', null, 'Chuẩn bị... ba, hai, một... Xuất phát!');
    arcadeLastTs = performance.now();
    arcadeRafId = requestAnimationFrame(arcadeTick);
  }
}

function buildInitialTrackItems(mode, finishDist) {
  const list = [];
  const carLanes = [205, 320, 440, 555];
  const sideLanes = [110, 215, 320];

  for (let d = 180; d < finishDist - 120; d += 120) {
    const r = Math.random();
    const laneIdx = Math.floor(Math.random() * (mode === 'car' ? 4 : 3));
    const lanePos = mode === 'car' ? carLanes[laneIdx] : sideLanes[laneIdx];
    const kind = r < 0.45 ? 'star' : (r < 0.7 ? 'boost' : 'obstacle');
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

function bindArcadeEventsOnce() {
  if (arcadeEventsBound) return;
  arcadeEventsBound = true;

  const btnStart = document.getElementById('btnArcadeStart');
  if (btnStart) {
    btnStart.onclick = () => {
      window.soundMgr?.playClick();
      resetArcadeRace(true);
    };
  }
  const btnReplay = document.getElementById('btnArcadeReplay');
  if (btnReplay) {
    btnReplay.onclick = () => {
      window.soundMgr?.playClick();
      resetArcadeRace(true);
    };
  }
  const btnTip = document.getElementById('btnArcadeSoundTip');
  if (btnTip) {
    btnTip.onclick = () => {
      const cfg = ARCADE_MODES[currentArcadeMode];
      window.soundMgr?.playClick();
      window.soundMgr?.playAudioFile(cfg.introKey, null, cfg.desc);
    };
  }

  const bindPad = (id, dir) => {
    const el = document.getElementById(id);
    if (!el) return;
    const press = (e) => {
      if (e) e.preventDefault();
      arcadeKeys[dir] = true;
      el.classList.add('active');
      if (arcadeState.phase === 'ready') resetArcadeRace(true);
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
    if (arcadeState.phase === 'ready') resetArcadeRace(true);
  });
  window.addEventListener('keyup', (e) => {
    const map = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
    const dir = map[e.code];
    if (dir) arcadeKeys[dir] = false;
  });
}

function arcadeTick(ts) {
  if (typeof currentMode === 'undefined' || currentMode !== 'arcade' || arcadeState.phase !== 'running') {
    arcadeRafId = null;
    return;
  }

  const dt = Math.min(2.2, Math.max(0.4, (ts - arcadeLastTs) / 16.67));
  arcadeLastTs = ts;
  arcadeState.tick += dt;

  const cfg = ARCADE_MODES[currentArcadeMode];
  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero[currentArcadeMode]) || cfg.heroes[0];

  if (arcadeState.boostTimer > 0) arcadeState.boostTimer = Math.max(0, arcadeState.boostTimer - dt);
  if (arcadeState.stunTimer > 0) arcadeState.stunTimer = Math.max(0, arcadeState.stunTimer - dt);

  const boostMult = arcadeState.boostTimer > 0 ? 1.48 : 1.0;
  const stunMult = arcadeState.stunTimer > 0 ? 0.55 : 1.0;

  if (currentArcadeMode === 'car') {
    // 4-lane highway (Bottom to Top): Left/Right steer, Up speeds up, Down slows gently
    const steerSpd = 5.4 * dt;
    if (arcadeKeys.left) arcadeState.playerX -= steerSpd;
    if (arcadeKeys.right) arcadeState.playerX += steerSpd;
    arcadeState.playerX = Math.max(175, Math.min(585, arcadeState.playerX));

    let targetSpd = hero.baseSpd;
    if (arcadeKeys.up) targetSpd = hero.baseSpd * 1.45;
    else if (arcadeKeys.down) targetSpd = hero.baseSpd * 0.55;
    targetSpd *= boostMult * stunMult;

    arcadeState.playerSpeed += (targetSpd - arcadeState.playerSpeed) * 0.14 * dt;
    arcadeState.playerDist += arcadeState.playerSpeed * dt;
    arcadeState.bgOffset = (arcadeState.bgOffset + arcadeState.playerSpeed * 2.5 * dt) % 80;
    arcadeState.playerY = 330 - (arcadeKeys.up ? 28 : (arcadeKeys.down ? -14 : 0));
  } else {
    // Side-scrolling horizontal track (Left to Right): Up/Down height & Right/Left speed
    const vertSpd = (currentArcadeMode === 'dragon' ? 4.8 : 4.4) * dt;
    if (arcadeKeys.up) arcadeState.playerY -= vertSpd;
    if (arcadeKeys.down) arcadeState.playerY += vertSpd;
    const minY = currentArcadeMode === 'dragon' ? 68 : 96;
    const maxY = currentArcadeMode === 'dragon' ? 355 : 340;
    arcadeState.playerY = Math.max(minY, Math.min(maxY, arcadeState.playerY));

    let targetSpd = hero.baseSpd;
    if (arcadeKeys.right) targetSpd = hero.baseSpd * 1.45;
    else if (arcadeKeys.left) targetSpd = hero.baseSpd * 0.58;
    targetSpd *= boostMult * stunMult;

    arcadeState.playerSpeed += (targetSpd - arcadeState.playerSpeed) * 0.14 * dt;
    arcadeState.playerDist += arcadeState.playerSpeed * dt;
    arcadeState.bgOffset = (arcadeState.bgOffset + arcadeState.playerSpeed * 2.2 * dt) % 160;
    arcadeState.playerX = 180 + (arcadeKeys.right ? 42 : (arcadeKeys.left ? -36 : 0));
  }

  // Update AI rivals smoothly
  arcadeState.rivals.forEach((rv, i) => {
    const wave = Math.sin(arcadeState.tick * 0.03 + rv.wobbleSeed) * 0.35;
    const spd = rv.hero.baseSpd * rv.speedBias + wave;
    rv.dist += Math.max(2.1, spd) * dt;
    if (currentArcadeMode === 'car') {
      rv.x += Math.sin(arcadeState.tick * 0.02 + rv.wobbleSeed) * 0.5 * dt;
      rv.x = Math.max(175, Math.min(585, rv.x));
    } else if (currentArcadeMode === 'dragon') {
      rv.y += Math.sin(arcadeState.tick * 0.045 + rv.wobbleSeed) * 1.1 * dt;
    }
  });

  // Check item & obstacle pickups
  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const diffD = Math.abs(it.dist - arcadeState.playerDist);
    const diffLateral = currentArcadeMode === 'car'
      ? Math.abs(it.lanePos - arcadeState.playerX)
      : Math.abs(it.lanePos - arcadeState.playerY);
    if (diffD < 26 && diffLateral < 42) {
      it.collected = true;
      if (it.kind === 'star') {
        arcadeState.starsPicked++;
        window.soundMgr?.playPop();
      } else if (it.kind === 'boost') {
        arcadeState.boostTimer = 75;
        arcadeState.starsPicked++;
        window.soundMgr?.playToneFreq(740, 'triangle', 0.18, 0, 0.22);
      } else {
        arcadeState.stunTimer = 28;
        window.soundMgr?.playToneFreq(190, 'sawtooth', 0.15, 0, 0.18);
      }
    }
  });

  // Compute rank (1 = leading)
  let ahead = 0;
  arcadeState.rivals.forEach(rv => { if (rv.dist > arcadeState.playerDist) ahead++; });
  arcadeState.rank = ahead + 1;

  updateArcadeHud();
  drawArcadeFrame();

  if (arcadeState.playerDist >= cfg.finishDist) {
    finishArcadeRace();
    return;
  }

  arcadeRafId = requestAnimationFrame(arcadeTick);
}

function updateArcadeHud() {
  const cfg = ARCADE_MODES[currentArcadeMode];
  const pct = Math.min(100, Math.round((arcadeState.playerDist / cfg.finishDist) * 100));
  const rEl = document.getElementById('arcadeStatusRank');
  const dEl = document.getElementById('arcadeStatusDist');
  const sEl = document.getElementById('arcadeStatusStars');
  if (rEl) rEl.innerText = `🏆 Hạng ${arcadeState.rank} / 4`;
  if (dEl) dEl.innerText = `🏁 Đường đua: ${pct}%`;
  if (sEl) sEl.innerText = `⭐ Nhặt: ${arcadeState.starsPicked}`;
}

function finishArcadeRace() {
  arcadeState.phase = 'finished';
  stopArcadeGameLoop();
  drawArcadeFrame();

  const rank = arcadeState.rank;
  const reward = (rank === 1 ? 20 : (rank === 2 ? 15 : 10)) + Math.min(10, arcadeState.starsPicked);
  const resBanner = document.getElementById('arcadeResultBanner');
  const resTitle = document.getElementById('arcadeResultTitle');
  const resDesc = document.getElementById('arcadeResultDesc');

  const medals = { 1: '🏆 VỀ NHẤT SIÊU TỐC!', 2: '🥈 VỀ NHÌ XUẤT SẮC!', 3: '🥉 VỀ BA GIỎI LẮM!', 4: '🎉 HOÀN THÀNH ĐƯỜNG ĐUA!' };
  if (resTitle) resTitle.innerText = medals[rank] || medals[4];
  if (resDesc) {
    resDesc.innerText = `Bảo Long hoàn thành hạng ${rank}/4, nhặt ${arcadeState.starsPicked} ngôi sao và nhận +${reward} ⭐ vào Kho Báu!`;
  }
  if (resBanner) resBanner.style.display = 'flex';

  if (typeof fireConfetti === 'function') fireConfetti();
  window.soundMgr?.playVictory();
  const winKey = rank === 1 ? 'arcade_rank_1' : (rank === 2 ? 'arcade_rank_2' : 'arcade_rank_3');
  window.soundMgr?.playAudioFile(winKey, null, medals[rank]);
  if (typeof awardStars === 'function') awardStars(reward, `Đua ${ARCADE_MODES[currentArcadeMode].title} Hạng ${rank}!`);
}

function drawArcadeFrame() {
  const cv = document.getElementById('arcadeCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);

  if (currentArcadeMode === 'car') {
    drawCarRaceScene(ctx, W, H);
  } else if (currentArcadeMode === 'dino') {
    drawDinoRaceScene(ctx, W, H);
  } else {
    drawDragonRaceScene(ctx, W, H);
  }

  // Draw finish progress ribbon on top inside canvas
  const cfg = ARCADE_MODES[currentArcadeMode];
  const pct = Math.min(1, arcadeState.playerDist / cfg.finishDist);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fillRect(14, 10, W - 28, 12);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(14, 10, (W - 28) * pct, 12);
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('🏁', W - 28, 21);
}

function drawSupercarSprite(ctx, x, y, hero, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);

  // Soft shadow
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(0, 4, 24, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tires
  ctx.fillStyle = '#0f172a';
  [[-21, -18], [15, -18], [-22, 12], [16, 12]].forEach(([wx, wy]) => {
    ctx.fillRect(wx, wy, 7, 15);
  });

  // Aerodynamic supercar chassis
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(18, -16);
  ctx.lineTo(20, 26);
  ctx.lineTo(13, 35);
  ctx.lineTo(-13, 35);
  ctx.lineTo(-20, 26);
  ctx.lineTo(-18, -16);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = isPlayer ? 2.5 : 1.5;
  ctx.strokeStyle = isPlayer ? '#ffffff' : '#1e293b';
  ctx.stroke();

  // Racing stripe + cockpit windshield
  ctx.fillStyle = hero.stripe;
  ctx.fillRect(-3.5, -33, 7, 65);
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(-11, -10);
  ctx.lineTo(11, -10);
  ctx.lineTo(13, 8);
  ctx.lineTo(-13, 8);
  ctx.closePath();
  ctx.fill();

  // Rear GT spoiler wing
  ctx.fillStyle = hero.accent;
  ctx.fillRect(-19, 28, 38, 6);

  // Headlights
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-14, -31, 6, 4);
  ctx.fillRect(8, -31, 6, 4);

  if (isBoosting) {
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-9, 35); ctx.lineTo(-5, 52); ctx.lineTo(-1, 35);
    ctx.moveTo(1, 35); ctx.lineTo(5, 52); ctx.lineTo(9, 35);
    ctx.fill();
  }

  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.brand.split(' ')[0], 0, -43);
  ctx.restore();
}

function drawCarRaceScene(ctx, W, H) {
  // Green grass shoulders + asphalt 4-lane road
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#334155';
  ctx.fillRect(140, 0, 480, H);

  // Red-white F1 curbs
  for (let y = -80 + (arcadeState.bgOffset % 80); y < H; y += 40) {
    ctx.fillStyle = (Math.floor(y / 40) % 2 === 0) ? '#ef4444' : '#ffffff';
    ctx.fillRect(126, y, 14, 40);
    ctx.fillRect(620, y, 14, 40);
  }

  // Lane dashes
  ctx.fillStyle = '#e2e8f0';
  [260, 380, 500].forEach(lx => {
    for (let y = -80 + (arcadeState.bgOffset % 80); y < H; y += 80) {
      ctx.fillRect(lx - 3, y, 6, 44);
    }
  });

  const cfg = ARCADE_MODES.car;
  const finishY = arcadeState.playerY - (cfg.finishDist - arcadeState.playerDist) * 1.65;
  if (finishY > -60 && finishY < H + 60) {
    for (let cx = 140; cx < 620; cx += 24) {
      for (let r = 0; r < 2; r++) {
        ctx.fillStyle = ((cx / 24 + r) % 2 === 0) ? '#0f172a' : '#ffffff';
        ctx.fillRect(cx, finishY + r * 14, 24, 14);
      }
    }
  }

  // Track pickups / cones relative to player
  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const screenY = arcadeState.playerY - (it.dist - arcadeState.playerDist) * 1.65;
    if (screenY < -40 || screenY > H + 40) return;
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, it.lanePos, screenY);
  });

  // Rival cars
  arcadeState.rivals.forEach(rv => {
    const ry = arcadeState.playerY - (rv.dist - arcadeState.playerDist) * 1.65;
    if (ry > -70 && ry < H + 70) {
      drawSupercarSprite(ctx, rv.x, ry, rv.hero, false, false);
    }
  });

  // Player car
  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.car) || cfg.heroes[0];
  drawSupercarSprite(ctx, arcadeState.playerX, arcadeState.playerY, hero, arcadeState.boostTimer > 0 || arcadeKeys.up, true);
}

function drawDinoSprite(ctx, x, y, hero, tick, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);
  const legSwing = Math.sin(tick * 0.45) * 7;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath();
  ctx.ellipse(0, 26, 26, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.fillStyle = hero.crest;
  ctx.fillRect(-10 + legSwing, 10, 8, 16);
  ctx.fillRect(2 - legSwing, 10, 8, 16);

  // Tail + Body
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.moveTo(-34, 4);
  ctx.quadraticCurveTo(-16, -12, 10, -10);
  ctx.quadraticCurveTo(22, -4, 16, 14);
  ctx.lineTo(-14, 14);
  ctx.closePath();
  ctx.fill();

  // Belly patch
  ctx.fillStyle = hero.belly;
  ctx.beginPath();
  ctx.ellipse(2, 4, 11, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Big Dino head facing right
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.roundRect(6, -24, 24, 18, 7);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(21, -18, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(22, -18, 2, 0, Math.PI * 2);
  ctx.fill();

  if (hero.id === 'triceratops') {
    ctx.fillStyle = '#fef08a';
    ctx.beginPath(); ctx.moveTo(28, -20); ctx.lineTo(38, -25); ctx.lineTo(29, -15); ctx.fill();
  }

  if (isBoosting) {
    ctx.font = '18px sans-serif';
    ctx.fillText('💨', -44, 6);
  }

  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = isPlayer ? '#ffffff' : '#064e3b';
  if (isPlayer) {
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-32, -42, 66, 15);
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.name.split(' ')[0], 4, -31);
  ctx.restore();
}

function drawDinoRaceScene(ctx, W, H) {
  // Prehistoric sky + volcano hills + 3 jungle tracks
  const sky = ctx.createLinearGradient(0, 0, 0, 88);
  sky.addColorStop(0, '#7dd3fc');
  sky.addColorStop(1, '#bae6fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, 88);

  // Parallax palm trees & volcanoes
  for (let px = -arcadeState.bgOffset; px < W + 160; px += 160) {
    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.moveTo(px, 88); ctx.lineTo(px + 55, 36); ctx.lineTo(px + 110, 88);
    ctx.fill();
    ctx.font = '30px sans-serif';
    ctx.fillText('🌴', px + 115, 78);
  }

  // Track ground & 3 dirt lanes
  ctx.fillStyle = '#86efac';
  ctx.fillRect(0, 88, W, H - 88);
  [96, 200, 304].forEach((ly, i) => {
    ctx.fillStyle = i % 2 === 0 ? '#fde68a' : '#fef3c7';
    ctx.fillRect(0, ly, W, 94);
    ctx.strokeStyle = '#f59e0b';
    ctx.strokeRect(0, ly, W, 94);
  });

  const cfg = ARCADE_MODES.dino;
  const finishX = arcadeState.playerX + (cfg.finishDist - arcadeState.playerDist) * 1.5;
  if (finishX > -40 && finishX < W + 60) {
    for (let cy = 96; cy < H; cy += 22) {
      ctx.fillStyle = ((cy / 22) % 2 === 0) ? '#0f172a' : '#ffffff';
      ctx.fillRect(finishX, cy, 16, 22);
    }
  }

  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const sx = arcadeState.playerX + (it.dist - arcadeState.playerDist) * 1.5;
    if (sx < -40 || sx > W + 40) return;
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, sx, it.lanePos + 24);
  });

  arcadeState.rivals.forEach(rv => {
    const rx = arcadeState.playerX + (rv.dist - arcadeState.playerDist) * 1.5;
    if (rx > -70 && rx < W + 70) {
      drawDinoSprite(ctx, rx, rv.y + 20, rv.hero, arcadeState.tick + rv.wobbleSeed * 5, false, false);
    }
  });

  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.dino) || cfg.heroes[0];
  drawDinoSprite(ctx, arcadeState.playerX, arcadeState.playerY + 20, hero, arcadeState.tick, arcadeState.boostTimer > 0 || arcadeKeys.right, true);
}

function drawDragonSprite(ctx, x, y, hero, tick, isBoosting, isPlayer) {
  ctx.save();
  ctx.translate(x, y);
  const flap = Math.sin(tick * 0.35) * 16;

  // Wings
  ctx.fillStyle = hero.wing;
  ctx.beginPath();
  ctx.moveTo(-6, -4);
  ctx.lineTo(-22, -26 + flap);
  ctx.lineTo(10, -14 + flap * 0.6);
  ctx.closePath();
  ctx.fill();

  // Tail
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(-40, -6 + Math.sin(tick * 0.25) * 5);
  ctx.lineTo(-14, 10);
  ctx.closePath();
  ctx.fill();

  // Body & Head
  ctx.fillStyle = hero.color;
  ctx.beginPath();
  ctx.ellipse(0, 4, 22, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(14, -14, 22, 16, 7);
  ctx.fill();

  // Dragon Horns
  ctx.fillStyle = hero.glow;
  ctx.beginPath(); ctx.moveTo(18, -14); ctx.lineTo(14, -24); ctx.lineTo(23, -14); ctx.fill();

  // Eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(28, -8, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath(); ctx.arc(29, -8, 1.8, 0, Math.PI * 2); ctx.fill();

  if (isBoosting) {
    ctx.font = '20px sans-serif';
    ctx.fillText('🔥', 38, -2);
  }

  ctx.font = 'bold 11px Nunito, sans-serif';
  ctx.textAlign = 'center';
  if (isPlayer) {
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-30, -38, 66, 15);
    ctx.fillStyle = '#ffffff';
  } else {
    ctx.fillStyle = '#1e293b';
  }
  ctx.fillText(isPlayer ? '⭐ BẢO LONG' : hero.name.split(' ')[1] || hero.name, 4, -27);
  ctx.restore();
}

function drawDragonRaceScene(ctx, W, H) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0284c7');
  grad.addColorStop(0.55, '#38bdf8');
  grad.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Drifting clouds
  for (let cx = -arcadeState.bgOffset; cx < W + 160; cx += 160) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.beginPath();
    ctx.arc(cx + 40, 82, 22, 0, Math.PI * 2);
    ctx.arc(cx + 66, 76, 26, 0, Math.PI * 2);
    ctx.arc(cx + 94, 82, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  const cfg = ARCADE_MODES.dragon;
  const finishX = arcadeState.playerX + (cfg.finishDist - arcadeState.playerDist) * 1.5;
  if (finishX > -40 && finishX < W + 80) {
    ctx.font = '64px sans-serif';
    ctx.fillText('🏰', finishX, 220);
    for (let cy = 30; cy < H; cy += 24) {
      ctx.fillStyle = ((cy / 24) % 2 === 0) ? '#facc15' : '#ef4444';
      ctx.fillRect(finishX - 10, cy, 8, 24);
    }
  }

  arcadeState.items.forEach(it => {
    if (it.collected) return;
    const sx = arcadeState.playerX + (it.dist - arcadeState.playerDist) * 1.5;
    if (sx < -40 || sx > W + 40) return;
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, sx, it.lanePos);
  });

  arcadeState.rivals.forEach(rv => {
    const rx = arcadeState.playerX + (rv.dist - arcadeState.playerDist) * 1.5;
    if (rx > -70 && rx < W + 70) {
      drawDragonSprite(ctx, rx, rv.y, rv.hero, arcadeState.tick + rv.wobbleSeed * 4, false, false);
    }
  });

  const hero = cfg.heroes.find(h => h.id === arcadeSelectedHero.dragon) || cfg.heroes[0];
  drawDragonSprite(ctx, arcadeState.playerX, arcadeState.playerY, hero, arcadeState.tick, arcadeState.boostTimer > 0 || arcadeKeys.right, true);
}
