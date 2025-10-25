import { useEffect } from "react";
import {usePeerStore} from "../../general_connection_tooling/stores/peerStore";
import {usePlayerStore} from "../stores/usePlayerStore";

export function useInitPlayer() {
  const peerId = usePeerStore((s) => s.peerId);
  const initPlayer = usePlayerStore((s) => s.initPlayer);

  useEffect(() => {
    if (peerId) initPlayer(peerId);
  }, [peerId, initPlayer]);
}
