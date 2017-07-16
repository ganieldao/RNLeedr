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
    <View style={{flex:1, marginTop:'1%', marginBottom:'1%', flexDirection:'row'}}>
      <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../../../res/one.png')}/>
      </View>
      <View style={{flex: 0.9, flexDirection:'column'}}>
        <Text style={{color:color, fontWeight:'bold'}}>{item.title}</Text>
        <Text style={{color:color}}>{item.date}</Text>
      </View>
    </View>
  </TouchableHighlight>);
}

export default ChapterRow
