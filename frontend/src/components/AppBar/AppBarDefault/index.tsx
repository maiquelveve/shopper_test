import { AppBar, Box, IconButton, Toolbar, useTheme, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useDrawerSidebarContext } from "../../../context";
import { Logo } from "../..";

export const AppBarDefault: React.FC<IAppProps> = ({ children }) => {

  const theme = useTheme();
  const { drawerWidth, handleDrawerToggle } = useDrawerSidebarContext();

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Logo type="removebgcontainerwhite" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {children}
      </Toolbar>
    </AppBar>
  );
};
