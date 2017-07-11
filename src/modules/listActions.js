import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../sources/RRLSource'

import FictionService from '../realm/FictionService.js';

export function addFiction(info) {
  FictionService.addFiction(info);
  let list = FictionService.getFictions();
  //Needs to return update to list if any for reducer
  return {
	  type: 'ADD_FICTION_SUCCESS',
    list:list
  }
}

//Add Filter sometime
export function getFictions() {
  let list = FictionService.getFictions();
  //Needs to return update to list if any for reducer
  return {
    type: 'GET_FICTIONS_SUCCESS',
	  list:list
  }
}

export function removeFiction(url) {
  FictionService.removeFiction(url);
  let list = FictionService.getFictions();

	return {
		type: 'REMOVE_FICTIONS_SUCCESS',
		list:list
	}
}

