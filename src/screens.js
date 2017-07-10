import { Navigation } from 'react-native-navigation';

import FictionBrowserScreen from './modules/FictionBrowser/FictionBrowserScreen.js'
import FictionInfoScreen from './modules/FictionInfo/FictionInfoScreen.js';
import FictionListScreen from './modules/FictionList/FictionListScreen.js';

// register all screens of the app (including internal ones)
export function registerScreens(store, provider) {
  Navigation.registerComponent('Leedr.FictionInfoScreen', () => FictionInfoScreen, store, provider);
  Navigation.registerComponent('Leedr.FictionBrowserScreen', () => FictionBrowserScreen, store, provider);
  Navigation.registerComponent('Leedr.FictionListScreen', () => FictionListScreen, store, provider);
}