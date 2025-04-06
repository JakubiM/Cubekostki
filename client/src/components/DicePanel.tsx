import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Die from "./Die";
import { useContext } from "react";
import { IGameContext, GameContext } from "../context/GameContext";
import socket from "../utils/socket";
import { createEmptyHand, IDieState } from "../model/dieState";
import { Button } from "native-base";
import { MESSAGE } from "../../../server/src/model/Messages";
import { IPlayer } from "../../../server/src/model/player";

const MAX_THROWS = 3;

export default function DicePanel () {
  const { rolledDiceList } = useContext<IGameContext>(GameContext);
  const [throwCount, setThrowCount] = useState<number>(0);


  useEffect(() => {
    const onHandUpdate = (newDice: IDieState[]) => {
      console.log("onHandUpdate, newDice: ", newDice);
      rolledDiceList.set(newDice);
    }

    const onCurrentPlayer = (player: IPlayer) => {
      console.log("onCurrentPlayer, player: ", player);
      if (player.current_socket_id === socket.id) {
        setThrowCount(0);
        rolledDiceList.set(createEmptyHand());
      }
    }

    socket.on(MESSAGE.CURRENT_PLAYER, onCurrentPlayer);
    socket.on(MESSAGE.UPDATE_HAND, onHandUpdate);

    return () => {
      socket.off(MESSAGE.UPDATE_HAND, onHandUpdate);
      socket.off(MESSAGE.CURRENT_PLAYER, onCurrentPlayer);
    };
  }, []);

  const rollDices = () => {
    if (throwCount >= MAX_THROWS) {
      console.log("You can't throw more!");
      return;
    }

    if (rolledDiceList.set != null) {
      socket.emit(MESSAGE.THROW, rolledDiceList.get);
    }

    setThrowCount((prevCount) => prevCount + 1);
  };

  const selectDie = (index: number) => {
    const updatedDiceList = [...rolledDiceList.get];
    updatedDiceList[index].selected = !updatedDiceList[index].selected;
    rolledDiceList.set(updatedDiceList);
  };

  const renderSixDice = () => {
    return rolledDiceList != null ? (
      rolledDiceList?.get.map(({ value, selected }, index) => (
        <Die dieValue={value} selected={selected} onClick={() => selectDie(index)} key={index} />
      ))
    ) : (
      <></>
    );
  };

  return (
    <View style={styles.container}>
      <Text>DicePanel</Text>
      <View style={styles.diceContainer}>{renderSixDice()}</View>
      <Button onPress={rollDices}>Throw</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 3,
    borderColor: "red",
    // padding: "10",
  },
  diceContainer: {
    display: "flex",
    flexDirection: "row",
  },
  throwButton: {
    width: "50px",
    height: "50px",
  },
});
