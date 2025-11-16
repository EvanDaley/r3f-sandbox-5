import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePaletteStore } from '../../modules/dynamic_colors/stores/paletteStore'

/**
 * DebugCameraAxisBoxMaterial
 * 
 * Swaps objects to a palette material when they're within a box between the camera and player.
 * The box extends along the camera's forward axis from camera to player, with a margin width
 * on the orthogonal axes.
 */
export default function DebugCameraAxisBoxMaterial({
  playerRef,
  paletteKey = 'transparent',
  margin = 2.0, // Width/height of the box on orthogonal axes
  children,
  ...props
}) {
  const groupRef = useRef()
  const { camera, scene } = useThree()
  const activePalette = usePaletteStore((s) => s.activePalette)
  const originalMaterials = useRef(new Map())
  const boxHelperRef = useRef()

  useFrame(() => {
    if (!groupRef.current || !playerRef?.current || !camera || !activePalette) return

    // Get the transparent material from palette
    const transparentMaterial = activePalette[paletteKey]
    if (!transparentMaterial) return

    // Get camera forward direction
    const cameraForward = new THREE.Vector3()
    camera.getWorldDirection(cameraForward)

    // Get camera right and up directions (orthogonal to forward)
    const cameraRight = new THREE.Vector3()
    cameraRight.crossVectors(cameraForward, new THREE.Vector3(0, 1, 0)).normalize()
    const cameraUp = new THREE.Vector3()
    cameraUp.crossVectors(cameraRight, cameraForward).normalize()

    // Get camera and player positions
    const cameraPos = new THREE.Vector3()
    const playerPos = new THREE.Vector3()
    camera.getWorldPosition(cameraPos)
    playerRef.current.getWorldPosition(playerPos)

    // Calculate distance from camera to player along forward axis
    const playerRelative = new THREE.Vector3().subVectors(playerPos, cameraPos)
    const playerProjection = playerRelative.dot(cameraForward)

    // Create or update box geometry for visualization
    if (!boxHelperRef.current && playerProjection > 0) {
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
      const boxEdges = new THREE.EdgesGeometry(boxGeometry)
      const boxMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
      boxHelperRef.current = new THREE.LineSegments(boxEdges, boxMaterial)
      scene.add(boxHelperRef.current)
    }

    // Update box position, rotation, and scale
    if (boxHelperRef.current && playerProjection > 0) {
      const boxDepth = playerProjection
      
      // Position at center of box (halfway along forward axis from camera to player)
      const boxCenter = cameraPos.clone().add(cameraForward.clone().multiplyScalar(boxDepth / 2))
      boxHelperRef.current.position.copy(boxCenter)

      // Create rotation matrix from camera basis vectors
      const boxMatrix = new THREE.Matrix4()
      boxMatrix.makeBasis(cameraRight, cameraUp, cameraForward)
      boxHelperRef.current.setRotationFromMatrix(boxMatrix)

      // Scale box: width/height = margin*2, depth = playerProjection
      boxHelperRef.current.scale.set(margin * 2, margin * 2, boxDepth)
    }

    // Update each mesh individually
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        // Get this specific mesh's world position
        const objectPos = new THREE.Vector3()
        child.getWorldPosition(objectPos)

        // Calculate object position relative to camera
        const objectRelative = new THREE.Vector3().subVectors(objectPos, cameraPos)
        
        // Project onto camera axes
        const forwardDist = objectRelative.dot(cameraForward)
        const rightDist = objectRelative.dot(cameraRight)
        const upDist = objectRelative.dot(cameraUp)

        // Check if object is within the box
        // Forward: between 0 and playerProjection
        // Right/Up: within margin distance
        const isInBox = 
          forwardDist >= 0 && 
          forwardDist <= playerProjection &&
          Math.abs(rightDist) <= margin &&
          Math.abs(upDist) <= margin

        // Update materials for this specific mesh
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((material, index) => {
          if (material) {
            // Store original material on first access
            const materialKey = `${child.uuid}-${index}`
            if (!originalMaterials.current.has(materialKey)) {
              originalMaterials.current.set(materialKey, material)
            }

            // Swap to transparent material if object is in box
            if (isInBox) {
              if (Array.isArray(child.material)) {
                child.material[index] = transparentMaterial
              } else {
                child.material = transparentMaterial
              }
            } else {
              // Restore original material
              const originalMaterial = originalMaterials.current.get(materialKey)
              if (originalMaterial) {
                if (Array.isArray(child.material)) {
                  child.material[index] = originalMaterial
                } else {
                  child.material = originalMaterial
                }
              }
            }
          }
        })
      }
    })
  })

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  )
}

