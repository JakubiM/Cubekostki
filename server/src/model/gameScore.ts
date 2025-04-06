import { Timestamp } from "firebase/firestore";
import { GameType } from "./GameType";
import { IPokerScore } from "../../../client/src/model/pokerScore";

export const UNDEFINED_SCORE: number = -666;

export interface IScoreColumn {
  col: number; //n columns for each score values
  scores: IPokerScore
}

export interface IGameScore {
  id?: string;
  game_type: GameType;
  scoreTable: IPokerScore;
  created_date: Timestamp;
  active: boolean;
}

export const buildEmptyScore = (game_type: GameType): IPokerScore => {
  switch (game_type) {
    case GameType.POKER:
      return {
        school: {
          ones: UNDEFINED_SCORE,
          deuces: UNDEFINED_SCORE,
          three: UNDEFINED_SCORE,
          four: UNDEFINED_SCORE,
          five: UNDEFINED_SCORE,
          six: UNDEFINED_SCORE,
          sum: UNDEFINED_SCORE,
          bonus: UNDEFINED_SCORE,
        },
        pair: UNDEFINED_SCORE,
        twoPairs: UNDEFINED_SCORE,
        threeOfKind: UNDEFINED_SCORE,
        fourOfKind: UNDEFINED_SCORE,
        fiveOfKind: UNDEFINED_SCORE,
        poker: UNDEFINED_SCORE,
        fullHouse: UNDEFINED_SCORE,
        fourPlusTwo: UNDEFINED_SCORE,
        threePlusThree: UNDEFINED_SCORE,
        threePairs: UNDEFINED_SCORE,
        smallStraight: UNDEFINED_SCORE,
        bigStraight: UNDEFINED_SCORE,
        chance: UNDEFINED_SCORE,
        nonZeroBonus: UNDEFINED_SCORE,
      }
  }
};
