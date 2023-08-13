import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IServiceManager } from "../model/serviceManager";

const GameSessionManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default GameSessionManager;
