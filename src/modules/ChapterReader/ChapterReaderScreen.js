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
  getChapterContent
} from '../../sources/RRLSource'

import * as actions from '../fictionInfoActions.js';

import FictionService from '../../realm/FictionService.js';

class ChapterReaderScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Download', // for a textual button, provide the button title (label)
        id: 'download', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  static navigatorStyle = {
    drawUnderTabBar: true
  };

  componentWillMount() {
    /*this.props.navigator.toggleNavBar({
      to: 'hidden', 
      animated: true 
    });*/

    this.state = { content: 'Loading' };

    this.props.actions.retrieveChapterContent(this.props.chapterKey);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'download') { // this is the same id field from the static navigatorButtons definition
        getChapterContent(this.props.chapterKey).then((chapterContent) => {
          content = chapterContent;
          this.props.actions.addChapterContent(this.props.chapterKey, this.props.fictionKey, content);
        })
      .catch((error) => console.log(error));
      }
    } else {
      switch(event.id) {
        case 'willAppear':
          this.props.navigator.toggleTabs({
            to: 'hidden', 
            animated: true
          });
        case 'didAppear':

          break;
        case 'willDisappear':
          this.props.navigator.toggleTabs({
            to: 'shown', 
            animated: true 
          });
          break;
        case 'didDisappear':

          break;
    }
    }
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
    content:state.FictionInfo.content,
    contentDownloaded:state.FictionInfo.contentDownloaded
	};
}

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterReaderScreen);