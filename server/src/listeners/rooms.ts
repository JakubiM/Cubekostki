import { Socket } from "socket.io";
import { Room } from "../model/room";
import { v4 } from "uuid";

export const rooms: Room[] = [];

export default (socket: Socket) => {
  socket.on("create_room", (setRooms) => {
    const id = v4();
    console.log(`Creating room with id: ${id}`);
    rooms.push({ id, players: [{ id: socket.id, name: "", ready: false }] });
    setRooms(rooms)
  });
  socket.on("join_room", () => {});
  socket.on("get_rooms", (setRooms: (rooms: Room[]) => {}) => {
    console.log("Sending rooms update!");
    setRooms(rooms);
  });
};
