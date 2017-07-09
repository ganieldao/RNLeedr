import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

//Get the fiction details from realm by url
export function retrieveFictionDetails(url) {
	let details = FictionService.getFictionByUrl(url);
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: details
	};
}
