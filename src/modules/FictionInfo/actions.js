import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Need to implement check to see if data exists in realm
export function retrieveFictionDetails(key) {
  console.log("retrieve fiction details");
	let details = FictionService.getFictionByKey(key);
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: details
	};
}