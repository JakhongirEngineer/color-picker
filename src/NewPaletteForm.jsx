import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    height: "calc(100vh - 64px)",

    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm({ addPalette, palettes }) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const [colors, setColors] = useState(palettes[0].colors);

  const history = useHistory();
  const MAX_PALETTE_SIZE = 20;
  let isPaletteFull = colors.length >= MAX_PALETTE_SIZE;

  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
  //     return colors.every(
  //       ({ name }) => name.toLowerCase() !== value.toLowerCase()
  //     );
  //   });

  //   ValidatorForm.addValidationRule("isColorUnique", (value) => {
  //     return colors.every(
  //       ({ color }) => color.toLowerCase() !== value.toLowerCase()
  //     );
  //   });
  // });

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

  const handleAddPalette = (newPaletteName) => {
    let newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "(:)",
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
    console.log(flattenedColors);
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
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
        <div>
          <Button variant="contained" color="secondary" onClick={clearPalette}>
            Clear Palette
          </Button>
          <Button
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
