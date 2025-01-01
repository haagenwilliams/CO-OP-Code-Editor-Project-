const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Initialize the set up for the app (express)
const app = express();
app.use(cors());

// this will create the server
const server = http.createServer(app);

// this will set up Socket.IO with the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Store the current code that is being used
let code = "";

// Handle socket connections
io.on("connection", (socket) => {

  socket.emit("code-change", code);


  socket.on("code-change", (newCode) => {
    code = newCode;
    socket.broadcast.emit("code-change", newCode);
  });

  // broadcast messages to other users
  socket.on("chat-message", (msg) => {
    socket.broadcast.emit("chat-message", msg);
  });
});

// Start the  process of starting the server
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});