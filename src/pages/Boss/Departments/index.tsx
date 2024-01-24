import { useEffect, useState } from "react";
import { HiPencilAlt, HiCheckCircle, HiXCircle, HiPlus } from "react-icons/hi";
import CreateDepartmentModal from "./modals/CreateDepartmentModal";
import UpdateDepartmentModal from "./modals/UpdateDepartmentModal";
import DepartmentTable from "./DepartmentTable";
// import Pagination from "../Pagination";
// import { ITEMS_PER_PAGE } from "../Pagination";
import { Department, defaultDepartment } from "../../../models/Department";
import {
  listDepartment,
  listManager,
  viewDepartment,
} from "../../../services/bossApi";
import SearchBox from "../../../components/SearchBox";
import { Manager } from "../../../models/Manager";
import AfterCreateModal from "./modals/AfterCreateModal";

export default function Departments() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openAfterCreateModal, setopenAfterCreateModal] = useState(false);

  const [afterCreateMessage, setAfterCreateMessage] = useState({
    success: false,
    content: "",
  });

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);

  const [currentDepartmentId, setCurrentDepartmentId] = useState("");

  const [currentDepartment, setCurrentDepartment] =
    useState<Department>(defaultDepartment);

  const [currentLinkedPostOffices, setcurrentLinkedPostOffices] =
    useState<Array<Department>>();

  const [currentManager, setCurrentManager] = useState<Manager>();

  const [departments, setDepartments] = useState<Array<Department>>([]);

  const fetchDepartments = async () => {
    const res = await listDepartment({});
    setDepartments(res.data.data.payload.departments);
  };
  // Get departments
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await listDepartment({});
      setDepartments(res.data.data.payload.departments);
    };
    fetchDepartments();
  }, []);

  const fetchDetail = async () => {
    const departmentRes = await viewDepartment(currentDepartmentId);
    setCurrentDepartment(departmentRes.data.data.payload.department);

    const managerRes = await listManager({ department: currentDepartmentId });
    setCurrentManager(managerRes.data.data.payload.staffs[0]);

    const linkedPORes = await listDepartment({ cfs: currentDepartmentId });
    setcurrentLinkedPostOffices(linkedPORes.data.data.payload.departments);
  };

  // Get detail by department id
  useEffect(() => {
    if (currentDepartmentId !== "") {
      fetchDetail();
    }
  }, [currentDepartmentId]);

  const showDetail = (id: string, type: string) => {
    setCurrentDepartmentId(id);

    // document.getElementById("mapView")?.classList.add("hidden");

    if (type === "STORAGE") {
      document.getElementById("storageView")?.classList.remove("hidden");
      document.getElementById("postOfficeView")?.classList.add("hidden");
    } else {
      document.getElementById("storageView")?.classList.add("hidden");
      document.getElementById("postOfficeView")?.classList.remove("hidden");
    }
  };

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([...departments]);

  function search(list: Department[]) {
    const temp = list.filter(
      (department) =>
        (department.district + " " + department.type)
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()) ||
        department.street
          .toLocaleLowerCase()
          .includes(keyword.trim().toLowerCase()),
    );
    if (keyword !== "") setSearchList(temp);
    else setSearchList([...list]);
  }
  useEffect(() => {
    search(departments);
  }, [departments, keyword]);

  return (
    <>
      <div className="flex gap-4">
        {/* Table */}
        <div className="w-full overflow-x-auto">
          {/* Search box and Create button */}
          <div className="flex justify-between gap-4">
            <div className="py-2 sm:px-2">
              <SearchBox
                placeholder="Search by fields"
                setKeyword={setKeyword}
              />
            </div>
            <div className="py-2 sm:px-2">
              <button
                type="button"
                className="mb-2 flex items-center rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                onClick={() => setOpenCreateModal(true)}
              >
                <HiPlus />
                <span className="ms-1">New</span>
              </button>
            </div>
          </div>

          {/* Main table */}
          <DepartmentTable
            departments={searchList}
            currentDepartmentId={currentDepartmentId}
            showDetail={showDetail}
          />

          {/* Pagination */}
          {/* <Pagination
            itemCount={82}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
        </div>

        {/* Map view */}
        {/* <div
          id="mapView"
          className="w-1/2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300"
        >
          <div className="border-b p-3 text-center">
            <h2 className="font-bold">MAP</h2>
          </div>
        </div> */}

        {/* Post office view */}
        <div
          id="postOfficeView"
          className="hidden w-1/2 rounded-lg bg-white p-2 dark:bg-gray-800 dark:text-gray-300"
        >
          <h1 className="mb-4 text-center text-lg font-semibold">
            Post Office View
          </h1>

          <hr className="mt-4 font-bold text-black" />
          <div className="flex items-center justify-between p-2">
            <h1 className="text-lg font-semibold">Details</h1>
            <button
              type="button"
              className="mb-2 me-2 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setOpentUpdateModal(true)}
            >
              <span className="me-2">Update</span>
              <HiPencilAlt />
            </button>
          </div>
          <ul className="list-disc ps-6">
            <li>
              <span className="font-semibold">Manager:</span>{" "}
              {currentManager?.firstname + " " + currentManager?.lastname}
            </li>
            <li>
              <span className="font-semibold">Name:</span>{" "}
              {currentDepartment?.district + " " + currentDepartment?.type}
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              {currentDepartment?.phone}
            </li>
            <li>
              <div className="flex items-center">
                <span className="font-semibold">Active:</span>{" "}
                {currentDepartment?.active ? (
                  <div className="ms-1 text-green-400">
                    <HiCheckCircle />
                  </div>
                ) : (
                  <div className="ms-1 text-red-400">
                    <HiXCircle />
                  </div>
                )}
              </div>
            </li>
            <li>
              <span className="font-semibold">Zipcode:</span>{" "}
              {currentDepartment?.zipcode}
            </li>
            {currentDepartment.type === "POSTOFFICE" && (
              <li>
                <span className="font-semibold">Storage:</span>{" "}
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  onClick={() =>
                    showDetail(currentDepartment.cfs._id, "STORAGE")
                  }
                >
                  {currentDepartment?.cfs.district + " " + "STORAGE"}
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Storage view */}
        <div
          id="storageView"
          className="hidden w-1/2 rounded-lg bg-white p-2 dark:bg-gray-800 dark:text-gray-300"
        >
          <h1 className="mb-4 text-center text-lg font-semibold">
            Storage View
          </h1>

          <hr className="mt-4 font-bold text-black" />
          <div className="flex items-center justify-between p-2">
            <h1 className="text-lg font-semibold">Details</h1>
            <button
              type="button"
              className="mb-2 me-2 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setOpentUpdateModal(true)}
            >
              <span className="me-2">Update</span>
              <HiPencilAlt />
            </button>
          </div>
          <ul className="list-disc ps-6">
            <li>
              <span className="font-semibold">Manager:</span>{" "}
              {currentManager?.firstname + " " + currentManager?.lastname}
            </li>
            <li>
              <span className="font-semibold">Name:</span>{" "}
              {currentDepartment?.district + " " + currentDepartment?.type}
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              {currentDepartment?.phone}
            </li>
            <li>
              <div className="flex items-center">
                <span className="font-semibold">Active:</span>{" "}
                {currentDepartment?.active ? (
                  <div className="ms-1 text-green-400">
                    <HiCheckCircle />
                  </div>
                ) : (
                  <div className="ms-1 text-red-400">
                    <HiXCircle />
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="font-semibold">Connected post offices:</div>
              <ul className="list-[circle] ps-5">
                {currentLinkedPostOffices?.map((postOffice) => (
                  <li key={postOffice._id}>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => showDetail(postOffice._id, "POSTOFFICE")}
                    >
                      {postOffice.district + " " + postOffice.type}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Modal */}
        <CreateDepartmentModal
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
          departments={departments}
          fetchDepartments={fetchDepartments}
          openAfterModal={(success: boolean, content: string) => {
            setopenAfterCreateModal(true);
            setAfterCreateMessage({
              success: success,
              content: content,
            });
          }}
        />

        <AfterCreateModal
          openModal={openAfterCreateModal}
          setOpenModal={setopenAfterCreateModal}
          message={afterCreateMessage}
        />

        <UpdateDepartmentModal
          openModal={openUpdateModal}
          setOpenModal={setOpentUpdateModal}
          currentDepartment={currentDepartment}
          departments={departments}
          fetchDetail={fetchDetail}
        />
      </div>
    </>
  );
}
