import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateDepartmentModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
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

const CreateDepartmentModal: React.FC<CreateDepartmentModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setOpenModal(false);
    reset();
  };
  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Create new department</Modal.Header>
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
              <option value="" defaultChecked>
                Select province
              </option>
              <option>Ha Noi</option>
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
              <option value="" defaultChecked>
                Select district
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

          {/* Type */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Type" />
            </div>
            <Select id="type" {...register("type", { required: true })}>
              <option value="" defaultChecked>
                Select type
              </option>
              <option value="STORAGE">STORAGE</option>
              <option value="POSTOFFICE">POSTOFFICE</option>
            </Select>
            {errors.type && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {watch("type") === "POSTOFFICE" && (
            <>
              {/* Cfs */}
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="cfs" value="Cfs" />
                </div>
                <TextInput
                  id="cfs"
                  type="tel"
                  {...register("cfs", { required: true })}
                  placeholder="Enter cfs"
                />
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

export default CreateDepartmentModal;
