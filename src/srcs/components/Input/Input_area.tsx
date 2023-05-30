import { useState } from "react";
import "./input.css";
const Input_area = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  return (
    <textarea
      className="input-area-container "
      placeholder="Viết..."
      rows={1}
      value={value}
      onChange={handleChange}
    ></textarea>
  );
};

export default Input_area;
