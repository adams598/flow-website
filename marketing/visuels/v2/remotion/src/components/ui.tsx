import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";

/** Ressort démarrant à `delay` secondes (0 → 1, avec un léger dépassement). */
export const useSpring = (delay: number, damping = 12, mass = 0.6) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - Math.round(delay * fps), fps, config: { damping, mass, stiffness: 140 } });
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------------------------------------------------------- Logo Flow */
export const FlowMark: React.FC<{ size: number; split?: number }> = ({ size, split = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
    <defs>
      <linearGradient id="fl" x1="48" y1="18" x2="112" y2="240" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C9FDFF" /><stop offset="0.42" stopColor="#2EEAF8" /><stop offset="1" stopColor="#00A8B2" />
      </linearGradient>
      <linearGradient id="fr" x1="150" y1="12" x2="224" y2="248" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7DF4FF" /><stop offset="0.48" stopColor="#00C4D4" /><stop offset="1" stopColor="#006970" />
      </linearGradient>
    </defs>
    {/* `split` écarte les deux moitiés du chevron (0 = assemblé). */}
    <path d="M128 16 24 236h54L128 92Z" fill="url(#fl)" transform={`translate(${-split * 120} ${split * 40})`} />
    <path d="M128 16 232 236h-54L128 92Z" fill="url(#fr)" transform={`translate(${split * 120} ${split * 40})`} />
  </svg>
);

/* ---------------------------------------------------------------- Pastille de titre */
export const Pill: React.FC<{ children: React.ReactNode; dark?: boolean; color?: string; style?: React.CSSProperties }> = ({ children, dark, color, style }) => (
  <span style={{
    display: "inline-block", padding: "0.04em 0.32em 0.14em", borderRadius: 999, rotate: "-2deg",
    background: color ?? (dark ? C.ink : C.paper), color: dark || color ? "#fff" : C.ink, ...style,
  }}>{children}</span>
);

/* ---------------------------------------------------------------- Mots qui montent un à un */
export const Rise: React.FC<{ at: number; children: React.ReactNode; dy?: number; style?: React.CSSProperties }> = ({ at, children, dy = 60, style }) => {
  const k = useSpring(at, 14, 0.7);
  return (
    <span style={{ display: "inline-block", opacity: Math.min(1, k * 1.4), translate: `0 ${(1 - k) * dy}px`, filter: `blur(${Math.max(0, (1 - k) * 10)}px)`, ...style }}>
      {children}
    </span>
  );
};

/** Lettres qui tombent et rebondissent (mot géant). */
export const Letters: React.FC<{ text: string; at: number; step?: number; style?: React.CSSProperties }> = ({ text, at, step = 0.035, style }) => (
  <span style={{ whiteSpace: "nowrap", ...style }}>
    {[...text].map((ch, i) => <Letter key={i} ch={ch} at={at + i * step} />)}
  </span>
);
const Letter: React.FC<{ ch: string; at: number }> = ({ ch, at }) => {
  const k = useSpring(at, 9, 0.5);
  return (
    <span style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, k * 2), translate: `0 ${(1 - k) * -140}px`, scale: String(0.6 + 0.4 * k) }}>{ch}</span>
  );
};

/* ---------------------------------------------------------------- Rond (étape / bénéfice) */
export const Orb: React.FC<{ at: number; n?: string; icon: React.ReactNode; label: React.ReactNode; size?: number }> = ({ at, n, icon, label, size = 210 }) => {
  const k = useSpring(at, 10, 0.55);
  return (
    <div style={{
      position: "relative", width: size, height: size, borderRadius: "50%", background: C.ink, color: C.paper,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
      boxShadow: "0 24px 44px rgba(0,0,0,0.35)", scale: String(k), opacity: Math.min(1, k * 3),
    }}>
      {n && <b style={{ position: "absolute", top: -6, left: -6, width: 58, height: 58, borderRadius: "50%", background: C.ice, color: C.ink, display: "grid", placeItems: "center", font: `800 28px ${F.title}` }}>{n}</b>}
      <div style={{ width: size * 0.22, height: size * 0.22, color: C.ice }}>{icon}</div>
      <span style={{ font: `600 ${size * 0.125}px/1.12 ${F.body}`, textAlign: "center" }}>{label}</span>
    </div>
  );
};

/* ---------------------------------------------------------------- Badge « 1 mois offert » */
export const Badge: React.FC<{ at: number; size?: number }> = ({ at, size = 380 }) => {
  const k = useSpring(at, 8, 0.6);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: C.ice, color: C.ink, position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
      boxShadow: "0 30px 60px rgba(0,0,0,0.4)", scale: String(interpolate(k, [0, 1], [2.4, 1])), opacity: Math.min(1, k * 4),
      rotate: `${8 - (1 - k) * 30}deg`,
    }}>
      <div style={{ position: "absolute", inset: size * 0.045, borderRadius: "50%", border: "3px dashed rgba(19,19,19,0.45)" }} />
      <strong style={{ font: `800 ${size * 0.24}px/1 ${F.title}`, letterSpacing: "-0.05em" }}>1 mois</strong>
      <span style={{ marginTop: 8, font: `600 ${size * 0.09}px/1.2 ${F.body}` }}>de maintenance<br />offert</span>
    </div>
  );
};

/* ---------------------------------------------------------------- Notification de téléphone */
export const Notif: React.FC<{ app: string; text: string; color: string; icon: React.ReactNode; style?: React.CSSProperties }> = ({ app, text, color, icon, style }) => (
  <div style={{ display: "flex", gap: 18, alignItems: "center", padding: "22px 24px", borderRadius: 30, background: "rgba(245,245,247,0.94)", color: "#1c1c1e", boxShadow: "0 22px 50px rgba(0,0,0,0.4)", width: 820, ...style }}>
    <i style={{ flex: "none", width: 72, height: 72, borderRadius: 18, background: color, display: "grid", placeItems: "center", color: "#fff" }}>
      <span style={{ width: 40, height: 40 }}>{icon}</span>
    </i>
    <div style={{ minWidth: 0 }}>
      <div style={{ font: `600 26px ${F.body}`, color: "#3a3a3c" }}>{app} <span style={{ fontWeight: 400, color: "#8e8e93" }}>· maintenant</span></div>
      <div style={{ marginTop: 4, font: `500 32px ${F.body}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{text}</div>
    </div>
  </div>
);

/* ---------------------------------------------------------------- Confettis (déterministes) */
export const Confetti: React.FC<{ at: number; count?: number; origin?: [number, number] }> = ({ at, count = 70, origin = [540, 620] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - at;
  if (t < 0 || t > 2.6) return null;
  const colors = [C.ice, C.cyan, C.paper, "#FFD166", C.terre];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const a = random(`a${i}`) * Math.PI * 2, v = 700 + random(`v${i}`) * 1100;
        const x = origin[0] + Math.cos(a) * v * t, y = origin[1] + Math.sin(a) * v * t * 0.8 + 1500 * t * t;
        const w = 10 + random(`w${i}`) * 16;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: w * (0.4 + random(`h${i}`)), background: colors[i % colors.length], borderRadius: i % 3 === 0 ? "50%" : 3, rotate: `${t * 720 * (random(`r${i}`) - 0.5)}deg`, opacity: interpolate(t, [0, 1.8, 2.6], [1, 1, 0], clamp) }} />;
      })}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- Fond de marque (formes organiques) */
export const BrandBg: React.FC<{ theme?: "site" | "app"; shift?: number }> = ({ theme = "site", shift = 0 }) => {
  const frame = useCurrentFrame();
  const dr = Math.sin(frame / 30 * 0.35) * 14;
  const app = theme === "app";
  return (
    <AbsoluteFill style={{ background: `radial-gradient(900px 700px at 80% 10%, rgba(125,244,255,0.20), transparent 60%), radial-gradient(800px 700px at 10% 95%, rgba(0,40,46,0.6), transparent 60%), linear-gradient(165deg, #1a6a72 0%, #124248 42%, #141816 100%)` }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="gc" x1="300" y1="1200" x2="1000" y2="1900" gradientUnits="userSpaceOnUse">
            <stop stopColor={app ? "#2E393E" : "#00C4D0"} /><stop offset="0.25" stopColor={app ? "#171C1F" : "#007C88"} /><stop offset="1" stopColor={app ? "#0A0C0D" : "#003E46"} />
          </linearGradient>
          <linearGradient id="gp" x1="80" y1="300" x2="900" y2="1300" gradientUnits="userSpaceOnUse">
            <stop stopColor={app ? "#FBF7F1" : "#FFFFFF"} /><stop offset="0.7" stopColor={app ? "#F3EBE1" : "#FFFCFA"} /><stop offset="1" stopColor={app ? "#E6D8C5" : "#F3EBE1"} />
          </linearGradient>
          <filter id="lift" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="26" stdDeviation="20" floodColor="#041416" floodOpacity="0.3" /></filter>
        </defs>
        <path filter="url(#lift)" fill="url(#gc)" transform={`translate(${-dr * 0.8} ${dr + shift})`} d="M300 1180 C 560 1040, 900 1080, 1150 1260 C 1330 1400, 1160 1800, 820 1830 C 470 1860, 160 1720, 190 1480 C 210 1330, 180 1250, 300 1180 Z" />
        <path filter="url(#lift)" fill="url(#gp)" transform={`translate(${dr} ${-150 - dr * 0.6 - shift})`} d="M80 560 C 70 380, 250 300, 470 340 C 740 390, 980 320, 1040 520 C 1100 700, 1000 860, 960 1000 C 900 1150, 680 1190, 420 1140 C 150 1090, 20 960, 50 760 C 66 660, 86 620, 80 560 Z" />
      </svg>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- Grain de film */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{
      pointerEvents: "none", opacity: 0.08, mixBlendMode: "overlay",
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
      backgroundPosition: `${(frame * 37) % 180}px ${(frame * 53) % 180}px`,
    }} />
  );
};

/* ---------------------------------------------------------------- Icônes */
const sv = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
export const Icon = {
  search: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>,
  cal: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3.5v3M16 3.5v3M4 10h16" /></svg>,
  card: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>,
  folder: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /></svg>,
  team: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.3c2 .3 3.6 1.9 4 4.2" /></svg>,
  ear: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><path d="M5 12a7 7 0 0 1 14 0v3a3 3 0 0 1-3 3h-1v-6h4M5 12v3a3 3 0 0 0 3 3h1v-6H5" /></svg>,
  hands: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><path d="M8 12.5 11 9.5a2 2 0 0 1 2.8 0l3.7 3.7" /><path d="M3 11l4-4 3 1.5M21 11l-4-4-3 1.5" /><path d="M7 13l3 3a1.5 1.5 0 0 0 2.1 0l.4-.4M12.5 15.6l.5.5a1.5 1.5 0 0 0 2.1 0l.4-.4a1.5 1.5 0 0 0 0-2.1" /></svg>,
  shield: <svg viewBox="0 0 24 24" {...sv} width="100%" height="100%"><path d="M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M5 12.5 10 17.5 19 7" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M7.1 3.8c.3-.3.8-.4 1.2-.2l2.2 1c.4.2.6.6.6 1.1l-.2 2.1c0 .3-.2.6-.4.8l-1.2 1.2c1.5 2.4 3.4 4.3 5.8 5.8l1.2-1.2c.2-.2.5-.4.8-.4l2.1-.2c.5 0 .9.2 1.1.6l1 2.2c.2.4.1.9-.2 1.2l-1.3 1.3c-.4.4-1 .6-1.6.5C10.8 19.8 4.2 13.2 3.4 5.7c-.1-.6.1-1.2.5-1.6L7.1 3.8Z" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" width="100%" height="100%"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>,
  msg: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 4c-4.9 0-9 3.1-9 7 0 2.1 1.2 4 3.1 5.3L5 20l4.2-2.2c.9.2 1.8.3 2.8.3 4.9 0 9-3.1 9-7s-4.1-7-9-7Z" /></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" /></svg>,
};
