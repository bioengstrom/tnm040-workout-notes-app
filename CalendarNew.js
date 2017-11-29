import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Image, Button, TouchableOpacity, } from 'react-native';
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
      currentButton: moment().format('dddd').substring(0,3).toLowerCase(),
      weekDifference: 0,
    };
  }

/*
  _incrementCount = () => {
     this.setState(prevState => ({ weekDifference: prevState.weekDifference + 1 }));
     // prevState => this.setState({weekDifference: prevState+1})
   }

   _decrementCount = () => {
     this.setState(prevState => ({weekDifference: prevState.weekDifference - 1}));
   }
*/
   _updateWeekDifference = (command) => {
     if(command=='next') this.setState(prevState => ({weekDifference: ++prevState.weekDifference}));
     if(command=='prev') this.setState(prevState => ({weekDifference: --prevState.weekDifference}));
   }

  render() {
    const renderedButtons = weekDayButtons.map(b => {
      return(<DayButton key={b.text} text={b.text} pressed={b.pressed} currentWeek={this.state.weekDifference}/>);
    });

    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.iconContainer]} onPress={() => this._updateWeekDifference('prev')}>
            <Image style={styles.icon} source={require("./left-arrow-black.png")} />
          </TouchableOpacity>
        {renderedButtons}
          <TouchableOpacity style={[styles.iconContainer]} onPress={() => this._updateWeekDifference('next')}>
            <Image style={styles.icon} source={require("./right-arrow-black.png")} />
          </TouchableOpacity>
        </View>
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
    width: 40,
    height: 50,


	},
	icon: {

		resizeMode: "contain",
    height: 20,
    width: 20,

	},
  buttonPrev: {
    marginLeft: 30,
    backgroundColor: 'white',
  },
  buttonNext: {
    marginLeft: -10,
    backgroundColor: 'white',
  },
});
