import { Box, List } from "@mui/material";

import { Menus } from "../index";

export const ListItemsMenuContainerDrawerSidebar: React.FC = () => {
 
  return(
    <Box flex={1}>
      <List component="nav">
        <Menus />
      </List> 
    </Box>
  );
};
