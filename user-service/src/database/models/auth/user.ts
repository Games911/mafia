import { Schema, model } from 'mongoose';
import { IRole, Role } from 'role';
import { IToken } from 'token';

export interface IUser extends Document {
    email: string;
    nickname: string;
    status: string;
    password: string;
    role: Schema.Types.ObjectId | IRole;
    token: Schema.Types.ObjectId | IToken;
    created: Date;
    updated: Date;
}

const schema = new Schema<IUser>({
    _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, max: 100},
    nickname: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    password: { type: String, required: true, max: 255 },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    created: { type: Date, required: false, default: Date.now },
    updated: { type: Date, required: false, default: Date.now }
}, {
    versionKey: false
});

export const User = model<IUser>('User', schema);

export const createUser = async (user: IUser) => {
    return await User.create(user)
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
