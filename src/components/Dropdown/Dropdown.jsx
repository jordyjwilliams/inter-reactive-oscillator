import PropTypes from "prop-types";
import "../../synthStyles.css";

/**
 * Dropdown react component. Created from input optionList.
 * @component
 * @example
 * const myOptions = [
 * { label: "Sine wave", value: "sine" },
 * { label: "Square wave", value: "square" },
 * { label: "Sawtooth wave", value: "sawtooth" },
 * { label: "Triangle wave", value: "triangle" },
 * ];
 * const [getOptionType, setOptionType] = useState("sine");
 *
 * const handleStateChange = (event, cb) => {
 *   console.log(`${event.target.id} set to ${event.target.value}`);
 *   cb(event.target.value);
 * };
 *
 * const waveShapeDropdown = new Dropdown({
 *   initValue: getOptionType,
 *   handleChange: (e) => handleStateChange(e, setOptionType.set),
 *   optionList: myOptions,
 *   label: `Wave Shape: `,
 *   id: `my-wave-shape-selector`,
 * });
 * // Rendering, inside App.js or another comp.
 * return(
 *    <div id="wave-shape-selector-div" htmlFor="my-wave-shape-selector">
 *      {waveShapeDropdown}
 *    </div>
 * )
 */

export default function Dropdown(props) {
  return (
    <div>
      <label className="text-label">
        {" "}
        {props.label}
        <select
          value={props.initValue}
          onChange={props.handleChange}
          key={props.id}
          id={props.id}
          data-testid="test-dropdown"
        >
          {props.optionList.map((option, idx) => (
            <option
              key={`${props.id}-${idx}`}
              data-testid={`test-dropdown-option-${idx}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

Dropdown.propTypes = {
  /** Initial option value */
  initValue: PropTypes.string,
  /** Array of objects with value and label */
  optionList: PropTypes.array.isRequired,
  /** Function called on dropdown change */
  handleChange: PropTypes.func,

  /** Slider label content */
  label: PropTypes.string,
  /** id */
  id: PropTypes.string,
};
