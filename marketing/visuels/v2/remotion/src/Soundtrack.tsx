import React from "react";
import { Audio } from "@remotion/media";
import { interpolate, random, Sequence, staticFile, useVideoConfig } from "remotion";
import meta from "../public/sfx/meta.json";
import { SCENES, scene, TOTAL_S, wordAt, WORDS } from "./timing";
import { SEARCH } from "./scenes/Site";
import { CLIP, SEQOFF } from "./scenes/Tuto";

/**
 * Bande-son : voix (une réplique par scène), musique qui baisse automatiquement sous la voix,
 * bruitages réels (Mixkit) calés sur l'image. Peu de souffles de transition : 4 au total.
 */
type Cue = { f: string; at: number; vol: number };
const PEAK = meta as Record<string, { pic: number }>;
const abs = (id: Parameters<typeof scene>[0], local: number) => scene(id).start + local;

const CUES: Cue[] = (() => {
  const c: Cue[] = [];
  const add = (f: string, at: number, vol: number) => c.push({ f, at, vol });
  const peak = (f: string, event: number, vol: number) => add(f, event - (PEAK[f]?.pic ?? 0), vol);
  const rnd = (k: string) => random(k);

  // 1. Accroche : chaque notification qui jaillit
  [0.12, 0.38, 0.62, 0.82].forEach((a, i) => add(i < 2 ? "notif" : "notif2", abs("hook", a), i < 2 ? 0.5 : 0.35));
  peak("whoosh2", abs("hook", wordAt("hook", "activ", 1.6)), 0.35);
  // 2. Quotidien : un impact par mot, papier froissé, clavier sur « relances »
  ["appels", "papiers", "relances"].forEach((w) => peak("tampon", abs("daily", wordAt("daily", w, 1)), 0.45));
  peak("papier", abs("daily", wordAt("daily", "papiers", 1.5) + 0.2), 0.55);
  add("clavier-pc", abs("daily", wordAt("daily", "relances", 2.4) + 0.1), 0.4);
  peak("whoosh", abs("daily", wordAt("daily", "filent", 3) + 0.7), 0.55);           // transition vers la marque
  // 3. Flow : le chevron qui claque, les trois ronds
  add("tampon", abs("flow", 0.18), 0.5);
  [0, 0.3, 0.6].forEach((d) => add("notif2", abs("flow", wordAt("flow", "pas", 2) + d), 0.25));
  // 4. Site : recherche tapée lettre par lettre, cartes, paiement, avant/après
  const tt = wordAt("site", "trouvent", 2.2);
  [...SEARCH].forEach((_, i) => add(`key${1 + Math.floor(rnd(`s${i}`) * 10)}`, abs("site", tt + 0.1 + (0.55 * (i + 0.5)) / SEARCH.length), 0.5));
  ["trouvent", "réservent", "paient"].forEach((w) => add("notif2", abs("site", wordAt("site", w, 3)), 0.22));
  add("notif", abs("site", wordAt("site", "paient", 3.5) + 0.35), 0.45);
  peak("sweep", abs("site", wordAt("site", "déjà", 5) - 0.4 + 1.05), 0.45);
  // 5. Application : compteurs et pastilles
  ["dossiers", "planning", "équipe"].forEach((w) => add("notif2", abs("app", wordAt("app", w, 5)), 0.25));
  // 6. Réalisations : souffle d'entrée, clic à chaque rotation
  peak("sweep", abs("proof", 0.1), 0.4);
  const per = (scene("proof").dur - 0.6) / 3;
  [1, 2].forEach((i) => add("clic", abs("proof", 0.3 + i * per - 0.1), 0.35));
  // 7. Tutoriel : plongée, puis une vraie frappe par caractère (mêmes fenêtres que l'écran)
  peak("plongee", abs("tuto", CLIP - 0.05), 0.6);
  add("entree", abs("tuto", CLIP), 0.4);
  const stAbs = (st: number) => abs("tuto", CLIP + st - SEQOFF);
  const end = scene("tuto").start + scene("tuto").dur;
  ([["flowsurmesure.com", 1.05, 2.0], ["Réserver et payer en ligne.", 5.7, 6.8], ["Camille Martin", 8.4, 9.0], ["camille@exemple.fr", 9.18, 9.95]] as const)
    .forEach(([txt, a, b], j) => [...txt].forEach((ch, i) => {
      const at = stAbs(a + ((b - a) * (i + 0.5)) / txt.length + (rnd(`t${j}${i}`) - 0.5) * 0.024);
      if (at < end) add(`key${1 + Math.floor(rnd(`k${j}${i}`) * 10)}`, at, (ch === " " ? 0.4 : 0.55) * (0.85 + rnd(`v${j}${i}`) * 0.15));
    }));
  [0.8, 2.15, 4.65, 5.1, 5.45, 7.25, 7.6, 8.15, 9.1].forEach((st) => { const a = stAbs(st); if (a < end) add("tap", a, 0.5); });
  // 8. Bonne nouvelle : carillon joyeux, puis le tampon du badge
  add("bonne-nouvelle", abs("side", wordAt("side", "bonne", 2.9) - 0.12), 0.55);
  peak("tampon", abs("side", wordAt("side", "maintenance", 4.2)), 0.75);
  // 9. Fin
  peak("whoosh2", scene("end").start + 0.05, 0.4);
  add("notif", abs("end", wordAt("end", "écrivez", 1) - 0.4), 0.4);
  return c.filter((x) => x.at >= 0 && x.at < TOTAL_S);
})();

/** Volume de la musique : bas sous la voix, plus haut dans les respirations, fondu final. */
const VOICED = (() => {
  const iv: [number, number][] = [];
  WORDS.forEach((w) => {
    const last = iv[iv.length - 1];
    if (last && w.s - last[1] < 0.6) last[1] = w.e; else iv.push([w.s, w.e]);
  });
  return iv;
})();
const musicVolume = (t: number) => {
  let duck = 0;
  for (const [a, b] of VOICED) duck = Math.max(duck, interpolate(t, [a - 0.15, a, b, b + 0.35], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const fade = interpolate(t, [0, 0.4, TOTAL_S - 1.8, TOTAL_S], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (0.2 - duck * 0.13) * fade;
};

export const Soundtrack: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Audio src={staticFile("musique.mp3")} volume={(f) => musicVolume(f / fps)} />
      {SCENES.map((s) => (
        <Sequence key={s.id} from={Math.round(s.voAt * fps)} name={`Voix · ${s.id}`}>
          <Audio src={staticFile(`voix/${s.line}.mp3`)} volume={1.15} />
        </Sequence>
      ))}
      {CUES.map((c, i) => (
        <Sequence key={i} from={Math.round(c.at * fps)} durationInFrames={Math.round(7 * fps)} name={`Son · ${c.f}`}>
          <Audio src={staticFile(`sfx/${c.f}.wav`)} volume={c.vol} />
        </Sequence>
      ))}
    </>
  );
};
