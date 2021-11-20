import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth/authReducer";
import {tokenReducer} from "./reducers/auth/tokenReducer";
import {userInfoReducer} from "./reducers/auth/userInfoReducer";
import {createGameReducer} from "./reducers/game/create-game-reducer";


export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    userInfoReducer: userInfoReducer,
    createGameReducer: createGameReducer,
});
