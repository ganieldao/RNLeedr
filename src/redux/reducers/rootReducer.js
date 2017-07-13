import { combineReducers } from 'redux';

import {
  FictionBrowserReducer, 
  FictionInfoReducer,
  ListReducer
} from '../../modules';

const rootReducer = combineReducers({
  FictionBrowser:FictionBrowserReducer,
  FictionList:ListReducer,
  FictionInfo:FictionInfoReducer,
});

export default rootReducer;