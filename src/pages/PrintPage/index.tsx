import { useState } from "react";
import { Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

export default function PrintPage() {
  const handlePrint = async () => {
    setDisplayButton("none");
    setTimeout(() => {
      window.print();
    }, 100);
    setTimeout(() => {
      setDisplayButton("flex");
    }, 1000);
  };

  const [displayButton, setDisplayButton] = useState("flex");

  const { state } = useLocation();

  return (
    <div className="p-2">
      <div className="grid grid-cols-4 divide-x divide-y border">
        <div className="col-span-2 flex items-center justify-center p-2">
          <img src="../../../public/logo.svg" className="h-20 w-20" />
          <p className="mx-4 text-4xl font-bold text-[#319684]">MagicPost</p>
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
          <p>
            <span className="font-bold">Name:</span> {state.sender.name}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {state.sender.phone}
          </p>
          <p>
            <span className="font-bold">Address:</span>{" "}
            {`${state.sender.street}, ${state.sender.district}, ${state.sender.province}`}
          </p>
        </div>
        <div className="col-span-2 p-2">
          <b>RECEIVER</b>
          <p>
            <span className="font-bold">Name:</span> {state.receiver.name}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {state.receiver.phone}
          </p>
          <p>
            <span className="font-bold">Address:</span> :{" "}
            {`${state.receiver.street}, ${state.receiver.district}, ${state.receiver.province}`}
          </p>
        </div>

        <div className="col-span-4 p-2">
          <b>SHIPMENT INFO: </b>
          <p>
            <span className="font-bold">Type:</span> {state.meta.type}
          </p>
          <p>
            <span className="font-bold">Note:</span> {state.meta.note}
          </p>
          <p>
            <span className="font-bold">Item detail:</span>{" "}
          </p>

          <table className="mt-3 w-full border-collapse bg-white p-2 text-sm">
            <thead>
              <tr>
                <th className="border-2 border-solid border-gray-500 bg-slate-100 p-2 text-left md:w-5/12">
                  Name
                </th>
                <th className="border-2 border-solid border-gray-500 bg-slate-100 p-2 text-left">
                  Quantity
                </th>
                <th className="border-2 border-solid border-gray-500  bg-slate-100 p-2 text-left">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {state.meta.item.map(
                (
                  item: { name: string; quantity: number; value: number },
                  index: number,
                ) => (
                  <tr key={index}>
                    <td className="border-2 border-solid border-gray-500 p-2 md:w-5/12">
                      {item.name}
                    </td>
                    <td className="border-2 border-solid border-gray-500 p-2">
                      {item.quantity}
                    </td>
                    <td className="border-2 border-solid border-gray-500 p-2">
                      {item.value}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
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
      <div className="mb-5 mt-20 gap-5 p-2" style={{ display: displayButton }}>
        <Button onClick={handlePrint}>Print Invoice</Button>
        <Link
          className="block w-fit"
          to="/post-office-employee/ctp-transactions"
        >
          <Button color="gray">Return</Button>
        </Link>
      </div>
    </div>
  );
}
