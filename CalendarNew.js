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
      weekDifference: 0,
    };
  }

  updateWeekDifference = () => {
    ++this.weekDifference;
    () => this.setState({weekDifference: this.weekDifference});

  }

  _incrementCount = () => {
     this.setState(prevState => ({ weekDifference: prevState.weekDifference + 1 }));
     // prevState => this.setState({weekDifference: prevState+1})
   }

   _decrementCount = () => {
     this.setState(prevState => ({weekDifference: prevState.weekDifference - 1}));
   }

  render() {
    const renderedButtons = weekDayButtons.map(b => {
      return(<DayButton key={b.text} text={b.text} pressed={b.pressed} bajs={this.state.weekDifference}/>);
    });

    return (
      <View>
        <View style={styles.container}>
            <TouchableOpacity style={[styles.iconContainer]} onPress={() => this._decrementCount()}>
            <Image source={require("./left-arrow-black.png")} style={styles.icon} />
            </TouchableOpacity>
            {renderedButtons}
            <TouchableOpacity style={[styles.iconContainer]} onPress={() => this._incrementCount()}>
            <Image source={require("./right-arrow-black.png")} style={styles.icon}/>
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
	},
	icon: {
		resizeMode: "contain",
    height: 20,
    width: 20,
	},
});
