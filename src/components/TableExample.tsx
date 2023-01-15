import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TableExample = () => {
  return (
    <ScrollView>
      <View style={styles.tableContainer}>
        {Array(21).fill().map((_, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={styles.cellContainer}>
              <Text style={styles.cellText}>{`Kolumna 1 - Wiersz ${index+1}`}</Text>
            </View>
            <View style={styles.cellContainer}>
              <Text style={styles.cellText}>{`Kolumna 2 - Wiersz ${index+1}`}</Text>
            </View>
            <View style={styles.cellContainer}>
              <Text style={styles.cellText}>{`Kolumna 3 - Wiersz ${index+1}`}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
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

export default TableExample;
