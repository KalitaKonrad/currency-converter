import React from "react";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";

interface FlagProps {
  code: string;
}
const Flag: React.FC<FlagProps> = ({ code }) => (
  <ReactCountryFlag
    countryCode={code}
    svg
    style={{
      width: "2rem",
      height: "2rem",
      paddingRight: "0.75rem",
    }}
    title={code}
  />
);

export default Flag;
