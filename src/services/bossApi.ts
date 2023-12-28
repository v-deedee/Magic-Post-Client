import axios from "axios";
import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";

export const createManager = async (reqData) => {
  const response = await axios({
    method: "post",
    url: API_BASE_URL + "/staff/manager/create",
    data: reqData,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return response;
};

export const listManager = async (reqParams) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + "/staff/manager?limit=500",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    params: reqParams,
  });
  return response;
};

export const viewManager = async (staffID) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + `/staff/manager/${staffID}`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return response;
};

export const updateManager = async (staffID, reqData) => {
  const response = await axios({
    method: "put",
    url: API_BASE_URL + `/staff/manager/update/${staffID}`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: reqData,
  });
  return response;
};

export const createDepartment = async (reqData) => {
  const response = await axios({
    method: "post",
    url: API_BASE_URL + `/department/create`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });
  return response;
};

export const viewDepartment = async (departmentId) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + `/department/${departmentId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
};

export const listDepartment = async (reqParams) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + `/department?limit=200`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: reqParams,
  });
  return response;
};

export const updateDepartment = async (departmentId, reqData) => {
  const response = await axios({
    method: "put",
    url: API_BASE_URL + `/department/update/${departmentId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: reqData,
  });

  return response;
};

export const listShipmentNationwide = async (reqParams) => {
  const response = await axios({
    method: "get",
    url: API_BASE_URL + `/shipment/nationwide`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: reqParams,
  });

  return response;
};

// export const listShipmentForDepartment = async (reqParams) => {
//   const response = await axios({
//     method: "get",
//     url: API_BASE_URL +  `department`
//   })
// }
