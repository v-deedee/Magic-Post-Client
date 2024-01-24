import { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Card,
  Timeline,
  Breadcrumb,
  Alert,
} from "flowbite-react";
// import { useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { trackShipment } from "../../services/customerApi";
import { Shipment, defaultShipment } from "../../models/Shipment";
import { Transaction } from "../../models/Transaction";
import {
  HiHome,
  HiAdjustments,
  HiCloudDownload,
  HiExclamationCircle,
  HiSearch,
  HiInformationCircle,
} from "react-icons/hi";

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
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-700">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="container mx-auto px-5 py-3 dark:bg-gray-700"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Track shipment</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Navigation */}
      <div className="container mx-auto mt-8 flex-col px-5">
        <div className="mb-3 sm:flex">
          <Link to={"#"} className="grow">
            <Button className="w-full rounded-bl-none rounded-br-none sm:rounded-bl-lg sm:rounded-br-none sm:rounded-tr-none">
              <div className="flex items-center">
                <HiSearch className="mr-2 mt-0.5 h-4 w-4" />
                Track shipment
              </div>
            </Button>
          </Link>
          <Link to={"/customer/estimated-freight"} className="grow">
            <Button color="gray" className="w-full rounded-none">
              <div className="flex items-center">
                <HiAdjustments className="mr-2 mt-0.5 h-4 w-4" />
                Estimate Cost
              </div>
            </Button>
          </Link>
          <Link to={"/customer/nearest-post-office"} className="grow">
            <Button
              color="gray"
              className="w-full rounded-tl-none rounded-tr-none sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-lg"
            >
              <div className="flex items-center">
                <HiCloudDownload className="mr-2 mt-0.5 h-4 w-4" />
                Find Post
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="min-h-96 container mx-auto flex-col px-5">
        <Form className="flex" method="get" action="/customer/postage-tracking">
          <TextInput
            type="text"
            placeholder="Enter shipment id"
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

        <h1 className="my-10 text-center text-3xl font-bold leading-tight dark:text-white md:text-left md:text-3xl">
          Shipment detail:
        </h1>

        <div className="my-5">
          <h1>
            {(() => {
              if (status === "NONE") {
                return (
                  <Alert
                    color="info"
                    icon={HiInformationCircle}
                    className="text-base"
                  >
                    Please enter shipment id!
                  </Alert>
                );
              } else {
                if (status === "FAIL")
                  return (
                    <Alert
                      color="failure"
                      icon={HiExclamationCircle}
                      className="text-base"
                    >
                      Wrong shipment id
                    </Alert>
                  );
                const sender = shipment.sender;
                const receiver = shipment.receiver;
                return (
                  <div className="sm:px-8">
                    <div className="justify-center sm:flex">
                      <Card className="mb-5 sm:mx-6 sm:mb-0 sm:max-w-sm">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Sender: {sender.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          <span className="font-bold">Phone:</span> *****
                          {sender.phone.substring(-5, 5)} <br />
                          <span className="font-bold">Address:</span>{" "}
                          {`${sender.street}, ${sender.district}, ${sender.province}`}
                        </p>
                      </Card>

                      <Card className="sm:mx-6 sm:max-w-sm">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Receiver: {receiver.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          <span className="font-bold">Phone:</span> *****
                          {receiver.phone.substring(-5, 5)} <br />
                          <span className="font-bold">Address:</span>{" "}
                          {`${receiver.street}, ${receiver.district}, ${receiver.province}`}
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
                  </div>
                );
              }
            })()}
          </h1>
        </div>
      </div>
    </>
  );
}
