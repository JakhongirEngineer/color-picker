import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: (props) => ({
    backgroundColor: props.color,
    width: "20%",
    height: "25%",
  }),
});

function DraggableColorBox({ color, name }) {
  const classes = useStyles({ color });

  return <div className={classes.root}>{color.color}</div>;
}

export default DraggableColorBox;
