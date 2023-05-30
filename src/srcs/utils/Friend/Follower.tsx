import axios from "axios";
import { apiacceptfriend, apiffollower } from "../Config";
export const Follower = async (cookieAcceptToken: string) => {
  try {
    const response = await axios.post(
      apiffollower,
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
    // console.log("--err->>", error.response.status, error.response.data.message);
    return error;
  }
};
export const AcceptFollower = async (
  cookieAcceptToken: string,
  idfriend: string
) => {
  try {
    const response = await axios.post(
      apiacceptfriend,
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
  } catch (error) {
    // console.log("--err->>", error.response.status, error.response.data.message);
    return error;
  }
};
