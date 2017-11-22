import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Keyboard, KeyboardAvoidingView} from 'react-native';
import Note from './notes.js';
import renderIf from './renderIf.js';
import Calendar from './Calendar.js';
import CalendarNew from './CalendarNew.js';

console.log("Initiation successful!")

export default class App extends React.Component {

	constructor(props) {
		super();
		this.state = {noteText: '', visibility: false, id: new Date()};
		this.clearNote = this.clearNote.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	clearNote() {
		this.setState({noteText: ''});
		console.log('Text cleared')
		console.log(this.state.id.toString()) //Debugging
	}

	handleClick() {
		this.setState({visibility: !this.state.visibility});
		console.log('Toggle status ' + this.state.visibility)
		console.log('noteText = ' + this.state.noteText)
	}

  render() {
    return (
      <View style={styles.container}>
      <Calendar/>
			<CalendarNew/>
      	<KeyboardAvoidingView style={styles.noteStyle}>
      			<Note text={this.state.noteText} id={this.state.id}/>
      			<View style={styles.buttonStyle}>
			   		<View style={styles.buttonSaveStyle}>
			   			<Button onPress={Keyboard.dismiss} color="#ffffff" title='Spara'/>
		      		</View>
		      		<View style={styles.buttonClearStyle}>
		     			<Button onPress={this.clearNote} color="#ffffff" title='Rensa'/>
	      			</View>
	      		</View>
      	</KeyboardAvoidingView>
      </View>
	);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },

  noteStyle: {
  	backgroundColor: 'rgb(60, 180, 115)',
  	height: '75%',
  	flexDirection: 'column',
  	alignItems: 'center',
  	justifyContent: 'space-between',
  	alignSelf: 'stretch',
  },

  buttonClearStyle: {
 	backgroundColor: 'rgb(240, 70, 70)',
  },

  buttonSaveStyle: {
 	backgroundColor: '#3399ff',
  },

  buttonStyle: {
 	height: 'auto',
  	alignSelf: 'stretch',
  }
});
