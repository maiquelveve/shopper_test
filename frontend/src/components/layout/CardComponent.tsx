import { Box, Card } from "@mui/material";

export const CardComponent: React.FC<IAppProps> = ({ children }) => {
  return(
    <Card elevation={24} sx={{ borderRadius: 4, width: "100%" }}>
      <Box p={2}>
        {children}
      </Box>
    </Card>
  );
};
