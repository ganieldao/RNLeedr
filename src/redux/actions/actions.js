import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

export function retrieveFictionDetails(fictionUrl) {
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: parseFictionInfo(fictionUrl)
	};
}
