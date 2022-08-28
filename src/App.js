import {
  ThemeProvider,
  createTheme,
  Modal,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Link,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux/es/exports";
import "./App.css";
import AdminLogin from "./components/login/AdminLogin";
import MySnackBar from "./components/snackBar/MySnackBar";
import MyRoutes from "./MyRoutes";
import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Group } from "@mui/icons-material";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  return (
    <ThemeProvider theme={myTheme}>
      <SnackbarProvider maxSnack={4}>
        <div className="App">
          <>
            {Object.entries(admin).length === 0 ? <AdminLogin /> : <MyRoutes />}
            <MySnackBar />
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
                position: "fixed",
                top: "9vh",
                right: "-5rem",
                zIndex: "100",
                transition: "0.3s",
                "&:hover": {
                  transition: "0.3s",
                  right: 0,
                },
              }}
              onClick={() =>
                window.open("https://guitarrero.vercel.app/about", "_blank")
              }
            >
              <Fab variant="extended" color="secondary" aria-label="add">
                <Group sx={{ mr: 1 }} />
                About
              </Fab>
            </Box>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <Card
                style={{
                  padding: "1rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CardHeader title="Bienvenido, gracias por visitarnos." />
                <CardContent>
                  <Typography>
                    Esta es una parte de nuestro proyecto de fin de curso.
                    Puedes ver mas en{" "}
                    <Link
                      href="https://guitarrero.vercel.app/about"
                      target="_blank"
                      rel="noopener"
                    >
                      nuestra web.
                    </Link>{" "}
                  </Typography>
                  <Typography>
                    Tambien puedes acceder a este sitio con las siguientes
                    credenciales:
                  </Typography>
                  <Typography>
                    <b>Email: </b>admin@admin.com
                  </Typography>
                  <Typography>
                    <b>Pass:</b>1234
                  </Typography>
                </CardContent>
              </Card>
            </Modal>
          </>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
