import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const trackShipment = async (shipmentId: string) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + `/shipment/track/${shipmentId}`,
  });
  return response;
};

export const estimateCost = async (reqData: {
  sender: {
    province: string;
    district: string;
  };
  receiver: {
    province: string;
    district: string;
  };
}) => {
  const response = await axios({
    method: "post",
    url: API_BASE_URL + `/shipment/estimate-cost`,
    data: reqData,
  });
  return response;
};

export const getListPostOffice = async (reqParams: {
  province: string;
  district: string;
  type: string;
}) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/department",
    params: reqParams,
  });
  return response;
};

export const getLocationFromText = async (reqParams: {}) => {
  const response = await axios({
    method: "get",
    url: "https://nominatim.openstreetmap.org/search",
    params: reqParams,
  });
  return response;
};
