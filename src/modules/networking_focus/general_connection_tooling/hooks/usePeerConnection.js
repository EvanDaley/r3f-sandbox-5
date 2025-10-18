// usePeerConnection.js
import { useEffect, useState } from 'react';
import {broadcastSceneChange} from "../broadcastSceneChange";
import {connectToPeer, initPeer} from "../PeerManager";
import useSceneStore from "../../../../stores/sceneStore";
import {usePeerStore} from "../stores/peerStore";

export default function usePeerConnection() {
  const { scenes, currentSceneId, setSceneId } = useSceneStore();

  const [hostId, setHostId] = useState('');
  const peerId = usePeerStore(state => state.peerId);
  const playerName = usePeerStore(state => state.playerName);
  const setMyPlayerName = usePeerStore(state => state.setMyPlayerName);
  const connections = usePeerStore(state => state.connections);
  const isHost = usePeerStore(state => state.isHost);

  const isConnected = Object.keys(connections).length > 0;

  useEffect(() => {
    initPeer(() => {});
  }, []);

  // This exposes the peerManager connection function so we can easily call it from any component to join other peers
  const handleConnect = () => {
    if (!hostId.trim()) return;
    connectToPeer(hostId.trim(), () => setHostId(''));
  };

  const handleSceneChange = (sceneId) => {
    setSceneId(sceneId);
    broadcastSceneChange(sceneId);
  };

  return {
    peerId,
    playerName,
    connections,
    isConnected,
    hostId,
    setHostId,
    setMyPlayerName,
    handleConnect,
    isHost,
    handleSceneChange
  };
}
