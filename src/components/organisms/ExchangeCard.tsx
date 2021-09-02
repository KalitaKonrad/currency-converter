import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { capitalize } from "../utils/utils";
import Input from "../atoms/Input";
import ExchangeCardMenu from "../molecules/Menu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCurrenciesData } from "../../features/currencies/currenciesSlice";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "auto",
      marginTop: theme.spacing(15),
      width: theme.spacing(55),
      height: theme.spacing(70),
    },
  },
  title: {
    marginTop: 35,
    marginLeft: 45,
    fontSize: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 1,
  },
  list: {
    width: "100%",
    maxWidth: 390,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
  },
  button: {
    marginLeft: 15,
  },
  financial: {
    fontSize: 21,
  },
  financialCircularProgress: {
    marginLeft: "0.5rem",
  },
}));

const ExchangeCard = () => {
  const classes = useStyles();
  const currencies = useAppSelector(state => state.currencies.currencies);
  const date = useAppSelector(state => state.currencies.date);
  const status = useAppSelector(state => state.currencies.status);

  const dispatch = useAppDispatch();

  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
  const [sendIndex, setSendIndex] = useState(0);
  const [receiveIndex, setReceiveIndex] = useState(1);
  const [anchorElement, setAnchorElement] = useState<Element | null>(null);
  const [secondAnchorElement, setSecondAnchorElement] = useState<Element | null>(null);

  useEffect(() => {
    if (status === "error" || status === "idle") {
      dispatch(fetchCurrenciesData());
    }
  }, []);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const secondHandleClick = (event: React.SyntheticEvent) => {
    setSecondAnchorElement(event.currentTarget);
  };

  const secondHandleClose = () => {
    setSecondAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const calculateSendCurrency = (value: string) => {
    setReceiveCurrency(value);

    const finalValue = (
      (currencies[receiveIndex].mid / currencies[sendIndex].mid) *
      parseInt(value, 10)
    ).toFixed(2);

    setSendCurrency(finalValue);
  };

  const calculateReceiveCurrency = (value: string) => {
    setSendCurrency(value);

    const finalValue = (
      (currencies[sendIndex].mid / currencies[receiveIndex].mid) *
      parseInt(value, 10)
    ).toFixed(2);

    setReceiveCurrency(finalValue);
  };

  const getCurrencyName = (index: number) => {
    if (!currencies || currencies.length === 0) {
      return "";
    }

    const endOfCurrencyName = currencies[index].currency.indexOf("(");

    if (endOfCurrencyName === -1) {
      return capitalize(currencies[index].currency);
    }

    return capitalize(currencies[index].currency.substring(0, endOfCurrencyName));
  };

  const getCurrencyCode = (index: number) => {
    if (!currencies || currencies.length === 0) {
      return "";
    }

    return currencies[index].code;
  };

  const calculateCurrencyFactor = () => {
    if (!currencies || currencies.length === 0) {
      return "";
    }

    return (currencies[sendIndex].mid / currencies[receiveIndex].mid).toFixed(2);
  };

  const sendCurrencyCode = getCurrencyCode(sendIndex);
  const receiveCurrencyCode = getCurrencyCode(receiveIndex);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Currency Converter</h1>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <InputLabel className={classes.label}>From</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="simple-menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={handleClick}>
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={anchorElement}
            loading={status === "loading"}
            onClose={handleClose}
            open={!!anchorElement}
            onMenuItemClick={(index: number) => {
              setSendIndex(index);
              handleClose();
            }}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={sendCurrency}
              currencyCode={sendCurrencyCode}
              loading={status === "loading"}
              index={sendIndex}
              onChange={e => calculateReceiveCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <InputLabel className={classes.label}>To</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={secondHandleClick}>
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={secondAnchorElement}
            loading={status === "loading"}
            onClose={secondHandleClose}
            open={!!secondAnchorElement}
            onMenuItemClick={(index: number) => {
              setReceiveIndex(index);
              secondHandleClose();
            }}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={receiveCurrency}
              currencyCode={receiveCurrencyCode}
              loading={status === "loading"}
              index={receiveIndex}
              onChange={e => calculateSendCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <div className={classes.financial}>
              1 {sendCurrencyCode} =
              {status === "loading" ? (
                <CircularProgress size={20} className={classes.financialCircularProgress} />
              ) : (
                <b> {calculateCurrencyFactor()} </b>
              )}
              {receiveCurrencyCode}
            </div>
          </ListItem>
          <ListItem>
            <InputLabel>
              <b>No transfer fee</b>
            </InputLabel>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default ExchangeCard;
