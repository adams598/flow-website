import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { BrandBg, clamp, FlowMark, Icon, Rise, useSpring } from "../components/ui";

/**
 * 9. Fin. Logo, « Un projet ? », puis une bulle de message privé qui « écrit » (trois points)
 * avant d'afficher l'appel à l'action. Téléphone et site en dessous.
 */
export const End: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const join = useSpring(0.05, 11, 0.7);
  const te = wordAt("end", "écrivez", 1.0);
  const bub = useSpring(te - 0.45, 12, 0.6);
  const typing = t < te + 0.05;
  return (
    <AbsoluteFill>
      <BrandBg />
      <div style={{ position: "absolute", top: 330, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 26 }}>
        <FlowMark size={130} split={1 - join} />
        <span style={{ font: `800 140px/1 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}><Rise at={0.2} dy={120}>Flow</Rise></span>
      </div>
      <div style={{ position: "absolute", top: 610, width: "100%", textAlign: "center", font: `800 110px/1 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}>
        <Rise at={wordAt("end", "projet", 0.4) - 0.2}>Un projet ?</Rise>
      </div>
      {/* bulle de message privé */}
      <div style={{ position: "absolute", top: 790, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 40px", borderRadius: "46px 46px 46px 12px", background: C.ink, color: C.paper, boxShadow: "0 24px 50px rgba(0,0,0,0.35)", scale: String(bub), opacity: Math.min(1, bub * 2), transformOrigin: "left bottom" }}>
          <span style={{ width: 54, height: 54, color: C.ice }}>{Icon.msg}</span>
          {typing ? (
            <span style={{ display: "flex", gap: 12, padding: "10px 0" }}>
              {[0, 1, 2].map((i) => <i key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: C.ice, opacity: 0.35 + 0.65 * Math.max(0, Math.sin(t * 9 - i * 0.9)) }} />)}
            </span>
          ) : (
            <span style={{ font: `700 50px ${F.body}`, letterSpacing: "-0.02em" }}>Écrivez-nous en message privé</span>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1290, width: "100%", textAlign: "center", color: C.paper, opacity: interpolate(t, [te + 0.2, te + 0.6], [0, 1], clamp) }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, font: `800 76px ${F.title}`, letterSpacing: "-0.03em" }}>
          <span style={{ width: 58, height: 58, color: C.ice }}>{Icon.phone}</span>07 49 17 83 91
        </div>
        <div style={{ marginTop: 14, font: `500 42px ${F.body}` }}>flowsurmesure.com</div>
        <div style={{ marginTop: 26, font: `600 26px ${F.body}`, letterSpacing: "0.22em", textTransform: "uppercase", color: C.ice }}>Accompagnement · Sites · Applications</div>
      </div>
    </AbsoluteFill>
  );
};
