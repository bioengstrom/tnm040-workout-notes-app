import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Button, Alert} from 'react-native';
import moment from 'moment';

// https://stackoverflow.com/questions/34815382/react-unselect-from-list-while-selecting-another-item
export default class DayButton extends Component{
  constructor(props){
    super(props);
    this.state={
      pressStatus: this.setInitialState()
    };
  }

  setInitialState(){
    if(this.props.text.toString().toLowerCase()==moment().format('dddd').substring(0,3).toLowerCase()) return true;
    else return false;
  }

  _onPress(){
    //this.setState({pressStatus: true);
    this.setState({pressStatus: !this.state.pressStatus}); //to be removed
  }

  _offPress(){
    this.setState({pressStatus: false});
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
      let currentLoopDay = moment().startOf('isoweek').add(i,'day');
      if(currentWeekDayButton==currentLoopDay.format('dddd').substring(0,3).toLowerCase()) {
        if(returnFormat=='uniqueFormat') return (currentLoopDay.format('L')); //Return a (locally) unique format, that hasn't occurred, or ever will occur again.
        if(returnFormat=='dayNumberFormat') return (currentLoopDay.format('D')); //Return the day number if the weekDay matches the date.
      }
    }
    return ('-'); //if the loop isn't working, return "-".
  }

  //Sets a different style (color) for today's button.
  highlightToday(status){
    let todaysDate=this.setDates('uniqueFormat')
    if(todaysDate==moment().format('L')){
      if(status=='pressed') return{color: 'rgba(0, 0, 0, 1.0)',}
      if(status=='notPressed') return{color: 'rgba(255, 154, 111, 1.0)',}
    }
  }
  parentFunction = () => {
    //this.pressedButton();
    //this.buttonTest();
    this._onPress.bind(this);
  }
  pressedButton(){
    return(style={color: 'rgba(0, 0, 0, 1.0)'})
  }
  render() {
    return(
      <View>
        <TouchableOpacity

          onPress={this._onPress.bind(this)}
          onPressOut={() => this.setState({pressStatus: false})}
        >
          <View style={[this.state.pressStatus?styles.weekDayButtonOnPress:styles.weekDayButton]}>
            <Text style={this.state.pressStatus?[styles.weekDayButtonTextOnPress,this.highlightToday('pressed')]:[styles.weekDayButtonText,this.highlightToday('notPressed')]}>
              <Text>{this.props.text}{"\n"}</Text>
              <Text style={styles.dateAlign}>{this.setDates('dayNumberFormat')}</Text>
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
    marginLeft: -5,
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 0.75,
    borderColor: 'rgba(255, 255, 255, 1.0)',
    backgroundColor: 'transparent',
  },
  weekDayButtonText: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1.0)',
    fontSize: 10,

  },
  weekDayButtonTextOnPress: {
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1.0)',
    fontSize: 10,
  },
  dateAlign:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
