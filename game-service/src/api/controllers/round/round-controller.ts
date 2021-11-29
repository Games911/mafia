import { getGameById } from '../../repositories/game/game-repository';
import { getRoundById, setSpeaker } from '../../repositories/game/round-repository';


export const increaseSpeaker = async (gameId: string) => {
    const game = (await getGameById(gameId))[0];
    const currentRound = game.rounds[game.rounds.length - 1];
    const round = await getRoundById(currentRound._id);
    await setSpeaker(round, currentRound.speaker + 1);
    return await getGameById(gameId);
}

