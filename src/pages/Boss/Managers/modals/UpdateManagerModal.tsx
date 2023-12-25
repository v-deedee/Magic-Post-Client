import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IManager } from "..";
import { useEffect } from "react";

interface UpdateManagerModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  currentManager: IManager;
}

interface IFormInput {
  role: string;
  department: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
}

const UpdateManagerModal: React.FC<UpdateManagerModalProps> = ({
  openModal,
  setOpenModal,
  currentManager,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setOpenModal(false);
    reset();
  };

  useEffect(() => {
    if (openModal) {
      setValue("role", currentManager.role);
      setValue("department", currentManager.department._id);
      setValue("firstname", currentManager.firstname);
      setValue("lastname", currentManager.lastname);
      setValue("gender", currentManager.gender);
      setValue("email", currentManager.email);
    }
  }, [openModal, currentManager, setValue]);

  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Update manager</Modal.Header>
      <Modal.Body>
        <form
          className="block grid-cols-2 gap-4 sm:grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Role */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select id="role" {...register("role", { required: true })}>
              <option value="" defaultChecked>
                Select role
              </option>
              <option value="STORAGE-MANAGER">STORAGE-MANAGER</option>
              <option value="POSTOFFICE-MANAGER">POSTOFFICE-MANAGER</option>
            </Select>
            {errors.role && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Department */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="department" value="Department" />
            </div>
            <TextInput
              id="department"
              type="text"
              {...register("department", { required: true })}
              placeholder="Enter department id"
            />
            {errors.department && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* First name */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="firstname" value="Firstname" />
            </div>
            <TextInput
              id="firstname"
              type="text"
              {...register("firstname", { required: true })}
              placeholder="Enter firstname"
            />
            {errors.firstname && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Last name */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Lastname" />
            </div>
            <TextInput
              id="lastname"
              type="text"
              {...register("lastname", { required: true })}
              placeholder="Enter lastname"
            />
            {errors.lastname && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="gender" value="Gender" />
            </div>
            <Select id="gender" {...register("gender", { required: true })}>
              <option value="" defaultChecked>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            {errors.gender && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Email */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end gap-3 pt-3">
            <Button className="" type="submit">
              Update
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateManagerModal;
