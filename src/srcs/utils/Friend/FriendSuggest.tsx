import axios from "axios";
import { apiaddfollow, apifriendsuggest } from "../Config";
export const FriendSugest = async (cookieAcceptToken: string) => {
  try {
    const response = await axios.post(
      apifriendsuggest,
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
  } catch (error) {
    console.log("--err->>", error);
    return error;
  }
};
export const AddFollow = async (cookieAcceptToken: string, idget: string) => {
  try {
    const response = await axios.post(
      apiaddfollow,
      {
        idget: idget,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: (cookieAcceptToken = "cookieAcceptToken"), // Thêm cookie vào headers
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("--err->>", error);
    return error;
  }
};
