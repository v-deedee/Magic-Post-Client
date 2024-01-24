import { Button, Modal } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

interface AfterUpdateModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  message: {
    success: boolean;
    content: string;
  };
}

const AfterUpdateModal: React.FC<AfterUpdateModalProps> = ({
  openModal,
  setOpenModal,
  message,
}) => {
  return (
    <>
      <Modal
        size={"md"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          {message.success ? "Successfully" : "Error"}
        </Modal.Header>
        <Modal.Body className="dark:text-gray-50">
          <div className="flex items-center space-y-6">
            {message.success ? (
              <span className="me-2 text-3xl text-green-500">
                <HiCheckCircle />
              </span>
            ) : (
              <span className="me-2 text-3xl text-red-500">
                <HiExclamationCircle />
              </span>
            )}
            {message.content}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => setOpenModal(false)}>
            {message.success ? "Dismiss" : "Try again"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AfterUpdateModal;
