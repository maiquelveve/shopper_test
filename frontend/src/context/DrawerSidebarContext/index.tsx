import { createContext, useContext, useState } from "react";

const DrawerSidebarContext = createContext({} as IDrawerSidebarContext);

export const useDrawerSidebarContext = () => {
  return useContext(DrawerSidebarContext);
};

export const DrawerSidebarProvider: React.FC<IAppProps & ILayoutDashboardProps> = ({ children, window }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = 250;

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <DrawerSidebarContext.Provider value={{
      drawerWidth,
      container,
      mobileOpen,
      handleDrawerToggle,
    }}>
      {children}
    </DrawerSidebarContext.Provider>
  );
};
