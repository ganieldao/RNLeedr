import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  WebView
} from 'react-native';

import {
  fetchHtmlSource,
  parseFictionInfo
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

class ChapterReaderScreen extends Component {
  componentWillMount() {
    this.props.navigator.toggleTabs({
      to: 'hidden', 
      animated: true 
    });

    this.props.navigator.toggleNavBar({
      to: 'hidden', 
      animated: true 
    });
  }

  render() {
    return (
      <WebView source={{uri: this.props.chapterKey}}/>
      /*<ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <Text>Hi</Text>
      </ScrollView>*/
    );
  }
}

ChapterReaderScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChapterReaderScreen);