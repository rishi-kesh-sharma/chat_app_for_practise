"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.get("/", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, "./assets/index.html"));
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
