import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import moment from 'moment';

export default class DayButton extends Component{
  constructor(props){
    super(props);
  }

  //Sets the current week's dates inside the day buttons.
  setDates = (returnFormat) => {
    let currentWeekDayButton=this.props.text.toString().toLowerCase(); //Creates a comparison string for the current button.

    for(let i=0; i < 7; ++i){ //Loops through the current week's dates and matches is with the correct weekday button.
      let currentLoopDay=moment().startOf('isoweek').add(i+(7*this.props.currentWeek),'day');//moment().format('s ss')

      if(currentWeekDayButton==currentLoopDay.format('dddd').substring(0,3).toLowerCase()) {
        if(returnFormat=='uniqueFormat') return (currentLoopDay.format('L')); //Return a (locally) unique format, that hasn't occurred, or ever will occur again.
        if(!returnFormat) return (currentLoopDay.format('D')); //Return the day number if the weekDay matches the date.
      }
    }

    return ('-'); //if the loop isn't working, return "-".
  }

  //Sets a different style for today's button.
  highlightToday = (status) => {
    let todaysDate=this.setDates('uniqueFormat');

    if(todaysDate==moment().format('L')){
      if(status=='pressed') return{color: 'rgba(0, 0, 0, 1.0)',};
      if(status=='notPressed') return{color: 'rgba(255, 154, 111, 1.0)',};
    }
  }

  buttonPressed = () => {
    if(this.props.pressedDate==this.setDates('uniqueFormat')) return true;
    return false;
  }


  async workoutPlanned() {
    await AsyncStorage.getItem(this.setDates('uniqueFormat')).then(
      (value) => {
        if(value != '' && value != null){
          console.log(value + ' ' + this.setDates('uniqueFormat') + ' true');
          return true;
        }
        else {
          console.log(value + ' ' + this.setDates('uniqueFormat') + ' false');
          return false;
        }
			}
    ).done();
  }

  render(){
    const getPressedDate = () => {
      this.props.getPressedDate(this.setDates('uniqueFormat'));
    }

    return(
      <TouchableOpacity onPress={getPressedDate} style={this.buttonPressed()?[styles.weekDayButton, styles.weekDayButtonOnPress]:styles.weekDayButton}>
        <Text style={[styles.buttonText, this.buttonPressed()?[styles.buttonTextOnPress,this.highlightToday('pressed')]:[this.highlightToday('notPressed')]]}>
          <Text>
            {this.props.text}{"\n"}
          </Text>
          <Text style={styles.dateAlign}>
            {this.setDates()}
          </Text>
        </Text>
        <View style={[styles.planningIndicator, this.workoutPlanned()?styles.notPlanned:styles.planned]}>
        </View>
      </TouchableOpacity>
    );
  }
}

const roundShapeScale=45;
const styles = StyleSheet.create({
  planningIndicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 3,
    width: 4,
    height: 4,
    borderRadius: 4/2,
    //backgroundColor: 'olive',
  },
  notPlanned: {
    backgroundColor: 'red',
  },
  planned: {
    backgroundColor: 'grey',
  },
  weekDayButton: {
    width: roundShapeScale,
    height: roundShapeScale+7.5,
    borderColor: 'rgba(0, 0, 0, 1.0)',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 0.75,
  },
  weekDayButtonOnPress: {
    borderTopWidth: 0.75,
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 0,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  buttonText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1.0)',
    backgroundColor: 'transparent',
  },
  buttonTextOnPress: {
    color: 'rgba(0, 0, 0, 1.0)',
  },
  dateAlign:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
