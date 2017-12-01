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

let weekDayButtons = [
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
      currentButton: 'starty',
      weekDifference: 0,
    };
    this.select = this.select.bind(this);
  }

    /*setStartState(){
      if(format().format('dddd').substring(0,3).toLowerCase() ==
    }*/
    updateWeekDifference = (command) => {
     if(command=='next') this.setState(prevState => ({weekDifference: ++prevState.weekDifference}));
     if(command=='prev') this.setState(prevState => ({weekDifference: --prevState.weekDifference}));
    }

    select(hej) {
      console.log(hej);

      this.setState({
        //selected: weather,
        currentButton: hej,

      })
    }

  render() {
    const renderedButtons = weekDayButtons.map((day) => {
      //console.log(day.pressed.toString() + ' ' + day.text.toString());
      //console.log(day.text);
      //console.log(moment().format('dddd').substring(0,3));
      console.log(this.state.currentButton);
      let dagText=day.text.toString().toLowerCase();
      let idag = moment().format('dddd').substring(0,3).toLowerCase();
      if(day.text!=this.state.currentButton) day.pressed=false;
      else day.pressed=true;

      if(this.state.currentButton=='starty') {
        if(dagText==idag) day.pressed=true;
      }

      console.log(day.pressed.toString() + ' ' + dagText + ' ' + idag);

      return(<DayButton key={day.text} text={day.text} pressed={day.pressed} currentWeek={this.state.weekDifference} select={this.select}/>);
    });

    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.iconContainerLeft]} onPress={() => this.updateWeekDifference('prev')}>
            <Image style={styles.icon} source={require("./left-arrow-black.png")} />
          </TouchableOpacity>
        {renderedButtons}
          <TouchableOpacity style={[styles.iconContainerRight]} onPress={() => this.updateWeekDifference('next')}>
            <Image style={styles.icon} source={require("./right-arrow-black.png")} />
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
	iconContainerLeft: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
    width: 50,
    height: 50,
    paddingLeft: 20,

    //backgroundColor: 'black',

	},
  iconContainerRight: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    paddingRight: 20,

    //backgroundColor: 'black',

  },
	icon: {
		resizeMode: "contain",
    height: 20,
    width: 20,
    //backgroundColor: 'white',
	 },
  // buttonPrev: {
  //   marginLeft: 30,
  //   backgroundColor: 'white',
  // },
  // buttonNext: {
  //   marginLeft: -10,
  //   backgroundColor: 'white',
  // },
});
