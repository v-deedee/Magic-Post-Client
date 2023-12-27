import { FC, useEffect, useState } from "react";
import { Label, TextInput, Button, Card, Timeline } from "flowbite-react";
import { useActionData, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { trackShipment } from "../../services/customerApi";

interface IPostageTrackingProps {}

export async function loader({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return id;
}

export const PostageTracking: FC<IPostageTrackingProps> = (props) => {
  const id = useLoaderData();

  useEffect(() => {
    if (id != null) {
      search(id);
    } else {
      console.log("id null");
    }
  }, []);

  const search = async (id) => {
    try {
      const data = await trackShipment(id);
      const payload = data.data.data.payload;
      const { shipment, transactions } = payload;
      setShipment(shipment);
      setTransactions(transactions);
      setStatus("SUCCESS");
    } catch (e) {
      setStatus("FAIL");
    }
  };
  const [shipmentID, setShipmentID] = useState(id);
  const [shipment, setShipment] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("NONE");

  return (
    <>
      <Form className="flex" method="get" action="">
        <TextInput
          type="text"
          placeholder="Shipment ID"
          value={shipmentID}
          onChange={(e) => {
            setShipmentID(e.target.value);
          }}
          name="id"
          className="mx-4 grow"
          required
        />

        <Button
          type="submit"
          className="mx-4 bg-green-500"
          onClick={(e) => {
            e.preventDefault();
            search(shipmentID);
          }}
        >
          Search
        </Button>
      </Form>

      <div className="px-8 mt-5">
        <h1>
          {(() => {
            if (status == "NONE") {
              return;
            } else {
              if (status == "FAIL") return <h1>WRONG SHIPMENT ID</h1>;
              const sender = shipment.sender;
              const receiver = shipment.receiver;
              return (
                <>
                  <div className="flex justify-center">
                    <Card href="#" className="max-w-sm mx-6">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sender: {sender.name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Phone: *****{sender.phone.substring(-5, 5)} <br />
                        Address:{" "}
                        {`Address: ${sender.street}, ${sender.district}, ${sender.province}`}
                      </p>
                    </Card>

                    <Card href="#" className="max-w-sm mx-6">
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
                        <Timeline.Item>
                          <Timeline.Point />
                          <Timeline.Content>
                            <Timeline.Time>{transaction.start.substring(0, 10)}</Timeline.Time>
                            <Timeline.Title>
                              {transaction.status} : {transaction.des.type}
                            </Timeline.Title>
                            <Timeline.Body>
                              {transaction.des.street}, {transaction.des.district}, {transaction.des.province}
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
};
