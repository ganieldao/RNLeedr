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

import * as listActions from '../fictionListActions';

import FictionService from '../../realm/FictionService';

class FictionBrowserScreen extends Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    navBarTranslucent: true
  };

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

  render() {
    return (
      <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start'}}>
        <TextInput
          style={{flex:0.2, textAlign:'center'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <View style={{flex:0.8}}>
        <Button style={{flex:1}} title='Add' onPress={() => this._onPress()}/>
        </View>
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