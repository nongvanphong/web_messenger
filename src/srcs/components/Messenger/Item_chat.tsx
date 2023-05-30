import { type } from "os";
import "./Item_chat.css";
type textmsg = {
  txt: string;
};
const Item_chat_left = (props: textmsg) => {
  return (
    <div className="Item__chat--left panding--top">
      <div>{props.txt}</div>
    </div>
  );
};
const Item_chat_right = (props: textmsg) => {
  return (
    <div className="Item__chat--right panding--top">
      <div>{props.txt}</div>
    </div>
  );
};
export default { Item_chat_left, Item_chat_right };
