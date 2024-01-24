import { Button, Modal } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

interface AfterUpdateModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  success: boolean;
  userInfo: string;
}

const AfterUpdateModal: React.FC<AfterUpdateModalProps> = ({
  openModal,
  setOpenModal,
  success,
}) => {
  return (
    <>
      <Modal
        size={"md"}
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>{success ? "Successfully" : "Error"}</Modal.Header>
        <Modal.Body className="dark:text-gray-50">
          <div className="space-y-6">
            {success ? (
              <>
                <div className="flex items-center">
                  <span className="me-2 text-3xl text-green-500">
                    <HiCheckCircle />
                  </span>
                  Update Successfully!
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="me-2 text-3xl text-red-500">
                    <HiExclamationCircle />
                  </span>
                  Something went wrong!
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => setOpenModal(false)}>
            {success ? "Dismiss" : "Try again"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AfterUpdateModal;
