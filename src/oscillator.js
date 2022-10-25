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
  // setup default useState objects
  const [isPlaying, setPlaying] = useState(false);
  const [freq, setFreq] = useState(props.initFreq);
  const [oscType, setOscType] = useState(props.initOscType);
  const audioContextRef = useRef();
  const oscRef = useRef();

  // handler for frequency slider
  const onSlideFreq = (event) => {
    console.log(`${props.id} Frequency set to ${event.target.value} Hz`);
    setFreq(event.target.value);
  };
  // handler for switching type
  const handleChangeOscType = (event) => {
    console.log(
      `${props.id} Oscillator changed from ${oscType} to ${event.target.value} wave type`
    );
    setOscType(event.target.value);
  };

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
  const toggleOscillator = () => {
    console.log(
      `${props.id} oscillator ` + (isPlaying ? "stopped" : "started")
    );
    isPlaying
      ? audioContextRef.current.suspend()
      : audioContextRef.current.resume();
    props.isPlayingRef.current = !isPlaying;
    setPlaying((play) => !play);
  };
  return (
    <div>
      <Dropdown
        label="Osc Type: "
        initValue={oscType}
        handleChange={handleChangeOscType}
        optionList={oscillatorTypes}
        id={`${props.id}-osc-type-dropdown`}
      />
      <Slider
        val={freq}
        onSlide={onSlideFreq}
        min={props.minFreq}
        max={props.maxFreq}
        label={`Current Frequency [Hz] (min: ${props.minFreq}, max: ${props.maxFreq})`}
        id={`${props.id}-freq-slider`}
      />
      <button
        onClick={toggleOscillator}
        data-playing={isPlaying}
        id={`${props.id}-play-pause`}
        className={isPlaying ? "play-pause-button paused" : "play-pause-button"}
      ></button>
    </div>
  );
}
