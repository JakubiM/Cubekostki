import { Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Button, Input } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();
  const [name, setName] = useState<string>("");

  const onButtonClick = () => {
    console.log("Your name: " + name);
    //emit event for registration...
    navigation.navigate("GameTypes");
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center" justifyContent="center">
      <Text style={styles.text}>Enter your name!</Text>
      <Input
        style={styles.input}
        variant="rounded"
        placeholder=""
        size="2xl"
        width={"80%"}
        maxLength={20}
        onChangeText={(e) => setName(e)}
      />
      <Button
        borderRadius="full"
        colorScheme={name.length === 0 ? "blueGray" : "success"}
        style={styles.button}
        disabled={name.length === 0}
        onPress={onButtonClick}
      >
        GAME ON!
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.CARROT_ORANGE,
    fontSize: 40,
    paddingBottom: 20,
  },
  input: {
    color: Colors.ANDROID_GREEN,
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    marginTop: 15,
    width: "50%",
  },
});
