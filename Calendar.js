import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import MonthAndYear from './MonthAndYear.js';
import DayButton from './DayButton.js';

/*
let validDates = [
  {
    start: moment().subtract(1000, 'days'),
    end: moment().add(1000, 'days')
  }
];
*/
const lowLimit = -520;
const highLimit = 520;

const weekDayButtons = [
  {text: 'MON'},
  {text: 'TUE'},
  {text: 'WED'},
  {text: 'THU'},
  {text: 'FRI'},
  {text: 'SAT'},
  {text: 'SUN'},
];

export default class Calendar extends Component{
  constructor(props){
    super(props);
    this.state={
      weekDifference: 0,
    };
  }

  updateWeekDifference = (command) => {
    if(command=='next' && this.state.weekDifference < highLimit) this.setState(prevState => ({weekDifference: ++prevState.weekDifference}));
    if(command=='prev' && this.state.weekDifference > lowLimit) this.setState(prevState => ({weekDifference: --prevState.weekDifference}));
  }

  render() {
    const renderedButtons = weekDayButtons.map((day) => {
      return(<DayButton key={day.text} text={day.text} getPressedDate={this.props.getPressedDate} pressedDate={this.props.pressedDate} currentWeek={this.state.weekDifference}/>);
    });

    return(
      <View>
        <MonthAndYear currentWeek={this.state.weekDifference}/>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.iconContainer, styles.iconContainerLeft]} onPress={() => this.updateWeekDifference('prev')}>
            <Image style={styles.icon} source={require("./chevrons/chevronLeft.png")}/>
          </TouchableOpacity>
          {renderedButtons}
          <TouchableOpacity style={[styles.iconContainer, styles.iconContainerRight]} onPress={() => this.updateWeekDifference('next')}>
            <Image style={styles.icon} source={require("./chevrons/chevronRight.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
    //backgroundColor: 'rgba(255, 255, 255, 1.0)',//'#4682B4',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
  },
	iconContainerLeft: {
    paddingLeft: 20,
	},
  iconContainerRight: {
    paddingRight: 20,
  },
	icon: {
		resizeMode: "contain",
    height: 20,
    width: 20,
	 },
});
