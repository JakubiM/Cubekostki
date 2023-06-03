import { Socket } from "socket.io";
import { Player } from "../model/player";
import {MESSAGE} from "../model/Messages";
export const players: Player[] = [];

export default (socket: Socket) => {
  socket.on(MESSAGE.REGISTER_PLAYER, (name: string) => {
    console.log(`Creating new player ${name}!`);
    players.push({ id: socket.id, name, ready: false });
  });
};
