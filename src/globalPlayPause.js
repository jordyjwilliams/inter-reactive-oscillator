import "./audioStyles.scss";

export default function GlobalPlayPause(props) {
  // oscArray of all InteractiveOscillator's
  const handleChange = () => {
    // console.log(props.oscArray[0]);
    props.oscArray.forEach((osc) => {
      console.log(osc);
      osc.toggleOscillator();
      // console.log(osc.isPlaying);
    });
  };
  const isPlaying = false;

  return (
    <div>
      <button
        onClick={handleChange}
        // data-playing={isPlaying}
        id={`global-play-pause`}
        className={isPlaying ? "play-pause-button paused" : "play-pause-button"}
      />
    </div>
  );
}
