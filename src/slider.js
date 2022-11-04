import PropTypes from "prop-types";
/**
 * Slider react component.
 * @component
 * @example
 * const [getFreq, setFreq] = useState(440);
 *
 * const handleStateChange = (event, cb) => {
 *   console.log(`${event.target.id} set to ${event.target.value}`);
 *   cb(event.target.value);
 * };
 *
 * const freqSlider = new Slider({
 *   val: getFreq,
 *   onSlide: (e) => handleStateChange(e, freqState.set),
 *   min: 20,
 *   max: 20000,
 *   label: `Frequency [Hz] `,
 *   id: `my-freq-slider`,
 * });
 * // Rendering:
 * return(
 *    <div id="freq-slider-div" htmlFor="my-freq-slider">
 *      {freqSlider}
 *    </div>
 * )
 */

export default function Slider(props) {
  return (
    <div>
      <br />
      <label htmlFor={`${id}-numeric-input-slider-val`}>{label}</label>
      <br />
      <input
        type="number"
        id={`${id}-numeric-input-slider-val`}
        htmlFor={`${id}-slider-input`}
        value={val}
        onChange={(val) => onSlide(val)}
      />
      <br />
      <input
        name="slider"
        type="range"
        id={`${id}-slider-input`}
        min={min}
        max={max}
        defaultValue={val}
        step={step}
        value={val}
        onChange={(slideValue) => onSlide(slideValue)}
      />
    </div>
  );
}

Slider.propTypes = {
  /** Minimum slider value */
  min: PropTypes.number,
  /** Maximum slider value */
  max: PropTypes.number,
  /** Slider step size */
  step: PropTypes.number,
  /** Initial slider value */
  val: PropTypes.number,
  /** Function called on slider change */
  onSlide: PropTypes.func,
  /** Slider label content */
  label: PropTypes.string,
  /** id */
  id: PropTypes.string,
};
