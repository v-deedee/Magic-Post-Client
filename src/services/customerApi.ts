import axios from "axios";

const API_BASE_URL = "http://localhost:3001";


export const trackShipment = async (shipmentId) => {
    const response = await axios({
        method: "get",
        url: API_BASE_URL +  `shipment/track/${shipmentId}`
    })
    return response
}