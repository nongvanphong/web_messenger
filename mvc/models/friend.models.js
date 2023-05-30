const pool = require("../../config");
let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + " " + time;

//get data friend suggest
const friendSuggesr = (id, callback) => {
  pool.query(
    "select  u.idusers,u.img,u.users_name from users as u WHERE u.idusers <> ? and u.users_condistion !=1  and u.idusers NOT IN ( SELECT idfriend_02 FROM friends WHERE (idfriend_01 =? or idfriend_02=?) and( status ='0' or status='1')) and u.idusers NOT IN (SELECT idfriend_01 FROM friends WHERE (idfriend_01 =? or idfriend_02=?) and( status = '0' or status='1'))",
    [id, id, id, id, id],
    function (err, result) {
      if (err) callback(400);

      callback(result);
    }
  );
};
// xem danh sách những người dùng đang theo dõi  mình
const getDataUserCurrentFollower = (id, callback) => {
  pool.query(
    " select  friends.idfriend,users.idusers,users.img,users.users_name   from users left join friends on ( users.idusers=friends.idfriend_01) where friends.status='0' and ( friends.idfriend_02=?)",
    [id],
    function (err, result) {
      if (err) callback(500);
      callback(result);
    }
  );
};

// xem danh xách những người đã là bạn bè
const dataFriend = (id, callback) => {
  pool.query(
    " select  friends.idfriend,users.idusers,users.img,users.users_name from users left join friends on users.idusers=friends.idfriend_01 or users.idusers=friends.idfriend_02 where friends.status='1' and (friends.idfriend_01= ? or friends.idfriend_02=?) and users.idusers <> ?",
    [id, id, id],
    function (err, result) {
      if (err) callback(500);
      callback(result);
    }
  );
};
// chập nhận yêu cầu kết bạn (đồng ý theo dõi)
const acceptfriend = (idfriendadd, callback) => {
  pool.query(
    "UPDATE friends SET `status` = '1', `date_send` = null, `date_accept` = ?  WHERE (`idfriend` = ?)",
    [dateTime, idfriendadd],
    function (err, result) {
      if (err) callback(500);
      callback(200);
    }
  );
};
// hàm follow
const follower = (idfriendsend, idfriendget, callback) => {
  pool.query(
    "INSERT INTO `friends` (`idfriend_01`, `idfriend_02`, `idfriend_send`, `date_send`) VALUES (?, ?, ?, ?)",
    [idfriendsend, idfriendget, idfriendsend, dateTime],
    function (err, result) {
      if (err) callback(500);
      callback(200);
    }
  );
};
// hàm xóa follow
const deleteFollow = (id, callback) => {
  pool.query(
    "delete from friends where idfriend=?",
    [id],
    function (err, result) {
      if (err) callback(500);
      callback(200);
    }
  );
};
module.exports = {
  friendSuggest: friendSuggesr,
  getDataUserCurrentFollower: getDataUserCurrentFollower,
  getDataFriend: dataFriend,
  acceptfriend: acceptfriend,
  follower: follower,
  deleteFollow: deleteFollow,
};
