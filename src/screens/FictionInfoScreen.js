import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView
} from 'react-native';

import * as fictionActions from '../redux/actions/actions.js';

import {
  fetchHtmlSource
} from '../sources/RRLSource'

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';

class FictionInfoScreen extends Component {
  //Default state?
  state = {
    offset: 0,
    isRefreshing: false,
  }
  
  _keyExtractor = (item, index) => item.title;

  componentWillMount() { 
    this._retrieveDetails();
  }

  _retrieveDetails(isRefreshed) {
    this.props.actions.retrieveFictionDetails(this.props.url);

		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

  render() {
    const { details } = this.props;
		//const {fictionInfo, chapterInfos} = details;
    return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
          <Text>{details.title}</Text>
          <Text>{details.author}</Text>
          <View style={{flex:0.4, flexDirection: 'row'}}>
            <Image
              style={{flex:0.4, height:'100%', resizeMode: 'contain'}}
              source={{uri: details.img}}
            />
            <View style={{flex:0.6}}>
              <Text>Description:</Text>
                <ScrollView style={{flex:0.5}}>
                  <Text>{details.desc}</Text>
                </ScrollView>
            </View>
          </View>
          <FlatList
            style={{flex:0.6}}
            data={details.chapters}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => {
              return <Text>{item.title}</Text>
            }}
          />
        </View>
    );
  }
}

FictionInfoScreen.propTypes = {
	actions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
	navigator: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.fictions.details
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fictionActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionInfoScreen);