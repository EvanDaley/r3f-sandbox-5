import * as THREE from "three"
import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useAbilityStore } from "../stores/abilityStore"

export default function AbilitySpawner() {
  const { getSelectedAbility, castAbility } = useAbilityStore()
  const [activeAbilitys, setActiveAbilitys] = useState([])

  const planeRef = useRef()

  const handlePointerDown = (e) => {
    e.stopPropagation()
    const ability = getSelectedAbility()
    if (!ability || ability.charge < 1) return

    const pos = e.point.clone()

    // Spawn a new "ability instance"
    setActiveAbilitys((prev) => [
      ...prev,
      {
        id: Math.random(),
        emoji: ability.emoji,
        position: pos,
        createdAt: performance.now(),
      },
    ])

    castAbility(ability.id)
  }

  // Animate active abilities (fade up + disappear)
  useFrame(() => {
    const now = performance.now()
    setActiveAbilitys((prev) =>
      prev
        .map((s) => ({
          ...s,
          position: s.position.clone().add(new THREE.Vector3(0, 0.01, 0)),
          life: (now - s.createdAt) / 1000,
        }))
        .filter((s) => s.life < 2) // disappears after 2s
    )
  })

  return (
    <>
      {/* Invisible ground plane for clicks */}
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Render active ability objects */}
      {activeAbilitys.map((ability) => (
        <mesh
          key={ability.id}
          position={ability.position}
          scale={1 + Math.sin(ability.life * Math.PI) * 0.2}
        >
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            emissive={"#ff9933"}
            emissiveIntensity={2}
            color={"#ffaa55"}
            transparent
            opacity={1 - ability.life / 2}
          />
        </mesh>
      ))}
    </>
  )
}
