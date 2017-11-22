import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert } from 'react-native';
import moment from 'moment';


export default class DayButton extends Component{
  constructor(props){
    super(props);
    this.state = {pressStatus: false};
  }

  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

  buttonTest = () => {
    Alert.alert("Pressed");
    console.log("button pressed");
  }

  render() {

    return(
      <View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.buttonTest}
          style={ this.state.pressStatus ? styles.weekDayButtonOnPress : styles.weekDayButton }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
          <Text style={this.state.pressStatus ? styles.weekDayButtonTextOnPress : styles.weekDayButtonText}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const roundShapeScale = 50;
const styles = StyleSheet.create({
  weekDayButton: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',

  },
  weekDayButtonOnPress: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'transparent',
  },
  weekDayButtonText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  weekDayButtonTextOnPress: {
    marginTop: 5,
    textAlign: 'center',
    color: 'grey',
    fontSize: 12,
  },


});
