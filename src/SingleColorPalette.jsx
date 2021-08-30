import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import Navbar from "./Navbar";

function SingleColorPalette({ palette, colorId }) {
  const [format, setFormat] = useState("hex");
  const [shades, setShades] = useState();
  const history = useHistory();

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
    <div className="Palette SingleColorPalette">
      <Navbar format={format} setFormat={setFormat} showSlider={false} />

      <div className="Palette-colors">
        {shades &&
          shades.map((shade) => {
            console.log("shade: ", shade.hex);
            return (
              <ColorBox
                key={shade.name}
                backgroundColor={shade[format]}
                name={shade.name}
                showLink={false}
              />
            );
          })}
        <div className="ColorBox go-back" onClick={() => history.goBack()}>
          <span className="copy-button">go back</span>
        </div>
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
}

export default SingleColorPalette;
