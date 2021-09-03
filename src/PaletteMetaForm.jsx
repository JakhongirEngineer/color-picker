import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function PaletteMetaForm({ palettes, handleAddPalette }) {
  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setOpen(false);
    setOpenEmoji(true);
  };

  const handlePickerSelect = (e) => {
    setEmoji(e.native);
    handleAddPalette(newPaletteName, e.native);
    setOpenEmoji(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to name your dialog uniquely. No duplication is allowed.
          </DialogContentText>
          <ValidatorForm onSubmit={handleNext}>
            <TextValidator
              name="newPaletteName"
              value={newPaletteName}
              onChange={(e) => setNewPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "this field is required",
                "palette name must be unique",
              ]}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>

              <Button variant="contained" color="primary" type="submit">
                NEXT
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEmoji}
        onClose={() => setOpenEmoji(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
        <Picker
          native={true}
          title="Pick an Emoji"
          onSelect={handlePickerSelect}
        />
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
