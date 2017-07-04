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
    var request = new XMLHttpRequest();
    request.open('GET', testUrl, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        var theDoc = HTMLParser.parse(resp);
        console.log(theDoc.querySelector('#chapters'));
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
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