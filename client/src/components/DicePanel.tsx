import React, { useState } from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, Text, View } from "react-native";
import Die from "./Die";
import { useContext } from "react";
import { IGameContext, GameContext } from "../context/GameContext";

export default function DicePanel() {
  const { rolledDiceList } = useContext<IGameContext>(GameContext);
  const [throwCount, setThrowCount] = useState<number>(0);

  const rollDices = () => {
    console.log("Rolling dices...");
    const updatedDice = [...rolledDiceList.get].map((dieState) =>
      !dieState.selected
        ? {
            selected: false,
            value: Math.floor(Math.random() * 6) + 1,
          }
        : dieState
    );

    rolledDiceList.set(updatedDice);
    setThrowCount((prevCount) => prevCount + 1);
  };

  const selectDie = (index: number) => {
    const updatedDiceList = [...rolledDiceList.get];
    updatedDiceList[index].selected = !updatedDiceList[index].selected;
    rolledDiceList.set(updatedDiceList);
  };

  const renderSixDice = () => {
    return rolledDiceList.get.map(({ value, selected }, index) => (
      <Die
        dieValue={value}
        selected={selected}
        onClick={() => selectDie(index)}
        key={index}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text>DicePanel</Text>
      <View style={styles.diceContainer}>{renderSixDice()}</View>
      <Button onPress={rollDices} title="Throw" />
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
