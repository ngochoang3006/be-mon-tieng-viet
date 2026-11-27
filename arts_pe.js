// ========================================================
// MÔN ÂM NHẠC, MỸ THUẬT & THỂ DỤC (VN GDPT 2018 & JP MEXT 音楽・図工・体育)
// ========================================================

const PIANICA_NOTES = [
  { note: 'C4', vi: 'Đô', ja: 'ド', freq: 261.63, color: '#ef4444' },
  { note: 'D4', vi: 'Rê', ja: 'レ', freq: 293.66, color: '#f97316' },
  { note: 'E4', vi: 'Mi', ja: 'ミ', freq: 329.63, color: '#f59e0b' },
  { note: 'F4', vi: 'Pha', ja: 'ファ', freq: 349.23, color: '#22c55e' },
  { note: 'G4', vi: 'Son', ja: 'ソ', freq: 392.00, color: '#06b6d4' },
  { note: 'A4', vi: 'La', ja: 'ラ', freq: 440.00, color: '#3b82f6' },
  { note: 'B4', vi: 'Si', ja: 'シ', freq: 493.88, color: '#8b5cf6' },
  { note: 'C5', vi: 'Đố', ja: 'ド↑', freq: 523.25, color: '#ec4899' }
];

const ART_SONGS_DATA = [
  {
    id: 'twinkle',
    title: '⭐ Ngôi Sao Lấp Lánh (キラキラぼし)',
    notes: [0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0],
    labels: 'Đô - Đô - Son - Son - La - La - Son • Pha - Pha - Mi - Mi - Rê - Rê - Đô'
  },
  {
    id: 'butterfly',
    title: '🦋 Kìa Con Bướm Vàng (Frère Jacques)',
    notes: [0, 1, 2, 0, 0, 1, 2, 0, 2, 3, 4, -1, 2, 3, 4],
    labels: 'Đô - Rê - Mi - Đô • Đô - Rê - Mi - Đô • Mi - Pha - Son'
  },
  {
    id: 'choucho',
    title: '🌸 Hoa Bướm Nhật Bản (ちょうちょう / Lightly Row)',
    notes: [4, 2, 2, -1, 3, 1, 1, -1, 0, 1, 2, 3, 4, 4, 4],
    labels: 'Son - Mi - Mi • Pha - Rê - Rê • Đô - Rê - Mi - Pha - Son - Son - Son'
  },
  {
    id: 'mary',
    title: '🐑 Chú Cừu Nhỏ Vui Ca',
    notes: [2, 1, 0, 1, 2, 2, 2, -1, 1, 1, 1, -1, 2, 4, 4],
    labels: 'Mi - Rê - Đô - Rê - Mi - Mi - Mi • Rê - Rê - Rê • Mi - Son - Son'
  },
  {
    id: 'frog',
    title: '🐸 Chú Ếch Con (カエルのうた)',
    notes: [0, 1, 2, 3, 2, 1, 0, -1, 2, 3, 4, 5, 4, 3, 2],
    labels: 'Đô - Rê - Mi - Pha - Mi - Rê - Đô • Mi - Pha - Son - La - Son - Pha - Mi'
  }
];

const ART_COLOR_MIXES = [
  { id: 'art_mix_1', c1: '#ef4444', n1: 'Đỏ', c2: '#eab308', n2: 'Vàng', res: '#f97316', rn: 'Màu Cam 🍊', ja: 'オレンジ' },
  { id: 'art_mix_2', c1: '#3b82f6', n1: 'Xanh dương', c2: '#eab308', n2: 'Vàng', res: '#22c55e', rn: 'Màu Xanh Lá 🌿', ja: 'みどり' },
  { id: 'art_mix_3', c1: '#ef4444', n1: 'Đỏ', c2: '#3b82f6', n2: 'Xanh dương', res: '#8b5cf6', rn: 'Màu Tím 🍇', ja: 'むらさき' },
  { id: 'art_mix_4', c1: '#ef4444', n1: 'Đỏ', c2: '#ffffff', n2: 'Trắng', res: '#f472b6', rn: 'Màu Hồng 🌸', ja: 'ピンク' }
];

const ART_PE_CARDS = [
  { id: 'art_pe_1', icon: '🤸', title: 'Thể dục buổi sáng (ラジオ体操)', desc: 'Vươn vai hít thở sâu, xoay cổ tay cổ chân để người dẻo dai cả ngày.' },
  { id: 'art_pe_2', icon: '🏃', title: 'Chạy bước nhỏ & Bật nhảy', desc: 'Nhảy qua vạch vôi bằng hai chân, tiếp đất nhẹ nhàng bằng mũi bàn chân.' },
  { id: 'art_pe_3', icon: '🪑', title: 'Tư thế ngồi học chuẩn', desc: 'Lưng thẳng, ngực không tì cạnh bàn, mắt cách vở 25–30 xăng-ti-mét.' },
  { id: 'art_pe_4', icon: '🏊', title: 'An toàn bơi lội mùa hè', desc: 'Chỉ xuống hồ bơi khi có ba mẹ đi cùng, khởi động kỹ và mặc áo phao!' },
  { id: 'art_pe_5', icon: '🚲', title: 'Đạp xe đội mũ bảo hiểm', desc: 'Luôn cài quai mũ bảo hiểm vừa vặn khi ngồi sau xe máy hoặc đạp xe.' },
  { id: 'art_pe_6', icon: '🥁', title: 'Giữ nhịp Phách & Trống', desc: 'Vỗ tay đều theo nhịp 1-2-3-4 giúp cảm nhận âm nhạc thật chuẩn xác.' }
];

const ARTS_QUIZ_DATA = [
  { id: 'art_q1', q: 'Khi trộn màu Đỏ và màu Vàng với nhau, Bảo Long sẽ pha được màu gì?', ans: 'Màu Cam', opts: [
    { key: 'art_opt_orange', icon: '🍊', text: 'Màu Cam' },
    { key: 'art_opt_purple', icon: '🍇', text: 'Màu Tím' },
    { key: 'art_opt_black', icon: '⬛', text: 'Màu Đen' },
    { key: 'art_opt_white', icon: '⬜', text: 'Màu Trắng' }
  ]},
  { id: 'art_q2', q: 'Trộn màu Xanh dương với màu Vàng sẽ tạo thành màu gì giống lá cây xanh?', ans: 'Màu Xanh Lá', opts: [
    { key: 'art_opt_green', icon: '🌿', text: 'Màu Xanh Lá' },
    { key: 'art_opt_pink', icon: '🌸', text: 'Màu Hồng' },
    { key: 'art_opt_orange', icon: '🍊', text: 'Màu Cam' },
    { key: 'art_opt_brown', icon: '🟫', text: 'Màu Nâu' }
  ]},
  { id: 'art_q3', q: 'Nhạc cụ kèn phím Pianica thường được học sinh lớp 1 Nhật Bản thổi tên tiếng Nhật là gì?', ans: 'Kenban Hamonika', opts: [
    { key: 'art_opt_pianica', icon: '🎹', text: 'Kenban Hamonika' },
    { key: 'art_opt_drum', icon: '🥁', text: 'Taiko' },
    { key: 'art_opt_guitar', icon: '🎸', text: 'Guitar' },
    { key: 'art_opt_bell', icon: '🔔', text: 'Suzu' }
  ]},
  { id: 'art_q4', q: 'Trong 7 nốt nhạc Đô - Rê - Mi - Pha - Son - La - Si, nốt đầu tiên đọc là gì?', ans: 'Nốt Đô (Do)', opts: [
    { key: 'art_opt_do', icon: '🎵', text: 'Nốt Đô (Do)' },
    { key: 'art_opt_sol', icon: '🎶', text: 'Nốt Son (Sol)' },
    { key: 'art_opt_si', icon: '🎼', text: 'Nốt Si (Ti)' },
    { key: 'art_opt_la', icon: '🎹', text: 'Nốt La' }
  ]},
  { id: 'art_q5', q: 'Khi ngồi vẽ tranh hoặc viết bài ở bàn học, tư thế nào bảo vệ mắt và cột sống của bé?', ans: 'Ngồi thẳng lưng', opts: [
    { key: 'art_opt_straight', icon: '🪑', text: 'Ngồi thẳng lưng' },
    { key: 'art_opt_lie', icon: '🛋️', text: 'Nằm bò ra bàn' },
    { key: 'art_opt_close', icon: '🫣', text: 'Cúi sát mặt vở' },
    { key: 'art_opt_darkroom', icon: '🌑', text: 'Tắt hết đèn tối' }
  ]},
  { id: 'art_q6', q: 'Trước khi tập chạy hay đá bóng ở giờ Thể dục (体育), bé cần làm gì đầu tiên?', ans: 'Khởi động xoay khớp', opts: [
    { key: 'art_opt_warmup', icon: '🤸', text: 'Khởi động xoay khớp' },
    { key: 'art_opt_sprint', icon: '🏃', text: 'Chạy nước rút ngay' },
    { key: 'art_opt_eat_full', icon: '🍔', text: 'Ăn thật no rồi chạy' },
    { key: 'art_opt_sleep', icon: '😴', text: 'Ngồi im không cử động' }
  ]},
  { id: 'art_q7', q: 'Khi đi bơi mùa hè, quy tắc an toàn số một dành cho Bảo Long là gì?', ans: 'Đi cùng người lớn', opts: [
    { key: 'art_opt_swim_safe', icon: '🛟', text: 'Đi cùng người lớn' },
    { key: 'art_opt_dive_deep', icon: '🌊', text: 'Lén bơi chỗ nước sâu' },
    { key: 'art_opt_run_pool', icon: '🏃', text: 'Chạy nhảy quanh thành hồ' },
    { key: 'art_opt_no_float', icon: '🚫', text: 'Bỏ áo phao ra' }
  ]},
  { id: 'art_q8', q: 'Khi nặn đất sét (Nendo) hoặc cắt dán thủ công (Origami) xong, bé nên làm gì?', ans: 'Thu dọn và rửa tay', opts: [
    { key: 'art_opt_cleanup', icon: '🧼', text: 'Thu dọn và rửa tay' },
    { key: 'art_opt_scatter', icon: '🗑️', text: 'Vứt giấy khắp sàn' },
    { key: 'art_opt_wipe_shirt', icon: '👕', text: 'Chùi tay lên áo' },
    { key: 'art_opt_leave_it', icon: '🙈', text: 'Bỏ đó chạy đi chơi' }
  ]}
];

let currentArtsTab = 'music';
let artsSessionScore = 0;
let artsEpoch = 0;
let artDrawColor = '#e11d48';
let artDrawSticker = null;
let artCanvasInited = false;
let artSongTimers = [];
let artSongActiveBtn = null;
let artHasDrawnInk = false;
let artAwardedThisSession = false;
let artUndoStack = [];
let mixerSelection = [];

function stopArtsSongPlayback() {
  artSongTimers.forEach(t => clearTimeout(t));
  artSongTimers = [];
  if (artSongActiveBtn) {
    artSongActiveBtn.classList.remove('playing');
    artSongActiveBtn.innerText = '▶️ Nghe đàn Pianica';
    artSongActiveBtn = null;
  }
  document.querySelectorAll('#pianicaKeysRow .pianica-key-btn.pressed').forEach(b => b.classList.remove('pressed'));
}
window.stopArtsSongPlayback = stopArtsSongPlayback;
let artsQuizList = [];
let artsQuizIdx = 0;
let artsQuizScore = 0;

function addArtsScore(pts) {
  artsSessionScore += pts;
  const el = document.getElementById('artsSessionStars');
  if (el) el.innerText = `⭐ Điểm Nghệ Thuật & Thể Chất: ${artsSessionScore}`;
}

function renderArtsPeHub() {
  const el = document.getElementById('artsSessionStars');
  if (el) el.innerText = `⭐ Điểm Nghệ Thuật & Thể Chất: ${artsSessionScore}`;
  switchArtsSubTab(currentArtsTab);
}

function switchArtsSubTab(subtab) {
  stopArtsSongPlayback();
  window.soundMgr?.stopAll?.();
  artsEpoch++;
  currentArtsTab = subtab;
  const map = {
    music: ['artsPaneMusic', 'artsTabMusic'],
    paint: ['artsPanePaint', 'artsTabPaint'],
    pe: ['artsPanePe', 'artsTabPe'],
    quiz: ['artsPaneQuiz', 'artsTabQuiz']
  };
  Object.entries(map).forEach(([k, [pId, bId]]) => {
    const p = document.getElementById(pId);
    const b = document.getElementById(bId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });
  if (subtab === 'music') renderArtsMusicTab();
  else if (subtab === 'paint') renderArtsPaintTab();
  else if (subtab === 'pe') renderArtsPeTab();
  else if (subtab === 'quiz') initArtsQuizGame();
}

function renderArtsMusicTab() {
  const keysRow = document.getElementById('pianicaKeysRow');
  const songsList = document.getElementById('artSongsList');
  if (!keysRow) return;

  keysRow.innerHTML = '';
  PIANICA_NOTES.forEach((n, idx) => {
    const keyBtn = document.createElement('button');
    keyBtn.type = 'button';
    keyBtn.className = 'pianica-key-btn';
    keyBtn.dataset.noteIdx = String(idx);
    keyBtn.style.setProperty('--note-color', n.color);
    keyBtn.innerHTML = `
      <span class="p-ja">${n.ja}</span>
      <span class="p-vi">${n.vi}</span>
      <span class="p-dot" style="background:${n.color};"></span>
    `;
    const playNote = () => {
      window.soundMgr.playToneFreq(n.freq, 'triangle', 0.42, 0, 0.28);
      keyBtn.classList.add('pressed');
      setTimeout(() => keyBtn.classList.remove('pressed'), 260);
      addArtsScore(1);
    };
    keyBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); playNote(); });
    keyBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playNote(); } });
    keysRow.appendChild(keyBtn);
  });

  if (songsList) {
    songsList.innerHTML = '';
    ART_SONGS_DATA.forEach(song => {
      const card = document.createElement('div');
      card.className = 'art-song-card';
      card.innerHTML = `
        <div class="art-song-title">${song.title}</div>
        <div class="art-song-notes">${song.labels}</div>
        <button type="button" class="tool-chip tool-chip-listen" style="margin-top:8px;">▶️ Nghe đàn Pianica</button>
      `;
      const playBtn = card.querySelector('button');
      playBtn.onclick = () => {
        if (artSongActiveBtn === playBtn) {
          stopArtsSongPlayback();
          return;
        }
        stopArtsSongPlayback();
        artSongActiveBtn = playBtn;
        playBtn.classList.add('playing');
        playBtn.innerText = '⏹️ Dừng đàn';
        const myEpoch = artsEpoch;
        const myNav = window.appNavEpoch || 0;
        song.notes.forEach((ni, stepIdx) => {
          const tid = setTimeout(() => {
            if (myEpoch !== artsEpoch || (window.appNavEpoch || 0) !== myNav) return;
            if (ni >= 0 && PIANICA_NOTES[ni]) {
              window.soundMgr.playToneFreq(PIANICA_NOTES[ni].freq, 'triangle', 0.36, 0, 0.25);
              const btn = keysRow.querySelector(`[data-note-idx="${ni}"]`);
              if (btn) {
                btn.classList.add('pressed');
                setTimeout(() => btn.classList.remove('pressed'), 260);
              }
            }
          }, stepIdx * 340);
          artSongTimers.push(tid);
        });
        const endTid = setTimeout(() => {
          if (artSongActiveBtn === playBtn) stopArtsSongPlayback();
        }, song.notes.length * 340 + 350);
        artSongTimers.push(endTid);
        addArtsScore(3);
      };
      songsList.appendChild(card);
    });
  }
}

const MIXER_POTS = [
  { id: 'red', name: 'Đỏ', hex: '#ef4444' },
  { id: 'yellow', name: 'Vàng', hex: '#eab308' },
  { id: 'blue', name: 'Xanh dương', hex: '#3b82f6' },
  { id: 'white', name: 'Trắng', hex: '#ffffff' }
];
const MIXER_RECIPES = {
  'red+yellow': ART_COLOR_MIXES[0],
  'yellow+red': ART_COLOR_MIXES[0],
  'blue+yellow': ART_COLOR_MIXES[1],
  'yellow+blue': ART_COLOR_MIXES[1],
  'blue+red': ART_COLOR_MIXES[2],
  'red+blue': ART_COLOR_MIXES[2],
  'red+white': ART_COLOR_MIXES[3],
  'white+red': ART_COLOR_MIXES[3]
};

function renderArtsPaintTab() {
  const mixGrid = document.getElementById('artColorMixGrid');
  if (mixGrid) {
    mixGrid.innerHTML = '';
    let labEl = document.getElementById('artInteractiveMixerBox');
    if (!labEl) {
      labEl = document.createElement('div');
      labEl.id = 'artInteractiveMixerBox';
      labEl.className = 'art-mixer-lab';
      mixGrid.parentElement.insertBefore(labEl, mixGrid);
    }
    const drawMixerLab = () => {
      const first = MIXER_POTS.find(p => p.id === mixerSelection[0]);
      const second = MIXER_POTS.find(p => p.id === mixerSelection[1]);
      const recipe = first && second ? MIXER_RECIPES[`${first.id}+${second.id}`] : null;
      labEl.innerHTML = `
        <div style="font-weight:900; color:#be185d; margin-bottom:6px;">🧪 Chọn 2 hũ màu để Bảo Long tự pha thử nhé:</div>
        <div class="art-mixer-pots">
          ${MIXER_POTS.map(p => `<button type="button" class="tool-chip art-pot-btn ${mixerSelection.includes(p.id) ? 'active-filter' : ''}" data-pot="${p.id}"><span class="mix-circle" style="width:16px;height:16px;background:${p.hex};border:1px solid #cbd5e1;display:inline-block;vertical-align:middle;margin-right:4px;"></span>${p.name}</button>`).join('')}
        </div>
        <div class="art-mixer-result">
          ${recipe ? `🎉 <strong>${first.name} + ${second.name} = ${recipe.rn}</strong> (${recipe.ja}) <span class="mix-circle" style="width:22px;height:22px;background:${recipe.res};display:inline-block;vertical-align:middle;margin-left:6px;"></span>` : (first ? `👆 Đã chọn hũ <strong>${first.name}</strong> — chọn thêm 1 màu nữa!` : '🎨 Chạm 2 hũ màu bất kỳ ở trên!')}
        </div>
      `;
      labEl.querySelectorAll('.art-pot-btn').forEach(pb => {
        pb.onclick = () => {
          const pid = pb.dataset.pot;
          if (mixerSelection.length >= 2) mixerSelection = [pid];
          else if (!mixerSelection.includes(pid)) mixerSelection.push(pid);
          window.soundMgr.playPop();
          if (mixerSelection.length === 2) {
            const rec = MIXER_RECIPES[`${mixerSelection[0]}+${mixerSelection[1]}`];
            if (rec) {
              window.soundMgr.playCorrect();
              window.soundMgr.playAudioFile(rec.id, null, rec.rn);
              addArtsScore(2);
            } else if (typeof showToast === 'function') {
              showToast('🎨 Hai màu này trộn tạo sắc thái nhạt hơn! Thử Đỏ + Vàng, Đỏ + Xanh dương hoặc Xanh dương + Vàng nhé!');
            }
          }
          drawMixerLab();
        };
      });
    };
    drawMixerLab();

    ART_COLOR_MIXES.forEach(m => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'art-mix-card';
      card.innerHTML = `
        <div class="art-mix-dots">
          <span class="mix-circle" style="background:${m.c1};"></span>
          <span>+</span>
          <span class="mix-circle" style="background:${m.c2}; border: 2px solid #cbd5e1;"></span>
          <span>=</span>
          <span class="mix-circle big" style="background:${m.res};"></span>
        </div>
        <div class="art-mix-title">${m.n1} + ${m.n2} = ${m.rn}</div>
        <div style="font-size:12px; color:#64748b; font-weight:800;">🇯🇵 ${m.ja}</div>
      `;
      card.onclick = () => {
        window.soundMgr.playPop();
        window.soundMgr.playAudioFile(m.id, null, `${m.n1} trộn với ${m.n2} ra ${m.rn}`);
        addArtsScore(2);
      };
      mixGrid.appendChild(card);
    });
  }

  initArtCanvasOnce();
}

function initArtCanvasOnce() {
  const cv = document.getElementById('artDrawCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  if (!artCanvasInited) {
    artCanvasInited = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 520, h = 280;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const pushUndo = () => {
      try {
        artUndoStack.push(ctx.getImageData(0, 0, cv.width, cv.height));
        if (artUndoStack.length > 10) artUndoStack.shift();
      } catch (e) {}
    };

    let drawing = false;
    const getPt = (ev) => {
      const r = cv.getBoundingClientRect();
      const src = ev.touches && ev.touches[0] ? ev.touches[0] : (ev.changedTouches && ev.changedTouches[0] ? ev.changedTouches[0] : ev);
      return { x: ((src.clientX - r.left) / (r.width || 1)) * w, y: ((src.clientY - r.top) / (r.height || 1)) * h };
    };
    const start = (ev) => {
      const p = getPt(ev);
      pushUndo();
      artHasDrawnInk = true;
      if (artDrawSticker) {
        ctx.save();
        ctx.fillStyle = '#0f172a';
        ctx.font = '34px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(artDrawSticker, p.x, p.y);
        ctx.restore();
        window.soundMgr.playPop();
        addArtsScore(1);
        return;
      }
      drawing = true;
      ctx.save();
      ctx.fillStyle = artDrawColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, artDrawColor === '#ffffff' ? 9 : 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = (ev) => {
      if (!drawing || artDrawSticker) return;
      const p = getPt(ev);
      ctx.lineWidth = artDrawColor === '#ffffff' ? 18 : 7;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = artDrawColor;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const stop = () => { drawing = false; };

    cv.addEventListener('mousedown', start);
    cv.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
    cv.addEventListener('touchstart', (e) => { if (!e.touches?.[0]) return; e.preventDefault(); start(e); }, { passive: false });
    cv.addEventListener('touchmove', (e) => { if (!e.touches?.[0]) return; e.preventDefault(); move(e); }, { passive: false });
    cv.addEventListener('touchend', stop);
    cv.addEventListener('touchcancel', stop);

    document.querySelectorAll('.art-color-dot').forEach(dot => {
      dot.onclick = () => {
        artDrawSticker = null;
        document.querySelectorAll('.art-sticker-btn.active-filter, #btnArtEraser.active-filter').forEach(b => b.classList.remove('active-filter'));
        document.querySelectorAll('.art-color-dot').forEach(d => d.classList.remove('active-dot'));
        dot.classList.add('active-dot');
        artDrawColor = dot.dataset.color;
        window.soundMgr.playClick();
      };
    });
    document.querySelectorAll('.art-sticker-btn').forEach(sb => {
      sb.onclick = () => {
        const already = sb.classList.contains('active-filter');
        document.querySelectorAll('.art-sticker-btn.active-filter, #btnArtEraser.active-filter').forEach(b => b.classList.remove('active-filter'));
        if (already) {
          artDrawSticker = null;
        } else {
          sb.classList.add('active-filter');
          artDrawSticker = sb.dataset.sticker;
        }
        window.soundMgr.playClick();
      };
    });

    const btnClr = document.getElementById('btnArtCanvasClear');
    if (btnClr) {
      // Inject Undo, Eraser & Download controls once alongside Clear
      const ctrlWrap = btnClr.parentElement;
      if (ctrlWrap && !document.getElementById('btnArtCanvasUndo')) {
        const mk = (id, label) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'tool-chip';
          b.id = id;
          b.innerText = label;
          return b;
        };
        const btnEraser = mk('btnArtEraser', '🧽 Tẩy');
        const btnUndo = mk('btnArtCanvasUndo', '↩️ Quay lại');
        const btnDownload = mk('btnArtCanvasSaveImg', '💾 Tải tranh PNG');
        ctrlWrap.insertBefore(btnEraser, btnClr);
        ctrlWrap.insertBefore(btnUndo, btnClr);
        ctrlWrap.appendChild(btnDownload);
        btnEraser.onclick = () => {
          artDrawSticker = null;
          artDrawColor = '#ffffff';
          document.querySelectorAll('.art-sticker-btn.active-filter').forEach(b => b.classList.remove('active-filter'));
          document.querySelectorAll('.art-color-dot').forEach(d => d.classList.remove('active-dot'));
          btnEraser.classList.add('active-filter');
          window.soundMgr.playClick();
        };
        btnUndo.onclick = () => {
          const prev = artUndoStack.pop();
          if (prev) {
            ctx.putImageData(prev, 0, 0);
            if (artUndoStack.length === 0) artHasDrawnInk = false;
            window.soundMgr.playPop();
          }
        };
        btnDownload.onclick = () => {
          const a = document.createElement('a');
          a.href = cv.toDataURL('image/png');
          a.download = `tranh-bao-long-${new Date().toISOString().slice(0, 10)}.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.soundMgr.playCorrect();
          if (typeof showToast === 'function') showToast('💾 Đã lưu bức tranh của Bảo Long về máy!');
        };
      }
      btnClr.onclick = () => {
        pushUndo();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        artHasDrawnInk = false;
        const st = document.getElementById('artCanvasStatusMsg');
        if (st) { st.innerText = ''; st.classList.remove('is-warn'); }
        window.soundMgr.playClick();
      };
    }

    const btnDone = document.getElementById('btnArtCanvasSave');
    const setStatus = (msg, isWarn = false) => {
      let st = document.getElementById('artCanvasStatusMsg');
      if (!st && btnDone?.parentElement?.parentElement) {
        st = document.createElement('p');
        st.id = 'artCanvasStatusMsg';
        st.className = 'art-canvas-status';
        btnDone.parentElement.parentElement.appendChild(st);
      }
      if (st) {
        st.innerText = msg;
        st.classList.toggle('is-warn', isWarn);
      }
    };
    if (btnDone) btnDone.onclick = () => {
      if (!artHasDrawnInk) {
        window.soundMgr.playPop();
        const warn = '🎨 Bảo Long vẽ hoặc dán thêm hình lên bảng trước khi hoàn thành nhé!';
        setStatus(warn, true);
        if (typeof showToast === 'function') showToast(warn);
        return;
      }
      setStatus('🖼️ Tuyệt tác của Bảo Long hoàn thành rực rỡ!', false);
      if (typeof fireConfetti === 'function') fireConfetti();
      window.soundMgr.playCorrect();
      window.soundMgr.speakPraise(true);
      if (!artAwardedThisSession && typeof awardStars === 'function') {
        artAwardedThisSession = true;
        awardStars(5, 'Họa sĩ nhí Bảo Long vẽ tranh siêu đẹp!');
      } else if (typeof showToast === 'function') {
        showToast('🖼️ Tác phẩm tuyệt đẹp! Bấm "💾 Tải tranh PNG" để lưu kỷ niệm nhé!');
      }
    };
  }
}

function renderArtsPeTab() {
  const grid = document.getElementById('artsPeGrid');
  if (!grid) return;
  grid.innerHTML = '';
  ART_PE_CARDS.forEach(c => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.style.borderColor = '#fed7aa';
    card.innerHTML = `
      <div class="card-icon" style="font-size: 46px;">${c.icon}</div>
      <div class="card-word" style="font-size: 18px; color: #c2410c;">${c.title}</div>
      <div style="font-size: 12.5px; color: #475569; font-weight: 700; line-height: 1.45; margin-top: 6px;">${c.desc}</div>
    `;
    card.onclick = () => {
      window.soundMgr.playPop();
      window.soundMgr.playAudioFile(c.id, null, `${c.title}. ${c.desc}`);
      addArtsScore(2);
    };
    grid.appendChild(card);
  });
}

function initArtsQuizGame() {
  artsQuizList = [...ARTS_QUIZ_DATA].sort(() => Math.random() - 0.5);
  artsQuizIdx = 0;
  artsQuizScore = 0;
  document.getElementById('artsQuizPlayStage').style.display = 'block';
  document.getElementById('artsQuizVictoryStage').style.display = 'none';
  loadArtsQuizQuestion();
}

function loadArtsQuizQuestion() {
  if (artsQuizIdx >= artsQuizList.length) {
    fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_vn_win', null, 'Hoan hô nghệ sĩ nhí Bảo Long!');
    window.markDailyStep?.('play');
    if (typeof awardStars === 'function') awardStars(15, 'Nghệ Sĩ & Vận Động Viên Nhí Bảo Long!');
    document.getElementById('artsQuizPlayStage').style.display = 'none';
    document.getElementById('artsQuizVictoryStage').style.display = 'block';
    document.getElementById('artsQuizVictoryScore').innerText =
      `Bảo Long hoàn thành xuất sắc 8 câu Âm nhạc, Mỹ thuật & Thể dục đạt ${artsQuizScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = artsQuizList[artsQuizIdx];
  const myNav = window.appNavEpoch || 0;
  const myEp = artsEpoch;
  document.getElementById('artsQuizProgress').innerText = `Câu ${artsQuizIdx + 1} / ${artsQuizList.length}`;
  document.getElementById('artsQuizScore').innerText = `⭐ ${artsQuizScore} điểm`;
  document.getElementById('artsQuizPrompt').innerText = q.q;

  const optsGrid = document.getElementById('artsQuizOptionsGrid');
  optsGrid.innerHTML = '';
  let locked = false;
  const qBoxEl = document.querySelector('#artsQuizPlayStage .quiz-question-box');
  const tour = [{ key: q.id, fallbackText: q.q, el: qBoxEl, pauseAfterMs: 180 }];

  const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
  shuffled.forEach(opt => {
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe lựa chọn">🔊</button>
      <div style="font-size: 40px; margin-bottom: 6px;">${opt.icon}</div>
      <div class="quiz-opt-name">${opt.text}</div>
    `;
    const spk = card.querySelector('.quiz-opt-speak-btn');
    if (spk) spk.onclick = (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(opt.key, null, opt.text);
    };
    tour.push({ key: opt.key, fallbackText: opt.text, el: card, pauseAfterMs: 110 });
    card.onclick = () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (opt.text === q.ans) {
        locked = true;
        card.classList.add('correct');
        artsQuizScore += 10;
        addArtsScore(10);
        window.recordAnswer?.(q.id, true, { label: q.ans, mode: 'arts', audioKey: q.id });
        document.getElementById('artsQuizScore').innerText = `⭐ ${artsQuizScore} điểm`;
        window.soundMgr.playCorrect();
        fireConfetti();
        if (typeof showToast === 'function') showToast(`🎨 Tuyệt vời! Chính xác: ${q.ans}!`);
        window.soundMgr.playPraiseThen(false,
          () => (window.appNavEpoch || 0) === myNav && artsEpoch === myEp,
          () => {
            artsQuizIdx++;
            loadArtsQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        window.recordAnswer?.(q.id, false, { label: q.ans, mode: 'arts', audioKey: q.id });
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
      }
    };
    optsGrid.appendChild(card);
  });

  const btnHear = document.getElementById('btnHearArtsQuiz');
  if (btnHear) {
    btnHear.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playChoiceTour(tour);
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && artsEpoch === myEp) window.soundMgr.playChoiceTour(tour);
  }, 60);
}
