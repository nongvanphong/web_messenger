import axios from "axios";
import {
  apiGetDataChat,
  apiGetDataUserChat,
  apiSearchUserChat,
} from "../Config";

// tìm kiếm người  chat cùng
export const searchUserChat = async (mgsSearch: string) => {
  try {
    const response = await axios.post(apiSearchUserChat, {
      search: mgsSearch,
    });

    return response;
  } catch (error) {
    return error;
  }
};

// lấy nội dung chat

export const getDataChat = async (myid: string, idsend: string) => {
  try {
    const response = await axios.post(apiGetDataChat, {
      myid: myid,
      idsend: idsend,
    });

    return response;
  } catch (error) {
    return error;
  }
};
export const getDataUserChat = async (myid: string) => {
  try {
    const response = await axios.post(apiGetDataUserChat, {
      myid: myid,
    });

    return response;
  } catch (error) {
    return error;
  }
};
