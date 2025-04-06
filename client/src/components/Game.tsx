import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PokerGameTable from "./PokerGameTable";
import DicePanel from "./DicePanel";
import GameContext from "../context/GameContext";
import { IPlayer } from "../../../server/src/model/player";
import socket from "../utils/socket";
import { MESSAGE } from "../../../server/src/model/Messages";

export default function Game () {

  const [player, setPlayer] = useState<IPlayer>();

  useEffect(() => {
    const onCurrentPlayer = (player: IPlayer) => {
      console.log("onCurrentPlayer, player: ", player);
      setPlayer(player);
    }

    socket.on(MESSAGE.CURRENT_PLAYER, onCurrentPlayer);

    return () => {
      socket.off(MESSAGE.CURRENT_PLAYER, onCurrentPlayer);
    };
  }, []);

  return (
    <GameContext>
      <View style={styles.container}>
        <Text>{player?.name}'s Turn</Text>
        <PokerGameTable />
        <DicePanel />
      </View>
    </GameContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
