import axios from "axios";

const API_BASE_URL = "http://localhost:3001";


export const trackShipment = async (shipmentId) => {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + `/shipment/track/${shipmentId}`,
    })
    return response
}

export const getListPostOffice = async (reqParams) => {
    const response = await axios({
        method: "get",
        url: API_BASE_URL + "/department",
        params: reqParams
    })
    return response
}

export const getLocationFromText = async (reqParams) => {
    const response = await axios({
        method: "get",
        url: "https://nominatim.openstreetmap.org/search",
        params: reqParams
    })

    return response
}