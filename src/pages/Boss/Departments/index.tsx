import { useEffect, useState } from "react";
import { HiPencilAlt, HiCheckCircle, HiXCircle, HiPlus } from "react-icons/hi";
import CreateDepartmentModal from "./modals/CreateDepartmentModal";
import UpdateDepartmentModal from "./modals/UpdateDepartmentModal";
import DepartmentTable from "./DepartmentTable";
import Pagination from "../Pagination";
import { ITEMS_PER_PAGE } from "../Pagination";
import { Department } from "../../../models/Department";

interface Manager {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  active: boolean;
}

const defaultDepartment = {
  _id: "",
  province: "",
  district: "",
  street: "",
  phone: "",
  type: "",
  cfs: {
    _id: "",
    province: "",
    district: "",
    street: "",
    type: "",
  },
  zipcode: "",
  active: false,
  __v: 1,
  geocoding: [],
};

export default function Departments() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentDepartmentId, setCurrentDepartmentId] = useState("");

  const [currentDepartment, setCurrentDepartment] =
    useState<Department>(defaultDepartment);

  const [currentLinkedPostOffices, setcurrentLinkedPostOffices] =
    useState<Array<Department>>();

  const [currentManager, setCurrentManager] = useState<Manager>();

  const [departments, setDepartments] = useState<Array<Department>>([]);

  // Get departments by page
  useEffect(() => {
    fetch(
      `http://localhost:3001/department?limit=${ITEMS_PER_PAGE}&page=${currentPage}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.data.payload.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  // Get detail by department id
  useEffect(() => {
    if (currentDepartmentId !== "") {
      // Get department info
      fetch(`http://localhost:3001/department/${currentDepartmentId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentDepartment(data.data.payload.department);
        })
        .catch((err) => {
          console.log(err);
        });

      // Get manager infor
      fetch(
        `http://localhost:3001/staff/manager?department=${currentDepartmentId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentManager(data.data.payload.staffs[0]);
        })
        .catch((err) => {
          console.log(err);
        });

      // Get list of linked post office
      fetch(
        `http://localhost:3001/department?cfs=${currentDepartmentId}&limit=100`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIxMDIwMjc3Iiwicm9sZSI6IkJPU1MiLCJleHBpcmVkX3RpbWUiOiIyMDIzLTExLTE1VDAzOjE5OjQ4LjYzNloiLCJjcmVhdGVkX3Rva2VuIjoiMjAyMy0xMS0xNFQwMzoxOTo0OC42MzlaIiwiaWF0IjoxNjk5OTMxOTg4LCJleHAiOjE3ODYzMzE5ODh9.yQMmxKPBu7lpLXPNaRVROJwXfe_zcfvwyoY7FzNCDO0",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setcurrentLinkedPostOffices(data.data.payload.departments);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentDepartmentId]);

  const showDetail = (id: string, type: string) => {
    setCurrentDepartmentId(id);

    document.getElementById("mapView")?.classList.add("hidden");

    if (type === "STORAGE") {
      document.getElementById("storageView")?.classList.remove("hidden");
      document.getElementById("postOfficeView")?.classList.add("hidden");
    } else {
      document.getElementById("storageView")?.classList.add("hidden");
      document.getElementById("postOfficeView")?.classList.remove("hidden");
    }
  };

  return (
    <>
      <div className="flex gap-4">
        {/* Table */}
        <div className="w-1/2 overflow-x-auto">
          {/* Filter & Sort & Create button */}
          <div className="flex justify-end ps-2">
            {/* <div className="flex">
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <button
                    type="button"
                    className="mb-2 me-2 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <HiFilter />
                    <span className="ms-2">Filter</span>
                  </button>
                )}
              >
                <Dropdown.Item>Province</Dropdown.Item>
                <Dropdown.Item>District</Dropdown.Item>
              </Dropdown>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <button
                    type="button"
                    className="mb-2 me-2 flex items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <HiSortAscending />
                    <span className="ms-2">Sort</span>
                  </button>
                )}
              >
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div> */}
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
          <DepartmentTable
            departments={departments}
            currentDepartmentId={currentDepartmentId}
            showDetail={showDetail}
          />

          {/* Pagination */}
          <Pagination
            itemCount={82}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Map view */}
        <div
          id="mapView"
          className="w-1/2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300"
        >
          <div className="border-b p-3 text-center">
            <h2 className="font-bold">MAP</h2>
          </div>
        </div>

        {/* Post office view */}
        <div
          id="postOfficeView"
          className="hidden w-1/2 rounded-lg bg-white p-2 dark:bg-gray-800 dark:text-gray-300"
        >
          <h1 className="mb-4 text-center text-lg font-semibold">
            Post-office view
          </h1>
          <div className="flex justify-center">
            <div className="h-52 w-3/4 bg-gray-200 text-center">Map</div>
          </div>
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
            Storage view
          </h1>
          <div className="flex justify-center">
            <div className="h-52 w-3/4 bg-gray-200 text-center">Map</div>
          </div>
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
        />

        <UpdateDepartmentModal
          openModal={openUpdateModal}
          setOpenModal={setOpentUpdateModal}
          currentDepartment={currentDepartment}
        />
      </div>
    </>
  );
}
