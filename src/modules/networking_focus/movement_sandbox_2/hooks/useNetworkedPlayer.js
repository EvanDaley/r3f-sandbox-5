// hooks/useNetworkedPlayer.js
import { useEffect } from "react";
import { messageBus } from "../../general_connection_tooling/messageBus";
import { usePeerStore } from "../../general_connection_tooling/stores/peerStore";
import { usePlayerStore } from "../stores/usePlayerStore";

export function useNetworkedPlayer(group = "playerMovement") {
  const isHost = usePeerStore((s) => s.isHost);
  const peerId = usePeerStore((s) => s.peerId);
  const connections = usePeerStore((s) => s.connections);
  const setPlayerTransform = usePlayerStore((s) => s.setPlayerTransform);

  useEffect(() => {
    if (!peerId) return;

    const spawn = {
      x: (Math.random() - 0.5) * 5,
      y: 0,
      z: (Math.random() - 0.5) * 5,
      rotation: 0,
    };
    setPlayerTransform(peerId, spawn);
    messageBus.broadcast(group, "updateTransform", { sender: peerId, transform: spawn });

    const unsubscribe = messageBus.subscribe(group, ({ fromPeerId, payload }) => {
      const { transform, sender } = payload;
      const senderId = sender || fromPeerId;
      if (!senderId || !transform) return;

      if (isHost) {
        Object.values(connections).forEach(({ conn }) => {
          if (conn && conn.open && conn.peer !== senderId) {
            conn.send({
              scene: "bus",
              type: "updateTransform",
              payload: { group, sender: senderId, transform },
            });
          }
        });
      }

      setPlayerTransform(senderId, transform);
    });

    return unsubscribe;
  }, [peerId, isHost, group, connections, setPlayerTransform]);

  const broadcastTransform = (position, rotation) => {
    if (!peerId) return;
    const transform = { x: position.x, y: position.y, z: position.z, rotation };
    setPlayerTransform(peerId, transform);
    messageBus.broadcast(group, "updateTransform", {
      sender: peerId,
      transform,
    });
  };

  return { broadcastTransform };
}
