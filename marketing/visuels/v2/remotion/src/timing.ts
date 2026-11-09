import voix from "./data/voix.json";

/**
 * Minutage de la vidéo, calculé à partir de la voix réelle (durées et mots).
 * Si la voix change (nouveau texte, nouvelle voix, voix d'Adams), copier le nouveau
 * durees.json dans src/data/voix.json : toutes les scènes se recalent seules.
 */
export const FPS = 30;

type Word = { w: string; s: number; e: number };
type Line = { name: string; text: string; duration: number; words: Word[] };
const LINES = voix as Line[];
const line = (name: string) => {
  const l = LINES.find((x) => x.name === name);
  if (!l) throw new Error(`Réplique absente : ${name}`);
  return l;
};

export type SceneId = "hook" | "daily" | "flow" | "site" | "app" | "proof" | "tuto" | "side" | "end";

// [scène, réplique, durée minimale (s), décalage de la voix dans la scène (s)]
const PLAN: [SceneId, string, number, number][] = [
  ["hook", "01-accroche", 3.4, 0.9],   // les notifications tombent d'abord seules
  ["daily", "02-quotidien", 4.2, 0.1],
  ["flow", "03-flow", 3.6, 0.35],
  ["site", "04-site", 7.8, 0.2],
  ["app", "05-app", 7.4, 0.2],
  ["proof", "05b-preuves", 5.4, 0.2],
  ["tuto", "06-tuto", 9.6, 0.5],
  ["side", "07-cotes", 6.2, 0.2],
  ["end", "08-fin", 3.8, 0.35],
];

export type Scene = { id: SceneId; line: string; start: number; dur: number; voAt: number };

export const SCENES: Scene[] = (() => {
  let t = 0;
  return PLAN.map(([id, name, min, off]) => {
    const l = line(name);
    const dur = Math.max(min, off + l.words[l.words.length - 1].e + 0.35);
    const s = { id, line: name, start: t, dur, voAt: t + off };
    t += dur;
    return s;
  });
})();

export const TOTAL_S = SCENES.reduce((a, s) => a + s.dur, 0);
export const TOTAL_FRAMES = Math.ceil(TOTAL_S * FPS);
export const scene = (id: SceneId) => SCENES.find((s) => s.id === id)!;

/** Instant (s, absolu) d'un mot de la réplique d'une scène, relatif au début de la scène. */
export const wordAt = (id: SceneId, prefix: string, fallback: number): number => {
  const s = scene(id);
  const w = line(s.line).words.find((x) => x.w.toLowerCase().startsWith(prefix.toLowerCase()));
  return w ? s.voAt - s.start + w.s : fallback;
};

/** Tous les mots, en temps absolu (sous-titres). */
export const WORDS = SCENES.flatMap((s) =>
  line(s.line).words.map((w) => ({ ...w, s: s.voAt + w.s, e: s.voAt + w.e, scene: s.id })),
);

export const lineDuration = (name: string) => line(name).duration;
