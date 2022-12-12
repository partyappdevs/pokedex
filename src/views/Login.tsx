import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/loginContext";
import auth from "../services/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useDisclosure from "../hooks/useDisclosure";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { open: showPassword, handleToggle: handleTogglePassword } =
    useDisclosure();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const user = useAuthState();

  const handleSubmit = async () => {
    await auth.login(userName, password).then(async (res) => {
      const token = res.data.access_token;
      await auth.profile(token).then((res) => {
        const loginSuccessAction: ILoginAction = {
          type: "LOGIN_SUCCESS",
          error: "",
          payload: { user: res.data, auth_token: token },
        };

        dispatch(loginSuccessAction);
        const localData = JSON.stringify(res.data);
        localStorage.setItem("currentUser", localData);
        localStorage.setItem("token", token);
        navigate("/");
      });
    });
  };

  const handleUserName = (newUserName: ChangeEvent<HTMLInputElement>) => {
    setUserName(newUserName.target.value);
  };
  const handlePassword = (password: ChangeEvent<HTMLInputElement>) => {
    setPassword(password.target.value);
  };

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  });
  return (
    <Container
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
        paddingRight: "0px",
        maxWidth: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        wrap="nowrap"
      >
        <Grid
          borderRadius={5}
          item
          container
          direction="column"
          alignItems="center"
          boxShadow="2px 5px 20px 6px rgba(130,130,130,1)"
          height={"max-content"}
          paddingBottom="40px"
          paddingTop="40px"
          spacing={2}
          bgcolor={"white"}
          width={{ xs: "90%", sm: "70%", md: "45%", lg: "35%", xl: "30%" }}
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h5">¡Bienvenido entrenador!</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Inicia sesion para explorar la pokedex completa
            </Typography>
          </Grid>
          <Grid
            container
            mt="8px"
            direction="column"
            spacing={4}
            alignItems="center"
            justifyContent="center"
            wrap="nowrap"
            width={{ xs: "100%", sm: "90%", md: "70%", lg: "70%" }}
          >
            <Grid item width="100%">
              <TextField
                onChange={handleUserName}
                value={userName}
                fullWidth
                label="Usuario"
                placeholder="Ingresa tu usuario"
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                onChange={handlePassword}
                value={password}
                fullWidth
                type={!showPassword ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <div
                      onClick={handleTogglePassword}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </div>
                  ),
                }}
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
              />
            </Grid>
          </Grid>
          <Grid mt="32px">
            <Button onClick={handleSubmit} variant="outlined">
              Iniciar Sesion
            </Button>
          </Grid>
          <Typography variant="body2" mt="24px">
            ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
