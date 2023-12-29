// import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { HiCheckCircle, HiPencilAlt, HiPlus, HiXCircle } from "react-icons/hi";
// import { ITEMS_PER_PAGE } from "../Pagination";
import ManagerTable from "./ManagerTable";
import CreateManagerModal from "./modals/CreateManagerModal";
import UpdateManagerModal from "./modals/UpdateManagerModal";
import { Department } from "../../../models/Department";
import {
  listDepartment,
  listManager,
  viewManager,
} from "../../../services/bossApi";
import SearchBox from "../../../components/SearchBox";
import { Manager, defaultManager } from "../../../models/Manager";
import AfterCreateModal from "./modals/AfterCreateModal";

export default function Managers() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openAfterCreateModal, setOpenAfterCreateModal] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [newUserInfo, setNewUserInfo] = useState("");

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);

  const [managers, setManagers] = useState<Array<Manager>>([]);

  const [currentManager, setCurrentManager] = useState<Manager>(defaultManager);

  const [currentManagerUsername, setCurrentManagerUsername] = useState("");

  const [departments, setDepartments] = useState<Department[]>([]);

  const fetchDepartments = async () => {
    const res = await listDepartment({});
    const departments = res.data.data.payload.departments;
    setDepartments(departments);
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchManagers = async () => {
    const res = await listManager({});
    const managers = res.data.data.payload.staffs;
    setManagers(managers);
  };

  // Get managers
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchCurrentManagers = async () => {
    if (currentManagerUsername !== "") {
      const res = await viewManager(currentManagerUsername);
      const cM = res.data.data.payload.manager;
      setCurrentManager(cM);
    }
  };

  // Get detail by manager username
  useEffect(() => {
    fetchCurrentManagers();
  }, [currentManagerUsername]);

  const showDetail = (username: string) => {
    setCurrentManagerUsername(username);

    document.getElementById("managerView")?.classList.remove("hidden");
  };

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([...managers]);

  function search(list: Manager[]) {
    const temp = list.filter(
      (manager) =>
        (manager.firstname + " " + manager.lastname)
          .toLowerCase()
          .includes(keyword.trim().toLowerCase()) ||
        manager._id.toLocaleLowerCase().includes(keyword.trim().toLowerCase()),
    );
    if (keyword !== "") setSearchList(temp);
    else setSearchList([...list]);
  }
  useEffect(() => {
    search(managers);
  }, [managers, keyword]);

  return (
    <>
      <div className="flex gap-4">
        {/* Table */}
        <div className="w-1/2">
          {/* Search box & Create button */}
          <div className="flex justify-between">
            <div className="p-2">
              <SearchBox
                placeholder="Search by fields"
                setKeyword={setKeyword}
              />
            </div>
            <div className="p-2">
              <button
                type="button"
                className="mb-2 me-2 flex items-center rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                onClick={() => setOpenCreateModal(true)}
              >
                <HiPlus />
                <span className="ms-1">New</span>
              </button>
            </div>
          </div>

          {/* Main table */}
          <ManagerTable
            managers={searchList}
            currentManagerUsername={currentManagerUsername}
            showDetail={showDetail}
          />

          {/* Pagination */}
          {/* <Pagination
            itemCount={82}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
        </div>

        {/* Manager information */}
        <div className="w-1/2 overflow-x-auto rounded-lg bg-white p-2 dark:bg-gray-800 dark:text-gray-300">
          <h1 className="border-b p-4 text-center text-xl font-semibold">
            Manager information
          </h1>
          <div className={`${currentManager._id === "" ? "hidden" : ""}`}>
            <div className="flex p-2">
              <h1 className="text-lg font-semibold">Details</h1>
            </div>
            <ul className="list-disc ps-6">
              <li>
                <span className="font-semibold">Name:</span>{" "}
                {currentManager?.firstname + " " + currentManager?.lastname}
              </li>
              <li>
                <span className="font-semibold">Department:</span>{" "}
                {currentManager?.department.district +
                  " " +
                  currentManager?.department.type}
              </li>
              <li>
                <span className="font-semibold">Username:</span>{" "}
                {currentManager?.username}
              </li>
              <li>
                <span className="font-semibold">Role:</span>{" "}
                {currentManager?.role}
              </li>
              <li>
                <span className="font-semibold">Gender:</span>{" "}
                {currentManager?.gender}
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                {currentManager?.email}
              </li>
              <li>
                <div className="flex items-center">
                  <span className="font-semibold">Active:</span>{" "}
                  {currentManager?.active ? (
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
            </ul>
            <button
              type="button"
              className="m-2 mt-4 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setOpentUpdateModal(true)}
            >
              <span className="me-2">Update</span>
              <HiPencilAlt />
            </button>
          </div>

          <div className={`${currentManager._id !== "" ? "hidden" : ""}`}>
            <h1 className="mt-5 text-center text-lg text-gray-500">
              Click on each manager to see detail information
            </h1>
          </div>
        </div>

        {/* Modal */}
        <CreateManagerModal
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
          departments={departments}
          fetchManagers={fetchManagers}
          openAfterModal={(success: boolean, userInfo: string) => {
            setOpenAfterCreateModal(true);
            setIsSuccess(success);
            setNewUserInfo(userInfo);
          }}
        />

        <AfterCreateModal
          openModal={openAfterCreateModal}
          setOpenModal={setOpenAfterCreateModal}
          success={isSuccess}
          userInfo={newUserInfo}
        />

        <UpdateManagerModal
          openModal={openUpdateModal}
          setOpenModal={setOpentUpdateModal}
          departments={departments}
          currentManager={currentManager}
          fetchCurrentManagers={fetchCurrentManagers}
        />
      </div>
    </>
  );
}
