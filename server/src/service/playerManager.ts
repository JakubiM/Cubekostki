import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import DatabaseClient from "./databaseClient";
import { IPlayerDto } from "../model/player";

const PlayerManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.REGISTER_PLAYER, async (account_id: string, name: string) => {
      const currentPlayer = await DatabaseClient.Players.getByAccountId(account_id);
      if (currentPlayer) {
        console.log(`Player with accountId: ${account_id} already exists!, skipping creation...`);
        return;
      }

      console.log(`Creating new player [accountId: ${account_id}, name:${name}]!`);
      DatabaseClient.Players.create(account_id, name);
    });
    socket.on(MESSAGE.GET_PLAYER, async (setPlayer: (rooms: IPlayerDto) => {}) => {
      const player = await DatabaseClient.Players.getBySocketId(socket.id);
      if (!player || !player.id) {
        console.warn(`Player not found by socketId: ${socket.id}`);
        return;
      }
      setPlayer({ id: player.id, name: player.name, ready: player.ready });
    });
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default PlayerManager;
