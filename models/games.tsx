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
  owner: string[];
  playTime: number;
  complexity: number;
};
