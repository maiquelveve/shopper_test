import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

export const FooterContainerDrawerSidebar: React.FC = () => {
  const navigate = useNavigate();

  return(
    <Box>
      <Divider />
      <List component="nav">
        <ListItemButton onClick={() => navigate("/acessos")}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={"Criar uma conta"} />
        </ListItemButton>
      </List> 
    </Box>
  );
};
