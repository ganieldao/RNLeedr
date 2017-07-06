import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import {
  fetchHtmlSource,
  parseChapterLinks,
  parseNovelInfo,
  parseChapterContent
} from '../sources/RRLSource'

const HTMLParser = require('fast-html-parser');

export default class FictionInfoScreen extends Component {
  //Default state?
  state = {
    dataSource: null,
    offset: 0,
    loading: false,
    isActionButtonVisible: true
  }

  componentWillMount() {
    //Set up ListView data source
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };

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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
    );
  }
}