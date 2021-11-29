import React from 'react';
import { Alert } from 'bootstrap-4-react';
import { useDispatch, useSelector } from 'react-redux';
import * as messageTypes from '../../../../redux/types/message/message-type';

const Message = () => {
    const dispatch = useDispatch();
    const { message } = useSelector(state => state.messageReducer);

    const displayMessage = () => {
        const messageSection = message !== '' ? <Alert primary> {message}</Alert> : '';
        /*setTimeout(function () {
            dispatch({
                type: messageTypes.MESSAGE_SET,
                message: '',
            });
        }, 4000);*/
        return messageSection;
    }

    return (
        <div>
            {displayMessage()}
        </div>
    )
}

export default Message;
