// Module phát âm Audio Người Thật (Nam & Nữ) + Fallback Web Speech API cho Bé Mon

class SoundManager {
  constructor() {
    this.gender = 'female'; // 'female' (Cô giáo Hoài My) | 'male' (Thầy giáo / Ba Nam Minh)
    this.speedRate = 1.0;   // 1.0 (Chuẩn) | 0.8 (Chậm)
    this.isMuted = false;
    this.currentAudio = null;
    this.audioCtx = null;

    // Web Speech API fallback
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.initWebSpeech();
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
  }

  setSpeed(speedVal) {
    if (speedVal === 'slow') {
      this.speedRate = 0.8;
    } else {
      this.speedRate = 1.0;
    }
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.speedRate;
    }
  }

  // Phát file audio người thật từ thư mục /audio/{gender}/{key}.mp3
  playAudioFile(key, onEndCallback, fallbackText = null) {
    if (this.isMuted) return;

    // Dừng audio cũ nếu đang phát
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }

    const audioUrl = `audio/${this.gender}/${key}.mp3`;
    const audio = new Audio(audioUrl);
    this.currentAudio = audio;
    audio.playbackRate = this.speedRate;

    audio.onended = () => {
      this.currentAudio = null;
      if (onEndCallback) onEndCallback();
    };

    audio.onerror = (e) => {
      console.warn(`Không tải được file âm thanh: ${audioUrl}, fallback sang TTS.`, e);
      this.currentAudio = null;
      if (fallbackText) {
        this.speakTTS(fallbackText, onEndCallback);
      } else if (onEndCallback) {
        onEndCallback();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Autoplay bị chặn hoặc lỗi phát:', err);
        if (fallbackText) {
          this.speakTTS(fallbackText, onEndCallback);
        }
      });
    }
  }

  // Phát âm chữ cái bảng chữ cái
  speakAlphabet(char, phonetic) {
    const key = `alpha_${char.toLowerCase()}`;
    this.playAudioFile(key, null, phonetic || char);
  }

  // Phát âm từ vựng trọn vẹn
  speakWord(word, onEndCallback) {
    const cleanWord = word.trim().toLowerCase();
    const key = `word_${cleanWord}`;
    this.playAudioFile(key, onEndCallback, word);
  }

  // Đánh vần chi tiết từng chữ cái và dấu thanh
  spellWord(word, fallbackSpellText, onEndCallback) {
    const cleanWord = word.trim().toLowerCase();
    const key = `spell_${cleanWord}`;
    this.playAudioFile(key, onEndCallback, fallbackSpellText || word);
  }

  // Phát âm dấu thanh
  speakTone(toneKey, fallbackText) {
    const key = `tone_${toneKey}`;
    this.playAudioFile(key, null, fallbackText);
  }

  // Lời khen thưởng trò chơi
  speakCheer(type) {
    const key = `cheer_${type}`;
    this.playAudioFile(key, null, type === 'correct' ? 'Bảo Long giỏi quá!' : 'Bảo Long thử lại nhé!');
  }

  // Fallback Web Speech API nếu gặp từ chưa sinh file
  speakTTS(text, onEndCallback) {
    if (this.isMuted || !this.synth) return;
    this.synth.cancel();

    // Chuẩn hóa dấu gạch ngang thành dấu phẩy để Web Speech đọc ngắt âm chuẩn ngữ âm
    const cleanText = (text || '').replace(/\s*-\s*/g, ', ');
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = this.speedRate === 0.8 ? 0.75 : 0.95;
    utter.lang = 'vi-VN';
    if (this.selectedVoice) {
      utter.voice = this.selectedVoice;
    }
    if (onEndCallback) {
      utter.onend = onEndCallback;
    }
    this.synth.speak(utter);
  }

  // Web Audio Context cho hiệu ứng game (ting, pop, còi pháo hoa)
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

  playToneFreq(freq, type, duration, delay = 0) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      console.warn(e);
    }
  }

  playClick() {
    this.playToneFreq(600, 'sine', 0.08);
  }

  playCorrect() {
    this.playToneFreq(523.25, 'triangle', 0.12, 0);     // C5
    this.playToneFreq(659.25, 'triangle', 0.12, 0.08);  // E5
    this.playToneFreq(783.99, 'triangle', 0.15, 0.16);  // G5
    this.playToneFreq(1046.50, 'triangle', 0.25, 0.24); // C6
  }

  playWrong() {
    this.playToneFreq(330, 'sawtooth', 0.15, 0);
    this.playToneFreq(280, 'sawtooth', 0.2, 0.12);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playToneFreq(freq, 'sine', 0.2, idx * 0.1);
    });
  }
}

window.soundMgr = new SoundManager();
