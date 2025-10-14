import React, { useMemo } from "react"
import { useGLTF, Outlines } from "@react-three/drei"
import { useGlobalPalette } from "../hooks/useGlobalPalette"
import * as THREE from "three"

export default function Building1({ materials, ...props }) {
  const MODEL_PATH = window.location.href + "/models/palette_testing/building1.glb"
  const { scene: original } = useGLTF(MODEL_PATH)

  if (!materials) {
    throw new Error("Model requires a 'materials' prop with { p, e, s, t } keys")
  }

  // Apply your palette (mutates or clones)
  const scene = useGlobalPalette(original, materials)

  // Extract mesh list once
  const meshes = useMemo(() => {
    const arr = []
    scene?.traverse((child) => {
      if (child.isMesh) arr.push(child)
    })
    return arr
  }, [scene])

  if (!scene) return null


  console.log("Meshes with outlines:", meshes.length)


  return (
    <group {...props}>
      {meshes.map((mesh) => (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          material={mesh.material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          castShadow
          // receiveShadow
        >
          <Outlines thickness={2.04} color="black" screenspace opacity={1} />
        </mesh>
      ))}
    </group>
  )
}
