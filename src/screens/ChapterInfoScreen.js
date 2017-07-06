import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  fetchHtmlSource,
  parseChapterLinks,
  parseNovelInfo,
  parseChapterContent
} from '../sources/RRLSource'

const HTMLParser = require('fast-html-parser');

export default class ChapterInfoScreen extends Component {
  componentWillMount() {
    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    fetchHtmlSource(testUrl)
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        parseChapterLinks(doc);
        console.log(parseNovelInfo(doc));
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
        <View>
          <Text>hi</Text>
        </View>
    );
  }
}