const HTTP: string = "localhost";
const PORT: number = 1234;

const SERVER: string = "http://" + HTTP + ":" + PORT;

// api connect login-sigister
const apilogin = SERVER + "/login";
const apisigister = SERVER + "/registeruser";
const apifillupinformation = SERVER + "/fillupinformation";

// user
const apiGetInformation = SERVER + "/getinformationuser";

// api connect
const apifriendsuggest = SERVER + "/friendsuggest";
const apiffollower = SERVER + "/getDataUserCurrentFollower";
const apimyfriend = SERVER + "/getdatafriend";

// add use in list follow
const apiaddfollow = SERVER + "/addfollower";
// delete use in list follow
const apideletemyfriend = SERVER + "/deletefollow";
// accept use in list friend
const apiacceptfriend = SERVER + "/acceptfriend";

// chat
const apiChat = SERVER;
const apiSearchUserChat = SERVER + "/search-messenger-users";
const apiGetDataChat = SERVER + "/private-messenge";
const apiGetDataUserChat = SERVER + "/get-list-data-user-messenger";

const apiGetIdConversation = SERVER + "/create-messenge-private";
const apiInsertContent = SERVER + "/insert-private-messenge";

export {
  apifriendsuggest,
  apimyfriend,
  apiffollower,
  apiaddfollow,
  apideletemyfriend,
  apiacceptfriend,
  apilogin,
  apisigister,
  apifillupinformation,
  apiGetInformation,
  apiChat,
  apiSearchUserChat,
  apiGetDataChat,
  apiGetDataUserChat,
  apiGetIdConversation,
  apiInsertContent,
};
