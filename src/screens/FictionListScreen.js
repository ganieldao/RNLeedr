import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from 'react-native';

import FictionService from '../realm/FictionService.js';

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';

class FictionListScreen extends Component {
  state = {
    data: null,
    offset: 0,
    isRefreshing: false
  }

  _keyExtractor = (item, index) => item.title;

  _viewFiction(url) {
		this.props.navigator.push({
			screen: 'Leedr.FictionInfoScreen',
			passProps: {
				url
			}
		});
	}

  _onPressButton() {
    this._viewFiction(testUrl);
  }

  componentWillMount() {
    this.setState({
      data:FictionService.getFictions()
    });
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <TouchableHighlight onPress={() => this._onPressButton()}>
              <View style={{backgroundColor: 'white'}}>
                <Text>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
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