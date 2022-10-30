export default function Slider({ min, max, step, val, onSlide, label, id }) {
  // requires min, mix, val, onSlider, label
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
