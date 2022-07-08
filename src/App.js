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
      main: "#ab832a",
      light: "#F2DBB8",
      dark: "#3E2707",
    },
    secondary: {
      main: "#7B8723",
      light: "#f6feea",
      contrastText: "#F2DBB8",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.8)",
      secondary: "#494948;",
    },
    background: {
      default: "#FCFAF6",
      paper: "#FCFAF6",
    },
  },
  typography: {
    fontFamily: ["Raleway"],
  },
});

function App() {
  const admin = useSelector((state) => state.admin);
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
