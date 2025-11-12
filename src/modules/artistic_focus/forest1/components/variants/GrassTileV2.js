import React, { useMemo } from 'react'
import * as THREE from 'three'
import {Outlines} from "@react-three/drei";

export default function GrassTileV2({ position, onClick, value }) {
  const { color } = useMemo(() => {
    // More natural green hues with better variation
    const hue = 0.25 + value * 0.15 // 0.25-0.4 range for green tones
    const saturation = 0.6 + value * 0.2 // 0.6-0.8 for rich greens
    const lightness = 0.35 + (value * -0.08) // 0.35-0.43 for natural grass
    const color = new THREE.Color().setHSL(hue, saturation, lightness)
    return { color }
  }, [position, value])

  return (
    <mesh
      position={position}
      onClick={onClick}
      receiveShadow={true}
    >
      <boxGeometry args={[1.0, 0.5, 1.0]} />
      <meshToonMaterial color={color} />
    </mesh>
  )
}

