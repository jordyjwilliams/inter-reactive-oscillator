import "./audioStyles.scss";

export default function GlobalPlayPause(props) {
  // playingRefArray of all InteractiveOscillator's playing refs
  const handleChange = () => {
    props.playingRefArray.forEach((playingRef) => {
      console.log(playingRef.current);
      playingRef.current = !playingRef.current;
      console.log(playingRef.current);
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
