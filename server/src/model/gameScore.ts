import { Timestamp } from "firebase/firestore";

export interface IGameScore {
  id: string;
  game_session_id: string;
  game_type: string;
  score: number[][]; // n columns for each score values
  created_date: Timestamp;
  active: boolean;
}
