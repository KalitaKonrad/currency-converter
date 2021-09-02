import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "../atoms/Flag";
import Typography from "@material-ui/core/Typography";
import { useAppSelector } from "../../app/hooks";
import { Currency } from "../../features/currencies/currenciesSlice";
import { capitalize } from "../utils/utils";

const useStyles = makeStyles(() => ({
  currencyName: {
    fontSize: 14,
  },
  menuItem: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
}));

interface ExchangeCardMenuProps {
  anchorElement: Element | null;
  open: boolean;
  onClose: () => void;
  onMenuItemClick: (currency: Currency) => void;
  loading: boolean;
}

const ITEM_HEIGHT = 70;

const ExchangeCardMenu: React.FC<ExchangeCardMenuProps> = ({
  anchorElement,
  open,
  onClose,
  onMenuItemClick,
  loading,
  ...restProps
}) => {
  const classes = useStyles();
  const currencies = useAppSelector(state => state.currencies.currencies);

  return (
    <Menu
      anchorEl={anchorElement}
      keepMounted
      open={open}
      onClose={onClose}
      {...restProps}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 7,
        },
      }}>
      {currencies.map(currency => {
        const formattedCode = currency.code.substring(0, 2);
        const formattedCurrency = capitalize(currency.currency);

        return (
          <MenuItem
            classes={{
              root: classes.menuItem,
            }}
            key={formattedCode}
            onClick={() => onMenuItemClick(currency)}>
            <Flag code={formattedCode} />
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <Typography variant="body1" className={classes.currencyName}>
                {formattedCurrency}
              </Typography>
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ExchangeCardMenu;
