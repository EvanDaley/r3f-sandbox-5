import {useControls} from "leva";
import OrthoZoomOnly from "../../components/controls/OrthoZoomOnly";
import SimpleLighting2 from "../../components/environment/SimpleLighting2";
import EffectsV2 from "../../components/effects/EffectsV2";
import TileGrid from "../procedural_ground/components/TileGrid";
import FloatingRobot from "../dynamic_colors/objects/FloatingRobot";
import Building1 from "../dynamic_colors/objects/Building1";
import Tree1 from "../dynamic_colors/objects/Tree1";
import {usePaletteStore} from "../dynamic_colors/stores/paletteStore";

export default function AbilitiesSandbox1() {
  const activePalette = usePaletteStore((s) => s.activePalette)

  const { debugTile } = useControls('Debug', {
    debugTile: { value: false, label: 'Debug Tiles' },
  })

  return (
    <>
      <OrthoZoomOnly />
      <SimpleLighting2 />
      <EffectsV2 />
      <color attach="background" args={['#cccccc']} />

      <TileGrid debugTile={debugTile} />

      <FloatingRobot
        materials={activePalette}
        position={[0, 0, -4]}
      />
      <FloatingRobot
        rotation={[0, Math.PI, 0]}
        materials={activePalette}
        position={[0, 0, 6]}
      />


    </>
  )
}
