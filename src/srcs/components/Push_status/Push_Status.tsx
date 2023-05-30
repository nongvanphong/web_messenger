import "./Push_Status.css";
import { icon } from "../../icons/icon";

import Button_blue from "../Button/Button";
import Input_area from "../Input/Input_area";
const Push_Status = () => {
  return (
    <div className="Push_Status-container">
      <div className="Push_Status-option">
        <icon.chonanh className="Push_Status-icon" />
        <icon.chonanh className="Push_Status-icon" />
        <icon.chonanh className="Push_Status-icon" />
      </div>
      <Input_area />
    </div>
  );
};

export default Push_Status;
