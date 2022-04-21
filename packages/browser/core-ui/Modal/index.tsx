import clsx from "core-utils/clsx";
import ReactChildrenProps from "shared-types/ReactChildren";

import CloseButton from "./CloseButton";
import { useModal } from "./useModal";

export interface ModalProps extends ReactChildrenProps {
  isOpen: boolean;
  handleClose: () => void;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  useModal({ handleClose });

  return (
    <div className={clsx("fixed inset-5 md:inset-20", !isOpen && "hidden")}>
      <div
        className={clsx(
          { "pointer-events-none": !isOpen },
          "fixed inset-0",
          "bg-black",
          isOpen ? "opacity-50" : " opacity-0",
          "z-0",
          "transition-opacity duration-300 ease-in-out"
        )}
        onClick={handleClose}
      />
      <div
        className={clsx(
          { "pointer-events-none": !isOpen },
          "relative",
          "mx-auto w-full max-w-3xl",
          "flex flex-col",
          "rounded-lg  border-0",
          "bg-white shadow-lg dark:bg-gray-700",
          isOpen ? "opacity-100" : " opacity-0",
          "max-h-[85vh] md:max-h-[75vh]",
          "overflow-auto transition-opacity",
          "duration-300 ease-in-out"
        )}
      >
        <CloseButton handleClose={handleClose} />
        <div
          className={clsx([
            "my-4 mx-3  p-5",
            "text-lg leading-relaxed",
            "text-gray-600 dark:text-gray-200",
          ])}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
