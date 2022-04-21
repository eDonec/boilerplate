import { useEffect } from "react";

export interface IProps {
  handleClose: () => void;
}
export const useModal = ({ handleClose }: IProps) => {
  const escHandler = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);
};
