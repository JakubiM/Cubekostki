import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";
import PlayerManager from "./service/playerManager";
import RoomManager from "./service/roomManager";
import GameSessionManager from "./service/gameSessionManager";
import ActiveConnectionManager from "./service/activeConnectionsManager";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.StartListeners);
  }

  StartListeners = (socket: Socket) => {
    console.info("Connect received from " + socket.id);

    PlayerManager.initialize(socket);
    RoomManager.initialize(socket);
    ActiveConnectionManager.initialize(socket);
    GameSessionManager.initialize(socket);

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
      // TODO uncomment after implementing disconnect handlers!
      // PlayerManager.onDisconnect(socket);
      RoomManager.onDisconnect(socket);
      // GameSessionManager.onDisconnect(socket);
      ActiveConnectionManager.onDisconnect(socket);
    });
  };
}
