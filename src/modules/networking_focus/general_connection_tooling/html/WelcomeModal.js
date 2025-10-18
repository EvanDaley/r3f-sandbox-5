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
    <div className="welcome-modal__overlay">
      <div className="welcome-modal__container">
        {!isConnected ? (
          <div className="welcome-modal__form">
            <label className="welcome-modal__label">ROOM CODE</label>
            <input
              type="text"
              placeholder="Enter 3-Letter Room Code"
              value={hostId}
              maxLength={3}
              onChange={(e) => setHostId(e.target.value.toUpperCase())}
              className="welcome-modal__input"
            />

            <label className="welcome-modal__label">NAME</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={playerName}
              onChange={(e) => setMyPlayerName(e.target.value)}
              className="welcome-modal__input"
            />

            <button onClick={handleConnect} className="welcome-modal__button">
              Join
            </button>
          </div>
        ) : (
          <>
            <p>Players:</p>
            <ul className="welcome-modal__list">
              {Object.entries(connections).map(([peerId, data]) => (
                <li key={peerId}>
                  {data.name || "Unknown"} ({peerId.slice(0, 8)}…)
                </li>
              ))}
            </ul>

            {isHost && (
              <button
                onClick={() => handleSceneChange("scene1")}
                className="welcome-modal__button welcome-modal__button--green"
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
