// ========================================================
// LEARNING PLUS: LỘ TRÌNH HÔM NAY, LEITNER SRS, CÂU GIẢI MÃ,
// LUYỆN TAI THANH ĐIỆU, PHẢN HỒI NÉT VIẾT & GÓC PHỤ HUYNH MỞ RỘNG
// ========================================================

const LEITNER_INTERVAL_DAYS = [0, 1, 1, 3, 7, 14];

function escapeHtmlPlus(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
const DAILY_ARCADE_STAR_CAP = 25;

const CUSTOM_VOICE_PRESETS = [
  { key: 'alpha_a', label: 'Chữ A (a)' },
  { key: 'alpha_ă', label: 'Chữ Ă (á)' },
  { key: 'alpha_aa', label: 'Chữ Â (ớ)' },
  { key: 'alpha_b', label: 'Chữ B (bờ)' },
  { key: 'alpha_c', label: 'Chữ C (cờ)' },
  { key: 'alpha_đ', label: 'Chữ Đ (đờ)' },
  { key: 'tone_ngang', label: 'Thanh Ngang' },
  { key: 'tone_sac', label: 'Dấu Sắc' },
  { key: 'tone_huyen', label: 'Dấu Huyền' },
  { key: 'tone_hoi', label: 'Dấu Hỏi' },
  { key: 'tone_nga', label: 'Dấu Ngã' },
  { key: 'tone_nang', label: 'Dấu Nặng' },
  { key: 'cheer_praise_1', label: 'Lời khen 1 (Hoan hô Bảo Long!)' }
];

// ========================================================
// 1. KHO GHI ÂM CỤC BỘ (INDEXEDDB - GIỌNG BA/MẸ & BÉ TỰ ĐỌC)
// ========================================================
const customVoiceStore = (() => {
  const DB_NAME = 'baolong_custom_voice_db';
  const STORE_NAME = 'clips';
  let dbPromise = null;
  const syncUrls = new Map();
  let mediaRecorder = null;
  let mediaStream = null;
  let autoStopTimer = null;
  let localPreviewAudio = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      try {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
    return dbPromise;
  }

  async function hydrate() {
    const db = await openDb();
    if (!db) return;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).getAll();
        req.onsuccess = () => {
          const rows = req.result || [];
          rows.forEach(r => {
            if (r?.key && r?.blob) {
              const old = syncUrls.get(r.key);
              if (old) try { URL.revokeObjectURL(old); } catch (e) {}
              syncUrls.set(r.key, URL.createObjectURL(r.blob));
            }
          });
          resolve();
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  async function saveClip(key, blob) {
    if (!key || !blob) return false;
    const old = syncUrls.get(key);
    if (old) try { URL.revokeObjectURL(old); } catch (e) {}
    syncUrls.set(key, URL.createObjectURL(blob));
    const db = await openDb();
    if (!db) return true;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put({ key, blob, updatedAt: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  async function deleteClip(key) {
    const old = syncUrls.get(key);
    if (old) try { URL.revokeObjectURL(old); } catch (e) {}
    syncUrls.delete(key);
    const db = await openDb();
    if (!db) return;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  async function clearAll() {
    syncUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) {} });
    syncUrls.clear();
    const db = await openDb();
    if (!db) return;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  function stopMicStream() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
      mediaStream = null;
    }
  }

  function pickSupportedMime() {
    if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') return '';
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac'];
    return candidates.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
  }

  async function startRecording(key, onFinish) {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      if (typeof showToast === 'function') {
        showToast('🎙️ Trình duyệt hiện tại chưa hỗ trợ ghi âm micro.');
      }
      return false;
    }
    try {
      stopRecording();
      window.soundMgr?.stopAll?.();
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const mimeType = pickSupportedMime();
      const rec = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream);
      mediaRecorder = rec;
      const timer = setTimeout(() => {
        if (rec.state === 'recording') {
          try { rec.stop(); } catch (e) {}
        }
      }, 10000);
      autoStopTimer = timer;
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = async () => {
        clearTimeout(timer);
        if (autoStopTimer === timer) autoStopTimer = null;
        stopMicStream();
        if (mediaRecorder === rec) mediaRecorder = null;
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: rec.mimeType || mimeType || 'audio/webm' });
          await saveClip(key, blob);
          if (onFinish) onFinish(true, blob);
        } else if (onFinish) {
          onFinish(false, null);
        }
      };
      rec.start();
      return true;
    } catch (e) {
      stopMicStream();
      mediaRecorder = null;
      if (typeof showToast === 'function') {
        showToast('🔒 Chưa được cấp quyền Micro hoặc thiết bị không có micro.');
      }
      return false;
    }
  }

  function stopRecording() {
    if (autoStopTimer) {
      clearTimeout(autoStopTimer);
      autoStopTimer = null;
    }
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      try { mediaRecorder.stop(); } catch (e) { stopMicStream(); mediaRecorder = null; }
    } else {
      stopMicStream();
      mediaRecorder = null;
    }
  }

  function playLocalClip(key) {
    const url = syncUrls.get(key);
    if (!url) return false;
    if (window.soundMgr?.isMuted) return true;
    try {
      window.soundMgr?.stopAll?.();
      if (localPreviewAudio) {
        try { localPreviewAudio.pause(); } catch (e) {}
      }
      const a = new Audio(url);
      a.setAttribute('playsinline', '');
      a.playbackRate = window.soundMgr?.speedRate || 1;
      a.onerror = () => {
        if (typeof showToast === 'function') showToast('🔊 Bản thu chưa tương thích, dùng giọng mẫu nhé!');
      };
      localPreviewAudio = a;
      a.play().catch(() => {});
      return true;
    } catch (e) {
      return false;
    }
  }

  hydrate();

  return {
    hydrate,
    getSyncUrl: (key) => syncUrls.get(key) || null,
    hasClip: (key) => syncUrls.has(key),
    listKeys: () => Array.from(syncUrls.keys()),
    saveClip,
    deleteClip,
    clearAll,
    startRecording,
    stopRecording,
    playLocalClip
  };
})();
window.customVoiceStore = customVoiceStore;

// ========================================================
// 2. LEITNER SRS, NHẬT KÝ NGÀY & CÀI ĐẶT PHỤ HUYNH
// ========================================================
function getLocalDateKey(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysToDateKey(dateStr, days) {
  const d = dateStr ? new Date(`${dateStr}T00:00:00`) : new Date();
  if (Number.isNaN(d.getTime())) return getLocalDateKey(days);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function normalizePlusStateFields(raw) {
  const rawStats = raw && typeof raw.wordStats === 'object' && raw.wordStats ? raw.wordStats : {};
  const cleanStats = {};
  Object.keys(rawStats).forEach(k => {
    const st = rawStats[k];
    if (!st || typeof st !== 'object') return;
    cleanStats[k] = {
      level: Math.max(0, Math.min(4, Math.floor(Number(st.level) || 0))),
      due: typeof st.due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(st.due) ? st.due : getLocalDateKey(0),
      seen: Math.max(0, Math.floor(Number(st.seen) || 0)),
      wrong: Math.max(0, Math.floor(Number(st.wrong) || 0)),
      lastSeen: typeof st.lastSeen === 'string' ? st.lastSeen : getLocalDateKey(0),
      label: typeof st.label === 'string' ? st.label : k,
      mode: typeof st.mode === 'string' ? st.mode : 'vocab',
      audioKey: typeof st.audioKey === 'string' ? st.audioKey : '',
      lastCoinDate: typeof st.lastCoinDate === 'string' ? st.lastCoinDate : ''
    };
  });

  const cutoff90 = addDaysToDateKey(getLocalDateKey(0), -90);
  const rawDaily = raw && typeof raw.dailyLog === 'object' && raw.dailyLog ? raw.dailyLog : {};
  const cleanDaily = {};
  Object.keys(rawDaily).forEach(dKey => {
    if (dKey < cutoff90) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dKey)) return;
    const row = rawDaily[dKey] || {};
    const steps = row.steps && typeof row.steps === 'object' ? row.steps : {};
    cleanDaily[dKey] = {
      starsEarned: Math.max(0, Math.floor(Number(row.starsEarned) || 0)),
      arcadeStars: Math.max(0, Math.floor(Number(row.arcadeStars) || 0)),
      newWords: Math.max(0, Math.floor(Number(row.newWords) || 0)),
      reviewed: Math.max(0, Math.floor(Number(row.reviewed) || 0)),
      seconds: Math.max(0, Math.floor(Number(row.seconds) || 0)),
      steps: {
        learn: !!steps.learn,
        review: !!steps.review,
        play: !!steps.play
      },
      bonusClaimed: !!row.bonusClaimed
    };
  });

  const rawSet = raw && typeof raw.parentSettings === 'object' && raw.parentSettings ? raw.parentSettings : {};
  const parentSettings = {
    eyeBreakMinutes: [0, 15, 20, 30].includes(Number(rawSet.eyeBreakMinutes)) ? Number(rawSet.eyeBreakMinutes) : 20,
    focusHideGames: !!rawSet.focusHideGames,
    dailyArcadeCap: Number(rawSet.dailyArcadeCap) >= 10 ? Math.min(100, Math.floor(Number(rawSet.dailyArcadeCap))) : DAILY_ARCADE_STAR_CAP,
    hideDinoBuddy: !!rawSet.hideDinoBuddy
  };
  const rawVideos = Array.isArray(raw?.parentVideos) ? raw.parentVideos : [];
  const parentVideos = rawVideos
    .filter(v => v && typeof v.ytId === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(v.ytId))
    .slice(0, 40)
    .map(v => ({
      id: typeof v.id === 'string' ? v.id : `yt_${v.ytId}`,
      title: typeof v.title === 'string' && v.title.trim() ? v.title.trim().slice(0, 80) : `Video (${v.ytId})`,
      ytId: v.ytId
    }));
  const rawGear = raw && typeof raw.arcadeGear === 'object' && raw.arcadeGear ? raw.arcadeGear : {};
  const unlockedDecors = Array.isArray(rawGear.unlockedDecors)
    ? Array.from(new Set(['none', ...rawGear.unlockedDecors.filter(x => typeof x === 'string')]))
    : ['none'];
  const arcadeGear = {
    speedLv: Math.max(0, Math.min(3, Math.floor(Number(rawGear.speedLv) || 0))),
    boostLv: Math.max(0, Math.min(3, Math.floor(Number(rawGear.boostLv) || 0))),
    decor: typeof rawGear.decor === 'string' && unlockedDecors.includes(rawGear.decor) ? rawGear.decor : 'none',
    unlockedDecors
  };
  const coins = typeof raw?.coins === 'number' && Number.isFinite(raw.coins) && raw.coins >= 0 ? Math.floor(raw.coins) : 0;
  return { wordStats: cleanStats, dailyLog: cleanDaily, parentSettings, coins, arcadeGear, parentVideos };
}

function ensureTodayLog() {
  if (typeof explorerState === 'undefined') return null;
  if (!explorerState.wordStats) explorerState.wordStats = {};
  if (!explorerState.dailyLog) explorerState.dailyLog = {};
  if (!explorerState.parentSettings) {
    explorerState.parentSettings = { eyeBreakMinutes: 20, focusHideGames: false, dailyArcadeCap: DAILY_ARCADE_STAR_CAP };
  }
  const today = getLocalDateKey(0);
  if (!explorerState.dailyLog[today]) {
    explorerState.dailyLog[today] = {
      starsEarned: 0,
      arcadeStars: 0,
      newWords: 0,
      reviewed: 0,
      seconds: 0,
      steps: { learn: false, review: false, play: false },
      bonusClaimed: false
    };
  }
  return explorerState.dailyLog[today];
}

function getWordMetaById(itemId) {
  if (!itemId) return null;
  if (typeof VOCAB_LESSONS !== 'undefined') {
    for (const l of VOCAB_LESSONS) {
      const f = l.words.find(w => w.id === itemId);
      if (f) return { label: f.word, ja: f.ja || '', icon: f.icon || '📖', mode: 'vocab', audioKey: `word_${f.word.toLowerCase()}` };
    }
  }
  if (typeof PHONICS_LESSONS !== 'undefined') {
    for (const l of PHONICS_LESSONS) {
      const f = l.words.find(w => w.id === itemId);
      if (f) return { label: f.word, ja: f.ja || '', icon: f.icon || '🔤', mode: 'phonics', audioKey: `word_${f.word.toLowerCase()}` };
    }
  }
  if (typeof DECODABLE_PHONICS_SENTENCES !== 'undefined') {
    const s = DECODABLE_PHONICS_SENTENCES.find(x => x.id === itemId);
    if (s) return { label: s.text, ja: s.meaningJa || '', icon: '📖', mode: 'phonics', audioKey: '' };
  }
  return null;
}

/**
 * Ghi nhận kết quả đúng/sai theo hộp nhớ Leitner (mức 0 -> 4).
 * Thưởng thêm +3 ⭐ lần đầu một mục đạt mức nhớ ổn định (>= 3).
 */
function recordAnswer(itemId, isCorrect, meta = {}) {
  if (!itemId || typeof explorerState === 'undefined') return null;
  ensureTodayLog();
  const today = getLocalDateKey(0);
  const existing = explorerState.wordStats[itemId] || {
    level: 0,
    due: today,
    seen: 0,
    wrong: 0,
    lastSeen: today,
    label: meta.label || itemId,
    mode: meta.mode || 'vocab',
    audioKey: meta.audioKey || ''
  };

  const prevLevel = existing.level;
  existing.seen += 1;
  existing.lastSeen = today;
  if (meta.label) existing.label = meta.label;
  if (meta.mode) existing.mode = meta.mode;
  if (meta.audioKey) existing.audioKey = meta.audioKey;

  if (isCorrect) {
    existing.level = Math.min(4, prevLevel + 1);
    const interval = LEITNER_INTERVAL_DAYS[existing.level + 1] || 1;
    existing.due = addDaysToDateKey(today, interval);
    if (!meta.noAutoCoin && meta.mode !== 'arcade' && existing.lastCoinDate !== today && typeof window.awardCoins === 'function') {
      existing.lastCoinDate = today;
      window.awardCoins(5);
    }
  } else {
    existing.wrong += 1;
    existing.level = Math.max(0, prevLevel - 1);
    existing.due = today;
  }

  explorerState.wordStats[itemId] = existing;
  const log = ensureTodayLog();
  if (log) {
    log.reviewed += 1;
    if (meta.isReview) log.steps.review = true;
  }

  if (isCorrect && prevLevel < 3 && existing.level >= 3 && typeof awardStars === 'function') {
    awardStars(3, `Ghi nhớ vững "${existing.label}"!`, false, 'mastery');
  } else if (typeof saveProgress === 'function') {
    saveProgress();
  }
  renderDailyRoadmapHost();
  return existing;
}
window.recordAnswer = recordAnswer;

function markDailyStep(stepName) {
  const log = ensureTodayLog();
  if (!log || !log.steps) return;
  if (!log.steps[stepName]) {
    log.steps[stepName] = true;
    if (log.steps.learn && log.steps.review && log.steps.play && !log.bonusClaimed) {
      log.bonusClaimed = true;
      if (typeof window.awardCoins === 'function') window.awardCoins(20);
      if (typeof awardStars === 'function') {
        awardStars(15, 'Hoàn thành trọn vẹn Lộ Trình Hôm Nay (+20 🪙 Xu)!', true, 'learn');
      }
      if (typeof fireConfetti === 'function') fireConfetti();
    } else if (typeof saveProgress === 'function') {
      saveProgress();
    }
    renderDailyRoadmapHost();
  }
}
window.markDailyStep = markDailyStep;

function getDueReviewItems(limit = 6, forceSampleOnly = false) {
  if (typeof explorerState === 'undefined') return [];
  const today = getLocalDateKey(0);
  const stats = explorerState.wordStats || {};
  const list = [];
  if (!forceSampleOnly) {
  Object.keys(stats).forEach(id => {
    const st = stats[id];
    const isDue = !st.due || st.due <= today;
    if (isDue) {
      const m = getWordMetaById(id) || {};
      list.push({
        id,
        label: st.label || m.label || id,
        ja: m.ja || '',
        icon: m.icon || '🌟',
        audioKey: st.audioKey || m.audioKey || '',
        level: st.level || 0,
        wrong: st.wrong || 0,
        due: st.due || today
      });
    }
  });
  }
  // Thêm từ đã mở nhưng chưa từng kiểm tra vào hàng đợi ôn nhẹ
  if (!forceSampleOnly && list.length < limit && Array.isArray(explorerState.learnedIds)) {
    for (const id of explorerState.learnedIds) {
      if (list.length >= limit) break;
      if (stats[id]) continue;
      const m = getWordMetaById(id);
      if (m) {
        list.push({ id, label: m.label, ja: m.ja, icon: m.icon, audioKey: m.audioKey, level: 0, wrong: 0, due: today });
      }
    }
  }
  if (forceSampleOnly && list.length === 0 && typeof VOCAB_LESSONS !== 'undefined' && VOCAB_LESSONS[0]?.words) {
    for (const w of VOCAB_LESSONS[0].words.slice(0, limit)) {
      const m = getWordMetaById(w.id);
      if (m) list.push({ id: w.id, label: m.label, ja: m.ja, icon: m.icon, audioKey: m.audioKey, level: 0, wrong: 0, due: today });
    }
  }
  list.sort((a, b) => (b.wrong - a.wrong) || (a.level - b.level));
  return list.slice(0, limit);
}

// ========================================================
// 3. LỘ TRÌNH HÔM NAY (10-15 PHÚT) + LỊCH 7 NGÀY + ÔN TẬP HÔM NAY
// ========================================================
let dailyRoadmapCollapsed = false;
let dueReviewQueue = [];
let dueReviewIndex = 0;

function renderDailyRoadmapHost() {
  const host = document.getElementById('dailyHubHost');
  if (!host || typeof explorerState === 'undefined') return;
  const log = ensureTodayLog();
  const dueItems = getDueReviewItems(6);
  const days = [];
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  for (let i = 6; i >= 0; i--) {
    const dk = getLocalDateKey(-i);
    const dObj = new Date(`${dk}T00:00:00`);
    const entry = explorerState.dailyLog?.[dk];
    const active = !!(entry && (entry.newWords > 0 || entry.reviewed > 0 || entry.starsEarned > 0));
    days.push({ dk, short: labels[dObj.getDay()], active, isToday: i === 0 });
  }

  const stepsDone = [log.steps.learn, log.steps.review, log.steps.play].filter(Boolean).length;

  host.innerHTML = `
    <div class="daily-hub-card">
      <div class="daily-hub-header">
        <div class="daily-hub-title-wrap">
          <span class="daily-hub-badge">🗓️ LỘ TRÌNH HÔM NAY (10–15 PHÚT)</span>
          <span class="daily-progress-pill">${stepsDone}/3 bước</span>
        </div>
        <div class="daily-hub-controls">
          <div class="daily-week-strip" title="Ngày đã học trong 7 ngày gần đây (không trừ điểm khi nghỉ)">
            ${days.map(d => `<span class="week-dot ${d.active ? 'active' : ''} ${d.isToday ? 'today' : ''}" title="${d.dk}">${d.active ? '✓' : d.short}</span>`).join('')}
          </div>
          <button type="button" class="tool-chip" id="btnToggleDailyHub">${dailyRoadmapCollapsed ? 'Mở' : 'Thu gọn'}</button>
        </div>
      </div>

      <div class="daily-hub-body" id="dailyHubBody" style="display: ${dailyRoadmapCollapsed ? 'none' : 'block'};">
        <div class="daily-steps-grid">
          <button type="button" class="daily-step-btn ${log.steps.learn ? 'done' : ''}" id="btnDailyStepLearn">
            <span class="ds-ico">${log.steps.learn ? '✅' : '📖'}</span>
            <span class="ds-txt"><strong>1. Học 1 bài Tiếng Việt</strong><small>Từ mới / Đánh vần / Đọc câu</small></span>
          </button>
          <button type="button" class="daily-step-btn ${log.steps.review ? 'done' : ''}" id="btnDailyStepReview">
            <span class="ds-ico">${log.steps.review ? '✅' : '🎯'}</span>
            <span class="ds-txt"><strong>2. Ôn tập hôm nay (${dueItems.length} từ)</strong><small>Luyện nhớ từ dễ nhầm</small></span>
          </button>
          <button type="button" class="daily-step-btn ${log.steps.play ? 'done' : ''}" id="btnDailyStepPlay">
            <span class="ds-ico">${log.steps.play ? '✅' : '🚀'}</span>
            <span class="ds-txt"><strong>3. Thử thách vui cuối buổi</strong><small>Toán / Ghép chữ / Đua xe</small></span>
          </button>
        </div>
        <div id="dueReviewInlineStage" class="due-review-stage" style="display: none;"></div>
      </div>
    </div>
  `;

  document.getElementById('btnToggleDailyHub')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    dailyRoadmapCollapsed = !dailyRoadmapCollapsed;
    renderDailyRoadmapHost();
  });
  document.getElementById('btnDailyStepLearn')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    if (typeof switchMode === 'function') switchMode('phonics');
  });
  document.getElementById('btnDailyStepReview')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    openDueReviewDeck();
  });
  document.getElementById('btnDailyStepPlay')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    const isFocus = !!explorerState.parentSettings?.focusHideGames;
    if (typeof switchMode === 'function') switchMode(isFocus ? 'math' : 'game');
  });
}
window.renderDailyRoadmapHost = renderDailyRoadmapHost;

function openDueReviewDeck() {
  const stage = document.getElementById('dueReviewInlineStage');
  if (!stage) return;
  dueReviewQueue = getDueReviewItems(6);
  if (dueReviewQueue.length === 0) {
    const todayLog = ensureTodayLog();
    const warmup = getDueReviewItems(3, true);
    stage.style.display = 'block';
    stage.innerHTML = `
      <div class="due-empty-box">
        <span>🌟 Tuyệt vời! Bảo Long chưa có từ nào đến hạn ôn hôm nay.</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${warmup.length > 0 ? '<button type="button" class="tool-chip" id="btnStartWarmupDue">🔁 Ôn nhanh 3 từ mẫu</button>' : ''}
          ${todayLog && !todayLog.steps.review ? '<button type="button" class="tool-chip" id="btnMarkReviewEmpty">✅ Hoàn thành bước Ôn tập</button>' : ''}
          <button type="button" class="tool-chip" id="btnCloseDueEmpty">Đóng</button>
        </div>
      </div>
    `;
    document.getElementById('btnStartWarmupDue')?.addEventListener('click', () => {
      dueReviewQueue = warmup;
      dueReviewIndex = 0;
      renderDueReviewCard();
    });
    document.getElementById('btnMarkReviewEmpty')?.addEventListener('click', () => {
      markDailyStep('review');
      stage.style.display = 'none';
    });
    document.getElementById('btnCloseDueEmpty')?.addEventListener('click', () => { stage.style.display = 'none'; });
    return;
  }
  dueReviewIndex = 0;
  renderDueReviewCard();
}

function renderDueReviewCard() {
  const stage = document.getElementById('dueReviewInlineStage');
  if (!stage) return;
  stage.style.display = 'block';
  if (dueReviewIndex >= dueReviewQueue.length) {
    markDailyStep('review');
    stage.innerHTML = `
      <div class="due-empty-box">
        <span>🎉 Hoàn thành phiên ôn tập hôm nay! Bảo Long siêu đỉnh quá!</span>
        <button type="button" class="tool-chip" id="btnCloseDueDone">Xong</button>
      </div>
    `;
    document.getElementById('btnCloseDueDone')?.addEventListener('click', () => { stage.style.display = 'none'; });
    return;
  }

  const item = dueReviewQueue[dueReviewIndex];
  const hideHintInitially = item.level >= 2;
  stage.innerHTML = `
    <div class="due-card">
      <div class="due-card-top">
        <span>🎯 Ôn từ ${dueReviewIndex + 1} / ${dueReviewQueue.length} • Mức nhớ ${item.level}/4</span>
        <button type="button" class="tool-chip" id="btnCloseDueCard">✕ Đóng</button>
      </div>
      <div class="due-card-main">
        <div class="due-word-display">${escapeHtmlPlus(item.label)}</div>
        <div class="due-hint-box" id="dueHintBox" style="${hideHintInitially ? 'display:none;' : ''}">
          <span>${item.icon}</span> ${item.ja ? `<span>🇯🇵 ${escapeHtmlPlus(item.ja)}</span>` : ''}
        </div>
        <div class="due-btn-row">
          ${hideHintInitially ? '<button type="button" class="tool-chip" id="btnDueReveal">👁️ Xem gợi ý</button>' : ''}
          <button type="button" class="tool-chip tool-chip-listen" id="btnDueHear">🔊 Nghe đọc</button>
          <button type="button" class="tool-chip" style="background:#dcfce7;border-color:#22c55e;color:#15803d;" id="btnDueRemembered">✅ Con đọc đúng</button>
          <button type="button" class="tool-chip" style="background:#fef3c7;border-color:#f59e0b;color:#b45309;" id="btnDueRetry">🔁 Ôn lại thêm</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btnCloseDueCard')?.addEventListener('click', () => { stage.style.display = 'none'; });
  document.getElementById('btnDueReveal')?.addEventListener('click', () => {
    const hb = document.getElementById('dueHintBox');
    if (hb) hb.style.display = 'block';
  });
  document.getElementById('btnDueHear')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    if (item.audioKey && item.audioKey.includes(',')) {
      window.soundMgr?.playAudioSequence(item.audioKey.split(','), null, item.label);
    } else if (item.audioKey) {
      window.soundMgr?.playAudioFile(item.audioKey, null, '');
    } else {
      window.soundMgr?.speakWord(item.label);
    }
  });
  document.getElementById('btnDueRemembered')?.addEventListener('click', () => {
    window.soundMgr?.playCorrect();
    recordAnswer(item.id, true, { label: item.label, mode: 'review', audioKey: item.audioKey, isReview: true });
    dueReviewIndex++;
    renderDueReviewCard();
  });
  document.getElementById('btnDueRetry')?.addEventListener('click', () => {
    window.soundMgr?.playWrong();
    recordAnswer(item.id, false, { label: item.label, mode: 'review', audioKey: item.audioKey, isReview: true });
    dueReviewIndex++;
    renderDueReviewCard();
  });
}

// ========================================================
// 4. CÂU GIẢI MÃ ĐƯỢC (DECODABLE SENTENCES) + KARAOKE + CON TỰ ĐỌC
// ========================================================
let selfReadMode = false;
let karaokeSentenceEpoch = 0;
function stopKaraokePlayback() {
  karaokeSentenceEpoch++;
  document.querySelectorAll('.karaoke-word.is-active').forEach(el => el.classList.remove('is-active'));
}
window.stopKaraokePlayback = stopKaraokePlayback;

function playDecodableKaraoke(sentenceObj, cardEl) {
  if (!sentenceObj || !Array.isArray(sentenceObj.tokens) || !window.soundMgr) return;
  window.soundMgr.stopAll();
  const myEp = ++karaokeSentenceEpoch;
  const wordEls = cardEl ? Array.from(cardEl.querySelectorAll('.karaoke-word')) : [];
  const keys = sentenceObj.tokens.map(t => t.key);

  let idx = 0;
  const nextToken = () => {
    if (karaokeSentenceEpoch !== myEp) return;
    wordEls.forEach(el => el.classList.remove('is-active'));
    if (idx >= keys.length) return;
    if (wordEls[idx]) wordEls[idx].classList.add('is-active');
    const key = keys[idx];
    idx++;
    if (window.soundMgr.isMuted) {
      setTimeout(nextToken, 420);
      return;
    }
    window.soundMgr._playOnSharedPlayer(key, window.soundMgr.sequenceToken, () => {
      setTimeout(nextToken, 110);
    }, (err) => {
      if (err && err.name === 'NotAllowedError') {
        window.soundMgr.notifyAutoplayBlocked();
        wordEls.forEach(el => el.classList.remove('is-active'));
        return;
      }
      setTimeout(nextToken, 120);
    });
  };
  nextToken();
}

function renderPhonicsDecodableSection(lessonId) {
  const host = document.getElementById('phonicsDecodableHost');
  if (!host || typeof DECODABLE_PHONICS_SENTENCES === 'undefined') return;
  const normId = /^\d+$/.test(String(lessonId)) ? `phonics_${lessonId}` : String(lessonId);
  const list = DECODABLE_PHONICS_SENTENCES.filter(s => s.lessonId === normId);
  if (list.length === 0) {
    host.style.display = 'none';
    return;
  }
  host.style.display = 'block';
  host.innerHTML = `
    <div class="alpha-section-card decodable-panel">
      <div class="section-header-flex" style="margin-bottom: 10px;">
        <div>
          <h3 class="section-blue-title" style="color: #0f766e; margin-bottom: 4px;">
            <span>🗣️</span> Ghép Vần Thành Câu Ngắn (Cầu nối tự đọc)
          </h3>
          <p class="section-sub-desc" style="margin-bottom: 0;">
            Chạm từng chữ để nghe phát âm &amp; tách vần, bật <strong>Nghe Karaoke</strong>, hoặc chuyển sang <strong>Con tự đọc</strong>!
          </p>
        </div>
        <button type="button" class="tool-chip ${selfReadMode ? 'active-filter' : ''}" id="btnToggleSelfRead">
          ${selfReadMode ? '📖 Quay lại Nghe Karaoke' : '🎤 Chế độ Con Tự Đọc'}
        </button>
      </div>
      <div class="decodable-list" id="decodableList"></div>
    </div>
  `;

  document.getElementById('btnToggleSelfRead')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    selfReadMode = !selfReadMode;
    renderPhonicsDecodableSection(lessonId);
  });

  const listEl = document.getElementById('decodableList');
  list.forEach((s, idx) => {
    const recKey = `kid_${s.id}`;
    const hasKidClip = customVoiceStore.hasClip(recKey);
    const st = explorerState?.wordStats?.[s.id];
    const card = document.createElement('div');
    card.className = 'decodable-card';
    card.innerHTML = `
      <div class="decodable-top">
        <span class="decodable-badge">Câu ${idx + 1}</span>
        ${st?.level >= 3 ? '<span class="decodable-master-tag">⭐ Đọc trôi chảy</span>' : ''}
      </div>
      <div class="decodable-words-row">
        ${s.tokens.map((t, ti) => `<button type="button" class="karaoke-word" data-ti="${ti}" title="Chạm nghe &amp; tách âm">${t.label}</button>`).join('')}
      </div>
      <div class="decodable-ja">🇯🇵 ${s.meaningJa}</div>
      <div class="decodable-actions">
        ${selfReadMode ? `
          <button type="button" class="tool-chip decod-rec-btn" data-id="${s.id}">🎙️ Con đọc &amp; ghi âm</button>
          <button type="button" class="tool-chip decod-play-kid-btn" style="display:${hasKidClip ? 'inline-flex' : 'none'};">▶️ Nghe giọng con</button>
          <button type="button" class="tool-chip tool-chip-listen decod-check-btn">👁️ Nghe đối chiếu</button>
          <button type="button" class="tool-chip decod-pass-btn" style="background:#dcfce7;border-color:#22c55e;color:#15803d;">✅ Tự đọc đúng</button>
          <button type="button" class="tool-chip decod-fail-btn" style="background:#fef3c7;border-color:#f59e0b;color:#b45309;">🔁 Cần ôn</button>
        ` : `
          <button type="button" class="tool-chip tool-chip-listen decod-karaoke-btn">🎧 Nghe Karaoke từng tiếng</button>
        `}
      </div>
      ${selfReadMode ? '<div class="decodable-privacy">🔒 Ghi âm chỉ lưu cục bộ trên máy này để Ba/Mẹ nghe lại cùng con.</div>' : ''}
    `;

    card.querySelectorAll('.karaoke-word').forEach(btn => {
      btn.addEventListener('click', () => {
        const ti = Number(btn.dataset.ti);
        const tok = s.tokens[ti];
        if (!tok) return;
        window.soundMgr?.playClick();
        window.soundMgr?.playAudioFile(tok.key, null, '');
        if (typeof splitVietnameseWordToPuzzle === 'function') {
          const pieces = splitVietnameseWordToPuzzle(tok.part);
          if (pieces.length > 1 && typeof showToast === 'function') {
            showToast(`🔤 "${tok.label}" tách thành: ${pieces.join(' + ')}`);
          }
        }
      });
    });

    card.querySelector('.decod-karaoke-btn')?.addEventListener('click', () => {
      playDecodableKaraoke(s, card);
      markDailyStep('learn');
    });

    card.querySelector('.decod-check-btn')?.addEventListener('click', () => {
      playDecodableKaraoke(s, card);
    });

    const recBtn = card.querySelector('.decod-rec-btn');
    const playKidBtn = card.querySelector('.decod-play-kid-btn');
    if (recBtn) {
      let recording = false;
      recBtn.addEventListener('click', async () => {
        if (!recording) {
          const ok = await customVoiceStore.startRecording(recKey, (saved) => {
            recording = false;
            recBtn.innerText = '🎙️ Con đọc & ghi âm';
            if (saved && playKidBtn) playKidBtn.style.display = 'inline-flex';
            if (saved && typeof showToast === 'function') showToast('🎤 Đã lưu bản đọc của Bảo Long trên máy!');
          });
          if (ok) {
            recording = true;
            recBtn.innerText = '⏹️ Dừng ghi (đang thu...)';
          }
        } else {
          customVoiceStore.stopRecording();
        }
      });
    }
    playKidBtn?.addEventListener('click', () => {
      customVoiceStore.playLocalClip(recKey);
    });

    card.querySelector('.decod-pass-btn')?.addEventListener('click', () => {
      window.soundMgr?.playCorrect();
      recordAnswer(s.id, true, { label: s.text, mode: 'phonics' });
      markDailyStep('learn');
      if (typeof showToast === 'function') showToast(`🌟 Tuyệt vời! Con đã tự đọc câu "${s.text}"!`);
      renderPhonicsDecodableSection(lessonId);
    });
    card.querySelector('.decod-fail-btn')?.addEventListener('click', () => {
      window.soundMgr?.playWrong();
      recordAnswer(s.id, false, { label: s.text, mode: 'phonics' });
      if (typeof showToast === 'function') showToast('🔁 Không sao! Hệ thống đã đưa câu này vào danh sách ôn hôm nay.');
    });

    listEl.appendChild(card);
  });
}
window.renderPhonicsDecodableSection = renderPhonicsDecodableSection;

// ========================================================
// 5. LUYỆN TAI THANH ĐIỆU & CẶP TỐI THIỂU VIỆT – NHẬT
// ========================================================
let minimalPairState = { index: 0, score: 0, currentTarget: null };
let mpEpoch = 0;
window.stopMinimalPairPlayback = () => { mpEpoch++; };

function renderMinimalPairDrill() {
  const host = document.getElementById('minimalPairHost');
  if (!host || typeof MINIMAL_PAIR_DRILLS === 'undefined') return;
  mpEpoch++;
  const myMpEp = mpEpoch;
  const myNav = window.appNavEpoch || 0;
  const drill = MINIMAL_PAIR_DRILLS[minimalPairState.index % MINIMAL_PAIR_DRILLS.length];
  const opts = drill.options;
  const target = opts[Math.floor(Math.random() * opts.length)];
  minimalPairState.currentTarget = target;

  host.innerHTML = `
    <div class="alpha-section-card" style="margin-top: 20px; border-color: #6ee7b7; border-bottom-color: #059669;">
      <div class="section-header-flex">
        <div>
          <h3 class="section-blue-title" style="color: #065f46;">
            <span>👂</span> Luyện Tai Thanh Điệu &amp; Âm Khó Việt – Nhật
          </h3>
          <p class="section-sub-desc">${drill.title} — Chạm Loa rồi chọn đúng tiếng/chữ Bảo Long vừa nghe nhé!</p>
        </div>
        <span class="game-stars" id="mpScoreBadge">⭐ ${minimalPairState.score} điểm</span>
      </div>
      <div class="mp-controls-row">
        <button type="button" class="challenge-btn" id="btnMpListen" style="padding: 9px 18px; font-size: 14px;">🔊 Nghe âm cần tìm</button>
        <button type="button" class="tool-chip" id="btnMpNextGroup">🔄 Đổi cặp âm khác</button>
      </div>
      <div class="mp-options-row" id="mpOptionsRow"></div>
    </div>
  `;

  document.getElementById('btnMpListen')?.addEventListener('click', () => {
    window.soundMgr?.playAudioFile(target.audioKey, null, '');
  });
  document.getElementById('btnMpNextGroup')?.addEventListener('click', () => {
    window.soundMgr?.playClick();
    minimalPairState.index = (minimalPairState.index + 1) % MINIMAL_PAIR_DRILLS.length;
    renderMinimalPairDrill();
  });

  const row = document.getElementById('mpOptionsRow');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'listen-choice-card';
    btn.innerText = opt.label;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('correct')) return;
      const drillItemId = `mp_${drill.id}_${target.label}`;
      if (opt.label === target.label) {
        btn.classList.add('correct');
        minimalPairState.score += 5;
        window.soundMgr?.playCorrect();
        recordAnswer(drillItemId, true, { label: `${opt.label} (${drill.title})`, mode: 'alphabet', audioKey: target.audioKey });
        if (typeof showToast === 'function') showToast(`🎉 Thính tai quá! Đúng tiếng "${target.label}"!`);
        setTimeout(() => {
          if (mpEpoch !== myMpEp || (window.appNavEpoch || 0) !== myNav) return;
          minimalPairState.index = (minimalPairState.index + 1) % MINIMAL_PAIR_DRILLS.length;
          renderMinimalPairDrill();
        }, 700);
      } else {
        btn.classList.add('wrong');
        window.soundMgr?.playWrong();
        recordAnswer(drillItemId, false, { label: `${target.label} (${drill.title})`, mode: 'alphabet', audioKey: target.audioKey, noAutoCoin: true });
        setTimeout(() => {
          if (mpEpoch !== myMpEp || (window.appNavEpoch || 0) !== myNav) return;
          window.soundMgr?.playAudioFile(target.audioKey, null, '');
        }, 200);
      }
    });
    row.appendChild(btn);
  });
}
window.renderMinimalPairDrill = renderMinimalPairDrill;

// ========================================================
// 6. TẬP VIẾT CÓ PHẢN HỒI ĐỘ PHỦ NÉT & GIẢM GỢI Ý DẦN
// ========================================================
let vnWritingHintLevel = 'guide'; // 'guide' | 'dots' | 'blank'
let jaWritingHintLevel = 'guide';

function drawHintByLevel(targetCtx, width, height, text, level, fontSpec, baselineYOffset = 2) {
  if (!targetCtx || !text || level === 'blank') return;
  targetCtx.save();
  targetCtx.font = fontSpec;
  targetCtx.textAlign = 'center';
  targetCtx.textBaseline = 'middle';
  if (level === 'guide') {
    targetCtx.fillStyle = '#cbd5e1';
    targetCtx.fillText(text, width / 2, height / 2 + baselineYOffset);
  } else if (level === 'dots') {
    const metrics = targetCtx.measureText(text);
    const leftX = Math.max(24, width / 2 - metrics.width / 2);
    targetCtx.strokeStyle = '#cbd5e1';
    targetCtx.lineWidth = 1.5;
    targetCtx.setLineDash([4, 5]);
    targetCtx.strokeText(text, width / 2, height / 2 + baselineYOffset);
    targetCtx.setLineDash([]);
    targetCtx.strokeStyle = '#94a3b8';
    targetCtx.fillStyle = '#cbd5e1';
    targetCtx.lineWidth = 2;
    targetCtx.beginPath();
    targetCtx.arc(leftX, height / 2 - 14, 6, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.stroke();
  }
  targetCtx.restore();
}
window.drawHintByLevel = drawHintByLevel;

/**
 * So sánh điểm ảnh nét bé vẽ với mặt nạ nét chữ mẫu ẩn trên offscreen canvas.
 * Không dùng AI chấm điểm khắt khe — chỉ phản hồi khích lệ có căn cứ.
 */
function evaluateCanvasGuideMatch(userCanvas, drawHiddenGuideFn) {
  if (!userCanvas || typeof drawHiddenGuideFn !== 'function') {
    return { matchedPct: 0, totalInk: 0, hintText: 'Hãy tô thêm vài nét nhé!' };
  }
  const w = userCanvas.width;
  const h = userCanvas.height;
  const guideCanvas = document.createElement('canvas');
  guideCanvas.width = w;
  guideCanvas.height = h;
  const gCtx = guideCanvas.getContext('2d');
  drawHiddenGuideFn(gCtx, w, h);

  const uData = userCanvas.getContext('2d').getImageData(0, 0, w, h).data;
  const gData = gCtx.getImageData(0, 0, w, h).data;

  let guidePixels = 0;
  let coveredPixels = 0;
  let offGuidePixels = 0;
  let userInkPixels = 0;

  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const idx = (y * w + x) * 4;
      const gAlpha = gData[idx + 3];
      const uAlpha = uData[idx + 3];
      const r = uData[idx], g = uData[idx + 1], b = uData[idx + 2];
      const isBlueGrid = b > 220 && r > 110 && g > 195;
      const isGrayGuide = Math.abs(r - g) < 22 && Math.abs(g - b) < 22 && r > 135;
      const isPinkCross = r > 235 && g > 145 && g < 195 && b > 155 && b < 205;
      const isUserInk = uAlpha > 140 && !isBlueGrid && !isGrayGuide && !isPinkCross;
      if (isUserInk) userInkPixels++;
      if (gAlpha > 60) {
        guidePixels++;
        if (isUserInk) coveredPixels++;
      } else if (isUserInk) {
        offGuidePixels++;
      }
    }
  }

  if (userInkPixels < 40) {
    return { matchedPct: 0, totalInk: userInkPixels, hintText: '✏️ Bảo Long thử tô thêm nét chữ vào ô trước khi kiểm tra nhé!' };
  }
  const recall = guidePixels > 0 ? coveredPixels / guidePixels : 0;
  const precision = coveredPixels / Math.max(1, userInkPixels);
  if (offGuidePixels > Math.max(guidePixels * 1.4, 150) || precision < 0.16) {
    return { matchedPct: Math.min(25, Math.round(recall * precision * 100)), totalInk: userInkPixels, hintText: '🧹 Bé vẽ hơi tràn ra ngoài nét chữ mẫu — thử Xóa rồi đồ sát theo đường mờ nhé!' };
  }
  const pct = Math.min(100, Math.round(recall * Math.min(1, precision / 0.28) * 100));
  if (pct >= 45) {
    return { matchedPct: pct, totalInk: userInkPixels, hintText: `🌟 Tuyệt vời! Nét chữ của Bảo Long khớp ${pct}% vùng mẫu!` };
  }
  if (pct >= 20) {
    return { matchedPct: pct, totalInk: userInkPixels, hintText: `👍 Khá lắm (${pct}% nét mẫu)! Thử đồ thêm cho đủ hết chữ nhé!` };
  }
  return { matchedPct: pct, totalInk: userInkPixels, hintText: '✏️ Bé thử viết to và sát theo đường nét mờ hơn chút nhé!' };
}
window.evaluateCanvasGuideMatch = evaluateCanvasGuideMatch;

function getVnWritingHintLevel() { return vnWritingHintLevel; }
function setVnWritingHintLevel(lvl) { vnWritingHintLevel = lvl; }
function getJaWritingHintLevel() { return jaWritingHintLevel; }
function setJaWritingHintLevel(lvl) { jaWritingHintLevel = lvl; }
window.getVnWritingHintLevel = getVnWritingHintLevel;
window.setVnWritingHintLevel = setVnWritingHintLevel;
window.getJaWritingHintLevel = getJaWritingHintLevel;
window.setJaWritingHintLevel = setJaWritingHintLevel;

// ========================================================
// 7. GÓC PHỤ HUYNH MỞ RỘNG, TẬP TRUNG, NHẮC NGHỈ MẮT & PHÒNG THU
// ========================================================
let eyeBreakPromptShownAtSec = 0;
let lastStudyDateKey = getLocalDateKey(0);
let studyTimerStarted = false;
let lastParentVoiceKey = CUSTOM_VOICE_PRESETS[0].key;

window.resetLearningPlusSessionFlags = () => {
  eyeBreakPromptShownAtSec = 0;
  lastStudyDateKey = getLocalDateKey(0);
};

function applyParentFocusMode() {
  const hide = !!(typeof explorerState !== 'undefined' && explorerState.parentSettings?.focusHideGames);
  document.body.classList.toggle('focus-hide-games', hide);
}
window.applyParentFocusMode = applyParentFocusMode;

function startStudyActivityTimer() {
  if (studyTimerStarted) return;
  studyTimerStarted = true;
  setInterval(() => {
    if (document.visibilityState === 'hidden' || typeof explorerState === 'undefined') return;
    const today = getLocalDateKey(0);
    if (today !== lastStudyDateKey) {
      lastStudyDateKey = today;
      eyeBreakPromptShownAtSec = 0;
      ensureTodayLog();
      renderDailyRoadmapHost();
    }
    const log = ensureTodayLog();
    if (!log) return;
    log.seconds += 30;
    const limitMin = Number(explorerState.parentSettings?.eyeBreakMinutes || 0);
    if (limitMin > 0 && log.seconds - eyeBreakPromptShownAtSec >= limitMin * 60) {
      eyeBreakPromptShownAtSec = log.seconds;
      if (typeof showToast === 'function') {
        showToast(`👀 Bảo Long đã học ${Math.round(log.seconds / 60)} phút! Cho mắt nghỉ 1 phút nhìn ra xa nhé!`);
      }
    }
    if (log.seconds % 60 === 0 && typeof saveProgress === 'function') {
      saveProgress();
    }
  }, 30000);
}

function renderParentPlusSection() {
  const host = document.getElementById('parentPlusHost');
  if (!host || typeof explorerState === 'undefined') return;
  const stats = explorerState.wordStats || {};
  const mastered = Object.values(stats).filter(s => (s.level || 0) >= 3).length;
  const weakList = Object.entries(stats)
    .filter(([, s]) => (s.wrong || 0) > 0)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 5);

  let daysActive = 0;
  let totalSec = 0;
  for (let i = 0; i < 7; i++) {
    const dk = getLocalDateKey(-i);
    const d = explorerState.dailyLog?.[dk];
    if (d) {
      totalSec += d.seconds || 0;
      if ((d.newWords || 0) > 0 || (d.reviewed || 0) > 0 || (d.starsEarned || 0) > 0) daysActive++;
    }
  }
  const todayArcade = ensureTodayLog()?.arcadeStars || 0;
  const set = explorerState.parentSettings || {};
  const sysDisabled = window.soundMgr ? !window.soundMgr.allowSystemTTS : true;
  const customCount = customVoiceStore.listKeys().length;

  host.innerHTML = `
    <div class="parent-analytics-box">
      <div class="parent-sub-title">📊 Báo cáo tuần gần nhất</div>
      <div class="parent-kpi-row">
        <span>📅 ${daysActive}/7 ngày học</span>
        <span>⏱️ ${Math.round(totalSec / 60)} phút</span>
        <span>🧠 ${mastered} từ nhớ vững (mức ≥3)</span>
        <span>🏎️ Sao đua xe hôm nay: ${todayArcade}/${set.dailyArcadeCap || DAILY_ARCADE_STAR_CAP}⭐</span>
      </div>
      <div class="parent-weak-list">
        <strong>Từ hay nhầm cần ôn thêm:</strong>
        ${weakList.length ? weakList.map(([, w]) => `<span class="weak-pill">${escapeHtmlPlus(w.label)} (${w.wrong} lần)</span>`).join('') : '<span>Chưa có lỗi nào 🎉</span>'}
      </div>
    </div>

    <div class="parent-controls-box">
      <div class="parent-sub-title">⚙️ Điều khiển &amp; Bảo vệ mắt</div>
      <label class="parent-check-row">
        <span>⏰ Nhắc nghỉ mắt sau:</span>
        <select id="parentEyeBreakSelect">
          <option value="0" ${Number(set.eyeBreakMinutes) === 0 ? 'selected' : ''}>Tắt nhắc</option>
          <option value="15" ${Number(set.eyeBreakMinutes) === 15 ? 'selected' : ''}>15 phút</option>
          <option value="20" ${Number(set.eyeBreakMinutes) === 20 ? 'selected' : ''}>20 phút</option>
          <option value="30" ${Number(set.eyeBreakMinutes) === 30 ? 'selected' : ''}>30 phút</option>
        </select>
      </label>
      <label class="parent-check-row">
        <span>🏎️ Trần Sao Đua Xe mỗi ngày:</span>
        <select id="parentArcadeCapSelect">
          <option value="15" ${(set.dailyArcadeCap || 25) === 15 ? 'selected' : ''}>15 ⭐/ngày</option>
          <option value="25" ${(set.dailyArcadeCap || 25) === 25 ? 'selected' : ''}>25 ⭐/ngày</option>
          <option value="35" ${(set.dailyArcadeCap || 25) === 35 ? 'selected' : ''}>35 ⭐/ngày</option>
          <option value="50" ${(set.dailyArcadeCap || 25) === 50 ? 'selected' : ''}>50 ⭐/ngày</option>
        </select>
      </label>
      <label class="parent-check-row">
        <input type="checkbox" id="parentFocusModeChk" ${set.focusHideGames ? 'checked' : ''}>
        <span>Chế độ Tập Trung (tạm ẩn Đua Xe &amp; Khu Trò Chơi)</span>
      </label>
      <label class="parent-check-row">
        <input type="checkbox" id="parentNoSysTtsChk" ${sysDisabled ? 'checked' : ''}>
        <span>Chặn giọng đọc máy mặc định của Windows (chỉ dùng MP3 thật / ghi âm gia đình)</span>
      </label>
    </div>

    <div class="parent-voice-box">
      <div class="parent-sub-title">🎙️ Phòng Thu Giọng Ba/Mẹ Cục Bộ (${customCount} bản thu)</div>
      <p style="font-size: 11px; color: #475569; margin: 2px 0 8px 0;">
        🔒 Bản ghi âm chỉ lưu cục bộ trong trình duyệt thiết bị này và sẽ phát ưu tiên trước giọng mẫu.
      </p>
      <div class="parent-voice-row">
        <select id="parentVoiceKeySelect">
          ${CUSTOM_VOICE_PRESETS.map(p => `<option value="${p.key}">${p.label}${customVoiceStore.hasClip(p.key) ? ' ✓' : ''}</option>`).join('')}
        </select>
        <button type="button" class="tool-chip" id="btnParentRecStart">🎙️ Thu âm</button>
        <button type="button" class="tool-chip" id="btnParentRecPlay">▶️ Nghe</button>
        <button type="button" class="tool-chip" id="btnParentRecDel">✖ Xóa mục</button>
      </div>
      <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
        <button type="button" class="tool-chip parent-reset-btn" id="btnParentClearAllClips">🗑️ Xóa toàn bộ bản ghi âm cá nhân</button>
      </div>
    </div>
    <div id="parentVideoManagerHost"></div>
  `;

  document.getElementById('parentEyeBreakSelect')?.addEventListener('change', (e) => {
    explorerState.parentSettings.eyeBreakMinutes = Number(e.target.value);
    if (typeof saveProgress === 'function') saveProgress();
    if (typeof showToast === 'function') showToast('⏰ Đã cập nhật hẹn giờ nhắc nghỉ mắt.');
  });
  document.getElementById('parentArcadeCapSelect')?.addEventListener('change', (e) => {
    explorerState.parentSettings.dailyArcadeCap = Number(e.target.value) || DAILY_ARCADE_STAR_CAP;
    if (typeof saveProgress === 'function') saveProgress();
    renderParentPlusSection();
    if (typeof showToast === 'function') showToast(`🏎️ Đã đặt giới hạn Sao Đua Xe: ${explorerState.parentSettings.dailyArcadeCap} ⭐/ngày.`);
  });
  document.getElementById('parentFocusModeChk')?.addEventListener('change', (e) => {
    explorerState.parentSettings.focusHideGames = !!e.target.checked;
    applyParentFocusMode();
    if (typeof saveProgress === 'function') saveProgress();
    if (typeof showToast === 'function') showToast(e.target.checked ? '📚 Đã bật Chế độ Tập Trung!' : '🎮 Đã hiện lại Đua xe & Trò chơi!');
  });
  document.getElementById('parentNoSysTtsChk')?.addEventListener('change', (e) => {
    window.soundMgr?.setAllowSystemTTS(!e.target.checked);
    if (typeof showToast === 'function') showToast(e.target.checked ? '🔇 Đã tắt giọng máy Windows fallback.' : '🔊 Đã bật giọng dự phòng trình duyệt.');
  });

  const sel = document.getElementById('parentVoiceKeySelect');
  if (sel && CUSTOM_VOICE_PRESETS.some(p => p.key === lastParentVoiceKey)) {
    sel.value = lastParentVoiceKey;
  }
  sel?.addEventListener('change', () => { lastParentVoiceKey = sel.value; });
  const recBtn = document.getElementById('btnParentRecStart');
  let parentRecording = false;
  recBtn?.addEventListener('click', async () => {
    const key = sel?.value;
    if (!key) return;
    if (!parentRecording) {
      const ok = await customVoiceStore.startRecording(key, (saved) => {
        parentRecording = false;
        if (recBtn) recBtn.innerText = '🎙️ Thu âm';
        if (saved && typeof showToast === 'function') {
          showToast(`🎙️ Đã lưu giọng Ba/Mẹ cho "${key}"!`);
          renderParentPlusSection();
        }
      });
      if (ok) {
        parentRecording = true;
        recBtn.innerText = '⏹️ Dừng thu';
      }
    } else {
      customVoiceStore.stopRecording();
    }
  });
  document.getElementById('btnParentRecPlay')?.addEventListener('click', () => {
    const key = sel?.value;
    if (!key) return;
    if (!customVoiceStore.playLocalClip(key)) {
      window.soundMgr?.playAudioFile(key, null, '');
    }
  });
  document.getElementById('btnParentRecDel')?.addEventListener('click', async () => {
    const key = sel?.value;
    if (!key) return;
    await customVoiceStore.deleteClip(key);
    renderParentPlusSection();
    if (typeof showToast === 'function') showToast(`Đã xóa bản thu "${key}".`);
  });
  document.getElementById('btnParentClearAllClips')?.addEventListener('click', async () => {
    await customVoiceStore.clearAll();
    renderParentPlusSection();
    if (typeof showToast === 'function') showToast('🗑️ Đã xóa toàn bộ bản ghi âm cá nhân trên thiết bị.');
  });

  window.renderParentVideoManager?.();
}
window.renderParentPlusSection = renderParentPlusSection;

let learningPlusInited = false;
function initLearningPlus() {
  if (learningPlusInited) return;
  learningPlusInited = true;
  applyParentFocusMode();
  startStudyActivityTimer();
  renderDailyRoadmapHost();
}
window.initLearningPlus = initLearningPlus;
