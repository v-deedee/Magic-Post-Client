import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Department } from "../../../../models/Department";
import { useEffect } from "react";
import { updateDepartment } from "../../../../services/bossApi";

interface UpdateDepartmentModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
  currentDepartment: Department;
  departments: Array<Department>;
  fetchDetail: () => void;
  openAfterModal: (success: boolean, content: string) => void;
}

interface IFormInput {
  province: string;
  district: string;
  street: string;
  phone: string;
  type: string;
  cfs: string;
  zipcode: string;
}

const UpdateDepartmentModal: React.FC<UpdateDepartmentModalProps> = ({
  openModal,
  setOpenModal,
  currentDepartment,
  departments,
  fetchDetail,
  openAfterModal,
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

    try {
      const res = await updateDepartment(currentDepartment._id, data);
      console.log(res);
      openAfterModal(true, "Update successfully!");

      fetchDetail();
    } catch (error) {
      console.log(error);
      openAfterModal(false, "Something went wrong!");
    }

    reset();
  };

  useEffect(() => {
    if (openModal) {
      setValue("province", currentDepartment.province);
      setValue("district", currentDepartment.district);
      setValue("street", currentDepartment.street);
      setValue("phone", currentDepartment.phone);
      if (currentDepartment.type === "POSTOFFICE") {
        setValue("cfs", currentDepartment.cfs._id);
        setValue("zipcode", currentDepartment.zipcode);
      }
    }
  }, [openModal, currentDepartment, setValue]);

  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Update department</Modal.Header>
      <Modal.Body>
        <form
          className="block grid-cols-2 gap-4 sm:grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Province */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="province" value="Province" />
            </div>
            <Select id="province" {...register("province", { required: true })}>
              <option value="">Select province</option>
              <option value={currentDepartment.province}>
                {currentDepartment.province}
              </option>
              <option value="Ha Noi">Ha Noi</option>
            </Select>
            {errors.province && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* District */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="district" value="District" />
            </div>
            <Select id="district" {...register("district", { required: true })}>
              <option value="">Select district</option>
              <option value={currentDepartment.district}>
                {currentDepartment.district}
              </option>
              <option value="Cau Giay">Cau Giay</option>
            </Select>
            {errors.district && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Street */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Street" />
            </div>
            <TextInput
              id="street"
              type="text"
              {...register("street", { required: true })}
              placeholder="Enter street"
            />
            {errors.street && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone" />
            </div>
            <TextInput
              id="phone"
              type="tel"
              {...register("phone", { required: true })}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {currentDepartment.type === "POSTOFFICE" && (
            <>
              {/* Cfs */}
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="cfs" value="Cfs" />
                </div>
                <Select id="cfs" {...register("cfs", { required: true })}>
                  <option value="">Select storage</option>
                  {departments
                    .filter((department) => department.type === "STORAGE")
                    .map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.district + " STORAGE"}
                      </option>
                    ))}
                </Select>
                {errors.cfs && (
                  <p className="text-red-500 dark:text-red-400">
                    This field is required
                  </p>
                )}
              </div>

              {/* Zipcode */}
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="zipcode" value="Zipcode" />
                </div>
                <TextInput
                  id="zipcode"
                  type="tel"
                  {...register("zipcode", { required: true })}
                  placeholder="Enter zipcode"
                />
                {errors.zipcode && (
                  <p className="text-red-500 dark:text-red-400">
                    This field is required
                  </p>
                )}
              </div>
            </>
          )}

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

export default UpdateDepartmentModal;
