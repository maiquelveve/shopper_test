import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const navigate= useNavigate();
  return(
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => navigate("/")} >HOME</Button>
    </Stack>
  );
};
