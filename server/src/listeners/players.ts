import { Socket } from "socket.io";
import { Player } from "../model/player";

const players: Player[] = [];

export default (socket: Socket) => {
  socket.on("register_player", (name: string) => {
    console.log(`Creating new player ${name}!`);
    players.push({ id: socket.id, name, ready: false });
  });
};
