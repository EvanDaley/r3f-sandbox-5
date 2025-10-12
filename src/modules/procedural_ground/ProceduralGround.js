import TileGrid from "./components/TileGrid";
import SimpleLighting from "../../components/environment/SimpleLighting";
import OrthoZoomOnly from "../../components/controls/OrthoZoomOnly";
import PaletteTest1 from "../dynamic_colors/objects/PaletteTest1";
import {usePaletteStore} from "../dynamic_colors/stores/paletteStore";
import EffectsV2 from "../../components/effects/EffectsV2";
import FloatingRobot from "../dynamic_colors/objects/FloatingRobot";
import LittleRobot from "../dynamic_colors/objects/LittleRobot";
import Tree1 from "../dynamic_colors/objects/Tree1";
import {useEnableShadows} from "../dynamic_colors/hooks/useEnableShadows";

export default function ProceduralGround() {
  const activePalette = usePaletteStore((s) => s.activePalette)

  useEnableShadows()

  return (
    <>
      <OrthoZoomOnly/>
      <SimpleLighting/>
      <EffectsV2/>

      <TileGrid/>

      <PaletteTest1 materials={activePalette} scale={[.5, .5, .5]}/>
      <FloatingRobot materials={activePalette} position={[10, 0, 2]}/>
      <LittleRobot
        rotation={[0,Math.PI, 0]}
        materials={activePalette}
        position={[-2, 0, 6]}
      />


      <Tree1
        materials={activePalette}
        position={[-8, 0, 6]}
        scale={[1.5, 1.5, 1.5]}
      />
    </>
  );
}
