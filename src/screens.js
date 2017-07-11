import { Navigation } from 'react-native-navigation';

import {FictionBrowserScreen,
        FictionInfoScreen,
        FictionListScreen,
        ChapterReaderScreen} from './modules'

// register all screens of the app (including internal ones)
export function registerScreens(store, provider) {
  Navigation.registerComponent('Leedr.FictionInfoScreen', () => FictionInfoScreen, store, provider);
  Navigation.registerComponent('Leedr.FictionBrowserScreen', () => FictionBrowserScreen, store, provider);
  Navigation.registerComponent('Leedr.FictionListScreen', () => FictionListScreen, store, provider);
  Navigation.registerComponent('Leedr.ChapterReaderScreen', () => ChapterReaderScreen, store, provider);
}