import create from 'zustand'
import TileLevel1 from "../modules/dynamic_colors/TileLevel1";

const scenes = [
  { id: 'tileLevel1', scene: TileLevel1 },
]

const defaultScene = 'tileLevel1'

const useSceneStore = create(set => ({
  currentSceneId: defaultScene,
  scenes,
  setSceneId: (id) => {
    set({ currentSceneId: id })
  },
  getCurrentSceneComponent: () => {
    const state = useSceneStore.getState()
    return scenes.find(s => s.id === state.currentSceneId)?.scene || null
  },
}))

export default useSceneStore
