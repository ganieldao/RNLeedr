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

const ChapterRow = ({onPressFiction, item}) => {
  return (<TouchableHighlight onPress={() => onPressFiction()}>
    <Text>{item.title}</Text>
  </TouchableHighlight>);
}

export default ChapterRow
