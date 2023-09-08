import { IconButton } from "@mui/material";
import { LockOpen } from "@mui/icons-material";

import { AppBarDefault } from "../AppBarDefault";
import { useNavigate } from "react-router-dom";

export const AppBarContainer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBarDefault>
      <IconButton aria-label="delete" size="small" onClick={() => navigate("/")}>
        <LockOpen fontSize="medium" />
      </IconButton>
    </AppBarDefault>
  );
};
