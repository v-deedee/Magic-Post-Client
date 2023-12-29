import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createEmployee } from "../../../../services/managerApi";

interface CreateEmployeeModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  openAfterModal: (success: boolean, userInfo: string) => void;
  fetchEmployees: () => Promise<void>;
}

interface IFormInput {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
  openModal,
  setOpenModal,
  openAfterModal,
  fetchEmployees,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setOpenModal(false);

    try {
      const res = await createEmployee(data);
      console.log(res);
      openAfterModal(true, res.data.data.payload.employee);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      openAfterModal(false, "");
    }

    reset();
  };
  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Add new Employee</Modal.Header>
      <Modal.Body>
        <form
          className="block grid-cols-2 gap-4 sm:grid"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              Create
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

export default CreateEmployeeModal;
