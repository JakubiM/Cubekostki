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
      const player = await DatabaseClient.Players.getBySocketId(socket.id);
      console.log(player);
      if (!player) return;
      const room = await DatabaseClient.Rooms.getById(roomId);
      if (!player.id) {
        console.log("Player exists but has no ID!");
        return;
      }
      room.players_ids.push(player.id);
      socket.join(roomId);
      DatabaseClient.Rooms.update(room, roomId);
      player.current_room_id = roomId;
      DatabaseClient.Players.update(player, player.id);
    });
    socket.on(MESSAGE.GET_ROOMS, (setRooms: (rooms: IRoomDto[]) => {}) => {
      console.log("socket.on(MESSAGE.GET_ROOMS)");
      DatabaseClient.Rooms.getAll().then(setRooms);
    });
  },
  onDisconnect: async (socket: Socket): Promise<void> => {
    const player = await DatabaseClient.Players.getBySocketId(socket.id);
    if (!player?.id) {
      console.warn(`Player has no ID xD`);
      return;
    }
    const currentRoomId = player?.current_room_id;
    if (!currentRoomId) {
      console.log(`Player ${player?.id} is not in any room !`);
      return;
    }
    player.current_room_id = "";
    const room = await DatabaseClient.Rooms.getById(currentRoomId);
    room.players_ids = room.players_ids.filter((id) => id !== player.id);
    DatabaseClient.Players.update(player, player.id);
    DatabaseClient.Rooms.update(room, currentRoomId);
  },
};

export default RoomManager;
