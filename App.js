import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage, TouchableWithoutFeedback, Text, Image} from 'react-native';
import moment from 'moment'; //Version 2.19.3
import Calendar from './Calendar.js';

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP); //Locks the app in portrait mode.

export default class App extends React.Component {
	constructor(props) {
		super(props);

		//States that are used in this class, and passed as props to the child-classes.
		this.state = {text: null, key: moment().format('L'), textFieldDate: moment().format("MMM Do YYYY"), relativeWeek: 0, plannedWorkoutArray: Array(7).fill(0)};

		//Binds the functions here in the constructor for slight preformance enhancements.
		this.clearNote = this.clearNote.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.getPressedDate = this.getPressedDate.bind(this);
		this.getRelativeWeek = this.getRelativeWeek.bind(this);
		this.setPlannedWorkout = this.setPlannedWorkout.bind(this);

		this.handleDate(moment().format('L'));
    this.setPlannedWorkout(0);
	}

	//Gets which date is pressed, passed to DayButton.js through Calendar.js.
	getPressedDate = (inDate) => {
		this.setState({key: inDate});
		this.handleDate(inDate);
	}

	//Same as getPressedDate, although the inDate is a different format.
	getPressedDateTextField = (inDate) => {
		this.setState({textFieldDate: inDate});
	}

	//Gets the relative week (according to the startup week).
	getRelativeWeek = (relation) => {
		this.setPlannedWorkout(relation);
		this.setState({relativeWeek: relation});
	}

	//Get the value stored in AsyncStorage at the inKey key.
	handleDate = (inKey) => {
		AsyncStorage.getItem(inKey).then(
			(value) => {
				this.setState({text: value});
			}
		);
	}

	//Resets the user to the startup point.
	returnHome = () => {
		this.getPressedDate(moment().format('L'));
		this.setPlannedWorkout(0);
		this.setState({relativeWeek: 0});
	}

	//Save the value to AsyncStorage at the current key.
	saveNote = (value) => {
		AsyncStorage.setItem(this.state.key, value);
		this.setState({text: value});
		this.setPlannedWorkout(this.state.relativeWeek);
	}

	//Clear the value from AsyncStorage at the current key.
	clearNote = () => {
		AsyncStorage.removeItem(this.state.key);
		this.setState({text: null});
		this.setPlannedWorkout(this.state.relativeWeek);
	}

	//An alert given to the user before they clear a value from AsyncStorage.
	getClearAlert = () => {
		Alert.alert(
			'Remove workout?','',
			[{text: 'Yes', onPress: this.clearNote}, {text: 'No', style: 'cancel'}],
			{cancelable: false}
		);
	}

	//Creates an array of all the keys of the relative week.
	createKeyArray = (inValue) => {
    let keyArray = Array(7);
    for(let i=0; i < 7; ++i){ //Loops through the current week's dates and matches is with the correct weekday button.
      let currentLoopDay=moment().startOf('isoweek').add(i+(7*inValue),'day');
      keyArray[i]=currentLoopDay.format('L');
    }
    return keyArray;
  }

	//Check wether the relative week's days have any text stored. Creates an array with the value 1 if it has text, 0 if it hasn't.
	//Then sets the state to this array, which eventually (by passing to Calendar.js -> DayButton.js) decides wether the green dot should be displayed.
	setPlannedWorkout = async (inValue) => {
		//array is used twice for different purposes, instead of declaring new array(7).
		let array = this.createKeyArray(inValue); //The first use of array is to store the 7 keys.
    let values = await AsyncStorage.multiGet(array); //Gets all the values with one call to AsyncStorage.

    for(let i=0; i < 7; ++i){
			//The second use of array is to store 1 or 0.
      if((values[i])[1] != null && (values[i])[1] != '') array[i]=1;
      else array[i]=0;
    }

    this.setState({plannedWorkoutArray: array}); //State is set to array, which now has 1 or 0 as values.
  }

  render() {
    return (
      <View style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.nav}>
    				<TouchableOpacity onPress={() => this.returnHome()} style={styles.logoStyle}>
    			 		<Image source={require("./images/logo.png")}/>
    				</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
				<Calendar plannedWorkoutArray={this.state.plannedWorkoutArray} getPressedDateTextField={this.getPressedDateTextField} getPressedDate={this.getPressedDate} pressedDate={this.state.key} getRelativeWeek={this.getRelativeWeek} relativeWeek={this.state.relativeWeek}/>
      	<KeyboardAvoidingView style={styles.noteStyle} behavior={'padding'}>
					<View style={styles.textField}>
						<Text style={styles.dateStyle}>
							{this.state.textFieldDate}:
						</Text>
						<TextInput style={styles.textInputStyle} editable={true} placeholder={"Log your workout here..."} maxLength={400} multiline={true} numberOfLines={100} onChangeText={this.saveNote} value={this.state.text} returnKeyType={'none'} placeholderColor={'rgba(0, 0, 0, 0.1)'}/>
					</View>
					<View style={styles.buttonStyle}>
						<View style={styles.buttonSaveStyle}>
							<TouchableOpacity onPress={Keyboard.dismiss}>
							  <Text style={styles.buttonText}>Save</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.buttonClearStyle}>
							<TouchableOpacity onPress={this.getClearAlert}>
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
	textField: {
		flex: 1,
	},
	textInputStyle: {
		backgroundColor: 'white',
		padding: 15,
		fontSize: 20,
		alignSelf: 'stretch',
		flex: 1,
		fontFamily: 'Avenir',
		backgroundColor: 'transparent',
	},
	nav: {
		height: '15%',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(0, 0, 0, 0.1)',
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
		paddingTop: 20,
	  	flexDirection: 'column',
	  	justifyContent: 'space-between',
  },
	buttonStyle: {
		width: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: '2.5%',
		marginBottom: '5%', //Distance: buttons to Keyboard
  },
  buttonClearStyle: {
		//box style
		width: '40%',
		justifyContent: 'center',
		backgroundColor: '#dc5f5f',
		marginLeft: '2.5%',
		//Shadow style
		borderWidth: 1,
	    borderRadius: 2,
	    borderColor: '#e8e8e3',
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
		backgroundColor: '#68B24E',
		marginRight: '2.5%',
		//Shadow style
		borderWidth: 1,
		borderRadius: 2,
		borderColor: 'rgba(164, 194, 219, 1.0)',
		borderBottomWidth: 0,
		shadowColor: 'grey',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.8,
		shadowRadius: 1,
		elevation: 1,
	},
	buttonText: {
		fontSize: 25,
		textAlign:'center',
		fontFamily: 'Avenir',
		color: 'black',
	},
	dateStyle: {
		fontSize: 20,
		color: 'grey',
		marginLeft: 15,
		fontFamily: 'Avenir',
 	},
	logoStyle: {
		height: 100,
		width: 100,
		alignItems: 'stretch',
		marginTop: 35,
	},
});
