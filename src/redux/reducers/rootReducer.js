import { combineReducers } from 'redux';

import {
  FictionInfoReducer,
  ListReducer
} from '../../modules';

const rootReducer = combineReducers({
  FictionList:ListReducer,
  FictionInfo:FictionInfoReducer,
});

export default rootReducer;