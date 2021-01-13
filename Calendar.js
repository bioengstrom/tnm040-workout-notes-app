import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Text, Image} from 'react-native';
import MonthAndYear from './MonthAndYear.js';
import DayButton from './DayButton.js';

//Values that sets the number of weeks the user can scroll from the week rendered on startup.
const lowLimit = -5200;
const highLimit = 5200;

//Array that are looped through when creating the weekday buttons.
const weekDayButtons = [{name: 'MON'},{name: 'TUE'},{name: 'WED'},{name: 'THU'},{name: 'FRI'},{name: 'SAT'},{name: 'SUN'}];

//exports a render of containing the month(s), year(s) and week calendar and scroll buttons.
export default class Calendar extends Component{
  constructor(props){
    super(props);
  }

  //crement the week dependant on which way the user wants to scroll. If the limit is reached, call an alert.
  relativeWeekUpdate = (scrollDirection) => {
    if(scrollDirection=='prev' && this.props.relativeWeek > lowLimit) this.props.getRelativeWeek(--this.props.relativeWeek);
    else if(scrollDirection=='prev' && this.props.relativeWeek <= lowLimit) this.getScrollAlert(scrollDirection);

    if(scrollDirection=='next' && this.props.relativeWeek < highLimit) this.props.getRelativeWeek(++this.props.relativeWeek);
    else if(scrollDirection=='next' && this.props.relativeWeek >= highLimit) this.getScrollAlert(scrollDirection);
  }

  //Display an alert depending on which scroll limit is reached.
  getScrollAlert = (limit) => {
    let limitText = '';
    if(limit=='prev') limitText = 'Lower scroll limit reached';
    if(limit=='next') limitText = 'Higher scroll limit reached';

    //The user can either stay on the last week and scroll back, or press yes and return to the startup week.
    Alert.alert(
      limitText,
      "Want to go back to the current week?",
      [{text: 'Yes', onPress: () => this.props.getRelativeWeek(0)}, {text: 'Dismiss', style: 'cancel'}],
      {cancelable: false}
    );
  }

  render() {
    const renderedButtons = weekDayButtons.map((day, index) => {
      return(
        <DayButton plannedWorkoutArray={this.props.plannedWorkoutArray} getPressedDateTextField={this.props.getPressedDateTextField} key={day.name} text={day.name} dayIndex={index} getPressedDate={this.props.getPressedDate} pressedDate={this.props.pressedDate} relativeWeek={this.props.relativeWeek}/>
      );
    });

    return(
      <View style={styles.calendar}>
        <MonthAndYear currentWeek={this.props.relativeWeek}/>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.relativeWeekUpdate('prev')} style={[styles.iconContainer, styles.iconContainerLeft]}>
            <Image style={styles.icon} source={require("./images/chevronLeft.png")}/>
          </TouchableOpacity>
          {renderedButtons}
          <TouchableOpacity onPress={() => this.relativeWeekUpdate('next')} style={[styles.iconContainer, styles.iconContainerRight]}>
            <Image style={styles.icon} source={require("./images/chevronRight.png")}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar:{
    borderBottomWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingLeft: 7,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
	iconContainerLeft: {
    paddingLeft: 10,
	},
  iconContainerRight: {
    paddingRight: 27,
  },
	icon: {
		resizeMode: "contain",
    height: 20,
    width: 20,
	},
});
