import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
import { registerScreens } from './screens';
import configureStore from './redux/store/configureStore';

const store = configureStore();

registerScreens(store, Provider); //register all of the app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'Leedr.FictionBrowserScreen', // this is a registered name for a screen
      icon: require('./res/one.png'),
      title: 'Fiction Info'
    }
  ]
});