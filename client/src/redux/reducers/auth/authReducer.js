import * as types from "../../types/auth/authType";

const initialState = {
    email: '',
    nickname: '',
    password: '',
    apiSuccessMessage: '',
    apiErrorMessage: '',
    errorsEmail: [],
    errorsNickname: [],
    errorsPassword: [],
    changedNickname: false,
    changedPassword: false,
    changedEmail: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case types.AUTH_CHANGE_NICKNAME:
            return {
                ...state,
                nickname: action.nickname
            };
        case types.AUTH_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case types.AUTH_SET_EMAIL_ERROR:
            return {
                ...state,
                errorsEmail: action.errors
            };
        case types.AUTH_SET_NICKNAME_ERROR:
            return {
                ...state,
                errorsNickname: action.errors
            };
        case types.AUTH_SET_PASSWORD_ERROR:
            return {
                ...state,
                errorsPassword: action.errors
            };
        case types.AUTH_CHANGED_EMAIL_STATE:
            return {
                ...state,
                changedEmail: action.changed
            };
        case types.AUTH_CHANGED_NICKNAME_STATE:
            return {
                ...state,
                changedNickname: action.changed
            };
        case types.AUTH_CHANGED_PASSWORD_STATE:
            return {
                ...state,
                changedPassword: action.changed
            };
        case types.AUTH_API_SUCCESS:
            return {
                ...state,
                apiSuccessMessage: action.message
            };
        case types.AUTH_API_ERROR:
            return {
                ...state,
                apiErrorMessage: action.message
            };
        case types.AUTH_RESET_FORM:
            return {
                ...state,
                email: '',
                nickname: '',
                password: '',
                errorsEmail: [],
                errorsNickname: [],
                errorsPassword: [],
                changedEmail: false,
                changedNickname: false,
                changedPassword: false,
                apiSuccessMessage: '',
                apiErrorMessage: '',
            };
        default:
            return state;
    }
};
