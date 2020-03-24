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
              <Text style={{ fontSize: 15 }}>{this.props.id}</Text>
              <Text>{this.props.name}</Text>
              <Text>{this.props.isConnectable}</Text>
            </View>
            <View style={styles.selectedPicoButtonBackground}>
              <Text
                style={styles.picoButton}
                onPress={()=>{ this.props.connect(this.props.device); }}
              >
                Connect
              </Text>
            </View>
          </View>
        </Card>

    );
  }
}
