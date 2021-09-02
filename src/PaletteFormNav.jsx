import React from "react";

import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";

function PaletteFormNav({
  handleAddPalette,
  open,
  classes,
  handleDrawerOpen,
  palettes,
}) {
  const history = useHistory();

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar className={classes.navContainer}>
          <div className={classes.navLeft}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              New Palette
            </Typography>
          </div>

          <div className={classes.navRight}>
            <PaletteMetaForm
              handleAddPalette={handleAddPalette}
              palettes={palettes}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => history.push("/")}
            >
              Go Back
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
