import React, { useRef, useEffect, useState } from "react";
import Dropdown from "./dropdown";
import Slider from "./slider";
import "./audioStyles.scss";
import PropTypes from "prop-types";

const oscillatorTypes = [
  { label: "\u223F", value: "sine" },
  { label: "\u2293", value: "square" },
  { label: "\u3030", value: "sawtooth" },
  { label: "^⌄", value: "triangle" },
];

/**
 * Interactive Oscillator.
 * Renders oscillators with gain, frequency sliders/input boxes
 * Separate play pause buttons.
 * @component
 * @example
 * const [oscPlaying, setOscPlaying] = useState(false);
 * const osc = new InteractiveOscillator({
 *   initOscType: "sine",
 *   initFreq: "73",
 *   minFreq: "20",
 *   maxFreq: "1000",
 *   id: "osc",
 *   isPlaying: osc1Playing,
 *   setPlaying: setOsc1Playing,
 * });
 * return (
 *   <div id="osc-div" htmlFor="osc">
 *     {osc}
 *   </div>
 * )
 */
export default function InteractiveOscillator(props) {
  // TODO: reduce the calls here... Define out of fn
  // setup default useState objects
  // const props.(props.isPlaying && props.setPlaying)
  const [freq, setFreq] = useState(props.initFreq);
  const [oscType, setOscType] = useState(props.initOscType);
  const [gain, setGain] = useState(1);
  const audioContextRef = useRef();
  const gainNodeRef = useRef();
  const oscRef = useRef();
  const playingRef = useRef(false);

  // handler: freq slider
  const onSlideFreq = (event, props) => {
    console.log(`${props.id} Frequency set to ${event.target.value} Hz`);
    setFreq(event.target.value);
  };
  // handler: gain slider
  const onSlideGain = (event, props) => {
    console.log(`${props.id} Gain set to ${event.target.value}`);
    setGain(event.target.value);
  };
  // handler: oscType
  const handleChangeOscType = (event, props) => {
    console.log(
      `${props.id} Oscillator changed from ${oscType} to ${event.target.value} wave type`
    );
    setOscType(event.target.value);
  };
  const oscSelector = new Dropdown({
    label: "Shape: ",
    initValue: oscType,
    handleChange: (e) => handleChangeOscType(e, props),
    optionList: oscillatorTypes,
    id: `${props.id}-osc-type-dropdown`,
  });
  const freqSlider = new Slider({
    val: freq,
    onSlide: (e) => onSlideFreq(e, props),
    min: props.minFreq,
    max: props.maxFreq,
    label: `Frequency [Hz] (min: ${props.minFreq}, max: ${props.maxFreq})`,
    id: `${props.id}-freq-slider`,
  });
  const gainSlider = new Slider({
    val: gain,
    onSlide: (e) => onSlideGain(e, props),
    min: 0,
    max: 1,
    step: 0.01,
    label: `Gain (0-1)`,
    id: `${props.id}-gain-slider`,
  });

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
  // update oscType
  useEffect(() => {
    if (oscRef.current) oscRef.current.type = oscType;
  }, [oscType]);
  // update freq values
  useEffect(() => {
    if (oscRef.current) oscRef.current.frequency.value = freq;
  }, [freq]);
  // update gain values
  useEffect(() => {
    if (gainNodeRef.current) gainNodeRef.current.gain.value = gain;
  }, [gain]);
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
  return (
    <div>
      {oscSelector}
      {freqSlider}
      {gainSlider}
      <button
        onClick={() => props.setPlaying((play) => !play)}
        id={`${props.id}-play-pause`}
        className={
          props.isPlaying ? "play-pause-button paused" : "play-pause-button"
        }
      ></button>
    </div>
  );
}

InteractiveOscillator.propTypes = {
  /** Initial frequency of oscillator [Hz] */
  initFreq: PropTypes.number,
  /** Max frequency of oscillator [Hz] */
  maxFreq: PropTypes.number,
  /** Min frequency of oscillator [Hz] */
  minFreq: PropTypes.number,
  /** Initial oscillator waveshape */
  initOscType: PropTypes.oneOf(oscillatorTypes.map((item) => item.value)),
  /** playing useState */
  isPlaying: PropTypes.bool,
  /** sets playing useState */
  setPlaying: PropTypes.func,
  /** id */
  id: PropTypes.string,
};
