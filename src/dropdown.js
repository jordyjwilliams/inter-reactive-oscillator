export default function Dropdown(props) {
  // Requires props of: initValue, handleChange, optionList
  // Creates drop down of optionList. Calls handleChange for event change.
  return (
    <div>
      <label>
        {" "}
        {props.label}
        <select value={props.initValue} onChange={props.handleChange}>
          {props.optionList.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
