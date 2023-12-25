import axios from "axios";
import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";

export const createShipment = async (reqData) => {
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

export const getProvinces = async() => {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + "/department/provinces",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      return response;
}

export const getDistricts = async(reqParams) => {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + "/department/districts",
        params: reqParams,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      return response;
}


export const listCtPTransactions = async(reqParams) => {
    const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/transaction/ctp/des`,
        params: reqParams,
        headers: {
            Authorization: "Bearer " + getToken(),
          },
    });

    return response
}

export const pushShipmentPtS = async(reqParams, reqData) => {
    const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/transaction/pts`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: reqParams,
        data: reqData,
    })

    return response
}

export const pushShipmentPtC = async(reqParams, reqData) => {
    const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/transaction/ptc`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: reqParams,
        data: reqData,
    })

    return response
}

export const listPtSTransactions = async() => {
    const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/transaction/ptc`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    })

    return response
}

export const listStPTransactions = async() => {
    const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/transaction/stp/des`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    })

    return response
}

export const updateStpTransactions = async(reqData) => {
    const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/transaction/sts`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: reqData,
    })

    return response
}

