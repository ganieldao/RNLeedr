import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';

const HTMLParser = require('fast-html-parser');

export default class Leedr extends Component {
  componentWillMount() {

    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    console.log("time to fetch");

    fetch(testUrl) // Call the fetch function passing the url of the API as a parameter
      .then(function(data) {
        var theDoc = HTMLParser.parse(data["_bodyInit"]);
        console.log(theDoc.querySelector('#chapters').querySelectorAll('a')[0].attributes["href"]);
      })
      .catch(function() {
        // This is where you run code if the server returns any errors
      });
  }

  render() {
    return (
        <View>
          <Text>hi</Text>
        </View>
    );
  }
}
AppRegistry.registerComponent('Leedr', () => Leedr);