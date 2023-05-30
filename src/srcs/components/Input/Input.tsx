import "./input.css";
import { icon } from "../../icons/icon";
import { ChangeEvent, useState } from "react";
import { type } from "os";

type ip = {
  handleBntSend: (v: string | undefined) => void;
};

const Input = () => {
  return <div>jfdhgj</div>;
};
const Input_Send_Cmt = (props: ip) => {
  const [inpuCmt, setInputCmt] = useState<string>();

  const handelInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCmt(e.target.value);
  };

  const bntSend = () => {
    props.handleBntSend(inpuCmt);
    setInputCmt("");
  };
  return (
    <div className="input-send-cmt-block">
      <input
        className="input-send-cmt"
        type="text"
        value={inpuCmt}
        onChange={handelInput}
      />
      <button onClick={() => bntSend()} className="bnt-send-cmt">
        <icon.send className="bnt-send-cmt-icon" />
      </button>
    </div>
  );
};

export default { Input, Input_Send_Cmt };
