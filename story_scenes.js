/* ========================================================
   ANIMATED STORYBOOK SCENE ENGINE (111+ DISTINCT SCENES AT 60FPS)
   Clear, accurate vector scenes aligned line-by-line to text,
   plus uncropped contain framing for panoramic/tall photos.
   ======================================================== */
(function () {
  'use strict';

  const BACKDROPS = {
    garden_morning: { sky: ['#bae6fd', '#e0f2fe', '#fef3c7'], ground: '#4ade80', hill: '#86efac', sun: true },
    garden_bright:  { sky: ['#38bdf8', '#bae6fd', '#f0fdf4'], ground: '#22c55e', hill: '#4ade80', sun: true },
    school_yard:    { sky: ['#60a5fa', '#bae6fd', '#fef9c3'], ground: '#fde68a', hill: '#86efac', sun: true, school: true },
    sky_high:       { sky: ['#0284c7', '#38bdf8', '#e0f2fe'], ground: null, cloudSea: true },
    sunny_sea_city: { sky: ['#38bdf8', '#7dd3fc', '#fef9c3'], ground: null, buildings: true, oceanWaves: true, sun: true },
    mountain_cabin: { sky: ['#fde68a', '#fed7aa', '#fbcfe8'], ground: '#65a30d', hill: '#4d7c0f', mtns: true, cabin: true },
    cabin_night:    { sky: ['#0f172a', '#1e293b', '#312e81'], ground: '#14532d', hill: '#064e3b', moon: true, stars: true, cabin: true },
    cabin_sick:     { sky: ['#334155', '#475569', '#94a3b8'], ground: '#fde68a', room: true, snowWindow: true },
    winter_snow:    { sky: ['#94a3b8', '#cbd5e1', '#f1f5f9'], ground: '#f8fafc', hill: '#e2e8f0', snow: true, cabin: true },
    bedroom_warm:   { sky: ['#451a03', '#78350f', '#b45309'], ground: '#fde68a', floor: '#d97706', room: true },
    morning_sad:    { sky: ['#64748b', '#94a3b8', '#e2e8f0'], ground: '#fef3c7', room: true },
    porch_day:      { sky: ['#7dd3fc', '#bae6fd', '#fefce8'], ground: '#4ade80', hill: '#86efac', porch: true },
    porch_evening:  { sky: ['#fb923c', '#fdba74', '#fef3c7'], ground: '#22c55e', hill: '#4ade80', porch: true },
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
      const baseH = b.oceanWaves ? H * 0.56 : H * 0.68;
      for (let i = 0; i < 6; i++) {
        const bx = 40 + i * 135;
        const bh = b.oceanWaves ? 42 + (i % 3) * 18 : 95 + (i % 3) * 35;
        ctx.fillStyle = bCols[i % bCols.length];
        ctx.fillRect(bx, baseH - bh, b.oceanWaves ? 62 : 96, bh);
        ctx.fillStyle = '#fef08a';
        for (let wy = 0; wy < (b.oceanWaves ? 2 : 3); wy++) {
          ctx.fillRect(bx + 12, baseH - bh + 12 + wy * 18, 12, 10);
          ctx.fillRect(bx + (b.oceanWaves ? 36 : 54), baseH - bh + 12 + wy * 18, 12, 10);
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

    if (b.porch) {
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(W - 200, H * 0.34, 180, 165);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(W - 220, H * 0.62, 220, 16);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(W - 210, H * 0.34, 12, 165);
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
      ctx.fillStyle = b.snowWindow ? '#fed7aa' : '#fef3c7';
      ctx.fillRect(0, 0, W, H * 0.68);
      ctx.fillStyle = b.snowWindow ? '#cbd5e1' : '#fed7aa';
      ctx.fillRect(W * 0.08, H * 0.14, 128, 96);
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 4;
      ctx.strokeRect(W * 0.08, H * 0.14, 128, 96);
      if (b.snowWindow) {
        ctx.fillStyle = '#ffffff';
        for (let f = 0; f < 6; f++) {
          ctx.beginPath();
          ctx.arc(W * 0.09 + 18 + f * 18, H * 0.14 + 24 + ((f * 23 + mt * 30) % 60), 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
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

    // Custom distinct silhouettes per species
    if (kind === 'crab') {
      // Legs
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      [-22, -16, -10, 10, 16, 22].forEach((lx, i) => {
        const sgn = lx < 0 ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(lx * 0.7, 6);
        ctx.lineTo(lx + sgn * 14, 18 + (i % 2) * 4);
        ctx.stroke();
      });
      // Claws
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 2.5;
      [-28, 28].forEach(cx => {
        ctx.beginPath();
        ctx.arc(cx, -14, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
      // Shell
      ctx.beginPath();
      ctx.ellipse(0, 4, 24, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Eye stalks
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-9, -15, 5, 0, Math.PI * 2);
      ctx.arc(9, -15, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-9, -15, 2.5, 0, Math.PI * 2);
      ctx.arc(9, -15, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (kind === 'bird') {
      const flap = Math.sin(t * 14) * 10;
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#0369a1';
      ctx.lineWidth = 2.5;
      // Wing
      ctx.beginPath();
      ctx.ellipse(-6, -4 + flap * 0.4, 18, 9, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Body & head
      ctx.beginPath();
      ctx.ellipse(0, 6, 18, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(12, -8, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Beak
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(22, -10);
      ctx.lineTo(34, -6);
      ctx.lineTo(22, -2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(15, -10, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (kind === 'snail') {
      ctx.fillStyle = '#fde68a';
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 14, 24, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(-4, -2, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(-4, -2, 9, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(16, 6); ctx.lineTo(22, -8);
      ctx.moveTo(12, 6); ctx.lineTo(14, -8);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (kind === 'frog' || kind === 'toad') {
      const fCol = kind === 'frog' ? '#22c55e' : '#ca8a04';
      const eCol = kind === 'frog' ? '#16a34a' : '#854d0e';
      ctx.fillStyle = fCol;
      ctx.strokeStyle = eCol;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 8, 22, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, -10, 20, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-10, -22, 6, 0, Math.PI * 2);
      ctx.arc(10, -22, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-10, -22, 2.5, 0, Math.PI * 2);
      ctx.arc(10, -22, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (kind === 'oni') {
      ctx.fillStyle = '#a855f7';
      ctx.strokeStyle = '#3b0764';
      ctx.lineWidth = 2.5;
      rr(ctx, -18, 2, 36, 30, 8);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -14, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(-10, -26); ctx.lineTo(-14, -40); ctx.lineTo(-4, -29); ctx.closePath();
      ctx.moveTo(10, -26); ctx.lineTo(14, -40); ctx.lineTo(4, -29); ctx.closePath();
      ctx.fill();
      ctx.restore();
      return;
    }

    const palette = {
      dog:         { body: '#d97706', ear: '#92400e', belly: '#fef3c7' },
      elf_old:     { body: '#f59e0b', ear: '#b45309', belly: '#ffffff' },
      cat:         { body: '#f472b6', ear: '#db2777', belly: '#fdf2f8', pointy: true },
      mouse:       { body: '#94a3b8', ear: '#cbd5e1', belly: '#f8fafc', bigEars: true },
      tanuki:      { body: '#a16207', ear: '#451a03', belly: '#fef3c7' },
      monkey:      { body: '#b45309', ear: '#78350f', belly: '#fde68a' },
      lion_baby:   { body: '#fbbf24', ear: '#d97706', belly: '#fef3c7' },
      lion_mom:    { body: '#f59e0b', ear: '#b45309', belly: '#fef3c7', mane: true },
      zebra:       { body: '#f8fafc', ear: '#1e293b', belly: '#ffffff', stripes: true },
      kangaroo:    { body: '#ea580c', ear: '#9a3412', belly: '#fed7aa', tallEars: true },
      kangaroo_mom:{ body: '#ea580c', ear: '#9a3412', belly: '#fed7aa', tallEars: true, pouch: true }
    };
    const p = palette[kind] || palette.dog;

    // Lion mane behind head
    if (p.mane) {
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(0, -14, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    // Kangaroo balancing tail
    if (p.tallEars) {
      ctx.strokeStyle = p.body;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(16, 18);
      ctx.quadraticCurveTo(38, 22, 42, 4);
      ctx.stroke();
    }

    // Body
    ctx.fillStyle = p.body;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 12, 22, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (p.stripes) {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      [-10, 0, 10].forEach(ox => {
        ctx.beginPath();
        ctx.moveTo(ox, -2);
        ctx.lineTo(ox - 4, 24);
        ctx.stroke();
      });
    }

    if (p.pouch) {
      ctx.fillStyle = '#fed7aa';
      ctx.strokeStyle = '#9a3412';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 15, 13, 0, Math.PI);
      ctx.fill();
      ctx.stroke();
      // Tiny baby joey head inside pouch
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.arc(0, 9, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    // Head
    ctx.fillStyle = p.body;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -14, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ears
    ctx.fillStyle = p.ear;
    if (p.tallEars) {
      ctx.beginPath();
      ctx.ellipse(-9, -34, 5, 13, -0.2, 0, Math.PI * 2);
      ctx.ellipse(9, -34, 5, 13, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (p.pointy) {
      ctx.beginPath();
      ctx.moveTo(-14, -22); ctx.lineTo(-10, -37); ctx.lineTo(-2, -26); ctx.closePath();
      ctx.moveTo(14, -22); ctx.lineTo(10, -37); ctx.lineTo(2, -26); ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      const er = p.bigEars ? 9 : 6;
      ctx.beginPath();
      ctx.arc(-13, -27, er, 0, Math.PI * 2);
      ctx.arc(13, -27, er, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

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
    if (kind === 'soil_patch') {
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(0, 14, 72, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.ellipse(0, 10, 58, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      if (extra === 'sprout') {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(-10, -6, 12, 6, -0.4, 0, Math.PI * 2);
        ctx.ellipse(10, -6, 12, 6, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (kind === 'turnip') {
      const wob = extra === 'pull' ? Math.sin(t * 14) * 0.14 : (extra === 'fly' ? Math.sin(t * 6) * 0.08 : 0);
      const lift = extra === 'fly' ? -45 - Math.abs(Math.sin(t * 3)) * 18 : 0;
      if (extra !== 'fly') {
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.ellipse(0, 22, 66, 16, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.translate(0, lift);
      ctx.rotate(wob);
      const sz = extra === 'tiny' ? 0.45 : (extra === 'medium' ? 0.78 : 1.15);
      ctx.scale(sz, sz);
      ctx.fillStyle = '#16a34a';
      [-14, 0, 14].forEach(lx => {
        ctx.beginPath();
        ctx.ellipse(lx, -44, 11, 24, lx * 0.02, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#fefce8';
      ctx.strokeStyle = '#65a30d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -4, 38, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (kind === 'seed_drop') {
      const dy = (t * 80) % 70;
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.ellipse(0, -40 + dy, 7, 10, 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'pull_rope') {
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-180, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();
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
    } else if (kind === 'peach_split') {
      ctx.fillStyle = '#fb7185';
      ctx.strokeStyle = '#be123c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-18, 8, 30, Math.PI * 0.5, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(18, 8, 30, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(0, -4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-5, -5, 2.5, 0, Math.PI * 2);
      ctx.arc(5, -5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'wooden_boat') {
      const tilt = Math.sin(t * 3) * 0.06;
      ctx.rotate(tilt);
      ctx.fillStyle = '#92400e';
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-125, 0);
      ctx.lineTo(125, 0);
      ctx.lineTo(92, 42);
      ctx.lineTo(-92, 42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -90);
      ctx.stroke();
      ctx.fillStyle = '#fef2f2';
      ctx.fillRect(0, -86, 52, 36);
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(26, -68, 9, 0, Math.PI * 2);
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
    } else if (kind === 'silk_mountain') {
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      [[-28, 12], [28, 12], [0, 12], [-14, -14], [14, -14], [0, -38]].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.ellipse(sx, sy, 28, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    } else if (kind === 'beams_rope') {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-300, -170, 600, 18);
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -152);
      ctx.lineTo(0, -68);
      ctx.stroke();
    } else if (kind === 'sick_bed') {
      ctx.fillStyle = '#e2e8f0';
      rr(ctx, -95, 0, 190, 42, 16);
      ctx.fill();
      ctx.fillStyle = '#60a5fa';
      rr(ctx, -55, 2, 145, 38, 14);
      ctx.fill();
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(-62, -6, 18, 0, Math.PI * 2);
      ctx.fill();
    } else if (kind === 'memory_heart') {
      ctx.fillStyle = '#fef3c7';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      rr(ctx, -44, -44, 88, 88, 18);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🐶💖', 0, 2);
    } else if (kind === 'stairs') {
      ctx.fillStyle = '#b45309';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(-50 + i * 24, 30 - i * 18, 46, 16);
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
    } else if (kind === 'burrow_hole') {
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(0, 12, 42, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (kind === 'mochi_mortar') {
      ctx.fillStyle = '#92400e';
      rr(ctx, -38, -10, 76, 48, 10);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, -10, 32, 12, 0, 0, Math.PI * 2);
      ctx.fill();
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
    } else if (kind === 'crane_truck') {
      const lift = extra === 'outriggers' ? 0 : Math.sin(t * 2) * 18;
      // Chassis & cab
      ctx.fillStyle = '#eab308';
      rr(ctx, -85, -16, 170, 44, 10);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      rr(ctx, 25, -46, 56, 36, 8);
      ctx.fill();
      ctx.fillStyle = '#bae6fd';
      rr(ctx, 42, -38, 32, 22, 5);
      ctx.fill();
      // Outriggers if scene 6
      if (extra === 'outriggers') {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(-95, 16, 14, 34);
        ctx.fillRect(82, 16, 14, 34);
        ctx.fillRect(-102, 46, 28, 6);
        ctx.fillRect(75, 46, 28, 6);
      }
      // Boom arm
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-20, -24);
      ctx.lineTo(-145, -135 + lift);
      ctx.stroke();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-145, -135 + lift);
      ctx.lineTo(-145, -65 + lift);
      ctx.stroke();
      // Wheels
      ctx.fillStyle = '#0f172a';
      [-56, -18, 52].forEach(wx => {
        ctx.beginPath();
        ctx.arc(wx, 34, 15, 0, Math.PI * 2);
        ctx.fill();
      });
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
    } else if (kind === 'veggie_garden') {
      [-130, 0, 130].forEach(ox => {
        ctx.fillStyle = '#78350f';
        rr(ctx, ox - 52, 8, 104, 22, 8);
        ctx.fill();
        [-28, 0, 28].forEach(gx => {
          ctx.fillStyle = '#16a34a';
          ctx.beginPath();
          ctx.arc(ox + gx, -2, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#86efac';
          ctx.beginPath();
          ctx.arc(ox + gx, -4, 9, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    } else if (kind === 'persimmon_tree' || kind === 'fruit_tree') {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-16, -20, 32, 130);
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(0, -68, 78, 0, Math.PI * 2);
      ctx.arc(-50, -45, 50, 0, Math.PI * 2);
      ctx.arc(52, -45, 50, 0, Math.PI * 2);
      ctx.fill();
      const fruitCol = kind === 'persimmon_tree' ? '#f97316' : '#ef4444';
      [[-36, -68], [0, -96], [36, -62], [-22, -36], [24, -34]].forEach(([fx, fy]) => {
        ctx.fillStyle = fruitCol;
        ctx.beginPath();
        ctx.arc(fx, fy, 11, 0, Math.PI * 2);
        ctx.fill();
      });
      if (extra === 'drop_green') {
        const dy = (t * 95) % 110;
        ctx.fillStyle = '#84cc16';
        ctx.beginPath();
        ctx.arc(-110, -40 + dy, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (kind === 'flowers_row') {
      const cols = ['#f43f5e', '#facc15', '#ec4899', '#a855f7', '#fb923c'];
      [-220, -110, 0, 110, 220].forEach((fx, i) => {
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(fx, 26); ctx.lineTo(fx, 0);
        ctx.stroke();
        ctx.fillStyle = cols[i];
        ctx.beginPath();
        ctx.arc(fx, -6, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(fx, -6, 5, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (kind === 'traffic_signal') {
      const lit = extra || 'red';
      ctx.fillStyle = '#1e293b';
      rr(ctx, -28, -90, 56, 150, 16);
      ctx.fill();
      [
        { k: 'red', y: -58, on: '#ef4444' },
        { k: 'yellow', y: -15, on: '#facc15' },
        { k: 'green', y: 28, on: '#22c55e' }
      ].forEach(m => {
        ctx.fillStyle = lit === m.k ? m.on : '#334155';
        ctx.beginPath();
        ctx.arc(0, m.y, 16, 0, Math.PI * 2);
        ctx.fill();
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
      rr(ctx, -46, -30, 92, 98, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(emoji, 0, -52 + Math.abs(Math.sin(t * 4)) * -20);
    } else if (kind === 'emoji_big') {
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      ctx.scale(pulse, pulse);
      ctx.font = 'bold 60px sans-serif';
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
    let by = Math.max(12, y);
    if (bx < 185 && by < 52) by = 52;
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

  // Per-sentence storyboards matching every single caption accurately
  const STORYBOARDS = {
    ja_story_1: [
      { env: 'garden_morning', props: [['seed_drop', 480, 260], ['soil_patch', 480, 315]], actors: [['person', 250, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Gieo hạt nhỏ 🌱', 'idle']] },
      { env: 'garden_bright',  props: [['soil_patch', 480, 315, 'sprout'], ['emoji_big', 480, 185, '💧✨']], actors: [['person', 240, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Mau lớn thật to nhé!', 'idle']] },
      { env: 'garden_bright',  props: [['turnip', 500, 300, 'giant'], ['emoji_big', 500, 140, '🌟']], actors: [['person', 230, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ôi to khổng lồ!', 'jump']] },
      { env: 'garden_morning', props: [['turnip', 610, 300, 'pull'], ['pull_rope', 610, 285]], actors: [['person', 430, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Hò dô ta!', 'pull']] },
      { env: 'garden_morning', props: [['turnip', 640, 300, 'pull'], ['pull_rope', 640, 285]], actors: [['person', 475, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 370, 275, 0.98, '#fde68a', '#f1f5f9', '#ec4899', false, 'Bà ơi giúp!', 'pull']] },
      { env: 'garden_bright',  props: [['turnip', 670, 300, 'pull'], ['pull_rope', 670, 285]], actors: [['person', 515, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 420, 275, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'pull'], ['person', 330, 285, 0.85, '#fef3c7', '#451a03', '#f59e0b', false, 'Cháu phụ nào!', 'pull']] },
      { env: 'garden_bright',  props: [['turnip', 690, 300, 'pull'], ['emoji_big', 350, 175, '🐾💬']], actors: [['animal', 'dog', 460, 290, 0.9, 'run'], ['animal', 'cat', 360, 295, 0.85, 'run'], ['animal', 'mouse', 260, 305, 0.7, 'jump']] },
      { env: 'construction',   props: [['turnip', 705, 300, 'pull'], ['pull_rope', 705, 285]], actors: [['person', 560, 275, 0.92, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'pull'], ['person', 480, 275, 0.88, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'pull'], ['person', 405, 285, 0.78, '#fef3c7', '#451a03', '#f59e0b', false, null, 'pull'], ['animal', 'dog', 335, 295, 0.72, 'run'], ['animal', 'cat', 265, 300, 0.65, 'run'], ['animal', 'mouse', 200, 308, 0.55, 'run']] },
      { env: 'rainbow_meadow', props: [['turnip', 560, 300, 'fly'], ['emoji_big', 420, 120, '🎉✨']], actors: [['person', 220, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, 'Bật lên rồi!', 'jump'], ['person', 320, 275, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, 'Hoan hô!', 'jump'], ['animal', 'mouse', 410, 295, 0.8, 'jump']] }
    ],
    ja_story_2: [
      { env: 'school_yard', props: [['emoji_big', 220, 130, '☀️']], actors: [['person', 180, 280, 0.9, '#fef3c7', '#0f172a', '#2563eb', false, 'Tập thể dục!', 'jump'], ['person', 290, 280, 0.9, '#fef3c7', '#78350f', '#f43f5e', false, null, 'jump'], ['person', 400, 280, 0.9, '#fef3c7', '#0f172a', '#10b981', false, null, 'jump']] },
      { env: 'school_yard', props: [['whale_cloud', 420, 120]], actors: [['person', 230, 285, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Ôi! Đám mây cá voi!', 'idle'], ['person', 350, 285, 0.95, '#fef3c7', '#78350f', '#f43f5e', false, null, 'idle']] },
      { env: 'school_yard', props: [['whale_cloud', 460, 128]], actors: [['person', 260, 280, 1, '#fef3c7', '#0f172a', '#f97316', false, 'Bay lại đây đi!', 'jump'], ['person', 410, 280, 1, '#fef3c7', '#78350f', '#8b5cf6', false, null, 'jump']] },
      { env: 'school_yard', props: [['whale_cloud', 430, 135], ['emoji_big', 280, 195, '⬆️']], actors: [['person', 250, 250, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Một, hai, ba! Bật!', 'jump'], ['person', 360, 250, 0.95, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] },
      { env: 'sky_high', cloudRide: [420, 210], actors: [['person', 355, 165, 0.82, '#fef3c7', '#0f172a', '#2563eb', false, 'Bay lên cao quá!', 'idle'], ['person', 425, 165, 0.82, '#fef3c7', '#78350f', '#ec4899', false, null, 'idle'], ['person', 490, 168, 0.82, '#fef3c7', '#0f172a', '#10b981', false, null, 'idle']] },
      { env: 'sunny_sea_city', cloudRide: [430, 120], props: [['emoji_big', 560, 325, '⛵']], actors: [['person', 405, 76, 0.72, '#fef3c7', '#0f172a', '#f97316', false, 'Nhìn xuống biển xanh!', 'idle']] },
      { env: 'school_yard', cloudRide: [430, 110], props: [['emoji_big', 620, 195, '🔔🎶']], actors: [['person', 405, 68, 0.72, '#fef3c7', '#0f172a', '#2563eb', false, 'Chuông ăn trưa reng!', 'idle']] },
      { env: 'school_yard', props: [['whale_cloud', 580, 110]], actors: [['person', 230, 285, 0.95, '#fef3c7', '#0f172a', '#2563eb', false, 'Tạm biệt Cá Voi nhé! 👋', 'jump'], ['person', 360, 285, 0.95, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] }
    ],
    ja_story_3: [
      { env: 'mountain_cabin', props: [['spinning_wheel', 420, 290]], actors: [['person', 220, 280, 0.98, '#fde68a', '#475569', '#78350f', true, 'Trên núi sâu...', 'idle'], ['person', 320, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, null, 'idle']] },
      { env: 'cabin_night', props: [['emoji_big', 250, 295, '🌿']], actors: [['animal', 'tanuki', 220, 305, 0.95, 'idle'], ['person', 520, 280, 0.9, '#fde68a', '#94a3b8', '#db2777', false, 'Chú Lửng lén nhìn', 'idle']] },
      { env: 'cabin_night', props: [['spinning_wheel', 430, 275]], actors: [['person', 330, 275, 0.98, '#fde68a', '#94a3b8', '#db2777', false, 'Kii-kara-kara!', 'idle'], ['animal', 'tanuki', 560, 295, 0.9, 'jump']] },
      { env: 'morning_sad', props: [['beams_rope', 420, 290]], actors: [['animal', 'tanuki', 420, 215, 0.92, 'idle'], ['person', 220, 280, 1, '#fde68a', '#475569', '#78350f', true, 'Bắt được chú rồi!', 'sad']] },
      { env: 'forest_path', props: [['emoji_big', 220, 250, '✂️✨']], actors: [['person', 210, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, 'Chạy về rừng mau!', 'idle'], ['animal', 'tanuki', 540, 290, 0.95, 'run']] },
      { env: 'cabin_sick', props: [['sick_bed', 490, 275], ['emoji_big', 490, 175, '🤒']], actors: [['person', 290, 280, 0.95, '#fde68a', '#475569', '#78350f', true, 'Trời đông lạnh quá!', 'sad']] },
      { env: 'cabin_night', props: [['spinning_wheel', 470, 275]], actors: [['animal', 'tanuki', 350, 285, 1.05, 'run']] },
      { env: 'kitchen_home', props: [['silk_mountain', 535, 295], ['spinning_wheel', 670, 290]], actors: [['person', 210, 280, 0.98, '#fde68a', '#475569', '#78350f', true, 'Cả núi cuộn tơ mượt! 💖', 'jump'], ['person', 310, 280, 0.95, '#fde68a', '#94a3b8', '#db2777', false, null, 'jump']] }
    ],
    ja_story_4: [
      { env: 'garden_bright', props: [['emoji_big', 420, 180, '💖']], actors: [['person', 310, 285, 0.9, '#fef3c7', '#451a03', '#0284c7', false, 'Cùng nhau lớn lên!', 'jump'], ['animal', 'dog', 460, 295, 0.9, 'run']] },
      { env: 'garden_morning', props: [['emoji_big', 520, 190, '🐾']], actors: [['person', 300, 270, 1.15, '#fef3c7', '#451a03', '#0284c7', false, 'Tớ cao lớn rồi!', 'idle'], ['animal', 'elf_old', 460, 300, 0.95, 'idle']] },
      { env: 'bedroom_warm', props: [['stairs', 520, 275]], actors: [['person', 340, 270, 1.08, '#fef3c7', '#451a03', '#0284c7', false, 'Tớ bế Elf lên nhé!', 'idle'], ['animal', 'elf_old', 390, 255, 0.78, 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 600, 150, '🌙✨']], actors: [['person', 320, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Vuốt ve ấm áp', 'idle'], ['animal', 'elf_old', 465, 295, 0.95, 'sleep']] },
      { env: 'bedroom_warm', props: [['emoji_big', 420, 160, '💖✨']], actors: [['person', 310, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Mãi yêu Elf!', 'jump'], ['animal', 'elf_old', 475, 295, 0.95, 'jump']] },
      { env: 'morning_sad', props: [['emoji_big', 475, 200, '🌟🕊️']], actors: [['person', 300, 280, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Tạm biệt Elf...', 'sad'], ['animal', 'elf_old', 475, 300, 0.95, 'sleep']] },
      { env: 'porch_day', props: [], actors: [['person', 280, 280, 1.02, '#fef3c7', '#451a03', '#0284c7', false, 'Mình vẫn nhớ Elf!', 'idle'], ['person', 470, 280, 0.95, '#fef3c7', '#78350f', '#ec4899', false, 'Tặng bạn cún mới nè', 'idle'], ['animal', 'dog', 560, 298, 0.75, 'idle']] },
      { env: 'rainbow_meadow', props: [['memory_heart', 495, 250]], actors: [['person', 330, 275, 1.05, '#fef3c7', '#451a03', '#0284c7', false, 'Trong tim luôn ấm áp! 💖', 'jump']] }
    ],
    ja_story_5: [
      { env: 'porch_day', props: [['emoji_big', 440, 210, '💭']], actors: [['animal', 'toad', 430, 295, 1.1, 'idle']] },
      { env: 'porch_day', props: [['emoji_big', 350, 200, '✉️❓']], actors: [['animal', 'frog', 310, 290, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'kitchen_home', props: [['emoji_big', 480, 235, '✍️✉️']], actors: [['animal', 'frog', 340, 285, 1.05, 'jump']] },
      { env: 'forest_path', props: [['emoji_big', 520, 230, '✉️💨']], actors: [['animal', 'frog', 260, 290, 1, 'jump'], ['animal', 'snail', 480, 305, 0.95, 'run']] },
      { env: 'porch_day', props: [['emoji_big', 410, 185, '☀️']], actors: [['animal', 'frog', 320, 295, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'porch_evening', props: [['emoji_big', 410, 175, '⏳ 4 ngày']], actors: [['animal', 'frog', 320, 295, 1.05, 'idle'], ['animal', 'toad', 470, 295, 1.05, 'idle']] },
      { env: 'porch_evening', props: [['emoji_big', 420, 180, '💬💖']], actors: [['animal', 'frog', 320, 295, 1.05, 'jump'], ['animal', 'toad', 470, 295, 1.05, 'jump']] },
      { env: 'cabin_night', props: [['emoji_big', 410, 180, '✉️🎉']], actors: [['animal', 'snail', 220, 305, 0.9, 'run'], ['animal', 'frog', 380, 285, 1.05, 'jump'], ['animal', 'toad', 520, 285, 1.05, 'jump']] }
    ],
    ja_story_6: [
      { env: 'river_stream', props: [['peach', 540, 280]], actors: [['person', 250, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, 'Quả đào to trôi tới!', 'jump']] },
      { env: 'kitchen_home', props: [['peach_split', 420, 290]], actors: [['person', 240, 280, 0.95, '#fde68a', '#e2e8f0', '#0284c7', true, 'Đặt tên là Momotaro!', 'jump'], ['person', 600, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'jump']] },
      { env: 'garden_bright', props: [['emoji_big', 520, 220, '🎌⚔️']], actors: [['person', 360, 275, 1.1, '#fef3c7', '#0f172a', '#dc2626', false, 'Đi dẹp lũ quỷ!', 'jump']] },
      { env: 'mountain_cabin', props: [['emoji_big', 440, 235, '🍡']], actors: [['person', 320, 280, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Mang bánh kê ngon!', 'idle'], ['person', 500, 280, 0.95, '#fde68a', '#f1f5f9', '#ec4899', false, null, 'idle']] },
      { env: 'forest_path', props: [['emoji_big', 220, 200, '🍡✨']], actors: [['person', 210, 280, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Kết bạn đồng hành!', 'idle'], ['animal', 'dog', 360, 295, 0.85, 'jump'], ['animal', 'monkey', 475, 295, 0.85, 'jump'], ['animal', 'bird', 590, 250, 0.85, 'jump']] },
      { env: 'storm_sea', props: [['wooden_boat', 420, 245]], actors: [['person', 370, 208, 0.78, '#fef3c7', '#0f172a', '#dc2626', false, 'Vượt sóng tới Đảo Quỷ!', 'idle'], ['animal', 'dog', 460, 218, 0.68, 'run']] },
      { env: 'oni_island', props: [['emoji_big', 530, 180, '💥⚡']], actors: [['person', 200, 275, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Đồng lòng chiến thắng!', 'jump'], ['animal', 'dog', 310, 290, 0.82, 'run'], ['animal', 'monkey', 405, 280, 0.82, 'jump'], ['animal', 'bird', 470, 210, 0.82, 'run'], ['animal', 'oni', 610, 280, 1.08, 'jump']] },
      { env: 'rainbow_meadow', props: [['gold_chest', 540, 285]], actors: [['person', 250, 275, 1.05, '#fef3c7', '#0f172a', '#dc2626', false, 'Mang kho báu về làng! 🎉', 'jump'], ['person', 370, 280, 0.95, '#fde68a', '#e2e8f0', '#0284c7', true, null, 'jump']] }
    ],
    ja_story_7: [
      { env: 'city_road', img: 'images/vehicles/veh_xe_con.jpg', props: [['car', 420, 325, 'go']], actors: [] },
      { env: 'city_road', img: 'images/vehicles/veh_xe_buyt.jpg', props: [['emoji_big', 140, 130, '🚌🪟']], actors: [] },
      { env: 'construction', img: 'images/vehicles/veh_xe_tai.jpg', props: [['emoji_big', 140, 130, '🚚📦']], actors: [] },
      { env: 'city_road', img: 'images/vehicles/veh_xe_tai.jpg', props: [['emoji_big', 140, 130, '🛞🛞']], actors: [] },
      { env: 'construction', props: [['crane_truck', 460, 290]], actors: [] },
      { env: 'construction', props: [['crane_truck', 460, 280, 'outriggers']], actors: [] },
      { env: 'city_road', img: 'images/vehicles/veh_xe_cuu_hoa.jpg', props: [['emoji_big', 140, 130, '🚒🚓🚨']], actors: [] },
      { env: 'rainbow_meadow', props: [['car', 420, 305, 'go'], ['shinkansen', 420, 235]], actors: [] }
    ],
    ja_story_8: [
      { env: 'savanna', props: [], actors: [['animal', 'lion_baby', 240, 295, 0.95, 'idle'], ['animal', 'zebra', 420, 285, 1.1, 'idle'], ['animal', 'kangaroo', 600, 295, 1.0, 'idle']] },
      { env: 'savanna', props: [['emoji_big', 495, 220, '💤']], actors: [['animal', 'lion_baby', 420, 300, 0.95, 'sleep']] },
      { env: 'savanna', props: [['emoji_big', 460, 200, '🥛💖']], actors: [['animal', 'lion_baby', 340, 300, 0.95, 'run'], ['animal', 'lion_mom', 505, 275, 1.35, 'idle']] },
      { env: 'garden_bright', props: [['emoji_big', 530, 175, '✨']], actors: [['animal', 'zebra', 420, 285, 1.25, 'idle']] },
      { env: 'savanna', props: [['emoji_big', 560, 240, '💨']], actors: [['animal', 'zebra', 400, 285, 1.25, 'run']] },
      { env: 'forest_path', props: [['emoji_big', 420, 190, '👍']], actors: [['animal', 'kangaroo', 420, 305, 0.72, 'jump']] },
      { env: 'garden_morning', props: [['emoji_big', 485, 195, '💖']], actors: [['animal', 'kangaroo_mom', 420, 280, 1.35, 'idle']] },
      { env: 'rainbow_meadow', props: [], actors: [['animal', 'lion_baby', 240, 295, 1.0, 'jump'], ['animal', 'zebra', 420, 285, 1.15, 'run'], ['animal', 'kangaroo_mom', 600, 285, 1.1, 'jump']] }
    ],
    ja_story_9: [
      { env: 'mountain_cabin', props: [['emoji_big', 560, 220, '🪓🪵']], actors: [['person', 280, 280, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Lên núi đốn củi!', 'idle']] },
      { env: 'forest_path', props: [['burrow_hole', 590, 300], ['riceball', 450, 285]], actors: [['person', 240, 280, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ôi cơm nắm lăn xuống hang!', 'jump']] },
      { env: 'cave_gold', props: [['riceball', 480, 295], ['emoji_big', 480, 185, '🎵🎶']], actors: [['animal', 'mouse', 290, 305, 0.85, 'jump']] },
      { env: 'cave_gold', props: [['riceball', 520, 305]], actors: [['person', 340, 265, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Ùm! Trượt chân!', 'jump']] },
      { env: 'cave_gold', props: [['mochi_mortar', 415, 290], ['emoji_big', 415, 200, '🔨✨']], actors: [['animal', 'mouse', 270, 300, 0.9, 'jump'], ['animal', 'mouse', 345, 300, 0.9, 'run'], ['person', 565, 275, 1, '#fde68a', '#e2e8f0', '#0284c7', true, 'Bánh mochi ngon quá!', 'jump']] },
      { env: 'cave_gold', props: [['gold_chest', 460, 285]], actors: [['person', 250, 275, 1.05, '#fde68a', '#e2e8f0', '#0284c7', true, 'Rương vàng lấp lánh!', 'jump'], ['animal', 'mouse', 620, 300, 0.85, 'jump']] },
      { env: 'forest_path', props: [['burrow_hole', 590, 300], ['riceball', 480, 295]], actors: [['person', 290, 280, 1.05, '#fed7aa', '#0f172a', '#7c2d12', false, 'Ta cũng thả cơm!', 'jump']] },
      { env: 'cave_dark', props: [['emoji_big', 420, 180, '🙀💨🌑']], actors: [['person', 420, 285, 1.05, '#fed7aa', '#0f172a', '#7c2d12', false, 'Tắt đèn hết rồi! Hu hu!', 'sad']] }
    ],
    ja_story_10: [
      { env: 'garden_morning', props: [['riceball', 290, 285], ['emoji_big', 565, 285, '🫘']], actors: [['animal', 'crab', 235, 295, 0.95, 'idle'], ['animal', 'monkey', 515, 290, 1, 'jump']] },
      { env: 'garden_bright', props: [['soil_patch', 480, 315, 'sprout'], ['emoji_big', 480, 180, '💧']], actors: [['animal', 'crab', 290, 295, 1.05, 'jump']] },
      { env: 'persimmon_tree', props: [['persimmon_tree', 510, 240]], actors: [['animal', 'crab', 260, 300, 1, 'idle']] },
      { env: 'persimmon_tree', props: [['persimmon_tree', 490, 240, 'drop_green']], actors: [['animal', 'monkey', 490, 125, 0.88, 'jump'], ['animal', 'crab', 290, 305, 1, 'idle']] },
      { env: 'forest_path', props: [['emoji_big', 440, 290, '🌰🐝🪨']], actors: [['animal', 'crab', 230, 295, 1, 'run']] },
      { env: 'kitchen_home', props: [['emoji_big', 450, 270, '🌰🐝🪨']], actors: [['animal', 'crab', 210, 295, 0.95, 'idle']] },
      { env: 'kitchen_home', props: [['emoji_big', 380, 210, '💥🌰🐝🪨']], actors: [['animal', 'monkey', 540, 280, 1.05, 'jump']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 430, 175, '🍊🤝🍊']], actors: [['animal', 'monkey', 310, 285, 1, 'idle'], ['animal', 'crab', 490, 295, 1, 'jump']] }
    ],
    st_vn1: [
      { env: 'garden_morning', props: [['flowers_row', 420, 310]], actors: [] },
      { env: 'school_yard', props: [['emoji_big', 360, 165, '🌬️🎶']], actors: [['person', 220, 280, 0.98, '#fef3c7', '#0f172a', '#0284c7', false, 'Gió mây hòa ca!', 'jump']] },
      { env: 'garden_bright', props: [['flowers_row', 420, 315], ['emoji_big', 490, 220, '🎒']], actors: [['person', 310, 275, 1.08, '#fef3c7', '#0f172a', '#0284c7', false, 'Đi học vui quá!', 'jump']] },
      { env: 'school_yard', props: [], actors: [['person', 320, 275, 1.05, '#fef3c7', '#0f172a', '#0284c7', false, 'Chào cô và bạn!', 'jump'], ['person', 450, 275, 1, '#fef3c7', '#78350f', '#ec4899', false, null, 'jump']] }
    ],
    st_vn2: [
      { env: 'kitchen_home', props: [['emoji_big', 420, 220, '🍚🍲♨️']], actors: [['person', 280, 280, 1, '#fef3c7', '#0f172a', '#ec4899', false, 'Cơm mẹ nấu thật ngon!', 'idle']] },
      { env: 'bedroom_warm', props: [['emoji_big', 450, 225, '🛏️🌙✨']], actors: [['person', 310, 280, 1, '#fef3c7', '#0f172a', '#ec4899', false, 'Ngủ ngoan con nhé', 'idle']] },
      { env: 'porch_day', props: [['emoji_big', 500, 235, '📖✏️']], actors: [['person', 250, 280, 1, '#fef3c7', '#0f172a', '#0284c7', false, 'Ghi nhớ công ơn ba mẹ!', 'idle'], ['person', 370, 275, 1.08, '#fef3c7', '#0f172a', '#16a34a', false, null, 'idle']] },
      { env: 'rainbow_meadow', props: [['emoji_big', 420, 165, '🏆💖']], actors: [['person', 290, 275, 1.02, '#fef3c7', '#0f172a', '#0284c7', false, 'Chăm ngoan học giỏi!', 'jump'], ['person', 400, 275, 1.08, '#fef3c7', '#0f172a', '#ec4899', false, null, 'jump'], ['person', 505, 275, 1.12, '#fef3c7', '#0f172a', '#16a34a', false, null, 'jump']] }
    ],
    st_vn3: [
      { env: 'garden_morning', props: [['emoji_big', 480, 230, '🌿']], actors: [['animal', 'bird', 380, 175, 1.05, 'jump']] },
      { env: 'garden_bright', props: [['emoji_big', 320, 210, '🌿'], ['emoji_big', 550, 210, '🐛']], actors: [['animal', 'bird', 430, 190, 1.05, 'run']] },
      { env: 'forest_path', props: [['emoji_big', 470, 200, '🐛✨']], actors: [['animal', 'bird', 330, 200, 1.05, 'jump']] },
      { env: 'rainbow_meadow', props: [['fruit_tree', 520, 240]], actors: [['animal', 'bird', 310, 200, 1.0, 'jump']] }
    ],
    st_vn4: [
      { env: 'rain_garden', props: [['emoji_big', 420, 180, '🌧️💧']], actors: [] },
      { env: 'rain_garden', props: [['veggie_garden', 420, 305]], actors: [] },
      { env: 'rainbow_meadow', props: [['flowers_row', 420, 315]], actors: [] },
      { env: 'rainbow_meadow', props: [['flowers_row', 520, 315], ['emoji_big', 250, 175, '🦋'], ['emoji_big', 590, 165, '🦋']], actors: [['person', 420, 275, 1.05, '#fef3c7', '#0f172a', '#0284c7', false, 'Thích quá đi! 😄', 'jump']] }
    ],
    st_vn5: [
      { env: 'shinkansen_fuji', img: 'images/vehicles/veh_tau_hoa.jpg', props: [['emoji_big', 130, 125, '🚅✨']], actors: [] },
      { env: 'shinkansen_fuji', props: [['shinkansen', 420, 295]], actors: [] },
      { env: 'city_road', props: [['shinkansen', 420, 295], ['emoji_big', 420, 140, '🪟😊']], actors: [] },
      { env: 'rainbow_meadow', props: [['shinkansen', 420, 295], ['emoji_big', 420, 130, '🎉🏁']], actors: [] }
    ],
    st_vn6: [
      { env: 'lotus_pond', props: [['lotus', 320, 270], ['lotus', 520, 280]], actors: [] },
      { env: 'lotus_pond', props: [['lotus', 420, 255], ['emoji_big', 420, 150, '✨']], actors: [] },
      { env: 'lotus_pond', props: [['lotus', 420, 275], ['emoji_big', 290, 170, '🌬️🌸']], actors: [] },
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

  function drawSmartImageFrame(ctx, im, fx, fy, fw, fh, zoom, borderCol) {
    ctx.save();
    rr(ctx, fx, fy, fw, fh, 20);
    ctx.clip();
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(fx, fy, fw, fh);

    const imRatio = im.naturalWidth / im.naturalHeight;
    const boxRatio = fw / fh;
    // Use full contain whenever aspect ratio diverges heavily (e.g. panoramic Shinkansen or vertical Helicopter)
    const ratio = Math.abs(imRatio - boxRatio) > 0.38
      ? Math.min(fw / im.naturalWidth, fh / im.naturalHeight) * 0.96
      : Math.max(fw / im.naturalWidth, fh / im.naturalHeight) * zoom;
    const dw = im.naturalWidth * ratio;
    const dh = im.naturalHeight * ratio;
    ctx.drawImage(im, fx + (fw - dw) / 2, fy + (fh - dh) / 2, dw, dh);
    ctx.restore();
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 4;
    rr(ctx, fx, fy, fw, fh, 20);
    ctx.stroke();
  }

  function drawSceneAnimated(ctx, W, H, payload, sc, sceneIdx, nowMs, imgCache, paused) {
    const t = nowMs / 1000;
    const mt = paused ? 0 : t;
    const board = STORYBOARDS[payload.id];
    const spec = board ? (board[sceneIdx % board.length] || board[0]) : null;

    if (spec) {
      drawBackdrop(ctx, W, H, spec.env, t, paused);
      if (spec.cloudRide) {
        drawProp(ctx, 'whale_cloud', spec.cloudRide[0], spec.cloudRide[1], mt);
      }
      if (spec.img && imgCache.has(spec.img)) {
        const im = imgCache.get(spec.img);
        if (im && im.complete && im.naturalWidth > 0) {
          const zoom = paused ? 1 : (1.02 + Math.sin(mt * 0.7) * 0.03);
          drawSmartImageFrame(ctx, im, 210, 52, 420, 232, zoom, '#ffffff');
        }
      }
      if (Array.isArray(spec.props)) {
        spec.props.forEach(([pKind, px, py, extra]) => drawProp(ctx, pKind, px, py, mt, extra));
      }
      if (Array.isArray(spec.actors)) {
        const rideDx = spec.cloudRide ? Math.sin(mt * 1.4) * 28 : 0;
        const rideDy = spec.cloudRide ? Math.cos(mt * 2) * 10 : 0;
        spec.actors.forEach(a => {
          if (a[0] === 'person') {
            drawCirclePerson(ctx, a[1] + rideDx, a[2] + rideDy, a[3], a[4], a[5], a[6], a[7], a[8], mt, a[9]);
          } else if (a[0] === 'animal') {
            drawAnimal(ctx, a[1], a[2] + rideDx, a[3] + rideDy, a[4], mt, a[5]);
          } else if (a[0] === 'emoji_big') {
            drawProp(ctx, 'emoji_big', a[1], a[2], mt, a[3]);
          }
        });
      }
      return true;
    }

    // Dynamic themed photo overlays for Mini-Movies
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
      const fw = 520;
      const fh = 290;
      const fx = (W - fw) / 2;
      const fy = 42 + (paused ? 0 : Math.sin(mt * 2.4) * 5);
      const zoom = paused ? 1.02 : (1.03 + Math.sin(mt * 0.7) * 0.045);
      drawSmartImageFrame(ctx, im, fx, fy, fw, fh, zoom, '#fde047');
    }

    if (theme === 'vehicle' && !paused) {
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
