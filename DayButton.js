import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert} from 'react-native';
import moment from 'moment';

const roundShapeScale=50;

export default class DayButton extends Component{
  constructor(props){
    super(props);
    this.state={pressStatus: false};
  }
  _onHideUnderlay(){
    this.setState({pressStatus: false});
  }
  _onShowUnderlay(){
    this.setState({pressStatus: true});
  }
  buttonTest = () => {
    let printMessage =this.props.text.toString().toLowerCase();
    Alert.alert(printMessage);
    console.log(moment().format('DD'));
  }

  //Sets a different style (color) for today's button.
  setToday(status, todaysDate){
    let currentWeekDayButton=this.props.text.toString().toLowerCase(); //Creates a comparison string for the current button.
    let currentDay = moment().format('dddd').substring(0,3).toLowerCase(); //Creates a comparison string with the day of today.
    if(todaysDate==moment().format('L')){
      if(status=='pressed') return{color: 'rgba(255, 154, 111, 0.5)',}
      if(status=='notPressed') return{color: 'rgba(255, 154, 111, 1.0)',}
    }
  }
  //Sets the current weeks dates inside the day buttons.
  setDates(returnFormat){
    let currentWeekDayButton=this.props.text.toString().toLowerCase(); //Creates a comparison string for the current button.
    for(let i=0; i < 7; ++i){ //Loops through the current week's dates and matches is with the correct weekday button.
      let currentLoopDay = moment().startOf('isoweek').add(i,'day');
      if(currentWeekDayButton==currentLoopDay.format('dddd').substring(0,3).toLowerCase()) {
        if(returnFormat=='uniqueFormat') return (currentLoopDay.format('L')); //Return a (locally) unique format, that hasn't occurred, or ever will occur again.
        if(returnFormat=='dayNumberFormat') return (currentLoopDay.format('D')); //Return the day number if the weekDay matches the date.
      }
    }
    return ('-'); //if the loop isn't working, return "-".
  }
  render() {
    return(
      <View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.buttonTest}
          style={this.state.pressStatus?styles.weekDayButtonOnPress:styles.weekDayButton}
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
          <Text style={this.state.pressStatus?[styles.weekDayButtonTextOnPress,this.setToday('pressed',this.setDates('uniqueFormat'))]:[styles.weekDayButtonText,this.setToday('notPressed',this.setDates('uniqueFormat'))]}>
            <Text>{this.props.text}{"\n"}</Text>
            <Text style={styles.dateAlign}>{this.setDates('dayNumberFormat')}</Text>
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weekDayButton: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 1.0)',
    backgroundColor: 'transparent',
  },
  weekDayButtonOnPress: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  weekDayButtonText: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1.0)',
    fontSize: 12,

  },
  weekDayButtonTextOnPress: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  dateAlign:{
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
});
