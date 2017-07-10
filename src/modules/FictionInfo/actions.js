import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Need to implement check to see if data exists in realm
export function retrieveFictionDetails(url) {
    console.log("retrieve fiction details");
	let details = FictionService.getFictionByUrl(url);
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: details
	};
}