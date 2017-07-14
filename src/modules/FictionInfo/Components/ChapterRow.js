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

/*export default class ChapterRow extends Component {
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
}*/

const ChapterRow = ({onPressChapter, item}) => {
  let color = 'blue';
  if(item.content === '') {
    color = 'red';
  }

  return (<TouchableHighlight onPress={() => onPressChapter()}>
    <Text style={{color:color}}>{item.title}</Text>
  </TouchableHighlight>);
}

export default ChapterRow
