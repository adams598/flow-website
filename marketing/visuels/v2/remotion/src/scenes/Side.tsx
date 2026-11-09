import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { Badge, clamp, Confetti, Pill, Rise, useSpring } from "../components/ui";

/**
 * 8. À vos côtés. Vraie poignée de main ; « Bonne nouvelle ! » éclate (confettis, secousse
 * de caméra), puis le badge « 1 mois de maintenance offert » tombe comme un tampon.
 */
export const Side: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tc = wordAt("side", "côtés", 1.6);
  const tn = wordAt("side", "bonne", 2.9) - 0.1;
  const tm = wordAt("side", "maintenance", 4.2) - 0.15;
  const shakeAt = (a: number, amp: number) => (t > a ? Math.sin((t - a) * 60) * Math.exp(-(t - a) * 8) * amp : 0);
  const shake = shakeAt(tn, 16) + shakeAt(tm + 0.15, 22);
  const nk = useSpring(tn, 8, 0.5);
  const dim = interpolate(t, [tn - 0.1, tn + 0.3], [0, 0.45], clamp);
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px` }}>
      <AbsoluteFill style={{ scale: String(1.06 + t * 0.012) }}>
        <OffthreadVideo src={staticFile("clips/poignee.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `rgba(8,24,26,${dim})` }} />
      <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center", font: `800 96px/1 ${F.title}`, letterSpacing: "-0.05em", scale: String(1 - nk * 0.25), translate: `0 ${-nk * 60}px` }}>
        <Rise at={tc - 0.45}><Pill>À vos côtés</Pill></Rise>
      </div>
      {t > tn && (
        <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "16px 46px 26px", borderRadius: 999, background: C.cyan, color: "#fff", font: `800 104px/1 ${F.title}`, letterSpacing: "-0.045em", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", scale: String(nk), rotate: `${-3 + Math.sin((t - tn) * 9) * Math.exp(-(t - tn) * 3) * 5}deg` }}>
            Bonne nouvelle !
          </span>
        </div>
      )}
      <Confetti at={tn + 0.05} origin={[540, 600]} />
      {t > tm && <div style={{ position: "absolute", left: 540 - 200, top: 900 }}><Badge at={tm} size={400} /></div>}
    </AbsoluteFill>
  );
};
