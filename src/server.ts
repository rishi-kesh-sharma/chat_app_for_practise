import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import express, { NextFunction, Request } from "express";
const app = express();
const server = createServer(app);

const io = new Server(server);
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./assets/index.html"));
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
});

server.listen(3000, () => {
  console.log(`Server is up and running at port ${3000}`);
});
