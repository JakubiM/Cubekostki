import React, { useState } from "react";
import { Box, Button, Pressable, Text } from "native-base";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

export type RoomScreenProps = NativeStackScreenProps<ScreenNavigationProps, "Room">;

export default function RoomScreen({ route }: RoomScreenProps) {
  const { roomId } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();

  const [playerSat, setPlayerSat] = useState<boolean>(false);

  const onChairClicked = () => {
    console.log("Sitting...");
    setPlayerSat(!playerSat);
  };

  const onReadyButtonClicked = () => {
    console.log("Player is ready...");
    navigation.navigate("Game");
  };

  const renderRoomPlayers = () => {
    return (
      <Box marginTop={"25%"}>
        <Pressable
          bg={Colors.CARROT_ORANGE}
          boxSize={150}
          justifyContent="center"
          marginBottom={10}
          disabled
        >
          <Text fontSize={30} fontWeight="medium" textAlign={"center"}>
            Player 1
          </Text>
        </Pressable>
        <Pressable
          bg={Colors.ANDROID_GREEN}
          boxSize={150}
          justifyContent="center"
          marginBottom={10}
          disabled
        >
          <Text fontSize={30} fontWeight="medium" textAlign={"center"}>
            Player 2
          </Text>
        </Pressable>
        <Pressable
          bg={Colors.CHARCOAL}
          boxSize={150}
          justifyContent="center"
          onPress={onChairClicked}
        >
          <Text fontSize={30} fontWeight={playerSat ? "medium" : "light"} textAlign={"center"}>
            {playerSat ? "Player 3" : "Sit here"}
          </Text>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center">
      <Text fontSize={20} color="white">
        RoomScreen
      </Text>
      <Text fontSize={10} color="white">
        Room ID: {roomId}
      </Text>
      {renderRoomPlayers()}
      <Button
        marginTop={"10%"}
        width={"25%"}
        borderRadius="full"
        colorScheme={playerSat ? "success" : "error"}
        disabled={!playerSat}
        onPress={onReadyButtonClicked}
      >
        {playerSat ? "Ready" : "Please sit !"}
      </Button>
    </Box>
  );
}
