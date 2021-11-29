import { RoundModel } from '../../../database/models/game/round-model';

export const setSpeaker = async (round, number) => {
    round.speaker = number;
    await round.updateOne(round);
};

export const getRoundById = async (roundId) => {
    const round = (await RoundModel.find({ _id: roundId }).limit(1))[0];
    if (typeof round !== 'undefined') {
        return round;
    }
    throw new Error('Round doesn\'t exist');
};
