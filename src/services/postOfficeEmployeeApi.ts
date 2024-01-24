import axios from "axios";
import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";

export const createShipment = async (reqData: {}) => {
  const response = await axios({
    method: "post",
    url: API_BASE_URL + "/shipment/create",
    data: reqData,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return response;
};

export const getProvinces = async () => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/department/provinces",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return response;
};

export const getDistricts = async (reqParams: { province: string }) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/department/districts",
    params: reqParams,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return response;
};

export const listCtPTransactions = async () => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/ctp/des`,
    params: { limit: 100 },
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return response;
};

export const pushShipmentPtS = async (reqData: {}) => {
  const response = await axios({
    method: "post",
    url: `${API_BASE_URL}/transaction/pts`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });

  return response;
};

export const pushShipmentPtC = async (reqParams: {}, reqData: {}) => {
  const response = await axios({
    method: "post",
    url: `${API_BASE_URL}/transaction/ptc`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: reqParams,
    data: reqData,
  });

  return response;
};

export const listPtSTransactions = async () => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/pts/pos`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listStPTransactions = async () => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/stp/des`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listPtCTransactions = async () => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/ptc/pos`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const updateStPTransactions = async (reqData: {}) => {
  const response = await axios({
    method: "put",
    url: `${API_BASE_URL}/transaction/stp`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });

  return response;
};
