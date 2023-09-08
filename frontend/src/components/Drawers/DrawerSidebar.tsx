import { Box, Drawer } from "@mui/material";

import { useDrawerSidebarContext } from "../../context";

import { ContainerDrawerSidebar } from "./ContainerDrawerSidebar";

export const DrawerSidebar: React.FC = () => {
  const { drawerWidth, mobileOpen, handleDrawerToggle, container } = useDrawerSidebarContext();

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth, 
            borderRightWidth: 2.5, 
            borderRightColor: "grey",  
          },
        }}
      >
        <ContainerDrawerSidebar />
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: drawerWidth, 
            borderRightWidth: 2.5, 
            borderRightColor: "grey",  
          },
        }}        
      >
        <ContainerDrawerSidebar />
      </Drawer>
    </Box>
  );
};
