import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';

const startOfWeek=0;
const endOfWeek=6;

export default class MonthAndYear extends Component{
  constructor(props){
    super(props);
  }

  getDate = (dayOfWeek) => {
    return (moment().startOf('isoweek').add(dayOfWeek+(7*this.props.currentWeek),'day'));
  }

  setMonth = () => {
    if(parseInt(this.getDate(startOfWeek).format('D')) > parseInt(this.getDate(endOfWeek).format('D'))){
      return this.getDate(startOfWeek).format('MMM') + " - " + this.getDate(endOfWeek).format('MMM');
    }
    else return this.getDate(startOfWeek).format('MMMM');
  }

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
      <View style={styles.textContainer}>
        <Text style={styles.monthText}>
          {this.setMonth()}
        </Text>
        <Text style={styles.yearText}>
          {this.setYear()}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  monthText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 25,
  },
  yearText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    //color: 'darkkhaki',
  },
});
