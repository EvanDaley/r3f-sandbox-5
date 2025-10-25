import React, { useRef } from "react";
import { useRobotMovement } from "./hooks/useRobotMovement";
import { usePlayerStore } from "./stores/usePlayerStore";
import { usePeerStore } from "../general_connection_tooling/stores/peerStore";
import OrthoZoomOnly from "../../../components/controls/OrthoZoomOnly";
import SimpleLighting2 from "../../../components/environment/SimpleLighting2";
import EffectsV2 from "../../../components/effects/EffectsV2";
import TileGrid from "../../procedural_ground/components/TileGrid";
import FloatingRobot from "../../dynamic_colors/objects/FloatingRobot";
import {usePaletteStore} from "../../dynamic_colors/stores/paletteStore";
import LittleRobot from "../../dynamic_colors/objects/LittleRobot";
import {useInitPlayer} from "./hooks/useInitPlayer";

export default function MovementSandbox2() {
  useInitPlayer();

  const activePalette = usePaletteStore((s) => s.activePalette);
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
        const materials = activePalette;
        const rotationY = pos.rotation ?? 0;

        if (isSelf) {
          return (
            <LittleRobot
              key={id}
              ref={localRef}
              materials={materials}
              position={[pos.x, pos.y, pos.z]}
              rotation={[0, rotationY, 0]}  // ✅ apply networked rotation
              scale={scale}
            />
          );
        }

        // Remote robots (no ref)
        return (
          <LittleRobot
            key={id}
            materials={materials}
            position={[pos.x, pos.y, pos.z]}
            rotation={[0, rotationY, 0]}  // ✅ same rotation
            scale={scale}
          />
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
