import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picoButtonBackground: {
    backgroundColor: "rgba(15,134,193,.7)",
    borderRadius: 5,
    marginTop: 0,
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
  constructor(props) {
    super(props);
    this.state = {
      title: "ASCIIToHex",
      result: ""
    }

    this.onChange = this.onChange.bind(this);
    this.convert = this.convert.bind(this);
  }

  onChange(key, value) {
    this.setState(state => ({
      ...state,
      [key]: value
    }))
  }

  convert() {
    if(this.state.value) {
      var data = this.state.value;
      let result = "";
      for(var i = 0; i < data.length; i++) {
        if(i != data.length - 1) {
          result = result + data.charCodeAt(i).toString(16) + " ";
        }
        else {
          result = result + data.charCodeAt(i).toString(16);
        }
      }
      this.setState({
        result: result
      });
    }
  }

  render() {
    return (
      <View style={{ justifyContent: "center", flexGrow: 1, flexDirection: "column", marginLeft: 10 }}>
        <Text style={{ fontSize: 20, color: "#4d4d4d" }}>{this.state.title}:</Text>
        <View style={{ flexDirection: "row"}}>
          <TextInput autoCapitalize="none" style={{ marginBottom: 2.5, marginTop: 2.5, height: 35, width: 300, backgroundColor: '#e7e7e7', borderRadius: 0, paddingHorizontal: 10 }} placeholderTextColor={'#cccccc'} onChangeText={(value)=> {this.onChange("value", value);}} value={this.state.value} />
          <View style={styles.picoButtonBackground}>
            <Text style={styles.picoButton} onPress={this.convert}>Convert</Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, color: "#4d4d4d" }}>{"Result: "+this.state.result}</Text>
      </View>
    );
  }
}
