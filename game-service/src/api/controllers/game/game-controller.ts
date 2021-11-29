import { Player } from '../../../database/interfaces/game/player';
import { PlayerModel } from '../../../database/models/game/player-model';
import { Roles } from '../../../database/enums/roles';
import { Status } from '../../../database/enums/status';
import { Game } from '../../../database/interfaces/game/game';
import { GameModel } from '../../../database/models/game/game-model';
import { Round } from '../../../database/interfaces/game/round';
import { RoundModel } from '../../../database/models/game/round-model';
import { getGameById, getGamesAll } from '../../repositories/game/game-repository';
import { getPlayerByUserId } from '../../repositories/game/player-repository';


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
    const game = (await getGameById(gameId))[0];
    const playerUser: Player = (await getPlayerByUserId(userId))[0];

    if (typeof playerUser !== 'undefined') {
        const isPlayerInGame = game.players.filter(element => String(element._id) === String(playerUser._id));
        if (isPlayerInGame.length > 0) {
            return game;
        }
    } else {
        const player: Player = await PlayerModel.create({
            number: game.players.length + 1,
            user: userId,
            role: Roles.P,
            status: Status.ACTIVE,
            created: new Date(),
            updated: new Date(),
        });
        game.players.push(player);

        if (game.players.length === 2) {
            game.status = Status.BUSY;
        }

        await game.updateOne(game);
    }
    return game;
}

export const getGame = async (id: string) => {
    return (await getGameById(id))[0];
}


export const getGames = async () => {
    return await getGamesAll();
}
