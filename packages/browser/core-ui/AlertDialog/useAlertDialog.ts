import { useState } from "react";

let args: unknown;

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
  const handleSubmit: (...submitionArgs: T) => void = (...submitionArgs) => {
    setIsOpen(true);
    args = submitionArgs;
  };

  const handleSuccess = () => {
    if (Array.isArray(args)) onSubmit(...(args as T));
    setIsOpen(false);
    args = undefined;
  };

  const modalProps = {
    isOpen,
    handleClose: () => setIsOpen(false),
    onSubmit: handleSuccess,
  };

  return [modalProps, handleSubmit];
};

export default useAlertDialog;
