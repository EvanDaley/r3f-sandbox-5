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
import MovementSandbox1 from "../modules/networking_focus/movement_sandbox_1/MovementSandbox1";
import MovementSandboxOverlay from "../modules/networking_focus/movement_sandbox_1/MovementSandboxOverlay";
import MovementSandbox2 from "../modules/networking_focus/movement_sandbox_2/MovementSandbox2";
import MovementSandbox2Overlay from "../modules/networking_focus/movement_sandbox_2/MovementSandbox2Overlay";
import ChatV1 from "../modules/networking_focus/chatV1/ChatV1";
import ChatV1Overlay from "../modules/networking_focus/chatV1/ChatV1Overlay";
import OfficePrototype from "../modules/simple_playable_areas/OfficePrototype";
import OfficePrototype2 from "../modules/simple_playable_areas/OfficePrototype2";
import ActivitySandbox from "../modules/networking_focus/activity_sandbox/ActivitySandbox";
import ActivitySandboxOverlay from "../modules/networking_focus/activity_sandbox/ActivitySandboxOverlay";
import GravitySandbox from "../modules/networking_focus/gravity_sandbox/GravitySandbox";
import GravitySandboxOverlay from "../modules/networking_focus/gravity_sandbox/GravitySandboxOverlay";
import BombGame from "../modules/networking_focus/bomb_game/BombGame";
import BombGameOverlay from "../modules/networking_focus/bomb_game/BombGameOverlay";
import ScreamingText from "../modules/screaming_text/ScreamingText";
import ScreamingTextOverlay from "../modules/screaming_text/ScreamingTextOverlay";
import Forest1 from "../modules/artistic_focus/forest1/Forest1";
import Forest1Overlay from "../modules/artistic_focus/forest1/Forest1Overlay";

const scenes = [
  { id: 'connectPage', name: 'Join Game', scene: ConnectPage, overlay: ConnectPageOverlay },
  { id: 'landingArea', name: 'Landing Area', scene: LandingArea },
  { id: 'tileLevel1', name: 'Palette Sandbox', scene: PaletteSandbox, overlay: PaletteSandboxOverlay },
  { id: 'proceduralGround', name: 'Procedural Ground Sandbox', scene: ProceduralGround, overlay: ProceduralGroundOverlay },
  { id: 'abilitiesSandbox1', name: 'Abilities Sandbox', scene: AbilitiesSandbox1, overlay: AbilitiesSandboxOverlay },
  { id: 'movementSandbox1', name: 'Movement Sandbox 1', scene: MovementSandbox1, overlay: MovementSandboxOverlay },
  { id: 'movementSandbox2', name: 'Movement Sandbox 2', scene: MovementSandbox2, overlay: MovementSandbox2Overlay },
  { id: 'chatV1', name: 'Chat V1', scene: ChatV1, overlay: ChatV1Overlay },
  { id: 'OfficePrototype', name: 'OfficePrototype', scene: OfficePrototype, overlay: MovementSandbox2Overlay },
  { id: 'OfficePrototype2', name: 'OfficePrototype2', scene: OfficePrototype2, overlay: PaletteSandboxOverlay },
  { id: 'activitySandbox', name: 'Activity Sandbox', scene: ActivitySandbox, overlay: ActivitySandboxOverlay },
  { id: 'gravitySandbox', name: 'Gravity Sandbox', scene: GravitySandbox, overlay: GravitySandboxOverlay },
  { id: 'bombGame', name: 'Bomb Game', scene: BombGame, overlay: BombGameOverlay },
  { id: 'screamingText', name: 'Screaming Text', scene: null, overlay: ScreamingTextOverlay },
  { id: 'forest1', name: 'Forest 1', scene: Forest1, overlay: Forest1Overlay },
]

let defaultScene = 'connectPage'

// On the prod version, always default to connectPage. When testing locally,
if (window.location.hostname !== 'localhost') {
  defaultScene = 'connectPage';
}

const useSceneStore = create((set) => ({
  currentSceneId: defaultScene,
  scenes,
  setSceneId: (id) => set({ currentSceneId: id }),
}))

export default useSceneStore
