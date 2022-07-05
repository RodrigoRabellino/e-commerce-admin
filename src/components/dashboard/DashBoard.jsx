import { Box, Paper, Typography, Stack } from "@mui/material";
import MyChartBar from "./myCharts/MyChartBar";
import MyChartLine from "./myCharts/MyChartLine";
import MyChartBubble from "./myCharts/MyChartBubble";

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
    background: "#ffffff",
    width: "350px",
    height: "200px",
    padding: "1rem",
  };
  return (
    <Box
      display="flex"
      padding="1.5rem"
      justifyContent="space-around"
      alignItems="center"
    >
      <Stack spacing={2}>
        <Paper elevation={3} sx={cardStyle}>
          <Box width="100%">
            <MyChartLine colors={colors} />
          </Box>
        </Paper>
        <Paper elevation={3} sx={cardStyle}>
          <MyChartBubble colors={colors} />
        </Paper>
      </Stack>
      <Box display="flex">
        <Paper
          sx={{
            ...cardStyle,
            width: "850px",
            height: "auto",
            padding: "1.5rem",
          }}
        >
          <Typography fontWeight="600" variant="h5">
            Sales in month
          </Typography>
          <MyChartBar colors={colors} />
        </Paper>
      </Box>
    </Box>
  );
};

// const MenuButton = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "end",
//       }}
//     >
//       <IconButton
//         id="button-dashboard"
//         aria-controls={open ? "menu-dashboard" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         <MoreVert />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "button-dashboard",
//         }}
//         color={colors.secondary}
//       >
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Print fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Print Report</ListItemText>
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

export default DashBoard;
