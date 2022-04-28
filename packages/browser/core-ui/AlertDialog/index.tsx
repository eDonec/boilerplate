/* eslint-disable react/no-children-prop */

import clsx from "core-utils/clsx";
import ReactChildrenProps from "shared-types/ReactChildren";

import Modal from "../Modal";

export interface ModalProps extends ReactChildrenProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface DialogAlertProps extends Omit<ModalProps, "children"> {
  title: string;
  message: string;
  confirmMessage: string;
  onSubmit: () => void;
  cancelMessage: string;
}

export const AlertDialog: React.FC<DialogAlertProps> = ({
  title,
  message,
  confirmMessage,
  cancelMessage,
  onSubmit,
  isOpen,
  handleClose,
}) => (
  <div>
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h3 className="my-1 mx-1  text-gray-600 dark:text-gray-100">{title}</h3>
      <p className="my-1 mx-2  p-1 text-gray-600 dark:text-gray-300">
        {message}
      </p>
      <div className="flex gap-2">
        <button
          className={clsx([
            "relative inline-flex items-center rounded px-4 py-2 font-semibold",
            "rounded bg-gray-200 py-2 px-4 font-sans text-base text-gray-600 ",
          ])}
          type="button"
          onClick={handleClose}
        >
          {cancelMessage}
        </button>
        <button
          className={clsx([
            "inline-flex items-center rounded px-4 py-2 font-semibold",
            "rounded bg-red-100 py-2 px-4 font-sans text-base text-red-600 hover:bg-red-200",
          ])}
          type="button"
          onClick={onSubmit}
        >
          {confirmMessage}
        </button>
      </div>
    </Modal>
  </div>
);

export default AlertDialog;
export { default as useAlertDialog } from "./useAlertDialog";
