import {usePeerStore} from "./stores/peerStore";

export const broadcastSceneChange = (sceneId) => {
  const { connections, isHost } = usePeerStore.getState();

  if (!isHost) {
    console.warn('Only hosts can broadcast scene changes');
    return;
  }

  const message = {
    scene: 'common',
    type: 'changeScene',
    payload: { sceneId }
  };

  // Send to all connected clients
  Object.values(connections).forEach(({ conn }) => {
    if (conn && conn.open) {
      conn.send(message);
      console.log(`Sent scene change to ${conn.peer}: ${sceneId}`);
    }
  });
};