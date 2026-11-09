import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/** Charte Flow (DA des affiches) : nuit teal, papier blanc, encre, cyan. */
export const C = {
  ink: "#131313",
  paper: "#FFFCFA",
  calcaire: "#F3EBE1",
  cyan: "#00A8B2",
  ice: "#7DF4FF",
  teal: "#124248",
  tealLight: "#1A6A72",
  night: "#141816",
  terre: "#C45E32",
  grey: "#5C534C",
};

export const F = { title: "Manrope", body: "Inter" };

loadFont({ family: F.title, url: staticFile("fonts/Manrope-variable.ttf"), weight: "200 800" });
loadFont({ family: F.body, url: staticFile("fonts/Inter-variable.ttf"), weight: "100 900" });

export const BG_NIGHT = `radial-gradient(900px 700px at 80% 10%, rgba(125,244,255,0.20), transparent 60%),
  radial-gradient(800px 700px at 10% 95%, rgba(0,40,46,0.6), transparent 60%),
  linear-gradient(165deg, ${C.tealLight} 0%, ${C.teal} 42%, ${C.night} 100%)`;
