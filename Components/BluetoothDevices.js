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
    return Object.keys(this.props.devices).map((x)=>{
      return (<Device key={x} name={this.props.devices[x].name} id={x} isConnectable={this.props.devices[x].isConnectable} device={this.props.devices[x].device} connect={this.props.connect} />);
    });

  }

  render() {
    return (
        <Overlay isVisible>
          <Text style={{ fontSize: 20, marginBottom: 10, color: 'rgba(15,134,193,1)' }} onPress={this.props.toggle}>Close</Text>
          <Text style={{ fontSize: 30 }}>Available Devices</Text>
          <Divider style={{ backgroundColor: 'rgba(15,134,193,.7)' }} />
          <ScrollView>
            {this.displayDevices()}
          </ScrollView>
        </Overlay>
    );
  }
}
