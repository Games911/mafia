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
exports.getGamesAll = exports.getGameById = void 0;
const game_model_1 = require("../../../database/models/game/game-model");
const getGameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const game = (yield game_model_1.GameModel.find({ _id: id }).populate('players').populate('rounds').limit(1));
    if (typeof game !== 'undefined') {
        return game;
    }
    throw new Error('Game doesn\'t exist');
});
exports.getGameById = getGameById;
const getGamesAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return game_model_1.GameModel.find({}).populate('players').populate('rounds');
});
exports.getGamesAll = getGamesAll;
//# sourceMappingURL=game-repository.js.map