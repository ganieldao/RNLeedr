import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

import {
  fetchHtmlSource,
  parseFictionInfo
} from '../../sources/RRLSource'

import * as listActions from '../listActions.js';

import FictionService from '../../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
const testUrl2 = 'https://royalroadl.com/fiction/4293/the-iron-teeth-a-goblins-tale';
const testUrl3 = 'https://royalroadl.com/fiction/8463/the-arcane-emperor';

class FictionBrowserScreen extends Component {

  componentWillMount() {
    this.state = { text: 'Useless Placeholder' };
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

  _onPress() {
    this._addFiction(this.state.text);
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <Text>Hi</Text>
        <TextInput
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Button title='Add' onPress={() => this._onPress()}/>
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
    actions: bindActionCreators(listActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionBrowserScreen);