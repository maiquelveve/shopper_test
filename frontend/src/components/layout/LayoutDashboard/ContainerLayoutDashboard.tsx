import { Box, Toolbar } from "@mui/material";

import { useDrawerSidebarContext } from "../../../context";

export const ContainerLayoutDashboard: React.FC<IAppProps> = ({ children }) => {
  const { drawerWidth } = useDrawerSidebarContext();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
      <Toolbar />
      {children}
    </Box>
  );
};
