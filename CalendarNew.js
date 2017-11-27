import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, } from 'react-native';
import moment from 'moment';
import DayButton from './DayButton.js';

let validDates = [
  {
    start: moment().subtract(1000, 'days'),
    end: moment().add(1000, 'days')
  }
];

nextWeek {
  return 7;
}


const weekDayButtons = [
  {text: 'MON', pressed: false},
  {text: 'TUE', pressed: false},
  {text: 'WED', pressed: false},
  {text: 'THU', pressed: false},
  {text: 'FRI', pressed: false},
  {text: 'SAT', pressed: false},
  {text: 'SUN', pressed: false},
];

export default class CalendarNew extends Component{
  constructor(props){
    super(props);
    this.state={
      currentButton: moment().format('dddd').substring(0,3).toLowerCase(),
    };
  }

  render() {
    const renderedButtons = weekDayButtons.map(b => {
      return(<DayButton key={b.text} text={b.text} pressed={b.pressed}/>);
    });

    return (
      <View style={styles.container}>
          <TouchableOpacity style={[styles.iconContainer]}>
          <Image source={require("./left-arrow-black.png")} style={styles.icon}/>
          </TouchableOpacity>
          {renderedButtons}
          <TouchableOpacity style={[styles.iconContainer]}>
          <Image source={require("./right-arrow-black.png")} style={styles.icon}/>
          </TouchableOpacity>
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

	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	icon: {
		resizeMode: "contain",
    height: 20,
    width: 20,
	}

});
