import TileGrid from "./components/TileGrid";
import SimpleLighting from "../../components/environment/SimpleLighting";
import OrthoZoomOnly from "../../components/controls/OrthoZoomOnly";
import PaletteTest1 from "../dynamic_colors/objects/PaletteTest1";
import {usePaletteStore} from "../dynamic_colors/stores/paletteStore";
import EffectsV2 from "../../components/effects/EffectsV2";

export default function ProceduralGround() {
  const activePalette = usePaletteStore((s) => s.activePalette)

  return (
    <>
      <OrthoZoomOnly/>
      <SimpleLighting/>
      <TileGrid />

      <PaletteTest1 materials={activePalette} scale={[.5,.5,.5]}/>

      <EffectsV2/>
    </>
  );
}
