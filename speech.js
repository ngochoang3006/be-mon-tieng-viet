// Module phát âm Web Speech API và Hiệu ứng âm thanh cho Bé Mon

class SoundManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.speed = 0.85; // Chuẩn cho bé 6 tuổi nghe rõ
    this.accent = 'hn'; // 'hn' hoặc 'sg'
    this.isMuted = false;
    this.audioCtx = null;

    this.initVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.initVoices();
    }
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Tìm giọng tiếng Việt
    const viVoices = this.voices.filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoices.length > 0) {
      // Ưu tiên giọng tự nhiên (Microsoft HoaiMy, Google tiếng Việt, Linh)
      const natural = viVoices.find(v => v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('HoaiMy') || v.name.includes('Google'));
      this.selectedVoice = natural || viVoices[0];
    }
  }

  setSpeed(speedVal) {
    if (speedVal === 'slow') {
      this.speed = 0.65;
    } else {
      this.speed = 0.9;
    }
  }

  setAccent(accentType) {
    this.accent = accentType;
    // Nếu có giọng theo vùng miền thì cập nhật
    const viVoices = this.voices.filter(v => v.lang.includes('vi'));
    if (accentType === 'sg') {
      const sg = viVoices.find(v => v.name.toLowerCase().includes('nam') || v.name.toLowerCase().includes('saigon') || v.name.toLowerCase().includes('south'));
      if (sg) this.selectedVoice = sg;
    } else {
      const hn = viVoices.find(v => v.name.toLowerCase().includes('hoaimy') || v.name.toLowerCase().includes('hanoi') || v.name.toLowerCase().includes('north'));
      if (hn) this.selectedVoice = hn;
    }
  }

  speak(text, onEndCallback) {
    if (this.isMuted || !this.synth) return;

    // Ngừng âm đang đọc dở
    this.synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = this.speed;
    utter.pitch = 1.05; // Giọng hơi cao một chút thân thiện với trẻ nhỏ
    utter.lang = 'vi-VN';

    if (this.selectedVoice) {
      utter.voice = this.selectedVoice;
    }

    if (onEndCallback) {
      utter.onend = onEndCallback;
    }

    this.synth.speak(utter);
  }

  // Đánh vần chi tiết (chậm từng nhịp cho bé ngẫm nghĩ)
  spellWord(spellText, word, callback) {
    // spellText có dạng: "Bờ - a - ba - huyền - bà"
    this.speak(spellText, () => {
      setTimeout(() => {
        this.speak(word, callback);
      }, 350);
    });
  }

  // Âm thanh Game: Click, Đúng, Sai, Hoan hô (Dùng Web Audio API không cần load file mp3 bên ngoài)
  playTone(freq, type, duration, delay = 0) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
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
    this.playTone(600, 'sine', 0.08);
  }

  playCorrect() {
    // Hợp âm vui vẻ đồ - mi - son - đố
    this.playTone(523.25, 'triangle', 0.12, 0);     // C5
    this.playTone(659.25, 'triangle', 0.12, 0.08);  // E5
    this.playTone(783.99, 'triangle', 0.15, 0.16);  // G5
    this.playTone(1046.50, 'triangle', 0.25, 0.24); // C6
  }

  playWrong() {
    this.playTone(330, 'sawtooth', 0.15, 0);
    this.playTone(280, 'sawtooth', 0.2, 0.12);
  }

  playVictory() {
    // Chuỗi âm thanh chiến thắng chúc mừng bé Mon
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.2, idx * 0.1);
    });
  }
}

window.soundMgr = new SoundManager();
