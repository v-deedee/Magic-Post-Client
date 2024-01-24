import { useEffect, useState } from "react";
import { Breadcrumb, Button, Label, Select } from "flowbite-react";
import {
  HiHome,
  HiAdjustments,
  HiCloudDownload,
  HiSearch,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  getDistricts,
  getProvinces,
} from "../../services/postOfficeEmployeeApi";
import { estimateCost } from "../../services/customerApi";

export default function EstimatedFreight() {
  const [cost, setCost] = useState(0);

  const [newTransaction, setNewTransaction] = useState({
    sender: {
      province: "",
      district: "",
    },
    receiver: {
      province: "",
      district: "",
    },
  });

  const [provinces, setProvinces] = useState([]);

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

  const handleSubmit = async () => {
    try {
      const res = await estimateCost(newTransaction);
      const estimatedCost = res.data.data.payload.cost;
      setCost(estimatedCost);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const fetchProvincesData = async () => {
        const data = await getProvinces();
        const payload = data.data.data.payload;
        setProvinces(payload.provinces);
      };
      fetchProvincesData();
    } catch (err) {
      console.log(err);
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
          <Breadcrumb.Item>Estimate Cost</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Navigation */}
      <div className="container mx-auto mt-8 flex-col px-5">
        <div className="mb-3 sm:flex">
          <Link to={"/customer/postage-tracking"} className="grow">
            <Button
              color="gray"
              className="w-full rounded-bl-none rounded-br-none sm:rounded-bl-lg sm:rounded-br-none sm:rounded-tr-none"
            >
              <div className="flex items-center">
                <HiSearch className="mr-2 mt-0.5 h-4 w-4" />
                Track shipment
              </div>
            </Button>
          </Link>
          <Link to={"#"} className="grow">
            <Button className="w-full rounded-none">
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
      <div className="container mx-auto p-5">
        <div className="rounded-lg border p-4 sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Position and Destination */}
            <div className="gap-5 sm:flex">
              {/* Sender */}
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="" value="FROM:" />
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
              </div>

              {/* Receiver */}
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="" value="TO:" />
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
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <Button type="submit">Estimate</Button>
              <p className="ml-4 font-bold dark:text-white">{cost} VND</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
