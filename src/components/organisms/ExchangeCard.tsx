import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { capitalize } from "../utils/utils";
import Input from "../atoms/Input";
import ExchangeCardMenu from "../molecules/Menu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCurrenciesData } from "../../features/currencies/currenciesSlice";
import { Box, Typography } from "@material-ui/core";
import { Layout } from "../Layout";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 20,
    marginBottom: 1,
  },
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
  },
  financialCircularProgress: {
    marginLeft: "0.5rem",
  },
  exchangeRate: {
    display: "flex",
    justifyContent: "center",
  },
}));

const ExchangeCard = () => {
  const classes = useStyles();
  const currencies = useAppSelector(state => state.currencies.currencies);
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

  const getCurrencyName = (index: number) =>
    currencies?.[index]?.currency ? capitalize(currencies?.[index]?.currency?.trim()) : "";

  const getCurrencyCode = (index: number) => currencies[index].code;

  const calculateCurrencyFactor = () => {
    const exchangeRate = (currencies[sendIndex].mid / currencies[receiveIndex].mid).toFixed(2);
    return `1 ${sendCurrencyCode} = ${exchangeRate} ${receiveCurrencyCode}`;
  };

  const sendCurrencyCode = currencies?.length > 0 ? getCurrencyCode(sendIndex) : "";
  const receiveCurrencyCode = currencies?.length > 0 ? getCurrencyCode(receiveIndex) : "";

  return (
    <Box display="flex" maxWidth={500} justifyContent="center" alignItems="center">
      <Paper elevation={3}>
        <Box
          display="flex"
          p={3}
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <Typography variant="h4" align="center">
            Currency Converter
          </Typography>
          <List>
            <ListItem>
              <InputLabel className={classes.label}>From</InputLabel>
            </ListItem>
            <ListItem>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                startIcon={<AttachMoneyIcon />}
                color="primary"
                variant="outlined"
                onClick={handleClick}>
                Choose Currency
              </Button>
            </ListItem>
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
            <ListItem>
              <Button
                aria-controls="menu"
                aria-haspopup="true"
                startIcon={<AttachMoneyIcon />}
                color="primary"
                variant="outlined"
                onClick={secondHandleClick}>
                Choose Currency
              </Button>
            </ListItem>
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
            {currencies && sendIndex && receiveIndex ? (
              <ListItem classes={{ root: classes.exchangeRate }}>
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column">
                  <Typography variant="h5">Current exchange rate</Typography>
                  <Typography variant="subtitle1">{calculateCurrencyFactor()}</Typography>
                </Box>
              </ListItem>
            ) : null}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default ExchangeCard;
