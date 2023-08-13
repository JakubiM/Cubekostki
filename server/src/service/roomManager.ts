import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { IRoomDto } from "../model/room";
import DatabaseClient from "./databaseClient";
import { MESSAGE } from "../model/Messages";

const RoomManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.CREATE_ROOM, async (setRooms: (rooms: IRoomDto[]) => {}) => {
      await DatabaseClient.Rooms.createEmpty();
      DatabaseClient.Rooms.getAll().then(setRooms);
    });
    socket.on(MESSAGE.JOIN_ROOM, async (roomId: string) => {
      const playerAccountId = (await DatabaseClient.ActiveConnections.getBySocketId(socket.id)).account_id;
      const player = await DatabaseClient.Players.getByAccountId(playerAccountId);
      console.log(player);
      if (!player) return;
      const room = await DatabaseClient.Rooms.getById(roomId);
      room.players_ids.push(player.id);
      socket.join(roomId);
      DatabaseClient.Rooms.update(room, roomId);
    });
    socket.on(MESSAGE.GET_ROOMS, (setRooms: (rooms: IRoomDto[]) => {}) => {
      console.log("socket.on(MESSAGE.GET_ROOMS)");
      DatabaseClient.Rooms.getAll().then(setRooms);
    });
  },
  onDisconnect: (socket: Socket): void => {
    throw new Error("Function not implemented.");
  },
};

export default RoomManager;
