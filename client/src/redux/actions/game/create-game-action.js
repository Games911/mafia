import {errorsResult, isRequire, maxLength, minLength, startValidation} from "../../helpers/Validation";
import * as types from "../../types/game/create-game-type";
import * as gameTypes from "../../types/game/game-type";


export const nameValidate = (value) =>async dispatch=>{
    const field = 'name';

    startValidation(field);
    isRequire(value, field);
    minLength(value, field, 2);
    maxLength(value, field, 20);

    dispatch({
        type: types.CREATE_GAME_SET_NAME_ERROR,
        errors: errorsResult[field],
    });
    dispatch({
        type: types.CREATE_GAME_CHANGED_NAME_STATE,
        changed: true,
    });
};

export const createGame = (name, userId, token, socket, history) =>async dispatch=>{
    const socketId = localStorage.getItem('socketId');
    socket.emit('create-game', {token: token, name: name, user: userId, socket: socketId});
    socket.on("on-created-game", (response) => {
        console.log(response);
        switch (response.status) {
            case 201:
                const currentGame = response.game;
                localStorage.setItem('currentGame', currentGame);
                dispatch({
                    type: gameTypes.GAME_SET_CURRENT_GAME,
                    currentGame: currentGame,
                });
                history.push('/cabinet/game/' + currentGame._id);
                break;
            case 400:
                const errorMessage = (response.error.code === 11000) ? 'Duplicate error' : response.error;
                dispatch({
                    type: types.CREATE_GAME_API_ERROR,
                    message: errorMessage,
                });
                break;
        }
    });
}
