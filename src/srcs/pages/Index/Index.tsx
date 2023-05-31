import { useCookies } from "react-cookie";
import ImageAvt from "../../components/Images/ImageAvt";
import Friend from "../Friend/Friend";
import "./Index.css";
import img from "../../img/avt1.jpg";
import { GetDataInformationUsser, a } from "../../utils/User/User.utils";
import { useEffect, useState } from "react";
import { user_interface } from "../../Interface/Interface.User";
import Notifycation from "../../components/Modals/Notifycation";

import ScreenChat from "../ScreenChat/ScreenChat";
import { useNavigate } from "react-router-dom";

const Index = () => {
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "cookieAcceptToken",
    "cookieRefreshToken",
  ]);

  // chuyển hướng trang
  const navigater = useNavigate();

  // hiển thị thông báo bắt đang nhập lại
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    // quay lại trang login
    removeCookie("cookieAcceptToken");
    removeCookie("cookieRefreshToken");
    navigater("/");
    window.history.replaceState(null, "", window.location.origin);
  };

  const [person, setPerson] = useState<user_interface>();
  useEffect(() => {
    const getDataPerson = async () => {
      const result: any = await a(cookies);

      // nếu có dứ liệu thì mới cho hiển thị đata
      if (result.response && result.response.status) {
        if (result.response.status === 403 || result.response.status === 401) {
          // nếu không sẽ hiển thị tông báo bắt đăng nhập lại
          setShowModal(true);
        }
      } else {
        setPerson(result.data[0]);
      }
    };

    getDataPerson();
  }, [cookies]);

  return (
    <div className="index">
      <Notifycation
        showmd={showModal}
        handleClose={handleCloseModal}
        title="Thông báo"
        msg="Bạn cần xác minh lại tài khoản. Vui lòng đăng nhập lại"
        titlebnt="Đăng nhập"
      />
      <div className="index--header">
        <div className="header--logo">TiK</div>
        <div className="header--avt">
          <ImageAvt
            boderRadius={50}
            borderWidth={3}
            bordercolor="#ff5"
            img={person?.img === undefined ? img : person.img}
            borderstyle="solid"
          />
        </div>
        <div className="header--iconsetting"></div>
      </div>
      <div className="index--body">
        {/* <Friend /> */}
        <ScreenChat />
      </div>
    </div>
  );
};

export default Index;
