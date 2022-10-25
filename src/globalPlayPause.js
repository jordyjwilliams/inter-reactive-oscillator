import "./audioStyles.scss";

export default function GlobalPlayPause(props) {
  // playStates array of each InteractiveOscillator
  // isPlaying and setPlaying keys
  const handleChange = () => {
    props.playStates[0].setPlaying(!props.playStates.isPlaying);
    // props.playStates.forEach((oscPlayData) => {
    //   oscPlayData.setPlaying(!oscPlayData.isPlaying);
    // });
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
