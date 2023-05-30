const model = require("../models/friend.models");
var validator = require("../../validate");
const auth = require("../middleware/auth.login.middleware");
module.exports = (app) => {
  // getdata friend suggest
  app.post("/friendsuggest", auth.jwtveryfy, (req, res) => {
    const id = req.iduser;

    // use function getdata suggest at modul model
    model.friendSuggest(id, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });

      if (results.lenght > 0)
        return res.status(400).send({ message: "Không có dữ liệu" });

      res.status(200).json(results);
    });
  });
  // xem danh sách đang những người đang theo dõi
  app.post("/getDataUserCurrentFollower", auth.jwtveryfy, (req, res) => {
    const id = req.iduser;

    // gọi lại hàm lấy danh sách những người đang theo dõi mìn
    model.getDataUserCurrentFollower(id, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });

      if (results.lenght < 1)
        return res.status(400).send({ message: "Không có dữ liệu" });
      res.status(200).json(results);
    });
  });
  // xem danh sách đang những người đang làm bạn
  app.post("/getdatafriend", auth.jwtveryfy, (req, res) => {
    const id = req.iduser;

    model.getDataFriend(id, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });
      res.status(200).json(results);
    });
  });
  // chấp nhận bạn bè
  app.post("/acceptfriend", auth.jwtveryfy, (req, res) => {
    const { id } = req.body;

    model.acceptfriend(id, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });

      res.status(200).send({ message: "Đồng ý làm bạn" });
    });
  });
  // theo dõi (gửi yêu cầu kết bạn)
  app.post("/addfollower", auth.jwtveryfy, (req, res) => {
    const idsend = req.iduser;
    const { idget } = req.body;

    model.follower(idsend, idget, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });

      res.status(200).send({ message: "Bạn đã bắt đầu fowoer" });
    });
  });

  //hủy theo dõi (hủy  kết bạn)
  app.post("/deletefollow", auth.jwtveryfy, (req, res) => {
    const { id } = req.body;

    model.deleteFollow(id, function (results) {
      if (results == 500)
        return res.status(500).send({ message: "Lỗi truy vẫn" });

      res.status(200).send({ message: "Bạn xóa fowoer" });
    });
  });
};
