import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Label, Select, Table } from "flowbite-react";
import { Form, Link } from "react-router-dom";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  getDistricts,
  getProvinces,
} from "../../services/postOfficeEmployeeApi";
import {
  getListPostOffice,
  getLocationFromText,
} from "../../services/customerApi";
import { LatLng } from "leaflet";
import { Department } from "../../models/Department";
import {
  HiHome,
  HiAdjustments,
  HiCloudDownload,
  HiSearch,
} from "react-icons/hi";

export default function NearestPostOffice() {
  useEffect(() => {
    const fetchDistrictsData = async (province: string) => {
      const data = await getDistricts({ province });
      const payload = data.data.data.payload;
      const districts = payload.districts;
      setDistricts(districts);
      const clone = { ...address };
      clone.district = districts[0];
      setAddress(clone);
    };

    const fetchProvincesData = async () => {
      const data = await getProvinces();
      const payload = data.data.data.payload;
      const provinces = payload.provinces;
      setProvinces(provinces);
      const clone = { ...address };
      clone.province = provinces[0];
      setAddress(clone);
      fetchDistrictsData(provinces[0]);
    };
    fetchProvincesData();
  }, []);

  const [provinces, setProvinces] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [address, setAddress] = useState({
    province: "",
    district: "",
    type: "POSTOFFICE",
  });

  const [location, setLocation] = useState({
    lat: 15.9266657,
    lon: 107.9650855,
  });

  const [listPostOffice, setListPostOffice] = useState<Department[]>([]);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  function LocationMarkers() {
    const initialMarkers: LatLng[] = [new LatLng(51.505, -0.09)];
    const [markers, setMarkers] = useState(initialMarkers);

    const map = useMapEvents({
      click(e) {
        markers.push(e.latlng);
        setMarkers((prevValue) => [...prevValue, e.latlng]);
      },
    });

    return (
      <React.Fragment>
        {listPostOffice.map((postOffice) => (
          <Marker key={postOffice._id} position={postOffice.geocoding}>
            <Popup>
              {postOffice.street}, {postOffice.geocoding.lat},{" "}
              {postOffice.geocoding.lon}
            </Popup>
          </Marker>
        ))}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker}></Marker>
        ))}
      </React.Fragment>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <Breadcrumb
          aria-label="Solid background breadcrumb example"
          className="container mx-auto px-5 py-3 dark:bg-gray-800"
        >
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Find Post</Breadcrumb.Item>
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
          <Link to={"/customer/estimated-freight"} className="grow">
            <Button className="w-full rounded-none" color="gray">
              <div className="flex items-center">
                <HiAdjustments className="mr-2 mt-0.5 h-4 w-4" />
                Estimate Cost
              </div>
            </Button>
          </Link>
          <Link to={"#"} className="grow">
            <Button className="w-full rounded-tl-none rounded-tr-none sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-lg">
              <div className="flex items-center">
                <HiCloudDownload className="mr-2 mt-0.5 h-4 w-4" />
                Find Post
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto flex px-5">
        <div className="grow">
          <Form>
            <div className="mb-2 block">
              <Label htmlFor="province" value="Province" />
            </div>
            <div>
              <Select
                id="province"
                required
                onChange={(e) => {
                  const fetchDistrictsData = async () => {
                    const data = await getDistricts({
                      province: e.target.value,
                    });
                    const payload = data.data.data.payload;
                    const districts = payload.districts;
                    setDistricts(districts);
                    const clone = { ...address };
                    clone.province = e.target.value;
                    clone.district = districts[0];
                    setAddress(clone);
                  };
                  fetchDistrictsData();
                }}
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-2 block">
              <Label htmlFor="district" value="District" />
            </div>
            <div>
              <Select
                id="district"
                required
                onChange={(e) => {
                  const clone = { ...address };
                  clone.district = e.target.value;
                  setAddress(clone);
                }}
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              className="my-4 bg-green-500"
              onClick={async () => {
                const data = await getListPostOffice(address);
                const payload = data.data.data.payload;
                setListPostOffice(payload.departments);
                const locationData = await getLocationFromText({
                  q: `${address.district} ${address.province}`,
                  format: "json",
                });
                const { lat, lon } = locationData.data[0];

                setLocation({
                  lat,
                  lon,
                });
              }}
            >
              Find
            </Button>
          </Form>

          <Table>
            <Table.Head>
              <Table.HeadCell>List Office</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {listPostOffice.map((postOffice) => (
                <Table.Row key={postOffice._id}>
                  <Table.Cell>{postOffice.street}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div
          id="map"
          className="h-96 w-96 grow"
          style={{
            height: "75vh",
            borderRadius: "10px",
            overflow: "hidden",
            padding: "15px",
          }}
        >
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <ChangeView center={[location.lat, location.lon]} zoom={13} />
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarkers />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
