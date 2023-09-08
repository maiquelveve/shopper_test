import { Box, Divider, useTheme } from "@mui/material";

import { Logo } from "..";

export const HeaderContainerDrawerSidebar: React.FC = () => {
  const theme = useTheme();

  return(
    <>
      <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center' >
        <Box>
          <Logo type="removebgmain"  />
        </Box>
      </Box>
      <Divider />
    </>
  );
};
