import {OrbitControls, OrthographicCamera} from "@react-three/drei";
import * as THREE from "three";

export default function OrthoZoomOnly() {
  return (
    <>
      <OrthographicCamera makeDefault position={[15, 18, 15]} zoom={60} />

      <OrbitControls
        enableRotate={false}
        enableZoom={true}
        zoomSpeed={1.0}
        minZoom={20}
        maxZoom={100}
        mouseButtons={{
          LEFT: null,
          MIDDLE: null,
          RIGHT: THREE.MOUSE.PAN,
          WHEEL: THREE.MOUSE.DOLLY,
        }}
      />
    </>
  )
}