import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './FictionInfoScreen.js';

// register all screens of the app (including internal ones)
export function registerScreens(store, provider) {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, provider);
}