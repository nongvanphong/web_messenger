import React, { ChangeEvent, useState } from "react";
import "./Login.css";

import { icon } from "../../icons/icon";
import { Sigister } from "../../utils/Login/Login.utils";
type ty = {
  handleClick: (i: number) => void;
};
interface FormData {
  email: string;
  password1: string;
  password2: string;
}
const Segister = (props: ty) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password1: "",
    password2: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const sigister = async () => {
    const result: any = await Sigister(
      formData.email,
      formData.password1,
      formData.password2
    );

    if (result.status === 200) {
      props.handleClick(1);
      alert("thnahf cong");
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
        alert("emial đã tồn tại");
        break;
      case 401:
        alert("mật khẩu không khớp");
        break;
      case 422:
        alert("chưa điền mail hoặc mạt khẩu , hoặc email không chính sác");
        break;
      case 200:
        props.handleClick(1);
        alert("thnahf cong");
        break;
      default:
        alert("lỗi hệ thống");
    }
  };

  return (
    <div className="login">
      <div className="header">
        <div className="logo">
          <div className="logo-1">Nesa</div>
          <div className="logo-2">Sing in</div>
        </div>
        <div className="tile">
          <div onClick={() => props.handleClick(1)} className="cursor">
            Sing in
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
            name="password1"
            value={formData.password1}
            onChange={handleInputChange}
          />
        </div>
        <div className="from__group">
          <label className="label">Password</label>
          <input
            placeholder="Password"
            className="input"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleInputChange}
          />
        </div>
        <div className="bnt__login">
          <div onClick={() => sigister()} className="bnt__login--1 cursor">
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Segister;
