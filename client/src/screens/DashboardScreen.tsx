import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Input, Text } from "native-base";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenNavigationProps } from "../../App";
import socket from "../utils/socket";
import { MESSAGE } from "../model/Messages";
import { User, getAuth, onAuthStateChanged, updateCurrentUser, updateProfile } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNavigationProps>>();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [displayName, setDisplayName] = useState<string>("");
  const [mailVerified, setMailVerified] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setMailVerified(user.emailVerified);
        waitForEmailVerification(10);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateUserDisplayName = () => {
    if (!user) return;
    updateProfile(user, {
      displayName,
    })
      .then(() => {
        console.log("Updated user display name!");
        setDisplayName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userCanPlay = () => {
    if (!user || !user.displayName || !mailVerified) return false;
    return user.displayName.length > 0;
  };

  const waitForEmailVerification = (trials: number) => {
    if (!user) return null;
    if (!user.emailVerified) {
      if (trials <= 0) return;
      const timer = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
      timer(5000).then(() => {
        console.log(`Waiting for verification... ${trials}`);
        user.reload();
        waitForEmailVerification(--trials);
      });
    } else setMailVerified(true);
  };

  const renderEmailVerificationWarning = () => {
    if (user && mailVerified) return;
    return (
      <>
        <Text style={styles.emailWarning}>Please verify your email!</Text>
      </>
    );
  };

  const onSetNameButtonClick = () => {
    updateUserDisplayName();
  };

  const onGameOnButtonClick = () => {
    if (!user) return;
    socket.emit(MESSAGE.REGISTER_PLAYER, user.uid, user.displayName);
    navigation.navigate("GameTypes");
  };

  const onLogoutClick = () => {
    auth.signOut();
    console.log(user?.displayName + " logged out...");
  };

  return (
    <Box style={styles.container}>
      <StatusBar translucent={true} style="dark" />

      {user?.displayName ? (
        <>
          <Text style={styles.title} paddingTop={"10%"}>
            Hello {user?.displayName}!
          </Text>
          <Text style={styles.secondaryText}>Thanks for playing the best dice game ever!</Text>
          {user && mailVerified ? (
            <Button variant="outline" style={styles.button} disabled={!userCanPlay()} onPress={onGameOnButtonClick}>
              <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
                GAME ON!
              </Text>
            </Button>
          ) : (
            renderEmailVerificationWarning()
          )}
        </>
      ) : (
        <>
          <Text style={styles.secondaryText} marginBottom={"10%"}>
            Hey, you have to choose your name before starting the game. This name will be visible for all players and on
            the leaderboards.
          </Text>
          <Input
            InputLeftElement={
              <Icon
                name="gamepad"
                as={FontAwesome}
                size={"xl"}
                color={Colors.SECONDARY_TEXT}
                minW={"10%"}
                marginLeft={"5%"}
              />
            }
            style={styles.input}
            variant="outline"
            placeholder="Enter your nickname"
            maxLength={20}
            onChangeText={(text) => setDisplayName(text)}
          />
          <Button
            variant="outline"
            style={styles.button}
            disabled={displayName.length < 5}
            onPress={onSetNameButtonClick}
          >
            <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
              Choose your name
            </Text>
          </Button>
        </>
      )}
      <Button colorScheme={"danger"} style={styles.logoutButton} onPress={onLogoutClick}>
        <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
          Log out!
        </Text>
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    padding: "10%",
    paddingTop: "50%",
  },
  secondaryText: {
    color: Colors.SECONDARY_TEXT,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20,
    paddingBottom: 20,
  },
  title: {
    color: Colors.PRIMARY_TEXT,
    fontSize: 40,
    paddingBottom: 20,
  },
  text: {
    color: Colors.PRIMARY_TEXT,
    fontSize: 32,
    paddingBottom: 20,
  },
  emailWarning: {
    color: Colors.RED,
    fontSize: 20,
    paddingBottom: 20,
  },
  input: {
    fontSize: 26,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 0,
    marginBottom: "40%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BUTTON,
  },
  logoutButton: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.SECONDARY_BUTTON,
  },
});
