import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Sets up webAudioAPI oscillator object.
 * New audio context, oscillator and gain node connected.
 * Rendered paused on startup.
 * @component
 * @example
 * const id = "my-osc"
 * const [isPlaying, setPlaying] = useState()
 * const { gainNodeRef, oscRef } = SetupOscillator({id:id, isPlaying:isPlaying,setPlaying:setPlaying});
 */
export default function SetupOscillator(props) {
  const audioContextRef = useRef();
  const gainNodeRef = useRef();
  const oscRef = useRef();
  const playingRef = useRef(false);

  // initial osc starting
  useEffect(() => {
    const audioContext = new AudioContext();
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    // Connect and start
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    osc.start();

    // Create refs to updatable params, start suspended
    gainNodeRef.current = gainNode;
    oscRef.current = osc;
    audioContextRef.current = audioContext;
    audioContext.suspend();
    // Disconnect osc
    return () => {
      osc.disconnect(gainNode);
      gainNode.disconnect(audioContext.destination);
      audioContext.close();
    };
  }, []);
  // updates play/pause state
  useEffect(() => {
    if (playingRef.current !== props.isPlaying) {
      console.log(
        `${props.id} oscillator ` + (playingRef.current ? "stopped" : "started")
      );
      playingRef.current
        ? audioContextRef.current.suspend()
        : audioContextRef.current.resume();
      playingRef.current = !playingRef.current;
    }
  }, [props.isPlaying, props.id, props.setPlaying]);

  return {
    audioContextRef: audioContextRef,
    gainNodeRef: gainNodeRef,
    oscRef: oscRef,
    playingRef: playingRef,
  };
}
SetupOscillator.propTypes = {
  /** playing useState */
  isPlaying: PropTypes.bool,
  /** sets playing useState */
  setPlaying: PropTypes.func,
  /** id */
  id: PropTypes.string,
};
