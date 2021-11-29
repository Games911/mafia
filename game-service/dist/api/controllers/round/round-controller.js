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
exports.increaseSpeaker = void 0;
const game_repository_1 = require("../../repositories/game/game-repository");
const round_repository_1 = require("../../repositories/game/round-repository");
const increaseSpeaker = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    const game = (yield (0, game_repository_1.getGameById)(gameId))[0];
    const currentRound = game.rounds[game.rounds.length - 1];
    const round = yield (0, round_repository_1.getRoundById)(currentRound._id);
    yield (0, round_repository_1.setSpeaker)(round, currentRound.speaker + 1);
    return yield (0, game_repository_1.getGameById)(gameId);
});
exports.increaseSpeaker = increaseSpeaker;
//# sourceMappingURL=round-controller.js.map