interface IDrawerSidebarContext {
  drawerWidth: number;
  mobileOpen: boolean
  container: (() => HTMLElement) | undefined;
  handleDrawerToggle: () => void;
}
