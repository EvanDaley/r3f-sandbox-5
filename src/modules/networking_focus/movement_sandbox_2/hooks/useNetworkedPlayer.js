// hooks/useNetworkedPlayer.js
import { useEffect } from "react";
import { messageBus } from "../../general_connection_tooling/messageBus";
import { usePeerStore } from "../../general_connection_tooling/stores/peerStore";
import { usePlayerStore } from "../stores/usePlayerStore";

export function useNetworkedPlayer(group = "playerMovement") {
  const isHost = usePeerStore((s) => s.isHost);
  const peerId = usePeerStore((s) => s.peerId);
  const connections = usePeerStore((s) => s.connections);
  const setPlayerPosition = usePlayerStore((s) => s.setPlayerPosition);

  // Announce spawn + handle network updates
  useEffect(() => {
    if (!peerId) return;

    // Spawn point
    const spawn = {
      x: (Math.random() - 0.5) * 5,
      y: 0,
      z: (Math.random() - 0.5) * 5,
    };
    setPlayerPosition(peerId, spawn);
    messageBus.broadcast(group, "updatePosition", { sender: peerId, position: spawn });

    // Subscribe to incoming updates
    const unsubscribe = messageBus.subscribe(group, ({ fromPeerId, payload }) => {
      const { position, sender } = payload;
      const senderId = sender || fromPeerId;
      if (!senderId || !position) return;

      // Host rebroadcasts
      if (isHost) {
        Object.values(connections).forEach(({ conn }) => {
          if (conn && conn.open && conn.peer !== senderId) {
            conn.send({
              scene: "bus",
              type: "updatePosition",
              payload: { group, sender: senderId, position },
            });
          }
        });
      }

      // Update local state
      setPlayerPosition(senderId, position);
    });

    return unsubscribe;
  }, [peerId, isHost, group, connections, setPlayerPosition]);

  // Utility to broadcast movement updates
  const broadcastPosition = (position) => {
    if (!peerId) return;
    setPlayerPosition(peerId, position);
    messageBus.broadcast(group, "updatePosition", {
      sender: peerId,
      position,
    });
  };

  return { broadcastPosition };
}
