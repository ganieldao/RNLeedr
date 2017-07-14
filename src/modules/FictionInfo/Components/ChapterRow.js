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
