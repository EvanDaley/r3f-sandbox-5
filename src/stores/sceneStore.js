import create from 'zustand'
import PaletteSandbox from "../modules/dynamic_colors/PaletteSandbox"
import PaletteSandboxOverlay from "../modules/dynamic_colors/PaletteSandboxOverlay"

const scenes = [
  { id: 'tileLevel1', name: 'Palette Sandbox', scene: PaletteSandbox, overlay: PaletteSandboxOverlay },
]

const defaultScene = 'tileLevel1'

const useSceneStore = create(set => ({
  currentSceneId: defaultScene,
  scenes,
  setSceneId: (id) => set({ currentSceneId: id }),
  getCurrentSceneComponent: () => {
    const state = useSceneStore.getState()
    return scenes.find(s => s.id === state.currentSceneId)?.scene || null
  },
  getCurrentOverlayComponent: () => {
    const state = useSceneStore.getState()
    return scenes.find(s => s.id === state.currentSceneId)?.overlay || null
  },
}))

export default useSceneStore
