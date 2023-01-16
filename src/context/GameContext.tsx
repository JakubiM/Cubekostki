import { PokerScore } from "../model/pokerScore";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IGameContext {
  scoreData: {
    get: PokerScore;
    set: Dispatch<SetStateAction<PokerScore>>;
  };
  currentRolledValue: {
    get: number;
    set: Dispatch<SetStateAction<number>>;
  };
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export default ({ children }: { children: React.ReactNode }) => {
  const [scoreData, setScoreData] = useState<PokerScore>(new PokerScore());
  const [currentRolledValue, setCurrentRolledValue] = useState<number>(1);

  const contextValue: IGameContext = {
    scoreData: {
      get: scoreData,
      set: setScoreData,
    },
    currentRolledValue: {
      get: currentRolledValue,
      set: setCurrentRolledValue,
    },
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
