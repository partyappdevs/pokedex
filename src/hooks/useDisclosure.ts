import { useCallback, useState } from "react";

const useDisclosure = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export default useDisclosure;
