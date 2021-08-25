import React from "react";
import "./ColorBox.css";
function ColorBox({ backgroundColor, name }) {
  return (
    <div className="ColorBox" style={{ backgroundColor }}>
      <span>{name}</span>
      <span> MORE </span>
    </div>
  );
}

export default ColorBox;
