import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  fetchHtmlSource
} from '../sources/RRLSource'

import FictionService from '../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';

class FictionBrowserScreen extends Component {

  componentWillMount() {
    //this._viewFiction(testUrl);
    FictionService.getFictions();
  }

  _viewFiction(url) {
		this.props.navigator.showModal({
			screen: 'Leedr.FictionInfoScreen',
			passProps: {
				url
			}
		});
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