import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { clamp, Icon, Notif, useSpring } from "../components/ui";

/**
 * 2. Le quotidien. Chaque mot (« appels », « papiers », « relances ») ouvre un nouveau vrai
 * plan par une découpe en biais, avec le mot frappé en grand. Sur « filent », l'image
 * s'emballe : les trois plans rétrécissent en mosaïque et s'envolent.
 */
const PANELS = [
  { word: "appels", src: "clips/appels.mp4", label: "Les appels" },
  { word: "papiers", src: "clips/papiers.mp4", label: "Les papiers" },
  { word: "relances", src: "clips/soir.mp4", label: "Les relances" },
];

export const Daily: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const times = PANELS.map((p, i) => wordAt("daily", p.word, 0.2 + i * 1.1));
  const fly = wordAt("daily", "filent", 3.0);

  // Sur « filent » : chaque plan devient une vignette de la mosaïque, puis tout part en zoom
  const m = interpolate(t, [fly - 0.15, fly + 0.35], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const out = interpolate(t, [fly + 0.5, fly + 0.95], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: C.night, scale: String(1 + out * 2.2), opacity: 1 - out * 0.6, filter: `blur(${out * 14}px)` }}>
      {PANELS.map((p, i) => {
        const a = times[i];
        const reveal = interpolate(t, [a - 0.05, a + 0.28], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        // découpe en biais qui balaie l'écran
        const x = interpolate(reveal, [0, 1], [-60, 160]);
        const clip = `polygon(0 0, ${x}% 0, ${x - 30}% 100%, 0 100%)`;
        // position finale dans la mosaïque (3 bandes verticales)
        const tile = {
          left: interpolate(m, [0, 1], [0, i * 360]), top: interpolate(m, [0, 1], [0, 640]),
          width: interpolate(m, [0, 1], [1080, 360]), height: interpolate(m, [0, 1], [1920, 640]),
        };
        if (t < a - 0.05) return null;
        return (
          <div key={i} style={{ position: "absolute", ...tile, overflow: "hidden", clipPath: m > 0 ? "none" : clip, borderRadius: m * 24, outline: m > 0 ? "6px solid #141816" : "none" }}>
            <OffthreadVideo src={staticFile(p.src)} muted style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(1.08 - Math.min(1, (t - a) / 2.5) * 0.06) }} />
          </div>
        );
      })}
      {/* mot frappé, avec tremblement d'impact */}
      {PANELS.map((p, i) => <Stamp key={i} at={times[i]} until={i < 2 ? times[i + 1] : fly - 0.1} label={p.label} />)}
      <Relances at={times[2]} until={fly} />
    </AbsoluteFill>
  );
};

const Stamp: React.FC<{ at: number; until: number; label: string }> = ({ at, until, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const k = useSpring(at, 9, 0.45);
  if (t < at || t > until + 0.1) return null;
  const shake = Math.sin((t - at) * 70) * Math.exp(-(t - at) * 9) * 14;
  return (
    <div style={{ position: "absolute", top: 1180, width: "100%", textAlign: "center", translate: `${shake}px 0`, opacity: interpolate(t, [until - 0.05, until + 0.1], [1, 0], clamp) }}>
      <span style={{ display: "inline-block", padding: "14px 40px 22px", borderRadius: 999, background: C.ink, color: C.paper, font: `800 110px/1 ${F.title}`, letterSpacing: "-0.05em", rotate: "-3deg", scale: String(interpolate(k, [0, 1], [2.2, 1])), opacity: Math.min(1, k * 3), boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}>{label}</span>
    </div>
  );
};

/** Sur « relances », de vraies relances s'empilent. */
const Relances: React.FC<{ at: number; until: number }> = ({ at, until }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const a = useSpring(at + 0.15, 12, 0.6), b = useSpring(at + 0.5, 12, 0.6);
  if (t < at || t > until + 0.1) return null;
  return (
    <>
      <div style={{ position: "absolute", left: 130, top: 470, scale: String(a), opacity: a }}><Notif app="Mail" text="Relance : devis n° 42 en attente" color="#5e9bff" icon={Icon.mail} /></div>
      <div style={{ position: "absolute", left: 130, top: 640, scale: String(b), opacity: b }}><Notif app="Mail" text="Facture n° 118 : 2ᵉ rappel" color="#ff9f0a" icon={Icon.mail} /></div>
    </>
  );
};
