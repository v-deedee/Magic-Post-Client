import { Table, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiFilter,
  HiSortAscending,
  HiPencilAlt,
  HiCheckCircle,
  HiXCircle,
  HiPlus,
} from "react-icons/hi";
import CreateDepartmentModal from "./modals/CreateDepartmentModal";
import UpdateDepartmentModal from "./modals/UpdateDepartmentModal";

export interface Department {
  _id: string;
  province: string;
  district: string;
  street: string;
  phone: string;
  type: string;
  cfs: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  zipcode: string;
  active: boolean;
  __v: number;
  geocoding: number[];
}

interface Manager {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  active: boolean;
}

export default function Departments() {
  const ITEMS_PER_PAGE = 5;
  const COUNT_PAGE = 82 / ITEMS_PER_PAGE + 1;

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpentUpdateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentDepartmentId, setCurrentDepartmentId] = useState("");

  const [currentDepartment, setCurrentDepartment] = useState<Department>({
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
  });

  const [currentLinkedPostOffices, setcurrentLinkedPostOffices] =
    useState<Array<Department>>();

  const [currentManager, setCurrentManager] = useState<Manager>();

  const [departments, setDepartments] = useState<Array<Department>>();

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

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= COUNT_PAGE) {
      setCurrentPage(newPage);
    }
  };

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
          <div className="flex justify-between ps-2">
            <div className="flex">
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
            </div>
            <button
              type="button"
              className="mb-2 me-2 flex items-center rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-600"
              onClick={() => setOpenCreateModal(true)}
            >
              <HiPlus />
              <span className="ms-1">New</span>
            </button>
          </div>

          {/* Main table */}
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell className="hidden lg:table-cell">
                Address
              </Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="hidden sm:table-cell">
                <span className="sr-only">Detail</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {departments?.map((department) => (
                <Table.Row
                  key={department._id}
                  className={`dark:border-gray-700 dark:bg-gray-800 
                  ${
                    department._id === currentDepartmentId
                      ? "bg-yellow-100 dark:bg-slate-600"
                      : "bg-white"
                  }`}
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {department.district + " " + department.type}
                    <div className="py-2 font-normal lg:hidden">
                      Address: {department.street}
                    </div>
                    <div className="mb-2 font-normal md:hidden">
                      Status:{" "}
                      <span
                        className={`rounded ${
                          department.active ? "bg-green-400" : "bg-red-400"
                        } px-1 text-center text-xs font-bold text-white`}
                      >
                        {department.active ? "Active" : "Unknown"}
                      </span>
                    </div>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 sm:hidden"
                      onClick={() =>
                        showDetail(department._id, department.type)
                      }
                    >
                      Detail
                    </button>
                  </Table.Cell>
                  <Table.Cell className="hidden lg:block">
                    {department.street}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <div
                      className={`rounded ${
                        department.active ? "bg-green-400" : "bg-red-400"
                      } px-1 text-center text-xs font-bold text-white`}
                    >
                      {department.active ? "Active" : "Unknown"}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden sm:table-cell">
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() =>
                        showDetail(department._id, department.type)
                      }
                    >
                      Detail
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Pagination */}
          <nav
            className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
            aria-label="Table navigation"
          >
            <span className="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {1 + (currentPage - 1) * ITEMS_PER_PAGE}-
                {ITEMS_PER_PAGE + (currentPage - 1) * ITEMS_PER_PAGE <= 82
                  ? ITEMS_PER_PAGE + (currentPage - 1) * ITEMS_PER_PAGE
                  : 82}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                82
              </span>
            </span>
            <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
              <li>
                <button
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-black hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-400 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-400"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
                  </svg>
                </button>
              </li>
              <li>
                <button
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-black hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-400 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-400"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === COUNT_PAGE}
                >
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 96 96"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title />
                    <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
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
