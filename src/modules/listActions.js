import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../sources/RRLSource'

import FictionService from '../realm/FictionService.js';

export function addFiction(info) {
	FictionService.addFiction(info);
	//Needs to return update to list if any for reducer
	return {
		type: 'ADD_FICTION_SUCCESS'
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

