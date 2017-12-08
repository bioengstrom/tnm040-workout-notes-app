import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import moment from 'moment';

export default class DayButton extends Component{
  constructor(props){
    super(props);
  }

  getCurrentLoopDay = () => {
    return moment().startOf('isoweek').add(this.props.dayIndex+(7*this.props.currentWeek),'day');
  }

  highlightToday = () => {
    if(this.getCurrentLoopDay().format('L')==moment().format('L')) return true;
    return false;
  }

  buttonPressed = () => {
    if(this.getCurrentLoopDay().format('L')==this.props.pressedDate) return styles.weekDayButtonOnPress;
    return null;
  }

  getPressedDate = () => {
    this.props.getPressedDate(this.getCurrentLoopDay().format('L'));
  }

  render(){
    return(
      <TouchableOpacity onPress={this.getPressedDate} style={[styles.weekDayButton, this.buttonPressed()]}>
        <Text style={[styles.buttonText, styles.buttonTextOnPress, this.highlightToday()?{color: '#dc5f5f'}:{color: 'black'}]}>
          <Text>
            {this.props.text}{"\n"}
          </Text>
          <Text style={styles.dateAlign}>
            {this.getCurrentLoopDay().format('D')}
          </Text>
        </Text>
        <View style={[styles.planningIndicator, (this.props.dotArray[this.props.dayIndex])?styles.planned:styles.notPlanned]}>
        </View>
      </TouchableOpacity>
    );
  }
}

const roundShapeScale=45;
const styles = StyleSheet.create({
  emptyStyle: {
  },
  planningIndicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 3,
    width: 4,
    height: 4,
    borderRadius: 4/2,
  },
  notPlanned: {
    backgroundColor: 'transparent',
    //backgroundColor: 'black',
  },
  planned: {
    backgroundColor: '#68B24E',
  },
  weekDayButton: {
    width: roundShapeScale,
    height: roundShapeScale+7.5,
    borderColor: 'rgba(0, 0, 0, 1.0)',
    backgroundColor: 'transparent',
    marginBottom: -1,
  },
  weekDayButtonOnPress: {
    borderWidth: 0.75,
    borderBottomColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  buttonText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1.0)',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir',
  },
  buttonTextOnPress: {
    //color: 'rgba(0, 0, 0, 1.0)',
  },
  dateAlign:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
