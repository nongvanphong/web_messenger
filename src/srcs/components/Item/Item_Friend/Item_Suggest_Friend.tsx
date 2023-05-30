import "./Item_My_Friend.css";
import bnt from "../../Button/Button";
import img from "../../../img/avt1.jpg";
import ImageAvt from "../../Images/ImageAvt";
import { type } from "os";
import { folower_interface } from "../../../Interface/Interface.User";
import { SessionUser } from "../../../../App";
import { useContext } from "react";

type types = {
  handleClickAccept: (id: string) => void;
  handleClickDelete: (id: string) => void;
  user: folower_interface;
};
const Item_Suggest_Friend = (props: types) => {
  // click accept
  const clickBntAccept = () => {
    props.handleClickAccept(props.user.idfriend);
  };
  // click delete
  const clickBntDlt = () => {
    props.handleClickDelete(props.user.idusers);
  };
  return (
    <div className="item-my-friend">
      <div className="item-my-friend--iconsetting"></div>
      <div className="item-my-friend--body">
        <div className="body--avt">
          <ImageAvt
            boderRadius={50}
            borderWidth={3}
            bordercolor="#ff5"
            img={img}
            borderstyle="solid"
          />
        </div>
        <div className="body-textName">{props.user.users_name}</div>
        <div className="friendbBnt">
          <bnt.Bnt
            handelClick={clickBntAccept}
            title="Chấp nhận"
            color="#ff4800"
            background="#ffff"
            bordercolor="#ff4800"
          ></bnt.Bnt>

          <bnt.Bnt
            handelClick={clickBntDlt}
            title="xóa"
            color="#ff4800"
            background="#ffff"
            bordercolor="#ff4800"
          ></bnt.Bnt>
        </div>
      </div>
    </div>
  );
};

export default Item_Suggest_Friend;
