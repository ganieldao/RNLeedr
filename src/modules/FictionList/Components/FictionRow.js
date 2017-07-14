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

const FictionRow = ({onPressFiction, item}) => {
  console.log(item.img);
  return (<TouchableHighlight onPress={() => onPressFiction()}>
    <View style={{flexDirection:'row'}}>
      <View>
        <Image
          style={{height:100, width:100, resizeMode: 'contain'}}
          source={{uri: item.img}}
        />
      </View>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
      </View>
    </View>
  </TouchableHighlight>);
}

export default FictionRow
