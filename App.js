import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment'; // 2.18.1
import CalendarStrip from 'react-native-calendar-strip'; // 1.2.1

let datesWhitelist = [
  {
    start: moment().subtract(1000, 'days'),
    end: moment().add(1000, 'days'),// total 4 days enabled
  },
];
/*
let customDatesStyles = [];
let startDate = moment();
customDatesStyles.push({
  dateNameStyle: { color: 'yellow' },
  dateNumberStyle: { color: 'yellow' },
  daySelectionAnimation: {
    type: 'border',
    duration: 200,
    borderWidth: 1,
    borderHighlightColor: 'white',
  },

}); */


export default class Example extends Component {
  render() {
    return (
      <View>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
          //  highlightColor: 'grey',
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          style={{ height: 110, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#4682B4'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: 'yellow' }}
          highlightDateNameStyle={{ color: 'yellow' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          datesWhitelist={datesWhitelist}
          iconContainer={{ flex: 0.1 }}
          todayDateNameStyle={{ color: 'green'}}
          todayDateNumberStyle={{color: 'green'}}
        //  customDatesStyles={customDatesStyles}
        />
        <Text>Hej idag är jag glad</Text>
      </View>
    );
  }
}
