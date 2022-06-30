import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  ViewList,
  Logout,
  AddCircleOutline,
  Cottage,
  Group,
  AccountBalanceWallet,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductList from "../productList/ProductList";
import { useDispatch } from "react-redux";
import { logOutAdmin } from "../../redux/admin/slice";
import DashBoard from "../dashboard/DashBoard";
import Creator from "../creator/Creator";
import UserList from "../userList/UserList";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminMain = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [panelSelected, setPanelSelected] = useState("dashboard");

  const handleLogOut = () => dispatch(logOutAdmin());

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const getPanel = (panel) => {
    console.log(panel);
    switch (panel) {
      case "productList":
        return <ProductList />;
      case "dashboard":
        return <DashBoard />;
      case "creator":
        return <Creator />;
      case "userList":
        return <UserList />;
      default:
        return <DashBoard />;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" textAlign="end">
            Control Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerItems
          open={open}
          handleLogOut={handleLogOut}
          setPanelSelected={setPanelSelected}
        />
      </Drawer>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fafbfd",
          marginTop: "64px",
          overflowY: "scroll",
        }}
      >
        {getPanel(panelSelected)}
      </Box>
    </Box>
  );
};

const DrawerItems = ({ open, handleLogOut, setPanelSelected }) => {
  const items = [
    {
      onClickItem: () => setPanelSelected("dashboard"),
      icon: <DashboardIcon />,
      iconName: "Dashboard",
    },
    {
      onClickItem: () => setPanelSelected("productList"),
      icon: <ViewList />,
      iconName: "Products List",
    },
    {
      onClickItem: () => setPanelSelected("userList"),
      icon: <Group />,
      iconName: "Users List",
    },
    {
      onClickItem: () => setPanelSelected("ordersList"),
      icon: <AccountBalanceWallet />,
      iconName: "Orders List",
    },

    {
      onClickItem: () => setPanelSelected("creator"),
      icon: <AddCircleOutline />,
      iconName: "Create",
    },
  ];

  const actions = [
    {
      onClickAction: () => {
        window.open(process.env.REACT_APP_HOME_COMMERCE, "_blank");
      },
      icon: <Cottage />,
      iconName: "To Commerce",
    },
    {
      onClickAction: handleLogOut,
      icon: <Logout />,
      iconName: "LogOut",
    },
  ];

  return (
    <>
      <List>
        {items.map((item) => {
          const { onClickItem, icon, iconName } = item;
          return (
            <ListItem disablePadding sx={{ display: "block" }} key={iconName}>
              <ListItemButton
                onClick={onClickItem}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={iconName}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {actions.map((action) => {
          const { onClickAction, icon, iconName } = action;
          return (
            <ListItem disablePadding sx={{ display: "block" }} key={iconName}>
              <ListItemButton
                onClick={onClickAction}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={iconName}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default AdminMain;
