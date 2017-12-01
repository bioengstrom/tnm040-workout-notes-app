import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableOpacity} from 'react-native';
//import Note from './notes.js';
import renderIf from './renderIf.js';
import Calendar from './Calendar.js';
import CalendarNew from './CalendarNew.js';

import moment from 'moment';

console.log("Initiation successful!")

//var myKey = "1";

export default class App extends React.Component {

	constructor(props) {
		super();
		this.state = {text: null , key: moment().format('L')}; // Default key is set to null, change to current date. AA,JP
		this.clearNote = this.clearNote.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);

		this.getPressedDate = this.getPressedDate.bind(this);
	}

	getPressedDate(inDate) {
		console.log("hi " + inDate);

		this.setState({
			key: inDate,
		})
	}

//Clear current note. AA, JP
	clearNote() {
		AsyncStorage.setItem(this.state.key, ''); //Save the text
			this.setState({text: ''});
		console.log('Text cleared'); //Debugging
	}
//this.setState(prevState => ({weekDifference: ++prevState.weekDifference}));
//OK, but replace '1' with clicked date as variable. AA,JP
	handleClick1() {
		this.setState({key: '1'});
		AsyncStorage.getItem({key: '1'}).then(
			(value) => {
				console.log("id", this.state.key, "value", value);
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

//Function to save text. AA,JP
	setTextToSave = (value) => {AsyncStorage.setItem(this.state.key, value); //Saves the text
		this.setState({text: value});
	}

  render() {
		console.log(this.state.key, ' saved with: ', this.state.text);

    return (
      <View style={styles.container}>
				<View style={styles.Nav}>
      		<Text>LOGO</Text>
				</View>
					<CalendarNew getPressedDate={this.getPressedDate} sendPressedDate={this.state.key}/>
				{/*<View style={styles.nav}>
					<Button onPress={this.handleClick1} color="#ffffff" title='id1'/>
					<Button onPress={this.handleClick2} color="#ffffff" title='id2/>'
				</View>*/}
      	<KeyboardAvoidingView style={styles.noteStyle} behavior={'padding'}>
			{/*<Note text={this.state.text} id={this.state.key}>*/}
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
									{/*<View style={styles.buttonSaveStyle}>*/}
								  	<Text style={styles.buttonText}>Save</Text>
									{/*</View>*/}
								</TouchableOpacity>
							</View>
							<View style={styles.buttonClearStyle}>
								<TouchableOpacity onPress={this.clearNote}>
									{/*<View style={styles.buttonClearStyle}>*/}
										<Text style={styles.buttonText}>Clear</Text>
									{/*</View>*/}
								</TouchableOpacity>
							</View>
						</View>


      			{/*<View style={styles.buttonStyle}>
			   		<View style={styles.buttonSaveStyle}>
			   			<Button onPress={Keyboard.dismiss} color="#ffffff" title='Spara'/>
		      	</View>
		      	<View style={styles.buttonClearStyle}>
		     			<Button onPress={this.clearNote} color="#ffffff" title='Rensa'/>
	      		</View>
	      	</View>*/}
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
		//borderWidth: 1,
		//borderRadius: 4,
	},
	Nav: {
		height: '15%' ,
		//backgroundColor: 'rgba(169, 229, 212, 0.5)',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
  container: {
    flex: 1,
    //backgroundColor: 'red',
		//backgroundColor: 'rgba(169, 229, 212, 0.4)',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  noteStyle: {
  	//backgroundColor: '#A9E5D4',
		borderTopWidth: 1,
		borderColor: '#C7C7CD',
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
		//justifyContent: 'center',
		//alignSelf:'center',
  },
  buttonClearStyle: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(250, 169, 22, 0.7)',
		//backgroundColor: 'rgba(164, 194, 219, 1.0)',
  },
  buttonSaveStyle: {
		flex: 1,
		justifyContent: 'center',
		//backgroundColor: '#4eca6d',
		backgroundColor: 'rgba(164, 194, 219, 1.0)',
		//backgroundColor: 'rgba(78, 202, 78, 0.7)',
	},
	buttonText: {
		fontSize: 28,
		textAlign:'center',

	}
});

//////////////////////////////////////////
//Old code, to be removed!
	// componentDidMount = () => { //Triggers the save function setTextToSave
	// 	AsyncStorage.getItem(this.state.key).then(
	// 		(value) => {
	// 			console.log("id", this.state.key, "value", value);
	// 			this.setState({text: value})
	// 		}
	// 	);
	// }

//Old code, to be removed!
	// componentWillReceiveProps(nextProps) {
	// 	AsyncStorage.getItem(this.state.key).then(
	// 		(value) => {
	// 			console.log('id', this.state.key, 'value', value);
	// 			this.setState({text: value})
	// 		}
	// 	);
	// }
