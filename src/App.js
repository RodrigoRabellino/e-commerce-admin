import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux/es/exports";
import "./App.css";
import AdminLogin from "./components/login/AdminLogin";
import MySnackBar from "./components/snackBar/MySnackBar";
import MyRoutes from "./MyRoutes";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#BF8832",
      contrastText: "#F2DBB8",
      dark: "#8C5032",
    },
    secondary: {
      main: "#8C5032",
      light: "#F2DBB8",
      contrastText: "#F2DBB8",
    },
    background: {
      default: "#fafbfd",
      paper: "#fafbfd",
    },
  },
  typography: {
    fontFamily: ["Raleway"],
  },
});

function App() {
  const admin = useSelector((state) => state.admin);
  console.log("admin desde app", admin);
  return (
    <ThemeProvider theme={myTheme}>
      <SnackbarProvider maxSnack={4}>
        <div className="App">
          <>
            {Object.entries(admin).length === 0 ? <AdminLogin /> : <MyRoutes />}
            <MySnackBar />
          </>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
