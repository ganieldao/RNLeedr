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

import FictionRow from './Components/FictionRow'

import * as listActions from '../fictionListActions';

var debounce = require('lodash.debounce');

class FictionListScreen extends Component {
  state = {
    offset: 0,
    isRefreshing: false
  }

  _keyExtractor = (item, index) => item.key;

  _viewFiction(fictionEntry) {
    console.log(fictionEntry);
		this.props.navigator.push({
			screen: 'Leedr.FictionInfoScreen',
      title: fictionEntry.title,
			passProps: {
        fictionEntry:fictionEntry
			}
		});
	}

  _onPressButton(item) {
    this._viewFiction(item);
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                marginLeft: "14%"
              }}
            />
          )}
          renderItem={({item}) => (
            <FictionRow 
              onPressFiction={debounce(() => this._onPressButton(item), 1000, {
                leading: true,
                trailing: false
              })} item={item}
            />
          )}s
        />
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