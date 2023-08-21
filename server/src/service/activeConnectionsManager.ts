import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import DatabaseClient from "./databaseClient";

const setSocketIdForPlayerByAccountId = async (account_id: string, socket_id: string) => {
  const player = await DatabaseClient.Players.getByAccountId(account_id);
  if (!player || !player.id) {
    console.warn(`Player not found by account_id:${account_id}!`);
    return;
  }
  player.current_socket_id = socket_id;
  DatabaseClient.Players.update(player, player.id);
};

const ActiveConnectionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.CREATE_CONNECTION, async (account_id: string) => {
      console.info(`Creating connection for socket[${socket.id}] and accountId = ${account_id}...`);
      setSocketIdForPlayerByAccountId(account_id, socket.id);
    });
  },
  onDisconnect: (socket: Socket): void => {},
};

export default ActiveConnectionManager;
