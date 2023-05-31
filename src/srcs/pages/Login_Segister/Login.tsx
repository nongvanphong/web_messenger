import "./Login.css";

import { icon } from "../../icons/icon";
import { ChangeEvent, useContext, useState } from "react";
import { Login_Utils } from "../../utils/Login/Login.utils";
import Information from "./Information";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type ty = {
  handleClick: (i: number) => void;
};
interface FormData {
  email: string;
  password: string;
}
const Login = (props: ty) => {
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "cookieAcceptToken",
    "cookieRefreshToken",
  ]);

  const [iduser, setiduser] = useState<string | undefined>();
  const [show, setshow] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigater = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // funtion login
  const bntLogin = async () => {
    const result: any = await Login_Utils(formData.email, formData.password);

    if (result.status === 200) {
      checkLogin(result);
    } else {
      checkErr(result);
    }
  };

  const checkErr = (result: any) => {
    switch (result.response.status) {
      case 500:
        alert("lỗi hệ thống");
        break;
      case 400:
        alert("tài khgoawnr hoặc mật khuẩ không chính sác");
        break;
      case 403:
        setiduser(result.response.data.iduser);
        setshow(1);
        break;
      default:
        alert("lỗi hệ thống");
    }
  };

  const checkLogin = (result: any) => {
    // set cookies
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Hết hạn sau 1 ngày

    setCookie("cookieAcceptToken", result.data.acceptToken, {
      // parh này là yêu cầu sẽ gửi từ trang nòa lên sevre nếu login vòa trang trủ mà muốn trng trủ sử dụng được thôi thì chúng ta sẽ để pasr là login
      path: "/",
      expires: expirationDate,
    });
    setCookie("cookieRefreshToken", result.data.refreshToken, {
      path: "/",
      expires: expirationDate,
    });

    navigater("/home");
  };

  const handleClick = (i: number) => {
    setshow(i);
  };
  return (
    <div>
      {show === 1 ? (
        <Information iduser={iduser} handleClick={handleClick} />
      ) : (
        <div className="login">
          <div className="header">
            <div className="logo">
              <div className="logo-1">Nesa</div>
              <div className="logo-2">Login</div>
            </div>
            <div className="tile">
              <div>No accout?</div>
              <div onClick={() => props.handleClick(2)} className="cursor">
                Sing up
              </div>
            </div>
          </div>
          <div className="login__google">
            <div className="login__google--center cursor">
              <icon.google />
              &ensp;
              <div> Login with google</div>
            </div>
          </div>

          <div className="from">
            <div className="from__group">
              <label className="label">Email</label>
              <input
                placeholder="Email"
                className="input"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="from__group">
              <label className="label">Password</label>
              <input
                placeholder="Password"
                className="input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="bnt__login">
              <div onClick={() => bntLogin()} className="bnt__login--1 cursor">
                Login
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
