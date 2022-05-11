import { useState } from "react";

const useAlertDialog = <T extends Array<unknown>>(
  onSubmit: (...args: T) => void
): [
  {
    isOpen: boolean;
    handleClose: () => void;
    onSubmit: () => void;
  },
  (...args: T) => void
] => {
  const [isOpen, setIsOpen] = useState(false);
  const [args, setArgs] = useState<T>();
  const handleSubmit: (...submitionArgs: T) => void = (...submitionArgs) => {
    setIsOpen(true);
    setArgs(submitionArgs);
  };

  const handleSuccess = () => {
    if (Array.isArray(args)) onSubmit(...args);
    setIsOpen(false);
  };

  const modalProps = {
    isOpen,
    handleClose: () => setIsOpen(false),
    onSubmit: handleSuccess,
  };

  return [modalProps, handleSubmit];
};

export default useAlertDialog;
