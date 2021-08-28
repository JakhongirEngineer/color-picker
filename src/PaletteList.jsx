import React from "react";
import { Link } from "react-router-dom";

function PaletteList({ palettes }) {
  console.log(palettes);
  return (
    <div>
      {palettes.map((palette) => {
        return <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>;
      })}
    </div>
  );
}

export default PaletteList;
