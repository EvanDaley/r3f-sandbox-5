import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function Tile({ position, value }) {
  // Map the value (-1 → +1) to a color hue and brightness
  const color = useMemo(() => new THREE.Color().setHSL((value + 1) / 2, 0.6, 0.5), [value])

  // Use the absolute value to control emissive strength
  const emissive = useMemo(() => color.clone().multiplyScalar(0.6 + Math.abs(value) * 0.8), [color, value])
  const emissiveIntensity = useMemo(() => 0.5 + Math.abs(value) * 2, [value])

  const handleClick = (e) => {
    e.stopPropagation()
    const worldPos = new THREE.Vector3()
    e.object.getWorldPosition(worldPos)
    console.log('Tile clicked at world coords:', worldPos.x, worldPos.z)
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
