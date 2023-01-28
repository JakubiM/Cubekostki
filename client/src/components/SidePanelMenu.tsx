import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SidePanelMenu() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.container}>
      <Text>SidePanelMenu</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GameTypes");
        }}
      >
        <Text>GameTypes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RoomList");
        }}
      >
        <Text>RoomList</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room");
        }}
      >
        <Text>Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Game");
        }}
      >
        <Text>Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
