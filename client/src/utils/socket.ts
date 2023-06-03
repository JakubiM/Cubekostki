import { io } from "socket.io-client";

const socket = io("http://192.168.1.27:1337", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

socket.on("connection", () => {
  console.log("Connected to server!");
});

export default socket;
