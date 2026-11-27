// Module phát âm Audio Người Thật (Nam & Nữ) + Fallback Web Speech API cho Bé Bảo Long

const SILENT_UNLOCK_WAV = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

class SoundManager {
  constructor() {
    this.gender = 'female'; // 'female' (Cô giáo Hoài My) | 'male' (Ba Nam Minh)
    this.speedRate = 1.0;   // 1.0 (Chuẩn) | 0.8 (Chậm)
    this.isMuted = false;
    this.allowSystemTTS = false; // Mặc định tắt giọng máy Windows, chỉ dùng MP3 thật / ghi âm gia đình
    this.currentAudio = null;
    // Tái sử dụng một HTMLAudioElement duy nhất giúp giữ trạng thái unlock autoplay trên iOS Safari
    this.player = new Audio();
    this.player.preload = 'auto';
    this.player.setAttribute('playsinline', '');
    this.audioUnlocked = false;
    this.autoplayNoticeShown = false;
    this.audioCtx = null;
    this.sequenceToken = 0;
    this.blobCache = new Map();
    this.inflightFetches = new Map();
    this.prefetchQueue = [];
    this.prefetchActive = 0;
    this._praiseTimers = new Set();
    this.masterComp = null;
    this.voicesByLang = {};
    this._lastUtter = null;
    this.lastPraiseIdx = -1;
    this.lastTryIdx = -1;

    // Khôi phục cài đặt âm thanh đã lưu của Bảo Long
    this.loadPrefs();

    // Web Speech API fallback
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.initWebSpeech();
    this.bindUnlockOnFirstGesture();

    // Tải trước kho lời khen & hiệu ứng cốt lõi để phản hồi 0ms
    setTimeout(() => this.prefetchCommon(), 250);
  }

  bindUnlockOnFirstGesture() {
    const events = ['pointerup', 'touchend', 'click', 'keydown'];
    const cleanup = () => {
      events.forEach(ev => document.removeEventListener(ev, unlock, true));
    };
    const unlock = () => {
      try {
        this.getAudioContext();
        if (this.audioUnlocked) {
          cleanup();
          return;
        }
        if (!this.currentAudio && this.player.paused) {
          const prevVol = this.player.volume > 0 ? this.player.volume : 1;
          this.player.volume = 0.001;
          this.player.src = SILENT_UNLOCK_WAV;
          const p = this.player.play();
          if (p && typeof p.then === 'function') {
            p.then(() => {
              this.audioUnlocked = true;
              if (!this.currentAudio) {
                this.player.pause();
                try { this.player.currentTime = 0; } catch (e) {}
              }
              this.player.volume = prevVol;
              cleanup();
            }).catch(() => {
              this.player.volume = prevVol;
            });
          } else {
            this.player.volume = prevVol;
            this.audioUnlocked = true;
            cleanup();
          }
        } else {
          this.audioUnlocked = true;
          cleanup();
        }
      } catch (e) {
        this.player.volume = 1;
      }
    };
    events.forEach(ev => {
      document.addEventListener(ev, unlock, { capture: true, passive: true });
    });
  }

  inferLangFromKey(key) {
    if (key && (key.startsWith('en_') || key.startsWith('cheer_en'))) return 'en-US';
    if (key && (key.startsWith('ja_') || key.startsWith('cheer_ja'))) return 'ja-JP';
    return 'vi-VN';
  }

  notifyAutoplayBlocked() {
    if (this.autoplayNoticeShown || this.isMuted) return;
    this.autoplayNoticeShown = true;
    if (typeof showToast === 'function') {
      showToast(this.gender === 'male' ? '🔊 Chạm vào nút Loa để nghe ba đọc trên thiết bị nhé!' : '🔊 Chạm vào nút Loa để nghe cô đọc trên thiết bị nhé!');
    }
  }

  getCacheKey(gender, key) {
    return `${gender}:${key}`;
  }

  prefetchCommon() {
    const keys = [
      'cheer_praise_1', 'cheer_praise_2', 'cheer_praise_3', 'cheer_praise_4', 'cheer_praise_5',
      'cheer_praise_6', 'cheer_praise_7', 'cheer_praise_8', 'cheer_praise_9', 'cheer_praise_10',
      'cheer_streak_1', 'cheer_streak_2', 'cheer_streak_3',
      'cheer_try_1', 'cheer_try_2', 'cheer_try_3', 'cheer_try_4'
    ];
    this.prefetchKeys(keys);
  }

  _evictLruCacheIfNeeded() {
    while (this.blobCache.size >= 800) {
      let victimKey = null;
      for (const k of this.blobCache.keys()) {
        if (!k.includes(':cheer_')) {
          victimKey = k;
          break;
        }
      }
      if (!victimKey) victimKey = this.blobCache.keys().next().value;
      const oldUrl = this.blobCache.get(victimKey);
      this.blobCache.delete(victimKey);
      if (oldUrl) try { URL.revokeObjectURL(oldUrl); } catch (e) {}
    }
  }

  _drainPrefetchQueue() {
    while (this.prefetchActive < 4 && this.prefetchQueue.length > 0) {
      if (this.isMuted) {
        this.prefetchQueue.length = 0;
        break;
      }
      const { g, key, ck } = this.prefetchQueue.shift();
      if (g !== this.gender || this.blobCache.has(ck) || this.inflightFetches.has(ck)) continue;
      this.prefetchActive++;
      const url = `audio/${g}/${encodeURIComponent(key)}.mp3`;
      const p = fetch(url)
        .then(res => (res.ok ? res.blob() : null))
        .then(blob => {
          if (blob && blob.size > 500 && g === this.gender) {
            this._evictLruCacheIfNeeded();
            this.blobCache.set(ck, URL.createObjectURL(blob));
          }
        })
        .catch(() => {})
        .finally(() => {
          this.inflightFetches.delete(ck);
          this.prefetchActive = Math.max(0, this.prefetchActive - 1);
          this._drainPrefetchQueue();
        });
      this.inflightFetches.set(ck, p);
    }
  }

  prefetchKeys(keys) {
    if (this.isMuted || !Array.isArray(keys) || window.location.protocol === 'file:' || typeof fetch !== 'function') return;
    const g = this.gender;
    keys.forEach(rawKey => {
      if (!rawKey) return;
      const key = this.normalizeKey(rawKey);
      if (window.customVoiceStore?.hasClip?.(key) || window.customVoiceStore?.hasClip?.(rawKey)) return;
      const ck = this.getCacheKey(g, key);
      if (this.blobCache.has(ck) || this.inflightFetches.has(ck)) return;
      if (this.prefetchQueue.some(item => item.ck === ck)) return;
      this.prefetchQueue.push({ g, key, ck });
    });
    this._drainPrefetchQueue();
  }

  normalizeKey(key) {
    if (typeof key !== 'string') return '';
    const nfc = key.normalize('NFC').trim();
    const low = nfc.toLowerCase();
    if (low === 'alpha_â') return 'alpha_aa';
    if (low === 'word_â') return 'word_aa';
    if (low === 'word_sách') return 'word_sach';
    return nfc;
  }

  resolveAudioUrl(key, allowCustom = true) {
    const norm = this.normalizeKey(key);
    if (allowCustom) {
      const customUrl = window.customVoiceStore?.getSyncUrl?.(norm) || window.customVoiceStore?.getSyncUrl?.(key);
      if (customUrl) {
        return { url: customUrl, isCustom: true, norm };
      }
    }
    const ck = this.getCacheKey(this.gender, norm);
    if (this.blobCache.has(ck)) {
      const cached = this.blobCache.get(ck);
      this.blobCache.delete(ck);
      this.blobCache.set(ck, cached);
      return { url: cached, isCustom: false, norm };
    }
    return { url: `audio/${this.gender}/${encodeURIComponent(norm)}.mp3`, isCustom: false, norm };
  }

  loadPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem('baolong_audio_prefs_v1') || '{}');
      if (saved.gender === 'male' || saved.gender === 'female') this.gender = saved.gender;
      if (saved.speedRate === 0.8 || saved.speedRate === 1.0) this.speedRate = saved.speedRate;
      if (typeof saved.isMuted === 'boolean') this.isMuted = saved.isMuted;
      if (typeof saved.allowSystemTTS === 'boolean') this.allowSystemTTS = saved.allowSystemTTS;
    } catch (e) {
      // Ignore storage error
    }
  }

  savePrefs() {
    try {
      localStorage.setItem('baolong_audio_prefs_v1', JSON.stringify({
        gender: this.gender,
        speedRate: this.speedRate,
        isMuted: this.isMuted,
        allowSystemTTS: this.allowSystemTTS
      }));
    } catch (e) {
      // Ignore storage error
    }
  }

  initWebSpeech() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
        this.updateWebVoice();
      };
    }
    this.updateWebVoice();
  }

  setAllowSystemTTS(val) {
    this.allowSystemTTS = !!val;
    this.savePrefs();
  }

  _pickVoice(langPrefix, femaleRe, maleRe) {
    const matches = this.voices.filter(v => (v.lang || '').toLowerCase().startsWith(langPrefix));
    if (matches.length === 0) return null;
    const natural = matches.filter(v => /Natural|Online|Google/i.test(v.name));
    const pool = natural.length > 0 ? natural : matches;
    const pref = this.gender === 'female' ? femaleRe : maleRe;
    return pool.find(v => pref.test(v.name)) || pool[0];
  }

  updateWebVoice() {
    this.selectedVoice = this._pickVoice('vi', /HoaiMy|Linh|Female|Google/i, /NamMinh|Male/i);
    this.voicesByLang = {
      'vi-VN': this.selectedVoice,
      'ja-JP': this._pickVoice('ja', /Nanami|Kyoko|Haruka|Female|Google/i, /Keita|Ichiro|Male/i),
      'en-US': this._pickVoice('en', /Jenny|Aria|Samantha|Female|Google/i, /Andrew|Guy|David|Male/i)
    };
  }

  setGender(gender) {
    this.gender = gender === 'male' ? 'male' : 'female';
    this.prefetchQueue.length = 0;
    this.updateWebVoice();
    this.savePrefs();
    setTimeout(() => this.prefetchCommon(), 80);
  }

  setSpeed(speedVal) {
    this.speedRate = speedVal === 'slow' ? 0.8 : 1.0;
    if (this.player) {
      this.player.defaultPlaybackRate = this.speedRate;
    }
    if (this.currentAudio) {
      this.currentAudio.defaultPlaybackRate = this.speedRate;
      this.currentAudio.playbackRate = this.speedRate;
    }
    this.savePrefs();
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    if (this.isMuted) {
      this.prefetchQueue.length = 0;
      this.stopAll();
    }
    this.savePrefs();
  }

  stopAll() {
    this.sequenceToken++;
    this._praiseTimers.forEach(t => clearTimeout(t));
    this._praiseTimers.clear();
    document.querySelectorAll('.is-reading-option').forEach(el => el.classList.remove('is-reading-option'));
    if (this.player) {
      this.player.onended = null;
      this.player.onerror = null;
      this.player.onloadedmetadata = null;
      try {
        this.player.pause();
      } catch (e) {}
    }
    this.currentAudio = null;
    if (this.synth) {
      this.synth.cancel();
    }
  }

  _playOnSharedPlayer(key, myToken, onDone, onErrorOrReject, allowCustom = true) {
    const audio = this.player;
    audio.onended = null;
    audio.onerror = null;
    audio.onloadedmetadata = null;
    const resolved = this.resolveAudioUrl(key, allowCustom);
    audio.volume = 1;
    audio.src = resolved.url;
    audio.defaultPlaybackRate = this.speedRate;
    audio.playbackRate = this.speedRate;
    this.currentAudio = audio;

    let settled = false;
    const settle = (fn, arg) => {
      if (settled || myToken !== this.sequenceToken) return;
      settled = true;
      audio.onended = null;
      audio.onerror = null;
      audio.onloadedmetadata = null;
      this.currentAudio = null;
      if (fn) fn(arg);
    };

    audio.onloadedmetadata = () => {
      if (myToken === this.sequenceToken && !settled) {
        audio.defaultPlaybackRate = this.speedRate;
        audio.playbackRate = this.speedRate;
      }
    };
    audio.onended = () => settle(onDone);
    audio.onerror = () => {
      if (resolved.isCustom && myToken === this.sequenceToken && !settled) {
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        audio.onloadedmetadata = null;
        this._playOnSharedPlayer(key, myToken, onDone, onErrorOrReject, false);
        return;
      }
      settle(onErrorOrReject, null);
    };

    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.then(() => {
        this.audioUnlocked = true;
      }).catch((err) => settle(onErrorOrReject, err));
    }
  }

  // Đọc tuần tự Câu hỏi & từng Đáp án kèm tô sáng thẻ đáp án đang đọc (hỗ trợ bé chưa biết chữ!)
  playChoiceTour(steps, onComplete = null) {
    if (!Array.isArray(steps) || steps.length === 0) {
      if (onComplete) onComplete();
      return;
    }
    this.stopAll();
    const myToken = this.sequenceToken;

    // Tải trước đồng thời tất cả file âm thanh của câu hỏi & đáp án
    this.prefetchKeys(steps.map(s => s.key).filter(Boolean));

    if (this.isMuted) {
      if (onComplete) setTimeout(() => {
        if (myToken === this.sequenceToken) onComplete();
      }, 200);
      return;
    }

    let idx = 0;
    const nextStep = () => {
      if (myToken !== this.sequenceToken) return;
      document.querySelectorAll('.is-reading-option').forEach(el => el.classList.remove('is-reading-option'));
      if (idx >= steps.length) {
        if (onComplete) onComplete();
        return;
      }
      const step = steps[idx++];
      if (step.el) step.el.classList.add('is-reading-option');

      const finishOne = () => {
        if (myToken !== this.sequenceToken) return;
        if (step.el) step.el.classList.remove('is-reading-option');
        setTimeout(nextStep, step.pauseAfterMs !== undefined ? step.pauseAfterMs : 120);
      };

      this._playOnSharedPlayer(step.key, myToken, finishOne, (err) => {
        if (err && err.name === 'AbortError') {
          if (step.el) step.el.classList.remove('is-reading-option');
          return;
        }
        if (err && err.name === 'NotAllowedError') {
          if (step.el) step.el.classList.remove('is-reading-option');
          this.notifyAutoplayBlocked();
          if (onComplete) onComplete();
          return;
        }
        if (this.allowSystemTTS && step.fallbackText) {
          this.speakTTS(step.fallbackText, finishOne, this.inferLangFromKey(step.key));
        } else {
          finishOne();
        }
      });
    };

    nextStep();
  }

  // Phát nối tiếp nhiều key audio (dùng ghép đọc phép tính Toán lớp 1 bất kỳ)
  playAudioSequence(keys, onCompleteCallback = null, fallbackText = null) {
    if (!Array.isArray(keys) || keys.length === 0) {
      if (onCompleteCallback) onCompleteCallback();
      return;
    }
    this.stopAll();
    this.prefetchKeys(keys);
    const myToken = this.sequenceToken;

    if (this.isMuted) {
      if (onCompleteCallback) setTimeout(() => {
        if (myToken === this.sequenceToken) onCompleteCallback();
      }, 200);
      return;
    }

    let idx = 0;
    const playStep = () => {
      if (myToken !== this.sequenceToken) return;
      if (idx >= keys.length) {
        if (onCompleteCallback) onCompleteCallback();
        return;
      }
      const key = keys[idx++];
      this._playOnSharedPlayer(key, myToken, playStep, (err) => {
        if (err && err.name === 'AbortError') return;
        if (err && err.name === 'NotAllowedError') {
          this.notifyAutoplayBlocked();
          if (onCompleteCallback && myToken === this.sequenceToken) onCompleteCallback();
          return;
        }
        if (this.allowSystemTTS && fallbackText && idx === 1) {
          this.speakTTS(fallbackText, () => {
            if (onCompleteCallback && myToken === this.sequenceToken) onCompleteCallback();
          }, this.inferLangFromKey(key));
        } else {
          playStep();
        }
      });
    };

    playStep();
  }

  // Phát file audio người thật từ thư mục /audio/{gender}/{key}.mp3 (dùng cache 0ms!)
  playAudioFile(key, onEndCallback, fallbackText = null) {
    this.stopAll();
    const myToken = this.sequenceToken;
    if (this.isMuted) {
      if (onEndCallback) setTimeout(() => {
        if (myToken === this.sequenceToken) onEndCallback();
      }, 200);
      return;
    }

    const finish = () => {
      if (myToken !== this.sequenceToken) return;
      if (onEndCallback) onEndCallback();
    };

    this._playOnSharedPlayer(key, myToken, finish, (err) => {
      if (err && err.name === 'AbortError') return;
      if (err && err.name === 'NotAllowedError') {
        this.notifyAutoplayBlocked();
        finish();
        return;
      }
      if (!err) {
        if (key === 'alpha_â') {
          this.playAudioFile('alpha_aa', onEndCallback, fallbackText);
          return;
        }
        if (key === 'word_â') {
          this.playAudioFile('word_aa', onEndCallback, fallbackText);
          return;
        }
        if (key === 'word_sách') {
          this.playAudioFile('word_sach', onEndCallback, fallbackText);
          return;
        }
      }
      if (this.allowSystemTTS && fallbackText) {
        this.speakTTS(fallbackText, finish, this.inferLangFromKey(key));
      } else {
        finish();
      }
    });
  }

  // Phát âm chữ cái bảng chữ cái hoặc phụ âm ghép
  speakAlphabet(char, phonetic, onEndCallback = null) {
    const clean = (char || '').trim().toLowerCase();
    const key = `alpha_${clean}`;
    this.playAudioFile(key, onEndCallback, phonetic || clean);
  }

  // Phát âm thông minh cho từng mẩu chữ cái / vần / thanh điệu (hết hoàn toàn 404 khi bấm breakdown hay ô ghép chữ!)
  speakPart(partText, onEndCallback = null) {
    const clean = (partText || '').trim().toLowerCase();
    if (!clean) return;

    // 1. Kiểm tra nếu là tên thanh điệu
    const toneMap = {
      'ngang': 'ngang',
      'sắc': 'sac',
      'huyền': 'huyen',
      'hỏi': 'hoi',
      'ngã': 'nga',
      'nặng': 'nang'
    };
    if (toneMap[clean]) {
      this.speakTone(toneMap[clean], `dấu ${clean}`, onEndCallback);
      return;
    }

    // 2. Kiểm tra nếu là 29 chữ cái hoặc 11 phụ âm ghép
    const alphaLetters = new Set([
      'a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l',
      'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y',
      'ch', 'gh', 'gi', 'kh', 'ng', 'ngh', 'nh', 'ph', 'qu', 'th', 'tr'
    ]);
    if (alphaLetters.has(clean)) {
      this.speakAlphabet(clean, clean, onEndCallback);
      return;
    }

    // 3. Nếu là vần hoặc chữ có dấu trong game ghép chữ / tách vần -> dùng syl_{clean}
    this.playAudioFile(`syl_${clean}`, onEndCallback, clean);
  }

  // Phát âm từ vựng trọn vẹn (hỗ trợ audioKey cho Khủng Long & Xe Cộ)
  speakWordObj(wordObj, onEndCallback = null) {
    if (!wordObj) return;
    if (wordObj.audioKey) {
      this.playAudioFile(wordObj.audioKey, onEndCallback, wordObj.word || wordObj.dinoName || wordObj.vehName);
    } else if (wordObj.word) {
      this.speakWord(wordObj.word, onEndCallback);
    }
  }

  // Phát âm từ vựng trọn vẹn
  speakWord(word, onEndCallback = null) {
    const cleanWord = (word || '').trim().toLowerCase();
    const key = `word_${cleanWord}`;
    this.playAudioFile(key, onEndCallback, word);
  }

  // Đánh vần chi tiết từng chữ cái và dấu thanh
  spellWord(word, fallbackSpellText, onEndCallback = null) {
    const cleanWord = (word || '').trim().toLowerCase();
    const key = `spell_${cleanWord}`;
    this.playAudioFile(key, onEndCallback, fallbackSpellText || word);
  }

  // Phát âm dấu thanh
  speakTone(toneKey, fallbackText, onEndCallback = null) {
    const key = `tone_${toneKey}`;
    this.playAudioFile(key, onEndCallback, fallbackText);
  }

  // Kho lời khen ngẫu nhiên phong phú cho Bảo Long (10 câu khen + 3 câu chuỗi thắng + 4 câu động viên)
  speakPraise(isStreak = false, onEndCallback = null) {
    if (isStreak) {
      const n = 1 + Math.floor(Math.random() * 3);
      this.playAudioFile(`cheer_streak_${n}`, onEndCallback, 'Siêu chuỗi liên tiếp! Bảo Long bất bại!');
      return;
    }
    let idx = Math.floor(Math.random() * 10);
    if (idx === this.lastPraiseIdx) idx = (idx + 1 + Math.floor(Math.random() * 8)) % 10;
    this.lastPraiseIdx = idx;
    this.playAudioFile(`cheer_praise_${idx + 1}`, onEndCallback, 'Hoan hô Bảo Long giỏi quá!');
  }

  speakTryAgain(onEndCallback = null) {
    let idx = Math.floor(Math.random() * 4);
    if (idx === this.lastTryIdx) idx = (idx + 1) % 4;
    this.lastTryIdx = idx;
    this.playAudioFile(`cheer_try_${idx + 1}`, onEndCallback, 'Cố lên Bảo Long ơi, thử chọn lại nhé!');
  }

  // Khen xong (hoặc timeout an toàn 6.5s để không cắt cụt 13 lời khen dài ở 0.8x) rồi mới chuyển câu
  playPraiseThen(isStreak, guardFn, advanceFn, maxFallbackMs = 6500) {
    let advanced = false;
    const startToken = this.sequenceToken + 1;
    const go = () => {
      if (advanced) return;
      advanced = true;
      if (typeof guardFn === 'function' && !guardFn()) return;
      if (typeof advanceFn === 'function') advanceFn();
    };
    const trackTimer = (fn, ms) => {
      const id = setTimeout(() => {
        this._praiseTimers.delete(id);
        fn();
      }, ms);
      this._praiseTimers.add(id);
      return id;
    };
    if (this.isMuted) {
      this.stopAll();
      const t = this.sequenceToken;
      trackTimer(() => { if (this.sequenceToken === t) go(); }, 420);
      return;
    }
    this.speakPraise(isStreak, () => trackTimer(go, 110));
    trackTimer(() => {
      if (this.sequenceToken === startToken || this.sequenceToken === startToken - 1) go();
    }, maxFallbackMs);
  }

  // Lời khen thưởng trò chơi
  speakCheer(type, onEndCallback = null) {
    if (type === 'correct') {
      this.speakPraise(false, onEndCallback);
      return;
    }
    if (type === 'wrong') {
      this.speakTryAgain(onEndCallback);
      return;
    }
    const key = `cheer_${type}`;
    this.playAudioFile(key, onEndCallback, '');
  }

  // Fallback Web Speech API nếu gặp từ chưa sinh file
  speakTTS(text, onEndCallback, lang = 'vi-VN') {
    if (this.isMuted || !this.synth) {
      if (onEndCallback) setTimeout(onEndCallback, 250);
      return;
    }
    this.synth.cancel();

    const cleanText = (text || '').replace(/\s*-\s*/g, ', ');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = this.speedRate === 0.8 ? 0.75 : 0.95;
    utter.lang = lang;
    const picked = this.voicesByLang[lang] || (lang === 'vi-VN' ? this.selectedVoice : null);
    if (picked) utter.voice = picked;
    this._lastUtter = utter;
    const done = () => {
      if (this._lastUtter === utter) this._lastUtter = null;
      if (onEndCallback) onEndCallback();
    };
    utter.onend = done;
    utter.onerror = done;
    this.synth.speak(utter);
  }

  // Web Audio Context cho hiệu ứng game & Pianica (an toàn iOS + tránh click/clip)
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
        try {
          const comp = this.audioCtx.createDynamicsCompressor();
          comp.threshold.value = -12;
          comp.ratio.value = 4;
          comp.connect(this.audioCtx.destination);
          this.masterComp = comp;
        } catch (e) {
          this.masterComp = null;
        }
      }
    }
    if (this.audioCtx && (this.audioCtx.state === 'suspended' || this.audioCtx.state === 'interrupted')) {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  playToneFreq(freq, type, duration, delay = 0, vol = 0.12) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t0 = ctx.currentTime + Math.max(0, delay);
      const dur = Math.max(0.03, duration);
      const peak = Math.max(0.005, vol);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(peak, t0 + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      osc.connect(gain);
      gain.connect(this.masterComp || ctx.destination);
      osc.onended = () => {
        try { osc.disconnect(); } catch (e) {}
        try { gain.disconnect(); } catch (e) {}
      };
      osc.start(t0);
      osc.stop(t0 + dur + 0.01);
    } catch (e) {
      // Ignore Web Audio errors
    }
  }

  playClick() {
    this.playToneFreq(620, 'sine', 0.07, 0, 0.08);
  }

  playPop() {
    this.playToneFreq(480, 'sine', 0.06, 0, 0.08);
    this.playToneFreq(720, 'sine', 0.08, 0.03, 0.08);
  }

  playCorrect() {
    this.playToneFreq(523.25, 'triangle', 0.12, 0);
    this.playToneFreq(659.25, 'triangle', 0.12, 0.08);
    this.playToneFreq(783.99, 'triangle', 0.15, 0.16);
    this.playToneFreq(1046.50, 'triangle', 0.25, 0.24);
  }

  playWrong() {
    this.playToneFreq(310, 'triangle', 0.14, 0, 0.09);
    this.playToneFreq(250, 'triangle', 0.18, 0.12, 0.09);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playToneFreq(freq, 'sine', 0.2, idx * 0.1);
    });
  }

  playHammerHit() {
    this.playToneFreq(750, 'square', 0.05, 0);
    this.playToneFreq(350, 'triangle', 0.08, 0.02);
  }

  playMagicalRevive() {
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      this.playToneFreq(freq, 'sine', 0.3, idx * 0.08);
    });
  }

  // Còi tàu Shinkansen siêu tốc
  playShinkansenWhistle() {
    this.playToneFreq(587.33, 'triangle', 0.18, 0, 0.14);
    this.playToneFreq(740.0, 'triangle', 0.18, 0, 0.10);
    this.playToneFreq(587.33, 'triangle', 0.38, 0.22, 0.14);
    this.playToneFreq(740.0, 'triangle', 0.38, 0.22, 0.10);
  }
}

window.soundMgr = new SoundManager();
