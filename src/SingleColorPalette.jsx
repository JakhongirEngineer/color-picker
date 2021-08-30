import React from "react";
import { useEffect, useState } from "react";
import ColorBox from "./ColorBox";

function SingleColorPalette({ palette, paletteId, colorId }) {
  const [shades, setShades] = useState();
  useEffect(() => {
    setShades(gatherShades(palette, colorId));
  }, []);

  const gatherShades = (palette, colorId) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  };

  return (
    <div className="Palette">
      <h1>single color</h1>

      <div className="Palette-colors">
        {shades &&
          shades.map((shade) => {
            console.log("shade: ", shade.hex);
            return (
              <ColorBox
                key={shade.name}
                backgroundColor={shade.hex}
                name={shade.name}
                showLink={false}
              />
            );
          })}
      </div>
      {/* <footer>footer</footer> */}
    </div>
  );
}

export default SingleColorPalette;
