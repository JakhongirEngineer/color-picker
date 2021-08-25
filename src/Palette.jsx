import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

function Palette(props) {
  const colorBoxes = props.colors.map((color) => {
    return <ColorBox backgroundColor={color.color} name={color.name} />;
  });
  return (
    <div className="Palette">
      {/* header */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
