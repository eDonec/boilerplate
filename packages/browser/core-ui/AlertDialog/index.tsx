import { clsx } from "core-utils";

import Button from "../Button";
import Modal, { ModalProps } from "../Modal";

export interface DialogAlertProps extends Omit<ModalProps, "children"> {
  title: string;
  message: string;
  confirmMessage: string;
  onSubmit: () => void;
  cancelMessage: string;
  messageClassName?: string;
  modalClassName?: string;
}

export const AlertDialog: React.FC<DialogAlertProps> = ({
  title,
  message,
  confirmMessage,
  cancelMessage,
  onSubmit,
  isOpen,
  handleClose,
  messageClassName,
  size = "medium",
  modalClassName,
}) => (
  <Modal
    size={size}
    isOpen={isOpen}
    title={title}
    handleClose={handleClose}
    className={modalClassName}
  >
    <p
      className={clsx(
        "mt-2 text-sm font-normal text-gray-700 dark:text-gray-400",
        messageClassName
      )}
    >
      {message}
    </p>

    <div className="mt-4 flex justify-end space-x-2">
      <div className="bg-gradient-cyan rounded p-0.5">
        <button
          className={clsx(
            "items-center rounded bg-gray-200",
            "bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm",
            "transition-colors duration-75",
            "hover:bg-gray-300 ",
            "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
            "disabled:cursor-not-allowed",
            "dark:border-gray-50 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-600 dark:disabled:bg-gray-900"
          )}
          type="button"
          onClick={handleClose}
        >
          {cancelMessage}
        </button>
      </div>
      <Button success type="button" onClick={onSubmit}>
        {confirmMessage}
      </Button>
    </div>
  </Modal>
);

export default AlertDialog;
export { default as useAlertDialog } from "./useAlertDialog";
