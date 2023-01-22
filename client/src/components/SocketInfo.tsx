import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketContext from "../context/SocketContext";

const SocketInfo = () => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;
  return (
    <View>
      <Text>Socket IO Information:</Text>
      <Text>
        Your user ID: <Text>{uid}</Text>
        {"\n"}
        Users online: <Text>{users.length}</Text>
        {"\n"}
        Socket ID: <Text>{socket?.id}</Text>
        {"\n"}
      </Text>
    </View>
  );
};

export default SocketInfo;

const styles = StyleSheet.create({});
