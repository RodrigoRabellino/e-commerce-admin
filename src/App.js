import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import "./App.css";
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
      default: "#f2dbb8",
      paper: "#f2dbb8",
    },
  },
  typography: {
    fontFamily: ["Raleway"],
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <SnackbarProvider maxSnack={4}>
        <div className="App">
          <MyRoutes />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
