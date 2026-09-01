import { GameInfo } from "./games";

export type GameResponse = {
    owner: string;
    games: GameInfo[]
}