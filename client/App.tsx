import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import DashboardScreen from "./src/screens/DashboardScreen";
import GameScreen from "./src/screens/GameScreen";
import GameTypesScreen from "./src/screens/GameTypesScreen";
import RoomListScreen from "./src/screens/RoomListScreen";
import RoomScreen from "./src/screens/RoomScreen";

export type ScreenNavigationProps = {
  Room: {
    roomId: string;
  };
  Dashboard: any;
  GameTypes: any;
  RoomList: any;
  Game: any;
};

export const RootStack = createNativeStackNavigator<ScreenNavigationProps>();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={DarkTheme}>
        <RootStack.Navigator initialRouteName="Dashboard">
          <RootStack.Screen name="Dashboard" component={DashboardScreen} />
          <RootStack.Screen name="GameTypes" component={GameTypesScreen} />
          <RootStack.Screen name="RoomList" component={RoomListScreen} />
          <RootStack.Screen name="Room" component={RoomScreen} />
          <RootStack.Screen name="Game" component={GameScreen} />
        </RootStack.Navigator>
        <StatusBar style="inverted" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
