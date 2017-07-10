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
} from '../../sources/RRLSource'

import * as fictionActions from './actions.js';

import FictionService from '../../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
const testUrl2 = 'https://royalroadl.com/fiction/4293/the-iron-teeth-a-goblins-tale';

class FictionBrowserScreen extends Component {

  componentWillMount() {
    this._addFiction(testUrl); //For testing
    this._addFiction(testUrl2);
  }

  _addFiction(url) {
    fetchHtmlSource(url) //First get the html
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString); 
        let info = parseFictionInfo(doc);
        info['url'] = url; //Add the url to the information

        this.props.actions.addFiction(info); //Add to database
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
    actions: bindActionCreators(fictionActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionBrowserScreen);