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
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        this.parseChapterLinks(doc);
        this.parseNovelInfo(doc);
      })
      .catch((error) => console.log(error));
  }

  async fetchHtmlSource(url) {
    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    console.log("time to fetch");
    let body;
    try {
      const response = await fetch(testUrl);
      body = response['_bodyInit'];
    } catch (err) {
      console.log('fetch failed', err);
    } 
    return body;
  }

  parseChapterLinks(doc) {
    console.log("getting chapters");

    //RRL has a table with the id 'chapters'. We are looking for the chapter links which are in the <tbody>
    //Each row of the <tbody> is represented by <tr>
    var rows = doc.querySelector('#chapters').querySelector('tbody').querySelectorAll('tr')
    var links = rows.map(function(row) {
      //This gets date published, which might be used later
      //console.log(row.querySelector('time').rawText); 

      //The first <a> of each row contains the chapter link (without the base url)
      return 'https://royalroadl.com' + row.querySelector('a').attributes['href'];
    })

    console.log(links);
    return links
  }

  parseNovelInfo(doc) {
    //Maybe include fiction tags?
    var title = doc.querySelector('h1').rawText;
    var author = doc.querySelector('h4').querySelector('a').rawText;
    var description = doc.querySelector('.hidden-content').structuredText;
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