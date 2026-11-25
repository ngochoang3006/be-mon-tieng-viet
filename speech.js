// Module phát âm Audio Người Thật (Nam & Nữ) + Fallback Web Speech API cho Bé Bảo Long

class SoundManager {
  constructor() {
    this.gender = 'female'; // 'female' (Cô giáo Hoài My) | 'male' (Ba Nam Minh)
    this.speedRate = 1.0;   // 1.0 (Chuẩn) | 0.8 (Chậm)
    this.isMuted = false;
    this.currentAudio = null;
    this.audioCtx = null;
    this.sequenceToken = 0;
    this.blobCache = new Map();
    this.inflightFetches = new Map();
    this.lastPraiseIdx = -1;
    this.lastTryIdx = -1;

    // Khôi phục cài đặt âm thanh đã lưu của Bảo Long
    this.loadPrefs();

    // Web Speech API fallback
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.initWebSpeech();

    // Tải trước kho lời khen & hiệu ứng cốt lõi để phản hồi 0ms
    setTimeout(() => this.prefetchCommon(), 250);
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

  prefetchKeys(keys) {
    if (!Array.isArray(keys) || window.location.protocol === 'file:' || typeof fetch !== 'function') return;
    const g = this.gender;
    keys.forEach(key => {
      if (!key) return;
      const ck = this.getCacheKey(g, key);
      if (this.blobCache.has(ck) || this.inflightFetches.has(ck)) return;
      const url = `audio/${g}/${encodeURIComponent(key)}.mp3`;
      const p = fetch(url)
        .then(res => (res.ok ? res.blob() : null))
        .then(blob => {
          if (blob && blob.size > 500) {
            if (this.blobCache.size > 650) {
              const firstKey = this.blobCache.keys().next().value;
              const oldUrl = this.blobCache.get(firstKey);
              this.blobCache.delete(firstKey);
              if (oldUrl) try { URL.revokeObjectURL(oldUrl); } catch (e) {}
            }
            this.blobCache.set(ck, URL.createObjectURL(blob));
          }
        })
        .catch(() => {})
        .finally(() => {
          this.inflightFetches.delete(ck);
        });
      this.inflightFetches.set(ck, p);
    });
  }

  resolveAudioUrl(key) {
    const ck = this.getCacheKey(this.gender, key);
    if (this.blobCache.has(ck)) {
      return this.blobCache.get(ck);
    }
    this.prefetchKeys([key]);
    return `audio/${this.gender}/${encodeURIComponent(key)}.mp3`;
  }

  loadPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem('baolong_audio_prefs_v1') || '{}');
      if (saved.gender === 'male' || saved.gender === 'female') this.gender = saved.gender;
      if (saved.speedRate === 0.8 || saved.speedRate === 1.0) this.speedRate = saved.speedRate;
      if (typeof saved.isMuted === 'boolean') this.isMuted = saved.isMuted;
    } catch (e) {
      // Ignore storage error
    }
  }

  savePrefs() {
    try {
      localStorage.setItem('baolong_audio_prefs_v1', JSON.stringify({
        gender: this.gender,
        speedRate: this.speedRate,
        isMuted: this.isMuted
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

  updateWebVoice() {
    const viVoices = this.voices.filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoices.length > 0) {
      if (this.gender === 'female') {
        const f = viVoices.find(v => v.name.includes('HoaiMy') || v.name.includes('Linh') || v.name.includes('Female') || v.name.includes('Google'));
        this.selectedVoice = f || viVoices[0];
      } else {
        const m = viVoices.find(v => v.name.includes('NamMinh') || v.name.includes('Male') || v.name.includes('An'));
        this.selectedVoice = m || viVoices[0];
      }
    }
  }

  setGender(gender) {
    this.gender = gender;
    this.updateWebVoice();
    this.savePrefs();
    setTimeout(() => this.prefetchCommon(), 80);
  }

  setSpeed(speedVal) {
    this.speedRate = speedVal === 'slow' ? 0.8 : 1.0;
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.speedRate;
    }
    this.savePrefs();
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    if (this.isMuted) {
      this.stopAll();
    }
    this.savePrefs();
  }

  stopAll() {
    this.sequenceToken++;
    document.querySelectorAll('.is-reading-option').forEach(el => el.classList.remove('is-reading-option'));
    if (this.currentAudio) {
      this.currentAudio.onended = null;
      this.currentAudio.onerror = null;
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
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
      if (onComplete) setTimeout(onComplete, 200);
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
      if (step.el) {
        step.el.classList.add('is-reading-option');
      }
      const url = this.resolveAudioUrl(step.key);
      const audio = new Audio(url);
      this.currentAudio = audio;
      audio.playbackRate = this.speedRate;

      let done = false;
      const finishOne = () => {
        if (done || myToken !== this.sequenceToken) return;
        done = true;
        this.currentAudio = null;
        if (step.el) step.el.classList.remove('is-reading-option');
        setTimeout(nextStep, step.pauseAfterMs !== undefined ? step.pauseAfterMs : 120);
      };

      audio.onended = finishOne;
      audio.onerror = () => {
        if (done || myToken !== this.sequenceToken) return;
        this.currentAudio = null;
        if (step.fallbackText) {
          const lang = (step.key && (step.key.startsWith('en_') || step.key.startsWith('cheer_en')))
            ? 'en-US'
            : ((step.key && (step.key.startsWith('ja_') || step.key.startsWith('cheer_ja'))) ? 'ja-JP' : 'vi-VN');
          this.speakTTS(step.fallbackText, finishOne, lang);
        } else {
          finishOne();
        }
      };

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          if (done || myToken !== this.sequenceToken) return;
          if (step.fallbackText) {
            const lang = (step.key && (step.key.startsWith('en_') || step.key.startsWith('cheer_en')))
              ? 'en-US'
              : ((step.key && (step.key.startsWith('ja_') || step.key.startsWith('cheer_ja'))) ? 'ja-JP' : 'vi-VN');
            this.speakTTS(step.fallbackText, finishOne, lang);
          } else {
            finishOne();
          }
        });
      }
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
      if (onCompleteCallback) setTimeout(onCompleteCallback, 200);
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
      const audio = new Audio(this.resolveAudioUrl(key));
      this.currentAudio = audio;
      audio.playbackRate = this.speedRate;

      let finished = false;
      const doneStep = () => {
        if (finished || myToken !== this.sequenceToken) return;
        finished = true;
        this.currentAudio = null;
        playStep();
      };

      audio.onended = doneStep;
      audio.onerror = () => {
        if (myToken !== this.sequenceToken) return;
        this.currentAudio = null;
        if (fallbackText && idx === 1) {
          this.speakTTS(fallbackText, () => {
            if (onCompleteCallback && myToken === this.sequenceToken) onCompleteCallback();
          });
        } else {
          doneStep();
        }
      };

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          if (myToken !== this.sequenceToken) return;
          if (fallbackText && idx === 1) {
            this.speakTTS(fallbackText, () => {
              if (onCompleteCallback && myToken === this.sequenceToken) onCompleteCallback();
            });
          } else {
            doneStep();
          }
        });
      }
    };

    playStep();
  }

  // Phát file audio người thật từ thư mục /audio/{gender}/{key}.mp3 (dùng cache 0ms!)
  playAudioFile(key, onEndCallback, fallbackText = null) {
    if (this.isMuted) {
      if (onEndCallback) setTimeout(onEndCallback, 200);
      return;
    }

    this.stopAll();
    const myToken = this.sequenceToken;

    const audio = new Audio(this.resolveAudioUrl(key));
    this.currentAudio = audio;
    audio.playbackRate = this.speedRate;

    let ended = false;
    const finish = () => {
      if (ended || myToken !== this.sequenceToken) return;
      ended = true;
      this.currentAudio = null;
      if (onEndCallback) onEndCallback();
    };

    audio.onended = finish;

    audio.onerror = () => {
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

      this.currentAudio = null;
      const ttsLang = (key && (key.startsWith('en_') || key.startsWith('cheer_en')))
        ? 'en-US'
        : ((key && (key.startsWith('ja_') || key.startsWith('cheer_ja'))) ? 'ja-JP' : 'vi-VN');
      if (fallbackText) {
        this.speakTTS(fallbackText, finish, ttsLang);
      } else {
        finish();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const ttsLang = (key && (key.startsWith('en_') || key.startsWith('cheer_en')))
          ? 'en-US'
          : ((key && (key.startsWith('ja_') || key.startsWith('cheer_ja'))) ? 'ja-JP' : 'vi-VN');
        if (fallbackText) {
          this.speakTTS(fallbackText, finish, ttsLang);
        } else {
          finish();
        }
      });
    }
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

  // Khen xong (hoặc timeout an toàn nếu tắt tiếng / trình duyệt chặn) rồi mới chuyển câu mượt mà
  playPraiseThen(isStreak, guardFn, advanceFn, maxFallbackMs = 2600) {
    let advanced = false;
    const go = () => {
      if (advanced) return;
      advanced = true;
      if (typeof guardFn === 'function' && !guardFn()) return;
      if (typeof advanceFn === 'function') advanceFn();
    };
    if (this.isMuted) {
      setTimeout(go, 420);
      return;
    }
    this.speakPraise(isStreak, () => setTimeout(go, 110));
    setTimeout(go, maxFallbackMs);
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
    if (lang === 'vi-VN' && this.selectedVoice) {
      utter.voice = this.selectedVoice;
    }
    if (onEndCallback) {
      utter.onend = onEndCallback;
      utter.onerror = onEndCallback;
    }
    this.synth.speak(utter);
  }

  // Web Audio Context cho hiệu ứng game
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
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

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
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
