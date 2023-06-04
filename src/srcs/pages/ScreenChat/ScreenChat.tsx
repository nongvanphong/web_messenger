import Messenger from "../../components/Messenger/Messenger";
import "./ScreenChat.css";
import searchs from "../../components/Search/Search";
import itemuser from "../../components/Item/Item_user/Item_user_msg";
import { createContext, useEffect, useRef, useState } from "react";
import {
  getDataChat,
  getDataUserChat,
  searchUserChat,
} from "../../utils/Mesenger/Messenger";
import { Socket, io } from "socket.io-client";
import { ApiSocket } from "../../utils/socket/Sockets";
import { useCookies } from "react-cookie";
import { user_interface } from "../../Interface/Interface.User";
interface users_inteface {
  idusers: string;
  users_name: string;
  img: string;
}
// tin nhắn
interface list_user_messenger_inteface {
  idconversations: string;
  iduser1: string;
  name1: string;
  img1: string;
  iduser2: string;
  name2: string;
  img2: string;
  timesend: Date;
  msgtext: string;
  notify: string;
}

interface user_Type extends user_interface {
  idconversations: string;
}

interface SocketContextProps {
  socket: Socket | null;
  myId: string;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  myId: "",
});

const ScreenChat = () => {
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "cookieAcceptToken",
    "cookieRefreshToken",
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myId, setMyId] = useState<string>("-1");
  const [checkSearch, setCheckSearch] = useState<boolean>(true);
  const [dataSearch, setDataSearch] = useState<users_inteface[]>();
  const [dataUserChat, setDataUserChat] = useState<
    list_user_messenger_inteface[]
  >([]);
  const [inforUserChat, setInforUserChat] = useState<user_Type>();

  const handleInput = (a: string): void => {
    searchApi(a);
    setCheckSearch(false);
  };
  // hàm đó chức năng tìm kiếm
  const closeSearch = () => {
    setCheckSearch(true);
  };

  // hàm tìm kiêm
  const searchApi = async (txtsearch: string) => {
    const result: any = await searchUserChat(txtsearch);
    setDataSearch(result.data);
  };

  // hàm kiểm tra người dùng sẽ nhắn tin với ai
  const getIdUserChat = async (
    a: string,
    idconversation: string,
    username: string,
    img: string
  ) => {
    setInforUserChat({
      condistion: 1,
      email: "",
      idconversations: idconversation,
      iduser: a,
      img: img,
      users_name: username,
      users_premission: 1,
    });
  };
  // load dữ liệu lanaff đầu tiên để lấy danh sách những người bạn đã chat
  useEffect(() => {
    let myid: string | null = localStorage.getItem("myId");
    if (myid) {
      setMyId(myid);
    }

    const dataUserChat = async () => {
      if (myid) {
        const result: any = await getDataUserChat(myid);
        setDataUserChat(result.data);
      }
    };
    dataUserChat();
  }, []);

  useEffect(() => {
    // Khởi tạo socket khi component được render
    const newSocket = io(ApiSocket, {
      // đây là chuyền tham số
      auth: {
        token: cookies.cookieAcceptToken,
      },
    });

    setSocket(newSocket);

    // Lắng nghe sự kiện "connect" khi kết nối thành công
    newSocket.on("connect", () => {
      console.log("Kết nối thành công");
    });

    // Lắng nghe sự kiện "users" từ server
    newSocket.on("notify private massage", (message) => {
      console.log("thông báo", message);
      setDataUserChat(
        dataUserChat.map((item) => {
          console.log(item.iduser1, item.iduser2, message.from);
          if (item.iduser1 == message.from) {
            return { ...item, msgtext: message.content.msgtext };
          } else if (item.iduser2 == message.from) {
            return { ...item, msgtext: message.content.msgtext };
          } else {
            return item;
          }
        })
      );
    });

    // Cleanup khi component unmount hoặc khi socket thay đổi
    return () => {
      console.log("disconect");
      // Lắng nghe sự kiện "disconnect" khi đóng kết nối
      newSocket.on("disconnect", () => {
        console.log("Mất kết nối");
      });
      // Đóng kết nối socket
      if (newSocket) newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, myId }}>
      <div className="msg__container">
        <div className="msg--left">
          <div className="msg__sr">
            <searchs.Search bntClick={handleInput} />
          </div>

          {checkSearch && <div className="msg__title">chat</div>}
          {!checkSearch && (
            <div className="msg__title">
              <div>search</div>
              <div onClick={() => closeSearch()} className="close-search"></div>
            </div>
          )}

          {checkSearch && (
            <div className="msg_listuser">
              {dataUserChat.map((item, index) =>
                item.iduser1 != myId ? (
                  <itemuser.Item_user_msg
                    conten={item.msgtext}
                    iduser={item.iduser1}
                    time={item.timesend}
                    username={item.name1}
                    handleClick={getIdUserChat}
                    idconversation={item.idconversations}
                    img={item.img1}
                  />
                ) : (
                  <itemuser.Item_user_msg
                    conten={item.msgtext}
                    iduser={item.iduser2}
                    time={item.timesend}
                    username={item.name2}
                    handleClick={getIdUserChat}
                    idconversation={item.idconversations}
                    img={item.img2}
                  />
                )
              )}
            </div>
          )}
          {!checkSearch && (
            <div className="msg_listuser">
              {dataSearch?.map((item) => {
                return (
                  <itemuser.Item_user_msg_search
                    iduser={item.idusers}
                    handleClick={getIdUserChat}
                    idconversation=""
                    username={item.users_name}
                    time={null}
                    conten={null}
                    img={item.img}
                  />
                );
              })}
            </div>
          )}
        </div>
        {inforUserChat?.iduser && (
          <div className="msg--right">
            {inforUserChat && (
              <Messenger
                condistion={inforUserChat.condistion}
                email={inforUserChat.email}
                idconversations={inforUserChat.idconversations}
                users_name={inforUserChat.users_name}
                iduser={inforUserChat.iduser}
                img={inforUserChat.img}
                users_premission={inforUserChat.users_premission}
              />
            )}
          </div>
        )}
      </div>
    </SocketContext.Provider>
  );
};

export default ScreenChat;
