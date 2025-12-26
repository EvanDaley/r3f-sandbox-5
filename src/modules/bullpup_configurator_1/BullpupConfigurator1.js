import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

export default function BullpupConfigurator1() {
  return (
    <>
      <GradientBackground />
      <perspectiveCamera makeDefault />
      <ambientLight intensity={2.0} />
      <spotLight intensity={2.0} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
      <directionalLight intensity={1.5} position={[-10, 10, 5]} castShadow />
      <pointLight intensity={1.0} position={[0, 10, -10]} />
      <directionalLight intensity={1.0} position={[5, 5, 10]} />
      <Bullpup />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.3} scale={20} blur={2} far={2} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
      />
    </>
  )
}

function GradientBackground() {
  return (
    <mesh scale={[500, 500, 500]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        uniforms={{
          topColor: { value: new THREE.Color(0xf0f0f5) },
          bottomColor: { value: new THREE.Color(0xd0d0d5) },
          offset: { value: 0.5 },
          exponent: { value: 0.6 }
        }}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y;
            float factor = pow(max(h + offset, 0.0), exponent);
            gl_FragColor = vec4(mix(bottomColor, topColor, factor), 1.0);
          }
        `}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Bullpup() {
  const ref = useRef()
  const MODEL_PATH = window.location.href + "/models/configurator/christmas-bullpup.glb"
  const { nodes, materials } = useGLTF(MODEL_PATH)

  // Ensure materials respond to lighting
  useEffect(() => {
    Object.keys(materials).forEach((key) => {
      const material = materials[key]
      if (!material) return
      
      // Convert unlit materials to standard materials
      if (material.type === 'MeshBasicMaterial') {
        const newMaterial = new THREE.MeshStandardMaterial()
        if (material.color) newMaterial.color.copy(material.color)
        if (material.map) newMaterial.map = material.map
        newMaterial.roughness = 0.5
        newMaterial.metalness = 0.1
        materials[key] = newMaterial
      }
    })
  }, [materials])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <group
      rotation={[0, Math.PI, 0]}
      ref={ref}
    >
      {Object.values(nodes).map((node, index) => {
        if (!node.geometry) return null
        const materialName = node.material?.name || Object.keys(materials)[index]
        const material = materials[materialName]
        if (!material) return null
        
        return (
          <mesh
            key={node.uuid || index}
            receiveShadow
            castShadow
            geometry={node.geometry}
            material={material}
          />
        )
      })}
    </group>
  )
}

