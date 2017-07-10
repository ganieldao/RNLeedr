import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Button
} from 'react-native';

import FictionService from '../../realm/FictionService';

import * as listActions from '../listActions';

class FictionListScreen extends Component {
  state = {
    offset: 0,
    isRefreshing: false
  }

  _keyExtractor = (item, index) => item.title;

  _viewFiction(fiction) {
		this.props.navigator.push({
			screen: 'Leedr.FictionInfoScreen',
      title: fiction.title,
			passProps: {
				url:fiction.url
			}
		});
	}

  _onPressButton(item) {
    this._viewFiction(item);
  }

  //testing purposes
  _onPressRefresh() {
    FictionService.getFictions();
  }

  componentWillMount() {
    this.props.listActions.getFictions();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <FlatList
          data={this.props.list}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <TouchableHighlight onPress={() => this._onPressButton(item)}>
              <View style={{backgroundColor: 'white'}}>
                <Text>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <Button title='refresh' onPress={() => this._onPressRefresh()}/>
      </View>
    );
  }
}

FictionListScreen.propTypes = {
	listActions: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  navigator: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return {
    list:state.FictionList.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
    listActions: bindActionCreators(listActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionListScreen);