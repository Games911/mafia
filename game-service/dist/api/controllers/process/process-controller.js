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
exports.getGames = exports.getGame = void 0;
const game_repository_1 = require("../../repositories/game/game-repository");
const getGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, game_repository_1.getGameById)(id))[0];
});
exports.getGame = getGame;
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, game_repository_1.getGamesAll)();
});
exports.getGames = getGames;
//# sourceMappingURL=process-controller.js.map