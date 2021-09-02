import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrenciesData,
  setBaseCurrency,
  setCurrencyTableAmount,
  Status,
} from "../../features/currencies/currenciesSlice";
import { Box, CircularProgress } from "@material-ui/core";
import Flag from "../atoms/Flag";
import ExchangeCardMenu from "./Menu";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Button from "@material-ui/core/Button";
import Input from "../atoms/Input";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const CurrencyTable = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { currencies, status, baseCurrency, currencyTableAmount } = useAppSelector(
    state => state.currencies
  );
  const [anchorElement, setAnchorElement] = useState<Element | null>(null);

  useEffect(() => {
    if (currencies?.length === 0 || status === Status.ERROR) {
      dispatch(fetchCurrenciesData());
    }
  }, []);

  const handleSelectCurrency = (event: React.SyntheticEvent) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return status === Status.LOADING ? (
    <CircularProgress size={40} />
  ) : status === Status.ERROR ? (
    <h1>error</h1>
  ) : (
    <Box display="flex" flexDirection="column" mb={4} mt={12}>
      <Box mb={2}>
        <Button
          aria-controls="menu"
          aria-haspopup="true"
          startIcon={<AttachMoneyIcon />}
          color="primary"
          variant="outlined"
          onClick={handleSelectCurrency}>
          Choose Currency
        </Button>
      </Box>
      <ExchangeCardMenu
        anchorElement={anchorElement}
        open={!!anchorElement}
        onClose={handleClose}
        onMenuItemClick={currency => {
          dispatch(setBaseCurrency(currency));
          handleClose();
        }}
      />
      <Box maxWidth={350} pb={3}>
        <Input
          currencyValue={currencyTableAmount.toString()}
          code={baseCurrency?.code ?? ""}
          onChange={e => dispatch(setCurrencyTableAmount(parseInt(e.target.value, 10)))}
        />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Currency</StyledTableCell>
                <StyledTableCell align="center">Flag</StyledTableCell>
                <StyledTableCell align="center">Rate</StyledTableCell>
                <StyledTableCell align="center">After Conversion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map(({ code, currency, mid: rate }) => {
                const flag = code.substring(0, 2);
                const baseCurrencyRate = baseCurrency?.mid ?? 1;

                const exchangeRate = ((baseCurrencyRate / rate) * currencyTableAmount).toFixed(2);

                return (
                  <StyledTableRow key={code}>
                    <StyledTableCell align="center">{currency}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Box display="flex" justifyContent="flex-end">
                        <Flag code={flag} />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">{rate}</StyledTableCell>
                    <StyledTableCell align="center">{exchangeRate}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
