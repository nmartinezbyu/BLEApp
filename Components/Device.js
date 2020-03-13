import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Device from './Device';

const styles = StyleSheet.create({
  selectedPicoButtonBackground: {
    backgroundColor: "rgba(15,134,193,.7)",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  picoButton: {
    margin: 6,
    paddingHorizontal: 6,
    textAlign: "center",
    color: 'white',
    fontSize: 20
  }
})

export default class Configure extends Component {

  render() {
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{ fontSize: 25 }}>Some Device</Text>
          <View style={styles.selectedPicoButtonBackground}>
            <Text
              style={styles.picoButton}
            >
              Select
            </Text>
          </View>
        </View>
    );
  }
}
