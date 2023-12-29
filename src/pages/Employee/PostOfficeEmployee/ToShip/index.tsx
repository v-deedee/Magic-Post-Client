import { FC } from "react";
import { Button, Checkbox, Modal, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  listPtCTransactions,
  listStPTransactions,
  pushShipmentPtC,
} from "../../../../services/postOfficeEmployeeApi";
import { HiPlus } from "react-icons/hi";
import SearchBox from "../../../../components/SearchBox";
import { trackShipment } from "../../../../services/customerApi";

interface IToShipProps {}

export const ToShip: FC<IToShipProps> = (props) => {
  const [listStPTransaction, setListStPTransaction] = useState({
    page: 0,
    totalPages: 0,
    transactions: [],
  });

  useEffect(() => {
    const fetchListTransactionData = async () => {
      const data = await listPtCTransactions();
      const payload = data.data.data.payload;
      const { page, totalPages, transactions } = payload;
      console.log(payload);

      setListStPTransaction({
        page,
        totalPages,
        transactions,
      });
    };
    fetchListTransactionData();
  }, []);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [currentShipment, setCurrentShipment] = useState();
  const fetchShipmentData = async (id: string) => {
    const res = await trackShipment(id);
    console.log(res);

    setCurrentShipment(res.data.data.payload.shipment);
  };

  const [listStPShipmentNotPassed, setListStPShipmentNotPassed] = useState([]);

  const fetchStPShipmentNotPassed = async () => {
    const data = await listStPTransactions();
    const payload = data.data.data.payload;
    const transactions = payload.transactions;
    const transactionsNotPassed = transactions.filter(
      (transaction) => transaction.status == "RECEIVED",
    );
    setListStPShipmentNotPassed(transactionsNotPassed);
  };

  const [listPushShipment, setListPushShipment] = useState([]);

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
              fetchStPShipmentNotPassed();
            }}
          >
            <HiPlus />
            <span className="ms-1">Create</span>
          </button>
        </div>
        <div className="w-64">
          <SearchBox placeholder="Search by fields" setKeyword={() => {}} />
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>Shipment</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Sender</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listStPTransaction.transactions.map((transaction) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{transaction.shipment}</Table.Cell>
              <Table.Cell>{transaction.start}</Table.Cell>
              <Table.Cell>{transaction.sender}</Table.Cell>
              {/* <Table.Cell>{transaction.pos.type}</Table.Cell> */}
              {/* <Table.Cell>{transaction.des.type}</Table.Cell> */}
              {/* <Table.Cell>{transaction.receiver}</Table.Cell> */}
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

      {/* Push shipment modal */}
      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>Create</Modal.Header>
        <Modal.Body>
          <Table hoverable>
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
              {listStPShipmentNotPassed.map((transaction) => (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      className="hover:cursor-pointer"
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
            onClick={() => {
              setOpenCreateModal(false);
              pushShipmentPtC({}, listPushShipment);
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
                            <Table.Row className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
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
};
