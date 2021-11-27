import { PlayerModel } from '../../../database/models/game/player-model';

export const getPlayerByUserId = async (id)  => {
    const player = (await PlayerModel.find({ user: id }).limit(1));
    if (typeof player !== 'undefined') {
        return player;
    }
    throw new Error('Player doesn\'t exist');
};
