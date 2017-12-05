import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Calendar from './Calendar.js';

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
console.log("Initiation successful!")

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {text: null, key: moment().format('L'), weekDifference: 0}; // Default key is set to null, change to current date. AA,JP

		this.clearNote = this.clearNote.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.getPressedDate = this.getPressedDate.bind(this);
		this.getWeekDifference = this.getWeekDifference.bind(this);
		this.handleDate(moment().format('L'));
	}

	getPressedDate(inDate) {
		this.setState({key: inDate});
		this.handleDate(inDate);
	}

//Clear current note. AA, JP
	clearNote() {
		AsyncStorage.setItem(this.state.key, ''); //Save the text
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
	setTextToSave = (value) => {AsyncStorage.setItem(this.state.key, value); //Saves the text
		this.setState({text: value});
	}

	returnHome = () => {
		this.getPressedDate(moment().format('L'));
		this.setState({weekDifference: 0});
	}

	getWeekDifference(inValue){
		console.log(inValue);
		this.setState({weekDifference: inValue});
	}

  render() {
    return (
      <View style={styles.container}>
				<View style={styles.nav}>
      		<TouchableOpacity onPress={() => this.returnHome()} style={styles.logoStyle}>
      			 <Image source={require("./logo.png")}/>
      		</TouchableOpacity>
				</View>
				<Calendar getPressedDate={this.getPressedDate} pressedDate={this.state.key} getWeekDifference={this.getWeekDifference} weekDifference={this.state.weekDifference}/>
      	<KeyboardAvoidingView style={styles.noteStyle} behavior={'padding'}>
						<View>
							<Text style={styles.dateStyle}>
								{this.state.key}
							</Text>
							<TextInput style={styles.textInputStyle}
								editable = {true}
								placeholder = "Log your workout here..."  //Placeholder
								maxLength = {300} //Maximum number of characters
								multiline = {true} //Multiple lines
								numberOfLines = {100} //Only for Android, need to find solution for IOS
								onChangeText = {this.setTextToSave}
								value={this.state.text}
								returnKeyType = {'none'}
							/>
						</View>
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
	},
	nav: {
		height: '15%' ,
		//backgroundColor: 'rgba(169, 229, 212, 0.5)', To be decieded.
		//marginTop: 10,
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
		width: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: '7%', //Distance: buttons to Keyboard
  },
  buttonClearStyle: {
		//box style
		width: '40%',
		justifyContent: 'center',
		backgroundColor: '#e8e8e3',
		marginLeft: '2.5%',
		//Shadow style
		borderWidth: 1,
    borderRadius: 2,
    borderColor: '#e8e8e3', // To be changed to backgrounColor
    borderBottomWidth: 0,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  buttonSaveStyle: {
		//box style
		width: '40%',
		justifyContent: 'center',
		backgroundColor: 'rgba(164, 194, 219, 1.0)',
		marginRight: '2.5%',
		//Shadow style
		borderWidth: 1,
		borderRadius: 2,
		borderColor: 'rgba(164, 194, 219, 1.0)', // To be changed to backgrounColor
		borderBottomWidth: 0,
		shadowColor: 'grey',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 1,
		elevation: 1,
	},
	buttonText: {
		fontSize: 25,
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
