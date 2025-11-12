import React, { useMemo } from 'react'
import * as THREE from 'three'
import {Outlines} from "@react-three/drei";

export default function RockTileV2({ position, onClick, value }) {
  const { color, scale, rotation } = useMemo(() => {
    // Stable seed based on tile position
    const seed = Math.abs(Math.sin(position[0] * 12.9898 + position[2] * 78.233)) % 1

    // More interesting rock colors with slight blue-gray tint
    const hue = 0.55 + (seed - 0.5) * 0.05 // 0.525-0.575 (blue-gray range)
    const saturation = 0.15 + seed * 0.1 // 0.15-0.25 for subtle color
    const lightness = 0.35 + seed * 0.12 // 0.35-0.47 for varied rock tones
    const color = new THREE.Color().setHSL(hue, saturation, lightness)

    // Reduced scaling to prevent gaps
    const scaleX = 1.0 + (seed - 0.5) * 0.03 // Very subtle variation
    const scaleY = 1.0 + (seed - 0.5) * 0.12 // Height variation
    const scaleZ = 1.0 + (seed - 0.5) * 0.03

    // Small rotation only
    const rotation = (seed - 0.5) * 0.12 // ~±6 degrees

    return {
      color,
      scale: [scaleX, scaleY, scaleZ],
      rotation,
    }
  }, [position])

  return (
    <mesh
      position={position}
      onClick={onClick}
      rotation={[0, rotation, 0]}
      scale={scale}
      receiveShadow={true}
    >
      <boxGeometry args={[1.0, 0.5, 1.0]} />
      <meshToonMaterial color={color} />
    </mesh>
  )
}

