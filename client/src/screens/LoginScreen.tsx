import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Spacer,
  Spinner,
  Text,
} from "native-base";
import { Colors } from "../utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(JSON.stringify(error));
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sendEmailVerification(response.user);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setErrorMessage(error.message);
      });
  };

  const renderErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

  return (
    <Box style={styles.container}>
      <StatusBar translucent={true} style="dark" />
      <Center>
        <Text style={styles.title}>CUBEKOSTKI</Text>
        <Image
          style={{ marginBottom: "5%" }}
          size={200}
          source={require("../../assets/diceLogo.png")}
          alt="Alternate Text"
        />
      </Center>
      <KeyboardAvoidingView behavior="height">
        {renderErrorMessage()}
        <Input
          InputLeftElement={
            <Icon name="at" as={FontAwesome} size={"xl"} color={Colors.SECONDARY_TEXT} minW={"10%"} marginLeft={"5%"} />
          }
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Divider my="2" />
        <Input
          InputLeftElement={
            <Icon name="lock" as={FontAwesome} size={"xl"} color={Colors.SECONDARY_TEXT} marginLeft={"6%"} />
          }
          variant={"outline"}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>

        <Button
          endIcon={
            <Box flexDirection={"row"} alignItems={"center"} alignContent={"center"} size={"0"} marginLeft={"69%"}>
              {loading ? (
                <Spinner size={"lg"} paddingTop={"5"} color={Colors.BACKGROUND} />
              ) : (
                <Icon name="arrow-right" as={FontAwesome} size={"xl"} color={Colors.BACKGROUND} minW={"15%"} />
              )}
            </Box>
          }
          variant="outlined"
          style={styles.loginButton}
          onPress={signIn}
        >
          <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
            Login
          </Text>
        </Button>
        <Button
          rightIcon={
            <Box
              flexDirection={"row"}
              alignItems={"center"}
              alignContent={"center"}
              size={"0"}
              marginLeft={"25%"}
              paddingRight={"5"}
            >
              <Icon name="user-plus" as={FontAwesome} color={Colors.BACKGROUND} size={"xl"} minW={"15%"} />
            </Box>
          }
          style={styles.createAccountButton}
          onPress={signUp}
        >
          <Text fontSize={25} color={Colors.PRIMARY_TEXT}>
            Create account
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    padding: "10%",
    paddingTop: "25%",
  },
  title: {
    fontSize: 40,
    color: Colors.PRIMARY_TEXT,
    paddingTop: "10%",
  },
  input: {
    fontSize: 20,
    textAlign: "left",
  },
  loginButton: {
    margin: 5,
    marginTop: "50%",
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_BUTTON,
  },
  createAccountButton: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.SECONDARY_BUTTON,
  },
  errorMessage: {
    color: Colors.RED,
    fontSize: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
