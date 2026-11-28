/* ========================================================
   LIVING MEDIA ENGINE FOR BAO LONG
   - StoryTheater: 60fps Offline Animated Storybook Cinema (VN & JA & 5 Mini-Movies)
   - KidVideoHub & ParentVideoLibrary: Offline IndexedDB MP4/WebM + Safe YouTube NoCookie
   - LivingFX: HiDPI Canvas Particle Bursts, Floating Praise, Dino/Dragon/Car SFX
   - DinoBuddy: Interactive Companion Mascot reacting to progress & answers
   ======================================================== */
(function () {
  'use strict';

  const prefersReducedMotion = () =>
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ========================================================
  // 1. LIVE WEBAUDIO SFX EXTENSIONS (Dino Roar, Dragon Fire, Car Horn)
  // ========================================================
  function attachLivingSfxToSoundMgr() {
    const mgr = window.soundMgr;
    if (!mgr || mgr._livingSfxAttached) return;
    mgr._livingSfxAttached = true;

    mgr.playDinoRoar = function () {
      if (this.isMuted) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const dest = this.masterComp || ctx.destination;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(118, now);
        osc1.frequency.exponentialRampToValueAtTime(52, now + 0.65);
        osc2.frequency.setValueAtTime(78, now);
        osc2.frequency.exponentialRampToValueAtTime(38, now + 0.68);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, now);
        filter.frequency.exponentialRampToValueAtTime(160, now + 0.65);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        osc1.onended = () => {
          try { osc1.disconnect(); osc2.disconnect(); filter.disconnect(); gain.disconnect(); } catch (e) {}
        };
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.74);
        osc2.stop(now + 0.74);
      } catch (e) {}
    };

    mgr.playDragonRoar = function () {
      if (this.isMuted) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        const dest = this.masterComp || ctx.destination;
        [146.83, 220, 293.66].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq * 1.15, now + idx * 0.03);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.72, now + 0.68);
          gain.gain.setValueAtTime(0.0001, now + idx * 0.03);
          gain.gain.linearRampToValueAtTime(idx === 0 ? 0.14 : 0.08, now + 0.07 + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
          osc.connect(gain);
          gain.connect(dest);
          osc.onended = () => { try { osc.disconnect(); gain.disconnect(); } catch (e) {} };
          osc.start(now + idx * 0.03);
          osc.stop(now + 0.75);
        });
      } catch (e) {}
    };

    mgr.playCarHorn = function () {
      if (this.isMuted) return;
      this.playToneFreq(440, 'triangle', 0.11, 0, 0.10);
      this.playToneFreq(554.37, 'triangle', 0.11, 0, 0.09);
      this.playToneFreq(440, 'triangle', 0.18, 0.14, 0.10);
      this.playToneFreq(554.37, 'triangle', 0.18, 0.14, 0.09);
    };

    const origStopAll = mgr.stopAll.bind(mgr);
    mgr.stopAll = function () {
      origStopAll();
      if (window.storyTheater && !window.storyTheater._internalPlayback) {
        window.storyTheater.pauseFromExternal();
      }
    };
  }

  // ========================================================
  // 2. LIVING FX PARTICLE CANVAS & MICRO-REACTIONS
  // ========================================================
  const FX_PALETTES = {
    dino: { colors: ['#10b981', '#f97316', '#facc15', '#84cc16'], glyphs: ['🌋', '🦕', '✨', '🌿'] },
    dragon: { colors: ['#ef4444', '#f97316', '#facc15', '#a855f7'], glyphs: ['🔥', '✨', '🐉'] },
    dragon_fire: { colors: ['#ef4444', '#f97316', '#fde047'], glyphs: ['🔥', '✨'] },
    dragon_water: { colors: ['#0ea5e9', '#38bdf8', '#bae6fd'], glyphs: ['💧', '🌊', '✨'] },
    dragon_ice: { colors: ['#67e8f9', '#e0f2fe', '#38bdf8'], glyphs: ['❄️', '💎', '✨'] },
    dragon_forest: { colors: ['#22c55e', '#86efac', '#fde047'], glyphs: ['🍃', '🌸', '✨'] },
    dragon_gold: { colors: ['#f59e0b', '#fde047', '#ffffff'], glyphs: ['⭐', '👑', '✨'] },
    dragon_stone: { colors: ['#94a3b8', '#cbd5e1', '#f59e0b'], glyphs: ['🪨', '✨'] },
    dragon_earth: { colors: ['#eab308', '#a16207', '#ef4444'], glyphs: ['⚡', '🪨', '✨'] },
    dragon_baby: { colors: ['#fb7185', '#f472b6', '#fde047'], glyphs: ['💖', '🌟', '✨'] },
    vehicle: { colors: ['#0284c7', '#38bdf8', '#facc15'], glyphs: ['💨', '⚡', '🚗'] },
    science: { colors: ['#22c55e', '#38bdf8', '#facc15'], glyphs: ['🌸', '💧', '☀️'] },
    math: { colors: ['#ec4899', '#8b5cf6', '#38bdf8'], glyphs: ['🔢', '✨', '⭐'] },
    ethics: { colors: ['#f59e0b', '#10b981', '#fb7185'], glyphs: ['💖', '🌱', '✨'] },
    star: { colors: ['#facc15', '#f59e0b', '#38bdf8', '#10b981'], glyphs: ['⭐', '✨'] }
  };

  const livingFX = {
    canvas: null,
    ctx: null,
    particles: [],
    rafId: null,
    lastTapAt: 0,

    ensureCanvas() {
      if (this.canvas && document.body.contains(this.canvas)) return this.canvas;
      const cv = document.createElement('canvas');
      cv.id = 'livingFxCanvas';
      cv.className = 'living-fx-canvas';
      cv.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cv);
      this.canvas = cv;
      this.ctx = cv.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
      return cv;
    },

    resize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.canvas.width = Math.max(1, Math.floor(w * dpr));
      this.canvas.height = Math.max(1, Math.floor(h * dpr));
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
      if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },

    burst(x, y, theme = 'star', count = 14) {
      if (prefersReducedMotion()) return;
      this.ensureCanvas();
      const pal = FX_PALETTES[theme] || FX_PALETTES.star;
      const n = Math.min(26, count);
      for (let i = 0; i < n; i++) {
        if (this.particles.length >= 120) this.particles.shift();
        const ang = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.45;
        const spd = 2.2 + Math.random() * 4.4;
        const isGlyph = i % 4 === 0 && pal.glyphs?.length;
        this.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.4,
          size: isGlyph ? 16 : 4 + Math.random() * 4.5,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.015,
          color: pal.colors[i % pal.colors.length],
          glyph: isGlyph ? pal.glyphs[i % pal.glyphs.length] : null
        });
      }
      if (!this.rafId) this.loop();
    },

    floatLabel(x, y, text, color = '#d97706') {
      if (prefersReducedMotion()) return;
      const el = document.createElement('div');
      el.className = 'living-float-badge';
      el.textContent = text;
      el.style.left = `${Math.max(40, Math.min(window.innerWidth - 90, x))}px`;
      el.style.top = `${Math.max(36, y - 16)}px`;
      el.style.color = color;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 950);
    },

    pulseRumble(el) {
      if (!el || prefersReducedMotion()) return;
      el.classList.remove('dino-rumble');
      void el.offsetWidth;
      el.classList.add('dino-rumble');
      setTimeout(() => el.classList.remove('dino-rumble'), 520);
    },

    loop() {
      const ctx = this.ctx;
      if (!ctx) { this.rafId = null; return; }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14;
        p.vx *= 0.98;
        p.alpha -= p.decay;
        if (p.alpha <= 0.02) {
          this.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.glyph) {
          ctx.font = `${p.size}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (this.particles.length > 0) {
        this.rafId = requestAnimationFrame(() => this.loop());
      } else {
        this.rafId = null;
      }
    }
  };
  window.livingFX = livingFX;

  function installCardTapSparkles() {
    document.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - livingFX.lastTapAt < 90) return;
      const card = e.target.closest?.('.word-card, .ethics-lesson-card, .math-num-card, .vocab-card');
      if (!card) return;
      livingFX.lastTapAt = now;
      const r = card.getBoundingClientRect();
      const x = e.clientX || (r.left + r.width / 2);
      const y = e.clientY || (r.top + r.height / 2);
      const wid = card.dataset?.wordId || '';
      let theme = 'star';
      if (card.classList.contains('dino-card')) theme = 'dino';
      else if (card.classList.contains('dragon-card')) {
        const dMap = {
          dragon1: 'dragon_fire', dragon2: 'dragon_water', dragon3: 'dragon_ice',
          dragon4: 'dragon_forest', dragon5: 'dragon_gold', dragon6: 'dragon_stone',
          dragon7: 'dragon_earth', dragon8: 'dragon_baby'
        };
        theme = dMap[wid] || 'dragon';
      } else if (card.classList.contains('veh-card')) theme = 'vehicle';
      else if (card.classList.contains('ethics-lesson-card')) theme = 'ethics';
      else if (card.classList.contains('math-num-card')) theme = 'math';
      else if (card.closest('#scienceContainer')) theme = 'science';
      livingFX.burst(x, y, theme, 12);
    }, { passive: true });
  }

  // ========================================================
  // 3. INTERACTIVE DINO COMPANION BUDDY
  // ========================================================
  const BUDDY_PEP_LINES = [
    'Cố lên Bảo Long ơi! Cậu siêu lắm! 🦖',
    'Chạm từng chữ để nghe giọng Ba & Cô nhé! 🔊',
    'Cùng xem phim hoạt hình truyện kể nào! 🎬',
    'Bảo Long thông minh số 1 luôn! ⭐',
    'Gầm to lên nào: ROAAAR! 🔥'
  ];

  const dinoBuddy = {
    moodTimer: null,
    collapsed: false,

    init() {
      const dock = document.getElementById('dinoBuddyDock');
      if (!dock) return;
      try {
        this.collapsed = localStorage.getItem('baolong_buddy_collapsed') === '1';
      } catch (e) {}
      this.syncVisibility();

      const btn = document.getElementById('dinoBuddyBtn');
      const tog = document.getElementById('btnBuddyToggle');
      if (btn) {
        btn.addEventListener('click', (e) => {
          const r = btn.getBoundingClientRect();
          livingFX.burst(r.left + r.width / 2, r.top + 10, 'dino', 14);
          window.soundMgr?.playPop?.();
          const line = BUDDY_PEP_LINES[Math.floor(Math.random() * BUDDY_PEP_LINES.length)];
          this.react('happy', line);
        });
      }
      if (tog) {
        tog.addEventListener('click', () => {
          this.collapsed = !this.collapsed;
          try { localStorage.setItem('baolong_buddy_collapsed', this.collapsed ? '1' : '0'); } catch (e) {}
          this.syncVisibility();
        });
      }
      this.hookReactions();
    },

    syncVisibility() {
      const dock = document.getElementById('dinoBuddyDock');
      const btn = document.getElementById('dinoBuddyBtn');
      const tog = document.getElementById('btnBuddyToggle');
      if (!dock) return;
      const hiddenPref = typeof explorerState !== 'undefined' && explorerState.parentSettings?.hideDinoBuddy;
      dock.style.display = hiddenPref ? 'none' : 'flex';
      dock.classList.toggle('is-collapsed', !!this.collapsed);
      if (btn) btn.style.display = this.collapsed ? 'none' : 'inline-flex';
      if (tog) {
        tog.innerText = this.collapsed ? '🦖 Hiện bạn Khủng Long' : '−';
        tog.title = this.collapsed ? 'Hiện bạn Khủng Long đồng hành' : 'Thu gọn bạn Khủng Long';
      }
    },

    react(mood = 'happy', message = '') {
      const dock = document.getElementById('dinoBuddyDock');
      const bubble = document.getElementById('dinoBuddyBubble');
      if (!dock || this.collapsed || dock.style.display === 'none') return;
      dock.classList.remove('mood-happy', 'mood-encourage', 'mood-celebrate');
      void dock.offsetWidth;
      dock.classList.add(`mood-${mood}`);
      if (bubble && message) {
        bubble.innerText = message;
        bubble.classList.add('show');
      }
      if (this.moodTimer) clearTimeout(this.moodTimer);
      this.moodTimer = setTimeout(() => {
        dock.classList.remove('mood-happy', 'mood-encourage', 'mood-celebrate');
        if (bubble) bubble.classList.remove('show');
      }, 2600);
    },

    hookReactions() {
      const mgr = window.soundMgr;
      if (mgr && !mgr._buddyHooked) {
        mgr._buddyHooked = true;
        const origCorrect = mgr.playCorrect.bind(mgr);
        const origWrong = mgr.playWrong.bind(mgr);
        const origVictory = mgr.playVictory.bind(mgr);
        mgr.playCorrect = () => {
          origCorrect();
          this.react('happy', 'Tuyệt vời Bảo Long ơi! 🌟');
        };
        mgr.playWrong = () => {
          origWrong();
          this.react('encourage', 'Không sao đâu, nghe lại chút nhé! 💛');
        };
        mgr.playVictory = () => {
          origVictory();
          this.react('celebrate', 'HOAN HÔ CHIẾN THẮNG! 🏆🎉');
        };
      }
    }
  };
  window.dinoBuddy = dinoBuddy;

  // ========================================================
  // 4. BUILT-IN 5 OFFLINE ANIMATED MINI-MOVIES
  // ========================================================
  function getBuiltInMovies() {
    const movies = [];
    if (typeof DINO_LESSONS !== 'undefined') {
      movies.push({
        id: 'dino_world',
        title: '🦖 Phim Hoạt Hình: Thế Giới Khủng Long Kỷ Jura',
        badge: '🦖 Hoạt hình Offline • 10 loài',
        cover: 'images/dinos/dino_bao_chua.jpg',
        fxTheme: 'dino',
        scenes: DINO_LESSONS.map(d => ({
          img: (d.icon.match(/src="([^"]+)"/) || [])[1] || 'images/dinos/dino_bao_chua.jpg',
          captionMain: `${d.dinoName} (${d.word})`,
          captionSub: d.ja,
          captionVi: d.funFact,
          audioKey: d.audioKey,
          fallbackText: `${d.dinoName}. ${d.word}`,
          fxTheme: 'dino'
        }))
      });
    }
    if (typeof DRAGON_LESSONS !== 'undefined') {
      movies.push({
        id: 'dragon_kingdom',
        title: '🐉 Phim Hoạt Hình: Vương Quốc 8 Rồng Thần',
        badge: '🐉 Hoạt hình Offline • 8 loài',
        cover: 'images/dragons/dragon_fire.jpg',
        fxTheme: 'dragon',
        scenes: DRAGON_LESSONS.map(dg => ({
          img: (dg.icon.match(/src="([^"]+)"/) || [])[1] || 'images/dragons/dragon_fire.jpg',
          captionMain: `${dg.dinoName} — ${dg.word}`,
          captionSub: dg.ja,
          captionVi: dg.funFact,
          audioKey: dg.audioKey,
          fallbackText: `${dg.dinoName}. ${dg.word}`,
          fxTheme: 'dragon'
        }))
      });
    }
    if (typeof VEHICLE_LESSONS !== 'undefined') {
      movies.push({
        id: 'vehicle_parade',
        title: '🚅 Phim Hoạt Hình: Đoàn Xe & Tàu Shinkansen Siêu Tốc',
        badge: '🚗 Hoạt hình Offline • 12 xe',
        cover: 'images/vehicles/veh_tau_hoa.jpg',
        fxTheme: 'vehicle',
        scenes: VEHICLE_LESSONS.map(v => ({
          img: (v.icon.match(/src="([^"]+)"/) || [])[1] || 'images/vehicles/veh_tau_hoa.jpg',
          captionMain: `${v.vehName} — ${v.word}`,
          captionSub: v.ja,
          captionVi: v.funFact,
          audioKey: v.audioKey,
          fallbackText: `${v.vehName}. ${v.word}`,
          fxTheme: 'vehicle'
        }))
      });
    }
    if (typeof SCIENCE_ASAGAO_STAGES !== 'undefined') {
      movies.push({
        id: 'asagao_cycle',
        title: '🌺 Phim Tua Nhanh: Hành Trình Cây Bìm Bìm Lớn Lên',
        badge: '🌿 Khoa học Offline • 5 giai đoạn',
        cover: 'images/science/asagao_5.svg',
        fxTheme: 'science',
        scenes: SCIENCE_ASAGAO_STAGES.map(st => ({
          img: `images/science/asagao_${st.step}.svg`,
          captionMain: st.title,
          captionSub: `Giai đoạn ${st.step} / 5 • あさがお`,
          captionVi: st.desc,
          audioKey: st.key,
          fallbackText: `${st.title}. ${st.desc}`,
          fxTheme: 'science'
        }))
      });
    }
    movies.push({
      id: 'traffic_hero',
      title: '🚦 Phim An Toàn Giao Thông & Bảo Vệ Trái Đất',
      badge: '🌱 Đạo đức Offline • 6 cảnh',
      cover: 'images/ethics/eth_7.jpg',
      fxTheme: 'ethics',
      scenes: [
        { img: 'images/ethics/eth_7.jpg', captionMain: '🔴 ĐÈN ĐỎ DỪNG LẠI', captionSub: 'An toàn giao thông', captionVi: 'Gặp đèn đỏ tất cả xe phải dừng ngay trước vạch trắng!', audioKey: 'ethics_tl_red', fallbackText: 'Đèn đỏ dừng lại trước vạch trắng.', fxTheme: 'ethics' },
        { img: 'images/ethics/eth_7.jpg', captionMain: '🟡 ĐÈN VÀNG CHẠY CHẬM', captionSub: 'Quan sát an toàn', captionVi: 'Thấy đèn vàng hãy giảm tốc độ và chuẩn bị dừng lại!', audioKey: 'ethics_tl_yellow', fallbackText: 'Đèn vàng đi chậm lại.', fxTheme: 'ethics' },
        { img: 'images/ethics/eth_7.jpg', captionMain: '🟢 ĐÈN XANH ĐƯỢC ĐI', captionSub: 'Đội mũ bảo hiểm & thắt dây an toàn', captionVi: 'Đèn xanh mới được đi và luôn quan sát hai bên!', audioKey: 'ethics_tl_green', fallbackText: 'Đèn xanh mới được đi.', fxTheme: 'ethics' },
        { img: 'images/ethics/eth_11.svg', captionMain: '🥬 RÁC HỮU CƠ', captionSub: 'Vỏ chuối, thức ăn thừa, lá cây', captionVi: 'Bỏ đúng thùng rác hữu cơ giúp ủ phân xanh nuôi cây!', audioKey: 'ethics_bin_organic', fallbackText: 'Rác hữu cơ.', fxTheme: 'science' },
        { img: 'images/ethics/eth_11.svg', captionMain: '♻️ RÁC TÁI CHẾ', captionSub: 'Chai nhựa PET, lon nước, giấy báo', captionVi: 'Chai nhựa sạch tái chế thành nhiều đồ dùng mới!', audioKey: 'ethics_bin_recycle', fallbackText: 'Rác tái chế.', fxTheme: 'ethics' },
        { img: 'images/ethics/eth_11.svg', captionMain: '🔋 PIN & RÁC ĐẶC BIỆT', captionSub: 'Pin cũ, bóng đèn hỏng', captionVi: 'Pin cũ phải bỏ riêng đúng nơi quy định để bảo vệ đất và nước!', audioKey: 'ethics_bin_hazard', fallbackText: 'Pin và rác đặc biệt.', fxTheme: 'ethics' }
      ]
    });
    return movies;
  }

  // ========================================================
  // 5. STORY THEATER (60FPS ANIMATED STORYBOOK PLAYER)
  // ========================================================
  const storyTheater = {
    open: false,
    paused: true,
    showSub: true,
    speed: 1.0,
    epoch: 0,
    _internalPlayback: false,
    payload: null,
    sceneIdx: 0,
    sceneStartMs: 0,
    rafId: null,
    timerId: null,
    imgCache: new Map(),
    ambientParticles: [],
    lastReturnFocus: null,
    lastAudioKeyStarted: '',
    baseSpeedRate: null,

    buildPayload({ kind = 'ja', itemId = '' } = {}) {
      if (kind === 'ja' && typeof JA_STORIES_DATA !== 'undefined') {
        const st = JA_STORIES_DATA.find(s => s.id === itemId) || JA_STORIES_DATA[0];
        return {
          kind: 'ja',
          id: st.id,
          title: st.title,
          fxTheme: st.id === 'ja_story_5' ? 'dragon_water' : (st.id === 'ja_story_4' ? 'dragon_gold' : 'science'),
          scenes: st.jaLines.map((l, i) => ({
            img: st.image || 'images/stories/ja_story_1.jpg',
            captionMain: l.ja,
            captionSub: l.romaji,
            captionVi: l.vi,
            audioKey: l.key,
            fallbackText: l.ja,
            lineNo: i + 1
          }))
        };
      }
      if (kind === 'vn' && typeof VIET_STORIES_DATA !== 'undefined') {
        const st = VIET_STORIES_DATA.find(s => s.id === itemId) || VIET_STORIES_DATA[0];
        return {
          kind: 'vn',
          id: st.id,
          title: `${st.icon} ${st.title}`,
          fxTheme: 'ethics',
          singleTrackAudioKey: st.audioKey,
          singleTrackText: st.lines.join(' '),
          scenes: st.lines.map((line, i) => ({
            img: st.image || 'images/stories/vn_story_1.jpg',
            captionMain: line,
            captionSub: `Câu ${i + 1} / ${st.lines.length} • Tiếng Việt Lớp 1`,
            captionVi: st.question ? `Gợi ý đọc hiểu: ${st.question}` : '',
            audioKey: st.audioKey,
            fallbackText: line
          }))
        };
      }
      const movies = getBuiltInMovies();
      const mv = movies.find(m => m.id === itemId) || movies[0];
      return { kind: 'movie', ...mv };
    },

    openMovie(opts = {}) {
      const ov = document.getElementById('storyTheaterOverlay');
      if (!ov) return;
      this.lastReturnFocus = document.activeElement;
      if (window.soundMgr && this.baseSpeedRate === null) {
        this.baseSpeedRate = window.soundMgr.speedRate || 1.0;
      }
      window.soundMgr?.stopAll?.();
      this.payload = this.buildPayload(opts);
      this.sceneIdx = 0;
      this.open = true;
      this.paused = false;
      this.lastAudioKeyStarted = '';
      this.epoch++;
      this.initAmbientParticles();
      this.preloadImages();

      const titleEl = document.getElementById('theaterTitle');
      if (titleEl) titleEl.innerText = this.payload.title;

      ov.classList.add('active');
      this.renderDots();
      this.syncButtons();
      this.playCurrentScene(true);
      this.startRenderLoop();
      setTimeout(() => document.getElementById('btnTheaterPlayPause')?.focus(), 40);
    },

    close() {
      const ov = document.getElementById('storyTheaterOverlay');
      this.epoch++;
      this.open = false;
      this.paused = true;
      this.lastAudioKeyStarted = '';
      if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
      if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
      if (window.soundMgr && this.baseSpeedRate !== null) {
        window.soundMgr.speedRate = this.baseSpeedRate;
        this.baseSpeedRate = null;
      }
      window.soundMgr?.stopAll?.();
      if (ov) {
        ov.classList.remove('active');
        ov.classList.remove('is-theater-full');
      }
      try { if (this.lastReturnFocus?.focus) this.lastReturnFocus.focus(); } catch (e) {}
    },

    pauseFromExternal() {
      if (!this.open || this.paused) return;
      this.paused = true;
      this.epoch++;
      if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
      if (window.soundMgr && this.baseSpeedRate !== null) {
        window.soundMgr.speedRate = this.baseSpeedRate;
      }
      this.syncButtons();
    },

    preloadImages() {
      if (!this.payload) return;
      this.payload.scenes.forEach((s, idx) => {
        if (s.img && !this.imgCache.has(s.img)) {
          const im = new Image();
          im.src = s.img;
          this.imgCache.set(s.img, im);
        }
        const extras = window.storySceneRenderer?.getSceneExtras?.(this.payload, idx) || [];
        extras.forEach(p => {
          if (p && !this.imgCache.has(p)) {
            const im = new Image();
            im.src = p;
            this.imgCache.set(p, im);
          }
        });
      });
    },

    initAmbientParticles() {
      const colors = ['#fef08a', '#fda4af', '#7dd3fc', '#86efac', '#ffffff'];
      this.ambientParticles = Array.from({ length: 18 }, (_, i) => ({
        x: Math.random() * 840,
        y: Math.random() * 440,
        r: 2 + Math.random() * 4,
        vx: -0.4 + Math.random() * 0.8,
        vy: 0.35 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        color: colors[i % colors.length]
      }));
    },

    renderDots() {
      const host = document.getElementById('theaterSceneDots');
      if (!host || !this.payload) return;
      host.innerHTML = '';
      this.payload.scenes.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `theater-dot ${idx === this.sceneIdx ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Cảnh ${idx + 1}`);
        dot.onclick = () => {
          this.sceneIdx = idx;
          this.paused = false;
          this.lastAudioKeyStarted = '';
          this.playCurrentScene(true);
        };
        host.appendChild(dot);
      });
    },

    syncButtons() {
      const pp = document.getElementById('btnTheaterPlayPause');
      if (pp) pp.innerHTML = this.paused ? '<span>▶️</span> Phát tiếp' : '<span>⏸️</span> Tạm dừng';
      const subBtn = document.getElementById('btnTheaterSub');
      if (subBtn) subBtn.innerText = this.showSub ? '💬 Ẩn phụ đề' : '💬 Hiện phụ đề';
      const subBox = document.getElementById('theaterSubBox');
      if (subBox) subBox.style.display = this.showSub ? 'block' : 'none';
      const spdBtn = document.getElementById('btnTheaterSpeed');
      if (spdBtn) spdBtn.innerText = `⚡ ${this.speed}×`;
      const muteBtn = document.getElementById('btnTheaterMute');
      if (muteBtn) muteBtn.innerText = window.soundMgr?.isMuted ? '🔇 Đang tắt tiếng' : '🔊 Có tiếng';
      const prevBtn = document.getElementById('btnTheaterPrev');
      const nextBtn = document.getElementById('btnTheaterNext');
      if (prevBtn) prevBtn.disabled = this.sceneIdx <= 0;
      if (nextBtn) nextBtn.disabled = !this.payload || this.sceneIdx >= this.payload.scenes.length - 1;
      document.querySelectorAll('#theaterSceneDots .theater-dot').forEach((d, i) => {
        d.classList.toggle('active', i === this.sceneIdx);
      });
    },

    updateCaptions() {
      if (!this.payload) return;
      const sc = this.payload.scenes[this.sceneIdx];
      if (!sc) return;
      const mainEl = document.getElementById('theaterSubMain');
      const subEl = document.getElementById('theaterSubSub');
      const viEl = document.getElementById('theaterSubVi');
      if (mainEl) mainEl.innerText = sc.captionMain || '';
      if (subEl) subEl.innerText = sc.captionSub || '';
      if (viEl) viEl.innerText = sc.captionVi || '';
    },

    playCurrentScene(restartAudio = true) {
      if (!this.open || !this.payload) return;
      if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
      this.epoch++;
      const myEp = this.epoch;
      this.sceneStartMs = performance.now();
      this.renderDots();
      this.syncButtons();
      this.updateCaptions();

      if (this.paused) return;

      const sc = this.payload.scenes[this.sceneIdx];
      if (!sc) {
        this.finishMovie();
        return;
      }

      const advanceNext = () => {
        if (!this.open || this.paused || this.epoch !== myEp) return;
        if (this.sceneIdx + 1 < this.payload.scenes.length) {
          this.sceneIdx++;
          this.playCurrentScene(false);
        } else {
          this.finishMovie();
        }
      };

      const mgr = window.soundMgr;
      if (!mgr || mgr.isMuted) {
        const waitMs = Math.max(2400, Math.min(4800, (sc.captionMain?.length || 20) * 90));
        this.timerId = setTimeout(advanceNext, waitMs);
        return;
      }

      // Single-track narration (VN stories): start once on scene 0 / restart, seek proportionally if jumping!
      if (this.payload.singleTrackAudioKey) {
        if (restartAudio || this.lastAudioKeyStarted !== this.payload.singleTrackAudioKey) {
          this.lastAudioKeyStarted = this.payload.singleTrackAudioKey;
          mgr.speedRate = this.speed;
          this._internalPlayback = true;
          mgr.playAudioFile(this.payload.singleTrackAudioKey, () => {
            this._internalPlayback = false;
            if (!this.open || this.paused || this.epoch !== myEp) return;
            this.finishMovie();
          }, this.payload.singleTrackText);
          this._internalPlayback = false;
        }
        return;
      }

      // Per-scene narration (JA stories & 5 Mini-Movies)
      mgr.speedRate = this.speed;
      this._internalPlayback = true;
      mgr.playAudioFile(sc.audioKey, () => {
        this._internalPlayback = false;
        if (!this.open || this.paused || this.epoch !== myEp) return;
        this.timerId = setTimeout(advanceNext, 260);
      }, sc.fallbackText);
      this._internalPlayback = false;
    },

    finishMovie() {
      this.paused = true;
      this.syncButtons();
      if (typeof fireConfetti === 'function') fireConfetti();
      window.soundMgr?.playVictory?.();
      window.dinoBuddy?.react?.('celebrate', 'Xem hết phim hay quá Bảo Long ơi! 🎬🏆');
      if (typeof window.awardCoins === 'function' && this.payload?.id) {
        try {
          const key = `baolong_movie_${this.payload.id}`;
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            window.awardCoins(3);
            if (typeof showToast === 'function') showToast('🎬 Hoàn thành phim kể chuyện! Tặng Bảo Long +3 🪙 Xu!');
          }
        } catch (e) {}
      }
    },

    startRenderLoop() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      const draw = (now) => {
        if (!this.open) { this.rafId = null; return; }
        this.drawCanvasFrame(now);
        // Sync single-track VN stories scene highlight to actual MP3 playback position
        if (!this.paused && this.payload?.singleTrackAudioKey && window.soundMgr?.player) {
          const pl = window.soundMgr.player;
          if (!pl.paused && pl.duration > 0.5) {
            const frac = Math.min(0.999, Math.max(0, pl.currentTime / pl.duration));
            const targetIdx = Math.min(this.payload.scenes.length - 1, Math.floor(frac * this.payload.scenes.length));
            if (targetIdx !== this.sceneIdx) {
              this.sceneIdx = targetIdx;
              this.renderDots();
              this.updateCaptions();
              this.syncButtons();
            }
          }
        }
        this.rafId = requestAnimationFrame(draw);
      };
      this.rafId = requestAnimationFrame(draw);
    },

    drawCanvasFrame(now) {
      const cv = document.getElementById('storyTheaterCanvas');
      if (!cv || !this.payload) return;
      const ctx = cv.getContext('2d');
      const W = 840;
      const H = 440;
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }

      const sc = this.payload.scenes[this.sceneIdx] || this.payload.scenes[0];
      const elapsedSec = Math.max(0, (now - this.sceneStartMs) / 1000);

      // Rich multi-scene animated storyboard or themed Ken Burns photo backdrop
      const motionPaused = this.paused || prefersReducedMotion();
      const customDrawn = window.storySceneRenderer?.drawSceneAnimated?.(
        ctx, W, H, this.payload, sc, this.sceneIdx, now, this.imgCache, motionPaused
      );
      if (!customDrawn) {
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#1e293b');
        grad.addColorStop(1, '#0c4a6e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        const im = sc.img ? this.imgCache.get(sc.img) : null;
        if (im && im.complete && im.naturalWidth > 0) {
          const motionOn = !prefersReducedMotion();
          const zoom = motionOn ? (1.03 + Math.sin(elapsedSec * 0.45) * 0.045) : 1.02;
          const panX = motionOn ? Math.sin(elapsedSec * 0.35 + this.sceneIdx) * 18 : 0;
          const panY = motionOn ? Math.cos(elapsedSec * 0.28) * 10 : 0;
          const ratio = Math.max(W / im.naturalWidth, H / im.naturalHeight) * zoom;
          const dw = im.naturalWidth * ratio;
          const dh = im.naturalHeight * ratio;
          ctx.save();
          ctx.drawImage(im, (W - dw) / 2 + panX, (H - dh) / 2 + panY, dw, dh);
          ctx.restore();
        }
      }

      // Soft bottom readability vignette
      const vig = ctx.createLinearGradient(0, H * 0.55, 0, H);
      vig.addColorStop(0, 'rgba(15, 23, 42, 0)');
      vig.addColorStop(1, 'rgba(15, 23, 42, 0.72)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, H * 0.55, W, H * 0.45);

      // Floating storybook atmosphere particles
      if (!prefersReducedMotion()) {
        this.ambientParticles.forEach(p => {
          p.y -= this.paused ? 0 : p.vy * 0.7;
          p.x += this.paused ? 0 : Math.sin(elapsedSec * 1.4 + p.phase) * 0.45;
          if (p.y < -12) { p.y = H + 12; p.x = Math.random() * W; }
          ctx.save();
          ctx.globalAlpha = 0.55 + Math.sin(elapsedSec * 2 + p.phase) * 0.25;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Corner scene badge & animated baby Dino narrator
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
      ctx.beginPath();
      ctx.roundRect(16, 14, 154, 30, 15);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 13px Nunito, sans-serif';
      ctx.fillText(`🎬 Cảnh ${this.sceneIdx + 1} / ${this.payload.scenes.length}`, 30, 34);
      ctx.restore();

      // Animated corner Dino narrator talking gently during playback
      const bob = (!this.paused && !prefersReducedMotion()) ? Math.sin(now * 0.008) * 3.5 : 0;
      const mouthOpen = (!this.paused && !prefersReducedMotion()) ? Math.abs(Math.sin(now * 0.015)) * 4.5 : 0;
      ctx.save();
      ctx.translate(W - 62, H - 52 + bob);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3.5;
      ctx.stroke();
      // Cute T-Rex head vector
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(-2, -2, 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-8, -7, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-8, -7, 2, 0, Math.PI * 2);
      ctx.fill();
      // Mouth animation
      ctx.fillStyle = '#be123c';
      ctx.beginPath();
      ctx.ellipse(7, 3, 6, 1.5 + mouthOpen, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },

    bindUIOnce() {
      if (this._bound) return;
      this._bound = true;
      const ov = document.getElementById('storyTheaterOverlay');
      ov?.addEventListener('click', (e) => {
        if (e.target.id === 'storyTheaterOverlay') this.close();
      });
      document.getElementById('btnTheaterClose')?.addEventListener('click', () => this.close());
      document.getElementById('btnTheaterPlayPause')?.addEventListener('click', () => {
        if (this.paused) {
          this.paused = false;
          this.playCurrentScene(true);
        } else {
          this.paused = true;
          this.epoch++;
          if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
          this._internalPlayback = true;
          window.soundMgr?.stopAll?.();
          this._internalPlayback = false;
          this.syncButtons();
        }
      });
      document.getElementById('btnTheaterPrev')?.addEventListener('click', () => {
        if (!this.payload || this.sceneIdx <= 0) return;
        this.sceneIdx--;
        this.paused = false;
        this.lastAudioKeyStarted = '';
        this.playCurrentScene(true);
      });
      document.getElementById('btnTheaterNext')?.addEventListener('click', () => {
        if (!this.payload || this.sceneIdx >= this.payload.scenes.length - 1) return;
        this.sceneIdx++;
        this.paused = false;
        this.lastAudioKeyStarted = '';
        this.playCurrentScene(true);
      });
      document.getElementById('btnTheaterSub')?.addEventListener('click', () => {
        this.showSub = !this.showSub;
        this.syncButtons();
      });
      document.getElementById('btnTheaterSpeed')?.addEventListener('click', () => {
        const speeds = [0.85, 1.0, 1.15];
        this.speed = speeds[(speeds.indexOf(this.speed) + 1) % speeds.length];
        if (window.soundMgr) {
          window.soundMgr.speedRate = this.speed;
          if (window.soundMgr.player) window.soundMgr.player.playbackRate = this.speed;
        }
        this.syncButtons();
      });
      document.getElementById('btnTheaterMute')?.addEventListener('click', () => {
        if (!window.soundMgr) return;
        window.soundMgr.setMuted(!window.soundMgr.isMuted);
        if (typeof syncTopControlsUI === 'function') syncTopControlsUI();
        this.syncButtons();
      });
      document.getElementById('btnTheaterFullscreen')?.addEventListener('click', () => {
        ov?.classList.toggle('is-theater-full');
      });
    }
  };
  window.storyTheater = storyTheater;
  window.openStoryTheater = (opts) => storyTheater.openMovie(opts);

  // ========================================================
  // 6. INDEXEDDB LOCAL VIDEO STORE + SAFE PARENT VIDEO HUB
  // ========================================================
  const customVideoStore = {
    db: null,
    items: [],

    openDB() {
      if (this.db) return Promise.resolve(this.db);
      if (typeof indexedDB === 'undefined') return Promise.resolve(null);
      return new Promise((resolve) => {
        try {
          const req = indexedDB.open('baolong_video_db_v1', 1);
          req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains('videos')) {
              db.createObjectStore('videos', { keyPath: 'id' });
            }
          };
          req.onsuccess = () => { this.db = req.result; resolve(this.db); };
          req.onerror = () => resolve(null);
        } catch (e) { resolve(null); }
      });
    },

    async refreshList() {
      const db = await this.openDB();
      if (!db) return [];
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('videos', 'readonly');
          const store = tx.objectStore('videos');
          const req = store.getAll();
          req.onsuccess = () => {
            this.items = (req.result || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            resolve(this.items);
          };
          req.onerror = () => resolve([]);
        } catch (e) { resolve([]); }
      });
    },

    async saveVideo(title, fileBlob) {
      const db = await this.openDB();
      if (!db || !fileBlob) return false;
      const rec = {
        id: `vid_${Date.now()}_${Math.floor(Math.random() * 999)}`,
        title: title || fileBlob.name || 'Video của Bảo Long',
        mime: fileBlob.type || 'video/mp4',
        size: fileBlob.size || 0,
        blob: fileBlob,
        createdAt: Date.now()
      };
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('videos', 'readwrite');
          tx.objectStore('videos').put(rec);
          tx.oncomplete = async () => { await this.refreshList(); resolve(true); };
          tx.onerror = () => resolve(false);
        } catch (e) { resolve(false); }
      });
    },

    async removeVideo(id) {
      const db = await this.openDB();
      if (!db) return false;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('videos', 'readwrite');
          tx.objectStore('videos').delete(id);
          tx.oncomplete = async () => { await this.refreshList(); resolve(true); };
          tx.onerror = () => resolve(false);
        } catch (e) { resolve(false); }
      });
    },

    async clearAll() {
      const db = await this.openDB();
      if (!db) return;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('videos', 'readwrite');
          tx.objectStore('videos').clear();
          tx.oncomplete = () => { this.items = []; resolve(); };
          tx.onerror = () => resolve();
        } catch (e) { resolve(); }
      });
    }
  };
  window.customVideoStore = customVideoStore;

  function parseYoutubeId(rawUrl) {
    const s = String(rawUrl || '').trim();
    if (!s) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
    const m = s.match(/(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : '';
  }

  let activeVideoTab = 'movies';
  let activeObjectUrl = null;
  let lastFocusBeforeVideoHub = null;

  function revokeActiveVideoUrl() {
    if (activeObjectUrl) {
      try { URL.revokeObjectURL(activeObjectUrl); } catch (e) {}
      activeObjectUrl = null;
    }
  }

  async function openVideoHub(initialTab = 'movies') {
    const ov = document.getElementById('kidVideoOverlay');
    if (!ov) return;
    lastFocusBeforeVideoHub = document.activeElement;
    window.soundMgr?.stopAll?.();
    activeVideoTab = initialTab || 'movies';
    await customVideoStore.refreshList();
    ov.classList.add('active');
    renderKidVideoBody();
    setTimeout(() => document.getElementById('btnKidVideoClose')?.focus(), 40);
  }
  window.openVideoHub = openVideoHub;

  function closeVideoHub() {
    const ov = document.getElementById('kidVideoOverlay');
    const body = document.getElementById('kidVideoBody');
    const vEl = body?.querySelector('video');
    if (vEl) { try { vEl.pause(); vEl.src = ''; } catch (e) {} }
    const ifr = body?.querySelector('iframe');
    if (ifr) ifr.src = 'about:blank';
    revokeActiveVideoUrl();
    if (ov) ov.classList.remove('active');
    try { if (lastFocusBeforeVideoHub?.focus) lastFocusBeforeVideoHub.focus(); } catch (e) {}
  }
  window.closeVideoHub = closeVideoHub;

  function playInlineMediaStage(type, src, title) {
    const stage = document.getElementById('kidVideoPlayerStage');
    if (!stage) return;
    revokeActiveVideoUrl();
    stage.style.display = 'block';
    if (type === 'blob') {
      activeObjectUrl = URL.createObjectURL(src);
      stage.innerHTML = `
        <div class="kid-video-stage-head">🎞️ ${escHtml(title)}</div>
        <video class="kid-video-el" controls playsinline autoplay src="${activeObjectUrl}"></video>
      `;
    } else if (type === 'youtube') {
      if (!navigator.onLine) {
        stage.innerHTML = `<div class="kid-video-offline">📡 Hiện máy đang ngoại tuyến (Offline), cần Internet để phát YouTube <strong>${escHtml(title)}</strong>. Hãy xem Phim Hoạt Hình Offline hoặc Video MP4 Ba Mẹ đã lưu nhé!</div>`;
        return;
      }
      stage.innerHTML = `
        <div class="kid-video-stage-head">▶️ ${escHtml(title)} (YouTube An Toàn)</div>
        <div class="kid-yt-frame-wrap">
          <iframe class="kid-yt-iframe" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(src)}?rel=0&modestbranding=1" title="${escHtml(title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    }
    stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderKidVideoBody() {
    const body = document.getElementById('kidVideoBody');
    if (!body) return;
    document.getElementById('vidTabMovies')?.classList.toggle('active-filter', activeVideoTab === 'movies');
    document.getElementById('vidTabStories')?.classList.toggle('active-filter', activeVideoTab === 'stories');
    document.getElementById('vidTabParent')?.classList.toggle('active-filter', activeVideoTab === 'parent');

    if (activeVideoTab === 'movies') {
      const movies = getBuiltInMovies();
      body.innerHTML = `
        <p class="video-hub-lead">✨ Xem phim hoạt hình 60fps chuyển động từ ảnh &amp; giọng đọc chuẩn Cô/Ba — chạy <strong>100% offline không cần mạng</strong>:</p>
        <div class="video-cards-grid">
          ${movies.map(m => `
            <div class="video-hub-card">
              <div class="video-thumb-box"><img src="${m.cover}" alt="${escHtml(m.title)}" loading="lazy"><span class="video-play-badge">▶ PHÁT</span></div>
              <div class="video-card-badge">${escHtml(m.badge)}</div>
              <div class="video-card-title">${escHtml(m.title)}</div>
              <button type="button" class="challenge-btn video-launch-btn" data-movie-id="${m.id}" style="padding:8px 14px; font-size:13px;">🎬 Xem Phim Ngay</button>
            </div>
          `).join('')}
        </div>
      `;
      body.querySelectorAll('.video-launch-btn').forEach(btn => {
        btn.onclick = () => {
          closeVideoHub();
          storyTheater.openMovie({ kind: 'movie', itemId: btn.dataset.movieId });
        };
      });
      return;
    }

    if (activeVideoTab === 'stories') {
      const vn = (typeof VIET_STORIES_DATA !== 'undefined' ? VIET_STORIES_DATA : []).map(s => ({
        kind: 'vn', id: s.id, title: `${s.icon} ${s.title}`, img: s.image || 'images/stories/vn_story_1.jpg', badge: '🇻🇳 Đọc Hiểu HK2'
      }));
      const ja = (typeof JA_STORIES_DATA !== 'undefined' ? JA_STORIES_DATA : []).map(s => ({
        kind: 'ja', id: s.id, title: s.title, img: s.image || 'images/stories/ja_story_1.jpg', badge: '🇯🇵 Truyện 小1'
      }));
      const all = [...ja, ...vn];
      body.innerHTML = `
        <p class="video-hub-lead">📖 Rạp chiếu phim truyện kể song ngữ Nhật–Việt (nhấn vào truyện để mở rạp toàn màn hình có phụ đề Karaoke):</p>
        <div class="video-cards-grid">
          ${all.map(item => `
            <div class="video-hub-card">
              <div class="video-thumb-box"><img src="${item.img}" alt="${escHtml(item.title)}" loading="lazy"><span class="video-play-badge">🎬 XEM</span></div>
              <div class="video-card-badge">${item.badge}</div>
              <div class="video-card-title">${escHtml(item.title)}</div>
              <button type="button" class="btn-theater-launch video-story-btn" data-kind="${item.kind}" data-id="${item.id}">🎬 Chiếu Phim Truyện</button>
            </div>
          `).join('')}
        </div>
      `;
      body.querySelectorAll('.video-story-btn').forEach(btn => {
        btn.onclick = () => {
          closeVideoHub();
          storyTheater.openMovie({ kind: btn.dataset.kind, itemId: btn.dataset.id });
        };
      });
      return;
    }

    // Tab 3: Parent local MP4/WebM + Safe YouTube links
    const ytList = (typeof explorerState !== 'undefined' && Array.isArray(explorerState.parentVideos)) ? explorerState.parentVideos : [];
    const localList = customVideoStore.items || [];
    body.innerHTML = `
      <div id="kidVideoPlayerStage" class="kid-video-stage" style="display: none;"></div>
      <p class="video-hub-lead">👨‍👩‍👦 Danh sách video Ba Mẹ đã chọn cho Bảo Long (tải từ máy tính bảng hoặc YouTube an toàn — thêm/sửa trong <strong>Góc Phụ Huynh</strong>):</p>
      <div class="video-cards-grid">
        ${localList.map(v => `
          <div class="video-hub-card">
            <div class="video-card-badge">💾 Video Cục Bộ Offline (${(v.size / 1024 / 1024).toFixed(1)} MB)</div>
            <div class="video-card-title">🎞️ ${escHtml(v.title)}</div>
            <button type="button" class="challenge-btn play-local-vid-btn" data-vid-id="${escHtml(v.id)}" style="padding:8px 14px; font-size:13px;">▶️ Mở Video Offline</button>
          </div>
        `).join('')}
        ${ytList.map(y => `
          <div class="video-hub-card">
            <div class="video-card-badge">🌐 YouTube An Toàn (NoCookie)</div>
            <div class="video-card-title">📺 ${escHtml(y.title)}</div>
            <button type="button" class="btn-listen play-yt-vid-btn" data-yt-id="${escHtml(y.ytId)}" data-yt-title="${escHtml(y.title)}">▶️ Phát Ngay</button>
          </div>
        `).join('')}
      </div>
      ${(!localList.length && !ytList.length) ? '<div class="kid-video-empty">📂 Chưa có video riêng nào. Ba mẹ vào <strong>🏆 Xem Sticker → 👨‍👩‍👦 Góc Phụ Huynh</strong> để thêm video MP4 từ máy hoặc link YouTube an toàn nhé!</div>' : ''}
    `;
    body.querySelectorAll('.play-local-vid-btn').forEach(btn => {
      btn.onclick = () => {
        const rec = customVideoStore.items.find(x => x.id === btn.dataset.vidId);
        if (rec?.blob) playInlineMediaStage('blob', rec.blob, rec.title);
      };
    });
    body.querySelectorAll('.play-yt-vid-btn').forEach(btn => {
      btn.onclick = () => playInlineMediaStage('youtube', btn.dataset.ytId, btn.dataset.ytTitle);
    });
  }

  async function renderParentVideoManager() {
    const host = document.getElementById('parentVideoManagerHost');
    if (!host || typeof explorerState === 'undefined') return;
    await customVideoStore.refreshList();
    if (!Array.isArray(explorerState.parentVideos)) explorerState.parentVideos = [];
    const ytList = explorerState.parentVideos;
    const localList = customVideoStore.items || [];

    host.innerHTML = `
      <div class="parent-voice-box" style="margin-top: 10px; border-color: #7dd3fc; background: #f0f9ff;">
        <div class="parent-sub-title" style="color: #0369a1;">🎬 Kho Video Của Ba Mẹ (${localList.length} MP4 cục bộ • ${ytList.length} YouTube)</div>
        <p style="font-size: 11px; color: #475569; margin: 2px 0 8px 0;">
          🔒 Video MP4/WebM lưu cục bộ 100% trong máy; YouTube dùng miền <code>youtube-nocookie.com</code> giảm gợi ý ngoài luồng.
        </p>
        <div class="parent-video-form-row">
          <input type="text" id="parentVidTitleInput" class="parent-vid-input" placeholder="Tên bài video (VD: Bài hát ABC)">
          <input type="url" id="parentVidYtInput" class="parent-vid-input" placeholder="Dán link YouTube (tuỳ chọn)">
          <button type="button" class="tool-chip" id="btnParentAddYt">➕ Lưu Link YouTube</button>
          <button type="button" class="tool-chip" id="btnParentAddLocalVid">📁 Chọn Video MP4/WebM</button>
          <input type="file" id="parentLocalVidFile" accept="video/mp4,video/webm,video/quicktime,video/*" style="display:none;">
        </div>
        <div class="parent-video-items">
          ${localList.map(v => `
            <div class="parent-vid-chip">
              <span>💾 ${escHtml(v.title)}</span>
              <button type="button" class="tool-chip parent-del-local-vid" data-vid-id="${escHtml(v.id)}" style="padding:2px 8px; font-size:11px;">✖</button>
            </div>
          `).join('')}
          ${ytList.map(y => `
            <div class="parent-vid-chip">
              <span>🌐 ${escHtml(y.title)}</span>
              <button type="button" class="tool-chip parent-del-yt-vid" data-yt-id="${escHtml(y.id)}" style="padding:2px 8px; font-size:11px;">✖</button>
            </div>
          `).join('')}
        </div>
        <label class="parent-check-row" style="margin-top:8px;">
          <input type="checkbox" id="parentHideBuddyChk" ${explorerState.parentSettings?.hideDinoBuddy ? 'checked' : ''}>
          <span>Ẩn bạn Khủng Long đồng hành ở góc màn hình</span>
        </label>
      </div>
    `;

    document.getElementById('parentHideBuddyChk')?.addEventListener('change', (e) => {
      explorerState.parentSettings.hideDinoBuddy = !!e.target.checked;
      if (typeof saveProgress === 'function') saveProgress();
      dinoBuddy.syncVisibility();
    });

    document.getElementById('btnParentAddYt')?.addEventListener('click', () => {
      const titleInp = document.getElementById('parentVidTitleInput');
      const ytInp = document.getElementById('parentVidYtInput');
      const ytId = parseYoutubeId(ytInp?.value);
      if (!ytId) {
        if (typeof showToast === 'function') showToast('⚠️ Link YouTube chưa đúng định dạng (youtube.com/watch?v=... hoặc youtu.be/...)');
        return;
      }
      const title = (titleInp?.value || '').trim() || `Video YouTube (${ytId})`;
      explorerState.parentVideos.unshift({ id: `yt_${Date.now()}`, title, ytId });
      if (typeof saveProgress === 'function') saveProgress();
      if (typeof showToast === 'function') showToast(`✅ Đã thêm "${title}" vào Rạp Video!`);
      renderParentVideoManager();
    });

    const fileInp = document.getElementById('parentLocalVidFile');
    document.getElementById('btnParentAddLocalVid')?.addEventListener('click', () => fileInp?.click());
    fileInp?.addEventListener('change', async (e) => {
      const file = e.target?.files?.[0];
      if (!file) return;
      const titleInp = document.getElementById('parentVidTitleInput');
      const title = (titleInp?.value || '').trim() || file.name.replace(/\.[^.]+$/, '');
      const ok = await customVideoStore.saveVideo(title, file);
      if (ok) {
        if (typeof showToast === 'function') showToast(`💾 Đã lưu video offline "${title}"!`);
        renderParentVideoManager();
      } else if (typeof showToast === 'function') {
        showToast('⚠️ Không thể lưu video vào trình duyệt (có thể file quá lớn).');
      }
      e.target.value = '';
    });

    host.querySelectorAll('.parent-del-local-vid').forEach(btn => {
      btn.onclick = async () => {
        await customVideoStore.removeVideo(btn.dataset.vidId);
        renderParentVideoManager();
      };
    });
    host.querySelectorAll('.parent-del-yt-vid').forEach(btn => {
      btn.onclick = () => {
        explorerState.parentVideos = (explorerState.parentVideos || []).filter(y => y.id !== btn.dataset.ytId);
        if (typeof saveProgress === 'function') saveProgress();
        renderParentVideoManager();
      };
    });
  }
  window.renderParentVideoManager = renderParentVideoManager;

  // ========================================================
  // 7. GLOBAL INIT HOOKS & KEYBOARD ESCAPE FOR NEW MODALS
  // ========================================================
  function initLivingMedia() {
    attachLivingSfxToSoundMgr();
    installCardTapSparkles();
    storyTheater.bindUIOnce();
    dinoBuddy.init();
    customVideoStore.refreshList();

    document.getElementById('btnOpenVideoHub')?.addEventListener('click', () => openVideoHub('movies'));
    document.getElementById('btnKidVideoClose')?.addEventListener('click', closeVideoHub);
    document.getElementById('kidVideoOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'kidVideoOverlay') closeVideoHub();
    });
    document.getElementById('vidTabMovies')?.addEventListener('click', () => { activeVideoTab = 'movies'; renderKidVideoBody(); });
    document.getElementById('vidTabStories')?.addEventListener('click', () => { activeVideoTab = 'stories'; renderKidVideoBody(); });
    document.getElementById('vidTabParent')?.addEventListener('click', () => { activeVideoTab = 'parent'; renderKidVideoBody(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (storyTheater.open) storyTheater.close();
        if (document.getElementById('kidVideoOverlay')?.classList.contains('active')) closeVideoHub();
      }
    });
  }
  window.initLivingMedia = initLivingMedia;
})();
