import create from 'zustand'
import PaletteSandbox from "../modules/dynamic_colors/PaletteSandbox"
import PaletteSandboxOverlay from "../modules/dynamic_colors/PaletteSandboxOverlay"
import ProceduralGroundOverlay from "../modules/procedural_ground/ProceduralGroundOverlay"
import ProceduralGround from "../modules/procedural_ground/ProceduralGround"
import AbilitiesSandbox1 from "../modules/abilities_sandbox_1/AbilitiesSandbox1";
import AbilitiesSandboxOverlay from "../modules/abilities_sandbox_1/AbilitiesSandboxOverlay";
import ConnectPage from "../modules/networking_focus/connect_page/ConnectPage";
import ConnectPageOverlay from "../modules/networking_focus/connect_page/ConnectPageOverlay";
import LandingArea from "../modules/simple_playable_areas/LandingArea";

const scenes = [
  { id: 'connectPage', name: 'Join Game', scene: ConnectPage, overlay: ConnectPageOverlay },
  { id: 'landingArea', name: 'Landing Area', scene: LandingArea, overlay: PaletteSandboxOverlay },
  { id: 'tileLevel1', name: 'Palette Sandbox', scene: PaletteSandbox, overlay: PaletteSandboxOverlay },
  { id: 'proceduralGround', name: 'Procedural Ground Sandbox', scene: ProceduralGround, overlay: ProceduralGroundOverlay },
  { id: 'abilitiesSandbox1', name: 'Abilities Sandbox', scene: AbilitiesSandbox1, overlay: AbilitiesSandboxOverlay },
]

const defaultScene = 'landingArea'

const useSceneStore = create((set) => ({
  currentSceneId: defaultScene,
  scenes,
  setSceneId: (id) => set({ currentSceneId: id }),
}))

export default useSceneStore
