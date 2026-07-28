let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playTone(audioCtx: AudioContext, freq: number, start: number, duration: number, peak: number) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

// Petit "ding" synthétisé pour les récompenses, sans fichier audio externe.
export function playDing() {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(audioCtx, 880, now, 0.1, 0.1);
  playTone(audioCtx, 1318.5, now + 0.08, 0.14, 0.1);
}

export function playFanfare() {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [659.25, 783.99, 987.77, 1318.51].forEach((freq, i) => {
    playTone(audioCtx, freq, now + i * 0.09, 0.16, 0.09);
  });
}
