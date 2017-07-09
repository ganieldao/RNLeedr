import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Get the fiction details from realm by url
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
	return {
		type: 'ADD_FICTION_SUCCESS'
	}
}
