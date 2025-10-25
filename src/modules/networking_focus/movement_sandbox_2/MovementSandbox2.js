import React, { useRef } from "react";
import { useRobotMovement } from "./hooks/useRobotMovement";
import { usePlayerStore } from "./stores/usePlayerStore";
import { usePeerStore } from "../general_connection_tooling/stores/peerStore";
import OrthoZoomOnly from "../../../components/controls/OrthoZoomOnly";
import SimpleLighting2 from "../../../components/environment/SimpleLighting2";
import EffectsV2 from "../../../components/effects/EffectsV2";
import TileGrid from "../../procedural_ground/components/TileGrid";
import {useInitPlayer} from "./hooks/useInitPlayer";

export default function MovementSandbox2() {
  // useInitPlayer(); // ensure we have a starting position

  const players = usePlayerStore((s) => s.players);
  const { peerId, hostId } = usePeerStore((s) => ({
    peerId: s.peerId,
    hostId: s.hostId,
  }));

  const localRef = useRef();
  useRobotMovement(localRef);

  return (
    <>
      {Object.entries(players).map(([id, pos]) => {
        const isHostPlayer = id === hostId;
        const isSelf = id === peerId;
        const scale = isHostPlayer ? 2 : 1;
        const color = isSelf ? "#ffa600" : isHostPlayer ? "#ff3b3b" : "#3ba9ff";

        if (isSelf) {
          return (
            <mesh key={id} ref={localRef} position={[pos.x, pos.y, pos.z]} scale={scale}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          );
        }

        return (
          <mesh key={id} position={[pos.x, pos.y, pos.z]} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}

      <color attach="background" args={["#3c2828"]} />
      <OrthoZoomOnly />
      <SimpleLighting2 />
      <EffectsV2 />
      <TileGrid />
    </>
  );
}
