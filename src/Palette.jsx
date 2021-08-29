import React, { useState, useEffect } from "react";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    setOpenSnackbar(true);
  }, [format]);
  console.log("palette: ", palette);
  const colorBoxes = palette.colors[level].map((color) => {
    return (
      <ColorBox
        backgroundColor={color[format]}
        name={color.name}
        paletteId={palette.id}
        colorId={color.id}
      />
    );
  });
  return (
    <div className="Palette">
      <Navbar
        level={level}
        setLevel={setLevel}
        format={format}
        setFormat={setFormat}
      />

      <div className="Palette-colors">{colorBoxes}</div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message={"Format is changed to " + format.toUpperCase()}
        action={[
          <IconButton onClick={() => setOpenSnackbar(false)} color="inherit">
            <CloseIcon />
          </IconButton>,
        ]}
      />

      <footer className="Palette-footer">
        {palette.paletteName}
        <span className="Palette-footer-emoji">{palette.emoji}</span>
      </footer>
    </div>
  );
}

export default Palette;
