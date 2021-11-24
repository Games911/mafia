import * as types from "../../types/game/game-type";

export const getGames = (socket, perPage) => async dispatch => {
    socket.emit('get-games');
    socket.on("on-get-games", (response) => {
        console.log(response.games);
        switch (response.status) {
            case 200:
                const games = response.games;
                dispatch({
                    type: types.GAME_SET_GAMES,
                    games: games,
                });
                dispatch({
                    type: types.GAME_SET_VISIBLE_GAMES,
                    visibleGames: games.slice(0, perPage),
                });
                dispatch({
                    type: types.GAME_SET_STEP,
                    step: perPage,
                });
                break;
            case 400:
                console.log(response.error);
                break;
        }
    });
}

export const addUser = (gameId, userId, socket) => async dispatch => {
    socket.emit('add-user', {game: gameId, user: userId});
    socket.on("on-add-user", (response) => {
        console.log(response);
        switch (response.status) {
            case 200:

                break;
            case 400:
                console.log(response.error);
                break;
        }
    });
}

export const seedDataAction = (socket) => async dispatch => {
    socket.emit('seed-data');
    socket.on("on-seed-data", (response) => {
        console.log(response.games);
        switch (response.status) {
            case 200:

                break;
            case 400:
                console.log(response.error);
                break;
        }
    });
};
