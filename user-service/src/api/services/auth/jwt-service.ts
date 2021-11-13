import jwt from 'json-web-token';
import { User } from '../../../database/models/auth/user';
const { secret } = require('../../../config/settings');

export const createToken = async (user: User) => {
    const payload = {
        "id": user._id,
        "email": user.email,
        "nickname": user.nickname,
        "iat": Date.now(),
    };
    return jwt.encode(secret, payload, 'HS512',(err, token) => {
        if (err) {
            console.error(err.name, err.message);
        } else {
            return token;
        }
    });
};
