import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function DeleteModal({message, isOpen, handleToggle, handleOnDelete}:
  {message: string, isOpen: boolean, handleToggle: any, handleOnDelete: any}) {


  return (

    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" className="text-white" onClick={handleToggle}>
          Cancel
        </Button>{' '}
        <Button color="danger" className="text-white" onClick={handleOnDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>

  );
}
