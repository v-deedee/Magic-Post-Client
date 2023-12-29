import { FC, useEffect, useState } from "react";
import {
  listStSTransactions,
  updateStSTransactions,
} from "../../../../services/storageEmployeeApi";
import { Transaction } from "../../../../models/Transaction";
import { Table } from "flowbite-react";
interface IReceiveStSTransactionsProps {}

export const ReceiveStSTransactions: FC<IReceiveStSTransactionsProps> = () => {
  const [receivedStSTransactions, setReceivedStSTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const fetchReceivedStSTransaction = async () => {
      const res = await listStSTransactions("des");
      setReceivedStSTransactions(res.data.data.payload.transactions);
      console.log(res.data.data.payload.transactions);
      console.log(receivedStSTransactions);
    };

    fetchReceivedStSTransaction();
  }, []);

  const updateStatus = async (id: string) => {
    const response = await updateStSTransactions({
      ids: [id],
      data: {
        status: "RECEIVED",
      },
    });
    console.log(response);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {/* Table */}
        <div className="">
          <Table>
            <Table.Head>
              <Table.HeadCell>Shipment</Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell">
                From
              </Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell">
                Start date
              </Table.HeadCell>
              <Table.HeadCell className="hidden w-fit md:table-cell">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="hidden sm:table-cell">
                <span className="sr-only">Detail</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {receivedStSTransactions.map((transaction) => (
                <Table.Row
                  key={transaction._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {transaction.shipment}
                    <div className="py-2 font-normal md:hidden">
                      From: {transaction.pos.district + " POSTOFFICE"}
                    </div>
                    <div className="mb-2 font-normal md:hidden">
                      Start date: {transaction.start}
                    </div>
                    <div className="mb-2 font-normal md:hidden">
                      Status:{" "}
                      <span
                        className={`rounded ${
                          transaction.status === "RECEIVED"
                            ? "bg-green-400"
                            : "bg-yellow-300"
                        } px-1 text-center text-xs font-bold text-white`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <button
                      className="font-medium text-cyan-600 hover:underline disabled:opacity-40 disabled:hover:no-underline dark:text-cyan-500 sm:hidden"
                      onClick={() => updateStatus(transaction._id)}
                      disabled={transaction.status === "RECEIVED"}
                    >
                      Receive
                    </button>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {transaction.pos.district + " POSTOFFICE"}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {transaction.start}
                  </Table.Cell>
                  <Table.Cell className="hidden w-fit md:table-cell">
                    <div
                      className={`rounded ${
                        transaction.status === "RECEIVED"
                          ? "bg-green-400"
                          : "bg-yellow-300"
                      } px-1 text-center text-xs font-bold text-white`}
                    >
                      {transaction.status}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden sm:table-cell">
                    <button
                      className="font-medium text-cyan-600 hover:underline disabled:opacity-40 disabled:hover:no-underline dark:text-cyan-500"
                      onClick={() => updateStatus(transaction._id)}
                      disabled={transaction.status === "RECEIVED"}
                    >
                      Receive
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
