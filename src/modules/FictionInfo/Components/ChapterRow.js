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

const inProgressIcon = require('../../../res/in_progress.png');
const unreadIcon = require('../../../res/unread.png');
const newIcon = require('../../../res/new.png');

const ChapterRow = ({onPressChapter, item, current}) => {
  let color = 'blue';
  if(item.content === '') {
    color = 'red';
  }

  if(current) {
    icon = inProgressIcon;
  } else if(item.status === 'unread') {
    icon = unreadIcon;
  } else if(item.status === 'new') {
    icon = newIcon;
  }

  return (<TouchableHighlight underlayColor='gray' onPress={() => onPressChapter()}>
    <View style={{flex:1, marginTop:'1%', marginBottom:'1%', flexDirection:'row'}}>
      <View style={{flex: 0.1, justifyContent:'center', alignItems:'center'}}>
        {(item.status === 'read' && !current) || <Image style={{flex:1, width:'80%', resizeMode:'contain'}} source={icon}/>}
      </View>
      <View style={{flex: 0.9, flexDirection:'column'}}>
        <Text style={{color:color, fontWeight:'bold'}}>{item.title}</Text>
        <Text style={{color:color}}>{item.date}</Text>
      </View>
    </View>
  </TouchableHighlight>);
}

export default ChapterRow
