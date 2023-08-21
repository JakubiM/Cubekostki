import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Pressable, Text } from "native-base";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";
import { MESSAGE } from "../model/Messages";

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
    socket.emit(MESSAGE.START_GAME, roomId);
    navigation.navigate("Game");
  };

  const renderRoomPlayers = () => {
    return (
      <Box>
        <Pressable bg={Colors.BLUE_MUNSELL} boxSize={150} justifyContent="center" marginBottom={10} disabled>
          <Text fontSize={30} fontWeight="medium" textAlign={"center"}>
            Player 1
          </Text>
        </Pressable>
        <Pressable bg={Colors.ANDROID_GREEN} boxSize={150} justifyContent="center" marginBottom={10} disabled>
          <Text fontSize={30} fontWeight="medium" textAlign={"center"}>
            Player 2
          </Text>
        </Pressable>
        <Pressable bg={Colors.CHARCOAL} boxSize={150} justifyContent="center" onPress={onChairClicked}>
          <Text fontSize={30} fontWeight={playerSat ? "medium" : "light"} textAlign={"center"}>
            {playerSat ? "Player 3" : "Sit here"}
          </Text>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Room ID: {roomId.substring(0, 5)}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: "center",
    paddingTop: "20%",
  },
  title: {
    color: Colors.PRIMARY_TEXT,
    padding: "10%",
    fontSize: 40,
  },
  roomListContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: "column",
    width: "80%",
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.SECONDARY_TEXT,
    padding: "5%",
    overflow: "scroll",
  },
  roomListButton: {
    backgroundColor: Colors.PRIMARY_BUTTON,
    borderRadius: 10,
    margin: "2%",
  },
  createRoomButton: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "80%",
    borderRadius: 10,
    backgroundColor: Colors.SECONDARY_BUTTON,
  },
});
