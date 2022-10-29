import InteractiveOscillator from "./oscillator";
import GlobalPlayPause from "./globalPlayPause";
import React, { useState } from "react";
import { Oscilloscope, createAudioContext } from "webaudio-oscilloscope";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default function App() {
  const [osc1Playing, setOsc1Playing] = useState(false);
  const [osc2Playing, setOsc2Playing] = useState(false);
  const [osc3Playing, setOsc3Playing] = useState(false);
  // const globalAudioCtx = createAudioContext();
  // const globalAudioSource =
  // const canvasElement = document.querySelector(".scope");

  // TODO: set these nicer

  const { osc1, osc1Ref } = new InteractiveOscillator({
    initOscType: "sine",
    initFreq: "73",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-1",
    isPlaying: osc1Playing,
    setPlaying: setOsc1Playing,
    // globalSource: globalAudioSource,
  });
  const osc2 = new InteractiveOscillator({
    initOscType: "square",
    initFreq: "77",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-2",
    isPlaying: osc2Playing,
    setPlaying: setOsc2Playing,
    // globalSource: globalAudioSource,
  })[0];
  const osc3 = new InteractiveOscillator({
    initOscType: "triangle",
    initFreq: "75",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-3",
    isPlaying: osc3Playing,
    setPlaying: setOsc3Playing,
    // globalSource: globalAudioSource,
  })[0];
  const globalPP = new GlobalPlayPause({
    playStates: [
      { isPlaying: osc1Playing, setPlaying: setOsc1Playing },
      { isPlaying: osc2Playing, setPlaying: setOsc2Playing },
      { isPlaying: osc3Playing, setPlaying: setOsc3Playing },
    ],
    id: "global-play-pause",
  });

  // let scope = new Oscilloscope(globalAudioCtx, osc1, canvasElement);
  // scope.start();
  return (
    <div
      id="osc-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
        padding: 50,
      }}
    >
      <div id="osc-1-div" htmlFor="osc-1">
        {osc1}
      </div>
      <div id="osc-2-div" htmlFor="osc-2">
        {osc2}
      </div>
      <div id="osc-3-div" htmlFor="osc-3">
        {osc3}
      </div>
      <div id="global-div" htmlFor="global-play-pause">
        {globalPP}
      </div>
      <div id="scope-div" htmlFor="scope">
        <canvas class="scope" width="320px" height="110px" />
      </div>
    </div>
  );
}
