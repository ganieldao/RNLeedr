import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class FictionListScreen extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <Text>Hi</Text>
      </View>
    );
  }
}

FictionListScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FictionListScreen);