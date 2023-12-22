import axios, {AxiosResponse} from "axios";

const API_BASE_URL = 'https://localhost:3001'

export const testApi = async (): Promise<Result> => {
    try {
        const response: AxiosResponse<Result> = await axios.get("https://quotable.io/quotes?page=1")
        return response.data
         
    } catch (err) {
        console.error('error:', err)
        throw err
    }
}

export const login = async(loginData): Promise<any> => {
    console.log("loginDataaaa:")
    console.log(loginData)
    try {
        const response: AxiosResponse<any> = await axios({
            method: "post",
            url: API_BASE_URL + "/auth/login",
            data: loginData
        })
        console.log(response)
        return response
    } catch (err) {
        console.error("error: ", err)
        throw err
    }
}