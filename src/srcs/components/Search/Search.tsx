import "./Search.css";
import { icon } from "../../icons/icon";
import { type } from "os";
import { ChangeEvent, useState } from "react";

type typeSearch = {
  bntClick: (a: string) => void;
};

const Search = (props: typeSearch) => {
  const [input, setInput] = useState<string>();
  // lấy nội dung text
  const hanldInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const bntSearch = () => {
    if (input) props.bntClick(input);
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        onChange={hanldInputText}
        value={input}
        placeholder="Search"
      />
      <icon.search
        onClick={() => bntSearch()}
        className="search__bnt"
      ></icon.search>
    </div>
  );
};
const Search1 = () => {
  return <div className="search">sea</div>;
};
export default { Search, Search1 };
