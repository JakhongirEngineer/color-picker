import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

function Palette(props) {
  const [level, setLevel] = useState(500);

  const colorBoxes = props.palette.colors[level].map((color) => {
    return <ColorBox backgroundColor={color.hex} name={color.name} />;
  });
  return (
    <div className="Palette">
      {/* header */}
      <Navbar level={level} setLevel={setLevel} />

      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
