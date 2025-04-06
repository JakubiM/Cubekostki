import { Socket } from "socket.io";
import { IServiceManager } from "../model/serviceManager";
import { IRoomDto, roomToDto } from "../model/room";
import DatabaseClient from "./databaseClient";
import { MESSAGE } from "../model/Messages";

const RoomManager: IServiceManager = {
  initialize: (socket: Socket): void => {
    socket.on(MESSAGE.CREATE_ROOM, async (setRooms: (rooms: IRoomDto[]) => {}) => {
      await DatabaseClient.Rooms.createEmpty();
      DatabaseClient.Rooms.getAll().then(setRooms);
    });
    socket.on(MESSAGE.JOIN_ROOM, async (roomId: string) => {
      console.log("socket.on(MESSAGE.JOIN_ROOM)");
      const player = await DatabaseClient.Players.getBySocketId(socket.id);
      console.log(player);
      console.log(socket.id);
      if (!player) return;
      const room = await DatabaseClient.Rooms.getById(roomId);
      if (!player.id) {
        console.log("Player exists but has no ID!");
        return;
      }
      room.players_ids.push(player.id);
      socket.join(roomId);
      await DatabaseClient.Rooms.update(room, roomId);
      player.current_room_id = roomId;
      await DatabaseClient.Players.update(player, player.id);
      const roomDto = await DatabaseClient.Rooms.getByIdForClient(roomId);
      socket.emit(MESSAGE.CLIENT_JOIN_ROOM, roomDto);
      socket.broadcast.emit(MESSAGE.UPDATE_ROOM, roomDto);
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
    player.ready = false;
    const room = await DatabaseClient.Rooms.getById(currentRoomId);
    room.players_ids = room.players_ids.filter((id) => id !== player.id);
    await DatabaseClient.Players.update(player, player.id);
    await DatabaseClient.Rooms.update(room, currentRoomId);
    const roomDto = await DatabaseClient.Rooms.getByIdForClient(currentRoomId);
    socket.broadcast.emit(MESSAGE.UPDATE_ROOM, roomDto);
  },
};

export default RoomManager;
