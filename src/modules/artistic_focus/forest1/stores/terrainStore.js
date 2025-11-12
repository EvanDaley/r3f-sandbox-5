import create from 'zustand'

const useTerrainStore = create((set) => ({
  // Terrain generation parameters
  size: 30,
  seed: 0,
  octaves: 4,
  persistence: 0.5,
  lacunarity: 2.0,
  scale: 0.15,
  
  // Update functions
  setSize: (size) => set({ size }),
  setSeed: (seed) => set({ seed }),
  setOctaves: (octaves) => set({ octaves }),
  setPersistence: (persistence) => set({ persistence }),
  setLacunarity: (lacunarity) => set({ lacunarity }),
  setScale: (scale) => set({ scale }),
}))

export default useTerrainStore

