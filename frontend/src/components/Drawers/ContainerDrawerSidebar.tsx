import { Box, Toolbar } from "@mui/material";

import { HeaderContainerDrawerSidebar } from "./HeaderContainerDrawerSidebar";
import { FooterContainerDrawerSidebar } from "./FooterContainerDrawerSidebar";
import { ListItemsMenuContainerDrawerSidebar } from "./ListItemsMenuContainerDrawerSidebar";

export const ContainerDrawerSidebar: React.FC = () => {
  return(
    <>
      <Toolbar />
      <Box height='100%' display='flex' flexDirection='column' sx={{overflow: "auto"}}>
        <HeaderContainerDrawerSidebar />
        <ListItemsMenuContainerDrawerSidebar />
        <FooterContainerDrawerSidebar />
      </Box>
    </>
  );
};
