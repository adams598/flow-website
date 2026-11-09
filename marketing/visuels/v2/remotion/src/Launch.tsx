import React from "react";
import { lightLeak } from "@remotion/effects/light-leak";
import { AbsoluteFill, Easing, interpolate, Sequence, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "./components/Captions";
import { clamp, FlowMark, Grain } from "./components/ui";
import { App } from "./scenes/App";
import { Daily } from "./scenes/Daily";
import { End } from "./scenes/End";
import { Flow } from "./scenes/Flow";
import { Hook } from "./scenes/Hook";
import { Proof } from "./scenes/Proof";
import { Side } from "./scenes/Side";
import { Site } from "./scenes/Site";
import { Tuto } from "./scenes/Tuto";
import { Soundtrack } from "./Soundtrack";
import { F } from "./theme";
import { scene, SceneId } from "./timing";

/**
 * Vidéo de lancement Flow (Remotion), 1080 × 1920.
 * Scènes calées sur la voix (src/timing.ts). Chaque scène entre par un zoom flouté
 * (« punch-in ») ; des fuites de lumière soulignent les grands changements de décor.
 */
const SCENE_COMPONENTS: Record<SceneId, React.FC> = { hook: Hook, daily: Daily, flow: Flow, site: Site, app: App, proof: Proof, tuto: Tuto, side: Side, end: End };
const ORDER: SceneId[] = ["hook", "daily", "flow", "site", "app", "proof", "tuto", "side", "end"];
const LEAKS: SceneId[] = ["flow", "proof", "side", "end"];

export const Launch: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#0f1312" }}>
      {ORDER.map((id) => {
        const s = scene(id);
        const Comp = SCENE_COMPONENTS[id];
        return (
          <Sequence key={id} from={Math.round(s.start * fps)} durationInFrames={Math.round(s.dur * fps)} name={`Scène · ${id}`}>
            <PunchIn first={id === "hook"}><Comp /></PunchIn>
          </Sequence>
        );
      })}
      {LEAKS.map((id, i) => (
        <Sequence key={id} from={Math.round((scene(id).start - 0.35) * fps)} durationInFrames={Math.round(0.9 * fps)} name={`Lumière · ${id}`}>
          <Leak seed={i * 3 + 1} />
        </Sequence>
      ))}
      <Captions />
      <Bug />
      <Grain />
      <Soundtrack />
    </AbsoluteFill>
  );
};

/** Entrée de scène : léger zoom arrière avec flou de vitesse. */
const PunchIn: React.FC<{ first: boolean; children: React.ReactNode }> = ({ first, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = first ? 1 : interpolate(frame / fps, [0, 0.3], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return <AbsoluteFill style={{ scale: String(1.14 - 0.14 * k), filter: k < 1 ? `blur(${(1 - k) * 16}px)` : undefined }}>{children}</AbsoluteFill>;
};

const Leak: React.FC<{ seed: number }> = ({ seed }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", opacity: 0.85 }}>
      <Solid width={width} height={height} effects={[lightLeak({ seed, hueShift: 150, progress: interpolate(frame, [0, durationInFrames - 1], [0, 1], clamp) })]} />
    </AbsoluteFill>
  );
};

/** Petit logo Flow sur les vrais plans. */
const Bug: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const real: SceneId[] = ["hook", "daily", "side"];
  const on = real.some((id) => t >= scene(id).start + 0.2 && t < scene(id).start + scene(id).dur) || (t >= scene("tuto").start && t < scene("tuto").start + 1.2);
  return (
    <div style={{ position: "absolute", left: 64, top: 80, display: "flex", alignItems: "center", gap: 12, font: `800 36px ${F.title}`, letterSpacing: "-0.04em", color: "#FFFCFA", opacity: on ? 0.92 : 0, textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
      <FlowMark size={42} /> Flow
    </div>
  );
};
