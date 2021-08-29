import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

function PaletteList({ palettes }) {
  return (
    <div>
      {palettes.map((palette) => {
        return <MiniPalette {...palette} />;
      })}
    </div>
  );
}

export default PaletteList;
