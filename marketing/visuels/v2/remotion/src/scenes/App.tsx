import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { BrandBg, clamp, Icon, Pill, Rise, useSpring } from "../components/ui";

/**
 * 5. Application. Thème calcaire / encre. Le téléphone 3D tourne ; des compteurs en direct
 * sortent de part et d'autre, puis les pastilles Dossiers / Planning / Équipe sur la voix.
 */
export const App: React.FC = () => {
  const tw = wordAt("app", "travailler", 3.2);
  const chips: [string, React.ReactNode, string][] = [["dossiers", Icon.folder, "Dossiers"], ["planning", Icon.cal, "Planning"], ["équipe", Icon.team, "Équipe"]];
  return (
    <AbsoluteFill>
      <BrandBg theme="app" />
      <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center" }}>
        <div style={{ font: `600 28px ${F.body}`, letterSpacing: "0.22em", textTransform: "uppercase", color: C.cyan }}><Rise at={0.05}>Applications sur mesure</Rise></div>
        <div style={{ marginTop: 14, font: `800 84px/1.02 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}>
          <Rise at={0.15}>Besoin d’une</Rise><br /><Rise at={0.35}><Pill dark>application ?</Pill></Rise>
        </div>
      </div>
      <AbsoluteFill style={{ translate: "0 150px", scale: "0.62" }}>
        <OffthreadVideo src={staticFile("devices/app.webm")} transparent muted />
      </AbsoluteFill>
      <Counter at={tw - 0.2} x={40} y={760} value={24} label="dossiers en cours" />
      <Counter at={tw + 0.1} x={700} y={900} value={6} label="RDV aujourd’hui" />
      <Counter at={tw + 0.4} x={60} y={1080} value={18} label="payés ce mois" accent />
      <div style={{ position: "absolute", top: 1560, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 18 }}>
        {chips.map(([w, ic, lb], i) => <Chip key={w} at={wordAt("app", w, 4.6 + i * 0.5)} icon={ic} label={lb} />)}
      </div>
    </AbsoluteFill>
  );
};

const Counter: React.FC<{ at: number; x: number; y: number; value: number; label: string; accent?: boolean }> = ({ at, x, y, value, label, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = useSpring(at, 11, 0.6);
  const n = Math.round(interpolate(frame / fps, [at, at + 0.9], [0, value], clamp));
  if (k <= 0.001) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, padding: "22px 30px", borderRadius: 30, background: accent ? C.cyan : C.ink, color: "#fff", scale: String(k), opacity: Math.min(1, k * 2), boxShadow: "0 24px 50px rgba(0,0,0,0.4)", rotate: `${(1 - k) * -10}deg` }}>
      <div style={{ font: `800 86px/1 ${F.title}`, letterSpacing: "-0.05em" }}>{n}</div>
      <div style={{ font: `600 28px ${F.body}`, opacity: 0.85 }}>{label}</div>
    </div>
  );
};

const Chip: React.FC<{ at: number; icon: React.ReactNode; label: string }> = ({ at, icon, label }) => {
  const k = useSpring(at, 9, 0.5);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "20px 32px", borderRadius: 999, background: C.ink, color: C.paper, font: `600 38px ${F.body}`, boxShadow: "0 16px 30px rgba(0,0,0,0.3)", scale: String(k), opacity: Math.min(1, k * 3) }}>
      <span style={{ width: 38, height: 38, color: C.ice }}>{icon}</span>{label}
    </div>
  );
};
