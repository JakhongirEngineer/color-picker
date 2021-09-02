import React from "react";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import NewPaletteFormStyles from "./NewPaletteFormStyles";

function NewPaletteForm({ addPalette, palettes }) {
  const classes = NewPaletteFormStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);
  const history = useHistory();
  const MAX_PALETTE_SIZE = 20;
  let isPaletteFull = colors.length >= MAX_PALETTE_SIZE;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddNewColor = (colorToAdd) => {
    const newColor = {
      color: colorToAdd.color,
      name: colorToAdd.name,
    };
    setColors([...colors, newColor]);
  };

  const handleAddPalette = (newPaletteName, emoji) => {
    let newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji,
      colors: colors,
    };
    addPalette(newPalette);
    setColors([]);
    history.push("/");
  };

  const deleteColor = (name) => {
    let filteredColors = colors.filter((color) => color.name !== name);
    setColors(filteredColors);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearPalette = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const flattenedColors = palettes.map((palette) => palette.colors).flat();
    const randomIndex = Math.floor(Math.random() * flattenedColors.length);
    setColors([...colors, flattenedColors[randomIndex]]);
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleAddPalette={handleAddPalette}
        palettes={palettes}
      />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.btns}>
          <Button
            style={{ fontSize: "0.6rem" }}
            variant="contained"
            color="secondary"
            onClick={clearPalette}
          >
            Clear Palette
          </Button>
          <Button
            style={{ fontSize: "0.6rem" }}
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={isPaletteFull}
          >
            Randomly Generate
          </Button>
        </div>

        <ColorPickerForm
          handleAddNewColor={handleAddNewColor}
          isPaletteFull={isPaletteFull}
          colors={colors}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {/* <div> */}
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
        {/* </div> */}
      </main>
    </div>
  );
}

export default NewPaletteForm;
