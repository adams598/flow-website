import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { BrandBg, clamp, FlowMark, Icon, Orb, Pill, Rise, useSpring } from "../components/ui";

/**
 * 3. Flow. Les deux moitiés du chevron se rejoignent et claquent, un reflet balaie le logo,
 * puis « On vous accompagne » et les trois temps de l'accompagnement, reliés par un trait
 * qui se dessine.
 */
export const Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const join = useSpring(0.05, 11, 0.7);
  const ta = wordAt("flow", "accompagne", 1.2);
  const tp = wordAt("flow", "pas", 2.0);
  const shine = interpolate(t, [0.45, 1.0], [-120, 220], clamp);
  const draw = interpolate(t, [tp - 0.1, tp + 0.9], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });

  return (
    <AbsoluteFill>
      <BrandBg />
      {/* Logo */}
      <div style={{ position: "absolute", top: 250, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 26 }}>
        <div style={{ position: "relative", scale: String(interpolate(join, [0, 1], [1.6, 1])) }}>
          <FlowMark size={140} split={1 - join} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, transparent ${shine - 30}%, rgba(255,255,255,0.85) ${shine}%, transparent ${shine + 30}%)`, mixBlendMode: "overlay", WebkitMaskImage: "linear-gradient(#000,#000)" }} />
        </div>
        <div style={{ font: `800 150px/1 ${F.title}`, letterSpacing: "-0.05em", color: C.ink, overflow: "hidden" }}>
          {[..."Flow"].map((ch, i) => <Rise key={i} at={0.25 + i * 0.06} dy={160}>{ch}</Rise>)}
        </div>
      </div>
      <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", font: `800 96px/1.05 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}>
        <Rise at={ta - 0.3}>On vous</Rise><br />
        <Rise at={ta}><Pill dark>accompagne,</Pill></Rise>
      </div>
      {/* trait pointillé qui relie les trois temps */}
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        <path d="M190 1080 C 330 960, 420 1180, 540 1080 S 760 960, 890 1080" fill="none" stroke={C.ice} strokeWidth={6} strokeLinecap="round" strokeDasharray="2 18" pathLength={1}
          style={{ strokeDashoffset: 0, clipPath: `inset(0 ${(1 - draw) * 100}% 0 0)` }} />
      </svg>
      <div style={{ position: "absolute", top: 975, width: "100%", display: "flex", justifyContent: "center", gap: 40 }}>
        <Orb at={tp} n="1" icon={Icon.ear} label={<>On vous<br />écoute</>} />
        <Orb at={tp + 0.3} n="2" icon={Icon.hands} label={<>On construit<br />avec vous</>} />
        <Orb at={tp + 0.6} n="3" icon={Icon.shield} label={<>On reste<br />à vos côtés</>} />
      </div>
    </AbsoluteFill>
  );
};
