import { io } from "socket.io-client";

const socket = io("http://192.168.1.31:1337", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

export default socket;
