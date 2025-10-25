// hooks/useRobotMovement.js
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardMovement } from "./useKeyboardMovement";
import { useNetworkedPlayer } from "./useNetworkedPlayer";
import { usePeerStore } from "../../general_connection_tooling/stores/peerStore";
import { usePlayerStore } from "../stores/usePlayerStore";

export function useRobotMovement(ref) {
  const { computeMovement, direction } = useKeyboardMovement();
  const { broadcastPosition } = useNetworkedPlayer("playerMovement");
  const peerId = usePeerStore((s) => s.peerId);
  const players = usePlayerStore((s) => s.players);
  const isReady = useRef(false);

  // Wait until ref is ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        isReady.current = true;
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [ref]);

  // Apply local input for our own player
  useFrame((_, delta) => {
    if (!isReady.current || !ref.current || !peerId) return;

    const moveVec = computeMovement(delta);
    if (moveVec.lengthSq() > 0) {
      ref.current.position.add(moveVec);

      // Rotate to face movement
      const angle = Math.atan2(direction.current.x, direction.current.z);
      ref.current.rotation.y = angle;

      // Broadcast new position to network
      broadcastPosition(ref.current.position);
    }
  });

  // Sync remote players visually
  useFrame(() => {
    if (!isReady.current || !players || !peerId) return;
    const me = players[peerId];
    if (me && ref.current) {
      ref.current.position.lerp(
        new THREE.Vector3(me.x, me.y, me.z),
        0.2 // smoothing
      );
    }
  });
}
