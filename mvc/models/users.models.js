const pool = require("../../config");

function fillupinformation(idusers, name, img, callback) {
  pool.query(
    "UPDATE `users` SET `users_name` = ?, `users_condistion` = 0, `img` = ? WHERE (`idusers` = ?);",
    [name, img, idusers],
    function (error, results) {
      if (error) return callback(500);

      callback(results);
    }
  );
}

registerUser = (email, password, callback) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  pool.query(
    "INSERT INTO `users` (`users_name`, `users_creat_date`, `userspass`, `users_email`) VALUES (NULL, ?, SHA2(?, 256), ?)",
    [dateTime, password, email],
    (err, results) => {
      if (err) return callback(500);

      callback(200);
    }
  );
};

createtoken = (iduser, token, refeshtoken, callback) => {
  pool.query(
    "UPDATE `users` SET `token` = ?, `refeshtoken` = ? WHERE (`idusers` = ?);",
    [token, refeshtoken, iduser],
    (err, results) => {
      if (err) return callback(500);

      callback(200);
    }
  );
};
createtoken = (iduser, token, refeshtoken, callback) => {
  pool.query(
    "UPDATE `users` SET `token` = ?, `refeshtoken` = ? WHERE (`idusers` = ?);",
    [token, refeshtoken, iduser],
    (err, results) => {
      if (err) return callback(500);

      callback(200);
    }
  );
};

logouttoken = (iduser, callback) => {
  pool.query(
    "UPDATE `users` SET `token` =null, `refeshtoken` = null WHERE (`idusers` = ?);",
    [iduser],
    (err, results) => {
      if (err) return callback(500);

      callback(200);
    }
  );
};

refeshtoken = (iduser, token, refeshtoken, callback) => {
  pool.query(
    "UPDATE `users` SET  `refeshtoken` = ? WHERE (`idusers` = ?);",
    [refeshtoken, iduser],
    (err, results) => {
      if (err) return callback(500);

      callback(200);
    }
  );
};
getInformationusUser = (iduser, callback) => {
  pool.query(
    "select users_name,users_premission,img from users where idusers=? and users_condistion=0;",
    [iduser],
    (err, results) => {
      if (err) return callback(500);

      callback(results);
    }
  );
};
module.exports = {
  fillupinformation,
  registerUser,
  createtoken,
  logouttoken,
  getInformationusUser,
};
