import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Need to implement check to see if data exists in realm
export function retrieveFictionDetails(url) {
	let details = FictionService.getFictionByUrl(url);
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: details
	};
}

export function addFiction(info) {
	FictionService.addFiction(info);
	//Needs to return update to list if any for reducer
	return {
		type: 'ADD_FICTION_SUCCESS'
	}
}
