import React, { useMemo } from "react"
import { useGLTF, Outlines } from "@react-three/drei"
import { useGlobalPalette } from "../hooks/useGlobalPalette"

export default function LittleRobot({ materials, ...props }) {
  const MODEL_PATH = window.location.href + "/models/palette_testing/littleRobot.glb"
  const { scene } = useGLTF(MODEL_PATH)

  if (!materials) throw new Error("LittleRobot: missing materials")

  // ✅ Mutate materials on the real scene
  const updated = useGlobalPalette(scene, materials)

  // ✅ Collect meshes *after* palette has been applied
  const meshes = useMemo(() => {
    const arr = []
    updated?.traverse((child) => {
      if (child.isMesh) arr.push(child)
    })
    return arr
  }, [updated])

  if (!updated) return null

  return (
    <group {...props}>
      {meshes.map((mesh) => (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          material={mesh.material} // ✅ now these are palette materials
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          castShadow
          receiveShadow
        >
          <Outlines thickness={2} color="black" screenspace />
        </mesh>
      ))}
    </group>
  )
}
