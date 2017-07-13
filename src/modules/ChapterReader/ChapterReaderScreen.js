import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  WebView,
} from 'react-native';

import {
  fetchHtmlSource,
  parseChapterContent
} from '../../sources/RRLSource'

import * as actions from './actions.js';

import FictionService from '../../realm/FictionService.js';

const HTMLParser = require('fast-html-parser');

class ChapterReaderScreen extends Component {
  componentWillMount() {
    this.props.navigator.toggleTabs({
      to: 'hidden', 
      animated: true 
    });

    /*this.props.navigator.toggleNavBar({
      to: 'hidden', 
      animated: true 
    });*/

    this.state = { content: 'Loading' };

    this.props.actions.retrieveChapterContent(this.props.chapterKey);

    /*let content = FictionService.getChapterContent(this.props.chapterKey);
    if(content === '') { //Check if content already downloaded
      fetchHtmlSource(this.props.chapterKey) //First get the html
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString); 
        content = parseChapterContent(doc);

        FictionService.addChapterContent(this.props.chapterKey, content);
        this.setState({content:content});
      })
      .catch((error) => console.log(error));
    } else { //Already have content, just display
      this.setState({content:content});
    }*/
  }

  render() {
    if(this.props.contentDownloaded) {
      return (
        <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
          <Text>{this.props.content}</Text>
        </ScrollView>
      )
    } else {
      return (
        <WebView source={{uri: this.props.chapterKey}}/>
      )
    }
  }
}

ChapterReaderScreen.propTypes = {
	actions: PropTypes.object,
  navigator: PropTypes.object,
  content: PropTypes.string,
  contentDownloaded: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
	return {
    content:state.ChapterReader.content,
    contentDownloaded:state.ChapterReader.contentDownloaded
	};
}

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterReaderScreen);