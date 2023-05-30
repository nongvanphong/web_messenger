import "./Item_user_msg.css";

type typeItem = {
  iduser: string;
  username: string;
  conten: string | null;
  time: Date | null;
  idconversation: string;
  handleClick: (iduser: string, idconversation: string) => void;
};
const Item_user_msg = (props: typeItem) => {
  const hanldeClick = (iduser: string, idconversation: string) => {
    props.handleClick(iduser, idconversation);
  };
  return (
    <div
      onClick={() => hanldeClick(props.iduser, props.idconversation)}
      className="itemuser__container"
    >
      <div className="itemuser">
        <div className="itemuser__avt"></div>
        <div className="itemuser__msg">
          <div className="itemuser__name">{props.username}</div>
          <div className="itemuser__msg__item">{props.conten}</div>
        </div>
        <div className="itemuser__opption">
          <div className="itemuser__opption--size">
            {props.time === null ? props.time : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
const Item_user_msg_search = (props: typeItem) => {
  const hanldeClick = (iduser: string, idconversation: string) => {
    props.handleClick(iduser, "");
  };

  return (
    <div
      onClick={() => hanldeClick(props.iduser, "")}
      className="itemuser__container"
    >
      <div className="itemuser">
        <div className="itemuser__avt"></div>
        <div className="itemuser__msg">
          <div className="itemuser__name">{props.username}</div>
        </div>
        <div className="itemuser__opption">
          <div className="opption opption--green"></div>
          <div className="opption opption--ograge"></div>
          <div className="opption opption--red"></div>
        </div>
      </div>
    </div>
  );
};
export default { Item_user_msg, Item_user_msg_search };
