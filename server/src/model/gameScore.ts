import { Timestamp } from "firebase/firestore";
import { GameType } from "./GameType";

export const UNDEFINED_SCORE: number = -666;

export interface IGameScore {
  id?: string;
  game_type: GameType;
  score: number[][]; // n columns for each score values
  created_date: Timestamp;
  active: boolean;
}

export const buildEmptyScore = (game_type: GameType): number[][] => {
  switch (game_type) {
    case GameType.POKER:
      return [
        [
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          0,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          UNDEFINED_SCORE,
          0,
        ],
      ];
  }
};
