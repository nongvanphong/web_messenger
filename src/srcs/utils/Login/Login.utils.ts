import axios from "axios";
import { apilogin, apisigister, apifillupinformation } from "../Config";

export const Sigister = async (
  email: string,
  password1: string,
  password2: string
) => {
  try {
    const response = await axios.post(apisigister, {
      email: email,
      password1: password1,
      password2: password2,
    });

    return response;
  } catch (error) {
    return error;
  }
};
export const Login_Utils = async (email: string, password: string) => {
  try {
    const response = await axios.post(apilogin, {
      email: email,
      password: password,
    });

    return response;
  } catch (error: any) {
    return error;
  }
};
export const Fill_Up_information_Utils = async (
  iduser: string,
  username: string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("iduser", iduser);
    formData.append("username", username);
    formData.append("image", file);

    const response = await axios.post(apifillupinformation, formData);

    return response;
  } catch (error: any) {
    return error;
  }
};
