import { Table } from "flowbite-react";
import { Employee } from ".";

interface EmployeeTableProps {
  employees: Array<Employee>;
  showUpdateModal: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  showUpdateModal,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="hidden md:table-cell">Id</Table.HeadCell>
          <Table.HeadCell className="hidden md:table-cell">Name</Table.HeadCell>
          <Table.HeadCell className="hidden md:table-cell">
            Username
          </Table.HeadCell>
          <Table.HeadCell className="hidden md:table-cell">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="md:hidden">Employee</Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees?.map((employee) => (
            <Table.Row
              key={employee._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="hidden md:table-cell">
                {employee._id}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                {employee.firstname + " " + employee.lastname}
                <div className="py-2 font-normal md:hidden">
                  Id: {employee._id}
                </div>
                <div className="mb-2 font-normal md:hidden">
                  Username: {employee.username}
                </div>
                <div className="mb-2 font-normal md:hidden">
                  Status:{" "}
                  <span
                    className={`rounded ${
                      employee.active ? "bg-green-400" : "bg-red-400"
                    } px-1 text-center text-xs font-bold text-white`}
                  >
                    {employee.active ? "Active" : "Unknown"}
                  </span>
                </div>
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 sm:hidden"
                  onClick={() => showUpdateModal(employee)}
                >
                  Edit
                </button>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {employee.username}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <div
                  className={`rounded ${
                    employee.active ? "bg-green-400" : "bg-red-400"
                  } px-1 text-center text-xs font-bold text-white`}
                >
                  {employee.active ? "Active" : "Unknown"}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  onClick={() => showUpdateModal(employee)}
                >
                  Edit
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployeeTable;
