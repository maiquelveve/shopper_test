/* eslint-disable indent */
import { Box } from "@mui/material";

import removebgmain from "../../assets/removebg-main.png";

export const Logo: React.FC<ILogo> = ({ width = 100, height = 50 }) => {
  return (
    <Box width="100%">
      <img src={removebgmain} alt="logo" width={width} height={height} />
    </Box>
  );
};
