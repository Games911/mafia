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
exports.getPlayerByUserId = void 0;
const player_model_1 = require("../../../database/models/game/player-model");
const getPlayerByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = (yield player_model_1.PlayerModel.find({ user: id }).limit(1));
    if (typeof player !== 'undefined') {
        return player;
    }
    throw new Error('Player doesn\'t exist');
});
exports.getPlayerByUserId = getPlayerByUserId;
//# sourceMappingURL=player-repository.js.map