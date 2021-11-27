import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { port, userCount }  from './config/settings';
import { connect } from './config/dbConnect';
import { Game } from './database/interfaces/game/game';
import {addUser, createGame, getGame, getGames} from './api/controllers/game/game-controller';
import { seedData, removeData } from './api/controllers/seed/seed-controller';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const getUsers = async (io, gameId) => {
    const rooms = io.of("/").adapter.rooms;
    return rooms.get(gameId);
};

const sender = async (eventName, io, gameId, data) => {
    const usersIds = await getUsers(io, gameId);
    for (let user of usersIds) {
        io.to(user).emit(eventName, data);
    }
};

const sleep = (m) => {
    return new Promise(r => setTimeout(r, m));
};

io.on("connection", (socket: Socket) => {
    socket.on("create-game", async (data) => {
        try {
            const game: Game = await createGame(data.name, data.user);
            socket.join(game._id);
            await sender('on-created-game', io, game._id, {game: game, status: 201});
            const games = await getGames();
            io.local.emit("on-get-games", {games: games, status: 200});
        } catch(error) {
            io.to(data.socket).emit('on-created-game', {error: error, status: 400});
        }
    });

    socket.on("add-user", async (data) => {
        try {
            const game: Game = await addUser(data.game, data.user);
            socket.join(data.game);
            const usersIds = await getUsers(io, data.game);
            if (usersIds.size === +userCount) {
                await sender('on-add-user', io, data.game, {game: game, status: 200});
            } else {
                await sender('on-add-user', io, data.game, {game: game, status: 200});
            }
            const games = await getGames();
            io.local.emit("on-get-games", {games: games, status: 200});
        } catch(error) {
            await sender('on-add-user', io, data.game, {error: error, status: 400});
        }
    });

    socket.on("get-games", async (data) => {
        try {
            const games = await getGames();
            io.local.emit("on-get-games", {games: games, status: 200});
        } catch(error) {
            io.local.emit("on-get-games", {error: error, status: 400});
        }
    });

    socket.on("game-initialize", async (data) => {
        try {
            const game = await getGame(data.game);
            io.local.emit("on-game-initialize", {game: game, status: 200});
        } catch(error) {
            io.local.emit("on-game-initialize", {error: error, status: 400});
        }
    });

    socket.on("seed-data", async (data) => {
        try {
            await removeData();
            await seedData();
            io.local.emit("on-seed-data", {status: 200});
        } catch(error) {
            io.local.emit("on-seed-data", {error: error, status: 400});
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



