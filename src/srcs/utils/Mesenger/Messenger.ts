import axios from "axios";
import {
  apiGetDataChat,
  apiGetDataUserChat,
  apiGetIdConversation,
  apiInsertContent,
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

// lấy id convesation để gtaoj phòng chat
export const getIdConversations = async (myid: string, iduserget: string) => {
  try {
    const response = await axios.post(apiGetIdConversation, {
      myid: myid,
      idreceiver: iduserget,
    });

    return response;
  } catch (error) {
    return error;
  }
};

// giử nội dung lên sever
export const insertContent = async (
  myid: string,
  idreceiver: string | undefined,
  content: string | undefined,
  idconversation: string
) => {
  try {
    const response = await axios.post(apiInsertContent, {
      myid: myid,
      idreceiver: idreceiver,
      content: content,
      idconversation: idconversation,
    });

    return response;
  } catch (error) {
    return error;
  }
};
