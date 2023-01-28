import React from "react";
import { Box, Button, Text } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";

export default function RoomListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();

  const onRoomClick = (roomId: string) => {
    console.log(`Entering room ${roomId}!`);
    navigation.navigate("Room", { roomId });
  };

  const renderRoomList = () => {
    return (
      <Box flexDirection={"column"} paddingTop={10} width={"90%"}>
        <Button marginTop={5} textAlign="center" onPress={() => onRoomClick("1")}>
          Room 1
        </Button>
        <Button marginTop={5} textAlign="center" onPress={() => onRoomClick("2")}>
          Room 2
        </Button>
        <Button marginTop={5} textAlign="center" onPress={() => onRoomClick("3")}>
          Room 3
        </Button>
      </Box>
    );
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center" paddingTop={10}>
      <Text color={Colors.BLUE_MUNSELL} fontSize="2xl">
        Room List
      </Text>
      {renderRoomList()}
    </Box>
  );
}
