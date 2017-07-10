import { combineReducers } from 'redux';

import {
    FictionBrowserReducer, 
    FictionInfoReducer,
    ListReducer
} from '../../modules';

const rootReducer = combineReducers({
    FictionBrowser:FictionBrowserReducer,
    FictionInfo:FictionInfoReducer,
    FictionList:ListReducer
});

export default rootReducer;