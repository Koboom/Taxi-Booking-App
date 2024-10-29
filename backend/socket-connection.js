const socketIo = require("socket.io");

let io = null;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: ['http://localhost:8080','https://yukselsoftware.de'], // İzin verilen kaynakları buraya ekleyin
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("joinRoom", (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`Socket ${socket.id} joined room: ${chatRoomId}`);
    });

    socket.on("sendMessage", async (messageData, callback) => {
      console.log("New message received:", messageData);
      try {
        const message = { ...messageData };
        io.to(messageData.chatRoom).emit("receiveMessage", message);
        callback({ status: "success" });
      } catch (error) {
        console.error("Error processing message:", error);
        callback({ status: "error", error });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocket };
