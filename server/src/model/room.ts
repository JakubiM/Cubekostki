import { PokerScore } from './../../../client/src/model/pokerScore';
import { Player } from "./player";

export type Room = {
  id: string;
  players: {playerId: string, score: PokerScore}[];
};
