import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function MyModal({
  message,
  isOpen,
  handleCancel,
  handleOnClick,
}: {
  message: string;
  isOpen: boolean;
  handleCancel: () => void;
  handleOnClick: () => void;
}) {
  return (
    <Modal isOpen={isOpen} toggle={handleCancel}>
      <ModalHeader>Warning</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" className="text-white" onClick={handleCancel}>
          Cancel
        </Button>{" "}
        <Button color="danger" className="text-white" onClick={handleOnClick}>
          Proceed
        </Button>
      </ModalFooter>
    </Modal>
  );
}
