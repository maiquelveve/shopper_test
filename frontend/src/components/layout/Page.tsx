import { Box, Typography } from "@mui/material";

export const Page: React.FC<IAppProps & IPagedProps> = ({ children, title }) => {
  return(
    <Box p={2} flexDirection="column" flex={1}>
      <Box mb={2}>
        <Typography variant="h4">
          {title}
        </Typography>
      </Box>
      <Box display="flex">
        {children}
      </Box>
    </Box>
  );
};
