import React, { useMemo } from 'react'
import TileV2 from './TileV2'
import { generateLevelV2 } from '../utils/generateLevelV2'
import useTerrainStore from '../stores/terrainStore'

export default function TileGridV2({ debugTile = false }) {
  const { size, seed, octaves, persistence, lacunarity, scale } = useTerrainStore()
  
  const tiles = useMemo(() => {
    return generateLevelV2({ 
      size, 
      seed, 
      octaves, 
      persistence, 
      lacunarity, 
      scale 
    })
  }, [size, seed, octaves, persistence, lacunarity, scale])

  return (
    <>
      {tiles.map((tile) => (
        <TileV2 key={`${tile.x}-${tile.y}`} {...tile} debugTile={debugTile}/>
      ))}
    </>
  )
}

