import React from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MenuItem, Select, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Navbar.css";

const useStyles = makeStyles({
  root: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
});

function Navbar({ level, setLevel, format, setFormat, showSlider = true }) {
  const styleProps = { backgroundColor: "#e9e9e9" };
  const classes = useStyles(styleProps);

  return (
    <header className={`Navbar ${classes.root}`}>
      <div className="logo">
        <Link to="/">ReactColorPicker</Link>
      </div>

      {showSlider && (
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              value={level}
              min={100}
              max={900}
              step={100}
              onChange={(val) => setLevel(val)}
            />
          </div>
        </div>
      )}
      <div className="select-container">
        <Select
          onChange={(e) => setFormat(e.target.value)}
          defaultValue="hex"
          value={format}
        >
          <MenuItem value="hex">HEX</MenuItem>
          <MenuItem value="rgb">RGB</MenuItem>
          <MenuItem value="rgba">RGBA</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default Navbar;
