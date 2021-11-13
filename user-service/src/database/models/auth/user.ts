import { Schema, model } from 'mongoose';
import { IRole } from './role';
import { IToken } from './token';

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
    email: { type: String, required: true, unique: true, max: 100},
    nickname: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    password: { type: String, required: true, max: 255 },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const User = model<IUser>('User', schema);
