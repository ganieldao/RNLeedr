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

    this.fetchChapters();
  }

  async fetchChapters() {
    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    console.log("time to fetch");
    try {
      const response = await fetch(testUrl);
      var theDoc = HTMLParser.parse(response["_bodyInit"]);
      //This returns the first chapter url
      console.log(theDoc.querySelector('#chapters').querySelectorAll('a')[0].attributes["href"]);
    } catch (err) {
      console.log('fetch failed', err);
    }
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