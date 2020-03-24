import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Device from './Device';

const styles = StyleSheet.create({
  selectedPicoButtonBackground: {
    backgroundColor: "rgba(15,134,193,.7)",
    borderRadius: 5,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4
  },
  picoButton: {
    margin: 4,
    paddingHorizontal: 4,
    textAlign: "center",
    color: 'white',
    fontSize: 18
  }
})

export default class Configure extends Component {

  render() {
    return (
        <Card containerStyle={{ margin: 5, flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent:  "space-between", alignItems: "center"}}>
            <View>
              <Text style={{ fontSize: 15 }}>1E:AD:F3:58:B9:D3</Text>
              <Text>Some Name</Text>
              <Text>Connectable?</Text>
            </View>
            <View style={styles.selectedPicoButtonBackground}>
              <Text
                style={styles.picoButton}
              >
                Connect
              </Text>
            </View>
          </View>
        </Card>

    );
  }
}

/*
      <Card>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{this.props.id}</Text>
        <Text style={{fontSize: 15}}>{(this.props.name) ? this.props.name : "<new device>"}</Text>
        <Text style={{fontSize: 10}}>{(this.props.isConnectable) ? "Connectable" : "Not Connectable"}</Text>
      </Card>
*/
