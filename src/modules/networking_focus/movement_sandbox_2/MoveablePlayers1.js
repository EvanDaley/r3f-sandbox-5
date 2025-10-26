import {useInitPlayer} from "./hooks/useInitPlayer";
import {usePaletteStore} from "../../dynamic_colors/stores/paletteStore";
import {usePlayerStore} from "./stores/usePlayerStore";
import {usePeerStore} from "../general_connection_tooling/stores/peerStore";
import React, {useRef} from "react";
import {useRobotMovement} from "./hooks/useRobotMovement";
import LittleRobot from "../../dynamic_colors/objects/LittleRobot";
import Ninja1 from "../../dynamic_colors/objects/Ninja1";

export default function MoveablePlayers1() {
  useInitPlayer();

  const activePalette = usePaletteStore((s) => s.activePalette);
  const palettes = usePaletteStore((s) => s.palettes);
  const players = usePlayerStore((s) => s.players);
  const {
    peerId,
    hostId
  } = usePeerStore((s) => ({
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
        const scale = isHostPlayer ? 1 : 1;
        const materials = activePalette;
        const rotationY = pos.rotation ?? 0;

        if (isSelf) {
          return (
            <Ninja1
              key={id}
              ref={localRef}
              materials={materials}
              scale={scale}
              position={[pos.x, pos.y, pos.z]}
              rotation={[0, rotationY, 0]}
            />
          );
        }
        //
        // if (isSelf) {
        //   return (
        //     <Ninja1
        //       key={id}
        //       ref={localRef}
        //       materials={palettes.desert}
        //       scale={scale}
        //       position={[pos.x, pos.y, pos.z]}
        //       rotation={[0, rotationY, 0]}
        //     />
        //   );
        // }

        // Remote robots (no ref)
        return (
          <Ninja1
            key={id}
            materials={materials}
            position={[pos.x, pos.y, pos.z]}
            rotation={[0, rotationY, 0]}
          />
        );
      })}
    </>
  )
}