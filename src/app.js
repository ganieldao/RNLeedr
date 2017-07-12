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
      screen: 'Leedr.FictionListScreen', // this is a registered name for a screen
      icon: require('./res/one.png'),
      title: 'Fiction List'
    },
    {
      label: 'Two',
      screen: 'Leedr.FictionBrowserScreen', // this is a registered name for a screen
      icon: require('./res/one.png'),
      title: 'Fiction Browser'
    }
  ]
});

/*Navigation.startSingleScreenApp({
  screen: {
    screen: 'Leedr.FictionListScreen', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});*/