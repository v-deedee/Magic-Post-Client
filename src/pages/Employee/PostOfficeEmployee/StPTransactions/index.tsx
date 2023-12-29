import { useEffect, useState } from "react";
import { listStPTransactions, updateStPTransactions } from "../../../../services/postOfficeEmployeeApi";
import { Button, Table } from "flowbite-react";

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

  const acceptShipment = async(id) => {
    const data = {
      "ids": [id],
      "data": {
        "status": "RECEIVED"
      }
    }
    const res = await updateStPTransactions(data)
    console.log(res);
  }

  return (
    <>
      <h1>StP Transactions</h1>
      <Button>Accept</Button>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Shipment</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Sender</Table.HeadCell>
          <Table.HeadCell>Pos</Table.HeadCell>
          <Table.HeadCell>Des</Table.HeadCell>
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
              <Table.Cell>{transaction.pos.type}</Table.Cell>
              <Table.Cell>{transaction.des.type}</Table.Cell>
              <Table.Cell>{transaction.receiver}</Table.Cell>
              <Table.Cell>{transaction.status}</Table.Cell>

              <Table.Cell>
                <Button
                  onClick={(e) => {
                    console.log(transaction._id)
                    acceptShipment(transaction._id);
                  }}
                >
                  Accept
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
