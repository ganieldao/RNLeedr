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

import * as actions from './actions.js';

class FictionInfoScreen extends Component {
  //Default state?
  state = {
    offset: 0,
    isRefreshing: false,
  }
  
  //For flatlist, keys are the titles of the chapter
  _keyExtractor = (item, index) => item.url;

  componentWillMount() { 
    this._retrieveDetails();
  }

  _retrieveDetails() {
    console.log(this.props.key);
    this.props.actions.retrieveFictionDetails(this.props.fictionKey);
	}

  render() {
    const { details } = this.props;
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
              return <Text>{item.title}</Text> //TODO COMPONENT
            }}
          />
        </View>
    );
  }
}

FictionInfoScreen.propTypes = {
	actions: PropTypes.object.isRequired,
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
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionInfoScreen);