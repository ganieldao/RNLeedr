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
  getFictionInfo
} from '../../sources/RRLSource'

import * as listActions from '../listActions';

import FictionService from '../../realm/FictionService';

class FictionBrowserScreen extends Component {

  componentWillMount() {
    this.state = { text: '12563' };
  }

  _addFiction(url) {
    getFictionInfo(url).then((info) => {
      this.props.actions.addFiction(info); //Add to database
    })
    .catch((error) => console.log(error));
  }

  _onPress() {
    this._addFiction('https://royalroadl.com/fiction/' + this.state.text);
  }

  _onPressRem() {
    this.props.actions.removeFiction(this.state.text);
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
        <Button title='Remove' onPress={() => this._onPressRem()}/>
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