import axios from "axios";
import { apiGetInformation } from "../Config";

export const GetDataInformationUsser = async (cookieAcceptToken: string) => {
  try {
    const response = await axios.post(
      apiGetInformation,
      {
        a: "jjj",
        // đoạn này là chuyền body nhưng không có thì để chống
      }
      // {
      //   withCredentials: true, // Enable sending cookies with the request
      //   headers: {
      //     Authorization: "Bearer your_token_here", // Thêm trường Authorization vào headers
      //     "Content-Type": "application/json",
      //     Cookie: cookieAcceptToken, // Thêm cookie vào headers
      //   },
      // }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const a = async (cookieAcceptToken: any) => {
  try {
    const response = await axios.post(
      apiGetInformation,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: (cookieAcceptToken = "cookieAcceptToken"), // Thêm cookie vào headers
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    return error;
  }
};
