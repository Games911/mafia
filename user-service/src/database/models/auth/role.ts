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
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20},
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const Role = model<IRole>('Role', schema);
