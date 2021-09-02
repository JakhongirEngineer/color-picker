import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ColorPickerFormStyles from "./styles/ColorPickerFormStyles";

function ColorPickerForm({ handleAddNewColor, isPaletteFull, colors }) {
  const classes = ColorPickerFormStyles();

  const [currentColor, setCurrentColor] = useState("red");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(
        ({ color }) => color.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
        className={classes.chromePicker}
      />
      <ValidatorForm
        onSubmit={() =>
          handleAddNewColor({ color: currentColor, name: newName })
        }
        className={classes.validatorForm}
      >
        <TextValidator
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "color name must be unique",
            "color has already been taken",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: currentColor }}
          type="submit"
          disabled={isPaletteFull}
          className={classes.button}
        >
          {isPaletteFull ? "PALETTE IS FULL" : "ADD COLOR"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
