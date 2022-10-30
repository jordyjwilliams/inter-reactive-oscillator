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
