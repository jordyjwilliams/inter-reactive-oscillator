import React, { useRef, useEffect, useState } from "react";
import Dropdown from "./dropdown";
import Slider from "./slider";
import "./audioStyles.scss";

const oscillatorTypes = [
  { label: "\u223F", value: "sine" },
  { label: "\u2293", value: "square" },
  { label: "\u3030", value: "sawtooth" },
  { label: "^⌄", value: "triangle" },
  // { label: 'Custom', value: 'custom' },
];

export default function InteractiveOscillator(props) {
  // TODO: reduce the calls here... Define out of fn
  // setup default useState objects
  // const props.(props.isPlaying && props.setPlaying)
  const [freq, setFreq] = useState(props.initFreq);
  const [oscType, setOscType] = useState(props.initOscType);
  const audioContextRef = useRef();
  const oscRef = useRef();
  const playingRef = useRef(false);

  // handler for frequency slider
  const onSlideFreq = (event, props) => {
    console.log(`${props.id} Frequency set to ${event.target.value} Hz`);
    setFreq(event.target.value);
  };
  // handler for switching type
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
    // Connect and start
    osc.connect(audioContext.destination);
    osc.start();

    // Store context and start suspended
    oscRef.current = osc;
    audioContextRef.current = audioContext;
    audioContext.suspend();
    // Effect cleanup function to disconnect
    return () => osc.disconnect(audioContext.destination);
  }, []);
  // update oscType
  useEffect(() => {
    if (oscRef.current) oscRef.current.type = oscType;
  }, [oscType]);
  // update freq value
  useEffect(() => {
    if (oscRef.current) oscRef.current.frequency.value = freq;
  }, [freq]);
  // Play/Pause
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
