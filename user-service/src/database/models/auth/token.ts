import { Schema, model } from 'mongoose';

export interface IToken extends Document {
    hash: string;
    status: string;
    expired: Date;
}

const schema = new Schema<IToken>({
    hash: { type: String, required: true, max: 255},
    status: { type: String, required: true, max: 20 },
    expired: { type: Date, required: false },
}, {
    versionKey: false
});

export const Token = model<IToken>('Token', schema);

export const removeTokenEntry = async (id: string) => {
    await Token.findByIdAndRemove(id);
}
