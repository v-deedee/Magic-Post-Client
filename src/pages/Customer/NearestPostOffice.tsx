import React, { FC, useEffect, useState } from "react";
import { Button, Label, Select, Table } from "flowbite-react";
import { Form } from "react-router-dom";
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

interface INearestPostOfficeProps {}

export const NearestPostOffice: FC<INearestPostOfficeProps> = (props) => {
  useEffect(() => {
    const fetchDistrictsData = async (province) => {
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

  const [listPostOffice, setListPostOffice] = useState([]);

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
          <Marker position={postOffice.geocoding}>
            <Popup>{postOffice.street}, {postOffice.geocoding.lat}, {postOffice.geocoding.lon}</Popup>
        
          </Marker>
          
        ))}
        {markers.map(marker => <Marker position={marker} ></Marker>)}

      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="flex">
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
                  <option value={province}>{province}</option>
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
                  <option value={district}>{district}</option>
                ))}
              </Select>
            </div>
            <Button
              className="my-4 bg-green-500"
              onClick={async (e) => {
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
                <Table.Row>
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
    </div>
  );
};
