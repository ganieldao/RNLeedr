import { combineReducers } from 'redux';

import {
  FictionBrowserReducer, 
  FictionInfoReducer,
  ChapterReaderReducer,
  ListReducer
} from '../../modules';

const rootReducer = combineReducers({
  FictionBrowser:FictionBrowserReducer,
  FictionInfo:FictionInfoReducer,
  FictionList:ListReducer,
  ChapterReader:ChapterReaderReducer
});

export default rootReducer;