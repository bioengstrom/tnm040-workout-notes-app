import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import moment from 'moment';

export default class MonthDay extends Component{
  constructor(props){
    super(props);
  }

  relativeMonth = () => {
    return moment().add(this.props.relativeMonth, 'month');
  }

  getCurrentLoopDay = () => {
    return this.relativeMonth().startOf('month').startOf('isoweek').add(this.props.weekIndex, 'week').add(this.props.dayIndex,'day');
  }

  relativeMonthDay = () => {
    if(this.getCurrentLoopDay().format('MMM')==this.relativeMonth().format('MMM')) return true;
    return false;
  }

  displayDate = () => {
    return this.getCurrentLoopDay().format('D');
  }

  //Checks wether the button being rendered is today's date.
  highlightToday = () => {
    if(this.getCurrentLoopDay().format('L')==moment().format('L')) return true;
    return false;
  }

  render(){
    return(
      <TouchableOpacity style={[styles.weekDayButton]}>
        <Text style={[styles.dateText, this.highlightToday()?[styles.today]:[this.relativeMonthDay()?[styles.relativeMonthDay]:[styles.notRelativeMonthDay]]]}>
          {this.displayDate()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  notRelativeMonthDay: {
    color: 'gray',
  },
  relativeMonthDay: {
    color: 'black',
  },
  weekDayButton: {
    justifyContent: 'center',
    width: 47.5,
    height: 47.5,
    backgroundColor: 'transparent',
  },
  dateText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notToday:{
    color: 'black',
  },
  today: {
    color: '#6699ff',
  },
});
