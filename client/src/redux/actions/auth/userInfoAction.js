import * as typesUserInfo from "../../types/auth/userInfoType";
import jwt_decode from "jwt-decode";

export const setUserInfo = (token) =>async dispatch=>{
    if (token) {
        const decoded = jwt_decode(token);
        localStorage.setItem('userInfoId', decoded.id);
        localStorage.setItem('userInfoEmail', decoded.email);
        localStorage.setItem('userInfoNickname', decoded.nickname);
        dispatch({
            type: typesUserInfo.USER_INFO_SET,
            userId: decoded.id,
            userEmail: decoded.email,
            userNickname: decoded.nickname,
        });
    }
}

export const getUserData = () =>async dispatch=>{
    let id = localStorage.getItem('userInfoId');
    let email = localStorage.getItem('userInfoEmail');
    let nickname = localStorage.getItem('userInfoNickname');
    dispatch({
        type: typesUserInfo.USER_INFO_SET,
        userId: id,
        userEmail: email,
        userNickname: nickname,
    });
}

export const clearUserData = () =>async dispatch=>{
    localStorage.removeItem('userInfoId');
    localStorage.removeItem('userInfoEmail');
    localStorage.removeItem('userInfoNickname');
    dispatch({
        type: typesUserInfo.USER_INFO_REMOVE,
    });
}
