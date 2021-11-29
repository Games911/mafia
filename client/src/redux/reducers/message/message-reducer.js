import * as types from "../../types/message/message-type";

const initialState = {
    message: ''
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MESSAGE_SET:
            return {
                ...state,
                message: action.message,
            };
        default:
            return state;
    }
};
