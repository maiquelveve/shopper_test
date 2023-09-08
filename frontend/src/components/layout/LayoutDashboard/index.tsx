import { Box, CssBaseline, } from "@mui/material";

import { DrawerSidebarProvider } from "../../../context";
import { DrawerSidebar, AppBarContainer } from "../../index";
import { ContainerLayoutDashboard } from "./ContainerLayoutDashboard";

export const LayoutDashboard: React.FC<IAppProps> = ({ children }) => {

  return (
    <>
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        flexDirection="column"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Box sx={{ display: "flex"}} >
          <DrawerSidebarProvider>
            <AppBarContainer />
            <DrawerSidebar />
            <ContainerLayoutDashboard>
              {children}
            </ContainerLayoutDashboard>
          </DrawerSidebarProvider>
        </Box>
      </Box>
    </>
  );
};
