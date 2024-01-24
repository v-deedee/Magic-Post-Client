import { Button, Label, Select, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  createShipment,
  getDistricts,
  getProvinces,
  listCtPTransactions,
} from "../../../../services/postOfficeEmployeeApi";
import { Table } from "flowbite-react";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import SearchBox from "../../../../components/SearchBox";
import { trackShipment } from "../../../../services/customerApi";
import { Shipment } from "../../../../models/Shipment";
import { Transaction } from "../../../../models/Transaction";
// import { AxiosError } from "axios";

export default function CtPTransactions() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [listCtPTransaction, setListCtPTransaction] = useState<Transaction[]>(
    [],
  );

  const [provinces, setProvinces] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    sender: {
      name: "",
      phone: "",
      province: "",
      district: "",
      street: "",
      zipcode: "999999",
    },
    receiver: {
      name: "",
      phone: "",
      province: "",
      district: "",
      street: "",
      zipcode: "999999",
    },
    meta: {
      type: "",
      note: "",
      item: [
        {
          name: "",
          quantity: 0,
          value: 0,
        },
      ],
    },
    // _id: "",
  });

  const addItem = () => {
    const newItemList = [...newTransaction.meta.item];
    newItemList.push({
      name: "",
      quantity: 0,
      value: 0,
    });
    let clone = { ...newTransaction };
    clone.meta.item = newItemList;
    setNewTransaction(clone);
  };

  const removeItem = (pos: number) => {
    let clone = { ...newTransaction };
    clone.meta.item = newTransaction.meta.item.filter((value, index) => {
      console.log(value);
      return index != pos;
    });
    setNewTransaction(clone);
  };

  const onChangeItem = (
    pos: number,
    item: {
      name: string;
      quantity: number;
      value: number;
    },
  ) => {
    let clone = { ...newTransaction };
    clone.meta.item[pos] = item;
    setNewTransaction(clone);
  };

  const [reqError, setReqError] = useState({
    error: false,
    msg: "",
  });

  const createNewTransaction = async () => {
    try {
      const res = await createShipment(newTransaction);
      const shipment = res.data.data.payload.shipment;
      console.log(shipment);

      let clone = { ...newTransaction };
      // clone._id = shipment;
      setNewTransaction(clone);
      setDisplayPrintInvoice("block");
      setReqError({
        error: false,
        msg: "",
      });
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      console.log(error);
      setReqError({
        error: true,
        msg: error.response?.data.message,
      });
    }
  };

  const [currentShipment, setCurrentShipment] = useState<Shipment>();
  const fetchShipmentData = async (id: string) => {
    const res = await trackShipment(id);
    setCurrentShipment(res.data.data.payload.shipment);
  };

  const [senderDistrict, setSenderDistrict] = useState([]);

  const updateSenderDistrict = async () => {
    setSenderDistrict([]);
    const data = await getDistricts({
      province: newTransaction.sender.province,
    });
    const payload = data.data.data.payload;
    const districts = payload.districts;
    let clone = { ...newTransaction };
    clone.sender.district = districts[0];
    setNewTransaction(clone);
    setSenderDistrict(districts);
  };

  const [receiverDistrict, setReceiverDistrict] = useState([]);

  const updateReceiverDistrict = async () => {
    setReceiverDistrict([]);
    const data = await getDistricts({
      province: newTransaction.receiver.province,
    });
    const payload = data.data.data.payload;
    const districts = payload.districts;
    let clone = { ...newTransaction };
    clone.receiver.district = districts[0];
    setNewTransaction(clone);
    setReceiverDistrict(districts);
  };

  const [displayPrintInvoice, setDisplayPrintInvoice] = useState("none");

  useEffect(() => {
    try {
      const fetchListCtPTransactionData = async () => {
        const data = await listCtPTransactions();
        const payload = data.data.data.payload;
        setListCtPTransaction(payload.transactions);
      };

      const fetchProvincesData = async () => {
        const data = await getProvinces();
        const payload = data.data.data.payload;
        setProvinces(payload.provinces);
      };

      // const fetchDistrictsData = async () => {
      //   const data = await getDistricts({ province: provinces[0] });
      //   const payload = data.data.data.payload;
      //   const districts = payload.districts;
      //   setSenderDistrict(districts);
      //   setReceiverDistrict(districts);
      // };

      fetchListCtPTransactionData();
      fetchProvincesData();
      // fetchDistrictsData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      {/* Search box and Create button */}
      <div className="mb-4">
        <div className="py-2">
          <button
            type="button"
            className="mb-2 me-2 flex items-center rounded-lg bg-[#319684] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            onClick={() => setOpenCreateModal(true)}
          >
            <HiPlus />
            <span className="ms-1">New transaction</span>
          </button>
        </div>
        <div className="w-64">
          <SearchBox placeholder="Search by fields" setKeyword={() => {}} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Shipment</Table.HeadCell>
            <Table.HeadCell>Receiver</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {listCtPTransaction.map((transaction) => (
              <Table.Row
                key={transaction._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{transaction.shipment}</Table.Cell>
                <Table.Cell>{transaction.receiver}</Table.Cell>
                <Table.Cell>{transaction.end}</Table.Cell>
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

      {/* Create transaction modal */}
      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewTransaction();
          }}
        >
          <Modal.Header>Create new Transaction</Modal.Header>
          <Modal.Body className="max-h-[60vh] overflow-auto">
            {/* Select shipment type */}
            <div>
              <div className="block">
                <Label htmlFor="type" value="Type" />
              </div>
              <Select
                className="mb-2"
                id="type"
                required
                onChange={(e) => {
                  let clone = { ...newTransaction };
                  clone.meta.type = e.target.value;
                  setNewTransaction(clone);
                }}
              >
                <option value="" defaultChecked>
                  Select Type
                </option>
                <option value="DOCUMENT">Document</option>
                <option value="GOODS">Goods</option>
              </Select>
            </div>

            {/* Note for shipment */}
            <div>
              <div className="block">
                <Label htmlFor="note" value="Note" />
              </div>
              <TextInput
                id="note"
                type="text"
                placeholder=""
                required
                onChange={(e) => {
                  let clone = { ...newTransaction };
                  clone.meta.note = e.target.value;
                  setNewTransaction(clone);
                }}
              />
            </div>

            {/* List of items */}
            <div className="mt-4">
              <div className="block">
                <Label htmlFor="" value="List item" />
              </div>

              <hr />

              {newTransaction.meta.item.map((item, index) => (
                <div key={index} className="my-2 flex gap-2">
                  <div className="grow flex-col">
                    <div className="block">
                      <Label htmlFor={`itemName${index}`} value="Name" />
                    </div>
                    <TextInput
                      id={`itemName${index}`}
                      type="text"
                      placeholder=""
                      required
                      value={item.name}
                      name="sender-name"
                      onChange={(e) => {
                        const newItem = item;
                        newItem.name = e.target.value;
                        onChangeItem(index, newItem);
                      }}
                    />
                  </div>
                  <div className="grow flex-col">
                    <div className="block">
                      <Label
                        htmlFor={`itemQuantity${index}`}
                        value="Quantity"
                      />
                    </div>
                    <TextInput
                      id={`itemQuantity${index}`}
                      type="number"
                      placeholder=""
                      required
                      value={item.quantity}
                      onChange={(e) => {
                        const newItem = item;
                        newItem.quantity = parseInt(e.target.value);
                        onChangeItem(index, newItem);
                      }}
                    />
                  </div>
                  <div className="grow flex-col">
                    <div className="block">
                      <Label htmlFor={`itemValue${index}`} value="Value" />
                    </div>
                    <TextInput
                      id={`itemValue${index}`}
                      type="number"
                      placeholder=""
                      required
                      value={item.value}
                      onChange={(e) => {
                        const newItem = item;
                        newItem.value = parseFloat(e.target.value);
                        onChangeItem(index, newItem);
                      }}
                    />
                  </div>
                  <div>
                    <div className="invisible block">
                      <Label htmlFor={`itemValue${index}`} value="Value" />
                    </div>
                    <Button
                      color="gray"
                      onClick={() => {
                        removeItem(index);
                      }}
                    >
                      <div className="text-xl">
                        <HiTrash />
                      </div>
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="my-2" onClick={addItem}>
                Add
              </Button>

              <hr className="my-2" />
            </div>

            {/* Sender and Receiver information */}
            <div className="flex">
              {/* Sender */}
              <div className="grow">
                {/* Name */}
                <div>
                  <div className="block">
                    <Label htmlFor="note" value="Sender" />
                  </div>
                  <div>
                    <div className="mt-3">
                      <Label htmlFor="sender-name" value="Name" />
                    </div>
                    <TextInput
                      id="sender-name"
                      type="text"
                      placeholder="Nguyen Van A"
                      required
                      value={newTransaction.sender.name}
                      onChange={(e) => {
                        let clone = { ...newTransaction };
                        clone.sender.name = e.target.value;
                        setNewTransaction(clone);
                      }}
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="sender-phone" value="Phone" />
                  </div>
                  <TextInput
                    id="phone"
                    type="text"
                    placeholder="0123456789"
                    required
                    value={newTransaction.sender.phone}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.sender.phone = e.target.value;
                      setNewTransaction(clone);
                    }}
                  />
                </div>
                {/* Province */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="sender-province" value="Province" />
                  </div>
                  <Select
                    id="sender-province"
                    required
                    value={newTransaction.sender.province}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.sender.province = e.target.value;
                      setNewTransaction(clone);
                      updateSenderDistrict();
                    }}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province + "province1"} value={province}>
                        {province}
                      </option>
                    ))}
                  </Select>
                </div>
                {/* District */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="sender-district" value="District" />
                  </div>
                  <Select
                    id="sender-district"
                    required
                    value={newTransaction.sender.district}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.sender.district = e.target.value;
                      setNewTransaction(clone);
                    }}
                  >
                    <option value="">Select District</option>
                    {senderDistrict.map((district) => (
                      <option key={district + "district1"} value={district}>
                        {district}
                      </option>
                    ))}
                  </Select>
                </div>
                {/* Street */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="sender-street" value="Street" />
                  </div>
                  <TextInput
                    id="sender-street"
                    type="text"
                    placeholder="80 Dinh Tien Hoang"
                    required
                    value={newTransaction.sender.street}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.sender.street = e.target.value;
                      setNewTransaction(clone);
                    }}
                  />
                </div>
              </div>

              {/* Receiver */}
              <div className="grow px-4">
                {/* Name */}
                <div>
                  <div className="block">
                    <Label htmlFor="note" value="Receiver" />
                  </div>
                  <div>
                    <div className="mt-3">
                      <Label htmlFor="receiver-name" value="Name" />
                    </div>
                    <TextInput
                      id="receiver-name"
                      type="text"
                      placeholder="Nguyen Van A"
                      required
                      value={newTransaction.receiver.name}
                      onChange={(e) => {
                        let clone = { ...newTransaction };
                        clone.receiver.name = e.target.value;
                        setNewTransaction(clone);
                      }}
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="receiver-phone" value="Phone" />
                  </div>
                  <TextInput
                    id="receiver-phone"
                    type="text"
                    placeholder="0123456789"
                    required
                    value={newTransaction.receiver.phone}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.receiver.phone = e.target.value;
                      setNewTransaction(clone);
                    }}
                  />
                </div>
                {/* Province */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="receiver-province" value="Province" />
                  </div>
                  <Select
                    id="receiver-province"
                    required
                    value={newTransaction.receiver.province}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.receiver.province = e.target.value;
                      setNewTransaction(clone);
                      updateReceiverDistrict();
                    }}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province + "province2"} value={province}>
                        {province}
                      </option>
                    ))}
                  </Select>
                </div>
                {/* District */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="receiver-district" value="District" />
                  </div>
                  <Select
                    id="receiver-district"
                    required
                    value={newTransaction.receiver.district}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.receiver.district = e.target.value;
                      setNewTransaction(clone);
                    }}
                  >
                    <option value="">Select District</option>
                    {receiverDistrict.map((district) => (
                      <option key={district + "district2"} value={district}>
                        {district}
                      </option>
                    ))}
                  </Select>
                </div>
                {/* Street */}
                <div>
                  <div className="mt-3">
                    <Label htmlFor="receiver-street" value="Street" />
                  </div>
                  <TextInput
                    id="receiver-street"
                    type="text"
                    placeholder="80 Dinh Tien Hoang"
                    required
                    value={newTransaction.receiver.street}
                    onChange={(e) => {
                      let clone = { ...newTransaction };
                      clone.receiver.street = e.target.value;
                      setNewTransaction(clone);
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
            <Button color="gray" onClick={() => setOpenCreateModal(false)}>
              Cancel
            </Button>
            <Link to="/print" state={newTransaction}>
              <Button style={{ display: displayPrintInvoice }}>Print</Button>
            </Link>
            <p className="text-red-500">{reqError.msg}</p>
          </Modal.Footer>
        </form>
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
          <div className="space-y-6 dark:text-white">
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
                          <Table.HeadCell className="dark:bg-slate-600">
                            Name
                          </Table.HeadCell>
                          <Table.HeadCell className="dark:bg-slate-600">
                            Quantity
                          </Table.HeadCell>
                          <Table.HeadCell className="dark:bg-slate-600">
                            Value
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {currentShipment?.meta.item.map((item) => (
                            <Table.Row
                              key={item._id}
                              className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <Table.Cell className="">{item.name}</Table.Cell>
                              <Table.Cell className="">
                                {item.quantity}
                              </Table.Cell>
                              <Table.Cell className="">{item.value}</Table.Cell>
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
    </div>
  );
}
