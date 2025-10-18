// PeerManager.js
import Peer from 'peerjs';
import { routeMessage } from './MessageRouter';
import {getRandomName} from "../../../utils/stringHelpers";
import {usePeerStore} from "./stores/peerStore";

const localHostName = 'local-host-dev-2'
const localClientPrefix = 'client-local-dev'


// Helper function to detect local development environment and role
// When working locally I open it in two tabs. The first tab is on 3000 and the second tab is on 3001.
// They both use hardcoded peerIds so that I can easily have them find each other.
const getPreferredConfig = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const port = window.location.port;

  const role = port === '3001' ? 'client' : 'host'
  const peerId = role === 'host'
    ? localHostName
    : `${localClientPrefix}-${Math.floor(Math.random() * 10000)}`;

  const playerName = port === '3000' ? 'Evan' : getRandomName();

  return { role, peerId, playerName, isLocalhost };
};

// Set up Peer.js and attach some handlers
// When we register ourselves, the peer server sends us confirmation and hits the 'open' handler.
// For local development, we immediately try to connect to the host as soon as the server says we are valid.
// When a new client tries to connect to us, that hits the 'connection' handler.
// All other events are sent through the 'data' handler and passed to our custom router class per connection.
export const initPeer = (onConnected) => {
  const { peer, setPeer, setMyPeerId, setIsHost, setIsClient, addConnection, setMyPlayerName } = usePeerStore.getState();
  if (peer) return peer;

  const desiredConfig = getPreferredConfig();

  console.log('Setting up with desiredConfig', desiredConfig);

  // Set player name for localhost development
  if (desiredConfig && desiredConfig.playerName) {
    setMyPlayerName(desiredConfig.playerName);
    console.log(`Auto-set player name for localhost: ${desiredConfig.playerName}`);
  }

  const newPeer = new Peer(desiredConfig ? desiredConfig.peerId : undefined, {
    host: '54.190.188.230',
    port: 9000,
    path: '/peerjs',
    secure: false,
    config: {
      // These are the creds for a turn server I set up on an EC2.
      // Default to STUN (straight peer to peer after connecting), fallback to TURN UDP (traffic goes through the EC2)
      iceServers: [
        { urls: 'stun:54.190.188.230:3478' },
        {
          urls: 'turn:54.190.188.230:3478?transport=udp',
          username: 'testuser',
          credential: 'testpass'
        },
        {
          urls: 'turn:54.190.188.230:3478?transport=tcp',
          username: 'testuser',
          credential: 'testpass'
        }
      ]
    }
  });

  newPeer.on('open', (id) => {
    console.log('Your peer ID is:', id);
    setMyPeerId(id);

    // Auto-connect for local development
    if (desiredConfig && desiredConfig.role === 'client') {
      console.log('Auto-connecting client to host...');
      connectToPeer(localHostName, onConnected);
    }
  });

  newPeer.on('connection', (conn) => {
    // TODO: Reject the connection if "I myself am a client connected to a host already"

    console.log('Incoming connection from', conn.peer);
    setupConnection(conn, onConnected);
    setIsHost(true);

    // When we become host, add ourselves to the connection list
    const { playerName, peerId, addConnection: addSelfConnection } = usePeerStore.getState();
    if (playerName && peerId) {
      // Add ourselves as a "connection" for display purposes
      setTimeout(() => {
        addSelfConnection(peerId, null, playerName);
      }, 100);
    }
  });

  newPeer.on('error', (err) => {
    console.error('PeerJS connection error:', err);
    // You might also want to clear the saved ID if it's causing issues:
  });

  setPeer(newPeer);

  // Set initial role for local development
  if (desiredConfig) {
    if (desiredConfig.role === 'host') {
      setIsHost(true);
      console.log('Local dev: Set as HOST');
    } else {
      setIsClient(true);
      console.log('Local dev: Set as CLIENT');
    }
  }

  return newPeer;
};

export const connectToPeer = (peerId, onConnected) => {
  const { setIsClient } = usePeerStore.getState();

  const { peer } = usePeerStore.getState();
  const conn = peer.connect(peerId);
  setupConnection(conn, onConnected);

  // ON SENDING CONNECTION save the notion that [ I AM CLIENT ]
  setIsClient(true);
};

// Set up handlers on the new connection. We should be able to call this on connections both for sending, and
// receiving. On 'open' send player info. On 'data', call the custom router.
function setupConnection(conn, onConnected) {
  console.log('setup connection')
  const { addConnection, playerName, isClient } = usePeerStore.getState();

  console.log('playerName', playerName)

  conn.on('open', () => {
    console.log('Connected to', conn.peer);
    addConnection(conn.peer, conn);

    // If we're a client connecting to host, send our player info
    if (isClient && playerName) {
      conn.send({
        scene: 'common',
        type: 'playerInfo',
        payload: { name: playerName }
      });
    }

    onConnected(conn.peer);
  });

  conn.on('data', (data) => {
    console.log('Received from', conn.peer, ':', data);
    routeMessage(conn.peer, data);
  });

  conn.on('iceStateChanged', (state) => {
    console.log('ICE state changed for', conn.peer, ':', state);
  });

  conn.on('error', (err) => {
    console.error('Connection error with', conn.peer, err);
  });

  conn.on('close', () => {
    console.log('Connection closed with', conn.peer);
  });
}

export const getPeerId = () => usePeerStore.getState().peerId;
