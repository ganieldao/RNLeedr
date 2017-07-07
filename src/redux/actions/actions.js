import {
  fetchHtmlSource,
  parseChapterLinks,
  parseNovelInfo,
  parseChapterContent
} from '../../sources/RRLSource'

export function retrieveFictionDetails(fictionUrl) {
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: parseNovelInfo(fictionUrl)
	};
}
