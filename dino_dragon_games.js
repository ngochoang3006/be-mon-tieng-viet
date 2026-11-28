/* ========================================================
   DINO & DRAGON MINI-GAMES MODULE
   - 🥚 Ấp Trứng Rồng Thần (8 Eggs + Crack SVG + Riddle + Photo Reveal)
   - 🔥 Rồng Luyện Chữ Bay (Target Audio Arena + Combo Streak)
   - 🍖 Cho Khủng Long Ăn Chữ (Hungry Dino Belly Meter + Word Feed)
   - 🥚 Ấp Trứng Khủng Long Bí Ẩn (10 Fossil/Amber Eggs + Album)
   ======================================================== */
(function () {
  'use strict';

  const ROUNDS_ARENA = 6;

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function loadHatchedSet(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? new Set(parsed) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveHatchedSet(storageKey, setObj) {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...setObj]));
    } catch (e) {}
  }

  function getVocabWords(lessonIds) {
    if (typeof VOCAB_LESSONS === 'undefined') return [];
    const wanted = new Set(lessonIds);
    const out = [];
    VOCAB_LESSONS.forEach(lesson => {
      if (wanted.has(lesson.id) && Array.isArray(lesson.words)) {
        lesson.words.forEach(w => out.push(w));
      }
    });
    return out;
  }

  function renderCrackSvg(taps, themeKind) {
    const isDragon = themeKind === 'dragon';
    const baseTop = isDragon ? '#fca5a5' : '#fde68a';
    const baseMid = isDragon ? '#ef4444' : '#f59e0b';
    const baseBot = isDragon ? '#991b1b' : '#b45309';
    const spotCol = isDragon ? 'rgba(254, 240, 138, 0.5)' : 'rgba(120, 53, 15, 0.25)';

    const crack1 = taps >= 1
      ? '<path d="M72 34 L62 56 L78 68 L66 84" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
      : '';
    const crack2 = taps >= 2
      ? '<path d="M66 84 L50 96 L64 114 L54 128 M78 68 L98 76 L88 94" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
      : '';
    const glow3 = taps >= 3
      ? '<path d="M58 58 L84 68 L72 95" fill="none" stroke="#fef08a" stroke-width="4" stroke-linecap="round"/><circle cx="70" cy="86" r="18" fill="rgba(254,240,138,0.45)"/>'
      : '';

    return `
      <svg class="egg-hatch-svg ${taps > 0 ? 'egg-is-tapped' : ''}" viewBox="0 0 140 160" width="128" height="146" aria-hidden="true">
        <defs>
          <radialGradient id="eggGrad_${themeKind}" cx="38%" cy="30%" r="70%">
            <stop offset="0%" stop-color="${baseTop}"/>
            <stop offset="55%" stop-color="${baseMid}"/>
            <stop offset="100%" stop-color="${baseBot}"/>
          </radialGradient>
        </defs>
        <ellipse cx="70" cy="144" rx="44" ry="9" fill="rgba(15,23,42,0.18)"/>
        <path d="M70 16 C40 16 22 62 22 98 C22 128 42 142 70 142 C98 142 118 128 118 98 C118 62 100 16 70 16 Z"
              fill="url(#eggGrad_${themeKind})" stroke="#ffffff" stroke-width="3"/>
        <circle cx="48" cy="64" r="7" fill="${spotCol}"/>
        <circle cx="90" cy="52" r="5" fill="${spotCol}"/>
        <circle cx="88" cy="108" r="9" fill="${spotCol}"/>
        <circle cx="46" cy="106" r="6" fill="${spotCol}"/>
        ${crack1}
        ${crack2}
        ${glow3}
      </svg>
    `;
  }

  function createEggHatchController(cfg) {
    let selectedId = null;
    let taps = 0;
    let stage = 'warm'; // 'warm' | 'riddle' | 'revealed'
    let riddleOpts = [];

    function getItems() {
      return typeof cfg.getItems === 'function' ? cfg.getItems() : [];
    }

    function pickInitialEgg() {
      const items = getItems();
      const hatched = loadHatchedSet(cfg.storageKey);
      const nextUnhatched = items.find(it => !hatched.has(it.id));
      const target = nextUnhatched || items[0];
      selectEgg(target ? target.id : null, false);
    }

    function selectEgg(id, withSound = true) {
      selectedId = id;
      taps = 0;
      stage = 'warm';
      riddleOpts = [];
      if (withSound) window.soundMgr?.playPop?.();
      render();
    }

    function buildRiddleOptions(target) {
      const others = shuffle(getItems().filter(x => x.id !== target.id)).slice(0, 2);
      return shuffle([target, ...others]);
    }

    function render() {
      const items = getItems();
      if (!items.length) return;
      if (!selectedId || !items.some(x => x.id === selectedId)) {
        selectedId = items[0].id;
      }
      const hatched = loadHatchedSet(cfg.storageKey);
      const pill = document.getElementById(cfg.ids.pill);
      const roster = document.getElementById(cfg.ids.roster);
      const nest = document.getElementById(cfg.ids.nest);
      if (!roster || !nest) return;

      if (pill) {
        pill.textContent = `${cfg.eggIcon} Đã ấp nở: ${hatched.size} / ${items.length} ${cfg.speciesNoun}`;
      }

      roster.innerHTML = '';
      items.forEach((it, idx) => {
        const isDone = hatched.has(it.id);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `egg-roster-btn ${it.id === selectedId ? 'is-active' : ''} ${isDone ? 'is-hatched' : ''}`;
        btn.innerHTML = isDone
          ? `<div class="egg-roster-photo">${it.icon}</div><div class="egg-roster-name">✅ ${it.word}</div>`
          : `<div class="egg-roster-shell">${cfg.eggIcon}</div><div class="egg-roster-name">Trứng #${idx + 1}</div>`;
        btn.onclick = () => selectEgg(it.id, true);
        roster.appendChild(btn);
      });

      const current = items.find(x => x.id === selectedId) || items[0];
      nest.innerHTML = '';

      if (stage === 'warm') {
        const pct = Math.round((taps / 3) * 100);
        const wrap = document.createElement('div');
        wrap.className = `egg-nest-card ${cfg.themeClass}`;
        wrap.innerHTML = `
          <div class="egg-warmth-row">
            <span class="egg-warmth-label">${cfg.warmPrompt} (${taps}/3 chạm)</span>
            <div class="egg-warmth-bar"><div class="egg-warmth-fill" style="width:${pct}%"></div></div>
          </div>
          <div class="egg-tap-stage" id="${cfg.ids.tapHost}"></div>
          <p class="egg-hint-fact">💡 Gợi ý bí mật: "${current.funFact}"</p>
          <div class="egg-nest-actions"></div>
        `;
        const tapHost = wrap.querySelector(`#${cfg.ids.tapHost}`);
        const tapBtn = document.createElement('button');
        tapBtn.type = 'button';
        tapBtn.className = 'egg-tap-btn';
        tapBtn.setAttribute('aria-label', `Chạm để ấp ${current.word}`);
        tapBtn.innerHTML = `${renderCrackSvg(taps, cfg.themeKind)}<span class="egg-tap-cta">${taps === 0 ? '👆 Chạm 3 lần để gõ vỏ trứng!' : (taps < 3 ? '💥 Sắp nứt rồi! Chạm tiếp nào!' : '✨ Nứt vỏ!')}</span>`;
        tapBtn.onclick = (e) => {
          taps++;
          window.soundMgr?.playPop?.();
          const rect = tapBtn.getBoundingClientRect();
          window.livingFX?.burst?.(e.clientX || (rect.left + rect.width / 2), e.clientY || (rect.top + rect.height / 2), cfg.fxKind, 14);
          if (taps >= 3) {
            stage = 'riddle';
            riddleOpts = buildRiddleOptions(current);
            render();
            setTimeout(() => window.soundMgr?.speakWordObj?.(current), 260);
          } else {
            render();
          }
        };
        tapHost.appendChild(tapBtn);

        const actions = wrap.querySelector('.egg-nest-actions');
        const hearBtn = document.createElement('button');
        hearBtn.type = 'button';
        hearBtn.className = 'btn-hear-hint';
        hearBtn.innerHTML = '<span>🔊</span> Nghe tiếng gọi từ trong trứng';
        hearBtn.onclick = () => {
          window.soundMgr?.playClick?.();
          window.soundMgr?.speakWordObj?.(current);
        };
        actions.appendChild(hearBtn);
        nest.appendChild(wrap);
      } else if (stage === 'riddle') {
        const box = document.createElement('div');
        box.className = `egg-nest-card ${cfg.themeClass}`;
        box.innerHTML = `
          <div class="egg-riddle-header">
            <h3 class="egg-riddle-title">🎉 Vỏ trứng nứt toác rồi! Bạn nào sắp chào đời thế?</h3>
            <p class="egg-hint-fact">🔍 "${current.funFact}"</p>
          </div>
          <div class="egg-nest-actions" id="${cfg.ids.riddleHearHost}"></div>
          <div class="egg-choices-grid" id="${cfg.ids.choicesHost}"></div>
        `;
        const hearHost = box.querySelector(`#${cfg.ids.riddleHearHost}`);
        const hearBtn = document.createElement('button');
        hearBtn.type = 'button';
        hearBtn.className = 'btn-hear-hint';
        hearBtn.innerHTML = '<span>🔊</span> Nghe lại tên bạn ấy';
        hearBtn.onclick = () => window.soundMgr?.speakWordObj?.(current);
        hearHost.appendChild(hearBtn);

        const choicesHost = box.querySelector(`#${cfg.ids.choicesHost}`);
        riddleOpts.forEach(opt => {
          const optBtn = document.createElement('button');
          optBtn.type = 'button';
          optBtn.className = 'egg-choice-btn';
          optBtn.innerHTML = `
            <div class="egg-choice-photo">${opt.icon}</div>
            <div class="egg-choice-word">${opt.word}</div>
            <div class="egg-choice-sub">${opt.dinoName || opt.word}</div>
          `;
          optBtn.onclick = (e) => {
            if (opt.id === current.id) {
              const isFirst = !hatched.has(current.id);
              hatched.add(current.id);
              saveHatchedSet(cfg.storageKey, hatched);
              stage = 'revealed';
              cfg.playRoar?.();
              window.soundMgr?.playVictory?.();
              window.fireConfetti?.();
              const r = optBtn.getBoundingClientRect();
              window.livingFX?.burst?.(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2, cfg.fxKind, 26);
              const coinGain = isFirst ? 5 : 2;
              window.awardCoins?.(coinGain);
              if (isFirst) window.awardStars?.(5, `Ấp nở thành công ${current.word}!`);
              window.recordAnswer?.(current.id, true, { label: current.word, mode: cfg.recordMode, audioKey: current.audioKey, noAutoCoin: true });
              window.markDailyStep?.('play');
              window.showToast?.(`🥚 Tuyệt vời! Bảo Long ấp nở ${current.dinoName || current.word} (+${coinGain} 🪙)!`);
              render();
            } else {
              optBtn.classList.add('is-wrong');
              window.soundMgr?.playWrong?.();
              window.soundMgr?.speakTryAgain?.();
              window.recordAnswer?.(current.id, false, { label: current.word, mode: cfg.recordMode, audioKey: current.audioKey, noAutoCoin: true });
            }
          };
          choicesHost.appendChild(optBtn);
        });
        nest.appendChild(box);
      } else {
        const rev = document.createElement('div');
        rev.className = `egg-reveal-card ${cfg.themeClass}`;
        rev.innerHTML = `
          <div class="egg-reveal-badge">✨ CHÀO MỪNG BẠN MỚI NỞ! 🎉</div>
          <div class="egg-reveal-photo">${current.icon}</div>
          <h3 class="egg-reveal-name">${current.dinoName || current.word}</h3>
          <div class="egg-reveal-ja">🇯🇵 ${current.ja || ''}</div>
          <p class="egg-reveal-fact">${current.funFact}</p>
          <div class="egg-nest-actions" id="${cfg.ids.revealActions}"></div>
        `;
        const actHost = rev.querySelector(`#${cfg.ids.revealActions}`);
        const hearBtn = document.createElement('button');
        hearBtn.type = 'button';
        hearBtn.className = 'btn-hear-hint';
        hearBtn.innerHTML = `<span>🔊</span> Nghe đánh vần "${current.word}"`;
        hearBtn.onclick = () => {
          if (current.spellKey) window.soundMgr?.playAudioFile?.(current.spellKey, null, current.spellText);
          else window.soundMgr?.speakWordObj?.(current);
        };
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'challenge-btn';
        nextBtn.innerHTML = `${cfg.eggIcon} Ấp quả trứng kế tiếp ➡️`;
        nextBtn.onclick = () => {
          const all = getItems();
          const hatchedNow = loadHatchedSet(cfg.storageKey);
          const curIdx = all.findIndex(x => x.id === current.id);
          const next = all.find(x => !hatchedNow.has(x.id)) || all[(curIdx + 1) % all.length];
          selectEgg(next.id, true);
        };
        actHost.appendChild(hearBtn);
        actHost.appendChild(nextBtn);
        nest.appendChild(rev);
      }
    }

    return {
      init() {
        pickInitialEgg();
      }
    };
  }

  function createArenaFeedGame(cfg) {
    let rounds = [];
    let roundIdx = 0;
    let streak = 0;
    let arenaEpoch = 0;

    function buildRounds() {
      const pool = cfg.getPool();
      const shuffled = shuffle(pool);
      const selected = shuffled.slice(0, ROUNDS_ARENA);
      const hosts = shuffle(cfg.getHosts());
      return selected.map((target, i) => {
        const decoys = shuffle(pool.filter(x => x.id !== target.id && x.word !== target.word)).slice(0, 3);
        return {
          host: hosts[i % hosts.length],
          target,
          options: shuffle([target, ...decoys])
        };
      });
    }

    function speakCurrent() {
      const r = rounds[roundIdx];
      if (r && r.target) window.soundMgr?.speakWordObj?.(r.target);
    }

    function renderRound() {
      arenaEpoch++;
      const myNav = window.appNavEpoch || 0;
      const myEp = arenaEpoch;

      const playEl = document.getElementById(cfg.ids.playStage);
      const vicEl = document.getElementById(cfg.ids.victoryStage);
      const roundText = document.getElementById(cfg.ids.roundText);
      const streakText = document.getElementById(cfg.ids.streakText);
      const avatarBox = document.getElementById(cfg.ids.avatarBox);
      const promptEl = document.getElementById(cfg.ids.prompt);
      const grid = document.getElementById(cfg.ids.grid);
      const hearBtn = document.getElementById(cfg.ids.hearBtn);

      if (roundIdx >= rounds.length) {
        window.fireConfetti?.();
        cfg.playRoar?.();
        window.soundMgr?.playVictory?.();
        window.awardStars?.(10, cfg.victoryAwardMsg);
        window.markDailyStep?.('play');
        if (playEl) playEl.style.display = 'none';
        if (vicEl) vicEl.style.display = 'block';
        const desc = document.getElementById(cfg.ids.victoryDesc);
        if (desc) desc.textContent = `Bảo Long hoàn thành xuất sắc ${ROUNDS_ARENA} lượt với chuỗi lửa 🔥 x${streak} (+10 ⭐ vào Kho Báu)!`;
        return;
      }

      if (playEl) playEl.style.display = 'block';
      if (vicEl) vicEl.style.display = 'none';

      const cur = rounds[roundIdx];
      if (roundText) roundText.textContent = `${cfg.progressLabel} ${roundIdx + 1} / ${rounds.length}`;
      if (streakText) streakText.textContent = `🔥 Chuỗi x${streak}`;
      if (promptEl) promptEl.innerHTML = `${cfg.promptPrefix} <strong>"${cur.target.word}"</strong>!`;

      if (avatarBox && cur.host) {
        avatarBox.innerHTML = `
          <div class="arena-host-photo">${cur.host.icon}</div>
          <div class="arena-host-meta">
            <div class="arena-host-name">${cur.host.dinoName || cur.host.word}</div>
            <div class="arena-host-meter-wrap">
              <div class="arena-host-meter-bar"><div class="arena-host-meter-fill" style="width:${Math.round((roundIdx / rounds.length) * 100)}%"></div></div>
            </div>
          </div>
        `;
        avatarBox.classList.remove('is-hit-happy');
      }

      if (hearBtn) {
        hearBtn.onclick = () => {
          window.soundMgr?.playClick?.();
          speakCurrent();
        };
      }

      if (!grid) return;
      grid.innerHTML = '';
      let locked = false;

      cur.options.forEach((opt, idx) => {
        const slot = document.createElement('div');
        slot.className = 'arena-target-slot';

        const mainBtn = document.createElement('button');
        mainBtn.type = 'button';
        mainBtn.className = `arena-target-btn ${cfg.targetThemeClass}`;
        const badge = cfg.badgePool[idx % cfg.badgePool.length];
        const hasImg = Boolean(opt.icon && opt.icon.includes('<img'));
        const previewHtml = hasImg
          ? `<span class="arena-target-thumb">${opt.icon}</span>`
          : `<span class="arena-target-ico">${opt.icon || badge}</span>`;
        mainBtn.innerHTML = `
          ${previewHtml}
          <span class="arena-target-word">${opt.word}</span>
        `;
        mainBtn.onclick = (e) => {
          if (locked) return;
          if (opt.id === cur.target.id || opt.word === cur.target.word) {
            locked = true;
            streak++;
            mainBtn.classList.add('is-correct');
            avatarBox?.classList.add('is-hit-happy');
            window.soundMgr?.playCorrect?.();
            const rect = mainBtn.getBoundingClientRect();
            window.livingFX?.burst?.(e.clientX || rect.left + rect.width / 2, e.clientY || rect.top + rect.height / 2, cfg.fxKind, 22);
            window.awardCoins?.(2);
            window.recordAnswer?.(cur.target.id || cur.target.word, true, { label: cur.target.word, mode: cfg.recordMode, audioKey: cur.target.audioKey, noAutoCoin: true });
            window.showToast?.(`${cfg.hitEmoji} Chính xác "${cur.target.word}"! (+2 🪙)`);
            window.soundMgr?.playPraiseThen?.(streak >= 3,
              () => (window.appNavEpoch || 0) === myNav && arenaEpoch === myEp,
              () => {
                roundIdx++;
                renderRound();
              }
            );
          } else {
            streak = 0;
            if (streakText) streakText.textContent = '🔥 Chuỗi x0';
            mainBtn.classList.add('is-wrong');
            window.soundMgr?.playWrong?.();
            window.soundMgr?.speakTryAgain?.();
            window.recordAnswer?.(cur.target.id || cur.target.word, false, { label: cur.target.word, mode: cfg.recordMode, audioKey: cur.target.audioKey, noAutoCoin: true });
          }
        };

        const spkBtn = document.createElement('button');
        spkBtn.type = 'button';
        spkBtn.className = 'arena-speak-mini';
        spkBtn.setAttribute('aria-label', `Nghe từ ${opt.word}`);
        spkBtn.textContent = '🔊';
        spkBtn.onclick = (e) => {
          e.stopPropagation();
          window.soundMgr?.playClick?.();
          window.soundMgr?.speakWordObj?.(opt);
        };

        slot.appendChild(mainBtn);
        slot.appendChild(spkBtn);
        grid.appendChild(slot);
      });

      setTimeout(() => {
        if ((window.appNavEpoch || 0) === myNav && arenaEpoch === myEp) {
          speakCurrent();
        }
      }, 280);
    }

    return {
      init() {
        rounds = buildRounds();
        roundIdx = 0;
        streak = 0;
        renderRound();
      }
    };
  }

  const dragonHatch = createEggHatchController({
    storageKey: 'baolong_hatched_dragons_v1',
    speciesNoun: 'Rồng Thần',
    eggIcon: '🥚',
    warmPrompt: '🔥 Ủ ấm Trứng Rồng',
    themeClass: 'theme-dragon-egg',
    themeKind: 'dragon',
    fxKind: 'dragon',
    recordMode: 'dragons',
    playRoar: () => window.soundMgr?.playDragonRoar?.(),
    getItems: () => (typeof DRAGON_LESSONS !== 'undefined' ? DRAGON_LESSONS : []),
    ids: {
      pill: 'dragonHatchStatsPill',
      roster: 'dragonHatchRoster',
      nest: 'dragonHatchNestHost',
      tapHost: 'dragonEggTapHost',
      riddleHearHost: 'dragonRiddleHearHost',
      choicesHost: 'dragonEggChoicesHost',
      revealActions: 'dragonRevealActionsHost'
    }
  });

  const dinoHatch = createEggHatchController({
    storageKey: 'baolong_hatched_dinos_v1',
    speciesNoun: 'Khủng Long',
    eggIcon: '🦴',
    warmPrompt: '🌋 Ủ ấm Trứng Khủng Long',
    themeClass: 'theme-dino-egg',
    themeKind: 'dino',
    fxKind: 'dino',
    recordMode: 'dino',
    playRoar: () => window.soundMgr?.playDinoRoar?.(),
    getItems: () => (typeof DINO_LESSONS !== 'undefined' ? DINO_LESSONS : []),
    ids: {
      pill: 'dinoHatchStatsPill',
      roster: 'dinoHatchRoster',
      nest: 'dinoHatchNestHost',
      tapHost: 'dinoEggTapHost',
      riddleHearHost: 'dinoRiddleHearHost',
      choicesHost: 'dinoEggChoicesHost',
      revealActions: 'dinoRevealActionsHost'
    }
  });

  const dragonBattle = createArenaFeedGame({
    recordMode: 'dragons',
    fxKind: 'dragon',
    targetThemeClass: 'theme-dragon-target',
    progressLabel: '🔥 Lượt bắn',
    promptPrefix: 'Rồng Thần đang cần phép thuật:',
    hitEmoji: '🔥',
    victoryAwardMsg: 'Chiến binh Rồng Bắt Chữ!',
    badgePool: ['🔥', '💧', '❄️', '⚡'],
    playRoar: () => window.soundMgr?.playDragonRoar?.(),
    getHosts: () => (typeof DRAGON_LESSONS !== 'undefined' ? DRAGON_LESSONS : []),
    getPool: () => [
      ...(typeof DRAGON_LESSONS !== 'undefined' ? DRAGON_LESSONS : []),
      ...getVocabWords([6, 8])
    ],
    ids: {
      playStage: 'dragonBattlePlayStage',
      victoryStage: 'dragonBattleVictoryStage',
      roundText: 'dragonBattleRoundText',
      streakText: 'dragonBattleStreakText',
      avatarBox: 'dragonBattleAvatarBox',
      prompt: 'dragonBattlePrompt',
      hearBtn: 'btnHearDragonBattle',
      grid: 'dragonBattleTargetsGrid',
      victoryDesc: 'dragonBattleVictoryDesc'
    }
  });

  const dinoFeed = createArenaFeedGame({
    recordMode: 'dino',
    fxKind: 'dino',
    targetThemeClass: 'theme-dino-target',
    progressLabel: '🍖 Bữa ăn',
    promptPrefix: 'Khủng Long đang thèm món chữ:',
    hitEmoji: '🍖',
    victoryAwardMsg: 'Đầu bếp Công Viên Khủng Long!',
    badgePool: ['🍖', '🌿', '🍎', '🍉'],
    playRoar: () => window.soundMgr?.playDinoRoar?.(),
    getHosts: () => (typeof DINO_LESSONS !== 'undefined' ? DINO_LESSONS : []),
    getPool: () => [
      ...getVocabWords([7, 6]),
      ...(typeof DINO_LESSONS !== 'undefined' ? DINO_LESSONS : [])
    ],
    ids: {
      playStage: 'dinoFeedPlayStage',
      victoryStage: 'dinoFeedVictoryStage',
      roundText: 'dinoFeedRoundText',
      streakText: 'dinoFeedStreakText',
      avatarBox: 'dinoFeedAvatarBox',
      prompt: 'dinoFeedPrompt',
      hearBtn: 'btnHearDinoFeed',
      grid: 'dinoFeedTargetsGrid',
      victoryDesc: 'dinoFeedVictoryDesc'
    }
  });

  window.dinoDragonGames = {
    initDragonHatch: () => dragonHatch.init(),
    initDragonBattle: () => dragonBattle.init(),
    initDinoFeed: () => dinoFeed.init(),
    initDinoHatch: () => dinoHatch.init(),
    clearHatchedStorage() {
      try {
        localStorage.removeItem('baolong_hatched_dragons_v1');
        localStorage.removeItem('baolong_hatched_dinos_v1');
      } catch (e) {}
    }
  };
})();
