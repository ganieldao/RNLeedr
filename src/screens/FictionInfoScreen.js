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
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../sources/RRLSource'

const HTMLParser = require('fast-html-parser');

const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
const testChapterUrl = 'https://royalroadl.com/fiction/8894/everybody-loves-large-chests/chapter/100167/death-comes-in-many-forms-6';

class FictionInfoScreen extends Component {
  //Default state?
  state = {
    data: null,
    offset: 0,
    isRefreshing: false,
  }

  _keyExtractor = (item, index) => item.title;

  componentWillMount() { 
    this._retrieveDetails();

    //Test chapter content fetch
    /*fetchHtmlSource(testChapterUrl)
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        parseChapterContent(doc);
      })
      .catch((error) => console.log(error));*/
  }

  _retrieveDetails(isRefreshed) {
    //this.props.url for parameter
    fetchHtmlSource(testUrl)
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        this.props.actions.retrieveFictionDetails(doc);
        this.setState({
          data: this.props.details.chapterInfos
        });

      })
      .catch((error) => console.log(error));

		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

  render() {
    const { details } = this.props;
		const {fictionInfo, chapterInfos} = details;
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <Text>{fictionInfo.title}</Text>
          <Text>{fictionInfo.author}</Text>
          <View style={{flex:0.4, flexDirection: 'row'}}>
            <Image
              style={{flex:0.4, height:'100%', resizeMode: 'contain'}}
              source={{uri: fictionInfo.img}}
            />
            <View style={{flex:0.6}}>
              <Text>Description</Text>
                <ScrollView style={{flex:0.5}}>
                  <Text>{fictionInfo.desc}</Text>
                </ScrollView>
            </View>
          </View>
          <FlatList
            style={{flex:0.6}}
            data={this.state.data}
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
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.fictions.details,
		similarMovies: state.fictions.similarMovies
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fictionActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionInfoScreen);