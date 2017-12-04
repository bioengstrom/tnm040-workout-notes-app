import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableOpacity} from 'react-native';
//import Note from './notes.js';
import renderIf from './renderIf.js';
import Calendar from './Calendar.js';
import CalendarNew from './CalendarNew.js';

console.log("Initiation successful!")

//var myKey = "1";

export default class App extends React.Component {

	constructor(props) {
		super();
		this.state = {text: null , key: '0'}; // Default key is set to null, change to current date. AA,JP
		this.clearNote = this.clearNote.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
	}

//Clear current note. AA, JP
	clearNote() {
		AsyncStorage.setItem(this.state.key, ''); //Save the text
			this.setState({text: ''});
		console.log('Text cleared'); //Debugging
	}

//OK, but replace '1' with clicked date as variable. AA,JP
	handleClick1() {
		this.setState({key: '1'});
		AsyncStorage.getItem('1').then(
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
					<CalendarNew/>
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
		height: 'auto',
		minHeight: '12%',
		width: '100%',
		flexDirection: 'row',
		//justifyContent: 'center',
		//alignSelf:'center',
  },
  buttonClearStyle: {

//Option 1
		// borderRadius: 10,
		// marginLeft: 5,
		// marginRight: 10,
		// marginBottom: 10,



		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#e8e8e3',
		//backgroundColor: '#C7C7CD',
		//backgroundColor: 'rgba(250, 169, 22, 0.7)',
		//backgroundColor: 'rgba(164, 194, 219, 1.0)',
  },
  buttonSaveStyle: {

	//Option 1
		// borderRadius: 10,
		// marginLeft: 10,
		// marginRight: 5,
		// marginBottom: 10,

		flex: 1,
		justifyContent: 'center',
		//backgroundColor: '#4eca6d',
		backgroundColor: 'rgba(164, 194, 219, 1.0)',
		//backgroundColor: 'rgba(78, 202, 78, 0.7)',

	},
	clickBox: {
		//Sets size of clickable area, set a backgroundColor to check! JP
		justifyContent: 'center',
		height: 100,
		margin: 10,

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
