import { Box, Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">
        This page not found!!
      </Typography>
    </Box>
  );
};

export default NotFound;
