import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function GrassTile({ position, onClick, value }) {
  const { color } = useMemo(() => {
    const hue = 0.3 + value * 0.02
    const lightness = 0.45 + value * 0.3
    const color = new THREE.Color().setHSL(hue, 0.7, lightness)
    return { color }
  }, [position, value])

  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[0.99, 0.5, 0.99]} />
      <meshToonMaterial color={color} />
    </mesh>
  )
}
