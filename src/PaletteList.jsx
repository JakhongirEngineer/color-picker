import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

const useStyles = makeStyles({
  root: {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "white",
    fontSize: "2rem",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
});

function PaletteList({ palettes, deletePalette }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React palettes</h1>
          <Link to="/palette/new">
            <Button variant="contained" color="primary">
              Create Palette
            </Button>
          </Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => {
            return <MiniPalette {...palette} deletePalette={deletePalette} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PaletteList;
