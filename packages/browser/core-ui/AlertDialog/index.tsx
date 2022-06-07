import Button from "../Button";
import Modal, { ModalProps } from "../Modal";

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
  size = "medium",
}) => (
  <Modal size={size} isOpen={isOpen} title={title} handleClose={handleClose}>
    <p className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
      {message}
    </p>

    <div className="mt-4 flex justify-end space-x-2">
      <Button outline gray type="button" onClick={handleClose}>
        {cancelMessage}
      </Button>
      <Button success type="button" onClick={onSubmit}>
        {confirmMessage}
      </Button>
    </div>
  </Modal>
);

export default AlertDialog;
export { default as useAlertDialog } from "./useAlertDialog";
