import { Player } from '../../../database/interfaces/game/player';
import { PlayerModel } from '../../../database/models/game/player-model';
import { Roles } from '../../../database/enums/roles';
import { Status } from '../../../database/enums/status';
import { Game } from '../../../database/interfaces/game/game';
import { GameModel } from '../../../database/models/game/game-model';
import { Round } from '../../../database/interfaces/game/round';
import { RoundModel } from '../../../database/models/game/round-model';


export const createGame = async (name: string, user: string): Promise<Game> => {
    const player: Player = await PlayerModel.create({
        number: 1,
        user: user,
        role: Roles.P,
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    const round: Round = await RoundModel.create({
        number: 1,
        speaker: 1,
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    return await GameModel.create({
        name: name,
        status: Status.ACTIVE,
        players: [player],
        rounds: [round],
        created: new Date(),
        updated: new Date(),
    });
};

export const addUser = async (gameId: string, userId: string): Promise<Game> => {
    const game = (await GameModel.find({ _id: gameId }).limit(1))[0];
    const playerUser = (await PlayerModel.find({ user: userId }).limit(1));

    if (playerUser.length) {
        const isPlayerInGame = game.players.filter(element => String(element._id) === String(playerUser[0]._id));
        if (isPlayerInGame.length > 0) {
            return game;
        }
    } else {
        const player: Player = await PlayerModel.create({
            number: 1,
            user: userId,
            role: Roles.P,
            status: Status.ACTIVE,
            created: new Date(),
            updated: new Date(),
        });
        game.players.push(player);
        await game.updateOne(game);
    }
    return game;
}

export const getGames = async () => {
    return GameModel.find({}).populate('players').populate('rounds');
}
