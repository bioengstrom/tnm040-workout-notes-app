import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import moment from 'moment'; //Version 2.19.3

//exports a render of one of the buttons in the week calendar.
export default class DayButton extends Component{
  constructor(props){
    super(props);
  }

  //returns the date of the current button being rendered.
  getCurrentLoopDay = () => {
    return moment().startOf('isoweek').add(this.props.dayIndex+(7*this.props.relativeWeek),'day');
  }

  //Checks wether the button being rendered is today's date.
  highlightToday = () => {
    if(this.getCurrentLoopDay().format('L')==moment().format('L')) return true;
    return false;
  }

  //Checks wether the button being rendered was pressed during the previous render loop.
  buttonPressed = () => {
    if(this.getCurrentLoopDay().format('L')==this.props.pressedDate) return styles.weekDayButtonOnPress;
    return null;
  }

  //Pass the pressed button's date to App.js, through Calendar.js, two different formats.
  getPressedDate = () => {
    this.props.getPressedDate(this.getCurrentLoopDay().format('L'));
    this.props.getPressedDateTextField(this.getCurrentLoopDay().format("MMM Do YYYY"));
  }

  render(){
    return(
      <TouchableOpacity onPress={this.getPressedDate} style={[styles.weekDayButton, this.buttonPressed()]}>
        <Text style={[styles.buttonText, this.highlightToday()?[styles.today]:[styles.notToday]]}>
          <Text>
            {this.props.text}{"\n"}
          </Text>
          <Text style={styles.dateAlign}>
            {this.getCurrentLoopDay().format('D')}
          </Text>
        </Text>
        <View style={[styles.planningIndicator, this.props.plannedWorkoutArray[this.props.dayIndex]?[styles.planned]:[styles.notPlanned]]}>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  notToday:{
    color: 'black',
  },
  today: {
    color: '#6699ff',
  },
  planningIndicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 2,
    width: 5,
    height: 5,
    borderRadius: 5/2,
  },
  notPlanned: {
    backgroundColor: 'transparent',
  },
  planned: {
    backgroundColor: '#68B24E',
    borderWidth: 0.4,
    borderColor: 'rgba(0,0,0,1)',
  },
  weekDayButton: {
    marginLeft: -7,
    width: 52,
    height: 52,
    borderRadius: 52/2,
    borderWidth: 0.75,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  weekDayButtonOnPress: {
    borderColor: 'rgba(0, 0, 0, 1.0)',
    backgroundColor: 'white',
  },
  buttonText: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 10,
    backgroundColor: 'transparent',
  },
  dateAlign: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
