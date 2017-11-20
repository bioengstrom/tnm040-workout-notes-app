import React, {Component} from 'react';
import {AsyncStorage, Text, View, TextInput, StyleSheet} from 'react-native';
import Note from './notes.js';

export default class Save extends React.Component {
		state = {'textToSave': ''}

		componentDidMount = () => 
		AsyncStorage.getItem('textToSave').then((value)=>this.setState({'textToSave': value}))

		setTextToSave = (value) => {AsyncStorage.setItem('textToSave', value);
		this.setState({'textToSave': value});
		}

		render() {
			return(
				<View>
					<Text>{this.state.textToSave}</Text>
					<TextInput onChangeText={this.setTextToSave} placeholder="test132"/>
				</View>
			)
		}
}