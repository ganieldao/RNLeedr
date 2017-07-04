import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';

export default class Leedr extends Component {
  componentWillMount() {

    var HTMLParser = require('fast-html-parser');
 
    var root = HTMLParser.parse('<ul id="list"><li>Hello World</li></ul>');
 
    console.log(root.firstChild.structure);

    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    fetch(testUrl)
      .then(function(data) {
        // Here you get the data to modify as you please
      })
      .catch(function(error) {
        // If there is any error you will catch them here
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