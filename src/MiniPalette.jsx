import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles({
  root: {
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",

    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    backgroundColor: "grey",
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    marginBottom: "-3.5px",
  },
});

function MiniPalette(props) {
  const { colors, emoji, id, paletteName, deletePalette } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleDeletePalette = (e) => {
    e.stopPropagation();
    deletePalette(id);
  };

  return (
    <div
      className={classes.root}
      onClick={() => history.push(`/palette/${id}`)}
    >
      <HighlightOffIcon onClick={handleDeletePalette} />
      <div className={classes.colors}>
        {colors.map((color) => {
          return (
            <div
              className={classes.miniColor}
              style={{ backgroundColor: color.color }}
              key={color.paletteName}
            />
          );
        })}
      </div>

      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
    // </Link>
  );
}

export default MiniPalette;
