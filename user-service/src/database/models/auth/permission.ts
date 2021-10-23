import { Schema, model } from 'mongoose';

export interface IPermission extends Document {
    name: string;
    status: string;
    created: Date;
    updated: Date;
}

const schema = new Schema<IPermission>({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    created: { type: Date, required: false, default: Date.now },
    updated: { type: Date, required: false, default: Date.now }
}, {
    versionKey: false
});

export const Permission = model<IPermission>('Permission', schema);

export const createPermission = async (permission: IPermission) => {
    return await Permission.create(permission)
        .then((data: IPermission) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
