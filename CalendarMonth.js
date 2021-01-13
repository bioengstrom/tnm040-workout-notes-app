import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

import MonthDay from './MonthDay.js';
import moment from 'moment';

const weekDayNamesArray = [{name: 'MON'},{name: 'TUE'},{name: 'WED'},{name: 'THU'},{name: 'FRI'},{name: 'SAT'},{name: 'SUN'}];

export default class CalendarMonth extends Component{
  constructor(props){
    super(props);
  }

  displayMonth = () => {
    return moment().add(this.props.relativeMonth, 'month').format('MMMM');
  }
  displayYear = () => {
    return moment().add(this.props.relativeMonth, 'month').format('YYYY');
  }

  updateMonth = (scrollDirection) => {
    if(scrollDirection=='prev') this.props.getRelativeMonth(--this.props.relativeMonth);
    if(scrollDirection=='next') this.props.getRelativeMonth(++this.props.relativeMonth);
  }

  render(){
    let weekDays = Array(7).fill(0);
    let monthWeeks = Array(6).fill(0);

    const weekDayNames = weekDayNamesArray.map((day) => {
      return(
        <Text key={day.name} style={styles.weekDayNameContainer}>
          {day.name}
        </Text>
      );
    });

    const renderedButtons = weekDays.map((unUsedVar1, dayIndex) => {
      let dayKey = "d"+dayIndex.toString();

      const parallellWeeks = monthWeeks.map((unUsedVar2, weekIndex) => {
        let weekKey = "w"+weekIndex.toString()+dayKey;

        return(
          <View key={weekKey} style={styles.weekBorder}>
            <MonthDay dayIndex={dayIndex} weekIndex={weekIndex} relativeMonth={this.props.relativeMonth}/>
          </View>
        );
      });

      return(
        <View key={dayKey}>
          {parallellWeeks}
        </View>
      );
    });

    return(
      <View style={styles.monthCalendarContainer}>
        <View style={styles.monthSwitchContainer}>
          <TouchableOpacity onPress={() => this.updateMonth('prev')} style={[styles.iconContainer, styles.iconContainerLeft]}>
            <Image style={styles.icon} source={require("./images/chevronLeft.png")}/>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.monthText}>
              {this.displayMonth()}
            </Text>
            <Text style={styles.yearText}>
              {this.displayYear()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.updateMonth('next')} style={[styles.iconContainer, styles.iconContainerRight]}>
            <Image style={styles.icon} source={require("./images/chevronRight.png")}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.weekDayNamesContainer, styles.weekBorder]}>
          {weekDayNames}
        </View>
        <View style={[styles.calendarButtons]}>
          {renderedButtons}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthCalendarContainer: {
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  calendarButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  monthSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  monthText: {
    justifyContent: 'center',
    alignSelf: 'center',

    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  yearText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,

    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  iconContainer: {
    alignSelf: 'center',
    padding: 10,
  },
  iconContainerLeft: {
    marginLeft: 65,
  },
  iconContainerRight: {
    marginRight: 65,
  },
  weekDayNamesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  weekDayNameContainer: {
    justifyContent: 'center',
    width: 47.5,
    marginBottom: 5,

    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Avenir',
  },
  weekBorder: {
    borderBottomWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.4)',
  },
});
