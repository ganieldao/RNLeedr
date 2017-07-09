import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {
  fetchHtmlSource,
  parseFictionInfo
} from '../sources/RRLSource'

import FictionService from '../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
const testUrl2 = 'https://royalroadl.com/fiction/4293/the-iron-teeth-a-goblins-tale';

class FictionBrowserScreen extends Component {

  componentWillMount() {
    this._addFiction(testUrl); //For testing
    this._addFiction(testUrl2); //Me too
  }

  _addFiction(url) {
    url = testUrl; // (testUrl for now)
    fetchHtmlSource(url) //First get the html
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString); 
        let info = parseFictionInfo(doc);
        info['url'] = url; //Add the url to the information

        //TODO ADD TO REDUX ACTIONS
        FictionService.addFiction(info); //Add to database
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <Text>Hi</Text>
      </View>
    );
  }
}

FictionBrowserScreen.propTypes = {
	actions: PropTypes.object,
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionBrowserScreen);