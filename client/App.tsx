import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Game from "./src/components/Game";
import SocketInfo from "./src/components/SocketInfo";
import SocketContextComponent from "./src/context/SocketContextComponent";

export default function App() {
  return (
    <SocketContextComponent>
      <View style={styles.container}>
        <SocketInfo />
        <Text>Napisz kostki tutaj!</Text>
        <Game />
        <StatusBar style="auto" />
      </View>
    </SocketContextComponent>
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
