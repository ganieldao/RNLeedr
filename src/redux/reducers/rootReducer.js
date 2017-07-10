import { combineReducers } from 'redux';

import {FictionBrowserReducer, FictionInfoReducer} from '../../modules';

const rootReducer = combineReducers({
    FictionBrowser:FictionBrowserReducer,
    FictionInfo:FictionInfoReducer
});

export default rootReducer;