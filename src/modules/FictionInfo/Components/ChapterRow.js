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

  return (<TouchableHighlight underlayColor='gray' onPress={() => onPressChapter()}>
    <View style={{marginTop:'1%', marginBottom:'1%'}}>
      <Text style={{color:color, fontWeight:'bold'}}>{item.title}</Text>
      <Text style={{color:color}}>{item.date}</Text>
    </View>
  </TouchableHighlight>);
}

export default ChapterRow
