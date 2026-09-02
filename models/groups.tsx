import { GameInfo, GameType } from "./games";
import { User } from "./user";

export type GroupInfo = {
    id: number;
    name: string;
    host: string;
    desc?: string;
    members: User[];
    invite_code: string;
    preferred_location?: string;
    schedule?: string;
    gametype: GameType[];
    library: GameInfo[];
    created_at: Date;
    last_played: Date;
}

export type CreateGroup = {
    name: string;
    desc?: string;
    invite_code: string;
    preferred_location?: string;
    schedule?: string;
    gametype: GameType[];
    last_played?: Date

}