import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';
import MonthAndYear from './MonthAndYear.js';
import DayButton from './DayButton.js';

const lowLimit = -5200;
const highLimit = 5200;

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

  scrollLimitReached = (argument) => {
    if(argument=='low' && this.state.weekDifference <= lowLimit+1) return true;
    if(argument=='high' && this.state.weekDifference >= highLimit-1) return true;

    return false;
  }

  updateWeekDifference = (argument) => {
    //if(argument=='prev' && this.state.weekDifference > lowLimit) this.setState(prevState => ({weekDifference: --prevState.weekDifference}));
    //if(argument=='next' && this.state.weekDifference < highLimit) this.setState(prevState => ({weekDifference: ++prevState.weekDifference}));

    if(argument=='prev' && this.state.weekDifference > lowLimit) this.setState({weekDifference: --this.state.weekDifference});
    else if(argument=='prev' && this.state.weekDifference <= lowLimit) {
      Alert.alert(
        'Lower scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.setState({weekDifference: 0})}, {text: 'Dismiss', style: 'cancel'}],
        {cancelable: false}
      );
    }

    if(argument=='next' && this.state.weekDifference < highLimit) this.setState({weekDifference: ++this.state.weekDifference});
    else if(argument=='next' && this.state.weekDifference >= highLimit){
      Alert.alert(
        'Higher scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.setState({weekDifference: 0})}, {text: 'Dismiss', style: 'cancel'}],
        {cancelable: false}
      );
    }


    //if(this.state.weekDifference <= lowLimit+1) this.setState({weekDifference: lowLimit});

    //console.log(this.state.weekDifference);
    /*
    if(this.scrollLimitReached('low')){
      Alert.alert(
        'Lower scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.setState({weekDifference: 0})}, {text: 'No'}],
        { cancelable: false }
      );
    }
    if(this.scrollLimitReached('high')){
      Alert.alert(
        'Higher scroll limit reached',
        "Want to go back to the current week?",
        [{text: 'Yes', onPress: () => this.setState({weekDifference: 0})}, {text: 'No'}],
        { cancelable: false }
      );
    }
    */


  }

  render() {
    console.log(this.state.weekDifference);
    const renderedButtons = weekDayButtons.map((day) => {
      return(<DayButton key={day.text} text={day.text} getPressedDate={this.props.getPressedDate} pressedDate={this.props.pressedDate} currentWeek={this.state.weekDifference}/>);
    });

    return(
      <View>
        <MonthAndYear currentWeek={this.state.weekDifference}/>
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
