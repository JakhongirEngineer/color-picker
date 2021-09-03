import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Avatar, Button, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CloseIcon from "@material-ui/icons/Close";

import MiniPalette from "./MiniPalette";
import bg from "./styles/bg.svg";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".remove-btn": {
      marginRight: "0.5rem",
    },
    ".item-enter": {
      opacity: "0.1",
    },
    ".item-enter-active": {
      opacity: 1,
      transition: "opacity 500ms ease-in-out",
    },
    ".item-exit": {
      opacity: 1,
    },
    ".item-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-in-out",
    },
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#292BFF",
    backgroundImage: `url(${bg})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  container: {
    width: "80%",
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
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5rem",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 40%)",
      gridGap: "3rem",
    },
  },
}));

function PaletteList({ palettes, deletePalette }) {
  const classes = useStyles();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletedPaletteId, setDeletedPaletteId] = useState("");

  const openDialog = (id) => {
    setIsDeleteDialogOpen(true);
    setDeletedPaletteId(id);
  };

  const closeDialog = () => {
    setDeletedPaletteId("");
    setIsDeleteDialogOpen(false);
  };

  const handleDeletePalette = () => {
    deletePalette(deletedPaletteId);
    closeDialog();
  };

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
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <CSSTransition key={palette.id} timeout={500} classNames="item">
                <MiniPalette {...palette} openDialog={openDialog} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <Dialog open={isDeleteDialogOpen} aria-labelledBy="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">
          Do you want to delete this Palette?
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem button onClick={() => handleDeletePalette()}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "rgba(0,0,255,0.5" }}>
                  <DoneOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>

            <ListItem button autoFocus onClick={() => closeDialog()}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "rgba(0,255,0,0.5" }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PaletteList;
