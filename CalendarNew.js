import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert } from 'react-native';
import moment from 'moment';
import DayButton from './DayButton.js';

let validDates = [
  {
    start: moment().subtract(1000, 'days'),
    end: moment().add(1000, 'days')
  }
];

const weekDayButtons = [
  {text: 'MON', dayFormat: 'Monday'},
  {text: 'TUE', dayFormat: 'Tuesday'},
  {text: 'WED', dayFormat: 'Wednesday'},
  {text: 'THU', dayFormat: 'Thursday'},
  {text: 'FRI', dayFormat: 'Friday'},
  {text: 'SAT', dayFormat: 'Saturday'},
  {text: 'SUN', dayFormat: 'Sunday'},
];

export default class CalendarNew extends Component{
  constructor(props){
    super(props);
    this.state = {pressStatus: false};
  }

  buttonTest = () => {
    Alert.alert("Pressed");
    console.log("button pressed");
  }

  render() {
    const renderedButtons = weekDayButtons.map(b => {
      return(<DayButton key={b.text} text={b.text}/>);
    });

    return (
      <View style={styles.container}>
          {renderedButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
});
