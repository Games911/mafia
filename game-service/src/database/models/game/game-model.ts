import { Schema, model } from 'mongoose';
import { Game } from '../../interfaces/game/game';

const schema = new Schema<Game>({
    name: { type: String, required: true, unique: true, max: 100},
    status: { type: String, required: true, max: 20 },
    result: { type: String, max: 100},
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const GameModel = model<Game>('Game', schema);


