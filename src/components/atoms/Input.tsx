import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutlinedInput, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import { countryCodes } from "../utils/utils";
import Flag from "./Flag";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
  },
  inputAdornmentStart: {
    marginRight: theme.spacing(1),
  },
}));

interface InputProps extends OutlinedInputProps {
  loading: boolean;
  currencyValue: string;
  currencyCode: string;
  index: number;
}

const Input: React.FC<InputProps> = ({
  loading,
  currencyValue,
  currencyCode,
  index,
  onChange,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <OutlinedInput
      className={classes.input}
      type="number"
      startAdornment={
        <InputAdornment className={classes.inputAdornmentStart} position="start">
          <Flag code={countryCodes[index]} />
        </InputAdornment>
      }
      fullWidth
      value={currencyValue}
      endAdornment={
        <InputAdornment position="end">
          {loading ? <CircularProgress size={25} /> : <b>{currencyCode}</b>}
        </InputAdornment>
      }
      onChange={onChange}
      {...restProps}
    />
  );
};

export default Input;
