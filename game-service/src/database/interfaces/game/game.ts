import { Player } from './player';
import { Round } from './round';

export interface Game {
    _id?:string,
    name: string;
    status: string;
    result: string;
    players: Player[];
    rounds: Round[];
    created: Date;
    updated: Date;
}
