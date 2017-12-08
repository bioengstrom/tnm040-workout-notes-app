import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Text, Image} from 'react-native';
import MonthAndYear from './MonthAndYear.js';
import DayButton from './DayButton.js';

const lowLimit = -3;
const highLimit = 3;

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
  }

  updateWeekDifference = (argument) => {
    if(argument=='prev' && this.props.weekDifference > lowLimit) this.props.getWeekDifference(--this.props.weekDifference);
    else if(argument=='prev' && this.props.weekDifference <= lowLimit) this.getScrollAlert('lowLimit');

    if(argument=='next' && this.props.weekDifference < highLimit) this.props.getWeekDifference(++this.props.weekDifference);
    else if(argument=='next' && this.props.weekDifference >= highLimit) this.getScrollAlert('highLimit');
  }

  getScrollAlert = (limit) => {
    let limitText = '';
    if(limit=='highLimit') limitText = 'Higher scroll limit reached';
    if(limit=='lowLimit') limitText = 'Lower scroll limit reached';

    Alert.alert(
      limitText,
      "Want to go back to the current week?",
      [{text: 'Yes', onPress: () => this.props.getWeekDifference(0)}, {text: 'Dismiss', style: 'cancel'}],
      {cancelable: false}
    );
  }

  scrollLimitReached = (argument) => {
    if(argument=='low' && this.props.weekDifference <= lowLimit+1) return true;
    if(argument=='high' && this.props.weekDifference >= highLimit-1) return true;

    return false;
  }

  render() {
    const renderedButtons = weekDayButtons.map((day, index) => {
      return(
        <DayButton dotArray={this.props.plannedArray} key={day.text} text={day.text} dayIndex={index} getPressedDate={this.props.getPressedDate} pressedDate={this.props.pressedDate} currentWeek={this.props.weekDifference}/>
      );
    });

    return(
      <View>
        <MonthAndYear currentWeek={this.props.weekDifference}/>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.updateWeekDifference('prev')} style={[styles.iconContainer, styles.iconContainerLeft, this.scrollLimitReached('low')?{opacity: 0.25}:{opacity: 1},]}>
            <Image style={styles.icon} source={require("./images/chevronLeft.png")}/>
          </TouchableOpacity>
          {renderedButtons}
          <TouchableOpacity onPress={() => this.updateWeekDifference('next')} style={[styles.iconContainer, styles.iconContainerRight, this.scrollLimitReached('high')?{opacity: 0.25}:{opacity: 1},]}>
            <Image style={styles.icon} source={require("./images/chevronRight.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
    backgroundColor: 'rgba(0, 0, 0, 0.1)',//'#4682B4',
    //alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    padding: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    //borderBottomWidth: 0.75,
    backgroundColor: 'transparent', //
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
  noFade: {
    opacity: 1,
  },
  fade: {
    opacity: 0.25,
  },

});
