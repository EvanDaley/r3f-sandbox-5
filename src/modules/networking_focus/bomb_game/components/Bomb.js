import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSharedObjectsStore } from "../stores/useSharedObjectsStore";
import { useSharedObjectsNetwork } from "../hooks/useSharedObjectsNetwork";
import { usePlayerStoreV4 } from "../stores/usePlayerStoreV4";
import { usePeerStore } from "../../general_connection_tooling/stores/peerStore";
import * as THREE from "three";

const INTERPOLATION_FACTOR = 0.2;
const BOMB_HEIGHT = 0.8;
const CARRY_HEIGHT = 1.5; // Height above ground when carried
const BROADCAST_THROTTLE_MS = 100;

export default function Bomb({ bombId, initialPosition, materials }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const targetPosition = useRef(new THREE.Vector3());
  const players = usePlayerStoreV4((s) => s.players);
  const peerId = usePeerStore((s) => s.peerId);
  const { broadcastObjectPosition } = useSharedObjectsNetwork();
  const lastBroadcastTime = useRef(0);
  
  // Subscribe to object state changes (for reactive updates)
  const object = useSharedObjectsStore((s) => s.objects[bombId]);

  // Initialize object in store if not present
  useEffect(() => {
    const currentObject = useSharedObjectsStore.getState().objects[bombId];
    if (!currentObject) {
      useSharedObjectsStore.getState().setObject(bombId, {
        position: initialPosition,
        heldBy: [],
        type: 'bomb',
      });
    }
  }, [bombId, initialPosition]);

  // Calculate target position based on holders or network updates
  useFrame(() => {
    if (!meshRef.current || !object) return;

    // Check if local player is holding this bomb
    const isLocalPlayerHolding = object.heldBy?.includes(peerId);
    const isCarried = object.heldBy && object.heldBy.length >= 2;

    // Any client can calculate position if they have both player positions
    if (isCarried && object.heldBy.length >= 2) {
      const player1 = players[object.heldBy[0]];
      const player2 = players[object.heldBy[1]];

      if (player1 && player2) {
        // Calculate position from both players (any client can do this)
        const avgX = (player1.x + player2.x) / 2;
        const avgZ = (player1.z + player2.z) / 2;
        targetPosition.current.set(avgX, CARRY_HEIGHT, avgZ);
        
        // If local player is one of the holders, update store and broadcast
        if (isLocalPlayerHolding) {
          useSharedObjectsStore.getState().setObjectPosition(bombId, {
            x: avgX,
            y: CARRY_HEIGHT,
            z: avgZ,
          });

          // Broadcast position updates (throttled)
          const now = performance.now();
          if (now - lastBroadcastTime.current >= BROADCAST_THROTTLE_MS) {
            const currentPos = meshRef.current.position;
            broadcastObjectPosition(bombId, {
              x: currentPos.x,
              y: currentPos.y,
              z: currentPos.z,
            });
            lastBroadcastTime.current = now;
          }
        }
      } else {
        // Fallback to stored position from network
        targetPosition.current.set(
          object.position.x,
          object.position.y !== undefined ? object.position.y : CARRY_HEIGHT,
          object.position.z
        );
      }
    } else {
      // Not being carried - return to ground level
      targetPosition.current.set(
        object.position.x,
        BOMB_HEIGHT / 2, // Ground level (half the bomb height)
        object.position.z
      );
      
      // Update store to reflect ground position when dropped
      if (object.position.y !== BOMB_HEIGHT / 2) {
        useSharedObjectsStore.getState().setObjectPosition(bombId, {
          x: object.position.x,
          y: BOMB_HEIGHT / 2,
          z: object.position.z,
        });
      }
    }

    // Smooth interpolation to target position (works for both local calc and network updates)
    meshRef.current.position.lerp(targetPosition.current, INTERPOLATION_FACTOR);

    // Update material emissive color based on holding state
    if (materialRef.current) {
      const holderCount = object?.heldBy?.length || 0;
      
      if (holderCount >= 2) {
        // Two players holding - full glow (red/orange for bomb)
        materialRef.current.emissive.set("#ff4400");
        materialRef.current.emissiveIntensity = 0.4;
      } else if (holderCount === 1) {
        // One player holding - partial glow (yellow to indicate waiting)
        materialRef.current.emissive.set("#ffaa00");
        materialRef.current.emissiveIntensity = 0.25;
      } else {
        // No one holding - subtle glow (dark red)
        materialRef.current.emissive.set("#440000");
        materialRef.current.emissiveIntensity = 0.1;
      }
    }
  });

  // Get holder count for rendering (reactive)
  const holderCount = object?.heldBy?.length || 0;

  return (
    <mesh ref={meshRef} receiveShadow castShadow position={[initialPosition.x, initialPosition.y || BOMB_HEIGHT / 2, initialPosition.z]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial
        ref={materialRef}
        color={materials?.s?.color || "#333333"}
        emissive={holderCount >= 2 ? "#ff4400" : holderCount === 1 ? "#ffaa00" : "#440000"}
        emissiveIntensity={holderCount >= 2 ? 0.4 : holderCount === 1 ? 0.25 : 0.1}
      />
    </mesh>
  );
}

