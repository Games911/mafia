import { Schema, model } from 'mongoose';
import { Permission } from './permission';

export interface IRole extends Document {
    name: string;
    status: string;
    permissions: Permission[];
    created: Date;
    updated: Date;
}

const schema = new Schema<IRole>({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    created: { type: Date, required: false, default: Date.now },
    updated: { type: Date, required: false, default: Date.now }
}, {
    versionKey: false
});

export const Role = model<IRole>('Role', schema);

export const createRole = async (role: IRole) => {
    return await Role.create(role)
        .then((data: IRole) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
