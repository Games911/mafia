import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { port }  from './config/settings';
import { connect } from './config/dbConnect';
import { Game } from './database/interfaces/game/game';
import { createGame, getGames } from './api/controllers/game/game-controller';
import { seedData, removeData } from './api/controllers/seed/seed-controller';

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
            const game: Game = await createGame(data.name, data.user);
            socket.emit("on-created-game", {game: game, status: 201});
        } catch(error) {
            socket.emit("on-created-game", {error: error, status: 400});
        }
    });

    socket.on("get-games", async (data) => {
        try {
            const games = await getGames();
            socket.emit("on-get-games", {games: games, status: 201});
        } catch(error) {
            socket.emit("on-get-games", {error: error, status: 400});
        }
    });

    socket.on("seed-data", async (data) => {
        try {
            await removeData();
            await seedData();
            socket.emit("on-seed-data", {status: 201});
        } catch(error) {
            socket.emit("on-seed-data", {error: error, status: 400});
        }
    });
});


httpServer.listen(port, () => {
    connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});



