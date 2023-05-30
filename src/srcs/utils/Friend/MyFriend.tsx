import axios from "axios";
import { apideletemyfriend, apimyfriend } from "../Config";
export const MyFriend = async (cookieAcceptToken: string) => {
  try {
    const response = await axios.post(
      apimyfriend,
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
    // console.log("--err->>", error.response.status, error.response.data.message);
    return error;
  }
};
export const DeleteMyFriend = async (
  cookieAcceptToken: string,
  idfriend: string
) => {
  try {
    const response = await axios.post(
      apideletemyfriend,
      {
        id: idfriend,
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
  } catch (error: any) {
    // console.log("--err->>", error.response.status, error.response.data.message);
    return error;
  }
};
