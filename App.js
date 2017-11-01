import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {
      
      let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
      
    return (
      <View style={styles.container}>

        <Text>Open up App.js to start writing loads of shit about Jonsa!</Text>
        <Text>Open up App.js to start working on your app!</Text>
          <Text>Hejhej.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
