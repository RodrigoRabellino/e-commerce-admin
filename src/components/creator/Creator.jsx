import { Box, Grid, Button } from "@mui/material";

const Creator = () => {
  const buttonStyle = { width: "100%", height: "75px", borderRadius: "0" };
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={2} sx={{ width: "75%" }}>
        <Grid item xs={4}>
          <Button disableElevation variant="contained" sx={buttonStyle}>
            New Product
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button disableElevation variant="contained" sx={buttonStyle}>
            New Category
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button disableElevation variant="contained" sx={buttonStyle}>
            New Admin
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            disableElevation
            variant="contained"
            sx={buttonStyle}
          ></Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            disableElevation
            variant="contained"
            sx={buttonStyle}
          ></Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            disableElevation
            variant="contained"
            sx={buttonStyle}
          ></Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Creator;
