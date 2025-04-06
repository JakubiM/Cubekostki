import { PokerScore } from "../model/pokerScore";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { createEmptyHand, IDieState } from "../model/dieState";

const countReps = (diceValues: number[]): number[] => {
  const counts = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < diceValues.length; i++) {
    const value = diceValues[i];
    if (value >= 1 && value <= 6) {
      counts[value - 1]++;
    }
  }
  return counts;
};

export interface IGameContext {
  scoreData: {
    get: PokerScore;
    set: Dispatch<SetStateAction<PokerScore>>;
  };
  rolledDiceList: {
    get: IDieState[];
    set: Dispatch<SetStateAction<IDieState[]>>;
    valueReps: number[]; // [1,0,0,0,0,5] -> 1 x 'One', 5 x 'Six'
    valuesOnly: number[];
  };
  canScore: {
    get: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export default ({ children }: { children: React.ReactNode }) => {
  const [scoreData, setScoreData] = useState<PokerScore>(new PokerScore());
  const [rolledDiceList, setRolledDiceList] = useState<IDieState[]>(createEmptyHand());
  const [canScore, setCanScore] = useState<boolean>(false);

  const contextValue: IGameContext = {
    scoreData: {
      get: scoreData,
      set: setScoreData,
    },
    rolledDiceList: {
      get: rolledDiceList,
      valueReps: countReps(!!rolledDiceList ? rolledDiceList.map((dieState) => dieState.value) : []),
      valuesOnly: !!rolledDiceList ? rolledDiceList.map((dieState) => dieState.value) : [],
      set: setRolledDiceList,
    },
    canScore: {
      get: canScore,
      set: setCanScore,
    }
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
