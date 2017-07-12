import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  WebView
} from 'react-native';

import {
  fetchHtmlSource,
  parseChapterContent
} from '../../sources/RRLSource'

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

    this.state = { content: 'Useless Placeholder' };

    let content = FictionService.getChapterContent(this.props.chapterKey);
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
    }
  }

  render() {
    return (
      //<WebView source={{uri: this.props.chapterKey}}/>
      <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <Text>{this.state.content}</Text>
      </ScrollView>
    );
  }
}

ChapterReaderScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChapterReaderScreen);