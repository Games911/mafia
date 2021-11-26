import { Player } from '../../../database/interfaces/game/player';
import { PlayerModel } from '../../../database/models/game/player-model';

export const getPlayerByUserId = async (id): Promise<Player>  => {
    const player: Player = (await PlayerModel.find({ user: id }).limit(1));
    if (typeof player !== 'undefined') {
        return player;
    }
    throw new Error('Player doesn\'t exist');
};
