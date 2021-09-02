import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    "& .chromePicker": {
      width: "100%",
    },
  },
  validatorForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginTop: "1rem",
  },
});
