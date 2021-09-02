import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "../atoms/Flag";
import { countryCodes } from "../utils/utils";

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
  onMenuItemClick: (value: number) => void;
  loading: boolean;
  getCurrencyName: (value: number) => string;
}

const ITEM_HEIGHT = 70;

const ExchangeCardMenu: React.FC<ExchangeCardMenuProps> = ({
  anchorElement,
  open,
  onClose,
  onMenuItemClick,
  loading,
  getCurrencyName,
  ...restProps
}) => {
  const classes = useStyles();

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
      {countryCodes.map((code, index) => (
        <MenuItem
          classes={{
            root: classes.menuItem,
          }}
          style={{}}
          key={code}
          onClick={() => onMenuItemClick(index)}>
          <Flag code={code} />
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            <h5 className={classes.currencyName}>{getCurrencyName(index)}</h5>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ExchangeCardMenu;
