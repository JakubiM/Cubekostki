import { Timestamp } from "firebase/firestore";
import { GameType } from "./GameType";

export const UNDEFINED_SCORE: number = -666;

export interface IScoreColumn {
  col: number; //n columns for each score values
  scores: number[]
}

export interface IGameScore {
  id?: string;
  game_type: GameType;
  scoreTable: IScoreColumn[];
  created_date: Timestamp;
  active: boolean;
}

export const buildEmptyScore = (game_type: GameType): IScoreColumn[] => {
  switch (game_type) {
    case GameType.POKER:
      return [{
        col: 0,
        scores: [
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
        ]
      }]
  }
};
