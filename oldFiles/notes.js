import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button, Keyboard, AsyncStorage, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class Note extends React.Component {

	constructor(props) {
		super(props);
		this.state = {text: this.props.text};
	}

	// componentWillReceiveProps(nextProps) {
	// 	this.setState({text: nextProps.text});
	// }

	render() {
		//console.log('texten ', this.state.text);
		return(
			<View>
				<TextInput style={styles.textInputStyle}
					editable = {true}
					placeholder = "Skriv ner ditt pass här."  //Placeholder
					maxLength = {300} //Maximum number of characters
					multiline = {true} //Multiple lines
					numberOfLines = {100} //Only for Android, need to find solution for IOS
					onChangeText = {(text) => this.setState({text})}
					//value={this.state.text} // här vill vi skicka tillbaka texten, för att sedan spara.
					returnKeyType = {'none'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: 'transparent',
    //margin: 5,
    fontSize: 20,
    alignSelf: 'stretch',
    //borderWidth: 1,
    //borderRadius: 4,
  },
});

//Note.propTypes = {id: PropTypes.element.isRequired}
