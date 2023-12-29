import { FC, useEffect, useState } from "react";
import { Transaction } from "../../../../models/Transaction";
import {
  listStPTransactions,
  listStSTransactions,
  pushShipmentStP,
} from "../../../../services/storageEmployeeApi";
import { Button, Modal, Table, Checkbox } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import SearchBox from "../../../../components/SearchBox";
import { trackShipment } from "../../../../services/customerApi";
interface IStPTransactionsProps {}

export const StPTransactions: FC<IStPTransactionsProps> = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [currentShipment, setCurrentShipment] = useState();
  const fetchShipmentData = async (id: string) => {
    const res = await trackShipment(id);
    console.log(res);

    setCurrentShipment(res.data.data.payload.shipment);
  };

  const [sentStPTransactions, setsentStPTransactions] = useState<Transaction[]>(
    [],
  );

  useEffect(() => {
    const fetchSentStPTransactions = async () => {
      const res = await listStPTransactions("pos");
      setsentStPTransactions(res.data.data.payload.transactions);
    };

    fetchSentStPTransactions();
  }, []);

  const [notPassedPtSTransactions, setNotPassedPtSTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const fetchReceivedPtSTransactions = async () => {
      const res = await listStSTransactions("des");
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
    const res = await pushShipmentStP({}, readyShipments);
    console.log(res);
  };

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
              {notPassedPtSTransactions.map((transaction) => (
                <Table.Row>
                  <Table.Cell>
                    <Checkbox
                      className="hover:cursor-pointer"
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
                  <Table.Cell>
                    <span
                      className={`rounded ${
                        transaction.status === "RECEIVED"
                          ? "bg-green-400"
                          : "bg-yellow-300"
                      } px-1 text-center text-xs font-bold text-white`}
                    >
                      {transaction.status}
                    </span>
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
              pushShipments();
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
        size={"xl"}
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

      {/* Table */}
      <div className="overflow-x-auto">
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
              {sentStPTransactions.map((transaction) => (
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
      </div>
    </>
  );
};
