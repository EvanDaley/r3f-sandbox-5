import usePeerConnection from "../hooks/usePeerConnection";
import React from "react";
import "./WelcomeModal.css";

export default function WelcomeModal() {
  const {
    peerId,
    playerName,
    isConnected,
    hostId,
    setHostId,
    setMyPlayerName,
    handleConnect,
    connections,
    isHost,
    handleSceneChange,
  } = usePeerConnection();

  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal-container">
        {!isConnected ? (
          <div className="welcome-modal-form">

            <label className="welcome-modal-label">NAME</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={playerName}
              onChange={(e) => setMyPlayerName(e.target.value)}
              className="welcome-modal-input"
            />

            <label className="welcome-modal-label">ROOM CODE</label>
            <input
              type="text"
              placeholder="Enter 3-Letter Room Code"
              value={hostId}
              onChange={(e) => setHostId(e.target.value.toUpperCase())}
              className="welcome-modal-input"
            />


            <button onClick={handleConnect} className="welcome-modal-button">
              Join
            </button>
          </div>
        ) : (
          <>
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-subtitle">The host will begin the match shortly</p>

            <div className="welcome-lobby">
              <h3>Players in Lobby</h3>
              <ul className="welcome-player-list">
                {Object.entries(connections).map(([peerId, data]) => (
                  <li key={peerId}>
                    <span className="player-name">{data.name || "Unknown"}</span>
                    <span className="player-id">{peerId.slice(0, 28)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isHost && (
              <button
                onClick={() => handleSceneChange("scene1")}
                className="welcome-modal-button welcome-modal-button-green"
              >
                Start Game
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
