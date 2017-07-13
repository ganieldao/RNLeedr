import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

import logger from 'redux-logger'

export default function configureStore() {
  //return createStore(rootReducer, applyMiddleware(logger));
  return createStore(rootReducer);
}