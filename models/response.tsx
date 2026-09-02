import { GameInfo } from "./games";
import { GroupInfo } from "./groups";

export type GameResponse = {
    owner: string;
    games: GameInfo[]
}

export type GroupsResponse = {
    groups: GroupInfo[]
}