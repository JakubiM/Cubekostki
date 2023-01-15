import { useState } from "react";
import { Button, StyleSheet, Text, Image, View } from "react-native";

export default function SimpleDiceRoller() {
  const [diceRoll, setDiceRoll] = useState(1);

  const DiceImage = [
    require("../../assets/dice/dice1.png"),
    require("../../assets/dice/dice2.png"),
    require("../../assets/dice/dice3.png"),
    require("../../assets/dice/dice4.png"),
    require("../../assets/dice/dice5.png"),
    require("../../assets/dice/dice6.png"),
  ];

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
  };

  const getDiceImage = () => (
    <Image source={DiceImage[diceRoll - 1]} style={{ width: 50, height: 50 }} />
  );

  return (
    <View>
      <Text>Dice Roll: {diceRoll}</Text>
      {getDiceImage()}
      <Button onPress={rollDice} title="Roll dice" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({});
