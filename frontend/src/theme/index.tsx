import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#078d03",
      dark: "#1b5e20",
      light: "#0abf04",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0d05f2",
      dark: "#362ffb",
      light: "#1565c0",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f6f3",
      paper: "#ffffff",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#ffffff"
        }
      }
    },
  },
});
