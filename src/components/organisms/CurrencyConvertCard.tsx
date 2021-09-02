import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Input from "../atoms/Input";
import ExchangeCardMenu from "../molecules/Menu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrenciesData,
  setFirstCurrency,
  setSecondCurrency,
} from "../../features/currencies/currenciesSlice";
import { Box, Typography } from "@material-ui/core";

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

const CurrencyConvertCard = () => {
  const classes = useStyles();
  const { firstCurrency, status, secondCurrency } = useAppSelector(state => state.currencies);

  const dispatch = useAppDispatch();

  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
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
  };

  const secondHandleClick = (event: React.SyntheticEvent) => {
    setSecondAnchorElement(event.currentTarget);
  };

  const secondHandleClose = () => {
    setSecondAnchorElement(null);
  };

  const calculateSendCurrency = (value: string) => {
    setReceiveCurrency(value);

    if (firstCurrency && secondCurrency) {
      const finalValue = ((firstCurrency.mid / secondCurrency.mid) * parseInt(value, 10)).toFixed(
        2
      );

      setSendCurrency(finalValue);
    }
  };

  const calculateReceiveCurrency = (value: string) => {
    setSendCurrency(value);

    if (firstCurrency && secondCurrency) {
      const finalValue = ((firstCurrency.mid / secondCurrency.mid) * parseInt(value, 10)).toFixed(
        2
      );

      setReceiveCurrency(finalValue);
    }
  };

  useEffect(() => {
    calculateReceiveCurrency(sendCurrency);
  }, [firstCurrency, secondCurrency]);

  const calculateCurrencyFactor = () => {
    if (firstCurrency && secondCurrency) {
      const exchangeRate = (firstCurrency.mid / secondCurrency.mid).toFixed(2);

      return `1 ${firstCurrency.code} = ${exchangeRate} ${secondCurrency.code}`;
    }
    return undefined;
  };

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
              onMenuItemClick={currency => {
                dispatch(setFirstCurrency(currency));
                handleClose();
              }}
            />
            <ListItem>
              <Input
                currencyValue={sendCurrency}
                loading={status === "loading"}
                code={firstCurrency?.code ?? ""}
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
              onMenuItemClick={currency => {
                dispatch(setSecondCurrency(currency));
                secondHandleClose();
              }}
            />
            <ListItem>
              <Input
                currencyValue={receiveCurrency}
                loading={status === "loading"}
                code={secondCurrency?.code ?? ""}
                onChange={e => calculateSendCurrency(e.target.value)}
              />
            </ListItem>
            {sendCurrency && receiveCurrency ? (
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

export default CurrencyConvertCard;
