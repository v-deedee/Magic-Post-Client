import { Table } from "flowbite-react";
import { IManager } from ".";

interface IManagerTableProps {
  managers: Array<IManager>;
  currentManagerUsername: string;
  showDetail: (username: string) => void;
}

const ManagerTable: React.FC<IManagerTableProps> = ({
  managers,
  currentManagerUsername,
  showDetail,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="hidden lg:table-cell">Id</Table.HeadCell>
          <Table.HeadCell className="lg:hidden">Manager</Table.HeadCell>
          <Table.HeadCell className="hidden lg:table-cell">Name</Table.HeadCell>
          <Table.HeadCell className="hidden md:table-cell">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="hidden sm:table-cell">
            <span className="sr-only">Detail</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {managers?.map((manager) => (
            <Table.Row
              key={manager._id}
              className={`dark:border-gray-700 dark:bg-gray-800 
                  ${
                    manager.username === currentManagerUsername
                      ? "bg-yellow-100 dark:bg-slate-600"
                      : "bg-white"
                  }`}
            >
              <Table.Cell className="hidden lg:block">{manager._id}</Table.Cell>
              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                {manager.firstname + " " + manager.lastname}
                <div className="py-2 font-normal lg:hidden">
                  Id: {manager._id}
                </div>
                <div className="mb-2 font-normal md:hidden">
                  Status:{" "}
                  <span
                    className={`rounded ${
                      manager.active ? "bg-green-400" : "bg-red-400"
                    } px-1 text-center text-xs font-bold text-white`}
                  >
                    {manager.active ? "Active" : "Unknown"}
                  </span>
                </div>
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 sm:hidden"
                  onClick={() => showDetail(manager.username)}
                >
                  Detail
                </button>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <div
                  className={`rounded ${
                    manager.active ? "bg-green-400" : "bg-red-400"
                  } px-1 text-center text-xs font-bold text-white`}
                >
                  {manager.active ? "Active" : "Unknown"}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  onClick={() => showDetail(manager.username)}
                >
                  Detail
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ManagerTable;
