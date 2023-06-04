import Item_chat_left from "./Item_chat";
import "./Messenger.css";
import Item_chat from "./Item_chat";
import Input from "../Input/Input";
import { useContext, useEffect, useRef, useState } from "react";
//import SocketContext from "../../pages/ScreenChat/ScreenChat"
import { ApiSocket } from "../../utils/socket/Sockets";
import {
  getDataChat,
  getIdConversations,
  insertContent,
} from "../../utils/Mesenger/Messenger";

import { SocketContext } from "../../pages/ScreenChat/ScreenChat";
import { user_interface } from "../../Interface/Interface.User";
import img from "../../img/avt.jpg";
// tin nhắn
interface messenger_inteface {
  idconversations: string | undefined;
  idusersend: string;
  iduserget: string | undefined;
  msgtext: string;
  timesend: Date;
}

interface user_Type extends user_interface {
  idconversations: string;
}
const Messenger = (props: user_Type) => {
  // lấu usecontectsoket ra sử dung
  const { socket, myId } = useContext(SocketContext);

  const [checkUserLoad, setCheckUserLooad] = useState<string[]>([]);

  const [idConversation2, setIdConversation2] = useState<string | undefined>(
    undefined
  );
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
    // kiểm tra 2 người đã nhắn tin với nhau chư
    console.log("------>", checkUserChat());
    // trước khi gửi tin nhắn kiểm tra có idconvertion  có tồn tại không

    if (props.idconversations || idConversation2) {
      // sử lí các user đã tồn tạo và đang nhắn tin
      let idconversationnew: string = "";
      if (props.idconversations) idconversationnew = props.idconversations;
      if (idConversation2) idconversationnew = idConversation2;
      sendMsg(v, idconversationnew);
    } else {
      // yêu cầu tạo tin nhắn mới
      if (props.iduser) createIdConversation(myId, props.iduser, v);
    }
  };

  // lấy danh sách tin nhắn của từng user
  useEffect(() => {
    const getData = async () => {
      if (idConversation2) setIdConversation2(undefined);
      let result: any;

      // kiểm tra id đã được thêm vào mảng hay chưa, nếu đã tồn tạo thì không dduwicj thêm
      const checkId = checkUserLoad.findIndex((i) => i === props.iduser);
      if (checkId == -1 && props.iduser !== undefined) {
        checkUserLoad.push(props.iduser);
        result = await getDataChat(myId, props.iduser);
        setDataConten((p) => [...p, ...result.data]);
      }
    };
    getData();
  }, [props.iduser]);

  useEffect(() => {
    if (socket) {
      const handleUsers = (message: any) => {
        console.log("=>", message);
      };
      const handlePrivateMessage = (message: any) => {
        setDataConten((prevMsg) => [...prevMsg, message.content]);
      };

      socket.on("users", handleUsers);
      socket.on("private message", handlePrivateMessage);

      // Cleanup khi component unmount
      return () => {
        socket.off("users", handleUsers);
        socket.off("private message", handlePrivateMessage);
      };
    }
  }, [socket]);

  // hàm kiêm tra 2 người đã nhắn tin với nhau hay chưa
  const checkUserChat = () => {
    const id = dataContent.findIndex((i) => {
      if (i.iduserget === props.iduser && i.idusersend === myId) {
        return true;
      }
      return false;
    });
    return id;
  };

  // hàm cho phét gửi tin nhắn khi có idconversation
  const sendMsg = async (v: string | undefined, idconversations: string) => {
    // thêm dữ liệu vào  kiểu dữ liệu
    const newform: messenger_inteface = {
      idconversations: idconversations,
      iduserget: props.iduser,
      timesend: new Date(2022, 0, 1, 12, 0, 0),
      msgtext: v || "",
      idusersend: myId,
    };
    const result: any = await insertContent(
      myId,
      props.iduser,
      v,
      idconversations
    );
    if (result.status !== 200) {
      return alert("không gửi được tin nhắn");
    }

    // đẩy dữ liệu lên soket
    if (socket)
      socket.emit("private message", {
        content: newform,
        to: props.iduser,
      });
    setDataConten((prevMsg) => [...prevMsg, newform]);

    //console.log(dataContent);
  };
  // hàm tạo idconversation
  const createIdConversation = async (
    idsend: string,
    idget: string,
    v: string | undefined
  ) => {
    const result: any = await getIdConversations(idsend, idget);
    if (result.status == 200) {
      setIdConversation2(result.data);

      sendMsg(v, result.data);
    } else {
      alert("chức năng này đang bị lỗi nghiêm trong");
    }
  };

  return (
    <div>
      <div className="messenger__header">
        <div className="messenger__header--flex">
          <img className="messenger__header__avt" src={props.img}></img>
          <div>{props.users_name}</div>
        </div>
        <div className="messenger__header--flex">
          <div className="messenger__rotate messenger__rotate--green"></div>
          <div className="messenger__rotate messenger__rotate--orange"></div>
          <div className="messenger__rotate messenger__rotate--red"></div>
        </div>
      </div>

      <div className="msg__main" ref={messageListRef}>
        {dataContent.map((message, index) => {
          if (message.idusersend == myId && message.iduserget == props.iduser) {
            return (
              <Item_chat.Item_chat_right txt={message.msgtext} key={index} />
            );
          } else if (
            message.idusersend == props.iduser &&
            message.iduserget == myId
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
