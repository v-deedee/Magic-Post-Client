import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { HiCheckCircle, HiPencilAlt, HiPlus, HiXCircle } from "react-icons/hi";
import { ITEMS_PER_PAGE } from "../Pagination";
import ManagerTable from "./ManagerTable";
import CreateManagerModal from "./modals/CreateManagerModal";
import UpdateManagerModal from "./modals/UpdateManagerModal";

export interface IManager {
  _id: string;
  username: string;
  role: string;
  department: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  active: boolean;
  __v: number;
}

const defaultManager = {
  _id: "",
  username: "",
  role: "",
  department: {
    _id: "",
    province: "",
    district: "",
    street: "",
    type: "",
  },
  firstname: "",
  lastname: "",
  gender: "",
  email: "",
  active: false,
  __v: 0,
};

export default function Managers() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [managers, setManagers] = useState<Array<IManager>>([]);

  const [currentManager, setCurrentManager] =
    useState<IManager>(defaultManager);

  const [currentManagerUsername, setCurrentManagerUsername] = useState("");

  // Get departments by page
  useEffect(() => {
    fetch(
      `http://localhost:3001/staff/manager?limit=${ITEMS_PER_PAGE}&page=${currentPage}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setManagers(data.data.payload.staffs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  // Get detail by manager username
  useEffect(() => {
    if (currentManagerUsername !== "") {
      // Get manager info
      fetch(`http://localhost:3001/staff/manager/${currentManagerUsername}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentManager(data.data.payload.manager);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentManagerUsername]);

  const showDetail = (username: string) => {
    setCurrentManagerUsername(username);

    document.getElementById("managerView")?.classList.remove("hidden");
  };

  return (
    <>
      <div className="flex gap-4">
        {/* Table */}

        <div className="w-1/2">
          {/* Filter & Sort & Create button */}
          <div className="flex justify-end ps-2">
            <button
              type="button"
              className="mb-2 me-2 flex items-center rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
              onClick={() => setOpenCreateModal(true)}
            >
              <HiPlus />
              <span className="ms-1">New</span>
            </button>
          </div>

          {/* Main table */}
          <ManagerTable
            managers={managers}
            currentManagerId={""}
            showDetail={showDetail}
          />

          {/* Pagination */}
          <Pagination
            itemCount={82}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Manager information */}
        <div
          id="managerView"
          className="hidden w-1/2 rounded-lg bg-white p-2 dark:bg-gray-800 dark:text-gray-300"
        >
          <h1 className="mb-4 text-center text-lg font-semibold">
            Manager information
          </h1>
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
        </div>

        {/* Modal */}
        <CreateManagerModal
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
        />

        <UpdateManagerModal
          openModal={openUpdateModal}
          setOpenModal={setOpentUpdateModal}
          currentManager={currentManager}
        />
      </div>
    </>
  );
}
