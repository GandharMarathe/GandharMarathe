/** Chiptune blips synthesised with Web Audio: no audio files to load. */

type Note = [freq: number, seconds: number];
type Sound = "hover" | "move" | "select" | "start" | "coin" | "level" | "over";

const SOUNDS: Record<Sound, { wave: OscillatorType; notes: Note[] }> = {
  hover: { wave: "square", notes: [[880, 0.025]] },
  move: { wave: "square", notes: [[660, 0.05]] },
  select: { wave: "square", notes: [[523, 0.05], [784, 0.08]] },
  start: { wave: "square", notes: [[392, 0.08], [523, 0.08], [659, 0.08], [1047, 0.18]] },
  coin: { wave: "square", notes: [[988, 0.05], [1319, 0.12]] },
  level: { wave: "square", notes: [[523, 0.07], [659, 0.07], [784, 0.07], [1047, 0.16]] },
  over: { wave: "triangle", notes: [[392, 0.14], [311, 0.14], [262, 0.3]] },
};

const VOLUME = 0.035;
const STORAGE_KEY = "gm-muted";

let ctx: AudioContext | null = null;
let muted = false;
try {
  muted = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1";
} catch {}
const listeners = new Set<() => void>();

export const sfx = {
  play(name: Sound) {
    if (muted || typeof window === "undefined") return;
    try {
      ctx ??= new AudioContext();
      // Browsers keep audio suspended until the first click or key press.
      if (ctx.state === "suspended") void ctx.resume();
      let t = ctx.currentTime;
      const { wave, notes } = SOUNDS[name];
      for (const [freq, seconds] of notes) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = wave;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(VOLUME, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + seconds);
        t += seconds * 0.9;
      }
    } catch {}
  },
  isMuted: () => muted,
  toggle() {
    muted = !muted;
    try {
      localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    } catch {}
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => void listeners.delete(fn);
  },
};
