import clsx from "core-utils/clsx";
import ReactChildrenProps from "shared-types/ReactChildren";

import CloseButton from "./CloseButton";
import { useModal } from "./useModal";

export interface ModalProps extends ReactChildrenProps {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  title,
  children,
}) => {
  useModal({ handleClose });

  return (
    <div
      className={clsx("fixed inset-5 md:inset-20", {
        "pointer-events-none": !isOpen,
      })}
    >
      <div
        className={clsx(
          { "pointer-events-none": !isOpen },
          "fixed inset-0 z-20 bg-black/50",
          isOpen ? "opacity-50" : " opacity-0",
          "transition-opacity duration-150 ease-in-out"
        )}
        onClick={handleClose}
      />
      <div
        className={clsx(
          { "pointer-events-none": !isOpen },
          // "relative",
          "mx-auto w-full max-w-3xl",
          // "flex flex-col",
          // "rounded-lg  border-0",
          // "bg-white shadow-lg dark:bg-gray-700",
          isOpen ? "opacity-100" : " opacity-0",
          isOpen ? "translate-y-0 scale-[1]" : "translate-y-[-4%] scale-[.96]",
          "transition-transform duration-150 ease-in-out",
          // "max-h-[85vh] md:max-h-[75vh]",
          "overflow-auto transition-opacity",
          "duration-150 ease-in-out",
          "fixed z-50",
          "w-[95vw] rounded-lg p-4 md:w-full",
          "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
          "bg-white dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <CloseButton handleClose={handleClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
