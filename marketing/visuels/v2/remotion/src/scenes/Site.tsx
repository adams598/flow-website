import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { BrandBg, clamp, Icon, Pill, Rise, useSpring } from "../components/ui";

/**
 * 4. Site internet. La tablette 3D arrive ; sur chaque verbe, une carte SORT de l'écran en
 * perspective : la recherche Google qui se tape, le créneau réservé, le paiement validé.
 * Puis « Vous avez déjà un site ? On le booste ! » : avant / après balayé, flèche qui monte.
 */
export const SEARCH = "fleuriste Limoges";

export const Site: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tt = wordAt("site", "trouvent", 2.2), tr = wordAt("site", "réservent", 2.9), tp = wordAt("site", "paient", 3.5);
  const td = wordAt("site", "déjà", 5.0) - 0.4, tb = wordAt("site", "booste", 6.4);
  const out = interpolate(t, [td, td + 0.45], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill>
      <BrandBg />
      <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center" }}>
        <div style={{ font: `600 28px ${F.body}`, letterSpacing: "0.22em", textTransform: "uppercase", color: "#005f66" }}><Rise at={0.05}>Sites internet</Rise></div>
        <div style={{ marginTop: 14, font: `800 84px/1.02 ${F.title}`, letterSpacing: "-0.05em", color: C.ink }}>
          <Rise at={0.15}>Un site qui vous</Rise><br /><Rise at={0.32}>amène des</Rise> <Rise at={0.45}><Pill dark>clients.</Pill></Rise>
        </div>
      </div>

      {/* Tablette + cartes : partent ensemble vers la gauche quand arrive l'avant / après */}
      <AbsoluteFill style={{ translate: `${-out * 1200}px 0`, rotate: `${-out * 8}deg` }}>
        <AbsoluteFill style={{ translate: "0 80px", scale: "0.86" }}>
          <OffthreadVideo src={staticFile("devices/site.webm")} transparent muted />
        </AbsoluteFill>
        <div style={{ position: "absolute", inset: 0, perspective: 1600 }}>
          <PopCard at={tt} from={[540, 1000]} to={[40, 980]} rot={-14}><SearchCard at={tt} /></PopCard>
          <PopCard at={tr} from={[540, 1000]} to={[620, 1130]} rot={12}><SlotCard /></PopCard>
          <PopCard at={tp} from={[540, 1000]} to={[70, 1250]} rot={-10}><PaidCard at={tp} /></PopCard>
        </div>
      </AbsoluteFill>

      <BeforeAfter at={td} boost={tb} />
    </AbsoluteFill>
  );
};

/** Carte qui jaillit de l'écran : petite et lointaine au départ, puis vient vers la caméra. */
const PopCard: React.FC<{ at: number; from: [number, number]; to: [number, number]; rot: number; children: React.ReactNode }> = ({ at, from, to, rot, children }) => {
  const k = useSpring(at, 12, 0.7);
  if (k <= 0.001) return null;
  return (
    <div style={{
      position: "absolute", left: 0, top: 0,
      translate: `${interpolate(k, [0, 1], [from[0], to[0]])}px ${interpolate(k, [0, 1], [from[1], to[1]])}px`,
      scale: String(interpolate(k, [0, 1], [0.2, 1])), rotate: `0 1 0 ${rot * (1 - k) * 4 + rot * 0.4}deg`,
      opacity: Math.min(1, k * 2.5), filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.4))`,
    }}>{children}</div>
  );
};

const card: React.CSSProperties = { background: "#fff", borderRadius: 30, padding: "24px 28px", color: C.ink, fontFamily: F.body };

const SearchCard: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const n = Math.round(interpolate(t, [at + 0.1, at + 0.65], [0, SEARCH.length], clamp));
  const res = useSpring(at + 0.75, 14, 0.6);
  return (
    <div style={{ ...card, width: 520 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 999, border: "2px solid #e5e5ea", font: `500 30px ${F.body}` }}>
        <span style={{ width: 30, height: 30, color: "#8e8e93" }}>{Icon.search}</span>
        {SEARCH.slice(0, n)}<span style={{ width: 3, height: 34, background: C.cyan, opacity: n < SEARCH.length ? 1 : 0 }} />
      </div>
      <div style={{ marginTop: 18, opacity: res, translate: `0 ${(1 - res) * 20}px` }}>
        <div style={{ font: `600 22px ${F.body}`, color: "#1a7f37" }}>www.votre-entreprise.fr</div>
        <div style={{ font: `800 34px ${F.title}`, letterSpacing: "-0.03em", color: "#1a3fb8" }}>Votre entreprise · Fleuriste</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, color: "#f5a623" }}>
          {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ width: 28, height: 28 }}>{Icon.star}</span>)}
          <span style={{ marginLeft: 8, font: `600 26px ${F.body}`, color: C.grey }}>4,9 · Ouvert</span>
        </div>
      </div>
    </div>
  );
};

const SlotCard: React.FC = () => (
  <div style={{ ...card, width: 420 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, font: `700 28px ${F.body}` }}><span style={{ width: 34, height: 34, color: C.cyan }}>{Icon.cal}</span>Mardi 14 octobre</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
      {["14:00", "16:30", "18:00"].map((h) => (
        <span key={h} style={{ textAlign: "center", padding: "14px 0", borderRadius: 16, font: `800 28px ${F.title}`, background: h === "16:30" ? C.cyan : "#f2f2f4", color: h === "16:30" ? "#fff" : C.ink }}>{h}</span>
      ))}
    </div>
    <div style={{ marginTop: 14, font: `700 26px ${F.body}`, color: "#005f66" }}>✓ Réservé</div>
  </div>
);

const PaidCard: React.FC<{ at: number }> = ({ at }) => {
  const ok = useSpring(at + 0.35, 8, 0.5);
  return (
    <div style={{ ...card, width: 430, display: "flex", alignItems: "center", gap: 20 }}>
      <span style={{ flex: "none", width: 84, height: 84, borderRadius: "50%", background: C.ice, color: C.ink, display: "grid", placeItems: "center", scale: String(ok) }}>
        <span style={{ width: 46, height: 46 }}>{Icon.check}</span>
      </span>
      <div>
        <div style={{ font: `600 24px ${F.body}`, color: C.grey }}>Paiement reçu</div>
        <div style={{ font: `800 50px/1 ${F.title}`, letterSpacing: "-0.04em" }}>45,00 €</div>
      </div>
    </div>
  );
};

/** Avant / après : l'ancien site est balayé par le nouveau, puis la courbe des visites monte. */
const BeforeAfter: React.FC<{ at: number; boost: number }> = ({ at, boost }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const k = useSpring(at + 0.15, 13, 0.7);
  const wipe = interpolate(t, [at + 0.7, at + 1.4], [0, 100], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const up = interpolate(t, [boost - 0.1, boost + 0.8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (t < at) return null;
  return (
    <div style={{ position: "absolute", left: 90, top: 560, width: 900, translate: `${(1 - k) * 1200}px 0`, rotate: `${(1 - k) * 8}deg` }}>
      <div style={{ position: "relative", height: 560, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, background: "#e9e4d8", padding: 30, fontFamily: "Times New Roman, serif", color: "#222" }}>
          <div style={{ fontSize: 44, color: "#20307a", textDecoration: "underline" }}>Bienvenue sur notre site !!!</div>
          <div style={{ marginTop: 16, fontSize: 26, lineHeight: 1.3 }}>Mis à jour le 12/03/2014. Pour nous joindre, merci d'envoyer un fax aux heures d'ouverture.</div>
          <div style={{ display: "flex", gap: 18, marginTop: 24 }}>{[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, height: 180, background: "#c7c0ae", border: "2px solid #9a927f" }} />)}</div>
        </div>
        <Img src={staticFile("img/ui-site.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: `inset(0 ${100 - wipe}% 0 0)` }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${wipe}%`, width: 8, marginLeft: -4, background: C.ice, boxShadow: `0 0 30px ${C.ice}`, opacity: wipe > 0 && wipe < 100 ? 1 : 0 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, font: `700 34px ${F.body}` }}>
        <span style={{ color: C.ink, opacity: 1 - wipe / 100 }}>Avant</span>
        <span style={{ color: "#005f66", opacity: wipe / 100 }}>Après</span>
      </div>
      {/* courbe des visites */}
      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 24, opacity: up, translate: `0 ${(1 - up) * 40}px` }}>
        <svg width="300" height="150" viewBox="0 0 300 150">
          <path d="M10 140 C 80 130, 120 110, 160 90 S 240 30, 290 12" fill="none" stroke={C.ice} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - up} />
        </svg>
        <div style={{ font: `800 58px/1.05 ${F.title}`, color: C.paper, letterSpacing: "-0.04em" }}>Plus visible<br />sur Google</div>
      </div>
    </div>
  );
};
