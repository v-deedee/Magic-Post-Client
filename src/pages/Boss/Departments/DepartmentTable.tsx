import { Table } from "flowbite-react";
import { Department } from "../../../models/Department";

interface IDepartmentTableProps {
  departments: Array<Department>;
  currentDepartmentId: string;
  showDetail: (id: string, name: string, type: string) => void;
  showDetailModal: (id: string) => void;
}

const DepartmentTable: React.FC<IDepartmentTableProps> = ({
  departments,
  currentDepartmentId,
  showDetail,
  showDetailModal,
}) => {
  return (
    <>
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
                  onClick={() => showDetailModal(department._id)}
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
                    showDetail(
                      department._id,
                      department.district + " " + department.type,
                      department.type,
                    )
                  }
                >
                  Detail
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default DepartmentTable;
