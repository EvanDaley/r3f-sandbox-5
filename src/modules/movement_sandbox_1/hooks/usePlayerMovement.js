import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function usePlayerMovement(ref, speed = 0.05) {
  const keys = {};

  // Track key state
  useEffect(() => {
    const handleKeyDown = (e) => (keys[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Move character each frame
  useFrame(() => {
    if (!ref.current) return;

    const direction = new THREE.Vector3();

    console.log(direction);

    if (keys["w"]) direction.z -= 1;
    if (keys["s"]) direction.z += 1;
    if (keys["a"]) direction.x -= 1;
    if (keys["d"]) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(speed);
      ref.current.position.add(direction);
    }
  });
}
