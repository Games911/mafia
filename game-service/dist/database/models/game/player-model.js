"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    number: { type: Number, required: true, default: 1 },
    role: { type: String, max: 50, required: true },
    status: { type: String, required: true, max: 20 },
    user: { type: String, required: true },
    created: { type: Date, required: false },
    updated: { type: Date, required: false }
}, {
    versionKey: false
});
exports.PlayerModel = (0, mongoose_1.model)('Player', schema);
//# sourceMappingURL=player-model.js.map