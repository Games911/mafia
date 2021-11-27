import { GameModel } from '../../../database/models/game/game-model';

export const getGameById = async (id)  => {
    const game = (await GameModel.find({ _id: id }).populate('players').populate('rounds').limit(1));
    if (typeof game !== 'undefined') {
        return game;
    }
    throw new Error('Game doesn\'t exist');
};

export const getGamesAll = async () => {
    return GameModel.find({}).populate('players').populate('rounds');
};
