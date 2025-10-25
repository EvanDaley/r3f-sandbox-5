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
  const getPlayers = usePlayerStore.getState; // direct store access

  useEffect(() => {
    if (!peerId) return;

    // --- 1. Subscribe to movement + sync messages ---
    const unsubscribe = messageBus.subscribe(group, ({ fromPeerId, payload, type }) => {
      const senderId = payload?.sender || fromPeerId;

      switch (type) {
        case "updateTransform": {
          const { transform } = payload;
          if (!senderId || !transform) return;

          // Host rebroadcasts movement updates
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
          break;
        }

        case "requestPlayerList": {
          if (isHost) {
            const players = getPlayers().players;
            Object.values(connections).forEach(({ conn }) => {
              if (conn && conn.open && conn.peer === senderId) {
                conn.send({
                  scene: "bus",
                  type: "playerList",
                  payload: { group, sender: peerId, players },
                });
              }
            });
          }
          break;
        }

        case "playerList": {
          // Merge host's players into local store
          const { players } = payload;
          if (!players) return;

          Object.entries(players).forEach(([id, transform]) => {
            setPlayerTransform(id, transform);
          });

          console.log("✅ Synced player list from host:", players);
          break;
        }

        default:
          break;
      }
    });

    // --- 2. Client: request full list on join ---
    if (!isHost) {
      setTimeout(() => {
        messageBus.broadcast(group, "requestPlayerList", { sender: peerId });
        console.log("📡 Requested player list from host");
      }, 200);
    }

    return unsubscribe;
  }, [peerId, isHost, group, connections, setPlayerTransform]);

  // --- Movement broadcast helper ---
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
