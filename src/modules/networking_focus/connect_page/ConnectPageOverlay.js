import React from "react";
import usePeerConnection from "../general_connection_tooling/hooks/usePeerConnection";
import MyPeerId from "../general_connection_tooling/html/MyPeerId";

export default function ConnectPageOverlay() {
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
    <>
      <MyPeerId>{peerId || "Loading..."}</MyPeerId>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          fontFamily: "sans-serif",
          zIndex: 20,
        }}
      >

        <div
          style={{
            padding: 24,
            background: "#111",
            borderRadius: 12,
            width: 400,
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <h1>Welcome!</h1>

          {!isConnected ? (
            <>
              <div style={{
                marginBottom: 12,
                textAlign: "left"
              }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  ROOM CODE
                </label>
                <input
                  type="text"
                  placeholder="Enter 3-Letter Room Code"
                  value={hostId}
                  maxLength={3}
                  onChange={(e) => setHostId(e.target.value.toUpperCase())}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: "none",
                    marginBottom: 16,
                    background: "#222",
                    color: "white",
                    fontSize: "1.1rem",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={playerName}
                  onChange={(e) => setMyPlayerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: "none",
                    marginBottom: 16,
                    background: "#222",
                    color: "white",
                    fontSize: "1.1rem",
                  }}
                />

                <button
                  onClick={handleConnect}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#3a3af9",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Join
                </button>
              </div>

            </>
          ) : (
            <>
              <p>Players:</p>
              <ul style={{
                listStyle: "none",
                padding: 0
              }}>
                {Object.entries(connections).map(([peerId, data]) => (
                  <li key={peerId}>
                    {data.name || "Unknown"} ({peerId.slice(0, 8)}…)
                  </li>
                ))}
              </ul>

              {isHost && (
                <button
                  onClick={() => handleSceneChange("scene1")}
                  style={{
                    marginTop: 12,
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Start Game
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
