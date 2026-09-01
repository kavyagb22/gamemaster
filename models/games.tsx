/** @format */

export type GameType =
  | "cooperative"
  | "strategic"
  | "party"
  | "deduction"
  | "deckbuilder"
  | "filler"
  | "other";

export type NewGame = {
  name: string;
  minPlayers: number;
  maxPlayers: number;
  optimalPlayers?: number;
  type: GameType[];
  lastPlayed?: Date;
  personalRating?: number;
  groupRating?: number;
  comments?: string;
  owner: string;
  playTime: number;
  complexity: number;
};

export type GameInfo = {
  id: number;
  name: string;
  min_players: number;
  max_players: number;
  optimal_players?: number;
  gametype: GameType[];
  last_played?: Date;
  personal_rating?: number;
  group_rating?: number;
  comments?: string;
  owner_username: string;
  playtime: number;
  complexity: number;
  created_at: Date;
};
