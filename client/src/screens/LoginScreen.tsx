import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import { ActivityIndicator, Button, TextInput } from "@react-native-material/core";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { Center, Image, KeyboardAvoidingView, Text } from "native-base";
import { Colors } from "../utils/colors";

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
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sendEmailVerification(response.user);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

  return (
    <View style={styles.container}>
      <Center>
        <Image
          style={{ marginBottom: 100 }}
          size={300}
          source={require("../../assets/diceLogo.png")}
          alt="Alternate Text"
        />
      </Center>
      <KeyboardAvoidingView behavior="padding">
        {renderErrorMessage()}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0000ff" />
        ) : (
          <>
            <Button style={styles.button} title="Login" onPress={signIn} />
            <Button style={styles.button} title="Create account" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    color: Colors.ANDROID_GREEN,
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    margin: 5,
  },
  errorMessage: {
    color: Colors.RED,
    fontSize: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
