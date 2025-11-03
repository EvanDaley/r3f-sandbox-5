import React, { useState, useEffect } from "react";

const flashKeyframes = `
  @keyframes flash {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.85;
      transform: scale(0.995);
    }
  }
`;

export default function ScreamingTextOverlay() {
  const [text, setText] = useState("Team synergy has been attained");

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("RETURN TO WORK FEELING ENERGIZED");
    }, 3000); // Change text after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{flashKeyframes}</style>
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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "clamp(48px, 15vw, 200px)",
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            textTransform: text === "Team synergy has been" ? "none" : "uppercase",
            letterSpacing: "0.1em",
            lineHeight: .9,
            fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
            textShadow: "4px 4px 0px rgba(0, 0, 0, 0.5)",
            padding: "0 20px",
            maxWidth: "100%",
            boxSizing: "border-box",
            wordWrap: "break-word",
            // animation: "flash 2.2s ease-in-out infinite",
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
}
