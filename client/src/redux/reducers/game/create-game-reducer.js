import * as types from "../../types/game/create-game-type";

const initialState = {
    gameId: null,
    name: '',
    errorsName: [],
    changedName: false,
    apiErrorMessage: '',
};

export const createGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_GAME_SET_ID:
            return {
                ...state,
                gameId: action.gameId
            };
        case types.CREATE_GAME_CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
        case types.CREATE_GAME_SET_NAME_ERROR:
            return {
                ...state,
                errorsName: action.errors
            };
        case types.CREATE_GAME_CHANGED_NAME_STATE:
            return {
                ...state,
                changedName: action.changed
            };
        case types.CREATE_GAME_API_ERROR:
            return {
                ...state,
                apiErrorMessage: action.message
            };
        case types.CREATE_GAME_RESET_FORM:
            return {
                ...state,
                name: '',
                errorsName: [],
                changedName: false,
                apiErrorMessage: '',
            };
        default:
            return state;
    }
};
