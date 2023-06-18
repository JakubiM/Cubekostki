import { IDieState } from './../../../client/src/model/dieState';
import { Socket } from "socket.io";
import {MESSAGE} from "../model/Messages";


export default (socket: Socket) => {
    // socket.on(MESSAGE.START_GAME, )
    socket.on(MESSAGE.THROW, (setDiceList, currentDice: IDieState[]) => {
        console.log("PIZDA!");
        console.log(`Current dice: ${currentDice}`);
        console.log(`setDiceList: ${setDiceList}`);
        const updatedDice = currentDice.map((dice: IDieState) => {
            if(!dice.selected)
                dice.value = Math.floor(Math.random() * 6) + 1;
            return dice;
        });
        if (setDiceList) setDiceList(updatedDice);
  });

};
