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
}) => (
  <Modal isOpen={isOpen} handleClose={handleClose}>
    <h3 className="m-0 font-sans text-gray-700   dark:text-gray-100">
      {title}
    </h3>
    <p className="p-2 text-gray-600 dark:text-gray-300">{message}</p>
    <div className="m-3 flex justify-end gap-3 p-1 ">
      <Button gray type="button" onClick={handleClose}>
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
