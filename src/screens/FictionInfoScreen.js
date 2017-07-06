import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView
} from 'react-native';
import {
  fetchHtmlSource,
  parseChapterLinks,
  parseNovelInfo,
  parseChapterContent
} from '../sources/RRLSource'

const HTMLParser = require('fast-html-parser');

export default class FictionInfoScreen extends Component {
  //Default state?
  state = {
    dataSource: null,
    offset: 0,
    loading: false,
    isActionButtonVisible: true
  }

  componentWillMount() {
    //Set up ListView data source
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };

    const testUrl = 'https://royalroadl.com/fiction/1439/forgotten-conqueror';
    const testChapterUrl = 'https://royalroadl.com/fiction/8894/everybody-loves-large-chests/chapter/100167/death-comes-in-many-forms-6';
    fetchHtmlSource(testUrl)
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        parseChapterLinks(doc);
        console.log(parseNovelInfo(doc));
      })
      .catch((error) => console.log(error));

    fetchHtmlSource(testChapterUrl)
      .then((htmlString) => {
        var doc = HTMLParser.parse(htmlString);
        parseChapterContent(doc);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <Text>The Forgotten Conqueror</Text>
          <Text>Za1d3</Text>
          <View style={{flex:0.4, flexDirection: 'row'}}>
            <Image
              style={{flex:0.4, height:'100%', resizeMode: 'contain'}}
              source={require('../../res/placeholder.png')}
            />
            <View style={{flex:0.6}}>
              <Text>Description</Text>
                <ScrollView style={{flex:0.5}}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hoc positum in Phaedro a Platone probavit Epicurus sensitque in omni disputatione id fieri oportere. Plane idem, inquit, et maxima quidem, qua fieri nulla maior potest. Contemnit enim disserendi elegantiam, confuse loquitur. Eaedem enim utilitates poterunt eas labefactare atque pervertere. Quae enim adhuc protulisti, popularia sunt, ego autem a te elegantiora desidero. Duo Reges: constructio interrete. Non dolere, inquam, istud quam vim habeat postea videro;

    Non est ista, inquam, Piso, magna dissensio. Tu autem, si tibi illa probabantur, cur non propriis verbis ea tenebas? Hoc enim identidem dicitis, non intellegere nos quam dicatis voluptatem. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Quo plebiscito decreta a senatu est consuli quaestio Cn. Nam Metrodorum non puto ipsum professum, sed, cum appellaretur ab Epicuro, repudiare tantum beneficium noluisse; At Zeno eum non beatum modo, sed etiam divitem dicere ausus est.</Text>
                </ScrollView>
            </View>
          </View>
          <ListView
            style={{flex:0.6}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
    );
  }
}