import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Add Filter sometime
export function getFictions() {
	let list = FictionService.getFictions();
	//Needs to return update to list if any for reducer
	return {
		type: 'GET_FICTIONS_SUCCESS',
		list:list
	}
}
