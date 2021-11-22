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
exports.getGames = exports.createGame = void 0;
const player_model_1 = require("../../../database/models/game/player-model");
const roles_1 = require("../../../database/enums/roles");
const status_1 = require("../../../database/enums/status");
const game_model_1 = require("../../../database/models/game/game-model");
const round_model_1 = require("../../../database/models/game/round-model");
const createGame = (name, user) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield player_model_1.PlayerModel.create({
        number: 1,
        user: user,
        role: roles_1.Roles.P,
        status: status_1.Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    const round = yield round_model_1.RoundModel.create({
        number: 1,
        speaker: 1,
        status: status_1.Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    return yield game_model_1.GameModel.create({
        name: name,
        status: status_1.Status.ACTIVE,
        players: [player],
        rounds: [round],
        created: new Date(),
        updated: new Date(),
    });
});
exports.createGame = createGame;
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    return game_model_1.GameModel.find({}).populate('players').populate('rounds');
});
exports.getGames = getGames;
//# sourceMappingURL=game-controller.js.map