import { Schema, model } from 'mongoose';

export interface IPermission extends Document {
    name: string;
    status: string;
    created: Date;
    updated: Date;
}

const schema = new Schema<IPermission>({
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const Permission = model<IPermission>('Permission', schema);
