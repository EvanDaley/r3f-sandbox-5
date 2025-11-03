import React, { useState, useEffect } from "react";

export default function ScreamingTextOverlay() {
  const [text, setText] = useState("Team synergy has been attained");

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("RETURN TO WORK FEELING ENERGIZED");
    }, 3000); // Change text after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
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
          lineHeight: 1.1,
          // padding: "20px",
          fontFamily: "Arial, sans-serif",
          textShadow: "4px 4px 0px rgba(0, 0, 0, 0.5)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

