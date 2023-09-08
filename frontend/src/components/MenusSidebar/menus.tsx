import { List, Stack } from "@mui/material";
import { Home } from "@mui/icons-material";

import { ListItemsMenu } from "./ListItemsMenu";

export const Menus: React.FC = () => {
  
  const menus: ISidebarMenus[] = [
    { name: "Inicio", to: "/", Icon: <Home />  }
  ];

  return (
    <Stack flex={1}>
      <List>
        {menus.map((menu, index) => (
          <ListItemsMenu key={index} {...menu} />
        ))}
      </List>
    </Stack>
  );
};
