import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GameType } from '../model/gameType'
import { PokerScore } from '../model/pokerScore';

type PokerGameTableProps = {
    scoreData: PokerScore;
}

export default function PokerGameTable(props: PokerGameTableProps) {

    const renderTablePokerSchool = () => {
        const names: string[] = Object.keys(props.scoreData.school)

        return ({Array(names.lenght).fill().map((_, index) => (
                <View key={index} style={styles.rowContainer}>
                  <View style={styles.cellContainer}>
                    <Text style={styles.cellText}>{names[index]}</Text>
                  </View>
                  <View style={styles.cellContainer}>
                    <Text style={styles.cellText}>{props.scoreData.school[names[index]]}</Text>
                  </View>
                </View>
              ))})
    }

    return (
      <ScrollView>
      <View style={styles.tableContainer}></View>
        <View>
          {renderTablePokerSchool()}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    cellContainer: {
      width: 100,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#007bff',
      borderRadius: 5,
      backgroundColor: '#e9ecef',
      padding: 5,
      marginRight: 10,
    },
    cellText: {
      fontSize: 14,
      color: '#495057'
    }
  });