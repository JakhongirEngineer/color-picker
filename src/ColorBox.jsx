import React from "react";
import "./ColorBox.css";
function ColorBox({ backgroundColor, name }) {
  return (
    <div className="ColorBox" style={{ backgroundColor }}>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button">Copy</button>
      </div>
      <span className="see-more"> MORE </span>
    </div>
  );
}

export default ColorBox;
