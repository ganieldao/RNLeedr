import React, { Component, PropTypes } from 'react';

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

export default class FictionInfoScreen extends Component {
  componentWillMount() { 
    this.state = {
      color:'blue'
    };
    if(this.props.item.content === '') {
      this.setState({
        color:'red'
      })
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPressChapter()}>
        <Text style={{color:this.state.color}}>{this.props.item.title}</Text>
      </TouchableHighlight>
    );
  }
}