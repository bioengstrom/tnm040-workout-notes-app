import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';


const startOfWeek=0;
const endOfWeek=6;

export default class MonthAndYear extends Component{
  constructor(props){
    super(props);
  }

  getDate(dayOfWeek){
    return (moment().startOf('isoweek').add(dayOfWeek+(7*this.props.currentWeek),'day'));
  }

  setMonthAndYear(){
    let returnString;

    if(parseInt(this.getDate(startOfWeek).format('D')) > parseInt(this.getDate(endOfWeek).format('D'))){
      returnString = this.getDate(startOfWeek).format('MMM') + " ";
      if(this.getDate(startOfWeek).format('MMM')=='Dec') returnString += this.getDate(startOfWeek).format('YYYY') + " ";
      returnString += "- " + this.getDate(endOfWeek).format('MMM');
    }
    else returnString = this.getDate(startOfWeek).format('MMM');

    returnString += " " + this.getDate(endOfWeek).format('YYYY')

    return returnString; //if the loop isn't working, return "-".
  }

  render(){
    return(
      <View>
        <Text style={styles.testy}>
          {this.setMonthAndYear()}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  testy: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    //alignSelf: 'center',

    marginRight: 40,
    marginBottom: 15,

    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkkhaki',
  },
});
