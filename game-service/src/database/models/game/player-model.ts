import { Schema, model } from 'mongoose';
import { Player } from '../../interfaces/game/player';

const schema = new Schema<Player>({
    number: {type: Number, required: true, default: 1},
    role: {type: String, max: 50, required: true},
    status: { type: String, required: true, max: 20 },
    user: { type: String, required: true },
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const PlayerModel = model<Player>('Player', schema);
