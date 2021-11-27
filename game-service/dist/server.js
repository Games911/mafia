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
const settings_1 = require("./config/settings");
const dbConnect_1 = require("./config/dbConnect");
const game_controller_1 = require("./api/controllers/game/game-controller");
const seed_controller_1 = require("./api/controllers/seed/seed-controller");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const getUsers = (io, gameId) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = io.of("/").adapter.rooms;
    return rooms.get(gameId);
});
const sender = (eventName, io, gameId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const usersIds = yield getUsers(io, gameId);
    for (let user of usersIds) {
        io.to(user).emit(eventName, data);
    }
});
const sleep = (m) => {
    return new Promise(r => setTimeout(r, m));
};
io.on("connection", (socket) => {
    socket.on("create-game", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const game = yield (0, game_controller_1.createGame)(data.name, data.user);
            socket.join(game._id);
            yield sender('on-created-game', io, game._id, { game: game, status: 201 });
            const games = yield (0, game_controller_1.getGames)();
            io.local.emit("on-get-games", { games: games, status: 200 });
        }
        catch (error) {
            io.to(data.socket).emit('on-created-game', { error: error, status: 400 });
        }
    }));
    socket.on("add-user", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const game = yield (0, game_controller_1.addUser)(data.game, data.user);
            socket.join(data.game);
            const usersIds = yield getUsers(io, data.game);
            if (usersIds.size === +settings_1.userCount) {
                yield sender('on-add-user', io, data.game, { game: game, status: 200 });
            }
            else {
                yield sender('on-add-user', io, data.game, { game: game, status: 200 });
            }
            const games = yield (0, game_controller_1.getGames)();
            io.local.emit("on-get-games", { games: games, status: 200 });
        }
        catch (error) {
            yield sender('on-add-user', io, data.game, { error: error, status: 400 });
        }
    }));
    socket.on("get-games", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const games = yield (0, game_controller_1.getGames)();
            io.local.emit("on-get-games", { games: games, status: 200 });
        }
        catch (error) {
            io.local.emit("on-get-games", { error: error, status: 400 });
        }
    }));
    socket.on("seed-data", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, seed_controller_1.removeData)();
            yield (0, seed_controller_1.seedData)();
            io.local.emit("on-seed-data", { status: 200 });
        }
        catch (error) {
            io.local.emit("on-seed-data", { error: error, status: 400 });
        }
    }));
});
httpServer.listen(settings_1.port, () => {
    (0, dbConnect_1.connect)()
        .then(() => {
        console.log("MongoDb connected");
    })
        .catch(err => console.log(err));
});
//# sourceMappingURL=server.js.map