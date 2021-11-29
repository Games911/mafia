"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoundById = exports.setSpeaker = void 0;
const round_model_1 = require("../../../database/models/game/round-model");
const setSpeaker = (round, number) => __awaiter(void 0, void 0, void 0, function* () {
    round.speaker = number;
    yield round.updateOne(round);
});
exports.setSpeaker = setSpeaker;
const getRoundById = (roundId) => __awaiter(void 0, void 0, void 0, function* () {
    const round = (yield round_model_1.RoundModel.find({ _id: roundId }).limit(1))[0];
    if (typeof round !== 'undefined') {
        return round;
    }
    throw new Error('Round doesn\'t exist');
});
exports.getRoundById = getRoundById;
//# sourceMappingURL=round-repository.js.map