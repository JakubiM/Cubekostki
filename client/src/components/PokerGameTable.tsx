import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { getBonusCalculationFunction, getCalculationFunction } from "../utils/pokerSixDiceRecognizer";
import TableCell from "./TableCell";

export default function PokerGameTable() {
  const { scoreData, rolledDiceList } = useContext(GameContext);

  const onScoreSchoolCellPress = (name: string) => {
    const updatedScore = scoreData.get;
    updatedScore.school[name] = getCalculationFunction(name)(rolledDiceList.valueReps);
    scoreData.set((prev) => {
      return { ...prev, ...updatedScore };
    });
  };

  const onScoreCellPress = (name: string) => {
    const updatedScore = scoreData.get;
    updatedScore[name] = getCalculationFunction(name)(rolledDiceList.valueReps);
    scoreData.set((prev) => {
      return { ...prev, ...updatedScore };
    });
  };

  const renderTablePokerSchool = () => {
    const names: string[] = Object.keys(scoreData.get.school);
    return names.map((name, index) => (
      <View key={index} style={styles.rowContainer}>
        <View style={styles.cellContainer}>
          <Text style={styles.cellText}>{name}</Text>
        </View>
        <View style={styles.cellContainer}>
          {name === "sum" || name === "bonus" ? (
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {getBonusCalculationFunction(name)(scoreData.get)}
            </Text>
          ) : (
            <TouchableOpacity style={styles.scoreCell} onPress={() => onScoreSchoolCellPress(name)}>
              <TableCell
                placeholder={getCalculationFunction(name)(
                  rolledDiceList.valueReps,
                  getBonusCalculationFunction("sum")(scoreData.get)
                )}
                value={scoreData.get.school[name]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ));
  };

  const renderTablePokerRest = () => {
    const names: string[] = Object.keys(scoreData.get);
    names.splice(0, 1); // usuwa pierwszy element z tablicy bo to szkola TODO refactor
    return names.map((name, index) => (
      <View key={index} style={styles.rowContainer}>
        <View style={styles.cellContainer}>
          <Text style={styles.cellText}>{name}</Text>
        </View>
        <View style={styles.cellContainer}>
          {name === "nonZeroBonus" ? (
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {getBonusCalculationFunction(name)(scoreData.get)}
            </Text>
          ) : (
            <TouchableOpacity style={styles.scoreCell} onPress={() => onScoreCellPress(name)}>
              <TableCell
                placeholder={getCalculationFunction(name)(rolledDiceList.valueReps)}
                value={scoreData.get[name]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.tableContainer}>
        {renderTablePokerSchool()}
        {renderTablePokerRest()}
      </View>
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
    // padding: 5,
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
