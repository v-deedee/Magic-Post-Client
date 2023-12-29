import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Employee } from "..";
import { updateEmployee } from "../../../../services/managerApi";

interface UpdateEmployeeModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  currentEmployee: Employee;
}

interface IFormInput {
  username: string;
  firstname: string;
  lastname: string;
  active: string;
}

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  openModal,
  setOpenModal,
  currentEmployee,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setOpenModal(false);
    const res = await updateEmployee(currentEmployee.username, data);
    console.log(res);
    reset();
  };

  useEffect(() => {
    if (openModal) {
      setValue("username", currentEmployee.username);
      setValue("firstname", currentEmployee.firstname);
      setValue("lastname", currentEmployee.lastname);
      setValue("active", currentEmployee.active ? "True" : "False");
    }
  }, [openModal, currentEmployee, setValue]);

  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Update Employee</Modal.Header>
      <Modal.Body>
        <form
          className="block grid-cols-2 gap-4 sm:grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter username"
            />
            {errors.username && (
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

          {/* Active */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="active" value="Active" />
            </div>
            <Select id="active" {...register("active", { required: true })}>
              <option value="" defaultChecked>
                Select active
              </option>
              <option value="True">True</option>
              <option value="False">False</option>
            </Select>
            {errors.active && (
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

export default UpdateEmployeeModal;
