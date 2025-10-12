import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function GrassTile({ position, onClick, value }) {
  const { color } = useMemo(() => {
    const hue = 0.31 + value * 0.01
    const lightness = 0.38 + (value * -0.05)
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
