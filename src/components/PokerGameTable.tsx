import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function PokerGameTable() {
  const { scoreData, currentRolledValue } = useContext(GameContext);

  console.log(scoreData);

  const onScoreCellPress = (name: string) => {
    console.log("Setting: ", name);
    const updatedScore = scoreData.get;
    updatedScore.school[name] = currentRolledValue.get;
    scoreData.set((prev) => {
      return { ...prev, updatedScore };
    });
  };

  const renderTablePokerSchool = () => {
    const names: string[] = Object.keys(scoreData.get.school) as string[];
    return names.map((name, index) => (
      <>
        <View key={index} style={styles.rowContainer}>
          <View style={styles.cellContainer}>
            <Text style={styles.cellText}>{name}</Text>
          </View>
          <View style={styles.cellContainer}>
            <TouchableOpacity
              style={styles.scoreCell}
              onPress={() => onScoreCellPress(name)}
            >
              <Text style={styles.cellText}>
                {!!scoreData.get.school[name] ? scoreData.get.school[name] : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.tableContainer}>{renderTablePokerSchool()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cellContainer: {
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
    backgroundColor: "#e9ecef",
    padding: 5,
    marginRight: 10,
  },
  cellText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  scoreCell: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
