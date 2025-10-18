import { useControls } from 'leva'
import TileGrid from "./components/TileGrid"
import OrthoZoomOnly from "../../components/controls/OrthoZoomOnly"
import { usePaletteStore } from "../dynamic_colors/stores/paletteStore"
import EffectsV2 from "../../components/effects/EffectsV2"
import FloatingRobot from "../dynamic_colors/objects/FloatingRobot"
import Tree1 from "../dynamic_colors/objects/Tree1"
import Building1 from "../dynamic_colors/objects/Building1"
import SimpleLighting2 from "../../components/environment/SimpleLighting2"
import Building2 from "../dynamic_colors/objects/Building2";

export default function ProceduralGround() {
  const activePalette = usePaletteStore((s) => s.activePalette)

  const { debugTile } = useControls('Debug', {
    debugTile: { value: false, label: 'Debug Tiles' },
  })

  return (
    <>
      <OrthoZoomOnly />
      <SimpleLighting2 />
      <EffectsV2 />
      <color attach="background" args={['#3c2828']} />

      <TileGrid debugTile={debugTile} />

      <FloatingRobot materials={activePalette} position={[10, 0, 2]} />
      <FloatingRobot
        rotation={[0, Math.PI, 0]}
        materials={activePalette}
        position={[-2, 0, 6]}
      />

      <Building1
        materials={activePalette}
      />

      <Building2
        position={[-7.5, 0, 2]}
        materials={activePalette}
      />

      <Tree1
        materials={activePalette}
        position={[-8, 0, 6]}
        scale={[1.5, 1.5, 1.5]}
      />
    </>
  )
}
