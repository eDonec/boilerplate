/* eslint-disable react/no-children-prop */

import ReactChildrenProps from "shared-types/ReactChildren";

import Button from "../Button";
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
        <Button type="button" onClick={handleClose}>
          {cancelMessage}
        </Button>
        <Button type="button" onClick={onSubmit}>
          {confirmMessage}
        </Button>
      </div>
    </Modal>
  </div>
);

export default AlertDialog;
export { default as useAlertDialog } from "./useAlertDialog";
