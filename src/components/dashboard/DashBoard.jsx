import {
  Box,
  Paper,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { MoreVert, Print } from "@mui/icons-material";
import MyChartBar from "./myCharts/MyChartBar";
import MyChartLine from "./myCharts/MyChartLine";
import MyChartBubble from "./myCharts/MyChartBubble";
import { useState } from "react";

const colors = {
  primary: "#bc8839",
  secondary: "#559971",
  third: "#8a4f35",
  fourth: "#5d9a47",
  background: "#f1dbba",
};

const DashBoard = () => {
  const cardStyle = {
    borderRadius: "15px",
    background: colors.background,
    width: "300px",
    height: "150px",
    padding: "0.65rem",
  };
  return (
    <Box
      sx={{ background: "#eaeaea" }}
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Paper
        elevation={0}
        sx={{
          width: "250px",
          height: "90%",
          background: colors.secondary,
        }}
      >
        <MenuButton />
      </Paper>

      <Box
        padding="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Grid container spacing={4} marginBottom="0.65rem">
          <Grid item lg="auto">
            <Paper elevation={0} sx={cardStyle}>
              <Box width="100%">
                <MyChartLine colors={colors} />
              </Box>
            </Paper>
          </Grid>
          <Grid item lg="auto">
            <Paper elevation={0} sx={cardStyle}>
              <MyChartBubble colors={colors} />
            </Paper>
          </Grid>
          <Grid item lg="auto">
            <Paper elevation={0} sx={cardStyle}></Paper>
          </Grid>
        </Grid>
        <Box width="90%" display="flex">
          <MyChartBar colors={colors} />
        </Box>
      </Box>
    </Box>
  );
};

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <IconButton
        id="button-dashboard"
        aria-controls={open ? "menu-dashboard" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "button-dashboard",
        }}
        color={colors.secondary}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Print fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Report</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashBoard;
