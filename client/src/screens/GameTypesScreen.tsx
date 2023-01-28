import React from "react";
import { Box, Button } from "native-base";
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
      <Box>
        <Button
          size="lg"
          colorScheme="coolGray"
          textAlign="center"
          onPress={() => {
            onGameModeSelect("Dice Poker");
          }}
        >
          Kościany Poker
        </Button>
        <Button
          size="lg"
          colorScheme="trueGray"
          textAlign="center"
          alignContent={"center"}
          marginTop={"10"}
          disabled
        >
          Yahtzee
        </Button>
        <Button size="lg" colorScheme="trueGray" marginTop={"10"} disabled>
          Kości z kurnika
        </Button>
      </Box>
    </Box>
  );
}
