var express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
// Import module Socket.IO

const cookieParser = require("cookie-parser");
var dotenv = require("dotenv").config({ path: "./process.env" });

var post = dotenv.parsed.PORT || 3000;

var app = express();

// Khởi tạo Socket.IO

// Gán đối tượng io cho biến toàn cục để có thể sử dụng trong các tệp controller khác

// gọi body parser
var bodyparsert = require("body-parser");
// sử dụng body parser
app.use(cookieParser());
app.use(bodyparsert.json());
app.use(
  bodyparsert.urlencoded({
    extended: true,
  })
);

// đonạ này để chấp nhậ sever gửi cookie
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
const server = http.createServer(app);

// lấy dung lượng header của server
let size = http.maxHeaderSize;
console.log("Max HTTP Header size is", size);

// kết nối với database
require("./config");

// lấy đường dẫn trang đến thư mục css
app.use(express.static("/uploads"));
app.use("/uploads", express.static("uploads"));

require("./mvc/controllers/users.controllers")(app);
require("./mvc/controllers/friend.controllers")(app);
require("./mvc/controllers/messenger.controller")(app);
require("./mvc/Socket/sockets")(server);
//////////////-------------------------------------
// gọi cổng sever
server.listen(1234, function () {
  // đường daanc :3000 mói có thể sử dụng
  console.log("http://localhost:" + post);
});

//============= cài đặt modun==============
// cài dăt node js
// npm init -y hoặc là npm init
// npm i express --save
// npm i body-parser --save
//real time
// npm install socket.io --save
// socket.io/socket.io.js

// để hjoox trọ kết nối
// npm i -s express-handlebars

// tự dộng chạy sever
//npm i nodemon -g

//============ kết nói sql==============
// mssql
//msnodesqlv8
