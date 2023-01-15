import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SimpleDiceRoller from "./src/components/SimpleDiceRoller";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Napisz kostki tutaj!</Text>
      <SimpleDiceRoller />
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
