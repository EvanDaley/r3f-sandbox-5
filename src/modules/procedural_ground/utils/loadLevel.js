﻿import level1 from '../data/level1.json'

export function loadLevel(tileSize = 1) {
  console.log('load level')
  return level1.map((tile) => ({
    ...tile,
    position: [tile.x * tileSize, 0, tile.y * tileSize],
  }))
}
