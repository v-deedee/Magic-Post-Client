import { useEffect, useState } from "react";
import {
  listCtPTransactions,
  listPtSTransactions,
  pushShipmentPtS,
} from "../../../../services/postOfficeEmployeeApi";
import { Button, Modal, Table, Checkbox } from "flowbite-react";
import { trackShipment } from "../../../../services/customerApi";
import { HiPlus } from "react-icons/hi";
import SearchBox from "../../../../components/SearchBox";
import { Transaction } from "../../../../models/Transaction";
import { Shipment } from "../../../../models/Shipment";

export default function PtSTransactions() {
  const [listPtSTransaction, setListPtSTransaction] = useState<Transaction[]>(
    [],
  );
  const fetchListTransactionData = async () => {
    const data = await listPtSTransactions();
    const payload = data.data.data.payload;
    setListPtSTransaction(payload.transactions);
  };
  useEffect(() => {
    fetchListTransactionData();
  }, []);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [currentShipment, setCurrentShipment] = useState<Shipment>();
  const fetchShipmentData = async (id: string) => {
    const res = await trackShipment(id);
    setCurrentShipment(res.data.data.payload.shipment);
  };

  const [listCtPTransactionNotPassed, setListCtPTransactionNotPassed] =
    useState<Transaction[]>([]);

  const fetchCtPShipmentNotPassed = async () => {
    setListCtPTransactionNotPassed([]);

    const data = await listCtPTransactions();
    const payload = data.data.data.payload;
    const transactions = payload.transactions;
    const transactionsNotPassed = transactions.filter(
      (transaction: Transaction) => transaction.status == "RECEIVED",
    );

    setListCtPTransactionNotPassed(transactionsNotPassed);
  };

  const [listPushShipment, setListPushShipment] = useState([{ shipment: "" }]);

  return (
    <>
      {/* Search box and Create button */}
      <div className="mb-4">
        <div className="py-2">
          <button
            type="button"
            className="mb-2 me-2 flex items-center rounded-lg bg-[#319684] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            onClick={() => {
              setOpenCreateModal(true);
              fetchCtPShipmentNotPassed();
            }}
          >
            <HiPlus />
            <span className="ms-1">Create</span>
          </button>
        </div>
        <div className="sm:w-64">
          <SearchBox placeholder="Search by fields" setKeyword={() => {}} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Shipment</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Sender</Table.HeadCell>
            <Table.HeadCell>Des</Table.HeadCell>
            <Table.HeadCell>Receiver</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Detail</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="">
            {listPtSTransaction.map((transaction) => (
              <Table.Row
                key={transaction._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{transaction.shipment}</Table.Cell>
                <Table.Cell>{transaction.start}</Table.Cell>
                <Table.Cell>{transaction.sender}</Table.Cell>
                <Table.Cell>
                  {transaction.des.district + " " + transaction.des.type}
                </Table.Cell>
                {/* <Table.Cell>{transaction.des.type}</Table.Cell> */}
                <Table.Cell>
                  {transaction.receiver == null
                    ? "UNKOWN"
                    : transaction.receiver}
                </Table.Cell>
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
                  <button
                    className="font-medium text-cyan-600 hover:underline disabled:opacity-40 disabled:hover:no-underline dark:text-cyan-500"
                    onClick={() => {
                      setOpenDetailModal(true);
                      fetchShipmentData(transaction.shipment);
                    }}
                  >
                    Detail
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Push shipment modal */}
      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>Create</Modal.Header>
        <Modal.Body>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                <Checkbox disabled />
              </Table.HeadCell>
              <Table.HeadCell>Shipment</Table.HeadCell>
              <Table.HeadCell>Receiver</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {listCtPTransactionNotPassed.map((transaction) => (
                <Table.Row key={transaction._id}>
                  <Table.Cell>
                    <Checkbox
                      className="hover:cursor-pointer"
                      onClick={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.checked) {
                          let clone = [...listPushShipment];
                          clone.push({ shipment: transaction.shipment });
                          setListPushShipment(clone);
                        } else {
                          let clone = listPushShipment.filter(
                            (shipment) =>
                              shipment.shipment != transaction.shipment,
                          );
                          setListPushShipment(clone);
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{transaction.shipment}</Table.Cell>
                  <Table.Cell>{transaction.receiver}</Table.Cell>
                  <Table.Cell>{transaction.start}</Table.Cell>
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
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={async () => {
              setOpenCreateModal(false);

              await pushShipmentPtS(listPushShipment);
              fetchListTransactionData();
            }}
          >
            Push
          </Button>
          <Button color="gray" onClick={() => setOpenCreateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View shipment detail modal */}
      <Modal
        size={"lg"}
        dismissible
        show={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      >
        <Modal.Header>Shipment detail</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <ul>
              <li>
                <span className="font-bold">Sender:</span>
                <ul className="list-inside list-disc">
                  <li>Name: {currentShipment?.sender.name}</li>
                  <li>
                    Address:{" "}
                    {currentShipment?.sender.street +
                      ", " +
                      currentShipment?.sender.district +
                      ", " +
                      currentShipment?.sender.province}
                  </li>
                  <li>Phone: {currentShipment?.sender.phone}</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Receiver:</span>
                <ul className="list-inside list-disc">
                  <ul className="list-inside list-disc">
                    <li>Name: {currentShipment?.receiver.name}</li>
                    <li>
                      Address:{" "}
                      {currentShipment?.receiver.street +
                        ", " +
                        currentShipment?.receiver.district +
                        ", " +
                        currentShipment?.receiver.province}
                    </li>
                    <li>Phone: {currentShipment?.receiver.phone}</li>
                  </ul>
                </ul>
              </li>
              <li>
                <span className="font-bold">Meta:</span>
                <ul className="list-inside list-disc">
                  <li>Note: {currentShipment?.meta.note}</li>
                  <li>Type: {currentShipment?.meta.type}</li>
                  <li>
                    Items:
                    <div className="mt-2 overflow-x-auto">
                      <Table>
                        <Table.Head>
                          <Table.HeadCell>Name</Table.HeadCell>
                          <Table.HeadCell>Quantity</Table.HeadCell>
                          <Table.HeadCell>Value</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {currentShipment?.meta.item.map((item) => (
                            <Table.Row
                              key={item._id}
                              className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <Table.Cell className="text-black">
                                {item.name}
                              </Table.Cell>
                              <Table.Cell className="text-black">
                                {item.quantity}
                              </Table.Cell>
                              <Table.Cell className="text-black">
                                {item.value}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => setOpenDetailModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
