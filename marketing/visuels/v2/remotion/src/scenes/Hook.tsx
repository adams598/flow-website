import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { clamp, Icon, Letters, Notif, Rise, useSpring } from "../components/ui";

/**
 * 1. Accroche. Un vrai téléphone vibre de notifications qui JAILLISSENT de l'écran vers la
 * caméra ; puis coupe sur la commerçante, avec « activité ? » géant posé DERRIÈRE elle
 * (clip complet / mot / détourage).
 */
const NOTIFS = [
  { at: 0.12, app: "Téléphone", text: "Appel manqué · Client (3)", color: "#34c759", icon: Icon.phone, x: -40, y: 620, r: -6 },
  { at: 0.38, app: "Messages", text: "Vous êtes ouverts samedi ?", color: "#30a2ff", icon: Icon.msg, x: 60, y: 820, r: 4 },
  { at: 0.62, app: "Mail", text: "Relance : devis n° 42 en attente", color: "#5e9bff", icon: Icon.mail, x: -20, y: 1020, r: -3 },
  { at: 0.82, app: "Mail", text: "Facture n° 118 : 2ᵉ rappel", color: "#ff9f0a", icon: Icon.mail, x: 40, y: 1220, r: 5 },
];

const FlyingNotif: React.FC<(typeof NOTIFS)[number]> = ({ at, x, y, r, ...n }) => {
  const k = useSpring(at, 13, 0.7);
  // part du centre de l'écran du téléphone (petit, lointain) et vient vers la caméra
  return (
    <div style={{
      position: "absolute", left: 130, top: 0,
      translate: `${interpolate(k, [0, 1], [0, x])}px ${interpolate(k, [0, 1], [930, y])}px`,
      scale: String(interpolate(k, [0, 1], [0.25, 1])), rotate: `${r * k}deg`,
      opacity: interpolate(k, [0, 0.15], [0, 1], clamp), filter: `blur(${(1 - k) * 6}px)`,
    }}>
      <Notif {...n} />
    </div>
  );
};

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cut = wordAt("hook", "activ", 1.6) - 0.08;
  const cutF = Math.round(cut * fps);
  const vous = wordAt("hook", "vous", 0.9);

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* A — le téléphone qui déborde */}
      <Sequence durationInFrames={cutF} name="Téléphone">
        <AbsoluteFill style={{ scale: String(interpolate(t, [0, cut], [1.02, 1.2], { ...clamp, easing: Easing.in(Easing.quad) })) }}>
          <OffthreadVideo src={staticFile("clips/notifs.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 55%, transparent 40%, rgba(0,0,0,0.55))" }} />
        {NOTIFS.map((n, i) => <FlyingNotif key={i} {...n} />)}
        <div style={{ position: "absolute", top: 210, width: "100%", textAlign: "center", font: `800 104px/1 ${F.title}`, color: C.paper, letterSpacing: "-0.05em", textShadow: "0 8px 30px rgba(0,0,0,0.5)" }}>
          <Rise at={vous}>Vous</Rise> <Rise at={vous + 0.12}>avez</Rise> <Rise at={vous + 0.24}>une…</Rise>
        </div>
      </Sequence>

      {/* B — la commerçante, « activité ? » glissé derrière elle */}
      <Sequence from={cutF} name="Commerçante">
        <Commercante />
      </Sequence>

      {/* Flash de coupe */}
      <AbsoluteFill style={{ background: C.paper, pointerEvents: "none", opacity: interpolate(t, [cut - 0.02, cut + 0.02, cut + 0.18], [0, 0.85, 0], clamp) }} />
    </AbsoluteFill>
  );
};

const Commercante: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const push = { scale: String(interpolate(t, [0, 2.5], [1.14, 1.04], { ...clamp, easing: Easing.out(Easing.cubic) })) };
  return (
    <AbsoluteFill>
      <AbsoluteFill style={push}>
        <OffthreadVideo src={staticFile("clips/commercante.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      {/* le mot, entre le décor et la personne */}
      <div style={{ position: "absolute", top: 250, width: "100%", textAlign: "center", font: `800 236px/1 ${F.title}`, letterSpacing: "-0.06em", color: C.paper, textShadow: "0 10px 40px rgba(0,0,0,0.25)" }}>
        <Letters text="activité ?" at={0} step={0.03} />
      </div>
      <AbsoluteFill style={push}>
        <OffthreadVideo src={staticFile("clips/commercante-detour.webm")} transparent muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1430, width: "100%", textAlign: "center", font: `700 54px ${F.body}`, color: C.paper, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <Rise at={0.35}>qui vous tient à cœur</Rise> <Rise at={0.6}>❤</Rise>
      </div>
    </AbsoluteFill>
  );
};
