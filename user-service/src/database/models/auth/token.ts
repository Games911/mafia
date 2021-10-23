import { Schema, model } from 'mongoose';

export interface IToken extends Document {
    hash: string;
    status: string;
    expired: Date;
}

const schema = new Schema<IToken>({
    _id: Schema.Types.ObjectId,
    hash: { type: String, required: true, max: 255},
    status: { type: String, required: true, max: 20 },
    expired: { type: Date, required: false },
}, {
    versionKey: false
});

export const Token = model<IToken>('Token', schema);

export const createToken = async (token: IToken) => {
    return await Token.create(token)
        .then((data: IToken) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
