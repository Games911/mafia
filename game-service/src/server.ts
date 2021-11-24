import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { port, userCount }  from './config/settings';
import { connect } from './config/dbConnect';
import { Game } from './database/interfaces/game/game';
import { addUser, createGame, getGames } from './api/controllers/game/game-controller';
import { seedData, removeData } from './api/controllers/seed/seed-controller';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const getUsers = (io, gameId) => {
    const rooms = io.of("/").adapter.rooms;
    return rooms.get(gameId);
}

const sleep = (m) => {
    return new Promise(r => setTimeout(r, m));
}

io.on("connection", (socket: Socket) => {
    socket.on("create-game", async (data) => {
        try {
            const game: Game = await createGame(data.name, data.user);
            socket.join(game._id);
            const usersIds = getUsers(io, data.game);
            for (let user of usersIds) {
                io.to(user).emit('on-created-game', {game: game, status: 201});
            }
        } catch(error) {
            const usersIds = getUsers(io, data.game);
            for (let user of usersIds) {
                io.to(user).emit('on-created-game', {error: error, status: 400});
            }
        }
    });

    socket.on("add-user", async (data) => {
        try {
            const game: Game = await addUser(data.game, data.user);
            socket.join(data.game);
            const usersIds = getUsers(io, data.game);
            if (usersIds.size === +userCount) {
                for (let user of usersIds) {
                    io.to(user).emit('on-add-user', {game: game, status: 200});
                }
            } else {
                for (let user of usersIds) {
                    io.to(user).emit('on-add-user', {message: 'User count - ' + usersIds.size, status: 200});
                }
            }
        } catch(error) {
            const usersIds = getUsers(io, data.game);
            for (let user of usersIds) {
                io.to(user).emit('on-add-user', {error: error, status: 400});
            }
        }
    });

    socket.on("get-games", async (data) => {
        try {
            const games = await getGames();
            socket.emit("on-get-games", {games: games, status: 200});
        } catch(error) {
            socket.emit("on-get-games", {error: error, status: 400});
        }
    });

    socket.on("seed-data", async (data) => {
        try {
            await removeData();
            await seedData();
            socket.emit("on-seed-data", {status: 200});
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



