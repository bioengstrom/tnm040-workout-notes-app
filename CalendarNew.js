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
  {text: 'MON'},
  {text: 'TUE'},
  {text: 'WED'},
  {text: 'THU'},
  {text: 'FRI'},
  {text: 'SAT'},
  {text: 'SUN'},
];

export default class CalendarNew extends Component{
  constructor(props){
    super(props);
    this.state={
      currentButton: moment().format('dddd').substring(0,3).toLowerCase()
    };
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
    //flex: 1
    backgroundColor: '#4682B4',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

});
