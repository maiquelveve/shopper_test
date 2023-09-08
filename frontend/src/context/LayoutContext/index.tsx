import { createContext, useContext } from "react";
import { ThemeProvider } from "@mui/material";

import { lightTheme } from "../../theme";

const LayoutContext = createContext({});

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider: React.FC<IAppProps> = ({ children }) => {
  return (
    <LayoutContext.Provider value={{ }}>
      <ThemeProvider theme={lightTheme}>
        {children}
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};
