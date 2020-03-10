import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { Header } from 'react-native-elements';
import BLEIcon from "./BLE_Header.png"
import InputView from './InputView';

const styles = StyleSheet.create({
  selectedPicoButtonBackground: {
    backgroundColor: "rgba(15,134,193,.7)",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  updatePicoButtonBackground: {
    backgroundColor: "rgba(15,134,193,.7)",
    borderRadius: 5,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5
  },
  selectedPicoButton: {
    margin: 6,
    paddingHorizontal: 6,
    textAlign: "center",
    color: 'white',
    fontSize: 20
  },
  picoButtonBackground: {
    backgroundColor: "rgba(100,100,100,.7)",
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
  },
  bleicon: Platform.OS === 'ios' ? {
    height: 110,
    width: 130,
    marginTop: 30
  } : {
    height: 90,
    width: 110,
    marginTop: 20
  }
})

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private: false,
      public: false
    }

    this.onChange = this.onChange.bind(this);
    this.selectAdressType = this.selectAdressType.bind(this);
  }

  onChange(key, value) {
    this.setState(state => ({
      ...state,
      [key]: value
    }))
  }

  selectAdressType(type) {
    let publicType = false
    let privateType = false
    if(type === "Private") {
      publicType = false
      privateType = true
    }
    else {
      publicType = true
      privateType = false
    }

    this.setState({
      addressType: type,
      public: publicType,
      private: privateType
    })
  }


  render() {
    console.log(this.state.addressType);
    return (
      <View>
        <Header
          centerComponent={{ text: 'Configure', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'bluetooth', color: '#fff', size: 33 }}
        />
        <ScrollView>
          <View style={{ justifyContent: 'space-evenly', flexGrow: 1, flexDirection: "column", alignItems:"center", marginBottom: 30 }} behavior="height">
            <Image source={BLEIcon} style={styles.bleicon}/>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#4d4d4d" }} >Enter Configuration Parameters</Text>
            <InputView
              title="BLE server address"
              value={this.state.address}
              name="address"
              onChange={this.onChange}
            />
            <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text style={{ fontSize: 20, color: "#4d4d4d", marginBottom: 10 }}>BLE Address Type:</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={(this.state.public) ? styles.selectedPicoButtonBackground : styles.picoButtonBackground}>
                  <Text
                    onPress={() => {this.selectAdressType("Public");}}
                    style={styles.picoButton}
                  >
                    Public
                  </Text>
                </View>
                <View style={(this.state.private) ? styles.selectedPicoButtonBackground : styles.picoButtonBackground}>
                  <Text
                    onPress={() => {this.selectAdressType("Private");}}
                    style={styles.picoButton}
                  >
                    Private
                  </Text>
                </View>
              </View>
            </View>
            <InputView
              title="Device Name"
              value={this.state.name}
              name="name"
              onChange={this.onChange}
            />
            <InputView
              title="Password"
              value={this.state.password}
              name="password"
              onChange={this.onChange}
            />
            <InputView
              title="Sample Interval"
              value={this.state.sampleInterval}
              name="sampleInterval"
              onChange={this.onChange}
            />
            <InputView
              title="Number of samples per interval"
              value={this.state.numSamplesPerInterval}
              name="numSamplesPerInterval"
              onChange={this.onChange}
            />
            <View style={styles.updatePicoButtonBackground}>
              <Text
                onPress={() => {}}
                style={styles.picoButton}
              >
                Update
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
