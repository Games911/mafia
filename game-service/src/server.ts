import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { port }  from './config/settings';
import { connect } from './config/dbConnect';
import {Status} from './database/enums/status';
import {GameModel} from "./database/models/game/game-model";
import {Game} from "./database/interfaces/game/game";
import {Player} from "./database/interfaces/game/player";
import {PlayerModel} from "./database/models/game/player-model";
import {Roles} from "./database/enums/roles";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket: Socket) => {
    socket.on("create-game", async (data) => {
        try {
            const player: Player = await PlayerModel.create({
                number: 1,
                user: data.user,
                role: Roles.P,
                status: Status.ACTIVE,
                created: new Date(),
                updated: new Date(),
            });
            const game: Game = await GameModel.create({
                name: data.name,
                status: Status.ACTIVE,
                players: [player],
                created: new Date(),
                updated: new Date(),
            });
            socket.emit("on-created-game", {game: game, status: 201});
        } catch(error) {
            socket.emit("on-created-game", {error: error, status: 400});
        }
    });

    socket.on("get-rooms", async (data) => {

    });
});


httpServer.listen(port, () => {
    connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});



