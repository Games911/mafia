import * as types from "../../types/auth/userInfoType";

const initialState = {
    userId: '',
    userEmail: '',
    userNickname: '',
};

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_INFO_SET:
            return {
                ...state,
                userId: action.userId,
                userEmail: action.userEmail,
                userNickname: action.userNickname,
            }
        case types.USER_INFO_REMOVE:
            return {
                ...state,
                userEmail: '',
                userId: '',
                userNickname: '',
            }
        default:
            return state;
    }
};
