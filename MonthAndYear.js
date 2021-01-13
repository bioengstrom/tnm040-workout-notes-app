import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import moment from 'moment'; //Version 2.19.3

//Values used to check if the end of the week is a different month/year than the start of the week.
const startOfWeek=0;
const endOfWeek=6;

//exports a render with the year(s) and month(s) of the current week.
export default class MonthAndYear extends Component{
  constructor(props){
    super(props);
  }

  //Get the date of a week day of a certain week.
  getDate = (dayOfWeek) => {
    return (moment().startOf('isoweek').add(dayOfWeek+(7*this.props.currentWeek),'day'));
  }

  //Sets the month(s) string used in the render.
  setMonth = () => {
    if(parseInt(this.getDate(startOfWeek).format('D')) > parseInt(this.getDate(endOfWeek).format('D'))){
      return this.getDate(startOfWeek).format('MMM') + " - " + this.getDate(endOfWeek).format('MMM');
    }
    else return this.getDate(startOfWeek).format('MMMM');
  }

  //Sets the year(s) string used in the render.
  setYear = () => {
    let yearString = "";
    if(parseInt(this.getDate(startOfWeek).format('D')) > parseInt(this.getDate(endOfWeek).format('D'))){
      if(this.getDate(startOfWeek).format('MMM')=='Dec') yearString = this.getDate(startOfWeek).format('YYYY') + " - ";
    }
    yearString += this.getDate(endOfWeek).format('YYYY')

    return yearString;
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.textContainer}>
          <Text style={styles.monthText}>
            {this.setMonth()}
          </Text>
          <Text style={styles.yearText}>
            {this.setYear()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  monthText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 25,
    backgroundColor:'transparent',
    fontFamily: 'Avenir',
  },
  yearText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Avenir',
  },
});
