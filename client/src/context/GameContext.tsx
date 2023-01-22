import { PokerScore } from "../model/pokerScore";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IDieState } from "../model/dieState";

export interface IGameContext {
  scoreData: {
    get: PokerScore;
    set: Dispatch<SetStateAction<PokerScore>>;
  };
  rolledDiceList: {
    get: IDieState[];
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
      valuesOnly: rolledDiceList.map((dieState) => dieState.value),
      set: setRolledDiceList,
    },
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
