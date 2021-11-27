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

export const addUser = (gameId, userId, socket, history) => async dispatch => {
    socket.emit('add-user', {game: gameId, user: userId});
    socket.on("on-add-user", (response) => {
        const currentGame = response.game;
        switch (response.status) {
            case 200:
                localStorage.setItem('currentGame', currentGame);
                dispatch({
                    type: types.GAME_SET_CURRENT_GAME,
                    currentGame: currentGame,
                });
                history.push('/cabinet/game/' + currentGame._id);
                break;
            case 400:
                console.log(response.error);
                break;
        }
    });
}

export const gameInitialize = (socket, id, countUser) => async dispatch => {
    socket.emit('game-initialize', {game: id});
    socket.on("on-game-initialize", (response) => {
        const currentGame = response.game;
        const count = 3;
        if (currentGame.players.length === count) {
            console.log('Start');
        } else {
            const startPos = currentGame.players.length + 1;
            for (let i = startPos; i < count + 1; i++) {
                currentGame.players.push({number: i});
            }
        }
        console.log(currentGame);
        switch (response.status) {
            case 200:
                dispatch({
                    type: types.GAME_SET_CURRENT_GAME,
                    currentGame: currentGame,
                });
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
