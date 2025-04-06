import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Pressable, Text } from "native-base";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";
import { MESSAGE } from "../../../server/src/model/Messages";
import { IRoomDto } from "../../../server/src/model/room";

export type RoomScreenProps = NativeStackScreenProps<ScreenNavigationProps, "Room">;

export default function RoomScreen({ route }: RoomScreenProps) {
  const [room, setRoom] = useState<IRoomDto>(route.params.room);
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();

  useEffect(() => {
    const onRoomUpdate = (room: IRoomDto) => {
      console.log("onRoomUpdate, room: ", room);
      setRoom(room);
    }

    socket.on(MESSAGE.UPDATE_ROOM, onRoomUpdate);

    return () => {
      socket.off(MESSAGE.UPDATE_ROOM, onRoomUpdate);
    };
  }, []);

  const onReadyButtonClicked = () => {
    console.log("Player is ready...");
    socket.emit(MESSAGE.START_GAME, room.id);
    // navigation.navigate("Game");
  };

  const isTwoPlayers = () => {
    return room.players.length > 2;
  }

  const renderRoomPlayers = () => {
    return (
      <Box>
        {room.players.map(player => (
          <Pressable key={player.id} bg={Colors.BLUE_MUNSELL} boxSize={150} justifyContent="center" marginBottom={10} disabled>
            <Text fontSize={30} fontWeight="medium" textAlign={"center"}>
              {player.name}
            </Text>
        </Pressable>
        ))}
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Room ID: {room.id.substring(0, 5)}</Text>
      <Text fontSize={10} color="white">
        Room ID: {room.id}
      </Text>
      {renderRoomPlayers()}
      <Button
        marginTop={"10%"}
        width={"25%"}
        borderRadius="full"
        colorScheme={isTwoPlayers() ? "success" : "error"}
        disabled={!isTwoPlayers()}
        onPress={onReadyButtonClicked}
      >
        {isTwoPlayers() ? "Ready" : "Waiting for players..."}
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
