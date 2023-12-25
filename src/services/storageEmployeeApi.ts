import axios from "axios";
import { getToken } from "./token";

const API_BASE_URL = "http://localhost:3001";


export const updatePtSTransactions = async(reqData) => {
    const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/transaction/pts`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: reqData,
    })

    return response
}

export const updateStSTransactions = async(reqData) => {
    const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/transaction/sts`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: reqData,
    })

    return response
}

export const pushShipmentStS = async(reqParams, reqData) => {
    const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/transaction/sts`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: reqParams,
        data: reqData,
    })

    return response
}

export const pushShipmentStP = async(reqParams, reqData) => {
    const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/transaction/stp`,
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
        url: `${API_BASE_URL}/transaction/pts/des`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    })

    return response
}

export const listStSTransactions = async() => {
    const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/transaction/sts/des`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    })

    return response
}

