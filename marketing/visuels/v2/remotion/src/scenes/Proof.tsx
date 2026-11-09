import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { BrandBg, clamp, Pill, Rise } from "../components/ui";

/**
 * 6. Réalisations. Carrousel 3D : les trois projets en production tournent sur un cercle,
 * celui de face est net et nommé, les autres reculent dans la profondeur.
 */
const STEP = 55;   // écart angulaire entre deux projets du carrousel
const P = [
  { name: "Drivin & Chill", desc: "Réservation et paiement en ligne", url: "Drivin & Chill · réservation", img: "img/drivinchill.png" },
  { name: "Objectif TCF", desc: "Plateforme d’apprentissage avec abonnement", url: "objectif-tcf.org", img: "img/objectif-tcf.png" },
  { name: "BAI Consulting & Formation", desc: "Site, espace apprenants et administration", url: "bai-consultingetformation.com", img: "img/bai-project-2.png" },
];

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const D = durationInFrames / fps;
  const per = (D - 0.6) / 3;
  // rotation par crans : chaque projet reste de face, puis le carrousel tourne d'un tiers
  let rot = 0;
  for (let i = 1; i < 3; i++) rot += interpolate(t, [0.3 + i * per - 0.35, 0.3 + i * per + 0.15], [0, STEP], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const enter = interpolate(t, [0, 0.6], [-70, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const front = Math.min(2, Math.max(0, Math.round(rot / STEP)));
  return (
    <AbsoluteFill>
      <BrandBg />
      <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center" }}>
        <div style={{ font: `600 28px ${F.body}`, letterSpacing: "0.22em", textTransform: "uppercase", color: "#005f66" }}><Rise at={0.05}>Réalisations en ligne</Rise></div>
        <div style={{ marginTop: 14, font: `800 84px/1.02 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}>
          <Rise at={0.15}>De vrais projets,</Rise><br /><Rise at={0.32}><Pill dark>déjà en ligne.</Pill></Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, height: 640, perspective: 2200 }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `translateZ(-520px) rotateY(${enter - rot}deg)` }}>
          {P.map((p, i) => {
            const a = i * STEP;
            const facing = Math.cos(((a - rot + enter) * Math.PI) / 180);
            return (
              <div key={i} style={{
                position: "absolute", left: 200, top: 80, width: 680, borderRadius: 24, overflow: "hidden", background: "#fff",
                transform: `rotateY(${a}deg) translateZ(520px)`, backfaceVisibility: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.45)", filter: `brightness(${0.55 + 0.45 * Math.max(0, facing)})`,
              }}>
                <div style={{ height: 50, background: "#ececef", display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>
                  {[0, 1, 2].map((d) => <i key={d} style={{ width: 14, height: 14, borderRadius: "50%", background: "#c9c9ce" }} />)}
                  <span style={{ marginLeft: 14, padding: "6px 18px", borderRadius: 10, background: "#fff", font: `500 22px ${F.body}`, color: "#48484a" }}>{p.url}</span>
                </div>
                <Img src={staticFile(p.img)} style={{ display: "block", width: "100%" }} />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1290, width: "100%", textAlign: "center", color: C.paper }}>
        <div key={front} style={{ font: `800 58px ${F.title}`, letterSpacing: "-0.03em" }}>{P[front].name}</div>
        <div style={{ marginTop: 6, font: `500 36px ${F.body}`, opacity: 0.85 }}>{P[front].desc}</div>
      </div>
    </AbsoluteFill>
  );
};
