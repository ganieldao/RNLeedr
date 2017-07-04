import Leedr from './src/Leedr';

import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      icon: require('./res/one.png'),
      title: 'Screen One'
    }
  ]
});


