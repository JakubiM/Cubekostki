import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, HStack, Icon, ScrollView, Spacer, Text, View } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import socket from "../utils/socket";
import { IRoomDto } from "../../../server/src/model/room";
import { MESSAGE } from "../model/Messages";
import { FontAwesome } from "@expo/vector-icons";

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

  const renderRoomButton = (roomId: string, index: number, playersNumber: number) => (
    <Button key={index} variant="outline" style={styles.roomListButton} onPress={() => onRoomClick(roomId)}>
      <View style={styles.insideButtonDiv}>
        <Text fontSize={20} color={Colors.PRIMARY_TEXT} w={40}>
          Room {roomId.substring(0, 5)}
        </Text>
        <Icon name="user" as={FontAwesome} color={Colors.BACKGROUND} size={"xl"} minW={"5%"} />
        <Text fontSize={20} color={Colors.PRIMARY_TEXT}>
          {playersNumber}
        </Text>
      </View>
    </Button>
  );

  const renderRoomList = () => {
    return (
      <Box style={styles.roomListContainer}>
        <ScrollView h={"70%"} alignContent={"center"}>
          {rooms.map((room, index) => renderRoomButton(room.id, index, room.players.length))}
        </ScrollView>
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Room List</Text>
      {renderRoomList()}
      <Button variant="outline" style={styles.createRoomButton} onPress={onCreateRoomClick}>
        <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
          Create room
        </Text>
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
    flex: 1,
    backgroundColor: Colors.PRIMARY_BUTTON,
    borderRadius: 10,
    margin: "1%",
  },
  insideButtonDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
