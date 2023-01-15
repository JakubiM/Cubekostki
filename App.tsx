import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PokerGameTable from "./src/components/PokerGameTable";
import SimpleDiceRoller from "./src/components/SimpleDiceRoller";
import { PokerScore } from "./src/model/pokerScore";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Napisz kostki tutaj!</Text>
      <SimpleDiceRoller />
      <PokerGameTable scoreData={{} as PokerScore} />
      <StatusBar style="auto" />
    </View>
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
