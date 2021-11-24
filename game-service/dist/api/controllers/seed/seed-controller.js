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
exports.removeData = exports.seedData = void 0;
const player_model_1 = require("../../../database/models/game/player-model");
const round_model_1 = require("../../../database/models/game/round-model");
const game_model_1 = require("../../../database/models/game/game-model");
const status_1 = require("../../../database/enums/status");
const roles_1 = require("../../../database/enums/roles");
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const player1 = yield player_model_1.PlayerModel.create({
        number: 1,
        status: status_1.Status.ACTIVE,
        role: roles_1.Roles.P,
        user: '121212122',
        created: new Date(),
        updated: new Date(),
    });
    const player2 = yield player_model_1.PlayerModel.create({
        number: 2,
        status: status_1.Status.ACTIVE,
        role: roles_1.Roles.P,
        user: '1223344444',
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
    yield game_model_1.GameModel.create({
        name: 'Game 1',
        players: [],
        rounds: [round],
        status: status_1.Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    yield game_model_1.GameModel.create({
        name: 'Game 2',
        players: [player2],
        rounds: [round],
        status: status_1.Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
});
exports.seedData = seedData;
const removeData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield player_model_1.PlayerModel.remove();
    yield round_model_1.RoundModel.remove();
    yield game_model_1.GameModel.remove();
});
exports.removeData = removeData;
//# sourceMappingURL=seed-controller.js.map