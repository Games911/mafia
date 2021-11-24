import {errorsResult, isRequire, maxLength, minLength, startValidation} from "../../helpers/Validation";
import * as types from "../../types/game/create-game-type";


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

export const createGame = (name, userId, token, socket) =>async dispatch=>{
    socket.emit('create-game', {token: token, name: name, user: userId});
    socket.on("on-created-game", (response) => {
        console.log(response);
        switch (response.status) {
            case 201:
                const gameId = response.game._id;
                localStorage.setItem('currentGameId', gameId);
                dispatch({
                    type: types.CREATE_GAME_SET_ID,
                    gameId: gameId,
                });
                break;
            case 400:
                dispatch({
                    type: types.CREATE_GAME_API_ERROR,
                    message: response.error,
                });
                break;
        }
    });
}
