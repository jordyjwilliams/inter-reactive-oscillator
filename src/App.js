import InteractiveOscillator from "./oscillator";
import GlobalPlayPause from "./globalPlayPause";
import React, { useRef } from "react";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default function App() {
  const osc1PlayingRef = useRef(false);
  const osc2PlayingRef = useRef(false);
  const osc3PlayingRef = useRef(false);
  // TODO: set these nicer

  const osc1 = new InteractiveOscillator({
    initOscType: "sine",
    initFreq: "73",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-1",
    isPlayingRef: osc1PlayingRef,
  });
  const osc2 = new InteractiveOscillator({
    initOscType: "square",
    initFreq: "77",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-2",
    isPlayingRef: osc2PlayingRef,
  });
  const osc3 = new InteractiveOscillator({
    initOscType: "triangle",
    initFreq: "75",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-3",
    isPlayingRef: osc3PlayingRef,
  });
  const globalPP = new GlobalPlayPause({
    playingRefArray: [osc1PlayingRef, osc2PlayingRef, osc3PlayingRef],
  });
  return (
    <div
      id="oscGrid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
      }}
    >
      <div>{osc1}</div>
      <div>{osc2}</div>
      <div>{osc3}</div>
      <div id="globalDiv">{globalPP}</div>
    </div>
  );
}
