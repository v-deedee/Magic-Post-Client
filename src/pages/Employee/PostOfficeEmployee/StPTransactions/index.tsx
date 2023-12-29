import { useEffect, useState } from "react";
import {
  listStPTransactions,
  updateStPTransactions,
} from "../../../../services/postOfficeEmployeeApi";
import { Button, Table } from "flowbite-react";
import SearchBox from "../../../../components/SearchBox";

export default function StPTransactions() {
  const [listStPTransaction, setListStPTransaction] = useState({
    page: 0,
    totalPages: 0,
    transactions: [],
  });

  useEffect(() => {
    const fetchListTransactionData = async () => {
      const data = await listStPTransactions();
      const payload = data.data.data.payload;
      const { page, totalPages, transactions } = payload;

      setListStPTransaction({
        page,
        totalPages,
        transactions,
      });
    };
    fetchListTransactionData();
  }, []);

  const acceptShipment = async (id) => {
    const data = {
      ids: [id],
      data: {
        status: "RECEIVED",
      },
    };
    const res = await updateStPTransactions(data);
    console.log(res);
  };

  return (
    <>
      {/* Search box and Create button */}
      <div className="mb-4">
        <div className="w-64">
          <SearchBox placeholder="Search by fields" setKeyword={() => {}} />
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Shipment</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Sender</Table.HeadCell>
          <Table.HeadCell>From</Table.HeadCell>
          <Table.HeadCell>Receiver</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listStPTransaction.transactions.map((transaction) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{transaction.shipment}</Table.Cell>
              <Table.Cell>{transaction.start}</Table.Cell>
              <Table.Cell>{transaction.sender}</Table.Cell>
              <Table.Cell>
                {transaction.pos.district + " " + transaction.pos.type}
              </Table.Cell>
              <Table.Cell>{transaction.receiver}</Table.Cell>
              <Table.Cell>
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
              <Table.Cell>
                {/* <Button
                  onClick={() => {
                    console.log(transaction._id);
                    acceptShipment(transaction._id);
                  }}
                >
                  Accept
                </Button> */}
                <button
                  className="font-medium text-cyan-600 hover:underline disabled:opacity-40 disabled:hover:no-underline dark:text-cyan-500"
                  onClick={() => {
                    console.log(transaction._id);
                    acceptShipment(transaction._id);
                  }}
                  disabled={transaction.status !== "SENT"}
                >
                  Receive
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
