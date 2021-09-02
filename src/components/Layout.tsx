import React from "react";
import { Box } from "@material-ui/core";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => (
  <Box display="flex" minHeight="100vh" flexGrow={1} justifyContent="center" alignItems="center">
    <Navbar />
    {children}
  </Box>
);
