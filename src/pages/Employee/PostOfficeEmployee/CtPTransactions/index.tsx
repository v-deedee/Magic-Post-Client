import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { Form, useLoaderData } from "react-router-dom";
import {
  createShipment,
  getDistricts,
  getProvinces,
  listCtPTransactions,
} from "../../../../services/postOfficeEmployeeApi";
import { Table } from "flowbite-react";
import { Modal } from "flowbite-react";
import { CtPTransactionModal } from "./CtPTransactionsModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const loader = async () => {
  return null;
};

export const action = async ({ request, params }) => {
  console.log("do action");
  return "action";
};

export default function CtPTransactions() {
  useEffect(() => {
    try {
      const fetchListCtPTransactionData = async () => {
        const data = await listCtPTransactions({});
        const payload = data.data.data.payload;
        const page = payload.page;
        const totalPages = payload.totalPages;
        const transactions = payload.transactions;
        setListCtPTransaction({
          page,
          totalPages,
          transactions,
        });
        setOldListCtPTransaction({
          page,
          totalPages,
          transactions,
        });
      };

      const fetchProvincesData = async () => {
        const data = await getProvinces();
        const payload = data.data.data.payload;
        const provinces = payload.provinces;
        setProvinces(provinces);
      };

      const fetchDistrictsData = async () => {
        const data = await getDistricts({ province: "Ha Noi" });
        const payload = data.data.data.payload;
        const districts = payload.districts;
        setSenderDistrict(districts);
        setReceiverDistrict(districts);
      };

      fetchListCtPTransactionData();
      fetchProvincesData();
      fetchDistrictsData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [listCtPTransaction, setListCtPTransaction] = useState({
    page: 0,
    totalPages: 0,
    transactions: [],
  });

  const [oldListCtPTransaction, setOldListCtPTransaction] = useState({
    page: 0,
    totalPages: 0,
    transactions: [],
  });

  const filterTable = (field, value) => {
    const { page, totalPages, transactions } = oldListCtPTransaction;

    const filterList = transactions.filter((item) => {
      return item[field].includes(value);
    });

    setListCtPTransaction({
      page,
      totalPages,
      transactions: filterList,
    });
  };

  const [provinces, setProvinces] = useState([]);

  const initCtPTransactionData = {
    sender: {
      name: "",
      phone: "",
      province: "",
      district: "",
      street: "",
      zipcode: "100000",
    },
    receiver: {
      name: "",
      phone: "",
      province: "",
      district: "",
      street: "",
      zipcode: "100000",
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
  };

  const [CtPTransaction, setCtPTransaction] = useState(initCtPTransactionData);

  const addItem = () => {
    const newList = [...CtPTransaction.meta.item];
    newList.push({
      name: "",
      quantity: "",
      value: "",
    });
    let clone = { ...CtPTransaction };
    clone.meta.item = newList;
    setCtPTransaction(clone);
  };

  const removeItem = (pos) => {
    let clone = { ...CtPTransaction };
    clone.meta.item = CtPTransaction.meta.item.filter((value, index) => {
      return index != pos;
    });
    setCtPTransaction(clone);
  };

  const onChangeItem = (pos, item) => {
    let clone = { ...CtPTransaction };
    clone.meta.item[pos] = item;
    setCtPTransaction(clone);
  };

  const [openModal, setOpenModal] = useState(false);

  const createNewTransaction = async () => {
    await createShipment(CtPTransaction);
  };

  const [senderDistrict, setSenderDistrict] = useState([]);

  const updateSenderDistrict = async () => {
    setSenderDistrict([]);
    const data = await getDistricts({
      province: CtPTransaction.sender.province,
    });
    const payload = data.data.data.payload;
    const districts = payload.districts;
    let clone = { ...CtPTransaction };
    clone.sender.district = districts[0];
    setCtPTransaction(clone);
    setSenderDistrict(districts);
  };

  const [receiverDistrict, setReceiverDistrict] = useState([]);

  const updateReceiverDistrict = async () => {
    setReceiverDistrict([]);
    const data = await getDistricts({
      province: CtPTransaction.receiver.province,
    });
    const payload = data.data.data.payload;
    const districts = payload.districts;
    let clone = { ...CtPTransaction };
    clone.receiver.district = districts[0];
    setCtPTransaction(clone);
    setReceiverDistrict(districts);
  };

  return (
    <div>
      <h1>CtP Transactions</h1>
      <Button onClick={() => setOpenModal(true)}>Create</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new Transaction</Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Type" />
              </div>
              <Select
                id="type"
                onChange={(e) => {
                  let clone = { ...CtPTransaction };
                  clone.meta.type = e.target.value;
                  setCtPTransaction(clone);
                }}
              >
                <option value="DOCUMENT">Document</option>
                <option value="Gun">Gun</option>
              </Select>
              <div className="mb-2 block">
                <Label htmlFor="note" value="Note" />
              </div>
              <TextInput
                id="note"
                type="text"
                placeholder=""
                required
                value={CtPTransaction.meta.note}
                onChange={(e) => {
                  let clone = { ...CtPTransaction };
                  clone.meta.note = e.target.value;
                  setCtPTransaction(clone);
                }}
              />
            </div>
            <div>
              List Item <br />
              {CtPTransaction.meta.item.map((item, index) => (
                <div className="flex">
                  <div className="grow flex-col">
                    <div className="mb-2 block">
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
                    <div className="mb-2 block">
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
                        newItem.quantity = e.target.value;
                        onChangeItem(index, newItem);
                      }}
                    />
                  </div>
                  <div className="grow flex-col">
                    <div className="mb-2 block">
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
                        newItem.value = e.target.value;
                        onChangeItem(index, newItem);
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      removeItem(index);
                    }}
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button onClick={addItem}>+</Button>
            </div>
            <div className="flex">
              <div className="grow">
                Sender
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sender-name" value="Name" />
                  </div>
                  <TextInput
                    id="sender-name"
                    type="text"
                    placeholder="Nguyen Van A"
                    required
                    value={CtPTransaction.sender.name}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.sender.name = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sender-phone" value="Phone" />
                  </div>
                  <TextInput
                    id="phone"
                    type="text"
                    placeholder="0123456789"
                    required
                    value={CtPTransaction.sender.phone}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.sender.phone = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sender-province" value="Province" />
                  </div>
                  <Select
                    id="sender-province"
                    required
                    value={CtPTransaction.sender.province}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.sender.province = e.target.value;
                      setCtPTransaction(clone);
                      updateSenderDistrict();
                    }}
                  >
                    {provinces.map((province) => (
                      <option value={province}>{province}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sender-district" value="District" />
                  </div>
                  <Select
                    id="sender-district"
                    required
                    value={CtPTransaction.sender.district}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.sender.district = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  >
                    {senderDistrict.map((district) => (
                      <option value={district}>{district}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="sender-street" value="Street" />
                  </div>
                  <TextInput
                    id="sender-street"
                    type="text"
                    placeholder="80 Dinh Tien Hoang"
                    required
                    value={CtPTransaction.sender.street}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.sender.street = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
              </div>

              <div className="grow px-4">
                Receiver
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="receiver-name" value="Name" />
                  </div>
                  <TextInput
                    id="receiver-name"
                    type="text"
                    placeholder="Nguyen Van A"
                    required
                    value={CtPTransaction.receiver.name}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.receiver.name = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="receiver-phone" value="Phone" />
                  </div>
                  <TextInput
                    id="receiver-phone"
                    type="text"
                    placeholder="0123456789"
                    required
                    value={CtPTransaction.receiver.phone}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.receiver.phone = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="receiver-province" value="Province" />
                  </div>
                  <Select
                    id="receiver-province"
                    required
                    value={CtPTransaction.receiver.province}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.receiver.province = e.target.value;
                      setCtPTransaction(clone);
                      updateReceiverDistrict();
                    }}
                  >
                    {provinces.map((province) => (
                      <option value={province}>{province}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="receiver-district" value="District" />
                  </div>
                  <Select
                    id="receiver-district"
                    required
                    value={CtPTransaction.receiver.district}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.receiver.district = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  >
                    {receiverDistrict.map((district) => (
                      <option value={district}>{district}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="receiver-street" value="Street" />
                  </div>
                  <TextInput
                    id="receiver-street"
                    type="text"
                    placeholder="80 Dinh Tien Hoang"
                    required
                    value={CtPTransaction.receiver.street}
                    onChange={(e) => {
                      let clone = { ...CtPTransaction };
                      clone.receiver.street = e.target.value;
                      setCtPTransaction(clone);
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              createNewTransaction();
            }}
          >
            Submit
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            Shipment
            <TextInput
              onChange={(e) => {
                filterTable("shipment", e.target.value);
              }}
            />
          </Table.HeadCell>
          <Table.HeadCell>
            Receiver
            <TextInput />
          </Table.HeadCell>
          <Table.HeadCell>
            Date
            <TextInput />
          </Table.HeadCell>
          <Table.HeadCell>
            Status
            <Select>
              <option></option>
              <option>RECEIVE</option>
              <option>PASSED</option>
            </Select>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listCtPTransaction.transactions.map((transaction) => (
            <Table.Row>
              <Table.Cell>{transaction.shipment.substring(0, 6)}</Table.Cell>
              <Table.Cell>{transaction.receiver}</Table.Cell>
              <Table.Cell>{transaction.end}</Table.Cell>
              <Table.Cell>{transaction.status}</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  View
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
