import { type } from "os";
import "./ImageAvt.css";
type types = {
  img: string;
  boderRadius: number;
  borderWidth: number;
  bordercolor: string;
  borderstyle: string;
};
const ImageAvt = (props: types) => {
  const style = {
    borderRadius: props.boderRadius + "em",
    borderWidth: props.borderWidth + "px",
    borderColor: props.bordercolor,
    borderStyle: props.borderstyle,
  };
  return <img className="imgAvt" style={style} src={props.img} alt="img" />;
};

export default ImageAvt;
