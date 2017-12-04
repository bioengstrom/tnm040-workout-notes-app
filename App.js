import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Calendar from './Calendar.js';

console.log("Initiation successful!")

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {text: null , key: moment().format('L')}; // Default key is set to null, change to current date. AA,JP

		this.clearNote = this.clearNote.bind(this);

		this.handleDate = this.handleDate.bind(this);
		this.getPressedDate = this.getPressedDate.bind(this);

		this.handleDate(moment().format('L'));
	}


	getPressedDate(inDate) {
		//console.log("Date of pressed button: " + inDate);
		this.setState({
			key: inDate,
		});

		this.handleDate(inDate);
	}

//Clear current note. AA, JP
	clearNote() {
		AsyncStorage.setItem(/*this.state.key*/ keyVar, ''); //Save the text
			this.setState({text: ''});
		console.log('Text cleared'); //Debugging
	}


	handleDate(inKey) {
		AsyncStorage.getItem(inKey).then(
			(value) => {
				console.log("id " + inKey + " value " + value);
				this.setState({text: value})
			}
		);
	}

//Function to save text. AA,JP
	setTextToSave = (value) => {AsyncStorage.setItem(keyVar, value); //Saves the text
		this.setState({text: value});
	}

  render() {
    return (
      <View style={styles.container}>
			<View style={styles.Nav}>
      		<TouchableOpacity style={styles.logoStyle}>
      			 <Image source={require("./logo.png")}/>
      		</TouchableOpacity>
			</View>
				<Calendar getPressedDate={this.getPressedDate} pressedDate={this.state.key}/>
      		<KeyboardAvoidingView style={styles.noteStyle} behavior={'padding'}>
						<View>
							<Text style={styles.dateStyle}>
								{this.state.key}
							</Text>
						<TextInput style={styles.textInputStyle}
							editable = {true}
							placeholder = {"Log your workout here."}  //Placeholder
							maxLength = {300} //Maximum number of characters
							multiline = {true} //Multiple lines
							numberOfLines = {100} //Only for Android, need to find solution for IOS
							onChangeText = {this.setTextToSave} //{(text) => this.setState({text})}
							value={this.state.text}
							returnKeyType = {'none'}
						/>
						</View>
						<View>
							<View style={styles.buttonStyle}>
								<View style={styles.buttonSaveStyle}>
									<TouchableOpacity onPress={Keyboard.dismiss}>
									  	<Text style={styles.buttonText}>Save</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.buttonClearStyle}>
									<TouchableOpacity onPress={this.clearNote}>
											<Text style={styles.buttonText}>Clear</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
      	</KeyboardAvoidingView>
      </View>
	);
	}
}

const styles = StyleSheet.create({
	textInputStyle: {
		backgroundColor: 'transparent',
		padding: 15,
		fontSize: 20,
		alignSelf: 'stretch',
		marginTop: 10,
	},
	Nav: {
		height: '15%' ,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
	},
  container: {
	    flex: 1,
	    alignItems: 'stretch',
	    justifyContent: 'flex-start',
	    alignSelf: 'stretch',
	    flexDirection: 'column',
  },
  noteStyle: {
	  	flex: 1,
		marginTop: 10,
		paddingTop: 10,
	  	flexDirection: 'column',
	  	justifyContent: 'space-between',
  },
	buttonStyle: {
		backgroundColor: 'white',
		height: 'auto',
		minHeight: '12%',
		width: '100%',
		flexDirection: 'row',
  },
  buttonClearStyle: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(250, 169, 22, 0.7)',
  },
  buttonSaveStyle: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(164, 194, 219, 1.0)',
  },
  buttonText: {
		fontSize: 28,
		textAlign:'center',

  },
  dateStyle: {
		fontSize: 20,
		color: 'rgba(0, 0, 0, 0.3)',
		marginLeft: 15,

  },
  logoStyle: {
		height: 100,
		width: 100,
		alignItems: 'stretch',
		marginTop: 35,
  },
});
