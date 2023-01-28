import { PokerScore } from "../model/pokerScore";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IDieState } from "../model/dieState";

const countReps = (diceValues: number[]): number[] => {
  let counts = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < diceValues.length; i++) {
    let value = diceValues[i];
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
    valueReps: number[]; // [1,0,0,0,0,5] -> 1 x 'One', 5 x 'Six'
    valuesOnly: number[];
    set: Dispatch<SetStateAction<IDieState[]>>;
  };
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export default ({ children }: { children: React.ReactNode }) => {
  const [scoreData, setScoreData] = useState<PokerScore>(new PokerScore());
  const [rolledDiceList, setRolledDiceList] = useState<IDieState[]>([
    {
      value: 1,
      selected: false,
    },
    {
      value: 2,
      selected: false,
    },
    {
      value: 3,
      selected: false,
    },
    {
      value: 4,
      selected: false,
    },
    {
      value: 5,
      selected: false,
    },
    {
      value: 6,
      selected: false,
    },
  ]);

  const contextValue: IGameContext = {
    scoreData: {
      get: scoreData,
      set: setScoreData,
    },
    rolledDiceList: {
      get: rolledDiceList,
      valueReps: countReps(rolledDiceList.map((dieState) => dieState.value)),
      valuesOnly: rolledDiceList.map((dieState) => dieState.value),
      set: setRolledDiceList,
    },
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
