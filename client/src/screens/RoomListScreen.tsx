import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import socket from "../utils/socket";
import { IRoomDto } from "../../../server/src/model/room";
import { MESSAGE } from "../model/Messages";

export default function RoomListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();

  const [rooms, setRooms] = useState<IRoomDto[]>([]);

  useEffect(() => {
    socket.emit(MESSAGE.GET_ROOMS, setRooms);
  }, []);

  const onRoomClick = (roomId: string) => {
    console.log(`Entering room ${roomId}!`);
    socket.emit(MESSAGE.JOIN_ROOM, roomId);
    navigation.navigate("Room", { roomId });
  };

  const onCreateRoomClick = () => {
    socket.connect();
    console.log("Creating new room!");
    socket.emit(MESSAGE.CREATE_ROOM, setRooms);
  };

  const renderRoomList = () => {
    return (
      <Box flexDirection={"column"} paddingTop={10} width={"90%"}>
        {rooms.map((room, index) => (
          <Button key={index} marginTop={5} onPress={() => onRoomClick(room.id)}>
            <Text>
              Room {index}
              {"\n"}Players {room.players.length}
            </Text>
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center" paddingTop={10}>
      <Text color={Colors.BLUE_MUNSELL} fontSize="2xl">
        Room List
      </Text>
      {renderRoomList()}
      <Button marginTop={5} textAlign="center" colorScheme={"secondary"} onPress={onCreateRoomClick}>
        Create Room
      </Button>
    </Box>
  );
}
