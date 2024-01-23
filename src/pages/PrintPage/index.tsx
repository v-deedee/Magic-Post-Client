import { useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

export default function PrintPage() {
  const handlePrint = async () => {
    setDisplayButton("none");
    setTimeout(() => {
      window.print();
    }, 100);
    setTimeout(() => {
      setDisplayButton("block");
    }, 1000);
  };

  const [displayButton, setDisplayButton] = useState("block");

  const { state } = useLocation();

  return (
    <div>
      <div className="grid grid-cols-4 divide-x divide-y">
        <div className="col-span-2 flex items-center justify-center p-2">
          <img src="../../../public/logo.svg" className="h-20 w-20" />
          <p className="mx-4 text-xl font-bold text-green-600">MagicPost</p>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center p-2">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:5173/customer/postage-tracking?id=${state.shipment}&amp;size=100x100`}
            className="h-20 w-20"
          />
          <p>
            <b>SHIPMENT</b>: {state.shipment}
          </p>
        </div>
        <div className="col-span-2 p-2">
          <b>SENDER</b>
          <p>NAME: {state.sender.name}</p>
          <p>PHONE: {state.sender.phone}</p>
          <p>
            ADDRESS:{" "}
            {`${state.sender.street}, ${state.sender.district}, ${state.sender.province}`}
          </p>
        </div>
        <div className="col-span-2 p-2">
          <b>RECEIVER</b>
          <p>NAME: {state.receiver.name}</p>
          <p>PHONE: {state.receiver.phone}</p>
          <p>
            ADDRESS:{" "}
            {`${state.receiver.street}, ${state.receiver.district}, ${state.receiver.province}`}
          </p>
        </div>

        <div className="col-span-4 p-2">
          <b>SHIPMENT INFO: </b>
          <p>TYPE: {state.meta.type}</p>
          <p>NOTE: {state.meta.note}</p>
          <p>ITEMS DETAIL:</p>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Value</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {state.meta.item.map(
                (item: { name: string; quantity: number; value: number }) => (
                  <Table.Row>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.value}</Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="col-span-4 p-2">
          <b>Const: </b>
        </div>

        <div className="col-span-2 p-2">
          <b>Sender's commitment: </b>
          <p>
            1. I commit that my package has been safely and securely packed to
            avoid damage during transportation.
          </p>
          <p>
            2. I commit to providing accurate information about the recipient
            and the contents of the package.
          </p>
          <p>
            3. I commit to paying all costs related to the shipping service in
            accordance with the regulations of the postal service.
          </p>
          <p>
            4. I commit to complying with all rules and regulations of the
            postal service.
          </p>
        </div>

        <div className="col-span-2 p-2">
          <b>Sender's signature</b>
        </div>

        <div className="col-span-2 p-2">
          <b>SEND DATE AND TIME:</b> <br />
          <b>SENDER'S SIGNATURE:</b>
        </div>

        <div className="col-span-2 p-2">
          <b>RECEIVE DATE:</b> <br />
          <b>RECEIVING POST OFFICE, STAMPED:</b>
        </div>
      </div>
      <div style={{ display: displayButton }}>
        <Button className="mt-20 bg-green-500" onClick={handlePrint}>
          Print Invoice
        </Button>
        <Link to="/post-office-employee/ctp-transactions">
          <Button className="my-4 bg-gray-500">Return</Button>
        </Link>
      </div>
    </div>
  );
}
