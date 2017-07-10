import { combineReducers } from 'redux';

import {
    FictionBrowserReducer, 
    FictionInfoReducer,
    FictionListReducer
} from '../../modules';

const rootReducer = combineReducers({
    FictionBrowser:FictionBrowserReducer,
    FictionInfo:FictionInfoReducer,
    FictionList:FictionListReducer
});

export default rootReducer;