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
const status_1 = require("./database/enums/status");
const game_model_1 = require("./database/models/game/game-model");
const player_model_1 = require("./database/models/game/player-model");
const roles_1 = require("./database/enums/roles");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socket.on("create-game", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const player = yield player_model_1.PlayerModel.create({
                number: 1,
                user: data.user,
                role: roles_1.Roles.P,
                status: status_1.Status.ACTIVE,
                created: new Date(),
                updated: new Date(),
            });
            const game = yield game_model_1.GameModel.create({
                name: data.name,
                status: status_1.Status.ACTIVE,
                players: [player],
                created: new Date(),
                updated: new Date(),
            });
            socket.emit("on-created-game", { game: game, status: 201 });
        }
        catch (error) {
            socket.emit("on-created-game", { error: error, status: 400 });
        }
    }));
    socket.on("get-rooms", (data) => __awaiter(void 0, void 0, void 0, function* () {
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