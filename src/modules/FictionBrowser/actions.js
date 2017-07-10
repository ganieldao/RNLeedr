import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

export function addFiction(info) {
	FictionService.addFiction(info);
	//Needs to return update to list if any for reducer
	return {
		type: 'ADD_FICTION_SUCCESS'
	}
}
