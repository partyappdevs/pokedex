import { useState } from "react";

const useDisclosure = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };
  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export default useDisclosure;
