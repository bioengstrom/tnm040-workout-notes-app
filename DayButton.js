import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

// https://stackoverflow.com/questions/34815382/react-unselect-from-list-while-selecting-another-item
export default class DayButton extends Component{
  constructor(props){
    super(props);
  }

  //To be deleted, logging button presses.
  buttonTest = () => {
    let printMessage=this.props.text.toString().toLowerCase();
    Alert.alert(printMessage);
    console.log(moment().format('DD'));
    Alert.alert(this.props.bro);
  }

  //Sets the current weeks dates inside the day buttons.
  setDates(returnFormat){
    let currentWeekDayButton=this.props.text.toString().toLowerCase(); //Creates a comparison string for the current button.
    for(let i=0; i < 7; ++i){ //Loops through the current week's dates and matches is with the correct weekday button.
      let currentLoopDay = moment().startOf('isoweek').add(i+(7*this.props.currentWeek),'day');//moment().format('s ss')
      if(currentWeekDayButton==currentLoopDay.format('dddd').substring(0,3).toLowerCase()) {
        if(returnFormat=='uniqueFormat') return (currentLoopDay.format('L')); //Return a (locally) unique format, that hasn't occurred, or ever will occur again.
        if(!returnFormat) return (currentLoopDay.format('D')); //Return the day number if the weekDay matches the date.
      }
    }
    return ('-'); //if the loop isn't working, return "-".
  }

  //Sets a different style (color) for today's button.
  highlightToday(status){
    let todaysDate=this.setDates('uniqueFormat');
    if(todaysDate==moment().format('L')){
      if(status=='pressed') return{color: 'rgba(0, 0, 0, 1.0)',};
      if(status=='notPressed') return{color: 'rgba(255, 154, 111, 1.0)',};
    }
  }

  render() {
    const select = () => {
      this.props.select(this.props.text);
    }

    return(
      <View>
        <TouchableOpacity onPress={select}>
          <View style={this.props.pressed?[styles.weekDayButton, styles.weekDayButtonOnPress]:styles.weekDayButton}>
            <Text style={[styles.buttonText, this.props.pressed?[styles.buttonTextOnPress,this.highlightToday('pressed')]:[this.highlightToday('notPressed')]]}>
              <Text>{this.props.text}{"\n"}</Text>
              <Text style={styles.dateAlign}>{this.setDates()}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const roundShapeScale=50;
const styles = StyleSheet.create({
  weekDayButton: {
    marginLeft: -5,
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 0.75,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  weekDayButtonOnPress: {
    borderColor: 'rgba(255, 255, 255, 1.0)',
  },
  buttonText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 1.0)',
  },
  buttonTextOnPress: {
    color: 'rgba(0, 0, 0, 1.0)',
  },
  dateAlign:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
