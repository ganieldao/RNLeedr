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

var downloadButton = {
  title: 'Download', // for a textual button, provide the button title (label)
  id: 'download', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
  buttonFontWeight: '600' // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
};

var switchButton = {
  title: 'Switch',
  id: 'switch',
  buttonFontSize: 14,
  buttonFontWeight: '600'
};

var deleteButton = {
  title: 'Delete',
  id: 'delete',
  buttonFontSize: 14,
  buttonFontWeight: '600'
};

class ChapterReaderScreen extends Component {
  static navigatorButtons = {
    rightButtons: [downloadButton]
  };

  static navigatorStyle = {
    drawUnderTabBar: true
  };

  componentWillMount() {
    /*this.props.navigator.toggleNavBar({
      to: 'hidden', 
      animated: true 
    });*/

    this.state = { content: 'Loading', web: false };

    this.props.actions.retrieveChapterContent(this.props.chapterKey);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  _updateButtons() {
    if(this.props.contentDownloaded) {
      this.props.navigator.setButtons({rightButtons:[switchButton, deleteButton]})
    } else {
      this.props.navigator.setButtons({rightButtons:[downloadButton]})
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      switch(event.id) {
        case 'download':
          getChapterContent(this.props.chapterKey).then((chapterContent) => {
            content = chapterContent;
            this.props.actions.addChapterContent(this.props.chapterKey, this.props.fictionKey, content);
          })
          .catch((error) => console.log(error));
        break;
        case 'switch':
          this.setState({web:!this.state.web});
        break;
        case 'delete':
          this.props.navigator.pop();
          this.props.actions.removeChapterContent(this.props.chapterKey, this.props.fictionKey);
        break;
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
    this._updateButtons();
    if(this.props.contentDownloaded && !this.state.web) {
      return (
        <ScrollView style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
          <Text style={{marginLeft:'5%', marginRight:'5%', fontSize:18}}>{this.props.content}</Text>
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