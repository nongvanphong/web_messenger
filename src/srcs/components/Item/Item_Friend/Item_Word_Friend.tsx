import "./Item_My_Friend.css";
import bnt from "../../Button/Button";
import img from "../../../img/avt1.jpg";
import ImageAvt from "../../Images/ImageAvt";
import { icon } from "../../../icons/icon";
import { type } from "os";
import { friend_interface } from "../../../Interface/Interface.User";

type types = {
  friend: friend_interface;
  handlerClick: (id: string) => void;
};

const Item_Word_Friend = (props: types) => {
  // get id
  const clickBnt = () => {
    props.handlerClick(props.friend.idusers);
  };
  return (
    <div className="item-my-friend">
      <div className="item-my-friend--iconsetting">
        <icon.bacham className="iconsetting--margin" />
      </div>
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
        <div className="body-textName">{props.friend.users_name}</div>

        <bnt.Bnt
          handelClick={clickBnt}
          title="Thêm bạn"
          color="#ff4800"
          background="#ffff"
          bordercolor="#ff4800"
        ></bnt.Bnt>
      </div>
    </div>
  );
};

export default Item_Word_Friend;
