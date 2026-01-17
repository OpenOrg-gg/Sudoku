
class AudioService {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private activeOscillators: Set<OscillatorNode> = new Set();

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playTap() {
    this.playTone(800, 'sine', 0.1, 0.05);
  }

  playCorrect() {
    this.playTone(600, 'sine', 0.1, 0.05);
    setTimeout(() => this.playTone(900, 'sine', 0.2, 0.05), 50);
  }

  playIncorrect() {
    this.playTone(150, 'sawtooth', 0.3, 0.05);
  }

  playPlacement() {
    this.playTone(400, 'triangle', 0.15, 0.05);
  }

  playWin() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.1), i * 150);
    });
  }

  playClick() {
    this.playTone(1000, 'sine', 0.05, 0.03);
  }

  startBackgroundMusic() {
    if (this.isMusicPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.musicGain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 3);
    this.musicGain.connect(this.ctx.destination);

    // Zen-like ambient sequence
    const scales = [
      [261.63, 329.63, 392.00, 493.88, 523.25], // C Major 7
      [349.23, 440.00, 523.25, 659.25, 698.46], // F Major 7
      [392.00, 493.88, 587.33, 739.99, 783.99]  // G Major 7
    ];
    
    let currentScale = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      
      const scale = scales[currentScale];
      const freq = scale[Math.floor(Math.random() * scale.length)];
      
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.Q.setValueAtTime(1, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 2);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 8);
      
      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.musicGain);
      
      osc.start();
      this.activeOscillators.add(osc);
      
      osc.onended = () => {
        this.activeOscillators.delete(osc);
      };
      
      osc.stop(this.ctx.currentTime + 8.1);
      
      // Randomly change scale
      if (Math.random() > 0.8) {
        currentScale = (currentScale + 1) % scales.length;
      }

      setTimeout(playNextNote, 3000 + Math.random() * 4000);
    };

    playNextNote();
    setTimeout(playNextNote, 1500); // Offset second voice
  }

  stopBackgroundMusic() {
    if (!this.isMusicPlaying) return;
    this.isMusicPlaying = false;
    
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.musicGain?.disconnect();
        this.musicGain = null;
        this.activeOscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        this.activeOscillators.clear();
      }, 1600);
    }
  }
}

export const audioService = new AudioService();
