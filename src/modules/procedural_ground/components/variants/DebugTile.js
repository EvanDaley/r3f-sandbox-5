import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function DebugTile({ position, value }) {
  const color = useMemo(() => new THREE.Color().setHSL((value + 1) / 2, 0.6, 0.5), [value])

  const handleClick = (e) => {
    e.stopPropagation()
    const worldPos = new THREE.Vector3()
    e.object.getWorldPosition(worldPos)
    console.log(`Tile clicked at:`, worldPos.x, worldPos.z, 'with value: ', value)
  }

  return (
    <mesh position={position} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshToonMaterial
        color={color}
      />
    </mesh>
  )
}
