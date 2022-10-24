import InteractiveOscillator from "./oscillator";
import GlobalPlayPause from "./globalPlayPause";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default function App() {
  const osc1 = new InteractiveOscillator({
    initOscType: "sine",
    initFreq: "73",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-1",
  });
  const osc2 = new InteractiveOscillator({
    initOscType: "square",
    initFreq: "77",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-1",
  });
  const osc3 = new InteractiveOscillator({
    initOscType: "triangle",
    initFreq: "75",
    minFreq: "20",
    maxFreq: "1000",
    id: "osc-1",
  });
  const globalPP = new GlobalPlayPause({
    oscArray: [osc1, osc2, osc3],
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
