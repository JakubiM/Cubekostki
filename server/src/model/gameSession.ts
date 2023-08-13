import { Timestamp } from "firebase/firestore";
import { IPlayer } from "./player";

export interface IGameSession {
  id?: string;
  created_date: Timestamp;
  ended: boolean;
  players: IPlayer[];
  players_turns: number[];
}
