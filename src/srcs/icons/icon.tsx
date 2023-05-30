import {
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineComment,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { BiMessageSquareDetail, BiHomeAlt2 } from "react-icons/bi";
import { BsCamera, BsImages, BsSortDown, BsSortUp } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { FaUserFriends, FaFontAwesomeFlag } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineFavoriteBorder, MdAddCircleOutline } from "react-icons/md";
import { IoMdNotificationsOutline, IoIosShareAlt } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { RiMovieLine, RiUserFollowLine, RiPushpin2Line } from "react-icons/ri";
import { TiWiFi } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { BsGoogle } from "react-icons/bs";

const icon = {
  move: RiMovieLine,
  friend: FaUserFriends,
  user: AiOutlineUser,
  Notifi: IoMdNotificationsOutline,
  mess: BiMessageSquareDetail,
  home: BiHomeAlt2,
  favori: MdOutlineFavoriteBorder,
  send: IoSend,
  cmt: AiOutlineComment,
  bacham: CiMenuKebab,
  share: IoIosShareAlt,
  flag: FaFontAwesomeFlag,
  myfriend: RiUserFollowLine,
  follow: TiWiFi,
  camera: BsCamera,
  groudfriend: HiOutlineUserGroup,
  search: GoSearch,
  push: RiPushpin2Line,
  chonanh: BsImages,
  time: AiOutlineFieldTime,
  add: MdAddCircleOutline,
  email: HiOutlineMail,
  sortup: BsSortUp,
  sourtdown: BsSortDown,
  google: BsGoogle,
};
export { icon };
