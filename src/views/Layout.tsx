import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/loginContext";

export default function Layout() {
  const navigate = useNavigate();
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const onLogOut = () => {
    const loginSuccessAction: ILoginAction = {
      type: "LOGOUT",
      error: "",
      payload: {},
    };
    localStorage.clear();
    dispatch(loginSuccessAction);
    navigate("/login");
  };
  return (
    <Paper
      style={{
        backgroundImage: "url(https://pbs.twimg.com/media/DQum78SUMAIqYzS.jpg)",
        maskRepeat: "no-repeat",
        objectPosition: "right",
        filter:
          "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://pbs.twimg.com/media/DQum78SUMAIqYzS.jpg', sizingMethod='scale')",
        msFilter:
          "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://pbs.twimg.com/media/DQum78SUMAIqYzS.jpg', sizingMethod='scale')",
        objectFit: "cover",
        backgroundColor: "transparent",
        WebkitBackgroundSize: "cover",
        backgroundSize: "cover",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ flexGrow: 1, marginBottom: "25px" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bienvenido: {user.user?.fullname}
            </Typography>
            <Button onClick={onLogOut} color="inherit">
              Cerrar sesion
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </Paper>
  );
}
