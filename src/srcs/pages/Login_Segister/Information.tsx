import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Login.css";
import { useDropzone } from "react-dropzone";
import { icon } from "../../icons/icon";
import { useNavigate } from "react-router-dom";
import { Fill_Up_information_Utils } from "../../utils/Login/Login.utils";
import { SessionUser } from "../../../App";
type ty = {
  handleClick: (i: number) => void;
  iduser: string | undefined;
};
const Information = (props: ty) => {
  // get usecontext
  const sessionUser = useContext(SessionUser);

  const [checknext, setchecknext] = useState<number>(1);
  const [img, setimg] = useState<string>();
  const [username, setusername] = useState<string>();
  const [file, setfile] = useState<File>();
  const navigater = useNavigate();

  // get text user name
  const handleTextname = (e: ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };

  useEffect(() => {});
  const nextLogin = () => {
    setchecknext((prevChecknext) => {
      const nextValue = prevChecknext + 1;

      if (nextValue === 2) {
      }

      if (nextValue > 3) {
        updateInformation();

        navigater("/home");
        return 3;
      }

      return nextValue;
    });
  };

  // fill up information
  const updateInformation = async () => {
    if (props.iduser && username && file) {
      sessionUser.setSession(props.iduser);
      const result: any = await Fill_Up_information_Utils(
        props.iduser,
        username,
        file
      );
      console.log(result);
    }
  };

  const backLogin = () => {
    setchecknext((prevChecknext) => {
      const nextValue = prevChecknext - 1;

      if (nextValue < 1) {
        props.handleClick(0);
      }
      return nextValue;
    });
  };
  // pick img
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setfile(acceptedFiles[0]);
      setimg(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Chỉ cho phép chọn một tệp tin duy nhất
    maxFiles: 1, // Giới hạn số lượng tệp tin được chọn thành 1
  });

  return (
    <div className="login">
      <div className="header">
        <div className="logo">
          <div className="logo-1">Nesa</div>
        </div>
        <div className="tile">
          <div onClick={backLogin} className="cursor">
            back
          </div>
        </div>
      </div>

      <div className="from">
        {checknext == 1 && (
          <div className="from__group">
            <label className="label">Name</label>
            <input
              placeholder="Name"
              className="input"
              type="text"
              onChange={handleTextname}
              value={username}
            />
          </div>
        )}

        {checknext == 2 && (
          <div className="from__group form__group--flex">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="form__img">
                  <img src={img}></img>
                </div>
              ) : (
                <div className="form__img">
                  <img src={img}></img>
                </div>
              )}
            </div>
          </div>
        )}
        {checknext == 3 && (
          <div className="from__group form__group--flex">
            Bạn đã hoàn thành các bước để đăng kí! Bạn ấn next để banwts đầu sửu
            dụng nexsa!!!
          </div>
        )}
        <div className="bnt__login ">
          <div onClick={nextLogin} className="bnt__login--1 cursor ">
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
