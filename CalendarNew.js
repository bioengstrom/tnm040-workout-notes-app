import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert } from 'react-native';
import moment from 'moment';

let validDates = [
  {
    start: moment().subtract(1000, 'days'),
    end: moment().add(1000, 'days')
  }
];

let weekDayButtons = [
  {text: 'MON', state: {pressStatus: false}},
  {text: 'TUE', state: {pressStatus: false}},
  {text: 'WED', state: {pressStatus: false}},
  {text: 'THU', state: {pressStatus: false}},
  {text: 'FRI', state: {pressStatus: false}},
  {text: 'SAT', state: {pressStatus: false}},
  {text: 'SUN', state: {pressStatus: false}},
];

export default class CalendarNew extends Component {
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

    const renderedButtons = weekDayButtons.map(b => {
      return(
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          key={b.text}
          onPress={this.buttonTest}
          style={ this.state.pressStatus ? styles.weekDayButtonOnPress : styles.weekDayButton }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
        <Text style={this.state.pressStatus ? styles.weekDayButtonTextOnPress : styles.weekDayButtonText}>{b.text}</Text>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.buttonTest}
          style={ this.state.pressStatus?styles.weekDayButtonOnPress:styles.weekDayButton }
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
          <Text style={this.state.pressStatus ? styles.weekDayButtonTextOnPress : styles.weekDayButtonText}>M</Text>
        </TouchableHighlight>
        <View style={styles.container}>
          {renderedButtons}
        </View>
      </View>
    );
  }
}
const roundShapeScale = 50;
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
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
