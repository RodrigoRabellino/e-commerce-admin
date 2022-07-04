import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Cottage } from "@mui/icons-material";
import React, { useState } from "react";
import AnimatedBg from "./animatedBg/AnimatedBg";
import { loginAdmin } from "../../redux/admin/slice";
import { useDispatch } from "react-redux";
import MySnackBar from "../snackBar/MySnackBar";
import { getTokenAdmin } from "../../services/loginServices";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("1234");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSnack, setShowSnack] = useState(false);

  const handleSnackOpen = () => setShowSnack(true);
  const handleSnackHide = () => setShowSnack(false);

  const handleLogin = (admin) => {
    try {
      dispatch(loginAdmin(admin));
    } catch (error) {
      setErrorMessage("unknown error, try again later");
      handleSnackOpen();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (email.length === 0 || password.length === 0) {
      setError("-_-");
      return setError(true);
    }
    setLoading(true);
    try {
      const admin = await getTokenAdmin(email, password);
      if (!Object.entries(admin).length === 0) {
        setErrorMessage("Bad credentials");
        setLoading(false);
        return setError(true);
      }
      handleLogin(admin);
    } catch (error) {
      setErrorMessage("unknown error, try again later");
      handleSnackOpen();
    }
    setLoading(false);
  };

  const handleSetEmail = (newValue) => {
    setEmail(newValue);
    setError(false);
  };
  const handleSetPassword = (newValue) => {
    setPassword(newValue);
    setError(false);
  };

  return (
    <Box width="100vw" height="100vh">
      <AnimatedBg>
        <Box
          width="85%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "2rem",
              height: "325px",
              background: "#ffffff",
              borderRadius: "15px",
            }}
          >
            <Typography variant="h3" fontWeight="600" color="primary">
              Admin Login
            </Typography>
            <Box height="100%" paddingTop="0.65rem">
              <form
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onSubmit={handleSubmit}
              >
                <TextField
                  disabled={isLoading}
                  error={error}
                  type="email"
                  name="email"
                  label="email"
                  variant="standard"
                  value={email}
                  onChange={(e) => handleSetEmail(e.target.value)}
                />
                <TextField
                  disabled={isLoading}
                  error={error}
                  type="password"
                  name="password"
                  label="password"
                  variant="standard"
                  value={password}
                  onChange={(e) => handleSetPassword(e.target.value)}
                />

                <Box>
                  {!error ? (
                    <></>
                  ) : (
                    <Typography color="error">{errorMessage}</Typography>
                  )}
                </Box>
                <Box display="flex">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      window.open(
                        process.env.REACT_APP_HOME_COMMERCE,
                        "_blank"
                      );
                    }}
                  >
                    <Cottage />
                  </IconButton>
                  <LoadingButton
                    type="submit"
                    loading={isLoading}
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="button" fontWeight="600">
                      Login
                    </Typography>
                  </LoadingButton>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </AnimatedBg>
      <MySnackBar
        handleClose={handleSnackHide}
        message={errorMessage}
        open={showSnack}
        severity="error"
      />
    </Box>
  );
};

export default AdminLogin;
