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
				<View style={styles.Nav}>
      		<TouchableOpacity onPress={() => this.returnHome()} style={styles.logoStyle}>
      			 <Image source={require("./logo.png")}/>
      		</TouchableOpacity>
				</View>
				<Calendar getPressedDate={this.getPressedDate} pressedDate={this.state.key}/>
      	<KeyboardAvoidingView style={styles.noteStyle} behavior={'padding'}>
						<View>
							<TextInput style={styles.textInputStyle}
								editable = {true}
								placeholder = "Log your workout here..."  //Placeholder
								maxLength = {300} //Maximum number of characters
								multiline = {true} //Multiple lines
								numberOfLines = {100} //Only for Android, need to find solution for IOS
								onChangeText = {this.setTextToSave} //{(text) => this.setState({text})}
								value={this.state.text}
								returnKeyType = {'none'}
							/>
						</View>
						<View style={styles.buttonStyle}>
							<View style={styles.buttonSaveStyle}>
								<TouchableOpacity onPress={Keyboard.dismiss}>
									<View style={styles.clickBox}>
								  	<Text style={styles.buttonText}>Save</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonClearStyle}>
								<TouchableOpacity onPress={this.clearNote}>
									<View style={styles.clickBox}>
										<Text style={styles.buttonText}>Clear</Text>
									</View>
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
	Nav: {
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
		height: '12%',
		minHeight: '5%',
		width: 'auto',
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 15,
  },
  buttonClearStyle: {
		//box style
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#e8e8e3',
		marginLeft: 5,
		marginRight: 10,
		marginBottom: 10,
		marginTop: 10,
		//Shadow style
		borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',// To be changed to backgrounColor
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonSaveStyle: {
		//box style
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(164, 194, 219, 1.0)',
		marginLeft: 10,
		marginRight: 5,
		marginBottom: 10,
		marginTop: 10,
		borderWidth: 1,
		//Shadow style
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd', // To be changed to backgrounColor
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
	},
	clickBox: {
		//Sets size of clickable area for save & clear!
		justifyContent: 'center',
		height: 100,
		margin: 10,
	},
	buttonText: {
		fontSize: 28,
		textAlign:'center',
	}
});
