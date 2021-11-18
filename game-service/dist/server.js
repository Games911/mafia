"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const roomId = '911';
const getUsers = (io) => {
    const rooms = io.of("/").adapter.rooms;
    return rooms.get(roomId);
};
const sleep = (m) => {
    return new Promise(r => setTimeout(r, m));
};
io.on("connection", (socket) => {
    socket.on("add-user", (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(roomId);
        const usersIds = getUsers(io);
        if (usersIds.size > 1) {
            for (let i = 1; i <= 3; i++) {
                const usersIds = getUsers(io);
                for (let user of usersIds) {
                    io.to(user).emit('game-process', { action: 'First', user: user, iterate: i });
                }
                yield sleep(9000);
            }
            for (let i = 1; i <= 3; i++) {
                const usersIds = getUsers(io);
                for (let user of usersIds) {
                    io.to(user).emit('game-process', { action: 'Second', user: user, iterate: i });
                }
                yield sleep(9000);
            }
        }
        else {
            for (let user of usersIds) {
                io.to(user).emit('user-event', { usersCount: usersIds.size });
            }
        }
    }));
});
httpServer.listen(8080);
//# sourceMappingURL=server.js.map