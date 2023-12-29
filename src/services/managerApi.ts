import axios from "axios";

import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";

export const createEmployee = async (reqData: Object) => {
  const response = axios({
    method: "post",
    url: `${API_BASE_URL}/staff/employee/create`,
    data: reqData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const viewEmployee = async (emId: string) => {
  const response = axios({
    method: "get",
    url: `${API_BASE_URL}/staff/employee/${emId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listEmployee = async (reqParams: Object) => {
  const response = axios({
    method: "get",
    url: `${API_BASE_URL}/staff/employee`,
    params: reqParams,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const updateEmployee = async (emId: string, reqData: Object) => {
  const response = axios({
    method: "put",
    url: `${API_BASE_URL}/staff/employee/update/${emId}`,
    data: reqData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export const listShipment = async (reqParams: Object) => {
  const response = axios({
    method: "get",
    url: `${API_BASE_URL}/shipment/department/received`,
    params: reqParams,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};
