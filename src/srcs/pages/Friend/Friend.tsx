import Item_Word_Friend from "../../components/Item/Item_Friend/Item_Word_Friend";
import "./Friend.css";
import { icon } from "../../icons/icon";

import search from "../../components/Search/Search";
import { useContext, useEffect, useState } from "react";
import Item_Suggest_Friend from "../../components/Item/Item_Friend/Item_Suggest_Friend";
import Item_My_Friend from "../../components/Item/Item_Friend/Item_My-Friend";
import { AddFollow, FriendSugest } from "../../utils/Friend/FriendSuggest";
import { AcceptFollower, Follower } from "../../utils/Friend/Follower";
import { DeleteMyFriend, MyFriend } from "../../utils/Friend/MyFriend";
import {
  folower_interface,
  friend_interface,
  myfriend_interface,
} from "../../Interface/Interface.User";
import { SessionUser } from "../../../App";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Notifycation from "../../components/Modals/Notifycation";

const Friend = () => {
  // get usecontext
  const sessionUser = useContext(SessionUser);
  console.log(sessionUser.iduser);
  // choos show list friend
  const [select, setselect] = useState<string>("myfriend");
  const [showitem, setshowitem] = useState<JSX.Element[] | null>(null);
  const [dtarr, setarrdata] = useState<friend_interface[]>([]);
  const [dtarrfollow, setarrdatafollow] = useState<folower_interface[]>([]);
  const [dtarrmyfriend, setarrdatamyfriend] = useState<myfriend_interface[]>(
    []
  );
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "cookieAcceptToken",
    "cookieRefreshToken",
  ]);

  // chuyển hướng trang
  const navigater = useNavigate();

  // hiển thị thông báo bắt đang nhập lại
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    // quay lại trang login
    removeCookie("cookieAcceptToken");
    removeCookie("cookieRefreshToken");
    navigater("/login");
    window.history.replaceState(null, "", window.location.origin);
  };

  const handleInput = (a: string): void => {
    console.log(a);
  };

  useEffect(() => {
    selectFriend();
  }, [select]);

  // show list use sugget
  useEffect(() => {
    if (dtarr.length > 0) {
      const dt = dtarr.map((i) => {
        return (
          <Item_Word_Friend
            key={i.idusers}
            friend={{
              idusers: i.idusers,
              img: i.img,
              users_name: i.users_name,
            }}
            handlerClick={addFollow}
          />
        );
      });
      return setshowitem(dt);
    }

    return setshowitem([<div>Không có ai gửi lời mời </div>]);
  }, [dtarr]);

  // show list use follow
  useEffect(() => {
    if (dtarrfollow.length > 0) {
      const dt = dtarrfollow.map((i) => {
        return (
          <Item_Suggest_Friend
            handleClickAccept={handleaccept}
            handleClickDelete={handleDelete}
            user={{
              idusers: i.idusers,
              img: i.img,
              users_name: i.users_name,
              idfriend: i.idfriend,
            }}
          />
        );
      });
      return setshowitem(dt);
    }

    return setshowitem([<div>có lõi xảy ra</div>]);
  }, [dtarrfollow]);

  // show list myfriend
  useEffect(() => {
    if (dtarrmyfriend !== undefined) {
      const dt = dtarrmyfriend.map((i) => {
        return (
          <Item_My_Friend
            key={i.idusers}
            handleClick={handleDelete}
            myfriend={{
              idfriend: i.idfriend,
              users_name: i.users_name,
              idusers: i.idusers,
              img: i.img,
            }}
          />
        );
      });
      return setshowitem(dt);
    }

    return setshowitem([<div>not data</div>]);
  }, [dtarrmyfriend]);

  const handleSelect = (e: any) => {
    setselect(e.target.value);
  };

  const selectFriend = () => {
    switch (select) {
      case "myfriend":
        myFriend();
        break;
      case "friendfollow":
        follower();
        break;
      case "suggedtfriend":
        sugestFriend();
        break;
    }
  };

  // funtion get data friend sugest
  const sugestFriend = async () => {
    const result: any = await FriendSugest("cookie");
    if (result.data !== undefined) {
      setarrdata(result.data);
    }
  };

  // funtion get data follower
  const follower = async () => {
    const result: any = await Follower("cookie");
    if (result.data !== undefined) {
      setarrdatafollow(result.data);
    }
  };

  // funtion get data my friend
  const myFriend = async () => {
    const result: any = await MyFriend("cookie");
    setarrdatamyfriend(result.data);
  };

  // add user list follow
  const addFollow = async (id: string) => {
    const result: any = await AddFollow("cookie", id);

    // nếu có dứ liệu thì mới cho hiển thị đata
    if (result.response && result.response.status) {
      if (result.response.status === 403 || result.response.status === 401) {
        // nếu không sẽ hiển thị tông báo bắt đăng nhập lại
        setShowModal(true);
      }
    } else {
      if (result.status === 200) {
        setarrdata((i) => {
          // check if i== null then break in funtion
          if (i === null) {
            return [];
          }

          return i.filter((friend) => friend.idusers !== id);
        });
      } else {
        alert("err add follow");
      }
    }
  };

  // bnt accept follow
  const handleaccept = async (id_friend: string) => {
    const result: any = await AcceptFollower("cookie", id_friend);
    console.log(id_friend);
    console.log(result.response);

    // nếu có dứ liệu thì mới cho hiển thị đata
    if (result.response && result.response.status) {
      if (result.response.status === 403 || result.response.status === 401) {
        // nếu không sẽ hiển thị tông báo bắt đăng nhập lại
        setShowModal(true);
      }
    } else {
      if (result.status == 200) {
        setarrdatafollow((i) => {
          // check if i== null then break in funtion
          if (i === null) {
            return [];
          }

          return i.filter((friend) => friend.idfriend !== id_friend);
        });
      } else {
        alert("err accep");
      }
    }
  };
  // bnt delee follow
  const handleDelete = async (id_friend: string) => {
    const result: any = await DeleteMyFriend("cookie", id_friend);

    // nếu có dứ liệu thì mới cho hiển thị đata
    if (result.response && result.response.status) {
      if (result.response.status === 403 || result.response.status === 401) {
        // nếu không sẽ hiển thị tông báo bắt đăng nhập lại
        setShowModal(true);
      }
    } else {
      if (result.status === 200) {
        setarrdatafollow((i) => {
          // check if i== null then break in funtion
          if (i === null) {
            return [];
          }

          return i.filter((friend) => friend.idfriend !== id_friend);
        });
      } else {
        alert("err delete");
      }
    }
  };

  return (
    <div className="friend">
      <Notifycation
        showmd={showModal}
        handleClose={handleCloseModal}
        title="Thông báo"
        msg="Bnaj cần xác minh lại tài khoản. Vui lòng đăng nhập lại"
        titlebnt="Đăng nhập"
      />
      <div className="friend-header">
        <div className="friend-header--search">
          <search.Search bntClick={handleInput} />
        </div>
        <div className="friend-header--menu">
          <select
            onChange={handleSelect}
            className="    menu__select menu--style"
          >
            <option value="myfriend">Bạn bè</option>
            <option value="friendfollow">Lời mời</option>
            <option value="suggedtfriend">Có thể quen</option>
          </select>
          <icon.sortup className=" menu--style" />
          <icon.sourtdown className=" menu--style" />
        </div>
      </div>
      <div className="lists--friend">{showitem}</div>
    </div>
  );
};

export default Friend;
