import axios from "axios";
import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";

export const updatePtSTransactions = async (reqData: {}) => {
  const response = await axios({
    method: "put",
    url: `${API_BASE_URL}/transaction/pts`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });

  return response;
};

export const updateStSTransactions = async (reqData: {}) => {
  const response = await axios({
    method: "put",
    url: `${API_BASE_URL}/transaction/sts`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });

  return response;
};

export const pushShipmentStS = async (reqParams: {}, reqData: {}) => {
  const response = await axios({
    method: "post",
    url: `${API_BASE_URL}/transaction/sts`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: reqParams,
    data: reqData,
  });

  return response;
};

export const pushShipmentStP = async (reqParams: {}, reqData: {}) => {
  const response = await axios({
    method: "post",
    url: `${API_BASE_URL}/transaction/stp`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: reqParams,
    data: reqData,
  });

  return response;
};

export const listPtSTransactions = async (type: string) => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/pts/${type}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listStSTransactions = async (type: string) => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/sts/${type}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listStPTransactions = async (type: string) => {
  const response = await axios({
    method: "get",
    url: `${API_BASE_URL}/transaction/stp/${type}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};
