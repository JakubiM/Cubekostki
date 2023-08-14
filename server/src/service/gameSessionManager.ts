import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import { IGameSession } from "../model/gameSession";
import { Timestamp } from "firebase/firestore";
import DatabaseClient from "./databaseClient";
import { GameType } from "../model/GameType";

const GameSessionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.START_GAME, async (roomId: string) => {
      console.log(`Starting game for room ${roomId}...`);
      const players = await DatabaseClient.Players.getByRoomId(roomId);

      const gameScoresIds: string[] = await Promise.all(
        players.map((p) => DatabaseClient.GameScores.create(GameType.POKER))
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
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default GameSessionManager;
