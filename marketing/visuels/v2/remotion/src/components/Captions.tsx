import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { SceneId, WORDS } from "../timing";
import { clamp } from "./ui";

/**
 * Sous-titres dynamiques (vidéo regardée sans le son) : groupes de 2-3 mots, le mot prononcé
 * s'allume, les mots clés en cyan. Masqués sur les scènes où les mots sont déjà à l'image.
 */
const HIDDEN: SceneId[] = ["hook", "daily", "end"];
const KEY = new Set(["activité", "appels", "papiers", "relances", "accompagne", "site", "internet", "trouvent", "réservent", "paient", "booste",
  "application", "dossiers", "planning", "équipe", "projets", "ligne", "simple", "flow", "mesure", "com", "questions", "côtés", "bonne", "nouvelle", "maintenance", "offert"]);

type W = (typeof WORDS)[number];
const GROUPS: W[][] = (() => {
  const out: W[][] = [];
  let cur: W[] = [];
  WORDS.forEach((w, i) => {
    cur.push(w);
    const next = WORDS[i + 1];
    if (cur.length === 3 || !next || next.scene !== w.scene || next.s - w.e > 0.25) { out.push(cur); cur = []; }
  });
  return out;
})();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const g = GROUPS.find((x, i) => t >= x[0].s - 0.05 && t < Math.min(x[x.length - 1].e + 0.35, GROUPS[i + 1]?.[0].s ?? 1e9));
  if (!g || HIDDEN.includes(g[0].scene)) return null;
  const k = interpolate(t, [g[0].s - 0.05, g[0].s + 0.1], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 60, right: 110, top: 1430, textAlign: "center" }}>
      <div style={{ display: "inline-block", padding: "14px 28px 18px", borderRadius: 26, background: "rgba(12,18,19,0.66)", opacity: k, translate: `0 ${(1 - k) * 18}px` }}>
        {g.map((w, i) => {
          const on = t >= w.s;
          return (
            <span key={i} style={{
              display: "inline-block", margin: "0 8px", font: `800 60px/1.08 ${F.title}`, letterSpacing: "-0.035em",
              color: KEY.has(w.w.toLowerCase()) ? C.ice : C.paper, opacity: on ? 1 : 0.42, scale: on && t < w.s + 0.15 ? "1.08" : "1",
            }}>{w.w}</span>
          );
        })}
      </div>
    </div>
  );
};
