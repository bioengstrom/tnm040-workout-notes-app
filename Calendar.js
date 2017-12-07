import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import moment from 'moment';
import MonthAndYear from './MonthAndYear.js';
import DayButton from './DayButton.js';

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
    this.state={planned: false};

    this.getPlannedWorkout=this.getPlannedWorkout.bind(this);
  }

  createKeyArray(){
    //let currentWeekDayButton=this.props.text.toString().toLowerCase(); //Creates a comparison string for the current button.
    let keyArray = new Array(7);
    for(let i=0; i < 7; ++i){ //Loops through the current week's dates and matches is with the correct weekday button.
      let currentLoopDay=moment().startOf('isoweek').add(i+(7*this.props.weekDifference),'day');
      keyArray[i]=currentLoopDay.format('L');
    }
    return keyArray;
  }

  async getPlannedWorkout(){
    let valueArray = await AsyncStorage.multiGet(this.createKeyArray());
    weekDayButtons.map( async (day, index) => {
      //console.log(index);

      let currentWeekDayButton=day.text.toString().toLowerCase();
      //for(let i=0; i < 7; ++i){
        let currentLoopDay=moment().startOf('isoweek').add(index+(7*this.props.weekDifference),'day');

        if(currentWeekDayButton==currentLoopDay.format('dddd').substring(0,3).toLowerCase()){
          console.log(valueArray[index][1]);
          if(valueArray[index][1] != null && valueArray[index][1] != ""){
            this.setState({planned: true});
          }
          else{
            this.setState({planned: false});
          }
        }

      //}
    });
  }





  returnToStartWeek = () => {
    if(this.props.returnToStartWeek==true){
      this.props.getWeekDifference(0);

    }
  }
  scrollLimitReached = (argument) => {
    if(argument=='low' && this.props.weekDifference <= lowLimit+1) return true;
    if(argument=='high' && this.props.weekDifference >= highLimit-1) return true;

    return false;
  }

  updateWeekDifference = (argument) => {
    //this.getPlannedWorkout();

    if(argument=='prev' && this.props.weekDifference > lowLimit) {
      this.props.getWeekDifference(--this.props.weekDifference);
    }
    else if(argument=='prev' && this.props.weekDifference <= lowLimit) {
      Alert.alert(
        'Lower scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.props.getWeekDifference(0)}, {text: 'Dismiss', style: 'cancel'}],
        {cancelable: false}
      );
    }

    if(argument=='next' && this.props.weekDifference < highLimit) {
      this.props.getWeekDifference(++this.props.weekDifference);
    }
    else if(argument=='next' && this.props.weekDifference >= highLimit){
      Alert.alert(
        'Higher scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.props.getWeekDifference(0)}, {text: 'Dismiss', style: 'cancel'}],
        {cancelable: false}
      );
    }
  }

  render() {
    //console.log(this.props.weekDifference);
    const renderedButtons = weekDayButtons.map((day) => {
      return(
        <DayButton key={day.text} text={day.text} getPressedDate={this.props.getPressedDate} pressedDate={this.props.pressedDate} currentWeek={this.props.weekDifference} planned={this.state.planned}/>
      );
    });

    return(
      <View>
        <MonthAndYear currentWeek={this.props.weekDifference}/>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.updateWeekDifference('prev')} style={[styles.iconContainer, styles.iconContainerLeft, this.scrollLimitReached('low')?{opacity: 0.25}:{opacity: 1},]}>
            <Image style={styles.icon} source={require("./chevrons/chevronLeft.png")}/>
          </TouchableOpacity>
          {renderedButtons}
          <TouchableOpacity onPress={() => this.updateWeekDifference('next')} style={[styles.iconContainer, styles.iconContainerRight, this.scrollLimitReached('high')?{opacity: 0.25}:{opacity: 1},]}>
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
  noFade: {
    opacity: 1,
  },
  fade: {
    opacity: 0.25,
  },

});
