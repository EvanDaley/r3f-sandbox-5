import { noise } from "../../../procedural_ground/utils/noise.js"

// Real-time terrain generation function
export function generateLevelV2({ 
  size = 30, 
  seed = 0, 
  octaves = 4, 
  persistence = 0.5, 
  lacunarity = 2.0,
  scale = 0.15,
  tileSize = 1 
}) {
  const data = []
  const half = size / 2
  const offsetX = Math.sin(seed) * 1000
  const offsetY = Math.cos(seed) * 1000

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const centeredX = x - half
      const centeredY = y - half
      const nx = (centeredX + offsetX) * scale
      const ny = (centeredY + offsetY) * scale

      let frequency = 1.0
      let amplitude = 1.0
      let value = 0.0
      let maxAmplitude = 0.0

      for (let i = 0; i < octaves; i++) {
        value += noise(nx * frequency, ny * frequency, seed + i * 100) * amplitude
        maxAmplitude += amplitude
        amplitude *= persistence
        frequency *= lacunarity
      }

      value /= maxAmplitude

      data.push({
        x: centeredX,
        y: centeredY,
        value,
        position: [centeredX * tileSize, -.24, centeredY * tileSize],
      })
    }
  }

  return data
}

