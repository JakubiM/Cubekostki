import { PokerScore } from "./../../../client/src/model/pokerScore";
import { Socket } from "socket.io";
import { Room } from "../model/room";
import { v4 } from "uuid";
import { Player } from "../model/player";
import { players } from "./players";
import { MESSAGE } from "../model/Messages";
import { DBClient } from "../service/dbClient";

// export const rooms: Room[] = [];

export default (socket: Socket) => {
  socket.on(MESSAGE.CREATE_ROOM, async (setRooms: (rooms: Room[]) => {}) => {
    const id = v4();
    console.log(`Creating room with id: ${id}`);
    await DBClient.addRoom()
    DBClient.getRooms().then(setRooms);
  });
  socket.on(MESSAGE.JOIN_ROOM, async (roomId: string) => {
    console.log(`Player[id=${socket.id}] trying to join Room[id=${roomId}]!`);
    const player: Player | undefined = players.find((p) => p.id === socket.id);
    if (!player) {
      console.log("Player not found by id: ", socket.id);
      return;
    }
    const room = await DBClient.getRoom(roomId);
    console.log("room: ", room);
    room.players.push({playerId:player.id, score: <PokerScore>{}});
    DBClient.updateRoom(room);
    // rooms.forEach((room) => {
    //   if (room.id === roomId) {
    //     room.players.push({playerId:player.id, score: new PokerScore()})
    //     console.log(`Adding player[id=${socket.id}] to room[id=${room.id}]!`);
    //   }
    // });
  });
  socket.on(MESSAGE.GET_ROOMS, (setRooms: (rooms: Room[]) => {}) => {
    DBClient.getRooms().then(setRooms);
  });
};
