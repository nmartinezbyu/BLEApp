import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Overlay, Divider } from 'react-native-elements';
import Device from './Device';


export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    }

  }

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible
    })
  }

  displayDevices() {
    let out = [];

    for(i = 0; i < 10; i++) {
      out.push(
        <Device/>
      )
    }

    return out;

  }

  render() {
    return (
        <Overlay isVisible>
          <Text style={{ fontSize: 20, marginBottom: 10, color: 'rgba(15,134,193,1)' }} onPress={this.props.toggle}>Close</Text>
          <Text style={{ fontSize: 30 }}>Available Devices</Text>
          <Divider style={{ backgroundColor: 'rgba(15,134,193,.7)' }} />
          <ScrollView style={{ marginTop: 10 }}>
            {this.displayDevices()}
          </ScrollView>
        </Overlay>
    );
  }
}
