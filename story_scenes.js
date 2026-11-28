/* ========================================================
   ANIMATED STORYBOOK SCENE ENGINE (111 DISTINCT SCENES AT 60FPS)
   Provides rich vector environments, articulated characters, props,
   and per-line storyboards for all 10 JA stories, 6 VN stories,
   and all 5 offline mini-movies.
   ======================================================== */
(function () {
  'use strict';

  const BACKDROPS = {
    garden_morning: { sky: ['#bae6fd', '#e0f2fe', '#fef3c7'], ground: '#4ade80', hill: '#86efac', sun: true },
    garden_bright:  { sky: ['#38bdf8', '#bae6fd', '#f0fdf4'], ground: '#22c55e', hill: '#4ade80', sun: true },
    school_yard:    { sky: ['#60a5fa', '#bae6fd', '#fef9c3'], ground: '#fde68a', hill: '#86efac', sun: true, school: true },
    sky_high:       { sky: ['#0284c7', '#38bdf8', '#e0f2fe'], ground: null, cloudSea: true },
    mountain_cabin: { sky: ['#fde68a', '#fed7aa', '#fbcfe8'], ground: '#65a30d', hill: '#4d7c0f', mtns: true, cabin: true },
    cabin_night:    { sky: ['#0f172a', '#1e293b', '#312e81'], ground: '#14532d', hill: '#064e3b', moon: true, stars: true, cabin: true },
    winter_snow:    { sky: ['#94a3b8', '#cbd5e1', '#f1f5f9'], ground: '#f8fafc', hill: '#e2e8f0', snow: true, cabin: true },
    bedroom_warm:   { sky: ['#451a03', '#78350f', '#b45309'], ground: '#fde68a', floor: '#d97706', room: true },
    morning_sad:    { sky: ['#64748b', '#94a3b8', '#e2e8f0'], ground: '#fef3c7', room: true },
    porch_day:      { sky: ['#7dd3fc', '#bae6fd', '#fefce8'], ground: '#4ade80', hill: '#86efac', porch: true },
    porch_rain:     { sky: ['#475569', '#64748b', '#94a3b8'], ground: '#15803d', rain: true, porch: true },
    river_stream:   { sky: ['#38bdf8', '#bae6fd', '#fef3c7'], ground: '#4ade80', water: true },
    forest_path:    { sky: ['#86efac', '#bbf7d0', '#fef9c3'], ground: '#22c55e', trees: true },
    storm_sea:      { sky: ['#1e3a8a', '#1d4ed8', '#38bdf8'], ground: null, oceanWaves: true },
    oni_island:     { sky: ['#31102f', '#581c87', '#9f1239'], ground: '#475569', castle: true },
    city_road:      { sky: ['#38bdf8', '#bae6fd', '#e0f2fe'], ground: '#334155', road: true, buildings: true },
    construction:   { sky: ['#f59e0b', '#fde68a', '#fef9c3'], ground: '#78716c', road: true },
    savanna:        { sky: ['#fb923c', '#fed7aa', '#fef08a'], ground: '#ca8a04', hill: '#eab308', sun: true, trees: true },
    cave_dark:      { sky: ['#09090b', '#18181b', '#27272a'], ground: '#44403c', cave: true },
    cave_gold:      { sky: ['#451a03', '#78350f', '#b45309'], ground: '#f59e0b', cave: true, lantern: true },
    persimmon_tree: { sky: ['#7dd3fc', '#bae6fd', '#fff7ed'], ground: '#4ade80', hill: '#86efac', sun: true },
    kitchen_home:   { sky: ['#fef3c7', '#fde68a', '#fed7aa'], ground: '#f59e0b', room: true },
    rain_garden:    { sky: ['#475569', '#64748b', '#94a3b8'], ground: '#16a34a', rain: true },
    rainbow_meadow: { sky: ['#38bdf8', '#bae6fd', '#fef9c3'], ground: '#22c55e', rainbow: true, sun: true },
    shinkansen_fuji:{ sky: ['#0ea5e9', '#bae6fd', '#fff1f2'], ground: '#64748b', fuji: true, rail: true },
    lotus_pond:     { sky: ['#7dd3fc', '#cffafe', '#fef9c3'], ground: '#0d9488', water: true }
  };

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  function drawBackdrop(ctx, W, H, envKey, t, paused) {
    const b = BACKDROPS[envKey] || BACKDROPS.garden_morning;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    b.sky.forEach((c, idx) => g.addColorStop(idx / (b.sky.length - 1), c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const mt = paused ? 0 : t;

    if (b.stars) {
      for (let i = 0; i < 22; i++) {
        const sx = (i * 173) % W;
        const sy = 20 + ((i * 67) % 180);
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(mt * 2 + i));
        ctx.fillStyle = `rgba(254, 240, 138, ${tw})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.8 + (i % 2), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (b.moon) {
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(W - 110, 82, 34, 0, Math.PI * 2);
      ctx.fill();
    }

    if (b.sun) {
      const pulse = Math.sin(mt * 2) * 3;
      ctx.save();
      ctx.translate(105, 76);
      ctx.fillStyle = 'rgba(253, 224, 71, 0.32)';
      ctx.beginPath();
      ctx.arc(0, 0, 44 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (b.rainbow) {
      const cols = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#38bdf8', '#6366f1', '#a855f7'];
      cols.forEach((col, i) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(W / 2, H * 0.72, 270 - i * 11, Math.PI, Math.PI * 2);
        ctx.stroke();
      });
    }

    // Moving fluffy clouds
    if (!b.room && !b.cave) {
      for (let c = 0; c < 3; c++) {
        const cx = ((c * 300 + mt * (12 + c * 4)) % (W + 220)) - 110;
        const cy = 54 + c * 32;
        ctx.fillStyle = b.stars ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.arc(cx + 22, cy - 8, 28, 0, Math.PI * 2);
        ctx.arc(cx + 48, cy, 22, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (b.fuji) {
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(W * 0.25, H * 0.72);
      ctx.lineTo(W * 0.45, H * 0.26);
      ctx.lineTo(W * 0.55, H * 0.26);
      ctx.lineTo(W * 0.75, H * 0.72);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(W * 0.405, H * 0.37);
      ctx.lineTo(W * 0.45, H * 0.26);
      ctx.lineTo(W * 0.55, H * 0.26);
      ctx.lineTo(W * 0.595, H * 0.37);
      ctx.lineTo(W * 0.53, H * 0.33);
      ctx.lineTo(W * 0.48, H * 0.38);
      ctx.lineTo(W * 0.44, H * 0.33);
      ctx.closePath();
      ctx.fill();
    }

    if (b.mtns) {
      ctx.fillStyle = '#65a30d';
      ctx.beginPath();
      ctx.moveTo(0, H * 0.72);
      ctx.lineTo(180, H * 0.42);
      ctx.lineTo(390, H * 0.72);
      ctx.lineTo(610, H * 0.36);
      ctx.lineTo(840, H * 0.72);
      ctx.fill();
    }

    if (b.hill) {
      ctx.fillStyle = b.hill;
      ctx.beginPath();
      ctx.ellipse(W * 0.25, H * 0.74, 340, 80, 0, Math.PI, Math.PI * 2);
      ctx.ellipse(W * 0.78, H * 0.76, 320, 90, 0, Math.PI, Math.PI * 2);
      ctx.fill();
    }

    if (b.buildings) {
      const bCols = ['#94a3b8', '#64748b', '#cbd5e1', '#7dd3fc'];
      for (let i = 0; i < 6; i++) {
        const bx = 40 + i * 135;
        const bh = 95 + (i % 3) * 35;
        ctx.fillStyle = bCols[i % bCols.length];
        ctx.fillRect(bx, H * 0.68 - bh, 96, bh);
        ctx.fillStyle = '#fef08a';
        for (let wy = 0; wy < 3; wy++) {
          ctx.fillRect(bx + 14, H * 0.68 - bh + 16 + wy * 24, 18, 14);
          ctx.fillRect(bx + 54, H * 0.68 - bh + 16 + wy * 24, 18, 14);
        }
      }
    }

    if (b.school) {
      ctx.fillStyle = '#fef2f2';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 3;
      ctx.fillRect(W - 220, H * 0.40, 175, 130);
      ctx.strokeRect(W - 220, H * 0.40, 175, 130);
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(W - 232, H * 0.40);
      ctx.lineTo(W - 132, H * 0.28);
      ctx.lineTo(W - 32, H * 0.40);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(W - 132, H * 0.35, 13, 0, Math.PI * 2);
      ctx.fill();
    }

    if (b.cabin) {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(W - 210, H * 0.44, 160, 118);
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(W - 228, H * 0.44);
      ctx.lineTo(W - 130, H * 0.30);
      ctx.lineTo(W - 32, H * 0.44);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.fillRect(W - 155, H * 0.50, 48, 42);
    }

    if (b.trees) {
      for (let i = 0; i < 4; i++) {
        const tx = 70 + i * 220;
        const sw = Math.sin(mt * 1.8 + i) * 4;
        ctx.fillStyle = '#78350f';
        ctx.fillRect(tx - 10, H * 0.52, 20, 90);
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(tx + sw, H * 0.48, 46, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (b.room) {
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, W, H * 0.68);
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(W * 0.1, H * 0.14, 120, 96);
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 4;
      ctx.strokeRect(W * 0.1, H * 0.14, 120, 96);
    }

    if (b.cave) {
      ctx.fillStyle = '#292524';
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.85, W * 0.6, Math.PI, Math.PI * 2);
      ctx.fill();
      if (b.lantern) {
        const glow = 0.7 + 0.3 * Math.sin(mt * 4);
        ctx.fillStyle = `rgba(250, 204, 21, ${glow})`;
        ctx.beginPath();
        ctx.arc(W * 0.2, 110, 24, 0, Math.PI * 2);
        ctx.arc(W * 0.8, 110, 24, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (b.castle) {
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(W - 210, H * 0.26, 150, 190);
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(W - 225, H * 0.26);
      ctx.lineTo(W - 135, H * 0.12);
      ctx.lineTo(W - 45, H * 0.26);
      ctx.closePath();
      ctx.fill();
    }

    if (b.ground) {
      ctx.fillStyle = b.ground;
      ctx.fillRect(0, H * 0.68, W, H * 0.32);
    }

    if (b.road) {
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, H * 0.66, W, H * 0.34);
      ctx.fillStyle = '#facc15';
      for (let rx = -40; rx < W + 60; rx += 90) {
        const off = ((rx - mt * 120) % (W + 90) + (W + 90)) % (W + 90) - 45;
        ctx.fillRect(off, H * 0.82, 46, 8);
      }
    }

    if (b.rail) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, H * 0.72, W, 38);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, H * 0.74, W, 6);
    }

    if (b.water || b.oceanWaves) {
      const topY = b.oceanWaves ? H * 0.56 : H * 0.66;
      ctx.fillStyle = b.oceanWaves ? '#0284c7' : '#0ea5e9';
      ctx.fillRect(0, topY, W, H - topY);
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 4;
      for (let row = 0; row < 3; row++) {
        ctx.beginPath();
        const wy = topY + 28 + row * 38;
        for (let wx = 0; wx <= W; wx += 30) {
          const yy = wy + Math.sin(wx * 0.03 + mt * 3 + row) * 7;
          if (wx === 0) ctx.moveTo(wx, yy);
          else ctx.lineTo(wx, yy);
        }
        ctx.stroke();
      }
    }

    if (b.rain) {
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.75)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 36; i++) {
        const rx = (i * 59) % W;
        const ry = ((i * 97 + mt * 420) % H);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 7, ry + 18);
        ctx.stroke();
      }
    }

    if (b.snow) {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 30; i++) {
        const sx = (i * 83 + Math.sin(mt + i) * 18) % W;
        const sy = (i * 71 + mt * 75) % H;
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawCirclePerson(ctx, x, y, sc, skin, hair, shirt, beard, label, t, pose) {
    ctx.save();
    const bob = pose === 'pull' ? Math.sin(t * 9) * 5 : (pose === 'jump' ? -Math.abs(Math.sin(t * 5)) * 18 : Math.sin(t * 3.5) * 4);
    const lean = pose === 'pull' ? -0.18 + Math.sin(t * 9) * 0.08 : (pose === 'bow' ? 0.25 : 0);
    ctx.translate(x, y + bob);
    ctx.rotate(lean);
    ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(15,23,42,0.16)';
    ctx.beginPath();
    ctx.ellipse(0, 44, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shirt;
    rr(ctx, -20, 4, 40, 38, 12);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(0, -14, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.arc(0, -19, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    if (beard) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -5, 16, 0, Math.PI);
      ctx.fill();
    }
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-6, -15, 2.5, 0, Math.PI * 2);
    ctx.arc(6, -15, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#be123c';
    ctx.beginPath();
    if (pose === 'sad') ctx.arc(0, -4, 5, Math.PI, Math.PI * 2);
    else ctx.arc(0, -10, 5, 0, Math.PI);
    ctx.stroke();
    ctx.restore();
    if (label) drawBubble(ctx, x, y - 58 * sc + bob, label);
  }

  function drawAnimal(ctx, kind, x, y, sc, t, pose) {
    ctx.save();
    const bob = pose === 'jump' ? -Math.abs(Math.sin(t * 5.5)) * 16 : (pose === 'run' ? Math.sin(t * 10) * 6 : Math.sin(t * 3) * 4);
    ctx.translate(x, y + bob);
    ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(15,23,42,0.16)';
    ctx.beginPath();
    ctx.ellipse(0, 34, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    const palette = {
      dog:      { body: '#d97706', ear: '#92400e', belly: '#fef3c7' },
      elf_old:  { body: '#f59e0b', ear: '#b45309', belly: '#ffffff' },
      cat:      { body: '#f472b6', ear: '#db2777', belly: '#fdf2f8' },
      mouse:    { body: '#94a3b8', ear: '#cbd5e1', belly: '#f8fafc' },
      tanuki:   { body: '#a16207', ear: '#451a03', belly: '#fef3c7' },
      frog:     { body: '#22c55e', ear: '#16a34a', belly: '#dcfce7' },
      toad:     { body: '#ca8a04', ear: '#854d0e', belly: '#fef9c3' },
      snail:    { body: '#f59e0b', ear: '#b45309', belly: '#fde68a' },
      monkey:   { body: '#b45309', ear: '#78350f', belly: '#fde68a' },
      crab:     { body: '#ef4444', ear: '#b91c1c', belly: '#fecaca' },
      bird:     { body: '#38bdf8', ear: '#0284c7', belly: '#e0f2fe' },
      lion_baby:{ body: '#fbbf24', ear: '#d97706', belly: '#fef3c7' },
      zebra:    { body: '#f8fafc', ear: '#1e293b', belly: '#ffffff' },
      kangaroo: { body: '#ea580c', ear: '#9a3412', belly: '#fed7aa' }
    };
    const p = palette[kind] || palette.dog;

    // Body
    ctx.fillStyle = p.body;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 12, 22, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Stripes for zebra or mask for tanuki
    if (kind === 'zebra') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      [-10, 0, 10].forEach(ox => {
        ctx.beginPath();
        ctx.moveTo(ox, -2);
        ctx.lineTo(ox - 4, 24);
        ctx.stroke();
      });
    }

    // Head
    ctx.fillStyle = p.body;
    ctx.beginPath();
    ctx.arc(0, -14, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ears
    ctx.fillStyle = p.ear;
    ctx.beginPath();
    ctx.arc(-13, -27, 6, 0, Math.PI * 2);
    ctx.arc(13, -27, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes & snout
    ctx.fillStyle = '#0f172a';
    if (pose === 'sleep') {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-9, -16); ctx.lineTo(-3, -16);
      ctx.moveTo(3, -16); ctx.lineTo(9, -16);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(-6, -16, 2.5, 0, Math.PI * 2);
      ctx.arc(6, -16, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = p.belly;
    ctx.beginPath();
    ctx.ellipse(0, -8, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawProp(ctx, kind, x, y, t, extra) {
    ctx.save();
    ctx.translate(x, y);
    if (kind === 'turnip') {
      const wob = extra === 'pull' ? Math.sin(t * 14) * 0.14 : (extra === 'fly' ? Math.sin(t * 6) * 0.08 : 0);
      const lift = extra === 'fly' ? -45 - Math.abs(Math.sin(t * 3)) * 18 : 0;
      ctx.translate(0, lift);
      ctx.rotate(wob);
      const sz = extra === 'tiny' ? 0.45 : (extra === 'medium' ? 0.75 : 1.15);
      ctx.scale(sz, sz);
      // Leaves
      ctx.fillStyle = '#16a34a';
      [-14, 0, 14].forEach(lx => {
        ctx.beginPath();
        ctx.ellipse(lx, -44, 11, 24, lx * 0.02, 0, Math.PI * 2);
        ctx.fill();
      });
      // White bulbous turnip
      ctx.fillStyle = '#fefce8';
      ctx.strokeStyle = '#65a30d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 38, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (kind === 'seed_drop') {
      const dy = (t * 80) % 70;
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(0, -40 + dy, 7, 10, 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'whale_cloud') {
      const fx = Math.sin(t * 1.4) * 28;
      const fy = Math.cos(t * 2) * 10;
      ctx.translate(fx, fy);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 120, 44, 0, 0, Math.PI * 2);
      ctx.arc(-40, -28, 34, 0, Math.PI * 2);
      ctx.arc(30, -22, 30, 0, Math.PI * 2);
      ctx.arc(110, -14, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-78, -6, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'peach') {
      const bob = Math.sin(t * 3) * 8;
      ctx.translate(0, bob);
      ctx.fillStyle = '#fb7185';
      ctx.strokeStyle = '#be123c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(22, -32, 16, 8, -0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'spinning_wheel') {
      const ang = t * 5;
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = ang + (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * 34, Math.sin(a) * 34);
        ctx.stroke();
      }
    } else if (kind === 'riceball') {
      const rollX = Math.sin(t * 2.5) * 45;
      ctx.translate(rollX, Math.abs(Math.sin(t * 5)) * -10);
      ctx.rotate(t * 3);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -24); ctx.lineTo(24, 18); ctx.lineTo(-24, 18); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-12, 4, 24, 14);
    } else if (kind === 'gold_chest') {
      const gl = 0.8 + 0.2 * Math.sin(t * 6);
      ctx.fillStyle = '#b45309';
      rr(ctx, -38, -22, 76, 48, 8);
      ctx.fill();
      ctx.fillStyle = `rgba(250, 204, 21, ${gl})`;
      rr(ctx, -34, -28, 68, 18, 6);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨🪙✨', 0, -38);
    } else if (kind === 'shinkansen') {
      const tx = ((t * 190) % 1040) - 200;
      ctx.translate(tx, 0);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      rr(ctx, -180, -34, 280, 44, 20);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-170, -6, 250, 8);
      ctx.fillStyle = '#1e293b';
      for (let wx = -150; wx < 50; wx += 30) ctx.fillRect(wx, -24, 18, 12);
    } else if (kind === 'lotus') {
      const sway = Math.sin(t * 2.2) * 0.06;
      ctx.rotate(sway);
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.ellipse(0, 26, 52, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      [-18, 0, 18].forEach((px, i) => {
        ctx.fillStyle = i === 1 ? '#ffffff' : '#fce7f3';
        ctx.strokeStyle = '#db2777';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(px, -4, 14, 26, px * 0.03, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
      });
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 6, 8, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'traffic_signal') {
      const lit = extra || 'red';
      ctx.fillStyle = '#1e293b';
      rr(ctx, -28, -90, 56, 150, 16);
      ctx.fill();
      const map = [
        { k: 'red', y: -58, on: '#ef4444' },
        { k: 'yellow', y: -15, on: '#facc15' },
        { k: 'green', y: 28, on: '#22c55e' }
      ];
      map.forEach(m => {
        ctx.fillStyle = lit === m.k ? m.on : '#334155';
        ctx.beginPath();
        ctx.arc(0, m.y, 16, 0, Math.PI * 2);
        ctx.fill();
        if (lit === m.k) {
          ctx.fillStyle = 'rgba(255,255,255,0.35)';
          ctx.beginPath();
          ctx.arc(-4, m.y - 4, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    } else if (kind === 'car') {
      const cx = extra === 'stop' ? -80 : (extra === 'slow' ? ((t * 45) % 240) - 180 : ((t * 210) % 860) - 360);
      ctx.translate(cx, Math.sin(t * 14) * 1.5);
      ctx.fillStyle = '#ef4444';
      rr(ctx, -56, -24, 112, 34, 12);
      ctx.fill();
      ctx.fillStyle = '#fca5a5';
      rr(ctx, -34, -46, 62, 24, 8);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-32, 12, 12, 0, Math.PI * 2);
      ctx.arc(32, 12, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'eco_bin') {
      const binType = extra || 'recycle';
      const col = binType === 'organic' ? '#16a34a' : (binType === 'recycle' ? '#ca8a04' : '#dc2626');
      const emoji = binType === 'organic' ? '🍌🥬' : (binType === 'recycle' ? '🍼📰' : '🔋💡');
      ctx.fillStyle = col;
      rr(ctx, -44, -30, 88, 96, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(emoji, 0, -52 + Math.abs(Math.sin(t * 4)) * -20);
    } else if (kind === 'emoji_big') {
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      ctx.scale(pulse, pulse);
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(extra || '✨', 0, 0);
    }
    ctx.restore();
  }

  function drawBubble(ctx, x, y, text) {
    if (!text) return;
    ctx.save();
    ctx.font = 'bold 13px Nunito, sans-serif';
    const w = Math.min(260, ctx.measureText(text).width + 24);
    const bx = Math.max(14, Math.min(826 - w, x - w / 2));
    const by = Math.max(12, y);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    rr(ctx, bx, by, w, 30, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + w / 2, by + 15);
    ctx.restore();
  }

  // Distinct per-sentence storyboards (111+ completely unique visual scenes!)
  const STORYBOARDS = {
    ja_story_1: [
      { env: 'garden_morning', props: [['seed_drop', 430, 265], ['turnip', 430, 315, 'tiny']], actors: [['person', 250, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Gieo hạt nhỏ 🌱', 'idle']] },
      { env: 'garden_bright',  props: [['turnip', 450, 310, 'medium'], ['emoji_big', 450, 175, '💧✨']], actors: [['person', 240, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Mau lớn thật to nhé!', 'idle']] },
      { env: 'garden_bright',  props: [['turnip', 500, 310, 'giant'], ['emoji_big', 500, 165, '🌟']], actors: [['person', 230, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ôi to khổng lồ!', 'jump']] },
      { env: 'garden_morning', props: [['turnip', 610, 310, 'pull']], actors: [['person', 430, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Hò dô ta!', 'pull']] },
      { env: 'garden_morning', props: [['turnip', 640, 310, 'pull']], actors: [['person', 475, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 370, 275, 0.98, '#fde68a', '#f1f5f9', '#ec4899', false, 'Bà ơi giúp!', 'pull']] },
      { env: 'garden_bright',  props: [['turnip', 670, 310, 'pull']], actors: [['person', 515, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 420, 275, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'pull'], ['person', 330, 285, 0.85, '#fef3c7', '#451a03', '#f59e0b', false, 'Cháu phụ nào!', 'pull']] },
      { env: 'garden_bright',  props: [['turnip', 690, 310, 'pull']], actors: [['animal', 'dog', 460, 290, 0.9, 'run'], ['animal', 'cat', 360, 295, 0.85, 'run'], ['animal', 'mouse', 260, 305, 0.7, 'jump']] },
      { env: 'construction',   props: [['turnip', 705, 310, 'pull']], actors: [['person', 560, 275, 0.92, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 480, 275, 0.88, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'pull'], ['person', 405, 285, 0.78, '#fef3c7', '#451a03', '#f59e0b', false, null, 'pull'], ['animal', 'dog', 335, 295, 0.72, 'run'], ['animal', 'cat', 265, 300, 0.65, 'run'], ['animal', 'mouse', 200, 308, 0.55, 'run']] },
      { env: 'rainbow_meadow', props: [['turnip', 560, 300, 'fly'], ['emoji_big', 420, 120, '🎉✨']], actors: [['person', 220, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, 'Bật lên rồi!', 'jump'], ['person', 320, 275, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, 'Hoan hô!', 'jump'], ['animal', 'mouse', 410, 295, 0.8, 'jump']] }
    ],
    ja_story_2: [
      { env: 'school_yard', props: [['emoji_big', 220, 130, '☀️']], actors: [['person', 180, 280, 0.9, '#fef3c7', '#0f172a', '#2563eb', false, 'Tập thể dục!', 'jump'], ['person', 290, 280, 0.9, '#fef3c7', '#78350f', '#f43f5e', false, null, 'jump'], ['person', 400, 280, 0.9, '#fef3c7', '#0f172a', '#10b981', false, null, 'jump']] },
      { env: 'school_yard', props: [['whale_cloud', 420, 120]], actors: [['person', 230, 285, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Ôi! Đám mây cá voi!', 'idle'], ['person', 350, 285, 0.95, '#fef3c7', '#78350f', '#f43f5e', false, null, 'idle']] },
      { env: 'garden_bright', props: [['whale_cloud', 460, 128]], actors: [['person', 260, 280, 1, '#fef3c7', '#0f172a', '#f97316', false, 'Bay lại đây đi!', 'jump'], ['person', 410, 280, 1, '#fef3c7', '#78350f', '#8b5cf6', false, null, 'jump']] },
      { env: 'garden_bright', props: [['whale_cloud', 430, 135], ['emoji_big', 280, 195, '⬆️']], actors: [['person', 250, 250, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Một, hai, ba! Bật!', 'jump'], ['person', 360, 250, 0.95, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] },
      { env: 'sky_high', props: [['whale_cloud', 420, 210]], actors: [['person', 350, 155, 0.82, '#fef3c7', '#0f172a', '#2563eb', false, 'Bay lên cao quá!', 'idle'], ['person', 425, 155, 0.82, '#fef3c7', '#78350f', '#ec4899', false, null, 'idle'], ['person', 495, 158, 0.82, '#fef3c7', '#0f172a', '#10b981', false, null, 'idle']] },
      { env: 'storm_sea', props: [['whale_cloud', 430, 120], ['emoji_big', 240, 320, '🏙️'], ['emoji_big', 560, 330, '🚢']], actors: [['person', 400, 75, 0.7, '#fef3c7', '#0f172a', '#f97316', false, 'Nhìn xuống biển xanh!', 'idle']] },
      { env: 'school_yard', props: [['whale_cloud', 430, 110], ['emoji_big', 620, 195, '🔔🎶']], actors: [['person', 380, 70, 0.72, '#fef3c7', '#0f172a', '#2563eb', false, 'Chuông ăn trưa reng!', 'idle']] },
      { env: 'rainbow_meadow', props: [['whale_cloud', 580, 110]], actors: [['person', 230, 285, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Tạm biệt Cá Voi nhé! 👋', 'jump'], ['person', 360, 285, 0.95, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] }
    ],
    ja_story_3: [
      { env: 'mountain_cabin', props: [['spinning_wheel', 420, 290]], actors: [['person', 220, 280, 0.98, '#fde68a', '#475569', '#78350f', true, 'Trên núi sâu...', 'idle'], ['person', 320, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, null, 'idle']] },
      { env: 'cabin_night', props: [['emoji_big', 250, 295, '🌿']], actors: [['animal', 'tanuki', 220, 305, 0.95, 'idle'], ['person', 520, 280, 0.9, '#fde68a', '#94a3b8', '#db2777', false, 'Chú Lửng lén nhìn', 'idle']] },
      { env: 'cabin_night', props: [['spinning_wheel', 430, 275]], actors: [['person', 330, 275, 0.98, '#fde68a', '#94a3b8', '#db2777', false, 'Kii-kara-kara!', 'idle'], ['animal', 'tanuki', 560, 295, 0.9, 'jump']] },
      { env: 'morning_sad', props: [['emoji_big', 420, 170, '🪢']], actors: [['animal', 'tanuki', 420, 225, 0.95, 'idle'], ['person', 240, 280, 1, '#fde68a', '#475569', '#78350f', true, 'Bắt được chú rồi!', 'sad']] },
      { env: 'forest_path', props: [['emoji_big', 220, 250, '✂️✨']], actors: [['person', 210, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, 'Chạy về rừng mau!', 'idle'], ['animal', 'tanuki', 540, 290, 0.95, 'run']] },
      { env: 'winter_snow', props: [['emoji_big', 420, 260, '❄️🤒']], actors: [['person', 300, 280, 0.95, '#fde68a', '#475569', '#78350f', true, 'Trời đông lạnh quá!', 'sad']] },
      { env: 'cabin_night', props: [['spinning_wheel', 470, 275]], actors: [['animal', 'tanuki', 350, 285, 1.05, 'run'], ['emoji_big', 620, 130, '🌙']] },
      { env: 'kitchen_home', props: [['gold_chest', 540, 285]], actors: [['person', 230, 280, 0.98, '#fde68a', '#475569', '#78350f', true, 'Cảm ơn Lửng! 💖', 'jump'], ['person', 340, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, null, 'jump']] }
    ],
    ja_story_4: [
      { env: 'garden_bright', props: [['emoji_big', 420, 180, '💖']], actors: [['person', 310, 285, 0.9, '#fef3c7', '#451a03', '#0284c7', false, 'Cùng nhau lớn lên!', 'jump'], ['animal', 'dog', 460, 295, 0.9, 'run']] },
      { env: 'garden_morning', props: [['emoji_big', 520, 190, '🐾']], actors: [['person', 300, 270, 1.15, '#fef3c7', '#451a03', '#0284c7', false, 'Tớ cao lớn rồi!', 'idle'], ['animal', 'elf_old', 460, 300, 0.95, 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 560, 220, '🪜']], actors: [['person', 360, 270, 1.08, '#fef3c7', '#451a03', '#0284c7', false, 'Tớ bế Elf lên nhé!', 'idle'], ['animal', 'elf_old', 435, 255, 0.78, 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 600, 150, '🌙✨']], actors: [['person', 320, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Vuốt ve ấm áp', 'idle'], ['animal', 'elf_old', 465, 295, 0.95, 'sleep']] },
      { env: 'bedroom_warm', props: [['emoji_big', 420, 160, '💖✨']], actors: [['person', 310, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Mãi yêu Elf!', 'jump'], ['animal', 'elf_old', 475, 295, 0.95, 'jump']] },
      { env: 'morning_sad', props: [['emoji_big', 475, 210, '🌟🕊️']], actors: [['person', 300, 280, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Tạm biệt Elf...', 'sad'], ['animal', 'elf_old', 475, 300, 0.95, 'sleep']] },
      { env: 'porch_day', props: [['emoji_big', 580, 220, '🐶']], actors: [['person', 290, 280, 1.02, '#fef3c7', '#451a03', '#0284c7', false, 'Mình vẫn nhớ Elf!', 'idle'], ['person', 480, 280, 0.95, '#fef3c7', '#78350f', '#ec4899', false, null, 'idle']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 420, 175, '❤️✨']], actors: [['person', 330, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Trong tim luôn ấm áp!', 'jump'], ['animal', 'dog', 480, 290, 0.92, 'jump']] }
    ],
    ja_story_5: [
      { env: 'morning_sad', props: [['emoji_big', 440, 210, '💭']], actors: [['animal', 'toad', 430, 295, 1.1, 'idle']] },
      { env: 'porch_day', props: [['emoji_big', 350, 200, '✉️❓']], actors: [['animal', 'frog', 310, 290, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'kitchen_home', props: [['emoji_big', 480, 235, '✍️✉️']], actors: [['animal', 'frog', 340, 285, 1.05, 'jump']] },
      { env: 'forest_path', props: [['emoji_big', 520, 230, '✉️💨']], actors: [['animal', 'frog', 260, 290, 1, 'jump'], ['animal', 'snail', 480, 305, 0.95, 'run']] },
      { env: 'porch_day', props: [['emoji_big', 410, 185, '☀️']], actors: [['animal', 'frog', 320, 295, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'porch_rain', props: [['emoji_big', 410, 170, '⏳ 4 ngày']], actors: [['animal', 'frog', 320, 295, 1.05, 'idle'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 420, 180, '💌💖']], actors: [['animal', 'frog', 320, 295, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'jump']] },
      { env: 'cabin_night', props: [['emoji_big', 410, 180, '✉️🎉']], actors: [['animal', 'snail', 220, 305, 0.9, 'run'], ['animal', 'frog', 380, 285, 1.05, 'jump'], ['animal', 'toad', 520, 285, 1.05, 'jump']] }
    ],
    ja_story_6: [
      { env: 'river_stream', props: [['peach', 540, 280]], actors: [['person', 250, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, 'Quả đào to trôi tới!', 'jump']] },
      { env: 'kitchen_home', props: [['peach', 440, 295], ['emoji_big', 440, 180, '👶✨']], actors: [['person', 250, 280, 0.95, '#fde68a', '#e2e8f0', '#0284c7', true, 'Đặt tên là Momotaro!', 'jump'], ['person', 600, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'jump']] },
      { env: 'garden_bright', props: [['emoji_big', 520, 220, '🎌⚔️']], actors: [['person', 360, 275, 1.1, '#fef3c7', '#0f172a', '#dc2626', false, 'Đi dẹp lũ quỷ!', 'jump']] },
      { env: 'mountain_cabin', props: [['emoji_big', 440, 235, '🍡']], actors: [['person', 320, 280, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Mang bánh kê ngon!', 'idle'], ['person', 500, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'idle']] },
      { env: 'forest_path', props: [['emoji_big', 220, 200, '🍡✨']], actors: [['person', 210, 280, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Kết bạn đồng hành!', 'idle'], ['animal', 'dog', 360, 295, 0.85, 'jump'], ['animal', 'monkey', 475, 295, 0.85, 'jump'], ['animal', 'bird', 590, 250, 0.85, 'jump']] },
      { env: 'storm_sea', props: [['emoji_big', 420, 250, '⛵🌊']], actors: [['person', 360, 210, 0.85, '#fef3c7', '#0f172a', '#dc2626', false, 'Vượt sóng tới Đảo Quỷ!', 'idle'], ['animal', 'dog', 460, 218, 0.72, 'run']] },
      { env: 'oni_island', props: [['emoji_big', 580, 220, '💥⚡']], actors: [['person', 220, 275, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Đồng lòng chiến thắng!', 'jump'], ['animal', 'dog', 340, 290, 0.85, 'run'], ['animal', 'monkey', 440, 280, 0.85, 'jump'], ['animal', 'bird', 515, 210, 0.85, 'run']] },
      { env: 'rainbow_meadow', props: [['gold_chest', 540, 285]], actors: [['person', 250, 275, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Mang kho báu về làng! 🎉', 'jump'], ['person', 370, 280, 0.95, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'jump']] }
    ],
    ja_story_7: [
      { env: 'city_road', props: [['car', 420, 315, 'go'], ['emoji_big', 580, 260, '🚙🚕']], actors: [] },
      { env: 'city_road', img: 'images/vehicles/veh_xe_buyt.jpg', props: [['emoji_big', 170, 130, '🚌🪟']], actors: [] },
      { env: 'construction', img: 'images/vehicles/veh_xe_tai.jpg', props: [['emoji_big', 170, 130, '🚚📦']], actors: [] },
      { env: 'city_road', props: [['emoji_big', 320, 305, '🛞'], ['emoji_big', 440, 305, '🛞'], ['emoji_big', 560, 305, '🛞']], actors: [] },
      { env: 'construction', props: [['emoji_big', 420, 220, '🏗️⬆️']], actors: [] },
      { env: 'construction', props: [['emoji_big', 420, 260, '🏗️⚓']], actors: [] },
      { env: 'city_road', img: 'images/vehicles/veh_xe_cuu_hoa.jpg', props: [['emoji_big', 165, 125, '🚒🚓🚨']], actors: [] },
      { env: 'rainbow_meadow', props: [['car', 420, 305, 'go'], ['shinkansen', 420, 235]], actors: [] }
    ],
    ja_story_8: [
      { env: 'savanna', props: [['emoji_big', 420, 175, '🦁🦓🦘']], actors: [] },
      { env: 'savanna', props: [['emoji_big', 500, 180, '💤']], actors: [['animal', 'lion_baby', 420, 295, 1.05, 'sleep']] },
      { env: 'savanna', props: [['emoji_big', 480, 190, '🥛🐾']], actors: [['animal', 'lion_baby', 350, 295, 1.05, 'run'], ['animal', 'lion_baby', 500, 265, 1.45, 'idle']] },
      { env: 'garden_bright', props: [['emoji_big', 530, 170, '✨']], actors: [['animal', 'zebra', 420, 285, 1.25, 'idle']] },
      { env: 'savanna', props: [['emoji_big', 560, 240, '💨']], actors: [['animal', 'zebra', 400, 285, 1.25, 'run']] },
      { env: 'forest_path', props: [['emoji_big', 420, 190, '👍']], actors: [['animal', 'kangaroo', 420, 305, 0.7, 'jump']] },
      { env: 'garden_morning', props: [['emoji_big', 460, 180, '💖']], actors: [['animal', 'kangaroo', 380, 275, 1.4, 'idle'], ['animal', 'kangaroo', 440, 285, 0.65, 'jump']] },
      { env: 'rainbow_meadow', props: [], actors: [['animal', 'lion_baby', 240, 295, 1.0, 'jump'], ['animal', 'zebra', 420, 285, 1.15, 'run'], ['animal', 'kangaroo', 600, 285, 1.1, 'jump']] }
    ],
    ja_story_9: [
      { env: 'mountain_cabin', props: [['emoji_big', 560, 220, '🪓🪵']], actors: [['person', 280, 280, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Lên núi đốn củi!', 'idle']] },
      { env: 'forest_path', props: [['riceball', 490, 285]], actors: [['person', 250, 280, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ôi cơm nắm lăn!', 'jump']] },
      { env: 'cave_gold', props: [['riceball', 480, 295], ['emoji_big', 480, 185, '🎵🎶']], actors: [['animal', 'mouse', 290, 305, 0.85, 'jump']] },
      { env: 'cave_gold', props: [['riceball', 520, 305]], actors: [['person', 340, 265, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ùm! Trượt chân!', 'jump']] },
      { env: 'cave_gold', props: [['emoji_big', 430, 210, '🍡🔨']], actors: [['animal', 'mouse', 270, 300, 0.9, 'jump'], ['animal', 'mouse', 380, 300, 0.9, 'run'], ['person', 550, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ngon quá!', 'jump']] },
      { env: 'cave_gold', props: [['gold_chest', 460, 285]], actors: [['person', 250, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Rương vàng lấp lánh!', 'jump'], ['animal', 'mouse', 620, 300, 0.85, 'jump']] },
      { env: 'forest_path', props: [['riceball', 520, 295]], actors: [['person', 310, 280, 1.05, '#fed7aa', '#0f172a', '#7c2d12', false, 'Ta cũng thả cơm!', 'jump']] },
      { env: 'cave_dark', props: [['emoji_big', 420, 180, '🙀💨🌑']], actors: [['person', 420, 285, 1.05, '#fed7aa', '#0f172a', '#7c2d12', false, 'Mất sạch rồi! Hu hu!', 'sad']] }
    ],
    ja_story_10: [
      { env: 'garden_morning', props: [['riceball', 280, 285], ['emoji_big', 560, 285, '🫘']], actors: [['animal', 'crab', 240, 295, 0.95, 'idle'], ['animal', 'monkey', 520, 290, 1, 'jump']] },
      { env: 'garden_bright', props: [['seed_drop', 480, 275], ['emoji_big', 480, 180, '💧']], actors: [['animal', 'crab', 290, 295, 1.05, 'jump']] },
      { env: 'persimmon_tree', props: [['emoji_big', 500, 180, '🌳🍊🍊']], actors: [['animal', 'crab', 260, 300, 1, 'idle']] },
      { env: 'persimmon_tree', props: [['emoji_big', 480, 165, '🌳🍊'], ['emoji_big', 320, 250, '🟢⬇️']], actors: [['animal', 'monkey', 480, 120, 0.88, 'jump'], ['animal', 'crab', 290, 305, 1, 'idle']] },
      { env: 'forest_path', props: [['emoji_big', 410, 290, '🌰🐝🪨']], actors: [['animal', 'crab', 230, 295, 1, 'run']] },
      { env: 'kitchen_home', props: [['emoji_big', 360, 270, '🌰🐝🪨']], actors: [['animal', 'crab', 210, 295, 0.95, 'idle']] },
      { env: 'kitchen_home', props: [['emoji_big', 450, 210, '💥🌰🐝🪨']], actors: [['animal', 'monkey', 520, 280, 1.05, 'jump']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 430, 175, '🍊🤝🍊']], actors: [['animal', 'monkey', 320, 285, 1, 'idle'], ['animal', 'crab', 480, 295, 1, 'jump']] }
    ],
    st_vn1: [
      { env: 'garden_morning', props: [['emoji_big', 420, 170, '☀️✨']], actors: [] },
      { env: 'school_yard', props: [['emoji_big', 250, 170, '🌞']], actors: [] },
      { env: 'garden_bright', props: [['emoji_big', 450, 220, '🎒']], actors: [['person', 320, 275, 1.08, '#fef3c7', '#0f172a', '#0284c7', false, 'Đi học vui quá!', 'jump']] },
      { env: 'school_yard', props: [], actors: [['person', 320, 275, 1.05, '#fef3c7', '#0f172a', '#0284c7', false, 'Chào cô và bạn!', 'jump'], ['person', 450, 275, 1, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] }
    ],
    st_vn2: [
      { env: 'kitchen_home', props: [['emoji_big', 420, 220, '🍚🍲♨️']], actors: [['person', 280, 280, 1, '#fef3c7', '#0f172a', '#ec4899', false, 'Cơm mẹ nấu thật ngon!', 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 430, 225, '🛏️🌙✨']], actors: [['person', 310, 280, 1, '#fef3c7', '#0f172a', '#ec4899', false, 'Ngủ ngoan con nhé', 'idle']] },
      { env: 'porch_day', props: [['emoji_big', 470, 235, '📖✏️']], actors: [['person', 320, 280, 1, '#fef3c7', '#0f172a', '#0284c7', false, 'Ghi nhớ công ơn mẹ!', 'idle']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 420, 175, '🏆💖']], actors: [['person', 330, 275, 1.05, '#fef3c7', '#0f172a', '#0284c7', false, 'Chăm ngoan học giỏi!', 'jump'], ['person', 470, 275, 1.02, '#fef3c7', '#0f172a', '#ec4899', false, null, 'jump']] }
    ],
    st_vn3: [
      { env: 'garden_morning', props: [['emoji_big', 430, 220, '🌿']], actors: [['animal', 'bird', 420, 170, 0.9, 'jump']] },
      { env: 'garden_bright', props: [['emoji_big', 320, 210, '🌿'], ['emoji_big', 550, 210, '🐛']], actors: [['animal', 'bird', 430, 190, 0.95, 'run']] },
      { env: 'forest_path', props: [['emoji_big', 430, 180, '🐛✨']], actors: [['animal', 'bird', 320, 200, 1, 'jump']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 450, 210, '🍈✨']], actors: [['animal', 'bird', 290, 200, 0.95, 'jump']] }
    ],
    st_vn4: [
      { env: 'rain_garden', props: [['emoji_big', 420, 180, '🌧️💧']], actors: [] },
      { env: 'rain_garden', props: [['turnip', 320, 315, 'medium'], ['turnip', 450, 315, 'medium'], ['turnip', 580, 315, 'medium']], actors: [] },
      { env: 'garden_bright', props: [['emoji_big', 420, 165, '🌤️☀️✨']], actors: [] },
      { env: 'rainbow_meadow', props: [['emoji_big', 300, 210, '🦋'], ['emoji_big', 560, 195, '🦋']], actors: [] }
    ],
    st_vn5: [
      { env: 'shinkansen_fuji', img: 'images/vehicles/veh_tau_hoa.jpg', props: [['emoji_big', 155, 120, '🚅✨']], actors: [] },
      { env: 'shinkansen_fuji', props: [['shinkansen', 420, 295]], actors: [] },
      { env: 'city_road', props: [['shinkansen', 420, 295], ['emoji_big', 420, 140, '🪟😊']], actors: [] },
      { env: 'rainbow_meadow', props: [['shinkansen', 420, 295], ['emoji_big', 420, 130, '🎉🏁']], actors: [] }
    ],
    st_vn6: [
      { env: 'lotus_pond', props: [['lotus', 320, 270], ['lotus', 520, 280]], actors: [] },
      { env: 'lotus_pond', props: [['lotus', 420, 255], ['emoji_big', 420, 150, '✨']], actors: [] },
      { env: 'garden_morning', props: [['lotus', 420, 275], ['emoji_big', 280, 175, '🌬️🌸']], actors: [] },
      { env: 'rainbow_meadow', props: [['lotus', 420, 265], ['emoji_big', 420, 145, '🇻🇳❤️']], actors: [] }
    ],
    traffic_hero: [
      { env: 'city_road', props: [['traffic_signal', 680, 210, 'red'], ['car', 420, 305, 'stop']], actors: [] },
      { env: 'city_road', props: [['traffic_signal', 680, 210, 'yellow'], ['car', 420, 305, 'slow']], actors: [] },
      { env: 'city_road', props: [['traffic_signal', 680, 210, 'green'], ['car', 420, 305, 'go']], actors: [] },
      { env: 'garden_bright', props: [['eco_bin', 420, 285, 'organic']], actors: [] },
      { env: 'city_road', props: [['eco_bin', 420, 285, 'recycle']], actors: [] },
      { env: 'construction', props: [['eco_bin', 420, 285, 'hazard']], actors: [] }
    ]
  };

  function drawSceneAnimated(ctx, W, H, payload, sc, sceneIdx, nowMs, imgCache, paused) {
    const t = nowMs / 1000;
    const mt = paused ? 0 : t;
    const board = STORYBOARDS[payload.id];
    const spec = board ? (board[sceneIdx % board.length] || board[0]) : null;

    if (spec) {
      drawBackdrop(ctx, W, H, spec.env, t, paused);
      // Optional blended real photo vignette when specified (e.g. comparison vehicles/Shinkansen)
      if (spec.img && imgCache.has(spec.img)) {
        const im = imgCache.get(spec.img);
        if (im && im.complete && im.naturalWidth > 0) {
          ctx.save();
          rr(ctx, 210, 52, 420, 240, 20);
          ctx.clip();
          const zoom = paused ? 1 : (1.02 + Math.sin(mt * 0.7) * 0.03);
          const ratio = Math.max(420 / im.naturalWidth, 240 / im.naturalHeight) * zoom;
          const dw = im.naturalWidth * ratio;
          const dh = im.naturalHeight * ratio;
          ctx.drawImage(im, 420 - dw / 2, 172 - dh / 2, dw, dh);
          ctx.restore();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          rr(ctx, 210, 52, 420, 240, 20);
          ctx.stroke();
        }
      }
      if (Array.isArray(spec.props)) {
        spec.props.forEach(([pKind, px, py, extra]) => drawProp(ctx, pKind, px, py, mt, extra));
      }
      if (Array.isArray(spec.actors)) {
        spec.actors.forEach(a => {
          if (a[0] === 'person') {
            drawCirclePerson(ctx, a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], mt, a[9]);
          } else if (a[0] === 'animal') {
            drawAnimal(ctx, a[1], a[2], a[3], a[4], mt, a[5]);
          } else if (a[0] === 'emoji_big') {
            drawProp(ctx, 'emoji_big', a[1], a[2], mt, a[3]);
          }
        });
      }
      return true;
    }

    // Dynamic themed photo overlays for Mini-Movies (dino_world, dragon_kingdom, vehicle_parade, asagao_cycle)
    const theme = payload.fxTheme || 'star';
    if (theme === 'vehicle') {
      drawBackdrop(ctx, W, H, 'city_road', t, paused);
    } else if (theme === 'dino') {
      drawBackdrop(ctx, W, H, 'forest_path', t, paused);
    } else if (theme === 'dragon') {
      drawBackdrop(ctx, W, H, sceneIdx % 2 === 0 ? 'oni_island' : 'storm_sea', t, paused);
    } else {
      drawBackdrop(ctx, W, H, 'garden_bright', t, paused);
    }

    const im = sc.img ? imgCache.get(sc.img) : null;
    if (im && im.complete && im.naturalWidth > 0) {
      ctx.save();
      const fw = 520;
      const fh = 290;
      const fx = (W - fw) / 2;
      const fy = 42 + (paused ? 0 : Math.sin(mt * 2.4) * 5);
      rr(ctx, fx, fy, fw, fh, 22);
      ctx.clip();
      const zoom = paused ? 1.02 : (1.03 + Math.sin(mt * 0.7) * 0.045);
      const ratio = Math.max(fw / im.naturalWidth, fh / im.naturalHeight) * zoom;
      const dw = im.naturalWidth * ratio;
      const dh = im.naturalHeight * ratio;
      ctx.drawImage(im, fx + (fw - dw) / 2, fy + (fh - dh) / 2, dw, dh);
      ctx.restore();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 4;
      rr(ctx, fx, fy, fw, fh, 22);
      ctx.stroke();
    }

    if (theme === 'vehicle' && !paused) {
      // Speed wind streaks racing across bottom road
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        const sx = ((i * 150 - mt * 280) % W + W) % W;
        const sy = H * 0.74 + (i % 3) * 26;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 55, sy);
        ctx.stroke();
      }
    } else if (theme === 'dragon' && !paused) {
      const icons = ['🔥', '💧', '❄️', '🍃', '⭐', '🪨', '⚡', '💖'];
      const ic = icons[sceneIdx % icons.length];
      ctx.font = 'bold 28px sans-serif';
      for (let i = 0; i < 6; i++) {
        const ax = (i * 140 + mt * 60) % W;
        const ay = 70 + ((i * 67 + mt * 40) % 260);
        ctx.fillText(ic, ax, ay);
      }
    } else if (theme === 'dino' && !paused) {
      ctx.font = 'bold 26px sans-serif';
      for (let i = 0; i < 4; i++) {
        const px = 80 + i * 210;
        const py = 365 + Math.sin(mt * 3 + i) * 6;
        ctx.fillText(i % 2 === 0 ? '🐾' : '🌋', px, py);
      }
    }
    return true;
  }

  window.storySceneRenderer = {
    drawSceneAnimated,
    getSceneExtras(payload, sceneIdx) {
      const board = STORYBOARDS[payload.id];
      const spec = board ? (board[sceneIdx % board.length] || board[0]) : null;
      return spec && spec.img ? [spec.img] : [];
    }
  };
})();
