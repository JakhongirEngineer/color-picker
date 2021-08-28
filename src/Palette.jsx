import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

function Palette(props) {
  const [level, setLevel] = useState(500);

  const colorBoxes = props.palette.colors[level].map((color) => {
    return <ColorBox backgroundColor={color.hex} name={color.name} />;
  });
  return (
    <div className="Palette">
      {/* header */}
      <Slider
        value={level}
        min={100}
        max={900}
        step={100}
        onChange={(val) => setLevel(val)}
      />

      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
