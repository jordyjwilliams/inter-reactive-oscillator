import InteractiveOscillator from "./oscillator";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
      }}
    >
      <div>
        <InteractiveOscillator
          initOscType="sine"
          initFreq="261.63"
          minFreq="20"
          maxFreq="1000"
          id="osc-1"
        />
      </div>
      <div>
        <InteractiveOscillator
          initOscType="triangle"
          initFreq="329.63"
          minFreq="20"
          maxFreq="1000"
          id="osc-2"
        />
      </div>
      <div>
        <InteractiveOscillator
          initOscType="square"
          initFreq="392.00"
          minFreq="20"
          maxFreq="1000"
          id="osc-3"
        />
      </div>
    </div>
  );
}
