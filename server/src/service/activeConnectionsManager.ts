import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { MESSAGE } from "../model/Messages";
import DatabaseClient from "./databaseClient";

DatabaseClient.ActiveConnections.deleteAll();

const ActiveConnectionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.CREATE_CONNECTION, async (account_id: string) => {
      console.info(`Creating connection for socket[${socket.id}] and accountId = ${account_id}...`);
      DatabaseClient.ActiveConnections.create(socket.id, account_id);
    });
    socket.on(MESSAGE.REMOVE_CONNECTION, async (socket_id: string) => {
      console.info(`Deleting connection for socket[${socket.id}]...`);
      DatabaseClient.ActiveConnections.deleteBySocketId(socket.id);
    });
  },
  onDisconnect: (socket: Socket): void => {
    DatabaseClient.ActiveConnections.deleteBySocketId(socket.id);
  },
};

export default ActiveConnectionManager;
