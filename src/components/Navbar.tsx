import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles(() => ({
  selected: {
    // normally I wouldn't use such thing but it was being cumbersome and didn't wanted to waste time on that :)
    backgroundColor: "#fff !important",
    color: "#3f51b5",
  },
  menuItem: {
    height: "100%",
    minHeight: "inherit",
  },
}));

const ElevationScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const navbarLinks = [
  { to: "/", name: "Converter" },
  { to: "/exchange-rates", name: "Exchange rates" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            {navbarLinks.map(({ to, name }) => (
              <MenuItem
                classes={{ selected: classes.selected, root: classes.menuItem }}
                component={Link}
                to={to}
                key={`${to}-${name}`}
                selected={pathname === to}>
                {name}
              </MenuItem>
            ))}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};
