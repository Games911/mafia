import { PlayerModel } from '../../../database/models/game/player-model';
import { RoundModel } from '../../../database/models/game/round-model';
import { GameModel } from '../../../database/models/game/game-model';
import { Player } from '../../../database/interfaces/game/player';
import { Status } from '../../../database/enums/status';
import { Roles } from '../../../database/enums/roles';
import { Round } from '../../../database/interfaces/game/round';


export const seedData = async () => {
    const player1: Player = await PlayerModel.create({
        number: 1,
        status: Status.ACTIVE,
        role: Roles.P,
        user: '121212122',
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

    await GameModel.create({
        name: 'Game 1',
        players: [],
        rounds: [round],
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });

    await GameModel.create({
        name: 'Game 2',
        players: [player1],
        rounds: [round],
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
}

export const removeData = async (): Promise<void> => {
    await PlayerModel.remove();
    await RoundModel.remove();
    await GameModel.remove();
}
