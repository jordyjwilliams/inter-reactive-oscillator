import "./audioStyles.scss";
import React, { useState, useEffect } from "react";

export default function GlobalPlayPause(props) {
  // props.playStates: array of each InteractiveOscillator
  // isPlaying and setPlaying keys
  const [isPlayingGlobal, setPlayingGlobal] = useState(false);

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
      <label htmlFor="global-play-pause">
        Global Controls:
        <br />
        <button
          onClick={handleGlobalPlayPause}
          id="global-play-pause"
          className={
            isPlayingGlobal ? "play-pause-button paused" : "play-pause-button"
          }
        />
      </label>
    </div>
  );
}
