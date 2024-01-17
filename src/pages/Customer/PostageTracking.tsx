import { useEffect, useState } from "react";
import { TextInput, Button, Card, Timeline } from "flowbite-react";
// import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { trackShipment } from "../../services/customerApi";
import { Shipment, defaultShipment } from "../../models/Shipment";
import { Transaction } from "../../models/Transaction";

// export async function loader({ request }: { request: Request }) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   return id;
// }

export default function PostageTracking() {
  // const id = useLoaderData();
  // let id = "";

  const search = async (id: string) => {
    try {
      const data = await trackShipment(id);
      const payload = data.data.data.payload;
      const { shipment, transactions } = payload;
      // console.log(transactions);
      setShipment(shipment);
      setTransactions(transactions.slice(0, -1));
      setStatus("SUCCESS");
    } catch (e) {
      setStatus("FAIL");
    }
  };

  const [shipmentID, setShipmentID] = useState("");
  const [shipment, setShipment] = useState<Shipment>(defaultShipment);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState("NONE");

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = url.searchParams.get("id");
    if (param != null) {
      setShipmentID(param);
      search(param);
    } else {
      console.log("id null");
    }
  }, []);

  return (
    <>
      <Form className="flex" method="get" action="/customer/postage-tracking">
        <TextInput
          type="text"
          placeholder="Shipment ID"
          value={shipmentID}
          onChange={(e) => {
            setShipmentID(e.target.value);
          }}
          name="id"
          className="grow"
          required
        />

        <Button
          type="submit"
          className="ms-4 bg-green-500"
          onClick={() => {
            // e.preventDefault();
            search(shipmentID);
          }}
        >
          Search
        </Button>
      </Form>

      <div className="mt-5 px-8">
        <h1>
          {(() => {
            if (status === "NONE") {
              return;
            } else {
              if (status === "FAIL") return <p>WRONG SHIPMENT ID</p>;
              const sender = shipment.sender;
              const receiver = shipment.receiver;
              return (
                <>
                  <div className="flex justify-center">
                    <Card href="#" className="mx-6 max-w-sm">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sender: {sender.name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Phone: *****{sender.phone.substring(-5, 5)} <br />
                        Address:{" "}
                        {`Address: ${sender.street}, ${sender.district}, ${sender.province}`}
                      </p>
                    </Card>

                    <Card href="#" className="mx-6 max-w-sm">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Receiver: {receiver.name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Phone: *****{receiver.phone.substring(-5, 5)} <br />
                        Address:{" "}
                        {`Address: ${receiver.street}, ${receiver.district}, ${receiver.province}`}
                      </p>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <Timeline>
                      {transactions.map((transaction) => (
                        <Timeline.Item key={transaction._id}>
                          <Timeline.Point />
                          <Timeline.Content>
                            <Timeline.Time>
                              {transaction.start.substring(0, 10)}
                            </Timeline.Time>
                            <Timeline.Title>
                              {transaction.status} : {transaction.des.type}
                            </Timeline.Title>
                            <Timeline.Body>
                              {transaction.des.street},{" "}
                              {transaction.des.district},{" "}
                              {transaction.des.province}
                            </Timeline.Body>
                          </Timeline.Content>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </div>
                </>
              );
            }
          })()}
        </h1>
      </div>
    </>
  );
}
