import { Server } from 'socket.io';
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    if (userId) {
        socket.join(userId);
    }
    socket.on("typing", (data) => {
        console.log(`User ${userId} is typing in chat ${data.chatId}`);
        socket.to(data.chatId).emit("typing", { userId, chatId: data.chatId });
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        if (userId) {
            delete userSocketMap[userId];
            console.log(`User ${userId} disconnected and removed from map`);
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
    socket.on("connect_error", (error) => {
        console.error("Socket Connection error:", error);
    });
});
export { app, server, io };
//# sourceMappingURL=socket.js.map