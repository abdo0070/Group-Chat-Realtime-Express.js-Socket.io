const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const router = require("./routes/api");
const io = new Server(server);
const users = new Set();

function start() {
  app.use([express.static("public"), router]);
  server.listen(9000, () => {
    console.log("server is listening");
  });
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    users.add(socket.id);
    io.emit("user count", users.size);
    socket.on("message", (data) => {
      io.emit("chat message", data);
    });
    socket.on("disconnect", () => {
      users.delete(socket.id);
      io.emit("user count", users.size);
    });
  });
}

start();
