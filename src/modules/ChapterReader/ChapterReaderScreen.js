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
import { MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

import {
  getChapterContent
} from '../../sources/RRLSource'

import * as actions from '../_actions/fictionInfoActions.js';

import FictionService from '../../realm/FictionService.js';

var downloadButton = {
  title: 'Download', // for a textual button, provide the button title (label)
  id: 'download', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
  buttonFontWeight: '600' // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
};

var menuButton = {
  title: 'Menu',
  id: 'menu',
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

    this.state = { content: 'Loading', web: false, current:this.props.current, status:this.props.status};

    this.props.actions.retrieveChapterContent(this.props.chapterKey);

    offset = FictionService.getChapterOffset(this.props.chapterKey);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    if(this.state.status === 'new') {
      this.props.actions.updateChapterStatus(this.props.chapterKey, this.props.fictionKey, 'unread');
      this.setState({status:'unread'});
    }
  }

  _updateButtons() {
    if(this.props.contentDownloaded) {
      this.props.navigator.setButtons({rightButtons:[menuButton]})
    } else {
      this.props.navigator.setButtons({rightButtons:[downloadButton]})
    }
  }

  _handleScrollEnd(event) {
    FictionService.updateChapterOffset(this.props.chapterKey, event.nativeEvent.contentOffset.y);
    
    if(!this.state.current) {
      this.props.actions.updateFictionCurrent(this.props.fictionKey, this.props.index);
      this.setState({current:true});
    }
    if(this.state.status === 'unread') {
      this.setState({status:'read'});
      this.props.actions.updateChapterStatus(this.props.chapterKey, this.props.fictionKey, 'read');
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      switch(event.id) {
        case 'download':
          //This needs to be moved
          getChapterContent(this.props.chapterKey).then((chapterContent) => {
            content = chapterContent;
            this.props.actions.addChapterContent(this.props.chapterKey, this.props.fictionKey, content);
          })
          .catch((error) => console.log(error));
        break;
        case 'menu':
          this.refs._menuContext.toggleMenu('chapterMenu');
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
          this.refs._menuContext.closeMenu();
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

  //Switch between webpage and parsed content if available 
  _switchReader() {
    this.setState({web:!this.state.web});
  }

  _deleteChapter() {
    this.props.navigator.pop();
    this.props.actions.removeChapterContent(this.props.chapterKey, this.props.fictionKey);
  }

  render() {
    this._updateButtons();
    return (
      <MenuContext ref='_menuContext'>
        <Menu name='chapterMenu' ref='_menu' style={{alignItems:'flex-end'}}>
          <MenuTrigger/>
          <MenuOptions>
            <MenuOption onSelect={() => this._switchReader()} text='Switch' />
            <MenuOption onSelect={() => this._deleteChapter()} >
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        {this.props.contentDownloaded && !this.state.web?
        <ScrollView onLayout={() => this.refs._scrollView.scrollTo({x:0, y:offset, animated:false})} ref='_scrollView' onScrollEndDrag={(event) => this._handleScrollEnd(event)} style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
          <Text style={{marginLeft:'5%', marginRight:'5%', marginBottom:'10%', marginTop:'5%', fontSize:18}}>{this.props.content}</Text>
        </ScrollView>:<WebView source={{uri: this.props.chapterKey}}/>}
      </MenuContext>
    )
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