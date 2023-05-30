import { type } from "os";
import "./button.css";
type types = {
  title: string;
  color: string;
  background: string;
  bordercolor: string;
  handelClick: () => void;
};

const Bnt = (props: types) => {
  const style = {
    color: props.color,
    background: props.background,
    borderColor: props.bordercolor,
  };
  const clickbnt = () => {
    props.handelClick();
  };
  return (
    <button onClick={() => clickbnt()} style={style} className="bnt--1 bnt ">
      {props.title}
    </button>
  );
};
const Bnt_login = () => {
  return <div className="bnt__login">login</div>;
};
const Bnt_bg_none = () => {
  return <div className="bnt__bg__none">log</div>;
};
export default { Bnt, Bnt_login, Bnt_bg_none };
