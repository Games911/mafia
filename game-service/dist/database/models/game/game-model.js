"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, max: 100 },
    status: { type: String, required: true, max: 20 },
    result: { type: String, max: 100 },
    players: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Player' }],
    rounds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Round' }],
    created: { type: Date, required: false },
    updated: { type: Date, required: false }
}, {
    versionKey: false
});
exports.GameModel = (0, mongoose_1.model)('Game', schema);
//# sourceMappingURL=game-model.js.map