import { Button, Modal } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

interface AfterCreateModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  success: boolean;
  userInfo: string;
}

const AfterCreateModal: React.FC<AfterCreateModalProps> = ({
  openModal,
  setOpenModal,
  success,
  userInfo,
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
        <Modal.Body>
          <div className="space-y-6">
            {success ? (
              <>
                <div className="flex items-center ">
                  <span className="me-2 text-3xl text-green-500">
                    <HiCheckCircle />
                  </span>
                  A new user has been added:
                </div>
                <ul className="list-disc ps-10">
                  <li>Username: {userInfo}</li>
                  <li>Password: {userInfo}</li>
                </ul>
              </>
            ) : (
              <>
                <span className="me-2 text-3xl text-red-500">
                  <HiExclamationCircle />
                </span>
                Something went wrong!
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

export default AfterCreateModal;
