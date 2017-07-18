import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';

import {
  fetchHtmlSource,
  getFictionInfo
} from '../../sources/RRLSource'

import * as listActions from '../_actions/fictionListActions';

import FictionService from '../../realm/FictionService';

class FictionBrowserScreen extends Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    navBarTranslucent: true
  };

  componentWillMount() {
    this.state = { text: '12563', isLoading: false};
  }

  _addFiction(url) {
    this.setState({isLoading:true});
    getFictionInfo(url).then((info) => {
      this.props.actions.addFiction(info); //Add to database
      this.setState({isLoading:false});
      Alert.alert(
        'Success',
        'Fiction added',
      )
    })
    .catch((error) => {
      this.setState({isLoading:false});
      Alert.alert(
        ':(',
        'Something went wrong'
      )
      console.log(error);
    });
  }

  _onPress() {
    this._addFiction('https://royalroadl.com/fiction/' + this.state.text);
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start'}}>
        {this.state.isLoading &&
          <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
          }}>
            <ActivityIndicator 
              animating={true}
              color="black"
            />
            <Text>Adding Fiction...</Text>
          </View>
        }
        <TextInput
          style={{flex:0.2, textAlign:'center'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <View style={{flex:0.8}}>
        <Button style={{flex:1}} title='Add' onPress={() => this._onPress()}/>
        </View>
      </View>
    );
  }
}

FictionBrowserScreen.propTypes = {
	actions: PropTypes.object,
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(listActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FictionBrowserScreen);