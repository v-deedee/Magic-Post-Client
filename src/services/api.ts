import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// export const testApi = async (): Promise<Result> => {
//     try {
//         const response: AxiosResponse<Result> = await axios.get("https://quotable.io/quotes?page=1")
//         return response.data
//     } catch (err) {
//         console.error('error:', err)
//         throw err
//     }
// }

export const login = async (loginData: {}) => {
  try {
    const response = await axios({
      method: "post",
      url: API_BASE_URL + "/auth/login",
      data: loginData,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
