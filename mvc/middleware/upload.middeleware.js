// imageUpload.js

const multer = require("multer");
const path = require("path");

// Thiết lập lưu trữ cho multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đường dẫn nơi lưu trữ ảnh trên máy chủ
    const uploadDir = path.join(__dirname, "..", "..", "uploads");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Đặt tên file ảnh
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Khởi tạo middleware multer
const upload = multer({ storage: storage });

// Hàm xử lý tải lên ảnh
function handleImageUpload(req, res, next) {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Xử lý lỗi Multer
      res.status(500).send("Multer error: " + err.message);
    } else if (err) {
      // Xử lý lỗi khác
      res.status(500).send("Error: " + err.message);
    } else {
      // Dữ liệu ảnh được lưu trữ trong req.file
      if (!req.file) {
        res.status(400).send("lỗi file vui lòng upload");
      } else {
        // Xử lý thành công

        // get name image now
        const fileName = req.file.filename;

        req.iduser = req.body.iduser;
        req.username = req.body.username;
        req.img = fileName;
        next();
      }
    }
  });
}

// Xuất các hàm và middleware cần sử dụng
module.exports = {
  handleImageUpload: handleImageUpload,
};
