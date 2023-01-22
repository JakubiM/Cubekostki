import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GameContext from "../context/GameContext";
import PokerGameTable from "./PokerGameTable";
import DicePanel from "./DicePanel";

export default function Game() {
  return (
    <GameContext>
      <View style={styles.container}>
        <Text>Game</Text>
        <DicePanel />
        <PokerGameTable />
      </View>
    </GameContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
