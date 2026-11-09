import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import coins from "../data/tablette-coins.json";
import { C, F } from "../theme";
import { wordAt } from "../timing";
import { BrandBg, clamp } from "../components/ui";

/**
 * 7. Tutoriel. Vrai plan d'une femme sur sa tablette (écran Flow incrusté, coins mesurés
 * image par image), puis la caméra PLONGE dans l'écran : l'écran du plan réel se déforme en
 * vraie perspective jusqu'à coïncider avec la tablette 3D de face, qui prend le relais.
 */
export const CLIP = 2.0;          // durée du plan réel avant la plongée
export const SEQOFF = 0.5;        // instant de l'écran du tutoriel à la 1re image de devices/tuto.webm
const CORNERS = coins as number[][][];
// Écran de la tablette 3D de face, plein cadre (mesuré sur la 1re image de devices/tuto.webm).
const TARGET = [[-135.44, -11.97], [1215.44, -11.97], [1215.44, 1931.97], [-135.44, 1931.97]];

/** Homographie (4 points -> 4 points), exprimée en CSS matrix3d. */
function homography(src: number[][], dst: number[][]) {
  const A: number[][] = [], b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i], [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
    for (let r = c + 1; r < 8; r++) { const f = A[r][c] / A[c][c]; for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; }
  }
  const h = new Array(8).fill(0);
  for (let r = 7; r >= 0; r--) { let s = b[r]; for (let k = r + 1; k < 8; k++) s -= A[r][k] * h[k]; h[r] = s / A[r][r]; }
  return `matrix3d(${h[0]},${h[3]},0,${h[6]},${h[1]},${h[4]},0,${h[7]},0,0,1,0,${h[2]},${h[5]},0,1)`;
}

export const Tuto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const z = interpolate(t, [CLIP * 0.3, CLIP], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const q = CORNERS[Math.min(CORNERS.length - 1, Math.floor(t * 25))];
  const dst = q.map((p, k) => [p[0] + (TARGET[k][0] - p[0]) * z, p[1] + (TARGET[k][1] - p[1]) * z]);
  const H0 = 0.78;
  // pendant le relais, la tablette 3D épouse l'écran du plan réel (centre, angle, taille)
  const top = [dst[1][0] - dst[0][0], dst[1][1] - dst[0][1]];
  const sc = Math.hypot(top[0], top[1]) / (TARGET[1][0] - TARGET[0][0]);
  const ang = (Math.atan2(top[1], top[0]) * 180) / Math.PI;
  const cx = dst.reduce((m, p) => m + p[0], 0) / 4, cy = dst.reduce((m, p) => m + p[1], 0) / 4;
  const devIn = interpolate(z, [H0, 0.97], [0, 1], clamp);
  const steps: [string, string, React.ReactNode][] = [
    ["allez", "1", <>Allez sur <em style={{ fontStyle: "normal", color: C.ice }}>flowsurmesure.com</em></>],
    ["descendez", "2", "Descendez en bas de la page"],
    ["répondez", "3", "Répondez à quelques questions"],
  ];
  const st = steps.map(([w], i) => wordAt("tuto", w, CLIP + 0.5 + i * 2));

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {t >= CLIP && <BrandBg />}
      {t < CLIP && (
        <AbsoluteFill style={{ transformOrigin: "0 0", transform: homography(q, dst), filter: `blur(${Math.sin(Math.PI * Math.min(z, H0)) * 1.8}px)` }}>
          <OffthreadVideo src={staticFile("clips/tablette.mp4")} muted style={{ width: 1080, height: 1920 }} />
        </AbsoluteFill>
      )}
      {z >= H0 && t < CLIP && (
        // relais : 1re image de la tablette 3D, posée exactement sur l'écran du plan réel
        <AbsoluteFill style={{ opacity: devIn, translate: `${cx - 540}px ${cy - 960}px`, rotate: `${ang}deg`, scale: String(sc) }}>
          <Img src={staticFile("img/tuto0.png")} style={{ width: 1080, height: 1920 }} />
        </AbsoluteFill>
      )}
      <Sequence from={Math.round(CLIP * fps)} name="Tablette 3D">
        <OffthreadVideo src={staticFile("devices/tuto.webm")} transparent muted />
      </Sequence>
      {steps.map(([, n, lb], i) => {
        const a = st[i], b = i < 2 ? st[i + 1] : 99;
        if (t < a - 0.05 || t > b) return null;
        const k = interpolate(t, [a, a + 0.3], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
        return (
          <div key={n} style={{ position: "absolute", left: 60, right: 100, top: 170, display: "flex", alignItems: "center", gap: 22, padding: "24px 30px", borderRadius: 34, background: "rgba(19,19,19,0.88)", color: C.paper, scale: String(k), opacity: Math.min(1, k * 2), boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <b style={{ flex: "none", width: 74, height: 74, borderRadius: "50%", background: C.ice, color: C.ink, display: "grid", placeItems: "center", font: `800 38px ${F.title}` }}>{n}</b>
            <span style={{ font: `700 42px/1.1 ${F.title}`, letterSpacing: "-0.03em" }}>{lb}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
