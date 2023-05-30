const pool = require("../../config");
const validate = require("../../validate");
// check email
const checkEmail = (req, res, next) => {
  const email = req.email;
  pool.query(
    "select count(*) as checks from `users` where `users_email`=?",
    [email],
    (err, results) => {
      if (err) return err;
      if (results[0].checks > 0) {
        res.status(400).send({ message: "email đã tồn tại" });
      } else {
        next();
      }
    }
  );
};
// validate data sigister
const validateDataSigister = (req, res, next) => {
  const { email, password1, password2 } = req.body;

  if (
    validate.email(email) ||
    validate.pass(password1) ||
    validate.pass(password2)
  )
    return res.status(422).send({ message: "Lỗi không đúng định dạng" });
  if (password1 !== password2) {
    return res.status(401).send({ message: "mật khẩu không khớp" });
  }
  req.email = email;
  req.password = password1;
  next();
};
// check create accout
const checkAccLogin = (req, res, next) => {
  const { email, password } = req.body;
  pool.query(
    "select users.idusers,users.users_condistion,users.users_premission from users where ( users.users_email= ? ) and users.userspass=SHA2(?, 256)",
    [email, password],
    function (error, results) {
      if (error) {
        res.status(500).send({ message: "Đăng nhập thất bại" });
      }

      if (results[0] === undefined)
        return res
          .status(400)
          .send({ message: "tài khoẳn hặc mật khẩu không chính sác" });

      if (results[0].users_condistion[0] === 0) {
        (req.iduser = results[0].idusers),
          (req.premission = results[0].users_premission[0]);
        next();
      } else {
        res.status(403).send({
          iduser: results[0].idusers,
          message: "Chưa đăng kí tài khỏa hoàn tất",
        });
      }
    }
  );
};

module.exports = {
  checkEmail: checkEmail,
  validateDataSigister: validateDataSigister,
  checkAccLogin: checkAccLogin,
};
