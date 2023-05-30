import { useEffect, useState } from "react";
import Login from "./Login";
import "./Login.css";
import Segister from "./Segister";

const Login_Segister_page = () => {
  const [click, setclick] = useState<number>(1);
  const [show, setshow] = useState<JSX.Element>();

  useEffect(() => {
    clickShow(click);
  }, [click]);

  const handleClick = (i: number) => {
    setclick(i);
  };

  const clickShow = (i: number) => {
    switch (i) {
      case 1: {
        setshow(<Login handleClick={handleClick} />);
        break;
      }
      case 2: {
        setshow(<Segister handleClick={handleClick} />);
        break;
      }
    }
  };

  return (
    <div className="backgroud__login">
      <div className="Login_Segister_page">
        <div className="Login_Segister_page__showe">{show}</div>
      </div>
    </div>
  );
};

export default Login_Segister_page;
