import { useCallback } from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";

export const ListItemsMenu: React.FC<ISidebarMenus> = ({ name, to, Icon }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = useCallback((to: string) => {
    navigate(to);
  }, []);

  return (
    <ListItem disablePadding>
      <ListItemButton 
        selected={!!match} 
        onClick={() => handleClick(to)}
        sx={{
          margin: 0.5,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            ":hover": {
              backgroundColor: theme.palette.primary.dark
            },
            borderRadius: 5,
            m: 2,
            px: 3,
          },
          ":hover": {
            borderRadius: 5,
            m: 2,
            px: 3
          }
        }}
      >
        <ListItemIcon>
          {Icon}
        </ListItemIcon>
        <ListItemText>
          <Typography variant={match ? "button" : "body1"} >
            {name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
