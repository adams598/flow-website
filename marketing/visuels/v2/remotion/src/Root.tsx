import { Composition } from "remotion";
import { Launch } from "./Launch";
import { FPS, TOTAL_FRAMES } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="FlowLancement" component={Launch} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    </>
  );
};
