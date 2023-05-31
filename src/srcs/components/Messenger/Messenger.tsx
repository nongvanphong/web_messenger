import Item_chat_left from "./Item_chat";
import "./Messenger.css";
import Item_chat from "./Item_chat";
import Input from "../Input/Input";
import { useContext, useEffect, useRef, useState } from "react";
//import SocketContext from "../../pages/ScreenChat/ScreenChat"
import { ApiSocket } from "../../utils/socket/Sockets";
import { getDataChat } from "../../utils/Mesenger/Messenger";

import { Socket, io } from "socket.io-client";
import { SocketContext } from "../../pages/ScreenChat/ScreenChat";
import { parse } from "path";

// tin nhắn
interface messenger_inteface {
  idconversations: string | undefined;
  idusersend: string;
  iduserget: string;
  msgtext: string;
  timesend: Date;
}

type message = {
  idsend: string | undefined;
  idconversation: string | undefined;
};

interface content_inteface {
  idusersend: string;
  iduserget: string;
  usenamesend: string;
  msgtext: string;
  timesend: Date;
}
interface user_chat_inteface {
  idusersend: string;
  usenamesend: string;
  content: content_inteface[];
}
const Messenger = (props: message) => {
  // lấu usecontectsoket ra sử dung
  const socket = useContext(SocketContext);

  const [checkUserLoad, setCheckUserLooad] = useState<string[]>([]);

  const idtest: string = "1";
  const messageListRef = useRef<HTMLDivElement>(null);

  const [dataContent, setDataConten] = useState<messenger_inteface[]>([]);

  // lăng nghe có tin nhắn gửi về
  useEffect(() => {
    scrollToBottom();
  }, [dataContent]);

  // khi thêm 1 phần thử nó sẽ tự dộng chuyển trang
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const sendInput = (v: string | undefined): void => {
    // thêm dữ liệu vào  kiểu dữ liệu
    const newform: messenger_inteface = {
      idconversations: props.idconversation,
      iduserget: "2",
      timesend: new Date(2022, 0, 1, 12, 0, 0),
      msgtext: v || "",
      idusersend: idtest,
    };

    // đẩy dữ liệu vào mnagr
    setDataConten((prevMsg) => [...prevMsg, newform]);
    // setDataMessenger((prevMsg) => [...prevMsg, newTest2]);
    console.log(dataContent);
    if (socket)
      socket.emit("private message", {
        content: newform,
        to: "8d7UDsyWro0v5_ouAAAd",
      });
    // console.log("kkkk");
  };

  // lấy danh sách tin nhắn
  useEffect(() => {
    const getData = async () => {
      let result: any;
      // kiểm tra id đã được thêm vào mảng hay chưa, nếu đã tồn tạo thì không dduwicj thêm
      const checkId = checkUserLoad.findIndex((i) => i === props.idsend);
      if (checkId == -1 && props.idsend !== undefined) {
        checkUserLoad.push(props.idsend);
        result = await getDataChat(idtest, props.idsend);
        setDataConten((p) => [...p, ...result.data]);
      }
    };
    getData();
  }, [props.idsend]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("users", (message) => {
        console.log("=>", message);
      });
      socket.on("private message", (message) => {
        console.log(message.content);
        setDataConten((prevMsg) => [...prevMsg, message.content]);
      });
    }
    // // Cleanup khi component unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <div className="messenger__header">
        <div className="messenger__header--flex">
          <div className="messenger__header__avt"></div>
          <div>Phong phong</div>
        </div>
        <div className="messenger__header--flex">
          <div className="messenger__rotate messenger__rotate--green"></div>
          <div className="messenger__rotate messenger__rotate--orange"></div>
          <div className="messenger__rotate messenger__rotate--red"></div>
        </div>
      </div>

      <div className="msg__main" ref={messageListRef}>
        {dataContent.map((message, index) => {
          if (
            message.idusersend == idtest &&
            message.idconversations == props.idconversation
          ) {
            return (
              <Item_chat.Item_chat_right txt={message.msgtext} key={index} />
            );
          } else if (
            message.idusersend == props.idsend &&
            message.idconversations == props.idconversation
          ) {
            return (
              <Item_chat.Item_chat_left txt={message.msgtext} key={index} />
            );
          }
        })}
      </div>

      <Input.Input_Send_Cmt handleBntSend={sendInput} />
    </div>
  );
};

export default Messenger;
