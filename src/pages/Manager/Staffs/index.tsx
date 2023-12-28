// import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import CreateEmployeeModal from "./modals/CreateEmployeeModal";
import { HiPlus } from "react-icons/hi";
import { listEmployee } from "../../../services/managerApi";
import EmployeeTable from "./EmployeeTable";
import UpdateEmployeeModal from "./modals/UpdateEmployeeModal";

export interface Employee {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  active: boolean;
}

export default function Staffs() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState<Employee>({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    active: false,
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listEmployee({});
      const payload = data.data.data.payload;
      const staffs = payload.staffs;
      setEmployees(staffs);
    };
    fetchData();
  }, [openCreateModal]);

  const showUpdateModal = (employee: Employee) => {
    setOpentUpdateModal(true);
    setCurrentEmployee(employee);
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          className="mb-2 me-2 flex items-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
          onClick={() => setOpenCreateModal(true)}
        >
          <HiPlus />
          <span className="ms-1">New</span>
        </button>
      </div>
      <EmployeeTable employees={employees} showUpdateModal={showUpdateModal} />

      {/* Modal */}
      <CreateEmployeeModal
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
      />

      <UpdateEmployeeModal
        openModal={openUpdateModal}
        setOpenModal={setOpentUpdateModal}
        currentEmployee={currentEmployee}
      />
    </>
  );
}
