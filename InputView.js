import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, KeyboardAvoidingView  } from 'react-native';

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
  },

})

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      result: ""
    }

    this.convert = this.convert.bind(this);
  }

  convert() {
    if(this.props.value) {
      var data = this.props.value;
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
  // <View style={styles.picoButtonBackground}>
  //   <Text style={styles.picoButton} onPress={this.convert}>Convert</Text>
  // </View>
  // <Text style={{ fontSize: 20, color: "#4d4d4d" }}>{"Result: "+this.state.result}</Text>

  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, color: "#4d4d4d", textAlign: "center", marginTop: 4 }}>{this.state.title}:</Text>
        <View style={{ flexDirection: "row"}}>
          <TextInput autoCapitalize="none" style={{ marginBottom: 2.5, marginTop: 2.5, height: 35, width: 300, backgroundColor: '#e7e7e7', borderRadius: 0, paddingHorizontal: 10 }} placeholderTextColor={'#cccccc'} onChangeText={(value)=> {this.props.onChange(this.props.name, value);}} value={this.props.value} />
        </View>
      </View >
    );
  }
}
