import PropTypes from "prop-types";
import "../../synthStyles.css";

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
 * // Rendering, inside App.js or another comp.
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
      <label
        htmlFor={`${props.id}-numeric-input-slider-val`}
        className="text-label"
        data-testid="test-slider-input-label"
      >
        {props.label}
      </label>
      <br />
      <input
        type="number"
        id={`${props.id}-numeric-input-slider-val`}
        htmlFor={`${props.id}-slider-input`}
        value={props.val}
        onChange={props.onSlide}
        className="slider-input"
        data-testid="test-slider-input-textbox"
      />
      <br />
      <input
        name="slider"
        type="range"
        id={`${props.id}-slider-input`}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.val}
        onChange={props.onSlide}
        className="synth-slider"
        data-testid="test-slider-input-slider"
      />
    </div>
  );
}

Slider.propTypes = {
  /** Minimum slider value */
  min: PropTypes.number.isRequired,
  /** Maximum slider value */
  max: PropTypes.number.isRequired,
  /** Slider step size */
  step: PropTypes.number,
  /** Initial slider value */
  val: PropTypes.number,
  /** Function called on slider change */
  onSlide: PropTypes.func.isRequired,
  /** Slider label content */
  label: PropTypes.string,
  /** id */
  id: PropTypes.string,
};
