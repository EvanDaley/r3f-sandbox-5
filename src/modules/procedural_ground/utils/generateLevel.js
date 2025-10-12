import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { noise } from "./noise.js"

console.log("🔹 generateLevel.js loaded")

export function generateLevel(size = 20, seed = 0) {
  const data = []
  console.log(`🚀 Generating level (size=${size}, seed=${seed})...`)

  const half = size / 2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // center the grid so it spans roughly -half .. +half
      const centeredX = x - half
      const centeredY = y - half

      // normalized coordinates for noise
      const nx = centeredX / size
      const ny = centeredY / size
      const value = noise(nx * 2, ny * 2, seed)

      data.push({
        x: centeredX,
        y: centeredY,
        value,
      })
    }
  }

  // same file handling
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const outputPath = path.resolve(__dirname, "../data/level1.json")

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
  console.log(`✅ Generated ${outputPath} with ${data.length} tiles.`)

  return data
}


if (process.argv[1] && process.argv[1].endsWith("generateLevel.js")) {
  const size = Number(process.argv[2]) || 20
  const seed = Number(process.argv[3]) || Math.random() * 1000

  console.log(`⚙️  Running generateLevel directly (size=${size}, seed=${seed})`)
  generateLevel(size, seed)
}