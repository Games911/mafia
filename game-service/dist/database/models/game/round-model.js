"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    number: { type: Number, required: true, default: 1 },
    status: { type: String, required: true, max: 20 },
    speaker: { type: Number, required: true, default: 1 },
    created: { type: Date, required: false },
    updated: { type: Date, required: false }
}, {
    versionKey: false
});
exports.RoundModel = (0, mongoose_1.model)('Round', schema);
//# sourceMappingURL=round-model.js.map