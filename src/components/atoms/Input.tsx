import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "./Flag";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
        margin: 0,
      },
  },

  inputAdornmentStart: {
    marginRight: theme.spacing(1),
  },
}));

interface InputProps extends OutlinedInputProps {
  loading: boolean;
  currencyValue: string;
  code: string;
}

const Input: React.FC<InputProps> = ({ loading, currencyValue, code, onChange, ...restProps }) => {
  const classes = useStyles();
  const formattedCode = code.substring(0, 2);

  return (
    <OutlinedInput
      className={classes.input}
      type="number"
      placeholder="0"
      startAdornment={
        <InputAdornment className={classes.inputAdornmentStart} position="start">
          <Flag code={formattedCode} />
        </InputAdornment>
      }
      fullWidth
      value={currencyValue}
      endAdornment={
        <InputAdornment position="end">
          <Typography variant="subtitle1">{code}</Typography>
        </InputAdornment>
      }
      onChange={onChange}
      {...restProps}
    />
  );
};

export default Input;
