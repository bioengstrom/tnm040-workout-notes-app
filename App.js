import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableOpacity} from 'react-native';
//import Note from './notes.js';
import renderIf from './renderIf.js';
import moment from 'moment';
import Calendar from './Calendar.js';

console.log("Initiation successful!")

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {text: null , key: moment().format('L')}; // Default key is set to null, change to current date. AA,JP

		this.clearNote = this.clearNote.bind(this);
/*
		this.handleClick1 = this.handleClick1.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
*/
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

/*
	//OK, but replace '1' with clicked date as variable. AA,JP
	handleClick1() {
		this.setState({key: '1'});
		AsyncStorage.getItem('1').then(
			(value) => {
				console.log("id " + this.state.key + " value " + value);
				this.setState({text: value})
			}
		);
	}

//OK!
	handleClick2() {
		this.setState({key: '2'});
		AsyncStorage.getItem('2').then(
			(value) => {
				console.log("id", '2', "value", value);
				this.setState({text: value})
			}
		);
	}
*/

//Function to save text. AA,JP
	setTextToSave = (value) => {AsyncStorage.setItem(this.state.key, value); //Saves the text
		this.setState({text: value});
	}

  render() {
		//console.log(this.state.key, ' saved with: ', this.state.text);

    return (
      <View style={styles.container}>
				<View style={styles.Nav}>
      		<Text>LOGO</Text>
				</View>
				<Calendar getPressedDate={this.getPressedDate} pressedDate={this.state.key}/>
				{/*<View style={styles.nav}>
					<Button onPress={this.handleClick1} color="black" title='id1'/>
					<Button onPress={this.handleClick2} color="pink" title='id2'/>
				</View>*/}
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
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  noteStyle: {
		borderTopWidth: 1,
		borderColor: '#C7C7CD',
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
