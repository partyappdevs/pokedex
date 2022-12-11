import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import useDisclosure from "../hooks/useDisclosure";
import auth from "../services/auth";
import loginApi from "../services/loginApi";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface IUserCreation {
  name: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const initData = {
  name: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
};
export default function Register() {
  const [formData, setFormData] = useState<IUserCreation>(initData);
  const { open, handleOpen, handleClose } = useDisclosure();
  const [errors, setErrors] = useState<IUserCreation>(initData);
  const { open: showPassword, handleToggle: handleTogglePassword } =
    useDisclosure();
  const { open: showConfirmPassword, handleToggle: handleToggleConfirm } =
    useDisclosure();

  const REQUIRED = "Requerido";
  const PasswordNotValid = "Las contraseñas no son iguales";

  const handleChangeFormData = (key: string, value: string) => {
    setFormData((prevState) => {
      return { ...prevState, [key]: value };
    });
    setErrors(initData);
  };

  const handleError = (key: string, value: string) => {
    setErrors((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const validate = () => {
    let isValid = true;
    if (!formData.name) {
      handleError("name", REQUIRED);
      isValid = false;
    }
    if (!formData.lastname) {
      handleError("lastname", REQUIRED);
      isValid = false;
    }
    if (!formData.username) {
      handleError("username", REQUIRED);
      isValid = false;
    }
    if (!formData.password) {
      handleError("password", REQUIRED);
      isValid = false;
    }
    if (!formData.confirmPassword) {
      handleError("confirmPassword", REQUIRED);
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      handleError("confirmPassword", PasswordNotValid);
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await auth
        .register(
          formData.name,
          formData.lastname,
          formData.username,
          formData.password
        )
        .then(() => {
          handleOpen();
        });
    }
  };
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
      <RegisterModal isOpen={open} onClose={handleClose} />
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
          paddingBottom="10px"
          paddingTop="10px"
          spacing={1}
          bgcolor={"white"}
          width={{ xs: "90%", sm: "70%", md: "45%", lg: "35%", xl: "30%" }}
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h5" textAlign="center">
              ¡Bienvenido al creador de cuentas de la pokedex!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Ingresa tus datos para crear una cuenta
            </Typography>
          </Grid>
          <Grid
            container
            mt="8px"
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            wrap="nowrap"
            width={{ xs: "100%", sm: "90%", md: "70%", lg: "70%" }}
          >
            <Grid item width="100%">
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeFormData("name", event.target.value)
                }
                value={formData.name}
                fullWidth
                label="Nombre"
                placeholder="Ingresa tu nombre"
                error={!!errors.name}
                helperText={errors.name ? errors.name : ""}
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeFormData("lastname", event.target.value)
                }
                value={formData.lastname}
                fullWidth
                label="Apellido"
                placeholder="Ingresa tu apellido"
                error={!!errors.lastname}
                helperText={errors.lastname ? errors.lastname : ""}
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeFormData("username", event.target.value)
                }
                value={formData.username}
                fullWidth
                label="Usuario"
                placeholder="Ingresa tu nombre de usuario"
                error={!!errors.username}
                helperText={errors.username ? errors.username : ""}
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeFormData("password", event.target.value)
                }
                value={formData.password}
                fullWidth
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                error={!!errors.password}
                helperText={errors.password ? errors.password : ""}
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
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeFormData("confirmPassword", event.target.value)
                }
                value={formData.confirmPassword}
                fullWidth
                label="Repetir contraseña"
                placeholder="Repite tu contraseña"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword : ""
                }
                type={!showConfirmPassword ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <div
                      onClick={handleToggleConfirm}
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </div>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid mt="32px">
            <Button onClick={handleSubmit} variant="outlined">
              Registrar
            </Button>
          </Grid>
          <Typography variant="body2" mt="24px">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
