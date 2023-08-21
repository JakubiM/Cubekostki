import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import DatabaseClient from "./databaseClient";
import { GameType } from "../model/GameType";

const DiceToPlayerMap = new Map<string, number[]>(); //account_id => key
const createEmptyDiceSet = (): number[] => [0, 0, 0, 0, 0, 0];
const isEmptyDiceSet = (dice: number[]): boolean => dice.some((die) => die === 0);

const GameSessionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.START_GAME, async (roomId: string) => {
      console.log(`Starting game for room ${roomId}...`);
      const players = await DatabaseClient.Players.getByRoomId(roomId);

      const gameScoresIds: string[] = await Promise.all(
        players.map((p) => {
          DiceToPlayerMap.set(p.account_id, createEmptyDiceSet());
          return DatabaseClient.GameScores.create(GameType.POKER);
        })
      );

      const updatedPlayers = await Promise.all(
        gameScoresIds.map((gameScoreId, index) => {
          const updatedPlayer = players.at(index);
          if (updatedPlayer && updatedPlayer.id) {
            updatedPlayer.current_score_id = gameScoreId;
            return DatabaseClient.Players.update(updatedPlayer, updatedPlayer.id);
          }
          console.log("[GameSessionManager] couldn't assign gameScore id to player at " + index);
          return players[0];
        })
      );
      DatabaseClient.GameSessions.create(updatedPlayers);
    });

    socket.on(MESSAGE.THROW, (account_id: string, diceToReroll: boolean[]) => {
      const playerDice = DiceToPlayerMap.get(account_id);
      if (!playerDice) {
        console.warn(`Couldn't find player dice by acc_id: ${account_id}`);
        return;
      }
      if (isEmptyDiceSet(playerDice)) {
      }
    });
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default GameSessionManager;
