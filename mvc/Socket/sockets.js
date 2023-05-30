const socketIO = require("socket.io");
// Lưu trữ thông tin kết nối và người dùng
let connections = [];

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000", // Thay đổi thành URL của client ReactJS của bạn
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  // đây là midlleware nếu không thành công thì người dùng không thể ra khỏ hàm này
  // io.use((socket, next) => {
  //   const username = socket.handshake.auth.username;
  //   if (!username) {
  //     console.log("không thể truye cập");
  //     return next(new Error("invalid username"));
  //   }
  //   socket.username = username;
  //   next();
  // });

  io.on("connection", (socket) => {
    // lặp đẻ lấy ra các thông tyin ở trong soket
    // io.sockets.sockets.forEach((socket) => {
    //   connections.push({
    //     iduser: socket.id,
    //   });
    // });

    connections.push({
      idsoket: socket.id,
    });

    //gửi thông tin các user về
    socket.emit("users", connections);

    console.log("số lượng người đang online", connections.length);

    // nhắn tin nhắn riêng
    chatPrivate(socket, io);

    socket.on("disconnect", () => {
      connections = connections.filter((item) => item.idsoket !== socket.id);
      console.log("số lượng người đang online", connections.length);
    });
  });
};

const chatPrivate = (socket, io) => {
  // thông boa khi có người nhắn tin
  socket.broadcast.emit("notify private massage", {
    userID: socket.id,
  });

  // nhận giữ liệu từ người nhận
  socket.on("private message", ({ content, to }) => {
    console.log(content, to);
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
};
