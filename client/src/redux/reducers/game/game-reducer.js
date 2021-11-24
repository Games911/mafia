import * as types from "../../types/game/game-type";

const initialState = {
    games: [],
    visibleGames: [],
    step: 0,
    perPage: 10,
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_SET_GAMES:
            return {
                ...state,
                games: action.games,
            };
        case types.GAME_SET_VISIBLE_GAMES:
            return {
                ...state,
                visibleGames: action.visibleGames,
            };
        case types.GAME_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        default:
            return state;
    }
};
