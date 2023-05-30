import "./Item_My_Friend.css";
import bnt from "../../Button/Button";
import img from "../../../img/avt1.jpg";
import ImageAvt from "../../Images/ImageAvt";
import { myfriend_interface } from "../../../Interface/Interface.User";
import { type } from "os";

type tp = {
  myfriend: myfriend_interface;
  handleClick: (id_friend: string) => void;
};
const Item_My_Friend = (props: tp) => {
  const clickBnt = () => {
    props.handleClick(props.myfriend.idfriend);
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
        <div className="body-textName">{props.myfriend.users_name}</div>
        <bnt.Bnt
          handelClick={clickBnt}
          title="xóa"
          color="#ff4800"
          background="#ffff"
          bordercolor="#ff4800"
        ></bnt.Bnt>
      </div>
    </div>
  );
};

export default Item_My_Friend;
