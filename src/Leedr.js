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
    this.fetchHtmlSource('asdf')
      .then((htmlString) => this.fetchChapters(htmlString))
      .catch((error) => console.log(error));
  }

  async fetchHtmlSource(url) {
    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    console.log("time to fetch");
    let body;
    try {
      const response = await fetch(testUrl);
      body = response["_bodyInit"];
      //console.log(body);
    } catch (err) {
      console.log('fetch failed', err);
    } 
    return body;
  }

  fetchChapters(htmlString) {
    console.log("getting chapters");
    var theDoc = HTMLParser.parse(htmlString);

    //RRL has a table with the id 'chapters'. We are looking for the chapter links which are in the 'tbody'
    //Each row of the 'tbody' is represented by 'tr', and the first 'a' contains the chapter link
    var rows = theDoc.querySelector('#chapters').querySelector('tbody').querySelectorAll('tr')
    var links = rows.map(function(row) {
      return 'https://royalroadl.com' + row.querySelector('a').attributes["href"];
    })

    console.log(links);
    return links
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