import "./audioStyles.scss";
import "./synthStyles.css";
import React, { useEffect } from "react";

export default function GlobalPlayPause(props) {
  // props.playStates: array of each InteractiveOscillator
  // isPlaying and setPlaying keys
  const [isPlayingGlobal, setPlayingGlobal] = React.useState(false);

  // Get state changes of oscillators
  useEffect(() => {
    setPlayingGlobal(
      props.playStates.map((oscPlayData) => oscPlayData.isPlaying).some(Boolean)
    );
  }, [props.playStates, isPlayingGlobal]);

  const handleGlobalPlayPause = () => {
    console.log(`All oscillators ` + (isPlayingGlobal ? "stopped" : "started"));
    props.playStates.map((oscPlayData) =>
      oscPlayData.setPlaying(!isPlayingGlobal)
    );
  };

  return (
    <div>
      <label htmlFor="global-play-pause" className="text-label">
        Global Controls:
        <br />
        <button
          onClick={handleGlobalPlayPause}
          id="global-play-pause"
          data-testid="test-global-play-pause"
          className={
            isPlayingGlobal ? "play-pause-button paused" : "play-pause-button"
          }
        />
      </label>
    </div>
  );
}
