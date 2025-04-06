import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import DashboardScreen from "./src/screens/DashboardScreen";
import GameScreen from "./src/screens/GameScreen";
import GameTypesScreen from "./src/screens/GameTypesScreen";
import RoomListScreen from "./src/screens/RoomListScreen";
import RoomScreen from "./src/screens/RoomScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase-config";
import socket from "./src/utils/socket";
import { MESSAGE } from "./src/model/Messages";
import { IRoomDto } from "../server/src/model/room";

export type ScreenNavigationProps = {
  Login: any;
  Room: {
    room: IRoomDto;
  };
  Dashboard: {
    displayName: string | null;
  };
  GameTypes: any;
  RoomList: any;
  Game: {
    room: IRoomDto;
  };
};

const RootStack = createNativeStackNavigator();
const AuthenticatedStack = createNativeStackNavigator<ScreenNavigationProps>();

const AuthenticatedLayout = () => {
  return (
    <AuthenticatedStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false, headerBackVisible: false }}
    >
      <AuthenticatedStack.Screen name="Dashboard" component={DashboardScreen} />
      <AuthenticatedStack.Screen name="GameTypes" component={GameTypesScreen} />
      <AuthenticatedStack.Screen name="RoomList" component={RoomListScreen} />
      <AuthenticatedStack.Screen name="Room" component={RoomScreen} />
      <AuthenticatedStack.Screen name="Game" component={GameScreen} />
    </AuthenticatedStack.Navigator>
  );
};

export default function App () {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user) {
        socket.emit(MESSAGE.CREATE_CONNECTION, user?.uid);
      }
    });
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={DarkTheme}>
        <RootStack.Navigator initialRouteName="Login">
          {user ? (
            <RootStack.Screen
              name="AuthenticatedLayout"
              component={AuthenticatedLayout}
              options={{ headerShown: false, headerLeft: () => null }}
            />
          ) : (
            <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
