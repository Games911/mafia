import { GameModel } from '../../../database/models/game/game-model';
import { Game } from '../../../database/interfaces/game/game';

export const getGameById = async (id): Promise<Game>  => {
    const game: Game = (await GameModel.find({ _id: id }).populate('players').populate('rounds').limit(1));
    if (typeof game !== 'undefined') {
        return game;
    }
    throw new Error('Game doesn\'t exist');
};

export const getGamesAll = async () => {
    return GameModel.find({}).populate('players').populate('rounds');
};
