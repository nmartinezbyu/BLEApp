import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Header, Overlay } from 'react-native-elements';
import BLEIcon from "./BLE_Header.png"
import InputView from './InputView';
import BluetoothDevices from './Components/BluetoothDevices';

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
      public: true,
      addressType: "Public",
      visible: false
    }

    this.manager = new BleManager()

    this.onChange = this.onChange.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.selectAdressType = this.selectAdressType.bind(this);
    this.scanAndConnect = this.scanAndConnect.bind(this);
    this.connect = this.connect.bind(this);
  }

  onChange(key, value) {
    this.setState(state => ({
      ...state,
      [key]: this.convert(value)
    }))
  }

  convert(value) {
    var data = value;
    let result = "";
    for(var i = 0; i < data.length; i++) {
      if(i != data.length - 1) {
        result = result + data.charCodeAt(i).toString(16) + " ";
      }
      else {
        result = result + data.charCodeAt(i).toString(16);
      }
    }
    return result;
  }

  toggleOverlay() {
    const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            this.scanAndConnect();
            subscription.remove();
        }
    }, true);

    this.setState({
      visible: !this.state.visible,
      devices: {},
      connection: null

    })
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.log("error", error)
            return
        }
        else {
          this.setState({
            devices: {
              ...this.state.device,
              [device.id]: {
                id: device.id,
                name: device.name,
                isConnectable: device.isConnectable,
                device
              }
            }

          })
          if(Object.keys(this.state.devices).length > 20)this.manager.stopDeviceScan();
        }
    });
  }

  connect(d) {
    console.log("attempting connection");
    d.connect().then((device) => {
        return device.discoverAllServicesAndCharacteristics()
    })
    .then((device) => {
      this.setState({connection: device});
       console.log(device);
    })
    .catch((error) => {
        console.error(error);
    });
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
    return (
      <View style={{flex: 1}}>
        <Header
          containerStyle={ Platform.OS === 'ios' ? {} : { height: "10%", alignItems: "center", justifyContent: "center" } }
          centerComponent={{ text: 'Configure', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={Platform.OS === 'ios' ? { icon: 'bluetooth', color: '#fff', size: 33, onPress: this.toggleOverlay } : { icon: 'bluetooth', color: '#fff', size: 28, onPress: this.toggleOverlay }}
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
        {this.state.visible && <BluetoothDevices visible={this.state.visible} toggle={this.toggleOverlay} devices={this.state.devices} connect={this.connect}/>}
      </View>
    );
  }
}
