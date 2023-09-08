import { CircularProgress, Typography, Box } from "@mui/material";

export const LoadingText: React.FC<ILoadingText> = ({ size = 40, text = "Aguarde! Carregando...", color = "primary" }) => {
  return(
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <CircularProgress size={size} color={color} sx={{ mb: 2 }} />
      <Typography>
        {text}
      </Typography>
    </Box>
  );
};
