import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RegisterModal({
  isOpen,
  onClose,
}: IRegisterModalProps) {
  const navigate = useNavigate();
  const onGoToLogin = () => {
    navigate("/login");
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tu cuenta ha sido creada con exito
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Ahora puedes iniciar sesion sin problemas!
        </Typography>
        <Button onClick={onGoToLogin} variant="outlined">
          Ir a iniciar sesion
        </Button>
      </Box>
    </Modal>
  );
}
