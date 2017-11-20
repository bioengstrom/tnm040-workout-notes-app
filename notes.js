import React, {Component} from 'react';
import {TextInput, View, Button, Keyboard, AsyncStorage, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class Note extends React.Component {

	constructor(props) {
		super(props);
		this.state = {text: this.props.text, visibility: this.props.visibility, id: this.props.id/*VARIABLE FROM CALENDAR*/ };
		this.removeNote = this.removeNote.bind(this); //Binds the removeNote function
		//this.handleClick = this.handleClick.bind(this); //Binds the handleClick function
	}

	componentDidMount = () => { //Triggers the save function setTextToSave
		AsyncStorage.getItem('text').then((value)=>this.setState({'text': value}));
	}

	setTextToSave = (value) => {AsyncStorage.setItem('text', value); //Saves the text
		this.setState({'text': value});
	}

	removeNote() { //Examplary function, to be implemented later
	}

	componentWillReceiveProps(nextProps) {
		this.setState({text: nextProps.text}); //Updates text
	}

	render() {
		return(
			<View>
				<TextInput style={{alignSelf: 'stretch',}}
					editable = {true}
					placeholder = "Skriv ner ditt pass här."  //Placeholder
					maxLength = {300} //Maximum number of characters
					multiline = {true} //Multiple lines
					numberOfLines = {100} //Only for Android, need to find solution for IOS
					onChangeText = {this.setTextToSave}
					value={this.state.text}
					returnKeyType = {'done'}
				/>
			</View>
		);
	}
}

//Note.propTypes = {id: PropTypes.element.isRequired}
Note.defaultProps = {id: null}