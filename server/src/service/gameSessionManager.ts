import { createEmptyHand, IDieState } from './../../../client/src/model/dieState';
import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import DatabaseClient from "./databaseClient";
import { GameType } from "../model/GameType";
import { IPlayer } from "../model/player";
import { IPokerScore } from '../../../client/src/model/pokerScore';

const DiceToPlayerMap = new Map<string, IDieState[]>(); //currentSocketId => key
const isEmptyDiceSet = (dice: IDieState[]): boolean => dice.every((die) => die.value === 0);

const playersAreReady = (players: IPlayer[]): boolean => {
  return players.every((player) => player.ready == true);
}

const makePlayerReady = async (socket: Socket): Promise<void> => {
  const player = await DatabaseClient.Players.getBySocketId(socket.id);
  if (!player || !player.id) {
    console.warn(`Player not found by socket_id:${socket.id}!`);
    return;
  }
  player.ready = true;
  await DatabaseClient.Players.update(player, player.id);
  const roomDto = await DatabaseClient.Rooms.getByIdForClient(player.current_room_id);
  socket.broadcast.emit(MESSAGE.UPDATE_ROOM, roomDto);
  socket.emit(MESSAGE.UPDATE_ROOM, roomDto);
}

const getNextPlayer = async (gameSessionId: string) => {
  const gameSession = await DatabaseClient.GameSessions.getById(gameSessionId);
  const nextPlayerId = gameSession.players_turns.shift();
  if (nextPlayerId) {
    gameSession.players_turns.push(nextPlayerId);
    await DatabaseClient.GameSessions.update(gameSession, gameSessionId);
  } else {
    throw new Error(`Player ${nextPlayerId} not found`);
  }
  console.log("Next player: " + nextPlayerId);
  return nextPlayerId;
}

const GameSessionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.READY, async (roomId: string) => {

      await makePlayerReady(socket);

      const players = await DatabaseClient.Players.getByRoomId(roomId);

      if (!playersAreReady(players)) {
        console.log("Not all players are ready. Ignoring READY message.");
        return;
      }

      const gameScoresIds: string[] = await Promise.all(
        players.map((p) => {
          DiceToPlayerMap.set(p.current_socket_id, createEmptyHand());
          return DatabaseClient.GameScores.create(GameType.POKER);
        })
      );
      console.log(JSON.stringify(players));

      console.log("gameScoresIds: " + JSON.stringify(gameScoresIds));

      const updatedPlayers = await Promise.all(
        gameScoresIds.map((gameScoreId, index) => {
          const updatedPlayer = players.at(index);
          if (updatedPlayer && updatedPlayer.id) {
            updatedPlayer.current_score_id = gameScoreId;
            updatedPlayer.ready = false;
            return DatabaseClient.Players.update(updatedPlayer, updatedPlayer.id);
          }
          console.log("[GameSessionManager] couldn't assign gameScore id to player at " + index);
          return players[0];
        })
      );
      console.log("updatedPlayers" + JSON.stringify(updatedPlayers));

      const gameSessionId = await DatabaseClient.GameSessions.create(updatedPlayers);
      const room = await DatabaseClient.Rooms.getById(roomId);
      room.game_session_id = gameSessionId;
      await DatabaseClient.Rooms.update(room, roomId);

      const nextPlayerId = await getNextPlayer(gameSessionId);
      const nextPlayer = await DatabaseClient.Players.getBySocketId(nextPlayerId);


      socket.broadcast.emit(MESSAGE.START_GAME);
      socket.emit(MESSAGE.START_GAME);

      socket.emit(MESSAGE.CURRENT_PLAYER, nextPlayer);
      socket.broadcast.emit(MESSAGE.CURRENT_PLAYER, nextPlayer);
    });

    //DICE HANDLING
    socket.on(MESSAGE.THROW, (playerDice: IDieState[]) => {
      console.log(playerDice);

      const updatedDice = playerDice.map((dieState) =>
        !dieState.selected
          ? {
            selected: false,
            value: Math.floor(Math.random() * 6) + 1,
          }
          : dieState
      );
      DiceToPlayerMap.set(socket.id, updatedDice);
      console.log(updatedDice);
      socket.emit(MESSAGE.UPDATE_HAND, updatedDice);
    });

    socket.on(MESSAGE.UPDATE_SCORE, async (score: IPokerScore) => {
      const player = await DatabaseClient.Players.getBySocketId(socket.id);
      if (!player || !player.id) {
        console.warn(`Player not found by socket_id:${socket.id}!`);
        return;
      }
      const gameScore = await DatabaseClient.GameScores.getById(player.current_score_id);
      console.log("Current score: " + JSON.stringify(gameScore));
      if (!gameScore || !gameScore.id) {
        console.warn(`GameScore not found by id:${player.current_score_id}!`);
        return;
      }
      gameScore.scoreTable = score;
      const updatedScore = await DatabaseClient.GameScores.update(gameScore, gameScore.id);
      console.log("Updated score: " + updatedScore);
      const room = await DatabaseClient.Rooms.getById(player.current_room_id);
      const nextPlayerId = await getNextPlayer(room.game_session_id);
      const nextPlayer = await DatabaseClient.Players.getBySocketId(nextPlayerId);

      socket.emit(MESSAGE.CURRENT_PLAYER, nextPlayer);
      socket.broadcast.emit(MESSAGE.CURRENT_PLAYER, nextPlayer);
    });

    socket.on(MESSAGE.GET_SCORE, async (setScore: (score: IPokerScore) => {}) => {
      const player = await DatabaseClient.Players.getBySocketId(socket.id);
      if (!player || !player.id) {
        console.warn(`Player not found by socket_id:${socket.id}!`);
        return;
      }
      const gameScore = await DatabaseClient.GameScores.getById(player.current_score_id);
      if (!gameScore || !gameScore.id) {
        console.warn(`GameScore not found by id:${player.current_score_id}!`);
        return;
      }
      console.log("Current score: " + JSON.stringify(gameScore));
      setScore(gameScore.scoreTable);
    })
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default GameSessionManager;
