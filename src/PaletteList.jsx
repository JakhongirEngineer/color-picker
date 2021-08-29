import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

const useStyles = makeStyles({
  root: {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    border: "1px solid white",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "green",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
});

function PaletteList({ palettes }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>Navigation</nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => {
            return <MiniPalette {...palette} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PaletteList;
