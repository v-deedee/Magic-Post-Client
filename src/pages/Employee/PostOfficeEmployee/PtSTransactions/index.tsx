import { useEffect, useState } from "react";
import {
  listCtPTransactions,
  listPtSTransactions,
  pushShipmentPtS,
} from "../../../../services/postOfficeEmployeeApi";
import { Button, Modal, Table, Checkbox } from "flowbite-react";

export default function PtSTransactions() {
  const [listPtSTransaction, setListPtSTransaction] = useState({
    page: 0,
    totalPages: 0,
    transactions: [],
  });
  const fetchListTransactionData = async () => {
    const data = await listPtSTransactions();
    const payload = data.data.data.payload;
    const { page, totalPages, transactions } = payload;
    setListPtSTransaction({
      page,
      totalPages,
      transactions,
    });
  };
  useEffect(() => {
    
    fetchListTransactionData();
  }, []);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [listCtPTransactionNotPassed, setListCtPTransactionNotPassed] =
    useState({
      page: 0,
      totalPages: 0,
      transactions: [],
    });

  const fetchCtPShipmentNotPassed = async () => {
    setListCtPTransactionNotPassed({
      page: 0,
      totalPages: 0,
      transactions: [],
    });

    const data = await listCtPTransactions({limit: 500});
    const payload = data.data.data.payload;
    const page = payload.page;
    const totalPages = payload.totalPages;
    const transactions = payload.transactions;
    const transactionsNotPassed = transactions.filter(
      (transaction) => transaction.status == "RECEIVED",
    );

    setListCtPTransactionNotPassed({
      page,
      totalPages,
      transactions: transactionsNotPassed,
    });
  };

  const [listPushShipment, setListPushShipment] = useState([]);

  return (
    <>
      <h1>PtS Transactions</h1>
      <Button
        onClick={() => {
          setOpenCreateModal(true);
          fetchCtPShipmentNotPassed();
        }}
      >
        Create
      </Button>
      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>Create</Modal.Header>
        <Modal.Body>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell>Shipment</Table.HeadCell>
              <Table.HeadCell>Receiver</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {listCtPTransactionNotPassed.transactions.map((transaction) => (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      onClick={(e) => {
                        if (e.target.checked) {
                          let clone = [...listPushShipment];
                          clone.push({ shipment: transaction.shipment });
                          setListPushShipment(clone);
                          console.log(clone);
                        } else {
                          let clone = listPushShipment.filter(
                            (shipment) =>
                              shipment.shipment != transaction.shipment,
                          );
                          setListPushShipment(clone);
                          console.log(clone);
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{transaction.shipment}</Table.Cell>
                  <Table.Cell>{transaction.receiver}</Table.Cell>
                  <Table.Cell>{transaction.start}</Table.Cell>
                  <Table.Cell>{transaction.status}</Table.Cell>
                  <Table.Cell>
                    <a>View</a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              setOpenCreateModal(false);
              
              await pushShipmentPtS(listPushShipment)
              fetchListTransactionData()

            }}
          >
            I accept
          </Button>
          <Button color="gray" onClick={() => setOpenCreateModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
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
          {listPtSTransaction.transactions.map((transaction) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{transaction.shipment}</Table.Cell>
              <Table.Cell>{transaction.start}</Table.Cell>
              <Table.Cell>{transaction.sender}</Table.Cell>
              <Table.Cell>{transaction.pos.type}</Table.Cell>
              {/* <Table.Cell>{transaction.des.type}</Table.Cell> */}
              <Table.Cell>{transaction.receiver}</Table.Cell>
              <Table.Cell>{transaction.status}</Table.Cell>

              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
