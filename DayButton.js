import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Button, Alert} from 'react-native';
import moment from 'moment';

const roundShapeScale=50;

export default class DayButton extends Component{
  constructor(props){
    super(props);
    this.state={pressStatus: false};
  }
  _onHideUnderlay(){
    this.setState({pressStatus: false});
  }
  _onShowUnderlay(){
    this.setState({pressStatus: true});
  }
  buttonTest = () => {
    let printMessage =this.props.text.toString().toLowerCase();
    Alert.alert(printMessage);
    console.log(moment().format('DD'));
  }

  setDates(){
    for(let i=0; i < 7; ++i){
      if(this.props.text.toString().toLowerCase()==moment().startOf('isoweek').add(i,'day').format('dddd').substring(0,3).toLowerCase()) {
        return (moment().startOf('isoweek').add(i,'day').format('D'));
      }
    }
    return ('-');
  }
  render() {
    return(
      <View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={this.buttonTest}
          style={this.state.pressStatus?styles.weekDayButtonOnPress:styles.weekDayButton}
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
          <View>
            <Text style={this.state.pressStatus?styles.weekDayButtonTextOnPress:styles.weekDayButtonText}>{this.props.text}</Text>
            <Text style={[this.state.pressStatus?styles.weekDayButtonTextOnPress:styles.weekDayButtonText, styles.dateAlign]}>{this.setDates()}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weekDayButton: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  weekDayButtonOnPress: {
    width: roundShapeScale,
    height: roundShapeScale,
    borderRadius: roundShapeScale/2,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'transparent',
  },
  weekDayButtonText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  weekDayButtonTextOnPress: {
    marginTop: 5,
    textAlign: 'center',
    color: 'grey',
    fontSize: 12,
  },
  dateAlign:{
    alignSelf: 'center',
  }

});
