import { CircularProgress } from "@mui/material";

export const LoadingSimple: React.FC<ILoadingSimple> = ({ size = 40, color = "primary" }) => {
  return(
    <CircularProgress size={size} color={color} />
  );
};
