import { Schema, model } from 'mongoose';
import { Round } from '../../interfaces/game/round';

const schema = new Schema<Round>({
    number: {type: Number, required: true, default: 1},
    status: { type: String, required: true, max: 20 },
    speaker: {type: Number, required: true, default: 1},
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const RoundModel = model<Round>('Round', schema);
