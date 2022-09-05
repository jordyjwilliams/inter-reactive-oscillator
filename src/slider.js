export default function Slider({ min, max, val, onSlide, label }) {
  // requires min, mix, val, onSlider, label
  return (
    <div>
      <br />
      <label htmlFor="numeric-input-slider-val">{label}</label>
      <input
        type="number"
        id="numeric-input-slider-val"
        htmlFor="slider-input"
        value={val}
        onChange={(val) => onSlide(val)}
      />
      <input
        name="slider"
        type="range"
        id="slider-input"
        min={min}
        max={max}
        defaultValue={val}
        value={val}
        onChange={(slideValue) => onSlide(slideValue)}
      />
    </div>
  );
}
