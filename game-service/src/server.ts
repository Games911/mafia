import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const roomId = '911';

const getUsers = (io) => {
    const rooms = io.of("/").adapter.rooms;
    return rooms.get(roomId);
}

const sleep = (m) => {
    return new Promise(r => setTimeout(r, m));
}

io.on("connection", (socket: Socket) => {
    socket.on("add-user", async (data) => {
        socket.join(roomId);
        const usersIds = getUsers(io);

        if (usersIds.size > 1) {
            for (let i = 1; i <= 3; i++) {
                const usersIds = getUsers(io);
                for (let user of usersIds) {
                    io.to(user).emit('game-process', {action: 'First', user: user, iterate: i });
                }
                await sleep(9000);
            }
            for (let i = 1; i <= 3; i++) {
                const usersIds = getUsers(io);
                for (let user of usersIds) {
                    io.to(user).emit('game-process', {action: 'Second', user: user, iterate: i});
                }
                await sleep(9000);
            }
        } else {
            for (let user of usersIds) {
                io.to(user).emit('user-event', {usersCount: usersIds.size});
            }
        }
    });
});

httpServer.listen(8080);


