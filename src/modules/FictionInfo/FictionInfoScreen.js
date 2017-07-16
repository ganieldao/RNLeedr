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
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as infoActions from '../fictionInfoActions';
import * as listActions from '../fictionListActions'

import ChapterRow from './Components/ChapterRow';

var debounce = require('lodash.debounce');

class FictionInfoScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Delete', // for a textual button, provide the button title (label)
        id: 'delete', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };
  
  //Default state?
  state = {
    offset: 0,
    isRefreshing: false,
  }
  
  //For flatlist, keys are the url of the chapter
  _keyExtractor = (item, index) => item.url;

  componentWillMount() { 
    this._retrieveDetails();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'delete') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop();
        this.props.listActions.removeFiction(this.props.fictionKey);
        this.props.infoActions.clearFictionDetails();
      }
    }
  }

  _retrieveDetails() {
    this.props.infoActions.retrieveFictionDetails(this.props.fictionKey);
	}

  _viewChapter(chapter) {
		this.props.navigator.push({
			screen: 'Leedr.ChapterReaderScreen',
      title: chapter.title,
			passProps: {
        chapterKey:chapter.url,
        fictionKey:this.props.fictionKey
			}
		});
	}

  _onPressChapter(item) {
    this._viewChapter(item);
  }

  render() {
    const { details } = this.props;
    const { chapters} = details;

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
            data={chapters}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: "86%",
                  backgroundColor: "#CED0CE",
                  marginLeft: "14%"
                }}
              />)}
            intialNumToRender='15'
            keyExtractor={this._keyExtractor}
            containerStyle={{ borderBottomWidth: 0 }}
            renderItem={({item}) => (
              <ChapterRow 
                onPressChapter={debounce(() => this._onPressChapter(item), 1000, {
                  leading: true,
                  trailing: false
                })}
                item={item}
              />
            )}
          />
        </View>
    );
  }
}

FictionInfoScreen.propTypes = {
  listActions: PropTypes.object.isRequired,
  infoActions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
  fictionKey: PropTypes.string.isRequired,
	navigator: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.FictionInfo.details
	};
}

function mapDispatchToProps(dispatch) {
	return {
    listActions: bindActionCreators(listActions, dispatch),
    infoActions: bindActionCreators(infoActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionInfoScreen);