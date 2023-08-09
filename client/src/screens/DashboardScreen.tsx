import { Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Input } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import socket from "../utils/socket";
import { MESSAGE } from "../model/Messages";
import { User, getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  console.log(JSON.stringify(user));
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const updateUserDisplayName = () => {
    if (!user) return;
    updateProfile(user, {
      displayName: displayName,
    })
      .then(() => {
        console.log("Updated user display name!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userCanPlay = () => {
    if (!user || !user.displayName) return false;
    return user.displayName.length > 0;
  };

  const renderEmailVerificationWarning = () => {
    if (user && user.emailVerified) return;
    return (
      <>
        <Text style={styles.emailWarning}>Please verify your email before playing!</Text>
      </>
    );
  };

  const onSetNameButtonClick = () => {
    updateUserDisplayName();
  };

  const onButtonClick = () => {
    if (user?.displayName) {
      socket.emit(MESSAGE.REGISTER_PLAYER, name); //TODO remove after setting firebase
      navigation.navigate("GameTypes");
      return;
    }
    updateUserDisplayName();
    console.log("Your name: " + name);
    socket.emit(MESSAGE.REGISTER_PLAYER, name); //TODO remove after setting firebase
    navigation.navigate("GameTypes");
  };

  const onLogoutClick = () => {
    auth.signOut();
    console.log(user?.displayName + " logged out...");
  };

  return (
    <Box flex={1} bg={Colors.BACKGROUND} alignItems="center" justifyContent="center">
      {user?.displayName ? (
        <>
          <Text style={styles.text}>Hello {user?.displayName}!</Text>
          {renderEmailVerificationWarning()}
        </>
      ) : (
        <>
          <Text style={styles.text}>Enter your name!</Text>
          <Input
            style={styles.input}
            variant="rounded"
            placeholder=""
            size="2xl"
            width={"80%"}
            maxLength={20}
            onChangeText={(e) => setDisplayName(e)}
          />
          <Button
            borderRadius="full"
            colorScheme={displayName.length === 0 ? "blueGray" : "success"}
            style={styles.button}
            disabled={displayName.length === 0}
            onPress={onSetNameButtonClick}
          >
            Choose your name
          </Button>
        </>
      )}
      <Button
        borderRadius="full"
        colorScheme={!userCanPlay() ? "blueGray" : "success"}
        style={styles.button}
        disabled={!userCanPlay()}
        onPress={onButtonClick}
      >
        GAME ON!
      </Button>
      <Button borderRadius="full" colorScheme={"danger"} style={styles.button} onPress={onLogoutClick}>
        Log out!
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
  emailWarning: {
    color: Colors.RED,
    fontSize: 20,
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
