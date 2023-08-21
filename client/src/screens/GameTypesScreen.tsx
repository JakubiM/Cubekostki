import React from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../utils/colors";
import { ScreenNavigationProps } from "../../App";

export default function GameTypesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();

  const onGameModeSelect = (gameMode: string) => {
    console.log(`You selected ${gameMode} mode!`);
    navigation.navigate("RoomList");
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center" justifyContent="center">
      <Text style={styles.title} lineHeight={"3xl"}>
        What do you want to play today?
      </Text>
      <Box width={"80%"}>
        <Button
          variant="outline"
          style={styles.button}
          onPress={() => {
            onGameModeSelect("Dice Poker");
          }}
        >
          <Text fontSize={25} color={Colors.PRIMARY_TEXT} textAlign={"center"}>
            Dice poker
          </Text>
        </Button>
        <Button variant="outline" style={styles.disabledButton} disabled>
          <Text fontSize={25} color={Colors.PRIMARY_TEXT} textAlign={"center"}>
            Yahtzee
          </Text>
        </Button>
        <Button variant="outline" style={styles.disabledButton} disabled>
          <Text fontSize={25} color={Colors.PRIMARY_TEXT} textAlign={"center"}>
            Kurnik dice
          </Text>
        </Button>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.PRIMARY_TEXT,
    fontSize: 30,
    marginBottom: "50%",
    padding: "5%",
  },
  button: {
    borderRadius: 10,
    marginBottom: "5%",
    backgroundColor: Colors.PRIMARY_BUTTON,
  },
  disabledButton: {
    marginBottom: "5%",
    borderRadius: 10,
    backgroundColor: Colors.CHARCOAL,
  },
});
