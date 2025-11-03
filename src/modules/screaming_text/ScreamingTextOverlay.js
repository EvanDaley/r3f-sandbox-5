import React, { useState, useEffect } from "react";
import ScreamingTextVariant from "./lowercase_html/ScreamingTextVariant";

export default function ScreamingTextOverlay() {
  const [text, setText] = useState("TEAM SYNERGY HAS BEEN ATTAINED");
  const [isFirstText, setIsFirstText] = useState(true);

  const SWITCH_TEXT_INTERVAL_MS = 3000;
  const FIRST_TEXT = "TEAM SYNERGY HAS BEEN ATTAINED";
  const SECOND_TEXT = "PLEASE RETURN TO WORK FEELING ENERGIZED";
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFirstText((prev) => {
        const newIsFirst = !prev;
        setText(newIsFirst ? FIRST_TEXT : SECOND_TEXT);
        return newIsFirst;
      });
    }, SWITCH_TEXT_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return <ScreamingTextVariant text={text} />;
}
