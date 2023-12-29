import { Button, Checkbox, Modal, Table } from "flowbite-react";
import { Transaction } from "../../../../models/Transaction";
import {
  listPtSTransactions,
  listStSTransactions,
  pushShipmentStS,
} from "../../../../services/storageEmployeeApi";
import { useEffect, useState } from "react";

export default function SendStSTransactions() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [sentStSTransactions, setSentStSTransactions] = useState<Transaction[]>(
    [],
  );

  useEffect(() => {
    const fetchSentStSTransaction = async () => {
      const res = await listStSTransactions("pos");
      setSentStSTransactions(res.data.data.payload.transactions);
    };

    fetchSentStSTransaction();
  }, []);

  const [notPassedPtSTransactions, setNotPassedPtSTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const fetchReceivedPtSTransactions = async () => {
      const res = await listPtSTransactions("des");
      const receivedPtSTransactions: Transaction[] =
        res.data.data.payload.transactions;

      setNotPassedPtSTransactions(
        receivedPtSTransactions.filter(
          (transaction) => transaction.status === "RECEIVED",
        ),
      );
    };
    fetchReceivedPtSTransactions();
  }, []);

  const [readyShipments, setReadyShipments] = useState<
    Array<{ shipment: string }>
  >([]);

  const pushShipments = async () => {
    const res = await pushShipmentStS({}, readyShipments);
    console.log(res);
  };

  return (
    <>
      <Button
        className="mb-4"
        onClick={() => {
          setOpenCreateModal(true);
          // fetchCtPShipmentNotPassed();
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
              {notPassedPtSTransactions.map((transaction) => (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          let clone: Array<{ shipment: string }> = [
                            ...readyShipments,
                          ];
                          clone.push({ shipment: transaction.shipment });
                          setReadyShipments(clone);
                          console.log(clone);
                        } else {
                          let clone = readyShipments.filter(
                            (shipment) =>
                              shipment.shipment != transaction.shipment,
                          );
                          setReadyShipments(clone);
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
            onClick={() => {
              setOpenCreateModal(false);
              pushShipments();
            }}
          >
            I accept
          </Button>
          <Button color="gray" onClick={() => setOpenCreateModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
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
                To
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
              {sentStSTransactions.map((transaction) => (
                <Table.Row
                  key={transaction._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {transaction.shipment}
                    <div className="py-2 font-normal md:hidden">
                      To:{" "}
                      {transaction.des.district + " " + transaction.des.type}
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
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {transaction.pos.district + " " + transaction.pos.type}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {transaction.des.district + " " + transaction.des.type}
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
                  <Table.Cell className="hidden sm:table-cell"></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
